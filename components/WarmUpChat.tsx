
import React, { useState } from 'react';
import { WARMUP_QUESTIONS } from '../constants';

export const WarmUpChat: React.FC = () => {
  const [questionIndex, setQuestionIndex] = useState(0);

  const handleQuestionAnswer = (answerText: string) => {
     if (questionIndex < WARMUP_QUESTIONS.length - 1) {
         setQuestionIndex(prev => prev + 1);
     } else {
         // Finished, we can just stay on the last screen or show a "Done" message within the component
     }
  };

  const q = WARMUP_QUESTIONS[questionIndex];
  const isLast = questionIndex === WARMUP_QUESTIONS.length - 1;

  // If user answered the last question, we can show a completion state overlay or modify the UI
  // For simplicity, let's keep it interactive.

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
         
         {/* Simple completion message at the bottom if on last question */}
         {isLast && (
             <div className="mt-12 p-8 bg-green-100 rounded-[3rem] animate-bounce border-8 border-green-200 shadow-xl">
                 <p className="text-4xl font-black text-green-700 mb-2">Great job! 🌟</p>
                 <p className="text-xl text-green-800 font-bold">You are ready for the story!</p>
             </div>
         )}
    </div>
  );
};
