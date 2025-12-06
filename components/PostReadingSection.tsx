
import React, { useState } from 'react';

export const PostReadingSection: React.FC = () => {
  const [orderAnswers, setOrderAnswers] = useState<{[key: string]: string}>({});
  const [fillAnswers, setFillAnswers] = useState<{[key: string]: string}>({});
  const [choiceAnswers, setChoiceAnswers] = useState<{[key: string]: string}>({});
  const [finalAnswer, setFinalAnswer] = useState<string | null>(null);

  // Correct Answers Data
  const CORRECT_ORDER = {
    "A": "4", "B": "2", "C": "1", "D": "3", "E": "5"
  };

  const CORRECT_FILL = {
    "q2a": "to stay home",
    "q2b": "he wants to play his game",
    "q3": "visits on Saturday",
    "q4a": "eats",
    "q4b": "apples & BBQ"
  };

  const CORRECT_CHOICE = {
    "q5": "Dad",
    "q6": "Jacky",
    "q7": "fun"
  };

  const CORRECT_FINAL = "No way! Can we come again next weekend? 😆";

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

  const ChoiceGroup = ({ qId, options, selected, onSelect }: { qId: string, options: string[], selected: string | undefined, onSelect: (v: string) => void }) => {
    const correct = CORRECT_FILL[qId as keyof typeof CORRECT_FILL];
    
    return (
        <div className="inline-flex flex-wrap gap-2 mx-1 align-middle my-1">
            {options.map((opt) => {
                const isSelected = selected === opt;
                let btnClass = "bg-white border-teal-100 text-teal-800 hover:bg-teal-50"; // Default
                
                if (isSelected) {
                    if (opt === correct) {
                        // Lighter green used here
                        btnClass = "bg-green-300 border-green-300 text-white shadow-sm scale-105"; // Correct
                    } else {
                        btnClass = "bg-red-400 border-red-500 text-white shadow-sm"; // Incorrect
                    }
                }

                return (
                    <button
                        key={opt}
                        onClick={() => onSelect(opt)}
                        className={`px-3 py-2 rounded-xl border-[3px] font-bold text-xl transition-all transform ${btnClass}`}
                    >
                        {opt}
                    </button>
                );
            })}
        </div>
    );
  };

  const CircleChoice = ({ qId, val, label }: { qId: string, val: string, label: string }) => {
      const selected = choiceAnswers[qId];
      const correct = CORRECT_CHOICE[qId as keyof typeof CORRECT_CHOICE];
      
      let btnClass = "border-gray-200 bg-white text-gray-500";
      if (selected === val) {
          if (val === correct) {
              // Lighter green
              btnClass = "bg-green-50 border-green-300 text-green-500 scale-105";
          } else {
              btnClass = "bg-red-100 border-red-300 text-red-900";
          }
      }

      return (
        <button onClick={() => toggleChoice(qId, val)} className={`px-4 py-2 rounded-xl border-[3px] text-2xl transition-all ${btnClass} font-bold`}>
            {label}
        </button>
      );
  };

  return (
    <div className="max-w-5xl mx-auto pb-48 space-y-6">
      
      {/* Page Instruction */}
      <div className="text-center mb-2">
         <p className="text-3xl md:text-4xl font-black text-orange-500 bg-orange-50 inline-block px-8 py-3 rounded-full border-4 border-orange-200 shadow-sm animate-bounce">
           Turn your book to page 51! 📖
         </p>
      </div>

      <div className="text-center bg-teal-100 p-6 rounded-[2.5rem] border-[6px] border-teal-300 transform -rotate-1 shadow-lg relative overflow-hidden">
        <span className="absolute top-4 right-8 text-5xl opacity-50">📝</span>
        <span className="absolute bottom-4 left-8 text-5xl opacity-50">✅</span>
        <h2 className="text-5xl font-black text-teal-800 tracking-tight mb-2">Post-reading Challenge 🏆</h2>
        <p className="text-2xl text-teal-700 font-bold">Check what you learned! (閱讀理解)</p>
      </div>

      {/* Part 1: Ordering */}
      <div className="bg-white rounded-[2rem] p-5 shadow-lg border-4 border-teal-50 relative">
         <div className="absolute -top-6 -left-2 bg-teal-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-3xl font-bold shadow-md border-[3px] border-white">
             1
         </div>
         <h3 className="text-3xl md:text-4xl font-bold text-gray-700 ml-12 mb-4 border-b-2 border-teal-100 pb-2">Put the events in order (1–5) 🔢</h3>
        
        <div className="space-y-2 pl-0 md:pl-2">
            {[
                { id: "A", text: "The family go on a tour of a farm. 🚜" },
                { id: "B", text: "Jacky tells his family about Farm Life. 🎮" },
                { id: "C", text: "Mum says she wants to go to the beach. 🏖️" },
                { id: "D", text: "Dad tells Jacky to leave his phone at home. 📱" },
                { id: "E", text: "Jacky and his family have a barbecue. 🍖" }
            ].map((item) => {
                const userVal = orderAnswers[item.id] || '';
                const correctVal = CORRECT_ORDER[item.id as keyof typeof CORRECT_ORDER];
                let borderClass = "border-gray-300 focus:border-teal-400";
                let bgClass = "bg-white text-teal-600";
                
                if (userVal) {
                    if (userVal === correctVal) {
                        // Lighter green
                        borderClass = "border-green-300 bg-green-50 text-green-500";
                        bgClass = "bg-green-50";
                    } else {
                        borderClass = "border-red-400 bg-red-50 text-red-700";
                        bgClass = "bg-red-50";
                    }
                }

                return (
                    <div key={item.id} className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl">
                        <input 
                            type="number" 
                            min="1" 
                            max="5"
                            placeholder="?"
                            className={`w-14 h-14 text-center text-3xl font-bold border-[3px] rounded-xl focus:outline-none shadow-sm transition-colors ${borderClass} ${bgClass}`}
                            value={userVal}
                            onChange={(e) => setOrderAnswers({...orderAnswers, [item.id]: e.target.value})}
                        />
                        <p className="text-2xl md:text-3xl font-medium text-gray-700 leading-snug">{item.text}</p>
                    </div>
                );
            })}
        </div>
      </div>

      {/* Part 2: Q&A - Select Options */}
      <div className="bg-white rounded-[2rem] p-6 shadow-lg border-4 border-teal-50 relative">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-700 mb-6 border-b-2 border-teal-100 pb-2 text-center">Choose the right words 🤔</h3>

        <div className="space-y-4">
            {/* Q2 */}
            <div className="space-y-2 p-5 bg-amber-50 rounded-[2rem] border-[3px] border-amber-100 relative">
                <div className="absolute -top-4 -left-2 bg-amber-400 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-sm">2.</div>
                <p className="text-3xl font-bold text-amber-800 pl-8 mb-2">Why does Jacky want to stay home? 🏠</p>
                <div className="text-3xl leading-snug font-medium text-gray-700">
                    <span className="inline-block mr-2">He wants</span>
                    <ChoiceGroup 
                        qId="q2a"
                        options={options.q2a} 
                        selected={fillAnswers['q2a']} 
                        onSelect={(v) => handleFillSelect('q2a', v)} 
                    />
                    <span className="inline-block mx-2">because</span>
                    <ChoiceGroup 
                        qId="q2b"
                        options={options.q2b} 
                        selected={fillAnswers['q2b']} 
                        onSelect={(v) => handleFillSelect('q2b', v)} 
                    />
                    <span className="inline-block mx-2">.</span>
                </div>
            </div>

            {/* Q3 */}
            <div className="space-y-2 p-5 bg-sky-50 rounded-[2rem] border-[3px] border-sky-100 relative">
                <div className="absolute -top-4 -left-2 bg-sky-400 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-sm">3.</div>
                <p className="text-3xl font-bold text-sky-800 pl-8 mb-2">When does Jacky visit the farm? 📅</p>
                <div className="text-3xl leading-snug font-medium text-gray-700">
                    <span className="inline-block mr-2">He</span>
                    <ChoiceGroup 
                        qId="q3"
                        options={options.q3} 
                        selected={fillAnswers['q3']} 
                        onSelect={(v) => handleFillSelect('q3', v)} 
                    />
                    <span className="inline-block mx-2">.</span>
                </div>
            </div>

             {/* Q4 */}
             <div className="space-y-2 p-5 bg-red-50 rounded-[2rem] border-[3px] border-red-100 relative">
                <div className="absolute -top-4 -left-2 bg-red-400 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-sm">4.</div>
                <p className="text-3xl font-bold text-red-800 pl-8 mb-2">What does Jacky eat on the farm? 🍎</p>
                <div className="text-3xl leading-snug font-medium text-gray-700">
                    <span className="inline-block mr-2">He</span>
                     <ChoiceGroup 
                        qId="q4a"
                        options={options.q4a} 
                        selected={fillAnswers['q4a']} 
                        onSelect={(v) => handleFillSelect('q4a', v)} 
                    />
                    <span className="inline-block mx-2">some</span>
                    <ChoiceGroup 
                        qId="q4b"
                        options={options.q4b} 
                        selected={fillAnswers['q4b']} 
                        onSelect={(v) => handleFillSelect('q4b', v)} 
                    />
                    <span className="inline-block mx-2">.</span>
                </div>
            </div>
        </div>
      </div>

      {/* Part 3: Multiple Choice */}
      <div className="bg-white rounded-[2rem] p-6 shadow-lg border-4 border-teal-50">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-700 mb-6 border-b-2 border-teal-100 pb-2 text-center">Circle the best words ⭕</h3>

        <div className="space-y-4 text-4xl font-medium leading-snug">
            {/* Q5 */}
            <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                <span className="font-black text-white bg-teal-400 w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-sm shrink-0">5.</span>
                <span>It is</span>
                <CircleChoice qId="q5" val="Dad" label="Dad’s" />
                <span className="font-bold text-gray-400">/</span>
                <CircleChoice qId="q5" val="Mum" label="Mum’s" />
                <span>idea to visit a real farm. 💡</span>
            </div>

             {/* Q6 */}
             <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                <span className="font-black text-white bg-teal-400 w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-sm shrink-0">6.</span>
                <span>At the start,</span>
                <CircleChoice qId="q6" val="Jacky" label="Jacky" />
                <span className="font-bold text-gray-400">/</span>
                <CircleChoice qId="q6" val="Mum" label="Mum" />
                <span>doesn’t want to go. 🙅</span>
            </div>

            {/* Q7 */}
            <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                <span className="font-black text-white bg-teal-400 w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-sm shrink-0">7.</span>
                <span>At the end, Jacky thinks it is</span>
                <CircleChoice qId="q7" val="boring" label="boring" />
                <span className="font-bold text-gray-400">/</span>
                <CircleChoice qId="q7" val="fun" label="fun" />
                <span>. 🤩</span>
            </div>
        </div>
      </div>

       {/* Part 4: Final Question */}
       <div className="bg-amber-100 rounded-[2rem] p-6 shadow-lg border-[6px] border-amber-200 relative overflow-hidden">
            <span className="absolute -right-4 -top-4 text-7xl opacity-10 rotate-12">❓</span>
            <h3 className="text-4xl font-bold text-amber-900 mb-6">What does Jacky say at the end of the story? 💬</h3>
            <div className="grid gap-3">
                {[
                    "No way! Can we come again next weekend? 😆",
                    "I want to go home now. 🏠",
                    "Farm Life is better than a real farm. 🎮"
                ].map((option, idx) => {
                    const isSelected = finalAnswer === option;
                    const isCorrect = option === CORRECT_FINAL;
                    let btnClass = "bg-white border-amber-200 hover:border-amber-400 shadow-sm text-gray-600";
                    
                    if (isSelected) {
                        if (isCorrect) {
                            // Lighter green
                            btnClass = "bg-green-50 border-green-300 text-green-500 shadow-none scale-[0.98]";
                        } else {
                            btnClass = "bg-red-100 border-red-400 text-red-800 shadow-none";
                        }
                    }

                    return (
                        <button
                            key={idx}
                            onClick={() => setFinalAnswer(option)}
                            className={`
                                text-left p-4 rounded-2xl border-[3px] text-3xl font-medium transition-all
                                ${btnClass}
                            `}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
       </div>
    </div>
  );
};
