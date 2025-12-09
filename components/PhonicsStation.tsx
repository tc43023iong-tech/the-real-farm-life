
import React from 'react';
import { PhonicsRule, VocabularyWord } from '../types';
import { VOCABULARY_DATA } from '../constants';

interface PhonicsStationProps {
  rules: PhonicsRule[];
}

export const PhonicsStation: React.FC<PhonicsStationProps> = ({ rules }) => {
  
  // Helper to find the real vocab object
  const getVocab = (wordWithEmoji: string): VocabularyWord | undefined => {
    // Remove emoji to match key
    const cleanWord = wordWithEmoji.replace(/[^a-zA-Z]/g, '').toLowerCase();
    return VOCABULARY_DATA.find(v => v.word.toLowerCase() === cleanWord);
  };

  // Define fresh pastel color themes for the cards
  const getTheme = (index: number) => {
    const themes = [
      { 
        bg: 'bg-rose-50', 
        border: 'border-rose-200', 
        text: 'text-rose-600', 
        accent: 'bg-rose-100', 
        icon: 'text-rose-400',
        shadow: 'shadow-rose-100'
      },
      { 
        bg: 'bg-sky-50', 
        border: 'border-sky-200', 
        text: 'text-sky-600', 
        accent: 'bg-sky-100', 
        icon: 'text-sky-400',
        shadow: 'shadow-sky-100'
      },
      { 
        bg: 'bg-amber-50', 
        border: 'border-amber-200', 
        text: 'text-amber-600', 
        accent: 'bg-amber-100', 
        icon: 'text-amber-400',
        shadow: 'shadow-amber-100'
      },
    ];
    return themes[index % themes.length];
  };

  return (
    <div className="max-w-6xl mx-auto pb-40 px-4 space-y-8">
      
      {/* Playful Header */}
      <div className="text-center relative py-4">
         {/* Abstract Blob background */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-yellow-200/40 rounded-[100%] blur-3xl -z-10"></div>
         <h2 className="relative text-5xl md:text-6xl font-black text-indigo-800 tracking-tight drop-shadow-sm mb-2 transform -rotate-2">
            Phonics Fun! 🎵
         </h2>
         <p className="text-xl md:text-2xl text-indigo-500 font-bold font-['Comic_Neue'] bg-white/80 inline-block px-6 py-1 rounded-full backdrop-blur-sm border-4 border-indigo-50 shadow-sm">
            Listen & Say 👂🗣️
         </p>
      </div>

      <div className="space-y-6">
        {rules.map((rule, index) => {
          const theme = getTheme(index);
          
          return (
            <div key={rule.symbol} className={`relative ${theme.bg} rounded-[2.5rem] p-6 md:p-8 border-[6px] ${theme.border} shadow-2xl flex flex-col lg:flex-row gap-6 lg:gap-8 items-center overflow-hidden`}>
               
               {/* Decorative Background Symbol */}
               <div className={`absolute -right-8 -bottom-8 text-[10rem] font-black ${theme.text} opacity-5 pointer-events-none select-none`}>
                   {rule.symbol}
               </div>

               {/* Left: The Sound Identity (Sticker Style) */}
               <div className="lg:w-1/3 flex flex-col items-center text-center space-y-4 relative z-10 shrink-0">
                   {/* Circle Badge for Symbol */}
                   <div className={`w-40 h-40 ${theme.accent} rounded-full flex flex-col items-center justify-center border-[6px] border-white shadow-xl transform hover:scale-105 transition-transform duration-300`}>
                       <span className={`text-6xl font-black ${theme.icon} tracking-tighter`}>{rule.symbol}</span>
                       <span className="text-gray-400 text-base font-bold mt-1">sound</span>
                   </div>
                   
                   {/* IPA Sound Bubble */}
                   <div className="bg-white px-6 py-1.5 rounded-xl border-b-4 border-gray-200">
                       <span className="text-2xl font-mono text-gray-600 font-bold">{rule.soundName}</span>
                   </div>

                   {/* Description Speech Bubble */}
                   <div className="relative bg-white p-4 rounded-2xl border-2 border-dashed border-gray-300 shadow-sm w-full max-w-[240px]">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-white border-t-2 border-l-2 border-dashed border-gray-300 transform rotate-45"></div>
                        <p className="text-base text-gray-500 font-bold font-['Noto_Sans_TC'] leading-tight">
                            {rule.description}
                        </p>
                   </div>
               </div>

               {/* Right: The Words Showcase (Tiles) */}
               <div className="lg:w-2/3 w-full relative z-10">
                   <div className="grid grid-cols-2 gap-4">
                       {rule.examples.map((wordStr) => {
                           const vocab = getVocab(wordStr);
                           // Use vocab emoji or fallback
                           const displayEmoji = vocab?.emoji || wordStr.match(/[\p{Emoji}\u200d]+/u)?.[0] || '✨';
                           const cleanWord = vocab ? vocab.word : wordStr.replace(/[\p{Emoji}\u200d]+/u, '').trim();
                           
                           return (
                               <div key={wordStr} className="group bg-white rounded-[2rem] p-4 border-4 border-transparent hover:border-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center justify-center gap-1 cursor-pointer h-full min-h-[140px]">
                                   <div className={`w-16 h-16 ${theme.accent} rounded-full flex items-center justify-center text-3xl mb-1 group-hover:scale-110 transition-transform duration-300`}>
                                       {displayEmoji}
                                   </div>
                                   <div className="w-full">
                                       <p className={`text-3xl md:text-4xl font-black ${theme.text} leading-none mb-1 font-['Comic_Neue']`}>{cleanWord}</p>
                                       {vocab && <p className="text-gray-400 font-bold font-['Noto_Sans_TC'] text-lg">{vocab.chinese}</p>}
                                   </div>
                               </div>
                           )
                       })}
                   </div>
               </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
