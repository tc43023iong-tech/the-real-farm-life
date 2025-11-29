
import React from 'react';
import { PhonicsRule, VocabularyWord } from '../types';
import { speakText } from '../services/geminiService';
import { VOCABULARY_DATA } from '../constants';

interface PhonicsStationProps {
  rules: PhonicsRule[];
}

export const PhonicsStation: React.FC<PhonicsStationProps> = ({ rules }) => {
  
  // Helper to find the real vocab object
  const getVocab = (wordWithEmoji: string): VocabularyWord | undefined => {
    const cleanWord = wordWithEmoji.replace(/[^a-zA-Z]/g, '').toLowerCase();
    return VOCABULARY_DATA.find(v => v.word.toLowerCase() === cleanWord);
  };

  const handleCardClick = (wordWithEmoji: string) => {
    const cleanWord = wordWithEmoji.replace(/[^a-zA-Z]/g, '');
    speakText(cleanWord);
  };

  return (
    <div className="max-w-6xl mx-auto pb-32 space-y-16">
      <div className="text-center bg-white/60 p-8 rounded-[3rem] backdrop-blur-sm shadow-md">
        <h2 className="text-5xl font-black text-indigo-600 mb-4 tracking-tight">Phonics Fun! 🎵</h2>
        <p className="text-3xl text-indigo-800 font-bold">Listen and learn the sounds!</p>
      </div>

      <div className="space-y-12">
        {rules.map((rule) => (
          <div key={rule.symbol} className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border-4 border-indigo-100 flex flex-col md:flex-row gap-10">
            
            {/* Left: The Rule Info */}
            <div className="md:w-1/3 flex flex-col items-center justify-center text-center space-y-6 md:border-r-4 md:border-indigo-50 md:pr-10">
               <div 
                 className="cursor-pointer group relative"
                 onClick={() => speakText(`${rule.soundName}. ${rule.symbol}.`)}
               >
                  <div className="text-9xl font-black text-indigo-500 mb-2 transform group-hover:scale-110 transition-transform drop-shadow-sm">{rule.symbol}</div>
                  <div className="absolute top-0 right-0 text-4xl animate-bounce opacity-0 group-hover:opacity-100 transition-opacity">🔊</div>
               </div>
               
               <div className="bg-indigo-50 px-6 py-2 rounded-full">
                  <span className="text-5xl text-indigo-400 font-mono font-bold">{rule.soundName}</span>
               </div>
               
               <p className="text-2xl text-gray-500 italic bg-white p-4 rounded-2xl border-2 border-indigo-50 w-full shadow-sm">
                 "{rule.description}"
               </p>
               
               <button 
                  onClick={() => speakText(`${rule.soundName}. ${rule.symbol}.`)}
                  className="bg-indigo-400 hover:bg-indigo-500 text-white rounded-full p-4 w-full text-xl font-bold shadow-md transition-all active:scale-95"
               >
                 Play Sound 🔊
               </button>
            </div>

            {/* Right: The Words Grid */}
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 content-center">
               {rule.examples.map((wordStr) => {
                 const vocab = getVocab(wordStr);
                 // Determine emoji: vocab emoji > string emoji > fallback
                 const displayEmoji = vocab?.emoji || wordStr.match(/[\p{Emoji}\u200d]+/u)?.[0] || '🎵';
                 // Clean word for display
                 const cleanWord = vocab ? vocab.word : wordStr.replace(/[\p{Emoji}\u200d]+/u, '').trim();

                 return (
                   <div 
                     key={wordStr}
                     onClick={() => handleCardClick(wordStr)}
                     className="bg-white border-4 border-indigo-50 rounded-[2rem] overflow-hidden hover:border-indigo-300 hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer group flex flex-col"
                   >
                      <div className="h-40 bg-indigo-50 flex items-center justify-center relative overflow-hidden">
                         <span className="text-9xl transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md select-none filter">
                           {displayEmoji}
                         </span>
                         <div className="absolute top-2 right-2 bg-white/90 rounded-full w-10 h-10 flex items-center justify-center text-xl shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">🔊</div>
                      </div>
                      
                      <div className="p-4 text-center flex-1 flex flex-col justify-center gap-1">
                         <h4 className="text-3xl font-black text-gray-800 font-['Comic_Neue']">{cleanWord}</h4>
                         {vocab && (
                           <p className="text-xl font-bold text-indigo-600 font-['Noto_Sans_TC']">{vocab.chinese}</p>
                         )}
                      </div>
                   </div>
                 );
               })}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
