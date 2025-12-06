
import { GoogleGenAI, Modality } from "@google/genai";

// Audio Context Helper
let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
      sampleRate: 24000, // Matching Gemini TTS output
    });
  }
  return audioContext;
};

// Base64 decoding helper
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Helper to decode audio data from PCM
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// Safely get API key without crashing if process is undefined
const getApiKey = () => {
  try {
    // @ts-ignore
    return (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : '';
  } catch (e) {
    return '';
  }
};

export const speakText = async (text: string): Promise<void> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("API Key missing or environment not configured");
    return;
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });
  const ctx = getAudioContext();

  // Resume context if suspended (browser autoplay policy)
  if (ctx.state === 'suspended') {
    await ctx.resume();
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Puck' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!base64Audio) {
      throw new Error("No audio data received");
    }

    const audioBuffer = await decodeAudioData(
      decode(base64Audio),
      ctx,
      24000,
      1,
    );

    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(ctx.destination);
    source.start();

  } catch (error) {
    console.error("Error generating speech:", error);
    // Don't throw to avoid crashing UI if API fails
  }
};
