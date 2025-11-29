
import React from 'react';
import { speakText } from '../services/geminiService';

export const LanguageFocusSection: React.FC = () => {
  
  const play = (text: string) => {
    speakText(text);
  };

  return (
    <div className="max-w-4xl mx-auto pb-36 space-y-8">
      <div className="text-center bg-fuchsia-100 p-6 rounded-[3rem] border-8 border-fuchsia-300 transform rotate-1">
        <h2 className="text-5xl font-black text-fuchsia-800 tracking-tight">Language Focus 🧠</h2>
        <p className="text-3xl text-fuchsia-700 font-bold mt-2">Let's learn sentence power! (句式練習)</p>
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
                    onClick={() => play("I want to go to the farm")}
                    className="flex-1 bg-blue-50 border-4 border-blue-200 p-4 rounded-3xl cursor-pointer hover:bg-blue-100 transition-colors w-full text-center"
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
                    onClick={() => play("I want to feed animals")}
                    className="flex-1 bg-green-50 border-4 border-green-200 p-4 rounded-3xl cursor-pointer hover:bg-green-100 transition-colors w-full text-center"
                >
                    <div className="text-5xl mb-1">🐮</div>
                    <p className="text-3xl font-bold text-green-800 leading-tight">I want to feed animals</p>
                    <p className="text-green-400 font-bold text-xl mt-1">(Reason)</p>
                </div>
            </div>

            <div className="mt-6 text-center">
                <button 
                    onClick={() => play("I want to go to the farm because I want to feed animals.")}
                    className="bg-pink-400 hover:bg-pink-500 text-white text-2xl font-bold py-3 px-8 rounded-2xl shadow-md transition-transform active:scale-95 flex items-center gap-2 mx-auto"
                >
                    🔊 Read Whole Sentence
                </button>
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
                 <div 
                    className="flex gap-4 items-center group cursor-pointer"
                    onClick={() => play("First, I want to build a sandcastle.")}
                 >
                     <div className="w-16 h-16 md:w-20 md:h-20 bg-indigo-500 rounded-full flex items-center justify-center text-white font-black text-xl z-10 shadow-lg group-hover:scale-110 transition-transform shrink-0">
                         First
                     </div>
                     <div className="bg-indigo-50 p-4 rounded-3xl border-2 border-indigo-100 flex-1 group-hover:bg-indigo-100 transition-colors">
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
                 <div 
                    className="flex gap-4 items-center group cursor-pointer"
                    onClick={() => play("Next, I want to look at shells.")}
                 >
                     <div className="w-16 h-16 md:w-20 md:h-20 bg-sky-400 rounded-full flex flex-col items-center justify-center text-white font-black text-sm md:text-xl z-10 shadow-lg group-hover:scale-110 transition-transform shrink-0 leading-tight">
                         <span>Then /</span>
                         <span>Next</span>
                     </div>
                     <div className="bg-sky-50 p-4 rounded-3xl border-2 border-sky-100 flex-1 group-hover:bg-sky-100 transition-colors">
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
                 <div 
                    className="flex gap-4 items-center group cursor-pointer"
                    onClick={() => play("Finally, I want to have a picnic.")}
                 >
                     <div className="w-16 h-16 md:w-20 md:h-20 bg-purple-500 rounded-full flex items-center justify-center text-white font-black text-sm md:text-xl z-10 shadow-lg group-hover:scale-110 transition-transform shrink-0">
                         Finally
                     </div>
                     <div className="bg-purple-50 p-4 rounded-3xl border-2 border-purple-100 flex-1 group-hover:bg-purple-100 transition-colors">
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

    </div>
  );
};
