
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
    <div className="max-w-4xl mx-auto pb-36 space-y-8">
      <div className="text-center bg-fuchsia-100 p-6 rounded-[3rem] border-8 border-fuchsia-300 transform rotate-1">
        <h2 className="text-5xl font-black text-fuchsia-800 tracking-tight">Language Focus 🧠</h2>
      </div>

      {/* Focus 1: Because */}
      <section className="space-y-4">
         <div className="flex items-center gap-4 mb-2">
             <div className="bg-pink-500 text-white px-5 py-1 rounded-full text-2xl font-black shadow-md">1</div>
             <h3 className="text-4xl font-bold text-gray-700">Giving Reasons (因為...)</h3>
         </div>

         <div className="bg-white rounded-[2.5rem] p-6 shadow-xl border-4 border-pink-100">
            <p className="text-3xl text-gray-500 font-bold text-center mb-6 leading-snug">
                Use <span className="text-pink-500 bg-pink-100 px-2 rounded">because</span> to say <span className="italic">why</span> you want to do something.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                {/* Action */}
                <div 
                    className="flex-1 bg-blue-50 border-4 border-blue-200 p-4 rounded-3xl w-full text-center"
                >
                    <div className="text-5xl mb-1">🚜</div>
                    <p className="text-3xl font-bold text-blue-800 leading-tight">I want to go to the farm</p>
                    <p className="text-blue-400 font-bold text-xl mt-1">(Action)</p>
                </div>

                {/* Connector */}
                <div className="bg-pink-500 text-white p-3 rounded-full font-black text-2xl shadow-lg z-10 animate-bounce-slow">
                    because
                </div>

                {/* Reason */}
                <div 
                    className="flex-1 bg-green-50 border-4 border-green-200 p-4 rounded-3xl w-full text-center"
                >
                    <div className="text-5xl mb-1">🐮</div>
                    <p className="text-3xl font-bold text-green-800 leading-tight">I want to feed animals</p>
                    <p className="text-green-400 font-bold text-xl mt-1">(Reason)</p>
                </div>
            </div>

            <div className="mt-6 p-4 bg-pink-50 rounded-2xl text-center">
                 <p className="text-2xl text-pink-800 font-bold font-['Comic_Neue']">
                   "I want to go to the farm because I want to feed animals."
                 </p>
            </div>
         </div>
      </section>

      {/* Focus 2: Sequence */}
      <section className="space-y-4">
         <div className="flex items-center gap-4 mb-2">
             <div className="bg-indigo-500 text-white px-5 py-1 rounded-full text-2xl font-black shadow-md">2</div>
             <h3 className="text-4xl font-bold text-gray-700">Order of Events (順序)</h3>
         </div>

         <div className="bg-white rounded-[2.5rem] p-6 shadow-xl border-4 border-indigo-100 relative overflow-hidden">
             {/* Decorative line */}
             <div className="absolute left-8 md:left-12 top-16 bottom-16 w-1 bg-indigo-200 border-l-2 border-dashed border-indigo-300"></div>

             <div className="space-y-3 relative">
                 
                 {/* Step 1 */}
                 <div className="flex gap-4 items-center group">
                     <div className="w-16 h-16 md:w-20 md:h-20 bg-indigo-500 rounded-full flex items-center justify-center text-white font-black text-xl z-10 shadow-lg shrink-0">
                         First
                     </div>
                     <div className="bg-indigo-50 p-4 rounded-3xl border-2 border-indigo-100 flex-1">
                         <div className="flex items-center gap-4">
                            <span className="text-5xl">🏰</span>
                            <div>
                                <p className="text-3xl font-bold text-gray-800 leading-tight">I want to build a sandcastle.</p>
                                <p className="text-indigo-400 font-bold text-xl">首先...</p>
                            </div>
                         </div>
                     </div>
                 </div>

                 {/* Step 2 */}
                 <div className="flex gap-4 items-center group">
                     <div className="w-16 h-16 md:w-20 md:h-20 bg-sky-400 rounded-full flex flex-col items-center justify-center text-white font-black text-sm md:text-xl z-10 shadow-lg shrink-0 leading-tight">
                         <span>Then /</span>
                         <span>Next</span>
                     </div>
                     <div className="bg-sky-50 p-4 rounded-3xl border-2 border-sky-100 flex-1">
                         <div className="flex items-center gap-4">
                            <span className="text-5xl">🐚</span>
                            <div>
                                <p className="text-3xl font-bold text-gray-800 leading-tight">I want to look at shells.</p>
                                <p className="text-sky-400 font-bold text-xl">然後 / 接著...</p>
                            </div>
                         </div>
                     </div>
                 </div>

                 {/* Step 3 */}
                 <div className="flex gap-4 items-center group">
                     <div className="w-16 h-16 md:w-20 md:h-20 bg-purple-500 rounded-full flex items-center justify-center text-white font-black text-sm md:text-xl z-10 shadow-lg shrink-0">
                         Finally
                     </div>
                     <div className="bg-purple-50 p-4 rounded-3xl border-2 border-purple-100 flex-1">
                         <div className="flex items-center gap-4">
                            <span className="text-5xl">🧺</span>
                            <div>
                                <p className="text-3xl font-bold text-gray-800 leading-tight">I want to have a picnic.</p>
                                <p className="text-purple-400 font-bold text-xl">最後...</p>
                            </div>
                         </div>
                     </div>
                 </div>

             </div>
         </div>
      </section>

      {/* Grammar Mini Game */}
      <section className="pt-8">
         <div className="bg-yellow-50 rounded-[3rem] p-8 border-4 border-yellow-300 shadow-xl relative text-center">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-yellow-400 text-white px-8 py-2 rounded-full font-black text-2xl shadow-md border-4 border-white">
                Mini Quiz 🎮
            </div>

            <div className="mt-8 mb-6">
                <p className="text-3xl font-bold text-gray-800 font-['Comic_Neue'] mb-4 leading-relaxed">
                    {quizQuestions[quizIndex].q.split('___').map((part, i, arr) => (
                        <span key={i}>
                            {part}
                            {i < arr.length - 1 && (
                                <span className="inline-block px-4 py-1 border-b-4 border-dashed border-gray-400 mx-2 text-fuchsia-600 font-black bg-white rounded-lg">
                                    {showFeedback === 'correct' ? quizQuestions[quizIndex].ans : '?'}
                                </span>
                            )}
                        </span>
                    ))}
                </p>
                {showFeedback === 'correct' && <div className="text-6xl animate-bounce">✅</div>}
                {showFeedback === 'incorrect' && <div className="text-6xl animate-shake">❌</div>}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
                {quizQuestions[quizIndex].options.map((opt) => (
                    <button
                        key={opt}
                        onClick={() => handleAnswer(opt)}
                        disabled={showFeedback !== null}
                        className="bg-white border-b-4 border-yellow-200 text-yellow-800 px-8 py-4 rounded-2xl text-2xl font-bold hover:bg-yellow-100 hover:-translate-y-1 active:border-b-0 active:translate-y-1 transition-all shadow-sm"
                    >
                        {opt}
                    </button>
                ))}
            </div>
         </div>
      </section>

    </div>
  );
};
