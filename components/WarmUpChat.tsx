
import React, { useState } from 'react';
import { WARMUP_QUESTIONS } from '../constants';

export const WarmUpChat: React.FC = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleQuestionAnswer = (answerText: string) => {
     if (questionIndex < WARMUP_QUESTIONS.length - 1) {
         setQuestionIndex(prev => prev + 1);
     } else {
         setIsCompleted(true);
     }
  };

  const q = WARMUP_QUESTIONS[questionIndex];

  if (isCompleted) {
      return (
          <div className="max-w-2xl mx-auto text-center pt-10 pb-40 px-4">
              <div className="bg-white rounded-[3rem] p-12 border-[6px] border-purple-200 shadow-xl relative overflow-hidden animate-bounce-in">
                  <div className="absolute top-0 left-0 w-full h-6 bg-purple-100 border-b-4 border-purple-200"></div>
                  <div className="text-9xl mb-6 animate-bounce">🌟</div>
                  <h2 className="text-5xl font-black text-purple-600 mb-4 font-['Comic_Neue']">Awesome Job!</h2>
                  <p className="text-2xl text-gray-500 font-bold font-['Noto_Sans_TC']">You are ready for the story!</p>
                  <div className="mt-8">
                     <span className="inline-block bg-purple-500 text-white px-8 py-3 rounded-full text-xl font-bold shadow-md animate-pulse">
                        Go to "Story" tab! 📖
                     </span>
                  </div>
              </div>
          </div>
      )
  }

  return (
    <div className="max-w-5xl mx-auto pb-48 px-4">
      
      {/* Header Badge */}
      <div className="text-center mb-12 relative">
          <div className="inline-block bg-purple-500 text-white px-10 py-4 rounded-full border-[5px] border-purple-300 shadow-[0_8px_0_0_rgba(168,85,247,0.4)] transform -rotate-2 z-10 relative transition-transform hover:rotate-0 hover:scale-105">
              <h2 className="text-4xl font-black flex items-center gap-3">
                 <span>💬</span> Chat Time
              </h2>
          </div>
          {/* Progress pill */}
          <div className="mt-6">
             <span className="bg-white text-purple-600 px-6 py-2 rounded-full text-lg font-black border-4 border-purple-100 shadow-sm">
                Question {questionIndex + 1} / {WARMUP_QUESTIONS.length}
             </span>
          </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col gap-10">
          
          {/* Cow's Turn */}
          <div className="flex gap-4 md:gap-6 items-end group">
               {/* Avatar */}
               <div className="w-24 h-24 md:w-28 md:h-28 bg-white rounded-full border-[6px] border-purple-200 flex items-center justify-center text-5xl md:text-6xl shadow-lg shrink-0 relative z-10 group-hover:scale-110 transition-transform">
                   🐮
                   <div className="absolute -bottom-2 -right-2 bg-purple-500 text-white text-xs md:text-sm font-bold px-3 py-1 rounded-full border-4 border-white shadow-sm">Teacher</div>
               </div>
               
               {/* Bubble */}
               <div className="bg-white p-8 rounded-[2.5rem] rounded-bl-none border-[5px] border-purple-100 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)] relative w-full transform origin-bottom-left animate-pop-in flex items-center">
                   <p className="text-3xl md:text-4xl font-black text-gray-800 font-['Comic_Neue'] leading-snug">
                       {q.question}
                   </p>
               </div>
          </div>

          {/* User's Turn (Answers) */}
          <div className="w-full">
              <p className="text-gray-400 font-bold mb-4 text-sm uppercase tracking-widest pl-4">Your Turn</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {q.answers.map((ans, idx) => (
                      <button
                          key={idx}
                          onClick={() => handleQuestionAnswer(ans.text)}
                          className="bg-white p-4 rounded-[2rem] border-[4px] border-purple-50 shadow-md hover:border-purple-300 hover:bg-purple-50 hover:shadow-[0_8px_0_0_rgba(216,180,254,1)] hover:-translate-y-1 active:shadow-none active:translate-y-1 active:border-purple-400 transition-all group text-left flex items-center gap-4 relative overflow-hidden h-full min-h-[100px]"
                      >
                          {/* Circle backing for emoji */}
                          <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform shrink-0 border-2 border-purple-200">
                              {ans.icon}
                          </div>
                          
                          <span className="text-xl font-bold text-gray-700 font-['Comic_Neue'] relative z-10 leading-tight">
                              {ans.text}
                          </span>
                      </button>
                  ))}
              </div>
          </div>

      </div>

    </div>
  );
};
