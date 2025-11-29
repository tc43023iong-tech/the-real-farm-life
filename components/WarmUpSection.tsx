

import React, { useState, useEffect } from 'react';
import { VOCABULARY_DATA, WARMUP_QUESTIONS, HARD_WORDS } from '../constants';
import { speakText } from '../services/geminiService';
import { VocabularyWord } from '../types';

export const WarmUpSection: React.FC = () => {
  const [step, setStep] = useState<'game' | 'questions'>('game');
  const [gameIndex, setGameIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState<'correct' | 'incorrect' | null>(null);
  const [showEmoji, setShowEmoji] = useState(false); // New state to control emoji visibility
  
  const [gameWords, setGameWords] = useState<VocabularyWord[]>([]);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const hardVocab = VOCABULARY_DATA.filter(v => HARD_WORDS.includes(v.word.toLowerCase()));
    const shuffled = [...hardVocab].sort(() => 0.5 - Math.random()).slice(0, 5);
    setGameWords(shuffled);
  }, []);

  useEffect(() => {
    if (gameWords.length > 0 && gameIndex < gameWords.length) {
        const currentWord = gameWords[gameIndex];
        const distractors = VOCABULARY_DATA
            .filter(w => w.word !== currentWord.word)
            .sort(() => 0.5 - Math.random())
            .slice(0, 2)
            .map(w => w.chinese);
        
        const allOptions = [currentWord.chinese, ...distractors].sort(() => 0.5 - Math.random());
        setOptions(allOptions);
        setShowEmoji(false); // Reset emoji visibility for new word
        
        // Auto-play removed as requested
    }
  }, [gameIndex, gameWords]);

  const handleGameAnswer = (answer: string) => {
    const currentWord = gameWords[gameIndex];
    if (answer === currentWord.chinese) {
        setShowResult('correct');
        setShowEmoji(true); // Reveal emoji
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
        }, 2000); // Slightly longer delay to admire the emoji
    } else {
        setShowResult('incorrect');
        speakText("Try again!");
        setTimeout(() => setShowResult(null), 1000);
    }
  };

  const handleQuestionAnswer = (answerText: string) => {
     // Removed speakText(answerText) as requested
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
        <div className="max-w-3xl mx-auto space-y-8 text-center pb-32">
             <div className="bg-orange-100 p-6 rounded-3xl border-4 border-orange-300">
                <h2 className="text-3xl font-black text-orange-600 mb-2">Word Match Game! (連連看)</h2>
                <p className="text-xl text-orange-800">Question {gameIndex + 1} / {gameWords.length}</p>
             </div>

             <div className="bg-white rounded-[3rem] p-10 shadow-2xl border-8 border-sky-200 relative overflow-hidden">
                
                {showResult === 'correct' && (
                    <div className="absolute inset-0 bg-green-400/20 z-0 pointer-events-none animate-pulse"></div>
                )}
                {showResult === 'incorrect' && (
                    <div className="absolute inset-0 bg-red-400/90 z-20 flex items-center justify-center">
                        <span className="text-8xl">❌ Try Again</span>
                    </div>
                )}

                <div className="mb-8">
                     {/* Speaker button removed as requested */}
                     <div className="flex flex-col items-center gap-4 min-h-[160px] justify-center pt-8">
                        <h3 className="text-6xl font-black text-gray-800 tracking-wider font-['Comic_Neue']">{currentWord.word}</h3>
                        {/* Only show emoji if correct */}
                        <div className={`transition-all duration-500 transform ${showEmoji ? 'scale-100 opacity-100' : 'scale-0 opacity-0 h-0'}`}>
                           {currentWord.emoji && <span className="text-8xl block animate-bounce">{currentWord.emoji}</span>}
                        </div>
                     </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                    {options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleGameAnswer(opt)}
                            className="bg-white border-4 border-gray-200 hover:border-sky-400 hover:bg-sky-50 py-6 px-4 rounded-2xl text-2xl font-bold text-gray-700 shadow-md transition-all active:scale-95 font-['Noto_Sans_TC']"
                        >
                            {opt}
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
         <div className="bg-purple-100 p-6 rounded-3xl border-4 border-purple-300">
            <h2 className="text-3xl font-black text-purple-600 mb-2">Let's Chat! (聊一聊) 💬</h2>
            <p className="text-xl text-purple-800">Warm Up Question {questionIndex + 1}</p>
         </div>

         <div className="flex gap-4 items-start text-left">
             <div className="text-6xl bg-white rounded-full p-2 border-4 border-gray-200 shadow-lg z-10">🐮</div>
             <div className="bg-white p-6 rounded-3xl rounded-tl-none shadow-xl border-2 border-gray-100 flex-1 relative">
                 <p className="text-3xl font-bold text-gray-800 mb-2">{q.question}</p>
                 <p className="text-xl text-gray-500 font-bold font-['Noto_Sans_TC']">{q.chineseQuestion}</p>
                 {/* Decorative speech triangle */}
                 <div className="absolute top-6 -left-3 w-6 h-6 bg-white border-l-2 border-b-2 border-gray-100 transform rotate-45"></div>
             </div>
         </div>

         {/* Compact layout for answers */}
         <div className="flex flex-wrap gap-3 justify-center mt-8">
             {q.answers.map((ans, idx) => (
                 <button
                    key={idx}
                    onClick={() => handleQuestionAnswer(ans.text)}
                    className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl border-4 border-purple-100 hover:border-purple-400 hover:bg-purple-50 transition-all shadow-md group text-left transform hover:-translate-y-1"
                 >
                     <span className="text-3xl group-hover:scale-125 transition-transform">{ans.icon}</span>
                     <span className="text-xl font-bold text-gray-700">{ans.text}</span>
                 </button>
             ))}
         </div>
         
         {isLast && (
             <div className="mt-12 p-6 bg-green-100 rounded-3xl animate-bounce border-4 border-green-300 shadow-lg">
                 <p className="text-2xl font-black text-green-700">Great job! 🌟 <br/> Now go to "Grammar" to learn!</p>
             </div>
         )}
    </div>
  );
};
