
import React, { useState } from 'react';
import { StorySegment, VocabularyWord } from '../types';
import { speakText } from '../services/geminiService';
import { VOCABULARY_DATA } from '../constants';

interface StoryReaderProps {
  storyData: StorySegment[];
}

// Simple Helper to find if a word matches our vocab list
const findVocab = (text: string): VocabularyWord | undefined => {
  const cleanText = text.replace(/[^a-zA-Z]/g, '').toLowerCase();
  return VOCABULARY_DATA.find(v => v.word.toLowerCase() === cleanText);
};

export const StoryReader: React.FC<StoryReaderProps> = ({ storyData }) => {
  const [activeSegmentId, setActiveSegmentId] = useState<string | null>(null);
  const [popupWord, setPopupWord] = useState<VocabularyWord | null>(null);

  const handleSegmentClick = async (segment: StorySegment) => {
    setActiveSegmentId(segment.id);
    // Remove the Chinese in brackets for TTS so it sounds natural
    const textForSpeech = segment.text.replace(/\(.*?\)/g, "");
    try {
      await speakText(textForSpeech);
    } catch (e) {
      console.error(e);
    }
  };

  const handleWordClick = (e: React.MouseEvent, word: string) => {
    e.stopPropagation(); // Prevent sentence audio from playing
    const vocab = findVocab(word);
    if (vocab) {
      setPopupWord(vocab);
      speakText(vocab.word);
    }
  };

  // Function to render text and highlight known vocabulary
  const renderText = (text: string) => {
    // Split by spaces but keep punctuation attached if possible, simplified for React
    const parts = text.split(" ");
    return parts.map((part, index) => {
      // Check if this part contains a word in our vocab list
      // We look for the English part before the potential bracket
      const wordMatch = part.match(/^([a-zA-Z]+)/);
      const cleanWord = wordMatch ? wordMatch[0] : "";
      const vocab = findVocab(cleanWord);

      if (vocab) {
        return (
          <span 
            key={index} 
            className="inline-block mx-1 text-pink-600 font-bold border-b-2 border-pink-400 cursor-pointer hover:scale-110 transition-transform hover:bg-pink-100 rounded px-1"
            onClick={(e) => handleWordClick(e, cleanWord)}
          >
            {part}
          </span>
        );
      }
      return <span key={index} className="mx-1">{part}</span>;
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-32">
      <div className="space-y-6">
        {storyData.map((segment) => {
          const isMe = segment.speaker === 'Jacky';
          const isNarrator = segment.type === 'narrative';

          if (isNarrator) {
             return (
              <div
                key={segment.id}
                onClick={() => handleSegmentClick(segment)}
                className={`
                  cursor-pointer p-8 rounded-3xl transition-all duration-300 border-4 relative mx-4
                  ${activeSegmentId === segment.id 
                    ? 'bg-amber-50 border-amber-400 shadow-xl scale-[1.02]' 
                    : 'bg-white border-stone-200 hover:border-amber-200 hover:bg-stone-50 shadow-md'}
                `}
              >
                 <div className="flex flex-col gap-4">
                    <p className="text-3xl leading-relaxed text-gray-800 font-medium font-['Comic_Neue']">
                      {renderText(segment.text)}
                    </p>
                    <p className="text-xl text-gray-500 font-['Noto_Sans_TC'] font-bold">
                      {segment.chinese}
                    </p>
                 </div>
                 <div className="absolute -top-4 -left-2 bg-amber-400 text-white px-4 py-1 rounded-full text-sm font-bold shadow-sm">
                    Story
                 </div>
              </div>
             )
          }

          return (
            <div
              key={segment.id}
              onClick={() => handleSegmentClick(segment)}
              className={`
                flex gap-4 cursor-pointer transition-all duration-300
                ${isMe ? 'flex-row-reverse' : 'flex-row'}
              `}
            >
              {/* Avatar */}
              <div className={`
                w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg border-4 border-white
                ${getSpeakerColor(segment.speaker || '')}
              `}>
                {getAvatar(segment.speaker || '')}
              </div>

              {/* Bubble */}
              <div className={`
                max-w-[80%] p-6 rounded-3xl relative shadow-md border-b-4
                ${isMe 
                  ? 'bg-blue-100 border-blue-300 rounded-tr-none text-right' 
                  : 'bg-white border-gray-200 rounded-tl-none text-left'}
                ${activeSegmentId === segment.id ? 'ring-4 ring-yellow-300 transform scale-105 z-10' : ''}
              `}>
                 <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                    {segment.speaker}
                  </span>
                 <p className="text-2xl md:text-3xl leading-relaxed text-gray-800 font-bold mb-3">
                   {renderText(segment.text)}
                 </p>
                 <p className="text-lg text-gray-500 font-['Noto_Sans_TC'] font-bold opacity-80">
                   {segment.chinese}
                 </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cute Pop-up Modal */}
      {popupWord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setPopupWord(null)}>
          <div 
            className="bg-white rounded-[2rem] p-6 max-w-md w-full shadow-2xl transform transition-all animate-bounce-in border-8 border-sky-300"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative">
               <button 
                 onClick={() => setPopupWord(null)}
                 className="absolute -right-2 -top-2 bg-gray-200 hover:bg-red-400 hover:text-white rounded-full w-10 h-10 font-bold text-xl transition-colors"
               >
                 ✕
               </button>
               
               <div className="w-full h-48 rounded-2xl overflow-hidden mb-6 bg-gray-100 border-2 border-gray-100">
                  <img src={popupWord.image} alt={popupWord.word} className="w-full h-full object-cover" />
               </div>

               <div className="text-center space-y-4">
                  <h3 className="text-5xl font-black text-sky-600 tracking-wide font-['Comic_Neue']">{popupWord.word}</h3>
                  <div className="flex items-center justify-center gap-3">
                     <span className="text-2xl text-gray-400 font-mono">{popupWord.phonetic}</span>
                  </div>
                  <div className="bg-yellow-100 py-3 rounded-xl">
                    <p className="text-4xl font-black text-yellow-700 font-['Noto_Sans_TC']">{popupWord.chinese}</p>
                  </div>
                  
                  <button 
                    onClick={() => speakText(popupWord.word)}
                    className="w-full bg-sky-400 hover:bg-sky-500 text-white rounded-xl py-4 text-2xl font-bold shadow-lg border-b-4 border-sky-600 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-3"
                  >
                    <span>🔊</span> Listen (聽)
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper for vibrant avatars
const getSpeakerColor = (speaker: string) => {
  switch (speaker.toLowerCase()) {
    case 'jacky': return 'bg-blue-400';
    case 'dad': return 'bg-green-500';
    case 'mum': return 'bg-pink-400';
    default: return 'bg-purple-400';
  }
};

const getAvatar = (speaker: string) => {
  switch (speaker.toLowerCase()) {
    case 'jacky': return '👦🏻';
    case 'dad': return '👨🏻';
    case 'mum': return '👩🏻';
    case 'sister': return '👧🏻';
    case 'brother': return '🧒🏻';
    default: return '🐮';
  }
};
