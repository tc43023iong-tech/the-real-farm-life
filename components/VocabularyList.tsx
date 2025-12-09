
import React, { useState, useEffect, useRef } from 'react';
import { VocabularyWord } from '../types';

interface VocabularyListProps {
  words: VocabularyWord[];
}

// Words to be displayed in the special "Passage Words" section
const PASSAGE_WORDS = ["boo", "tongue", "boring", "sounds", "triple", "sweet potato"];

// Specific words requested for the games
const GAME_TARGET_WORDS = [
  "outdoor activities",
  "plant vegetables",
  "pick fruit",
  "feed animals",
  "ride a horse",
  "build a sandcastle",
  "look at shells",
  "go swimming",
  "take photos",
  "have a picnic",
  "go camping",
  "have a barbecue",
  "real",
  "plans",
  "outing",
  "leave",
  "feels",
  "no way",
  "weekend",
  "use",
  "busy",
  "phone",
  "sunrise",
  "sunset",
  "goat"
];

// Data for Sentence Builder
const GAME_SENTENCES = [
    { sentence: "We ___ vegetables in the garden.", answer: "plant", options: ["plant", "pick", "feed"] },
    { sentence: "I like to ___ animals.", answer: "feed", options: ["feed", "build", "ride"] },
    { sentence: "Let's ___ a sandcastle.", answer: "build", options: ["build", "look", "take"] },
    { sentence: "Mum likes to ___ photos.", answer: "take", options: ["take", "have", "go"] },
    { sentence: "We ___ camping in the holiday.", answer: "go", options: ["go", "have", "use"] },
    { sentence: "This is a ___ farm.", answer: "real", options: ["real", "busy", "wet"] },
    { sentence: "___ your phone at home.", answer: "Leave", options: ["Leave", "Use", "Plan"] },
    { sentence: "Have a nice ___.", answer: "weekend", options: ["weekend", "outing", "sunset"] }
];

// Helper to shuffle array (Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

