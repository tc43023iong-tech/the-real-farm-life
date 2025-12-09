
import React, { useState } from 'react';

export const LanguageFocusSection: React.FC = () => {
  const [quizIndex, setQuizIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const quizQuestions = [
    {
        q: "I like ice cream ___ it is sweet.",
        ans: "because",
        options: ["because", "first", "no way"]
    },
    {
        q: "1. First, we buy a ticket. 2. ___ we go inside.",
        ans: "Then",
        options: ["Because", "First", "Then"]
    },
    {
        q: "I want a toy ___ I like it.",
        ans: "because",
        options: ["then", "but", "because"]
    },
    {
        q: "1. First, wash hands. 2. Then, eat. 3. ___ clean up.",
        ans: "Finally",
        options: ["First", "Because", "Finally"]
    },
    {
        q: "I am happy ___ it is sunny.",
        ans: "because",
        options: ["finally", "because", "first"]
    },
    {
        q: "1. First, I wake up. 2. ___, I brush teeth.",
        ans: "Next",
        options: ["Next", "First", "Because"]
    },
    // New Questions (Total 11)
    {
        q: "I wear a jacket ___ it is cold.",
        ans: "because",
        options: ["because", "then", "finally"]
    },
    {
        q: "1. First, plant seeds. 2. ___ water them.",
        ans: "Then",
        options: ["Because", "Then", "First"]
    },
    {
        q: "I am hungry ___ it is lunchtime.",
        ans: "because",
        options: ["finally", "first", "because"]
    },
    {
        q: "1. First, mix eggs. 2. Then, cook. 3. ___ eat.",
        ans: "Finally",
        options: ["Finally", "Because", "First"]
    },
    {
        q: "I run fast ___ I want to win.",
        ans: "because",
        options: ["then", "because", "next"]
    }
  ];

  const handleAnswer = (option: string) => {
      if (option === quizQuestions[quizIndex].ans) {
          setShowFeedback('correct');
          setTimeout(() => {
              setShowFeedback(null);
              setQuizIndex(prev => (prev + 1) % quizQuestions.length);
          }, 1500);
      } else {
          setShowFeedback('incorrect');
          setTimeout(() => setShowFeedback(null), 1000);
      }
  };

  return (
    <div className="max-w-5xl mx-auto pb-48 space-y-8 px-2">
      <div className="text-center relative py-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-fuchsia-200 rounded-full blur-3xl opacity-50 -z-10"></div>
        <h2 className="text-6xl font-black text-fuchsia-600 tracking-tight transform -rotate-2 drop-shadow-sm">Grammar Fun! 🧠</h2>
      </div>

      {/* Focus 1: Because (The Bridge) */}
      <section className="relative">
         <div className="flex items-center gap-3 mb-4 px-4">
             <div className="bg-pink-400 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-black shadow-lg">1</div>
             <h3 className="text-4xl font-black text-gray-700">Giving Reasons (因為...)</h3>
         </div>

         <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-2xl border-[6px] border-pink-100 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-pink-50 rounded-full"></div>

            <p className="text-3xl text-gray-600 font-bold text-center mb-6 leading-relaxed relative z-10">
                Use <span className="inline-block bg-pink-500 text-white px-4 py-1 rounded-full transform -rotate-2 shadow-md mx-1">because</span> to connect two ideas!
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 relative z-10">
                {/* Island 1: Action */}
                <div className="bg-blue-50 border-4 border-blue-200 p-6 rounded-[2rem] w-full md:w-1/3 text-center shadow-md relative group hover:-translate-y-1 transition-transform">
                    <div className="text-6xl mb-2 group-hover:scale-110 transition-transform">🚜</div>
                    <p className="text-3xl font-black text-blue-800 leading-tight">I want to go to the farm</p>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full text-blue-300 font-bold text-sm shadow-sm border border-blue-100">ACTION</div>
                </div>

                {/* The Bridge */}
                <div className="flex flex-col items-center justify-center h-full gap-1 my-4 md:my-0">
                    <div className="bg-pink-500 text-white px-6 py-3 rounded-2xl font-black text-2xl shadow-[0_4px_0_0_rgba(190,24,93,1)] z-20 animate-pulse">
                        because
                    </div>
                    {/* Dashed line connecting */}
                    <div className="w-1 h-8 md:w-12 md:h-1 border-l-4 md:border-l-0 md:border-t-4 border-dashed border-gray-300"></div>
                </div>

                {/* Island 2: Reason */}
                <div className="bg-green-50 border-4 border-green-200 p-6 rounded-[2rem] w-full md:w-1/3 text-center shadow-md relative group hover:-translate-y-1 transition-transform">
                    <div className="text-6xl mb-2 group-hover:scale-110 transition-transform">🐮</div>
                    <p className="text-3xl font-black text-green-800 leading-tight">I want to feed animals</p>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full text-green-300 font-bold text-sm shadow-sm border border-green-100">REASON</div>
                </div>
            </div>
         </div>
      </section>

      {/* Focus 2: Sequence (The Steps) */}
      <section className="relative">
         <div className="flex items-center gap-3 mb-4 px-4">
             <div className="bg-indigo-400 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-black shadow-lg">2</div>
             <h3 className="text-4xl font-black text-gray-700">Order of Events (順序)</h3>
         </div>

         <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-2xl border-[6px] border-indigo-100 relative">
             <div className="relative space-y-4">
                 {/* Vertical connecting line */}
                 <div className="absolute left-[2.25rem] top-8 bottom-8 w-0 border-l-[6px] border-dashed border-indigo-100 z-0 hidden md:block"></div>

                 {/* Step 1 */}
                 <div className="relative z-10 flex flex-col md:flex-row gap-4 items-center">
                     <div className="w-20 h-20 bg-indigo-500 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white font-black text-xl shrink-0">
                         First
                     </div>
                     <div className="bg-indigo-50 p-4 md:p-6 rounded-[2rem] flex-1 w-full border-4 border-white shadow-md flex items-center gap-4 hover:scale-[1.02] transition-transform">
                         <div className="text-5xl">🏰</div>
                         <div>
                            <p className="text-3xl font-bold text-indigo-900 leading-tight">I want to build a sandcastle.</p>
                            <p className="text-indigo-400 font-bold text-xl">首先...</p>
                         </div>
                     </div>
                 </div>

                 {/* Step 2 */}
                 <div className="relative z-10 flex flex-col md:flex-row gap-4 items-center">
                     <div className="w-20 h-20 bg-sky-400 rounded-full border-4 border-white shadow-xl flex flex-col items-center justify-center text-white font-black text-sm leading-tight shrink-0">
                         <span>Then</span>
                         <span className="text-sky-200 text-xs">or</span>
                         <span>Next</span>
                     </div>
                     <div className="bg-sky-50 p-4 md:p-6 rounded-[2rem] flex-1 w-full border-4 border-white shadow-md flex items-center gap-4 hover:scale-[1.02] transition-transform">
                         <div className="text-5xl">🐚</div>
                         <div>
                            <p className="text-3xl font-bold text-sky-900 leading-tight">I want to look at shells.</p>
                            <p className="text-sky-400 font-bold text-xl">然後...</p>
                         </div>
                     </div>
                 </div>

                 {/* Step 3 */}
                 <div className="relative z-10 flex flex-col md:flex-row gap-4 items-center">
                     <div className="w-20 h-20 bg-fuchsia-500 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white font-black text-lg shrink-0">
                         Finally
                     </div>
                     <div className="bg-fuchsia-50 p-4 md:p-6 rounded-[2rem] flex-1 w-full border-4 border-white shadow-md flex items-center gap-4 hover:scale-[1.02] transition-transform">
                         <div className="text-5xl">🧺</div>
                         <div>
                            <p className="text-3xl font-bold text-fuchsia-900 leading-tight">I want to have a picnic.</p>
                            <p className="text-fuchsia-400 font-bold text-xl">最後...</p>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
      </section>

      {/* Grammar Mini Quiz (Redesigned: Light & Cute) */}
      <section className="pt-4">
         <div className="bg-yellow-50 rounded-[2.5rem] p-6 md:p-8 border-[6px] border-yellow-300 shadow-xl relative text-center overflow-hidden">
            {/* Cute Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-200/50 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-200/50 rounded-full blur-2xl"></div>
            
            <div className="inline-block bg-white text-yellow-600 px-10 py-3 rounded-full font-black text-2xl mb-6 shadow-md border-2 border-yellow-200 transform -rotate-2">
                Mini Quiz ✏️
            </div>

            <div className="bg-white rounded-[2rem] p-6 md:p-8 mb-6 shadow-sm border-4 border-yellow-100 relative min-h-[140px] flex items-center justify-center">
                <p className="text-4xl md:text-5xl font-bold text-gray-700 font-['Comic_Neue'] leading-relaxed">
                    {quizQuestions[quizIndex].q.split('___').map((part, i, arr) => (
                        <span key={i}>
                            {part}
                            {i < arr.length - 1 && (
                                <span className="inline-block px-6 py-1 mx-2 bg-yellow-50 text-yellow-600 rounded-xl border-b-4 border-yellow-200 min-w-[120px] text-center">
                                    {showFeedback === 'correct' ? quizQuestions[quizIndex].ans : '?'}
                                </span>
                            )}
                        </span>
                    ))}
                </p>
                
                {/* Feedback Overlays */}
                {showFeedback === 'correct' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px] rounded-[1.8rem] z-10">
                         <div className="text-8xl animate-bounce drop-shadow-md">✨</div>
                    </div>
                )}
                {showFeedback === 'incorrect' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px] rounded-[1.8rem] z-10">
                         <div className="text-8xl animate-shake drop-shadow-md">❌</div>
                    </div>
                )}
            </div>

            <div className="flex flex-wrap justify-center gap-3 relative z-10">
                {quizQuestions[quizIndex].options.map((opt) => (
                    <button
                        key={opt}
                        onClick={() => handleAnswer(opt)}
                        disabled={showFeedback !== null}
                        className="bg-white border-b-[5px] border-yellow-200 text-yellow-800 px-6 py-3 rounded-2xl text-2xl font-black hover:bg-yellow-50 hover:border-yellow-300 hover:-translate-y-1 active:border-b-0 active:translate-y-2 transition-all shadow-sm min-w-[140px]"
                    >
                        {opt}
                    </button>
                ))}
            </div>
            
            <div className="mt-6 text-yellow-400 font-bold text-lg">
                Question {quizIndex + 1} of {quizQuestions.length}
            </div>
         </div>
      </section>

    </div>
  );
};
