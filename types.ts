
export enum ViewMode {
  VOCABULARY = 'VOCABULARY',
  LANGUAGE_FOCUS = 'LANGUAGE_FOCUS',
  WARMUP_GAME = 'WARMUP_GAME',
  WARMUP_QA = 'WARMUP_QA',
  READING = 'READING',
  POST_READING = 'POST_READING',
  PHONICS = 'PHONICS',
  VALUES = 'VALUES',
}

export interface StorySegment {
  id: string;
  speaker?: string; // e.g., "Dad", "Jacky"
  text: string;
  chinese: string;
  type: 'dialogue' | 'narrative';
  side?: 'left' | 'right'; // Explicitly control alignment
}

export interface VocabularyWord {
  word: string;
  phonetic: string;
  chinese: string;
  example: string;
  image: string; // URL to image
  emoji?: string; // Emoji for decoration
  hideFromList?: boolean; // If true, do not show in the Vocabulary List view
  noStoryHighlight?: boolean; // If true, do not highlight/make interactive in Story view
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

export interface InlineQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}
