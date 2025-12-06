
import React, { useState } from 'react';
import { StorySegment, VocabularyWord } from '../types';
import { VOCABULARY_DATA } from '../constants';

interface StoryReaderProps {
  storyData: StorySegment[];
}

// Simple Helper to find if a word matches our vocab list
const findVocab = (text: string): VocabularyWord | undefined => {
  const cleanText = text.replace(/[^a-zA-Z]/g, '').toLowerCase();
  return VOCABULARY_DATA.find(v => v.word.toLowerCase() === cleanText);
};

export const StoryReader: React.FC<StoryReaderProps> = ({ storyData }) => {
  const [activeSegmentId, setActiveSegmentId] = useState<string | null>(null);
  const [popupWord, setPopupWord] = useState<VocabularyWord | null>(null);

  const handleSegmentClick = (segment: StorySegment) => {
    setActiveSegmentId(segment.id);
  };

  const handleWordClick = (e: React.MouseEvent, word: string) => {
    e.stopPropagation();
    const vocab = findVocab(word);
    if (vocab) {
      setPopupWord(vocab);
    }
  };

  // Function to render text and highlight known vocabulary
  const renderText = (text: string) => {
    const parts = text.split(" ");
    return parts.map((part, index) => {
      // Check for parenthesized Chinese text e.g. (計畫)
      if (part.startsWith('(') && part.endsWith(')')) {
          return (
             <span key={index} className="mx-1 text-xl text-gray-500 font-bold font-['Noto_Sans_TC'] align-middle">
                 {part}
             </span>
          );
      }

      // Updated Regex: extract the first sequence of letters anywhere in the string
      // This handles 'Leave -> Leave and barbecue -> barbecue
      const wordMatch = part.match(/([a-zA-Z]+)/);
      const cleanWord = wordMatch ? wordMatch[0] : "";
      const vocab = findVocab(cleanWord);

      if (vocab && !vocab.noStoryHighlight) {
        return (
          <span 
            key={index} 
            className="inline-block mx-1 text-pink-600 font-black border-b-2 border-pink-400 cursor-pointer hover:scale-110 transition-transform hover:bg-pink-100 rounded px-1 align-middle"
            onClick={(e) => handleWordClick(e, cleanWord)}
          >
            {part}
          </span>
        );
      }
      return <span key={index} className="mx-1 font-black align-middle">{part}</span>;
    });
  };

  // Helper to distinguish sequence words
  const getSequenceStyle = (text: string) => {
    const t = text.trim();
    if (t.startsWith('First')) return { badge: '1. First', color: 'bg-red-50 border-red-200 text-red-800' };
    if (t.startsWith('Then')) return { badge: '2. Then', color: 'bg-blue-50 border-blue-200 text-blue-800' };
    if (t.startsWith('Next')) return { badge: '3. Next', color: 'bg-blue-50 border-blue-200 text-blue-800' };
    if (t.startsWith('Finally')) return { badge: '4. Finally', color: 'bg-purple-50 border-purple-200 text-purple-800' };
    return null;
  };

  // Helper to render the segment content. Supports interleaved display if '|' is present.
  const renderSegmentContent = (text: string, chinese: string, isActive: boolean) => {
    const engParts = text.split('|');
    const chiParts = chinese.split('|');
    const textBaseSize = isActive ? "text-3xl" : "text-2xl"; // Active text is bigger

    if (engParts.length > 1 && engParts.length === chiParts.length) {
      return (
        <div className="flex flex-col gap-3">
          {engParts.map((engPart, idx) => {
             const seqStyle = getSequenceStyle(engPart);
             return (
                <div key={idx} className={`mb-2 last:mb-0 rounded-xl p-2 ${seqStyle ? seqStyle.color + ' border-2 pl-4 relative mt-4' : ''}`}>
                   {seqStyle && (
                       <span className="absolute -top-4 -left-2 bg-white px-2 py-0.5 rounded-full text-sm font-black border-2 shadow-sm">
                           {seqStyle.badge}
                       </span>
                   )}
                   <div className={`${textBaseSize} md:${isActive ? 'text-4xl' : 'text-3xl'} leading-relaxed text-gray-800 font-black mb-1 transition-all`}>
                     {renderText(engPart)}
                   </div>
                   <div className="text-xl text-gray-500 font-['Noto_Sans_TC'] font-bold opacity-90">
                     {chiParts[idx]}
                   </div>
                </div>
             );
          })}
        </div>
      );
    }

    // Single segment check
    const seqStyle = getSequenceStyle(text);
    return (
      <div className={`flex flex-col gap-1 ${seqStyle ? seqStyle.color + ' rounded-xl p-4 border-2 relative mt-4' : ''}`}>
         {seqStyle && (
            <span className="absolute -top-4 -left-2 bg-white px-2 py-0.5 rounded-full text-sm font-black border-2 shadow-sm">
                {seqStyle.badge}
            </span>
         )}
         <div className={`${textBaseSize} md:${isActive ? 'text-4xl' : 'text-3xl'} leading-relaxed text-gray-800 font-black mb-3 transition-all`}>
           {renderText(text)}
         </div>
         <div className="text-xl text-gray-500 font-['Noto_Sans_TC'] font-bold opacity-90">
           {chinese}
         </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-32">
      
      {/* Page Instruction */}
      <div className="text-center mb-6">
         <p className="text-3xl md:text-4xl font-black text-orange-500 bg-orange-50 inline-block px-8 py-3 rounded-full border-4 border-orange-200 shadow-sm animate-bounce">
           Turn your book to page 49! 📖
         </p>
      </div>

      <div className="space-y-8">
        {storyData.map((segment) => {
          const isNarrator = segment.type === 'narrative';
          const isActive = activeSegmentId === segment.id;

          // Determine alignment: Default to explicit 'side', then fallback to speaker logic if needed
          const alignRight = segment.side === 'right' || (!segment.side && segment.speaker === 'Jacky');

          if (isNarrator) {
             return (
              <div
                key={segment.id}
                onClick={() => handleSegmentClick(segment)}
                className={`
                  cursor-pointer p-8 rounded-[2rem] transition-all duration-300 border-4 relative mx-2
                  ${isActive 
                    ? 'bg-amber-50 border-amber-400 shadow-xl' 
                    : 'bg-white border-stone-200 hover:border-amber-200 hover:bg-stone-50 shadow-md'}
                `}
              >
                 <div className="flex flex-col gap-4">
                    {renderSegmentContent(segment.text, segment.chinese, isActive)}
                 </div>
                 <div className="absolute -top-4 left-6 bg-stone-500 text-white px-4 py-1 rounded-full text-lg font-bold shadow-sm">
                    Story
                 </div>
              </div>
             )
          }

          return (
            <div
              key={segment.id}
              onClick={() => handleSegmentClick(segment)}
              className={`
                flex gap-4 cursor-pointer transition-all duration-300 items-end
                ${alignRight ? 'flex-row-reverse' : 'flex-row'}
              `}
            >
              {/* Avatar */}
              <div className={`
                w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-lg border-4 border-white shrink-0 z-10
                ${getSpeakerColor(segment.speaker || '')}
              `}>
                {getAvatar(segment.speaker || '')}
              </div>

              {/* Bubble */}
              <div className={`
                p-6 rounded-[2rem] relative shadow-md border-b-4 transition-all duration-300 origin-bottom
                ${alignRight ? 'rounded-br-none text-left' : 'rounded-bl-none text-left'}
                
                ${isActive 
                    ? 'bg-amber-50 border-amber-400 ring-4 ring-amber-200 z-10 shadow-xl' 
                    : `bg-white border-gray-200 ${alignRight ? 'bg-blue-50 border-blue-200' : ''} max-w-[85%]`}
              `}>
                 <span className="text-xl font-black text-gray-400 uppercase tracking-wider mb-2 block">
                    {segment.speaker}
                  </span>
                 {renderSegmentContent(segment.text, segment.chinese, isActive)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Cute Pop-up Modal */}
      {popupWord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setPopupWord(null)}>
          <div 
            className="bg-white rounded-[2rem] p-6 max-w-md w-full shadow-2xl transform transition-all animate-bounce-in border-8 border-sky-300"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative">
               <button 
                 onClick={() => setPopupWord(null)}
                 className="absolute -right-2 -top-2 bg-gray-200 hover:bg-red-400 hover:text-white rounded-full w-10 h-10 font-bold text-xl transition-colors"
               >
                 ✕
               </button>
               
               <div className="w-full h-48 rounded-2xl overflow-hidden mb-6 bg-gray-100 border-2 border-gray-100">
                  <img src={popupWord.image} alt={popupWord.word} className="w-full h-full object-cover" />
               </div>

               <div className="text-center space-y-4">
                  <h3 className="text-5xl font-black text-sky-600 tracking-wide font-['Comic_Neue']">{popupWord.word}</h3>
                  <div className="flex items-center justify-center gap-3">
                     <span className="text-2xl text-gray-400 font-mono">{popupWord.phonetic}</span>
                  </div>
                  <div className="bg-yellow-100 py-3 rounded-xl">
                    <p className="text-4xl font-black text-yellow-700 font-['Noto_Sans_TC']">{popupWord.chinese}</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const getSpeakerColor = (speaker: string) => {
  switch (speaker.toLowerCase()) {
    case 'jacky': return 'bg-blue-400';
    case 'dad': return 'bg-green-500';
    case 'mum': return 'bg-pink-400';
    default: return 'bg-purple-400';
  }
};

const getAvatar = (speaker: string) => {
  switch (speaker.toLowerCase()) {
    case 'jacky': return '👦🏻';
    case 'dad': return '👨🏻';
    case 'mum': return '👩🏻';
    case 'sister': return '👧🏻';
    case 'brother': return '🧒🏻';
    default: return '🐮';
  }
};