export const VocabularyList: React.FC<VocabularyListProps> = ({ words }) => {
  // Filter out words that should be hidden from this list
  const displayWords = words.filter(w => !w.hideFromList);
  
  // Split into Passage Words and General Words
  const passageVocab = displayWords.filter(w => PASSAGE_WORDS.includes(w.word.toLowerCase()));
  const generalVocab = displayWords.filter(w => !PASSAGE_WORDS.includes(w.word.toLowerCase()));
  
  // Filter specifically for games (case-insensitive match)
  const gameWords = displayWords.filter(w => 
    GAME_TARGET_WORDS.includes(w.word) || 
    GAME_TARGET_WORDS.includes(w.word.toLowerCase())
  );

  // --- Queues for random non-repeating logic ---
  const [matchQueue, setMatchQueue] = useState<VocabularyWord[]>([]);
  const [emojiQueue, setEmojiQueue] = useState<VocabularyWord[]>([]);
  const [spellingQueue, setSpellingQueue] = useState<VocabularyWord[]>([]);
  const [bubbleQueue, setBubbleQueue] = useState<VocabularyWord[]>([]);
  const [sentenceQueue, setSentenceQueue] = useState<number[]>([]);

  // --- Game State 1: Word Match (English -> Chinese) ---
  const [matchWord, setMatchWord] = useState<VocabularyWord | null>(null);
  const [matchOptions, setMatchOptions] = useState<string[]>([]);
  const [matchFeedback, setMatchFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // --- Game State 2: Emoji Detective ---
  const [emojiWord, setEmojiWord] = useState<VocabularyWord | null>(null);
  const [emojiOptions, setEmojiOptions] = useState<string[]>([]);
  const [showEmojiAnswer, setShowEmojiAnswer] = useState(false);
  const [emojiFeedback, setEmojiFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // --- Game State 3: Spelling Bee ---
  const [spellingWord, setSpellingWord] = useState<VocabularyWord | null>(null);
  const [scrambledLetters, setScrambledLetters] = useState<{char: string, id: number}[]>([]);
  const [userSpelling, setUserSpelling] = useState<(string | null)[]>([]); // Array matching length of word
  const [spellingFeedback, setSpellingFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // --- Game State 5: Bubble Pop ---
  interface BubbleOption {
    id: number;
    word: string;
    left: number;
    top: number;
    duration: number;
    delay: number;
    floatX: number;
    floatY: number;
  }
  const [bubbleTarget, setBubbleTarget] = useState<VocabularyWord | null>(null);
  const [bubbleOptions, setBubbleOptions] = useState<BubbleOption[]>([]);
  const [bubbleFeedback, setBubbleFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // --- Game State 4: Sentence Builder ---
  const [currentSentenceData, setCurrentSentenceData] = useState<typeof GAME_SENTENCES[0] | null>(null);
  const [sentenceFeedback, setSentenceFeedback] = useState<'correct' | 'incorrect' | null>(null);


  // --- Logic: Game 1 (Match) ---
  const handleNextMatch = () => {
      if (gameWords.length === 0) return;
      
      let nextQueue = [...matchQueue];
      if (nextQueue.length === 0) {
          nextQueue = shuffleArray(gameWords);
      }

      const random = nextQueue.pop();
      setMatchQueue(nextQueue); // Update queue state
      
      if (!random) return; // Should not happen

      const getCleanChinese = (t: string) => t.replace(/\s*\(.*?\)/g, '').trim();
      
      const correct = getCleanChinese(random.chinese);
      const distractors = gameWords
          .filter(w => w.word !== random.word)
          .sort(() => 0.5 - Math.random())
          .slice(0, 2)
          .map(w => getCleanChinese(w.chinese));
      
      const opts = shuffleArray([correct, ...distractors]);
      setMatchWord(random);
      setMatchOptions(opts);
      setMatchFeedback(null);
  };

  const handleMatchGuess = (guess: string) => {
      if (!matchWord) return;
      const correct = matchWord.chinese.replace(/\s*\(.*?\)/g, '').trim();
      if (guess === correct) {
          setMatchFeedback('correct');
          setTimeout(() => handleNextMatch(), 1500);
      } else {
          setMatchFeedback('incorrect');
          setTimeout(() => setMatchFeedback(null), 1000);
      }
  };

  // --- Logic: Game 2 (Emoji) ---
  const handleNextEmoji = () => {
    // Candidates are game words that have an emoji
    const allEmojiWords = gameWords.filter(w => w.emoji && w.emoji.trim() !== '');
    if (allEmojiWords.length === 0) return;

    let nextQueue = [...emojiQueue];
    // Filter queue to ensure it only contains valid emoji words (in case gameWords changed)
    const validQueue = nextQueue.filter(q => allEmojiWords.some(w => w.word === q.word));
    
    if (validQueue.length === 0) {
        nextQueue = shuffleArray(allEmojiWords);
    } else {
        nextQueue = validQueue;
    }

    const random = nextQueue.pop();
    setEmojiQueue(nextQueue);
    
    if (!random) return;

    const distractors = gameWords
        .filter(w => w.word !== random.word)
        .sort(() => 0.5 - Math.random())
        .slice(0, 2)
        .map(w => w.word);
    
    const opts = shuffleArray([random.word, ...distractors]);
    setEmojiWord(random);
    setEmojiOptions(opts);
    setShowEmojiAnswer(false);
    setEmojiFeedback(null);
  };

  const handleEmojiGuess = (guess: string) => {
      if (!emojiWord) return;
      if (guess === emojiWord.word) {
          setEmojiFeedback('correct');
          setShowEmojiAnswer(true);
      } else {
          setEmojiFeedback('incorrect');
          setTimeout(() => setEmojiFeedback(null), 1000);
      }
  };

  // --- Logic: Game 3 (Spelling) ---
  const handleNextSpelling = () => {
      if (gameWords.length === 0) return;

      let nextQueue = [...spellingQueue];
      if (nextQueue.length === 0) {
          nextQueue = shuffleArray(gameWords);
      }

      const random = nextQueue.pop();
      setSpellingQueue(nextQueue);

      if (!random) return;

      setSpellingWord(random);
      
      // Initialize blank slots (null for letters, ' ' for spaces)
      const initialSlots = random.word.split('').map(char => char === ' ' ? ' ' : null);
      setUserSpelling(initialSlots);

      // Scramble letters (excluding spaces)
      const letters = random.word.replace(/ /g, '').split('').map((char, i) => ({ char, id: i }));
      const scrambled = shuffleArray([...letters]);
      setScrambledLetters(scrambled);
      setSpellingFeedback(null);
  };

  const handleSpellingClick = (charObj: {char: string, id: number}) => {
      if (spellingFeedback === 'correct') return;

      // Find first empty slot
      const nextIndex = userSpelling.findIndex(slot => slot === null);
      if (nextIndex === -1) return; // Full

      const newSpelling = [...userSpelling];
      newSpelling[nextIndex] = charObj.char;
      setUserSpelling(newSpelling);

      // Remove used tile from scrambled options
      setScrambledLetters(prev => prev.filter(item => item.id !== charObj.id));

      // Check if complete
      if (!newSpelling.includes(null)) {
          const guess = newSpelling.join('');
          if (guess === spellingWord?.word) {
              setSpellingFeedback('correct');
              setTimeout(() => handleNextSpelling(), 2000);
          } else {
             setSpellingFeedback('incorrect');
             // Reset after a delay
             setTimeout(() => {
                 setSpellingFeedback(null);
                 // Reset scrambled letters for retry logic is complex, simpler to just restart word
                 const originalLetters = spellingWord!.word.replace(/ /g, '').split('').map((char, i) => ({ char, id: i }));
                 setScrambledLetters(shuffleArray([...originalLetters]));
                 setUserSpelling(spellingWord!.word.split('').map(char => char === ' ' ? ' ' : null));
             }, 1000);
          }
      }
  };

  // --- Logic: Game 5 (Bubble Pop) ---
  const handleNextBubble = () => {
      if (gameWords.length === 0) return;

      let nextQueue = [...bubbleQueue];
      if (nextQueue.length === 0) {
          nextQueue = shuffleArray(gameWords);
      }
      
      const random = nextQueue.pop();
      setBubbleQueue(nextQueue);

      if (!random) return;
      
      setBubbleTarget(random);
      
      // Create bubbles
      const distractors = gameWords
        .filter(w => w.word !== random.word)
        .sort(() => 0.5 - Math.random())
        .slice(0, 7)
        .map(w => w.word);
      
      const bubblesData = shuffleArray([random.word, ...distractors])
         .map((w, i) => ({
             id: i,
             word: w,
             left: Math.random() * 80 + 5, // 5% to 85% horizontal
             top: Math.random() * 60 + 20, // 20% to 80% vertical (roughly)
             duration: 4 + Math.random() * 6, // 4-10s duration for wandering
             delay: Math.random() * 2,
             floatX: (Math.random() - 0.5) * 150, // Move X pixels
             floatY: (Math.random() - 0.5) * 150  // Move Y pixels
         }));
      
      setBubbleOptions(bubblesData);
      setBubbleFeedback(null);
  };

  const handleBubblePop = (word: string) => {
      if (!bubbleTarget) return;
      if (word === bubbleTarget.word) {
          setBubbleFeedback('correct');
          setTimeout(() => handleNextBubble(), 1500);
      } else {
          setBubbleFeedback('incorrect');
          setTimeout(() => setBubbleFeedback(null), 500);
      }
  };

  // --- Logic: Game 4 (Sentence Builder) ---
  const handleNextSentence = () => {
      if (GAME_SENTENCES.length === 0) return;
      
      let nextQueue = [...sentenceQueue];
      if (nextQueue.length === 0) {
          // Create indices array [0, 1, 2, ... length-1] and shuffle
          const indices = Array.from({ length: GAME_SENTENCES.length }, (_, i) => i);
          nextQueue = shuffleArray(indices);
      }

      const index = nextQueue.pop();
      setSentenceQueue(nextQueue);

      if (index === undefined) return;
      
      setCurrentSentenceData(GAME_SENTENCES[index]);
      setSentenceFeedback(null);
  }

  const handleSentenceGuess = (guess: string) => {
      if (!currentSentenceData) return;
      if (guess === currentSentenceData.answer) {
          setSentenceFeedback('correct');
          setTimeout(() => {
              handleNextSentence();
          }, 1500);
      } else {
          setSentenceFeedback('incorrect');
          setTimeout(() => setSentenceFeedback(null), 1000);
      }
  };

  // Helper for Card Themes
  const getTheme = (index: number) => {
     const themes = [
         { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-600', badge: 'bg-rose-200 text-rose-800' },
         { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-600', badge: 'bg-sky-200 text-sky-800' },
         { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600', badge: 'bg-amber-200 text-amber-800' },
         { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', badge: 'bg-emerald-200 text-emerald-800' },
         { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-600', badge: 'bg-violet-200 text-violet-800' },
     ];
     return themes[index % themes.length];
  };

  // Initialize Queues and Start Games on Load
  // Use a ref to prevent double-initialization in React Strict Mode if necessary, 
  // but useEffect with empty dependency is usually fine for this logic.
  // We check if "current" item is null to trigger the first fetch.
  useEffect(() => {
    if (gameWords.length > 0) {
        if (!matchWord) handleNextMatch();
        if (!emojiWord) handleNextEmoji();
        if (!spellingWord) handleNextSpelling();
        if (!bubbleTarget) handleNextBubble();
        if (!currentSentenceData) handleNextSentence();
    }
  }, [gameWords]); // Depend on gameWords availability

  return (
    <div className="max-w-7xl mx-auto pb-48 px-4">
       <style>
           {`
             @keyframes float-wander {
                 0% { transform: translate(0, 0); }
                 33% { transform: translate(var(--tx), var(--ty)); }
                 66% { transform: translate(var(--tx2), var(--ty2)); }
                 100% { transform: translate(0, 0); }
             }
           `}
       </style>

      {/* --- Section 1: All Words (General Vocabulary) --- */}
      {/* Moved "All Words" to be the first section as requested */}
      <div className="relative mb-12 text-center mt-8">
          <div className="inline-block bg-white px-8 py-3 rounded-[2rem] border-4 border-green-200 shadow-[0_8px_0_0_rgba(187,247,208,1)] transform -rotate-1">
             <h2 className="text-3xl font-black text-green-600">All Words (全部生字)</h2>
          </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-24">
        {generalVocab.map((item, index) => {
          const theme = getTheme(index);
          return (
            <div key={item.word} className={`bg-white rounded-[2rem] p-5 border-4 ${theme.border} shadow-[0_6px_0_0_rgba(0,0,0,0.05)] hover:shadow-[0_10px_0_0_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all group flex flex-col h-full relative`}>
              
              {/* Removed Speaker Icon as requested */}

              <div className="flex flex-col items-center text-center mb-2">
                 <div className={`text-6xl mb-3 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-sm`}>
                    {item.emoji}
                 </div>
                 <h3 className={`text-3xl font-black text-gray-800 leading-tight font-['Comic_Neue']`}>{item.word}</h3>
                 <p className="text-xs font-mono text-gray-400 mt-1 mb-3">{item.phonetic}</p>
              </div>
              
              <div className="mt-auto space-y-3">
                 <div className={`${theme.badge} py-2 px-4 rounded-xl text-center`}>
                    <p className="text-xl font-black font-['Noto_Sans_TC']">{item.chinese}</p>
                 </div>
                 <p className="text-gray-500 italic text-sm text-center border-t-2 border-gray-100 pt-2">
                    "{item.example}"
                 </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- Section 2: Passage Words (New Design) --- */}
      {/* Moved "Passage Words" to be the second section */}
      <div className="relative mb-16">
          <div className="text-center relative z-10">
              <div className="inline-block bg-white px-10 py-4 rounded-[2.5rem] border-4 border-amber-200 shadow-[0_8px_0_0_rgba(253,230,138,1)] transform rotate-1">
                 <h2 className="text-4xl font-black text-amber-600 mb-1 flex items-center justify-center gap-3">
                    <span>📖</span> Passage Words <span>👀</span>
                 </h2>
                 <p className="text-xl text-amber-500 font-bold font-['Noto_Sans_TC']">課文生詞</p>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20 px-2">
         {passageVocab.map((item, index) => (
             <div key={item.word} className="bg-white rounded-[2.5rem] p-6 border-4 border-amber-100 shadow-[0_8px_0_0_rgba(251,191,36,0.3)] relative overflow-hidden group hover:-translate-y-2 transition-all duration-300">
                  {/* Cute background decoration */}
                  <div className="absolute -top-12 -right-12 bg-amber-50 w-32 h-32 rounded-full opacity-60 group-hover:scale-125 transition-transform duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col items-center text-center h-full">
                      <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center text-6xl mb-4 group-hover:scale-110 transition-transform shadow-inner">
                          {item.emoji}
                      </div>
                      
                      <h3 className="text-4xl font-black text-gray-800 mb-2 font-['Comic_Neue'] tracking-wide">{item.word}</h3>
                      
                      <div className="bg-amber-100/50 px-4 py-1 rounded-full mb-4">
                          <p className="font-mono text-amber-800/70 font-bold text-sm">{item.phonetic}</p>
                      </div>
                      
                      <div className="mt-auto w-full">
                          <div className="bg-amber-50 rounded-2xl p-3 mb-3 border border-amber-100">
                             <p className="text-2xl font-black text-amber-600 font-['Noto_Sans_TC']">{item.chinese}</p>
                          </div>
                          <p className="text-gray-500 italic text-sm font-medium">"{item.example}"</p>
                      </div>
                  </div>
             </div>
         ))}
      </div>


      {/* Word Games Section */}
      <div className="border-t-4 border-dashed border-gray-200 pt-16">
          <div className="text-center mb-16">
             <h2 className="text-5xl font-black text-white inline-block bg-sky-400 px-10 py-4 rounded-full border-[6px] border-white shadow-xl transform rotate-2">
                Game Time! 🎮
             </h2>
          </div>

          <div className="flex flex-col gap-20 max-w-4xl mx-auto">
              
              {/* Game 1: Word Match */}
              <div className="bg-white rounded-[3rem] p-8 md:p-12 border-[6px] border-sky-200 shadow-2xl relative text-center overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-sky-200 text-sky-800 px-8 py-2 rounded-b-3xl font-black text-xl shadow-sm">Game 1: Match 🧩</div>
                  
                  {matchWord && (
                     <div className="mt-12 space-y-8 relative z-10">
                         {matchFeedback === 'correct' && (
                             <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                 <div className="text-9xl animate-bounce filter drop-shadow-lg">🎉</div>
                             </div>
                         )}
                         {matchFeedback === 'incorrect' && (
                             <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                 <div className="text-9xl animate-shake filter drop-shadow-lg">❌</div>
                             </div>
                         )}

                         <div className="bg-sky-50 p-10 rounded-[2.5rem] border-4 border-sky-100 flex flex-col items-center justify-center">
                             <p className="text-6xl md:text-7xl font-black text-sky-600 font-['Comic_Neue']">{matchWord.word}</p>
                         </div>

                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                             {matchOptions.map((opt, idx) => (
                                 <button
                                     key={idx}
                                     onClick={() => handleMatchGuess(opt)}
                                     className="bg-white border-b-[6px] border-sky-200 text-sky-700 py-5 rounded-2xl text-2xl font-black hover:bg-sky-50 hover:border-sky-300 hover:-translate-y-1 active:border-b-0 active:translate-y-2 transition-all font-['Noto_Sans_TC'] shadow-sm"
                                 >
                                     {opt}
                                 </button>
                             ))}
                         </div>
                     </div>
                  )}
              </div>

              {/* Game 2: Emoji Detective */}
              <div className="bg-white rounded-[3rem] p-8 md:p-12 border-[6px] border-purple-200 shadow-2xl relative text-center overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-purple-200 text-purple-800 px-8 py-2 rounded-b-3xl font-black text-xl shadow-sm">Game 2: Detective 🕵️</div>

                  {emojiWord && (
                    <div className="mt-12 space-y-8 relative z-10">
                        {emojiFeedback === 'correct' && (
                             <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                 <div className="text-9xl animate-bounce filter drop-shadow-lg">🎉</div>
                             </div>
                        )}
                        {emojiFeedback === 'incorrect' && (
                             <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                 <div className="text-9xl animate-shake filter drop-shadow-lg">❌</div>
                             </div>
                        )}

                        <div className="bg-purple-50 p-10 rounded-[2.5rem] border-4 border-purple-100 min-h-[180px] flex items-center justify-center">
                             {showEmojiAnswer ? (
                                <div className="animate-pop-in">
                                    <div className="text-7xl mb-3">{emojiWord.emoji}</div>
                                    <p className="text-5xl font-black text-purple-600">{emojiWord.word}</p>
                                    <p className="text-2xl text-gray-500 font-['Noto_Sans_TC'] mt-2 font-bold">{emojiWord.chinese}</p>
                                </div>
                            ) : (
                                <p className="text-[8rem] animate-pulse">{emojiWord.emoji}</p>
                            )}
                        </div>

                        {!showEmojiAnswer ? (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {emojiOptions.map((opt, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleEmojiGuess(opt)}
                                        className="bg-white border-b-[6px] border-purple-200 text-purple-700 py-5 rounded-2xl text-xl font-black hover:bg-purple-50 hover:-translate-y-1 active:border-b-0 active:translate-y-2 transition-all shadow-sm"
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="flex justify-center">
                                <button 
                                    onClick={handleNextEmoji}
                                    className="bg-purple-500 text-white px-10 py-4 text-2xl rounded-full font-black shadow-lg hover:bg-purple-600 hover:scale-105 transition-all"
                                >
                                    Next Emoji ➡️
                                </button>
                            </div>
                        )}
                    </div>
                  )}
              </div>

              {/* Game 3: Spelling Bee */}
              <div className="bg-white rounded-[3rem] p-8 md:p-12 border-[6px] border-amber-200 shadow-2xl relative text-center overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-amber-200 text-amber-800 px-8 py-2 rounded-b-3xl font-black text-xl shadow-sm">Game 3: Spelling 🐝</div>

                  {spellingWord && (
                    <div className="mt-12 space-y-8 relative z-10">
                        {spellingFeedback === 'correct' && (
                             <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                 <div className="text-9xl animate-bounce filter drop-shadow-lg">🍯</div>
                             </div>
                        )}
                        {spellingFeedback === 'incorrect' && (
                             <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                 <div className="text-9xl animate-shake filter drop-shadow-lg">🐝</div>
                             </div>
                        )}

                        <div className="flex flex-col items-center">
                            <div className="text-7xl mb-2">{spellingWord.emoji}</div>
                            <div className="bg-amber-100 px-6 py-2 rounded-full">
                                <p className="text-2xl text-amber-800 font-['Noto_Sans_TC'] font-black">{spellingWord.chinese}</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-2">
                            {userSpelling.map((char, index) => {
                                if (char === ' ') {
                                    return <div key={index} className="w-6 h-12"></div>;
                                }
                                return (
                                    <div key={index} className="w-12 h-16 md:w-16 md:h-20 bg-amber-50 border-b-[6px] border-amber-300 rounded-xl flex items-center justify-center text-4xl md:text-5xl font-black text-amber-800 shadow-sm">
                                        {char}
                                    </div>
                                )
                            })}
                        </div>

                        <div className="flex flex-wrap justify-center gap-3 min-h-[80px] bg-amber-50/50 p-6 rounded-3xl border-2 border-dashed border-amber-200">
                            {scrambledLetters.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleSpellingClick(item)}
                                    className="w-14 h-14 md:w-16 md:h-16 bg-white hover:bg-amber-200 border-2 border-amber-300 rounded-2xl text-3xl font-black text-amber-800 shadow-md active:scale-95 transition-all"
                                >
                                    {item.char}
                                </button>
                            ))}
                        </div>
                    </div>
                  )}
              </div>

               {/* Game 4: Sentence Builder */}
               <div className="bg-white rounded-[3rem] p-8 md:p-12 border-[6px] border-emerald-200 shadow-2xl relative text-center overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-emerald-200 text-emerald-800 px-8 py-2 rounded-b-3xl font-black text-xl shadow-sm">Game 4: Sentences ✍️</div>

                  {currentSentenceData && (
                    <div className="mt-12 space-y-8 relative z-10">
                        {sentenceFeedback === 'correct' && (
                                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                    <div className="text-9xl animate-bounce filter drop-shadow-lg">🌟</div>
                                </div>
                            )}
                            {sentenceFeedback === 'incorrect' && (
                                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                    <div className="text-9xl animate-shake filter drop-shadow-lg">❌</div>
                                </div>
                            )}

                            <div className="bg-emerald-50 p-8 rounded-[2.5rem] border-4 border-emerald-100 flex items-center justify-center min-h-[140px]">
                                <p className="text-3xl md:text-4xl font-bold text-gray-700 font-['Comic_Neue'] leading-relaxed">
                                    {currentSentenceData.sentence.split('___').map((part, i, arr) => (
                                        <span key={i}>
                                            {part}
                                            {i < arr.length - 1 && (
                                                <span className="inline-block min-w-[100px] border-b-[5px] border-emerald-400 mx-2 text-emerald-600 px-2 bg-white rounded-lg shadow-sm">
                                                    {sentenceFeedback === 'correct' ? currentSentenceData.answer : '?'}
                                                </span>
                                            )}
                                        </span>
                                    ))}
                                </p>
                            </div>

                            <div className="flex flex-wrap justify-center gap-4">
                                {currentSentenceData.options.map((opt, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSentenceGuess(opt)}
                                        className="bg-white border-b-[6px] border-emerald-200 text-emerald-800 px-8 py-4 rounded-2xl text-2xl font-black hover:bg-emerald-50 hover:border-emerald-300 hover:-translate-y-1 active:border-b-0 active:translate-y-2 transition-all shadow-sm"
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                    </div>
                  )}
              </div>

               {/* Game 5: Bubble Pop */}
               <div className="bg-white rounded-[3rem] p-8 md:p-12 border-[6px] border-indigo-200 shadow-2xl relative text-center overflow-hidden min-h-[500px]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-indigo-200 text-indigo-800 px-8 py-2 rounded-b-3xl font-black text-xl shadow-sm">Game 5: Pop! 🫧</div>

                  {bubbleTarget && (
                    <div className="mt-8 relative h-[400px] w-full bg-gradient-to-b from-indigo-50 to-white rounded-[2.5rem] border-4 border-indigo-100 overflow-hidden shadow-inner">
                        {/* Target Display */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white px-8 py-3 rounded-full border-4 border-indigo-200 z-10 shadow-lg">
                            <span className="text-3xl font-black text-indigo-600">{bubbleTarget.chinese}</span>
                        </div>

                         {/* Feedback */}
                         {bubbleFeedback === 'correct' && (
                             <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none bg-indigo-200/20 backdrop-blur-sm">
                                 <div className="text-9xl animate-ping filter drop-shadow-lg">🫧</div>
                             </div>
                         )}
                         {bubbleFeedback === 'incorrect' && (
                             <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                 <div className="text-9xl animate-shake filter drop-shadow-lg">❌</div>
                             </div>
                         )}

                        {/* Bubbles */}
                        {bubbleOptions.map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => handleBubblePop(opt.word)}
                                className="absolute rounded-full bg-indigo-400 text-white font-bold flex items-center justify-center shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.2),5px_5px_10px_rgba(0,0,0,0.1)] border-2 border-indigo-300/50 hover:bg-indigo-500 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md bg-opacity-80"
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    left: `${opt.left}%`,
                                    top: `${opt.top}%`,
                                    // Custom variables for keyframes
                                    '--tx': `${opt.floatX}px`,
                                    '--ty': `${opt.floatY}px`,
                                    '--tx2': `${-opt.floatX * 0.5}px`,
                                    '--ty2': `${-opt.floatY * 0.5}px`,
                                    animation: `float-wander ${opt.duration}s infinite ease-in-out ${opt.delay}s`
                                } as React.CSSProperties}
                            >
                                <span className="text-lg leading-tight p-2 pointer-events-none select-none drop-shadow-md">{opt.word}</span>
                                {/* Bubble shine */}
                                <div className="absolute top-3 left-3 w-6 h-3 bg-white opacity-40 rounded-full transform -rotate-45"></div>
                            </button>
                        ))}
                    </div>
                  )}
              </div>

          </div>
      </div>
    </div>
  );
};
