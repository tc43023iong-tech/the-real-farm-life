
import React, { useState, useEffect } from 'react';
import { VocabularyWord } from '../types';

interface VocabularyListProps {
  words: VocabularyWord[];
}

export const VocabularyList: React.FC<VocabularyListProps> = ({ words }) => {
  // Filter out words that should be hidden from this list
  const displayWords = words.filter(w => !w.hideFromList);
  
  // Game 1 State: Scramble
  const [scrambleWord, setScrambleWord] = useState<VocabularyWord | null>(null);
  const [showScrambleAnswer, setShowScrambleAnswer] = useState(false);

  // Game 2 State: Emoji
  const [emojiWord, setEmojiWord] = useState<VocabularyWord | null>(null);
  const [emojiOptions, setEmojiOptions] = useState<string[]>([]);
  const [showEmojiAnswer, setShowEmojiAnswer] = useState(false);
  const [emojiFeedback, setEmojiFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // Game 3 State: Word Match (English -> Chinese)
  const [matchWord, setMatchWord] = useState<VocabularyWord | null>(null);
  const [matchOptions, setMatchOptions] = useState<string[]>([]);
  const [matchFeedback, setMatchFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // --- Game 1 Logic ---
  const getScrambled = (word: string) => {
    return word.split('').sort(() => 0.5 - Math.random()).join(' ').toUpperCase();
  };

  const handleNextScramble = () => {
     const random = displayWords[Math.floor(Math.random() * displayWords.length)];
     setScrambleWord(random);
     setShowScrambleAnswer(false);
  };

  // --- Game 2 Logic ---
  const handleNextEmoji = () => {
    const emojiWords = displayWords.filter(w => w.emoji && w.emoji.trim() !== '');
    if (emojiWords.length === 0) return;
    const random = emojiWords[Math.floor(Math.random() * emojiWords.length)];
    const distractors = displayWords.filter(w => w.word !== random.word).sort(() => 0.5 - Math.random()).slice(0, 2).map(w => w.word);
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

  // --- Game 3 Logic ---
  const handleNextMatch = () => {
      const random = displayWords[Math.floor(Math.random() * displayWords.length)];
      // Get Chinese definition without parens for cleaner buttons
      const getCleanChinese = (t: string) => t.replace(/\s*\(.*?\)/g, '').trim();
      
      const correct = getCleanChinese(random.chinese);
      const distractors = displayWords
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
          setTimeout(() => {
              handleNextMatch();
          }, 1500);
      } else {
          setMatchFeedback('incorrect');
          setTimeout(() => setMatchFeedback(null), 1000);
      }
  };


  // Initialize games
  useEffect(() => {
    if (!scrambleWord && displayWords.length > 0) handleNextScramble();
    if (!emojiWord && displayWords.length > 0) handleNextEmoji();
    if (!matchWord && displayWords.length > 0) handleNextMatch();
  }, [displayWords]);

  return (
    <div className="max-w-7xl mx-auto pb-48 px-4">
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
              
              {/* Game 1: Word Scramble */}
              <div className="bg-orange-50 rounded-[2rem] p-8 border-4 border-orange-200 shadow-lg text-center relative overflow-hidden w-full">
                  <div className="absolute top-0 left-0 bg-orange-200 text-orange-800 px-6 py-2 rounded-br-2xl font-bold text-xl">Game 1</div>
                  <h3 className="text-3xl font-bold text-orange-800 mt-6 mb-6">Word Scramble 🌪️</h3>
                  
                  {scrambleWord && (
                    <div className="space-y-8 max-w-2xl mx-auto">
                        <div className="bg-white p-8 rounded-3xl border-2 border-orange-100 min-h-[140px] flex items-center justify-center">
                            {showScrambleAnswer ? (
                                <div>
                                    <p className="text-5xl font-black text-green-600 animate-bounce">{scrambleWord.word}</p>
                                    <p className="text-2xl text-gray-500 font-['Noto_Sans_TC'] mt-3 font-medium">{scrambleWord.chinese}</p>
                                </div>
                            ) : (
                                <p className="text-5xl font-black text-gray-400 tracking-widest leading-relaxed">{getScrambled(scrambleWord.word)}</p>
                            )}
                        </div>

                        <div className="flex justify-center gap-4">
                            {!showScrambleAnswer ? (
                                <button 
                                    onClick={() => setShowScrambleAnswer(true)}
                                    className="bg-orange-500 text-white px-8 py-3 text-xl rounded-2xl font-bold shadow-md hover:bg-orange-600 active:scale-95 transition-all"
                                >
                                    Reveal Answer 👀
                                </button>
                            ) : (
                                <button 
                                    onClick={handleNextScramble}
                                    className="bg-green-500 text-white px-8 py-3 text-xl rounded-2xl font-bold shadow-md hover:bg-green-600 active:scale-95 transition-all"
                                >
                                    Next Word ➡️
                                </button>
                            )}
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
                        {/* Feedback Overlay */}
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

               {/* Game 3: Match Up (New) */}
               <div className="bg-sky-50 rounded-[2rem] p-8 border-4 border-sky-200 shadow-lg text-center relative overflow-hidden w-full">
                  <div className="absolute top-0 left-0 bg-sky-200 text-sky-800 px-6 py-2 rounded-br-2xl font-bold text-xl">Game 3</div>
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
                             {/* Optional: Show Emoji helper for Match game too? Or keep it text only for difficulty? Let's keep it text focus */}
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

          </div>
      </div>
    </div>
  );
};
