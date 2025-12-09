
import React, { useState } from 'react';

// Reusable Components for Consistency

interface ChoiceButtonProps {
    label: string;
    isSelected: boolean;
    isCorrect: boolean;
    onClick: () => void;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ label, isSelected, isCorrect, onClick }) => {
    let baseClass = "px-3 py-1.5 md:px-4 md:py-2 rounded-xl border-[3px] font-bold text-lg md:text-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-sm";
    let stateClass = "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"; // Default

    if (isSelected) {
        if (isCorrect) {
            stateClass = "bg-green-100 border-green-400 text-green-700 shadow-md"; 
        } else {
            stateClass = "bg-red-50 border-red-300 text-red-700 opacity-90";
        }
    }

    return (
        <button onClick={onClick} className={`${baseClass} ${stateClass}`}>
            {label}
        </button>
    );
};

interface QuestionCardProps {
    number: string | number;
    children: React.ReactNode;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ number, children }) => (
    <div className="bg-white rounded-[1.5rem] shadow-sm border-[4px] border-slate-100 overflow-hidden relative hover:border-slate-200 transition-colors group">
        <div className="absolute top-0 left-0 bg-slate-100 text-slate-500 px-4 py-1 rounded-br-2xl font-black text-lg border-b-[3px] border-r-[3px] border-slate-200 z-10 group-hover:bg-slate-200 group-hover:text-slate-600 transition-colors">
            {number}
        </div>
        <div className="p-4 pt-12 md:p-5 md:pt-12">
            {children}
        </div>
    </div>
);

