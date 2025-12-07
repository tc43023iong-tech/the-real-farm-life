
import React, { useState, useEffect } from 'react';
import { VocabularyWord } from '../types';

interface VocabularyListProps {
  words: VocabularyWord[];
}

// Specific words requested for the games
const GAME_TARGET_WORDS = [
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
  "goat",
  "real",
  "plans",
  "outing"
];

// Data for Sentence Builder
const GAME_SENTENCES = [
    { sentence: "I want to ___ a sandcastle.", answer: "build", options: ["build", "plant", "look"] },
    { sentence: "Let's ___ swimming.", answer: "go", options: ["have", "go", "pick"] },
    { sentence: "We can ___ animals.", answer: "feed", options: ["build", "feed", "ride"] },
    { sentence: "The apples are ___.", answer: "sweet", options: ["wet", "sweet", "busy"] },
    { sentence: "I ___ a horse.", answer: "ride", options: ["ride", "look", "use"] },
    { sentence: "We have a ___ in the park.", answer: "picnic", options: ["phone", "picnic", "goat"] }
];

export const VocabularyList: React.FC<VocabularyListProps> = ({ words }) => {
  // Filter out words that should be hidden from this list
  const displayWords = words.filter(w => !w.hideFromList);
  
  // Filter specifically for games (case-insensitive match)
  const gameWords = displayWords.filter(w => 
    GAME_TARGET_WORDS.includes(w.word) || 
    GAME_TARGET_WORDS.includes(w.word.toLowerCase())
  );

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

  // --- Game State 5 (now moved to 5): Bubble Pop ---
  // Using explicit type definition for bubble state
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

  // --- Game State 4 (was 5): Sentence Builder ---
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [sentenceFeedback, setSentenceFeedback] = useState<'correct' | 'incorrect' | null>(null);


  // --- Logic: Game 1 (Match) ---
  const handleNextMatch = () => {
      if (gameWords.length === 0) return;
      const random = gameWords[Math.floor(Math.random() * gameWords.length)];
      const getCleanChinese = (t: string) => t.replace(/\s*\(.*?\)/g, '').trim();
      
      const correct = getCleanChinese(random.chinese);
      const distractors = gameWords
          .filter(w => w.word !== random.word)
          .sort(() => 0.5 - Math.random())
          .slice(0, 2)
          .map(w => getCleanChinese(w.chinese));
      
      const opts = [correct, ...distractors].sort(() => 0.5 - Math.random());
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
    const candidates = gameWords.filter(w => w.emoji && w.emoji.trim() !== '');
    if (candidates.length === 0) return;
    const random = candidates[Math.floor(Math.random() * candidates.length)];
    const distractors = gameWords
        .filter(w => w.word !== random.word)
        .sort(() => 0.5 - Math.random())
        .slice(0, 2)
        .map(w => w.word);
    const opts = [random.word, ...distractors].sort(() => 0.5 - Math.random());
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
      const random = gameWords[Math.floor(Math.random() * gameWords.length)];
      setSpellingWord(random);
      
      // Initialize blank slots (null for letters, ' ' for spaces)
      const initialSlots = random.word.split('').map(char => char === ' ' ? ' ' : null);
      setUserSpelling(initialSlots);

      // Scramble letters (excluding spaces)
      const letters = random.word.replace(/ /g, '').split('').map((char, i) => ({ char, id: i }));
      const scrambled = [...letters].sort(() => 0.5 - Math.random());
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
                 setScrambledLetters([...originalLetters].sort(() => 0.5 - Math.random()));
                 setUserSpelling(spellingWord!.word.split('').map(char => char === ' ' ? ' ' : null));
             }, 1000);
          }
      }
  };

  // --- Logic: Game 5 (Bubble Pop) ---
  const handleNextBubble = () => {
      if (gameWords.length === 0) return;
      const random = gameWords[Math.floor(Math.random() * gameWords.length)];
      setBubbleTarget(random);
      
      // Create bubbles - Increased count to 7-8 total
      const distractors = gameWords
        .filter(w => w.word !== random.word)
        .sort(() => 0.5 - Math.random())
        .slice(0, 7)
        .map(w => w.word);
      
      const bubblesData = [random.word, ...distractors]
         .sort(() => 0.5 - Math.random())
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
  const handleSentenceGuess = (guess: string) => {
      const current = GAME_SENTENCES[sentenceIndex];
      if (guess === current.answer) {
          setSentenceFeedback('correct');
          setTimeout(() => {
              setSentenceFeedback(null);
              setSentenceIndex((prev) => (prev + 1) % GAME_SENTENCES.length);
          }, 1500);
      } else {
          setSentenceFeedback('incorrect');
          setTimeout(() => setSentenceFeedback(null), 1000);
      }
  };


  // Initialize all games once on load
  useEffect(() => {
    if (gameWords.length > 0) {
        if (!matchWord) handleNextMatch();
        if (!emojiWord) handleNextEmoji();
        if (!spellingWord) handleNextSpelling();
        if (!bubbleTarget) handleNextBubble();
    }
  }, [gameWords]);

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

       <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-green-800 mb-2">New Words (生字表)</h2>
        <p className="text-lg text-green-600">Learn the hard words!</p>
      </div>

      {/* Vocabulary Grid - Wider (max-w-7xl) and 4 Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
        {displayWords.map((item) => (
          <div key={item.word} className="bg-white rounded-xl shadow-md p-5 border-b-4 border-green-400 hover:shadow-lg transition-shadow group flex flex-col h-full">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                 {/* English: Bigger and Bolder */}
                 <h3 className="text-3xl font-black text-gray-800 leading-tight">{item.word}</h3>
              </div>
               {item.emoji && <span className="text-4xl group-hover:scale-125 transition-transform block">{item.emoji}</span>}
            </div>
            
            <p className="text-sm font-mono text-gray-500 mb-2">{item.phonetic}</p>
            
            <div className="bg-green-50 rounded-lg p-3 mb-3 mt-auto">
              {/* Chinese: Normal weight (not bold) */}
              <p className="text-xl font-medium text-green-800 font-['Noto_Sans_TC']">{item.chinese}</p>
            </div>
            
            <p className="text-gray-600 italic text-sm border-l-2 border-gray-300 pl-3">
              "{item.example}"
            </p>
          </div>
        ))}
      </div>

      {/* Word Games Section */}
      <div className="border-t-4 border-dashed border-green-200 pt-10">
          <div className="text-center mb-12">
             <h2 className="text-4xl font-black text-green-700 inline-block bg-white px-8 py-2 rounded-full border-4 border-green-100 shadow-sm">Word Games Playground 🎮</h2>
          </div>

          <div className="flex flex-col gap-16 max-w-4xl mx-auto">
              
              {/* Game 1: Word Match */}
              <div className="bg-sky-50 rounded-[2rem] p-8 border-4 border-sky-200 shadow-lg text-center relative overflow-hidden w-full">
                  <div className="absolute top-0 left-0 bg-sky-200 text-sky-800 px-6 py-2 rounded-br-2xl font-bold text-xl">Game 1</div>
                  <h3 className="text-3xl font-bold text-sky-800 mt-6 mb-6">Word Match 🧩</h3>

                  {matchWord && (
                     <div className="space-y-8 max-w-2xl mx-auto relative">
                         {/* Feedback */}
                         {matchFeedback === 'correct' && (
                             <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                 <div className="text-8xl animate-bounce">🎉</div>
                             </div>
                         )}
                         {matchFeedback === 'incorrect' && (
                             <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                 <div className="text-8xl animate-shake">❌</div>
                             </div>
                         )}

                         <div className="bg-white p-10 rounded-3xl border-2 border-sky-100 min-h-[140px] flex flex-col items-center justify-center relative z-10">
                             <p className="text-6xl font-black text-gray-800 font-['Comic_Neue'] tracking-wide">{matchWord.word}</p>
                         </div>

                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
                             {matchOptions.map((opt, idx) => (
                                 <button
                                     key={idx}
                                     onClick={() => handleMatchGuess(opt)}
                                     className="bg-white border-b-4 border-sky-200 text-sky-800 py-4 px-2 rounded-xl text-xl font-bold hover:bg-sky-50 hover:-translate-y-1 active:border-b-0 active:translate-y-1 transition-all font-['Noto_Sans_TC']"
                                 >
                                     {opt}
                                 </button>
                             ))}
                         </div>
                     </div>
                  )}
              </div>

              {/* Game 2: Emoji Detective */}
              <div className="bg-purple-50 rounded-[2rem] p-8 border-4 border-purple-200 shadow-lg text-center relative overflow-hidden w-full">
                   <div className="absolute top-0 left-0 bg-purple-200 text-purple-800 px-6 py-2 rounded-br-2xl font-bold text-xl">Game 2</div>
                  <h3 className="text-3xl font-bold text-purple-800 mt-6 mb-6">Emoji Detective 🕵️</h3>

                  {emojiWord && (
                    <div className="space-y-8 max-w-2xl mx-auto relative">
                        {emojiFeedback === 'correct' && (
                             <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                 <div className="text-8xl animate-bounce">🎉</div>
                             </div>
                        )}
                        {emojiFeedback === 'incorrect' && (
                             <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                 <div className="text-8xl animate-shake">❌</div>
                             </div>
                        )}

                        <div className="bg-white p-8 rounded-3xl border-2 border-purple-100 min-h-[140px] flex items-center justify-center relative z-10">
                             {showEmojiAnswer ? (
                                <div>
                                    <div className="text-6xl mb-2">{emojiWord.emoji}</div>
                                    <p className="text-5xl font-black text-purple-600">{emojiWord.word}</p>
                                    <p className="text-2xl text-gray-500 font-['Noto_Sans_TC'] mt-3 font-medium">{emojiWord.chinese}</p>
                                </div>
                            ) : (
                                <p className="text-9xl animate-bounce-slow">{emojiWord.emoji}</p>
                            )}
                        </div>

                        {!showEmojiAnswer ? (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {emojiOptions.map((opt, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleEmojiGuess(opt)}
                                        className="bg-white border-b-4 border-purple-200 text-purple-800 py-4 rounded-xl text-xl font-bold hover:bg-purple-50 hover:-translate-y-1 active:border-b-0 active:translate-y-1 transition-all"
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="flex justify-center">
                                <button 
                                    onClick={handleNextEmoji}
                                    className="bg-blue-500 text-white px-8 py-3 text-xl rounded-2xl font-bold shadow-md hover:bg-blue-600 active:scale-95 transition-all"
                                >
                                    Next Emoji ➡️
                                </button>
                            </div>
                        )}
                    </div>
                  )}
              </div>

              {/* Game 3: Spelling Bee */}
              <div className="bg-amber-50 rounded-[2rem] p-8 border-4 border-amber-200 shadow-lg text-center relative overflow-hidden w-full">
                  <div className="absolute top-0 left-0 bg-amber-200 text-amber-800 px-6 py-2 rounded-br-2xl font-bold text-xl">Game 3</div>
                  <h3 className="text-3xl font-bold text-amber-800 mt-6 mb-6">Spelling Bee 🐝</h3>

                  {spellingWord && (
                    <div className="space-y-8 max-w-3xl mx-auto relative">
                        {spellingFeedback === 'correct' && (
                             <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                 <div className="text-8xl animate-bounce">🍯</div>
                             </div>
                        )}
                        {spellingFeedback === 'incorrect' && (
                             <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                 <div className="text-8xl animate-shake">🐝</div>
                             </div>
                        )}

                        {/* Image/Definition Area */}
                        <div className="flex flex-col items-center">
                            <div className="text-6xl mb-2">{spellingWord.emoji}</div>
                            <p className="text-xl text-gray-500 font-['Noto_Sans_TC'] font-bold">{spellingWord.chinese}</p>
                        </div>

                        {/* Blanks Area with Finger Space Logic */}
                        <div className="flex flex-wrap justify-center gap-2">
                            {userSpelling.map((char, index) => {
                                // If it is a space, render a spacer
                                if (char === ' ') {
                                    return <div key={index} className="w-8 h-12 flex items-center justify-center pointer-events-none"></div>;
                                }
                                // If letter
                                return (
                                    <div key={index} className="w-12 h-16 border-b-4 border-amber-400 bg-white rounded-t-lg flex items-center justify-center text-4xl font-black text-amber-900 shadow-sm">
                                        {char}
                                    </div>
                                )
                            })}
                        </div>

                        {/* Scrambled Letters */}
                        <div className="flex flex-wrap justify-center gap-3 min-h-[80px]">
                            {scrambledLetters.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleSpellingClick(item)}
                                    className="w-14 h-14 bg-amber-100 hover:bg-amber-300 border-2 border-amber-300 rounded-xl text-3xl font-bold text-amber-900 shadow-md active:scale-95 transition-all"
                                >
                                    {item.char}
                                </button>
                            ))}
                        </div>
                    </div>
                  )}
              </div>

               {/* Game 4: Sentence Builder (Swapped) */}
               <div className="bg-emerald-50 rounded-[2rem] p-8 border-4 border-emerald-200 shadow-lg text-center relative overflow-hidden w-full">
                  <div className="absolute top-0 left-0 bg-emerald-200 text-emerald-800 px-6 py-2 rounded-br-2xl font-bold text-xl">Game 4</div>
                  <h3 className="text-3xl font-bold text-emerald-800 mt-6 mb-6">Sentence Builder ✍️</h3>

                  <div className="space-y-8 max-w-2xl mx-auto relative">
                       {/* Feedback */}
                       {sentenceFeedback === 'correct' && (
                             <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                 <div className="text-8xl animate-bounce">🌟</div>
                             </div>
                        )}
                        {sentenceFeedback === 'incorrect' && (
                             <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                 <div className="text-8xl animate-shake">❌</div>
                             </div>
                        )}

                        <div className="bg-white p-8 rounded-3xl border-2 border-emerald-100 flex items-center justify-center min-h-[120px]">
                             <p className="text-3xl md:text-4xl font-bold text-gray-700 font-['Comic_Neue'] leading-relaxed">
                                {GAME_SENTENCES[sentenceIndex].sentence.split('___').map((part, i, arr) => (
                                    <span key={i}>
                                        {part}
                                        {i < arr.length - 1 && (
                                            <span className="inline-block min-w-[100px] border-b-4 border-emerald-400 mx-2 text-emerald-600">
                                                {sentenceFeedback === 'correct' ? GAME_SENTENCES[sentenceIndex].answer : '?'}
                                            </span>
                                        )}
                                    </span>
                                ))}
                             </p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4">
                            {GAME_SENTENCES[sentenceIndex].options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSentenceGuess(opt)}
                                    className="bg-emerald-100 hover:bg-emerald-300 border-2 border-emerald-300 text-emerald-900 px-6 py-3 rounded-xl text-2xl font-bold shadow-sm transition-all active:scale-95"
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                  </div>
              </div>

               {/* Game 5: Bubble Pop (Swapped) */}
               <div className="bg-indigo-50 rounded-[2rem] p-8 border-4 border-indigo-200 shadow-lg text-center relative overflow-hidden w-full min-h-[500px]">
                  <div className="absolute top-0 left-0 bg-indigo-200 text-indigo-800 px-6 py-2 rounded-br-2xl font-bold text-xl">Game 5</div>
                  <h3 className="text-3xl font-bold text-indigo-800 mt-6 mb-2">Bubble Pop 🫧</h3>
                  <p className="text-gray-500 mb-6 font-['Noto_Sans_TC'] font-bold">Pop the matching bubble!</p>

                  {bubbleTarget && (
                    <div className="relative h-[400px] w-full bg-white rounded-3xl border-2 border-indigo-100 overflow-hidden">
                        {/* Target Display */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-indigo-100 px-6 py-2 rounded-full border-2 border-indigo-200 z-10 shadow-sm">
                            <span className="text-2xl font-black text-indigo-900">{bubbleTarget.chinese}</span>
                        </div>

                         {/* Feedback */}
                         {bubbleFeedback === 'correct' && (
                             <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none bg-indigo-200/20">
                                 <div className="text-9xl animate-ping">🫧</div>
                             </div>
                         )}
                         {bubbleFeedback === 'incorrect' && (
                             <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                 <div className="text-8xl animate-shake">❌</div>
                             </div>
                         )}

                        {/* Bubbles */}
                        {bubbleOptions.map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => handleBubblePop(opt.word)}
                                className="absolute rounded-full bg-indigo-400 text-white font-bold flex items-center justify-center shadow-lg border-2 border-white hover:bg-indigo-500 hover:scale-110 active:scale-95 cursor-pointer"
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
                                <span className="text-lg leading-tight p-2 pointer-events-none select-none">{opt.word}</span>
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
