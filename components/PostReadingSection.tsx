
import React, { useState } from 'react';
import { speakText } from '../services/geminiService';

export const PostReadingSection: React.FC = () => {
  const [orderAnswers, setOrderAnswers] = useState<{[key: string]: string}>({});
  const [fillAnswers, setFillAnswers] = useState<{[key: string]: string}>({});
  const [choiceAnswers, setChoiceAnswers] = useState<{[key: string]: string}>({});
  const [finalAnswer, setFinalAnswer] = useState<string | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);

  const toggleChoice = (qId: string, value: string) => {
    setChoiceAnswers(prev => ({...prev, [qId]: value}));
  };

  const handleFillSelect = (key: string, value: string) => {
    setFillAnswers(prev => ({...prev, [key]: value}));
  };

  const options = {
      q2a: ["to stay home", "to go swimming", "to sleep"],
      q2b: ["he is sick", "he wants to play his game", "he is hungry"],
      q3: ["visits on Monday", "visits on Saturday", "visits on Sunday"],
      q4a: ["plays", "eats", "cooks"],
      q4b: ["grass", "apples & BBQ", "books"]
  };

  const ChoiceGroup = ({ options, selected, onSelect }: { options: string[], selected: string | undefined, onSelect: (v: string) => void }) => {
    return (
        <div className="inline-flex flex-wrap gap-2 mx-1 align-middle my-1">
            {options.map((opt) => (
                <button
                    key={opt}
                    onClick={() => onSelect(opt)}
                    className={`
                        px-5 py-2 rounded-2xl border-[4px] font-bold text-2xl transition-all transform hover:scale-105
                        ${selected === opt 
                            ? 'bg-teal-500 border-teal-600 text-white shadow-md' 
                            : 'bg-white border-teal-100 text-teal-800 hover:bg-teal-50'}
                    `}
                >
                    {opt}
                </button>
            ))}
        </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto pb-48 space-y-10">
      <div className="text-center bg-teal-100 p-8 rounded-[3rem] border-[8px] border-teal-300 transform -rotate-1 shadow-xl relative overflow-hidden">
        <span className="absolute top-4 right-8 text-7xl opacity-50">📝</span>
        <span className="absolute bottom-4 left-8 text-7xl opacity-50">✅</span>
        <h2 className="text-6xl font-black text-teal-800 tracking-tight mb-2">Post-reading Challenge 🏆</h2>
        <p className="text-3xl text-teal-700 font-bold">Check what you learned! (閱讀理解)</p>
      </div>

      {/* Part 1: Ordering */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border-8 border-teal-50 relative">
         <div className="absolute -top-8 -left-4 bg-teal-500 text-white w-20 h-20 rounded-full flex items-center justify-center text-4xl font-bold shadow-lg border-[4px] border-white">
             1
         </div>
         <h3 className="text-3xl font-bold text-gray-700 ml-16 mb-6 border-b-4 border-teal-100 pb-2">Put the events in order (1–5) 🔢</h3>
        
        <div className="space-y-4 pl-0 md:pl-4">
            {[
                { id: "A", text: "The family go on a tour of a farm. 🚜" },
                { id: "B", text: "Jacky tells his family about Farm Life. 🎮" },
                { id: "C", text: "Mum says she wants to go to the beach. 🏖️" },
                { id: "D", text: "Dad tells Jacky to leave his phone at home. 📱" },
                { id: "E", text: "Jacky and his family have a barbecue. 🍖" }
            ].map((item) => (
                <div key={item.id} className="flex items-center gap-6 bg-gray-50 p-4 rounded-3xl hover:bg-teal-50 transition-colors">
                    <input 
                        type="number" 
                        min="1" 
                        max="5"
                        placeholder="?"
                        className="w-20 h-20 text-center text-4xl font-bold border-[4px] border-gray-300 rounded-2xl focus:border-teal-400 focus:outline-none focus:bg-white bg-white text-teal-600 shadow-sm"
                        value={orderAnswers[item.id] || ''}
                        onChange={(e) => setOrderAnswers({...orderAnswers, [item.id]: e.target.value})}
                    />
                    <p className="text-3xl font-medium text-gray-800 leading-snug">{item.text}</p>
                </div>
            ))}
        </div>
        {showAnswers && (
            <div className="mt-6 bg-green-100 p-6 rounded-3xl border-[4px] border-green-300 animate-pulse">
                <p className="font-bold text-green-800 text-2xl">Answers: A:4, B:2, C:1, D:3, E:5</p>
            </div>
        )}
      </div>

      {/* Part 2: Q&A - Select Options */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border-8 border-teal-50 relative">
        <h3 className="text-3xl font-bold text-gray-700 mb-8 border-b-4 border-teal-100 pb-2 text-center">Choose the right words 🤔</h3>

        <div className="space-y-8">
            {/* Q2 */}
            <div className="space-y-4 p-6 bg-amber-50 rounded-[2.5rem] border-[4px] border-amber-100 relative">
                <div className="absolute -top-6 -left-4 bg-amber-400 text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold shadow-md">2</div>
                <p className="text-3xl font-bold text-amber-800 pl-10 mb-2">Why does Jacky want to stay home? 🏠</p>
                <div className="text-4xl leading-snug font-medium text-gray-700">
                    <span className="inline-block mr-2">He wants</span>
                    <ChoiceGroup 
                        options={options.q2a} 
                        selected={fillAnswers['q2a']} 
                        onSelect={(v) => handleFillSelect('q2a', v)} 
                    />
                    <span className="inline-block mx-2">because</span>
                    <ChoiceGroup 
                        options={options.q2b} 
                        selected={fillAnswers['q2b']} 
                        onSelect={(v) => handleFillSelect('q2b', v)} 
                    />
                </div>
            </div>

            {/* Q3 */}
            <div className="space-y-4 p-6 bg-sky-50 rounded-[2.5rem] border-[4px] border-sky-100 relative">
                <div className="absolute -top-6 -left-4 bg-sky-400 text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold shadow-md">3</div>
                <p className="text-3xl font-bold text-sky-800 pl-10 mb-2">When does Jacky visit the farm? 📅</p>
                <div className="text-4xl leading-snug font-medium text-gray-700">
                    <span className="inline-block mr-2">He</span>
                    <ChoiceGroup 
                        options={options.q3} 
                        selected={fillAnswers['q3']} 
                        onSelect={(v) => handleFillSelect('q3', v)} 
                    />
                </div>
            </div>

             {/* Q4 */}
             <div className="space-y-4 p-6 bg-red-50 rounded-[2.5rem] border-[4px] border-red-100 relative">
                <div className="absolute -top-6 -left-4 bg-red-400 text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold shadow-md">4</div>
                <p className="text-3xl font-bold text-red-800 pl-10 mb-2">What does Jacky eat on the farm? 🍎</p>
                <div className="text-4xl leading-snug font-medium text-gray-700">
                    <span className="inline-block mr-2">He</span>
                     <ChoiceGroup 
                        options={options.q4a} 
                        selected={fillAnswers['q4a']} 
                        onSelect={(v) => handleFillSelect('q4a', v)} 
                    />
                    <span className="inline-block mx-2">some</span>
                    <ChoiceGroup 
                        options={options.q4b} 
                        selected={fillAnswers['q4b']} 
                        onSelect={(v) => handleFillSelect('q4b', v)} 
                    />
                </div>
            </div>
        </div>
      </div>

      {/* Part 3: Multiple Choice */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border-8 border-teal-50">
        <h3 className="text-3xl font-bold text-gray-700 mb-8 border-b-4 border-teal-100 pb-2 text-center">Circle the best words ⭕</h3>

        <div className="space-y-6 text-4xl font-medium leading-tight">
            {/* Q5 */}
            <div className="flex flex-wrap items-center gap-4 p-6 rounded-3xl hover:bg-gray-50 transition-colors">
                <span className="font-black text-white bg-teal-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-sm shrink-0">5</span>
                <span>It is</span>
                <button onClick={() => toggleChoice('q5', 'Dad')} className={`px-6 py-2 rounded-2xl border-[4px] text-3xl transition-all ${choiceAnswers['q5'] === 'Dad' ? 'bg-teal-200 border-teal-400 text-teal-900 scale-105' : 'border-gray-200 bg-white text-gray-500'}`}>Dad’s</button>
                <span className="font-bold text-gray-400">/</span>
                <button onClick={() => toggleChoice('q5', 'Mum')} className={`px-6 py-2 rounded-2xl border-[4px] text-3xl transition-all ${choiceAnswers['q5'] === 'Mum' ? 'bg-teal-200 border-teal-400 text-teal-900 scale-105' : 'border-gray-200 bg-white text-gray-500'}`}>Mum’s</button>
                <span>idea to visit a real farm. 💡</span>
            </div>

             {/* Q6 */}
             <div className="flex flex-wrap items-center gap-4 p-6 rounded-3xl hover:bg-gray-50 transition-colors">
                <span className="font-black text-white bg-teal-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-sm shrink-0">6</span>
                <span>At the start,</span>
                <button onClick={() => toggleChoice('q6', 'Jacky')} className={`px-6 py-2 rounded-2xl border-[4px] text-3xl transition-all ${choiceAnswers['q6'] === 'Jacky' ? 'bg-teal-200 border-teal-400 text-teal-900 scale-105' : 'border-gray-200 bg-white text-gray-500'}`}>Jacky</button>
                <span className="font-bold text-gray-400">/</span>
                <button onClick={() => toggleChoice('q6', 'Mum')} className={`px-6 py-2 rounded-2xl border-[4px] text-3xl transition-all ${choiceAnswers['q6'] === 'Mum' ? 'bg-teal-200 border-teal-400 text-teal-900 scale-105' : 'border-gray-200 bg-white text-gray-500'}`}>Mum</button>
                <span>doesn’t want to go. 🙅</span>
            </div>

            {/* Q7 */}
            <div className="flex flex-wrap items-center gap-4 p-6 rounded-3xl hover:bg-gray-50 transition-colors">
                <span className="font-black text-white bg-teal-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-sm shrink-0">7</span>
                <span>At the end, Jacky thinks it is</span>
                <button onClick={() => toggleChoice('q7', 'boring')} className={`px-6 py-2 rounded-2xl border-[4px] text-3xl transition-all ${choiceAnswers['q7'] === 'boring' ? 'bg-teal-200 border-teal-400 text-teal-900 scale-105' : 'border-gray-200 bg-white text-gray-500'}`}>boring</button>
                <span className="font-bold text-gray-400">/</span>
                <button onClick={() => toggleChoice('q7', 'fun')} className={`px-6 py-2 rounded-2xl border-[4px] text-3xl transition-all ${choiceAnswers['q7'] === 'fun' ? 'bg-teal-200 border-teal-400 text-teal-900 scale-105' : 'border-gray-200 bg-white text-gray-500'}`}>fun</button>
                <span>. 🤩</span>
            </div>
        </div>
        
        {showAnswers && (
             <div className="mt-6 bg-green-100 p-6 rounded-3xl border-[4px] border-green-300 animate-pulse">
                <p className="font-bold text-green-800 text-2xl">Answers: 5. Dad's, 6. Jacky, 7. fun</p>
            </div>
        )}
      </div>

       {/* Part 4: Final Question */}
       <div className="bg-amber-100 rounded-[2.5rem] p-8 shadow-xl border-[8px] border-amber-200 relative overflow-hidden">
            <span className="absolute -right-4 -top-4 text-8xl opacity-10 rotate-12">❓</span>
            <h3 className="text-3xl font-bold text-amber-900 mb-6">What does Jacky say at the end of the story? 💬</h3>
            <div className="grid gap-4">
                {[
                    "No way! Can we come again next weekend? 😆",
                    "I want to go home now. 🏠",
                    "Farm Life is better than a real farm. 🎮"
                ].map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            setFinalAnswer(option);
                            speakText(option);
                        }}
                        className={`
                            text-left p-6 rounded-3xl border-[4px] text-3xl font-bold transition-all
                            ${finalAnswer === option 
                                ? 'bg-amber-300 border-amber-500 shadow-none scale-[0.98] text-amber-900' 
                                : 'bg-white border-amber-200 hover:border-amber-400 shadow-sm text-gray-600'}
                        `}
                    >
                        {option}
                    </button>
                ))}
            </div>
            {showAnswers && (
                <p className="text-amber-800 font-black mt-6 text-2xl bg-amber-200 p-4 rounded-2xl inline-block border-[3px] border-amber-400">Ans: "No way! Can we come again next weekend?"</p>
            )}
       </div>


      <div className="text-center pt-8 pb-16">
          <button 
            onClick={() => setShowAnswers(!showAnswers)}
            className="bg-teal-500 hover:bg-teal-600 text-white text-3xl font-black py-6 px-16 rounded-full shadow-[0_8px_0_0_rgba(13,148,136,1)] active:translate-y-2 active:shadow-none transition-all transform hover:scale-105"
          >
              {showAnswers ? "Hide Answers 🙈" : "Check Answers ✅"}
          </button>
      </div>

    </div>
  );
};
