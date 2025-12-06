

import React, { useState, useEffect } from 'react';
import { VOCABULARY_DATA, WARMUP_QUESTIONS, HARD_WORDS } from '../constants';
import { speakText } from '../services/geminiService';
import { VocabularyWord } from '../types';

export const WarmUpSection: React.FC = () => {
  const [step, setStep] = useState<'game' | 'questions'>('game');
  const [gameIndex, setGameIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState<'correct' | 'incorrect' | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  
  const [gameWords, setGameWords] = useState<VocabularyWord[]>([]);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const hardVocab = VOCABULARY_DATA.filter(v => HARD_WORDS.includes(v.word.toLowerCase()));
    const shuffled = [...hardVocab].sort(() => 0.5 - Math.random()).slice(0, 5);
    setGameWords(shuffled);
  }, []);

  const getCleanChinese = (text: string) => {
    return text.replace(/\s*\(.*?\)/g, '').trim();
  };

  useEffect(() => {
    if (gameWords.length > 0 && gameIndex < gameWords.length) {
        const currentWord = gameWords[gameIndex];
        const correctAnswerClean = getCleanChinese(currentWord.chinese);

        const distractors = VOCABULARY_DATA
            .filter(w => w.word !== currentWord.word)
            .sort(() => 0.5 - Math.random())
            .slice(0, 2)
            .map(w => getCleanChinese(w.chinese));
        
        const allOptions = [correctAnswerClean, ...distractors].sort(() => 0.5 - Math.random());
        setOptions(allOptions);
        setShowEmoji(false);
    }
  }, [gameIndex, gameWords]);

  const handleGameAnswer = (answer: string) => {
    const currentWord = gameWords[gameIndex];
    const correctAnswerClean = getCleanChinese(currentWord.chinese);

    if (answer === correctAnswerClean) {
        setShowResult('correct');
        setShowEmoji(true);
        const audio = new Audio('https://codeskulptor-demos.commondatastorage.googleapis.com/week7-brrring.m4a');
        audio.volume = 0.2;
        audio.play().catch(() => {});
        
        setTimeout(() => {
            setShowResult(null);
            if (gameIndex < gameWords.length - 1) {
                setGameIndex(prev => prev + 1);
            } else {
                setStep('questions');
            }
        }, 2000);
    } else {
        setShowResult('incorrect');
        speakText("Try again!");
        setTimeout(() => setShowResult(null), 1000);
    }
  };

  const handleQuestionAnswer = (answerText: string) => {
     if (questionIndex < WARMUP_QUESTIONS.length - 1) {
         setQuestionIndex(prev => prev + 1);
     } else {
         // Finished
     }
  };

  if (step === 'game') {
      if (gameWords.length === 0) return <div>Loading...</div>;

      const currentWord = gameWords[gameIndex];

      return (
        <div className="max-w-4xl mx-auto space-y-6 text-center pb-32">
             {/* Header */}
             <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-[2.5rem] border-4 border-orange-300 shadow-md transform -rotate-1">
                <h2 className="text-4xl font-black text-orange-600 tracking-tight flex items-center justify-center gap-3">
                    <span className="text-5xl">🎈</span> Word Match! <span className="text-2xl font-['Noto_Sans_TC']">(連連看)</span>
                </h2>
             </div>

             {/* Game Card */}
             <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border-8 border-sky-200 relative overflow-hidden">
                
                {/* Result Overlay */}
                {showResult === 'correct' && (
                    <div className="absolute inset-0 bg-green-400/20 z-0 pointer-events-none animate-pulse flex items-center justify-center">
                        <div className="text-9xl animate-bounce">🎉</div>
                    </div>
                )}
                {showResult === 'incorrect' && (
                    <div className="absolute inset-0 bg-red-400/90 z-20 flex items-center justify-center rounded-[2.5rem]">
                         <div className="text-center text-white">
                            <div className="text-8xl mb-4">❌</div>
                            <h3 className="text-4xl font-black">Try Again!</h3>
                         </div>
                    </div>
                )}
                
                {/* Progress Dots */}
                <div className="absolute top-6 right-8 flex gap-2">
                    {gameWords.map((_, idx) => (
                        <div key={idx} className={`w-3 h-3 rounded-full ${idx === gameIndex ? 'bg-sky-400 scale-125' : idx < gameIndex ? 'bg-green-400' : 'bg-gray-200'}`}></div>
                    ))}
                </div>

                {/* English Word Display */}
                <div className="mb-10 relative z-10">
                     <div className="flex flex-col items-center gap-4 min-h-[180px] justify-center bg-blue-50/50 rounded-[2rem] p-6 border-4 border-blue-100 border-dashed">
                        <h3 className="text-6xl md:text-7xl font-black text-gray-800 tracking-wider font-['Comic_Neue'] drop-shadow-sm">
                            {currentWord.word}
                        </h3>
                        
                        <div className={`transition-all duration-500 transform ${showEmoji ? 'scale-100 opacity-100' : 'scale-0 opacity-0 h-0'}`}>
                           {currentWord.emoji && <span className="text-8xl block animate-bounce">{currentWord.emoji}</span>}
                        </div>
                     </div>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    {options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleGameAnswer(opt)}
                            className={`
                                group relative overflow-hidden
                                bg-gradient-to-b from-white to-gray-50 
                                border-b-8 border-r-4 border-gray-200 
                                hover:border-sky-300 hover:from-sky-50 hover:to-white hover:-translate-y-1
                                active:border-b-0 active:translate-y-1 active:border-t-4
                                py-6 px-4 rounded-3xl text-2xl font-bold text-gray-700 
                                shadow-lg transition-all duration-200 font-['Noto_Sans_TC']
                            `}
                        >
                            <span className="relative z-10">{opt}</span>
                            <div className="absolute inset-0 bg-sky-100 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                        </button>
                    ))}
                </div>
             </div>
        </div>
      );
  }

  const q = WARMUP_QUESTIONS[questionIndex];
  const isLast = questionIndex === WARMUP_QUESTIONS.length - 1;

  return (
    <div className="max-w-3xl mx-auto space-y-8 text-center pb-32">
         <div className="bg-purple-100 p-6 rounded-3xl border-4 border-purple-300 transform rotate-1">
            <h2 className="text-3xl font-black text-purple-600 mb-2">Let's Chat! <span className="text-2xl font-['Noto_Sans_TC']">(聊一聊)</span> 💬</h2>
            <div className="inline-block bg-white px-4 py-1 rounded-full text-purple-800 font-bold shadow-sm">
                Question {questionIndex + 1}
            </div>
         </div>

         <div className="flex gap-4 items-start text-left">
             <div className="text-6xl bg-white rounded-full p-2 border-4 border-gray-200 shadow-lg z-10 shrink-0">🐮</div>
             <div className="bg-white p-8 rounded-[2rem] rounded-tl-none shadow-xl border-4 border-gray-100 flex-1 relative">
                 <p className="text-4xl font-bold text-gray-800 mb-3 font-['Comic_Neue']">{q.question}</p>
                 <p className="text-2xl text-gray-500 font-bold font-['Noto_Sans_TC']">{q.chineseQuestion}</p>
                 {/* Decorative speech triangle */}
                 <div className="absolute top-8 -left-3 w-6 h-6 bg-white border-l-4 border-b-4 border-gray-100 transform rotate-45"></div>
             </div>
         </div>

         {/* Compact layout for answers */}
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
             {q.answers.map((ans, idx) => (
                 <button
                    key={idx}
                    onClick={() => handleQuestionAnswer(ans.text)}
                    className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl border-4 border-purple-50 hover:border-purple-300 hover:bg-purple-50 transition-all shadow-md group text-left hover:-translate-y-1"
                 >
                     <span className="text-4xl group-hover:scale-125 transition-transform bg-gray-50 rounded-full w-12 h-12 flex items-center justify-center">{ans.icon}</span>
                     <span className="text-xl font-bold text-gray-700">{ans.text}</span>
                 </button>
             ))}
         </div>
         
         {isLast && (
             <div className="mt-12 p-8 bg-green-100 rounded-[3rem] animate-bounce border-8 border-green-200 shadow-xl">
                 <p className="text-4xl font-black text-green-700 mb-2">Great job! 🌟</p>
                 <p className="text-xl text-green-800 font-bold">Now go to "Grammar" to learn!</p>
             </div>
         )}
    </div>
  );
};