interface SectionHeaderProps {
    icon: string;
    title: string;
    colorClass: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, title, colorClass }) => (
    <div className="flex items-center gap-3 mb-2 mt-4 first:mt-0">
        <div className={`w-10 h-10 md:w-12 md:h-12 ${colorClass} rounded-xl flex items-center justify-center text-white text-xl md:text-2xl font-black shadow-md transform -rotate-3`}>
            {icon}
        </div>
        <h3 className="text-3xl md:text-4xl font-black text-slate-700 tracking-tight">{title}</h3>
    </div>
);

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
    setChoiceAnswers(prev => {
        // Toggle off if clicking the selected one
        if (prev[qId] === value) {
            const newItem = { ...prev };
            delete newItem[qId];
            return newItem;
        }
        return { ...prev, [qId]: value };
    });
  };

  const handleFillSelect = (key: string, value: string) => {
    setFillAnswers(prev => {
        // Toggle off if clicking the selected one
        if (prev[key] === value) {
            const newItem = { ...prev };
            delete newItem[key];
            return newItem;
        }
        return { ...prev, [key]: value };
    });
  };

  const options = {
      q2a: ["to stay home", "to go swimming", "to sleep"],
      q2b: ["he is sick", "he wants to play his game", "he is hungry"],
      q3: ["visits on Monday", "visits on Saturday", "visits on Sunday"],
      q4a: ["plays", "eats", "cooks"],
      q4b: ["grass", "apples & BBQ", "books"]
  };

  return (
    <div className="max-w-4xl mx-auto pb-48 px-3 space-y-4">
      
      {/* Page Instruction */}
      <div className="text-center mb-4 space-y-2">
         <div className="inline-block bg-orange-100 text-orange-600 px-6 py-1.5 rounded-full font-bold border-2 border-orange-200 text-sm md:text-base animate-bounce">
           Page 51 📖
         </div>
         <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight drop-shadow-sm">
            Quiz Time! <span className="text-3xl align-middle">✍️</span>
         </h2>
      </div>

      {/* Part A: Ordering */}
      <section>
          <SectionHeader icon="A" title="Order (1-5)" colorClass="bg-teal-400" />
          
          <div className="bg-white rounded-[2rem] p-4 md:p-6 border-[5px] border-teal-100 shadow-lg space-y-2 relative overflow-hidden">
              {/* Decorative Number Bg */}
              <div className="absolute -right-6 -bottom-8 text-8xl font-black text-teal-50 opacity-50 pointer-events-none select-none">123</div>

              {[
                { id: "A", text: "The family go on a tour of a farm. 🚜" },
                { id: "B", text: "Jacky tells his family about Farm Life. 🎮" },
                { id: "C", text: "Mum says she wants to go to the beach. 🏖️" },
                { id: "D", text: "Dad tells Jacky to leave his phone at home. 📱" },
                { id: "E", text: "Jacky and his family have a barbecue. 🍖" }
              ].map((item) => {
                const userVal = orderAnswers[item.id] || '';
                const correctVal = CORRECT_ORDER[item.id as keyof typeof CORRECT_ORDER];
                
                let inputStyle = "bg-slate-50 border-slate-200 text-slate-400 focus:border-teal-400 focus:bg-white";
                if (userVal) {
                    if (userVal === correctVal) {
                        inputStyle = "bg-green-50 border-green-300 text-green-600 font-black";
                    } else {
                        inputStyle = "bg-red-50 border-red-200 text-red-500 font-black";
                    }
                }

                return (
                    <div key={item.id} className="flex items-center gap-3 group">
                        <div className="relative shrink-0">
                            <input 
                                type="number" 
                                min="1" 
                                max="5"
                                placeholder="-"
                                className={`w-12 h-12 md:w-14 md:h-14 text-center text-2xl md:text-3xl rounded-xl border-[3px] shadow-sm outline-none transition-all ${inputStyle}`}
                                value={userVal}
                                onChange={(e) => setOrderAnswers({...orderAnswers, [item.id]: e.target.value})}
                            />
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-slate-600 group-hover:text-slate-800 transition-colors leading-tight">
                            {item.text}
                        </p>
                    </div>
                );
              })}
          </div>
      </section>

      {/* Part B: Questions */}
      <section>
         <SectionHeader icon="B" title="Questions" colorClass="bg-indigo-400" />
         
         <div className="grid grid-cols-1 gap-3">
            
            {/* Q2 */}
            <QuestionCard number="2">
                <p className="text-2xl md:text-3xl font-black text-slate-700 mb-2">Why does Jacky want to stay home? 🏠</p>
                <div className="text-xl md:text-2xl font-bold text-slate-500 leading-relaxed">
                    <span className="inline-block mr-2 text-slate-400">He wants</span>
                    <div className="inline-flex flex-wrap gap-2 align-middle">
                        {options.q2a
                            .filter(opt => !fillAnswers['q2a'] || fillAnswers['q2a'] === opt)
                            .map(opt => (
                                <ChoiceButton 
                                    key={opt} 
                                    label={opt} 
                                    isSelected={fillAnswers['q2a'] === opt} 
                                    isCorrect={CORRECT_FILL['q2a'] === opt}
                                    onClick={() => handleFillSelect('q2a', opt)} 
                                />
                        ))}
                    </div>
                    <span className="inline-block mx-2 text-slate-400">because</span>
                    <div className="inline-flex flex-wrap gap-2 align-middle">
                        {options.q2b
                            .filter(opt => !fillAnswers['q2b'] || fillAnswers['q2b'] === opt)
                            .map(opt => (
                                <ChoiceButton 
                                    key={opt} 
                                    label={opt} 
                                    isSelected={fillAnswers['q2b'] === opt} 
                                    isCorrect={CORRECT_FILL['q2b'] === opt}
                                    onClick={() => handleFillSelect('q2b', opt)} 
                                />
                        ))}
                    </div>
                    <span className="text-slate-400">.</span>
                </div>
            </QuestionCard>

            {/* Q3 */}
            <QuestionCard number="3">
                <p className="text-2xl md:text-3xl font-black text-slate-700 mb-2">When does Jacky visit the farm? 📅</p>
                <div className="text-xl md:text-2xl font-bold text-slate-500 leading-relaxed">
                    <span className="inline-block mr-2 text-slate-400">He</span>
                    <div className="inline-flex flex-wrap gap-2 align-middle">
                        {options.q3
                            .filter(opt => !fillAnswers['q3'] || fillAnswers['q3'] === opt)
                            .map(opt => (
                                <ChoiceButton 
                                    key={opt} 
                                    label={opt} 
                                    isSelected={fillAnswers['q3'] === opt} 
                                    isCorrect={CORRECT_FILL['q3'] === opt}
                                    onClick={() => handleFillSelect('q3', opt)} 
                                />
                        ))}
                    </div>
                    <span className="text-slate-400">.</span>
                </div>
            </QuestionCard>

            {/* Q4 */}
            <QuestionCard number="4">
                <p className="text-2xl md:text-3xl font-black text-slate-700 mb-2">What does Jacky eat on the farm? 🍎</p>
                <div className="text-xl md:text-2xl font-bold text-slate-500 leading-relaxed">
                    <span className="inline-block mr-2 text-slate-400">He</span>
                    <div className="inline-flex flex-wrap gap-2 align-middle">
                        {options.q4a
                            .filter(opt => !fillAnswers['q4a'] || fillAnswers['q4a'] === opt)
                            .map(opt => (
                                <ChoiceButton 
                                    key={opt} 
                                    label={opt} 
                                    isSelected={fillAnswers['q4a'] === opt} 
                                    isCorrect={CORRECT_FILL['q4a'] === opt}
                                    onClick={() => handleFillSelect('q4a', opt)} 
                                />
                        ))}
                    </div>
                    <span className="inline-block mx-2 text-slate-400">some</span>
                    <div className="inline-flex flex-wrap gap-2 align-middle">
                        {options.q4b
                            .filter(opt => !fillAnswers['q4b'] || fillAnswers['q4b'] === opt)
                            .map(opt => (
                                <ChoiceButton 
                                    key={opt} 
                                    label={opt} 
                                    isSelected={fillAnswers['q4b'] === opt} 
                                    isCorrect={CORRECT_FILL['q4b'] === opt}
                                    onClick={() => handleFillSelect('q4b', opt)} 
                                />
                        ))}
                    </div>
                    <span className="text-slate-400">.</span>
                </div>
            </QuestionCard>

            {/* Q5 */}
            <QuestionCard number="5">
                <p className="text-2xl md:text-3xl font-black text-slate-700 mb-2">Whose idea is it? 💡</p>
                <div className="text-xl md:text-2xl font-bold text-slate-500 leading-relaxed flex flex-wrap items-center gap-2">
                    <span>It is</span>
                    {(!choiceAnswers['q5'] || choiceAnswers['q5'] === 'Dad') && (
                        <ChoiceButton 
                            label="Dad's" 
                            isSelected={choiceAnswers['q5'] === 'Dad'} 
                            isCorrect={CORRECT_CHOICE['q5'] === 'Dad'} 
                            onClick={() => toggleChoice('q5', 'Dad')} 
                        />
                    )}
                    {!choiceAnswers['q5'] && <span className="text-slate-300">/</span>}
                    {(!choiceAnswers['q5'] || choiceAnswers['q5'] === 'Mum') && (
                        <ChoiceButton 
                            label="Mum's" 
                            isSelected={choiceAnswers['q5'] === 'Mum'} 
                            isCorrect={CORRECT_CHOICE['q5'] === 'Mum'} 
                            onClick={() => toggleChoice('q5', 'Mum')} 
                        />
                    )}
                    <span>idea to visit a real farm.</span>
                </div>
            </QuestionCard>

            {/* Q6 */}
            <QuestionCard number="6">
                <p className="text-2xl md:text-3xl font-black text-slate-700 mb-2">Who doesn't want to go? 🙅</p>
                <div className="text-xl md:text-2xl font-bold text-slate-500 leading-relaxed flex flex-wrap items-center gap-2">
                    <span>At the start,</span>
                    {(!choiceAnswers['q6'] || choiceAnswers['q6'] === 'Jacky') && (
                        <ChoiceButton 
                            label="Jacky" 
                            isSelected={choiceAnswers['q6'] === 'Jacky'} 
                            isCorrect={CORRECT_CHOICE['q6'] === 'Jacky'} 
                            onClick={() => toggleChoice('q6', 'Jacky')} 
                        />
                    )}
                    {!choiceAnswers['q6'] && <span className="text-slate-300">/</span>}
                    {(!choiceAnswers['q6'] || choiceAnswers['q6'] === 'Mum') && (
                        <ChoiceButton 
                            label="Mum" 
                            isSelected={choiceAnswers['q6'] === 'Mum'} 
                            isCorrect={CORRECT_CHOICE['q6'] === 'Mum'} 
                            onClick={() => toggleChoice('q6', 'Mum')} 
                        />
                    )}
                    <span>doesn't want to go.</span>
                </div>
            </QuestionCard>

            {/* Q7 */}
            <QuestionCard number="7">
                 <p className="text-2xl md:text-3xl font-black text-slate-700 mb-2">How was it? 🤩</p>
                 <div className="text-xl md:text-2xl font-bold text-slate-500 leading-relaxed flex flex-wrap items-center gap-2">
                    <span>At the end, Jacky thinks it is</span>
                    {(!choiceAnswers['q7'] || choiceAnswers['q7'] === 'boring') && (
                        <ChoiceButton 
                            label="boring" 
                            isSelected={choiceAnswers['q7'] === 'boring'} 
                            isCorrect={CORRECT_CHOICE['q7'] === 'boring'} 
                            onClick={() => toggleChoice('q7', 'boring')} 
                        />
                    )}
                    {!choiceAnswers['q7'] && <span className="text-slate-300">/</span>}
                    {(!choiceAnswers['q7'] || choiceAnswers['q7'] === 'fun') && (
                        <ChoiceButton 
                            label="fun" 
                            isSelected={choiceAnswers['q7'] === 'fun'} 
                            isCorrect={CORRECT_CHOICE['q7'] === 'fun'} 
                            onClick={() => toggleChoice('q7', 'fun')} 
                        />
                    )}
                    <span>.</span>
                </div>
            </QuestionCard>

         </div>
      </section>

      {/* Part C: Final */}
      <section>
          <div className="bg-amber-100 rounded-[2rem] p-4 md:p-6 border-[5px] border-amber-300 shadow-lg relative overflow-hidden group">
            {/* Background Icon */}
            <div className="absolute -right-8 -top-8 text-8xl text-amber-200 opacity-60 rotate-12 group-hover:rotate-0 transition-transform duration-500">💬</div>
            
            <h3 className="text-3xl md:text-4xl font-black text-amber-800 mb-4 relative z-10">What does Jacky say?</h3>
            
            <div className="space-y-2 relative z-10">
                {[
                    "No way! Can we come again next weekend? 😆",
                    "I want to go home now. 🏠",
                    "Farm Life is better than a real farm. 🎮"
                ]
                .filter(option => !finalAnswer || finalAnswer === option)
                .map((option, idx) => {
                    const isSelected = finalAnswer === option;
                    const isCorrect = option === CORRECT_FINAL;
                    
                    let btnClass = "bg-white/80 border-amber-200 text-amber-900/70 hover:bg-white hover:border-amber-300";
                    if (isSelected) {
                        if (isCorrect) {
                            btnClass = "bg-green-100 border-green-400 text-green-800 shadow-md ring-2 ring-green-200";
                        } else {
                            btnClass = "bg-red-50 border-red-300 text-red-800";
                        }
                    }

                    return (
                        <button
                            key={option} 
                            onClick={() => setFinalAnswer(prev => prev === option ? null : option)}
                            className={`w-full text-left px-4 py-3 rounded-xl border-[3px] text-xl md:text-2xl font-bold transition-all ${btnClass}`}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
          </div>
      </section>

    </div>
  );
};
