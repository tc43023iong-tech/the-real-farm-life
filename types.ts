
export enum ViewMode {
  WARMUP = 'WARMUP',
  READING = 'READING',
  VOCABULARY = 'VOCABULARY',
  PHONICS = 'PHONICS',
  VALUES = 'VALUES',
  POST_READING = 'POST_READING',
  LANGUAGE_FOCUS = 'LANGUAGE_FOCUS'
}

export interface StorySegment {
  id: string;
  speaker?: string; // e.g., "Dad", "Jacky"
  text: string;
  chinese: string;
  type: 'dialogue' | 'narrative';
}

export interface VocabularyWord {
  word: string;
  phonetic: string;
  chinese: string;
  example: string;
  image: string; // URL to image
  emoji?: string; // Emoji for decoration
}

export interface PhonicsRule {
  symbol: string;
  soundName: string; // e.g., "ar as in car"
  examples: string[];
  description: string;
}

export interface WarmUpQuestion {
  id: string;
  question: string; // Teacher's question
  chineseQuestion: string;
  answers: { text: string; icon: string }[];
}
