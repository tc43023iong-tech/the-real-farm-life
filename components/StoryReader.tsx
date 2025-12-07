
import React, { useState } from 'react';
import { StorySegment, VocabularyWord, InlineQuestion } from '../types';
import { VOCABULARY_DATA, STORY_QUESTIONS } from '../constants';

interface StoryReaderProps {
  storyData: StorySegment[];
}

// Simple Helper to find if a word matches our vocab list
const findVocab = (text: string): VocabularyWord | undefined => {
  const cleanText = text.replace(/[^a-zA-Z]/g, '').toLowerCase();
  return VOCABULARY_DATA.find(v => v.word.toLowerCase() === cleanText);
};

// Helper to get speaker color
const getSpeakerColor = (speaker: string) => {
  switch (speaker) {
    case 'Dad': return 'bg-blue-100 border-blue-300 text-blue-600';
    case 'Mum': return 'bg-pink-100 border-pink-300 text-pink-600';
    case 'Sister': return 'bg-purple-100 border-purple-300 text-purple-600';
    case 'Jacky': return 'bg-green-100 border-green-300 text-green-600';
    default: return 'bg-gray-100 border-gray-300 text-gray-600';
  }
};

// Helper to get speaker avatar
const getAvatar = (speaker: string) => {
  switch (speaker) {
    case 'Dad': return '👨🏻';
    case 'Mum': return '👩🏻';
    case 'Sister': return '👧🏻';
    case 'Jacky': return '👦🏻';
    default: return '👤';
  }
};

// Fireworks Component for Success Effect (No Emoji, No Text)
const Fireworks = () => {
  // Generate particles
  const particles = Array.from({ length: 36 }).map((_, i) => {
    const angle = (i * 10); // 360 / 36 = 10 degrees per particle
    const color = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'][i % 6];
    return { id: i, angle, color };
  });

  return (
    <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
      <style>
        {`
          @keyframes explode-particle {
            0% { transform: rotate(var(--angle)) translateY(0px) scale(1); opacity: 1; }
            50% { opacity: 1; }
            100% { transform: rotate(var(--angle)) translateY(200px) scale(0); opacity: 0; }
          }
        `}
      </style>
      
      {/* Explosion Particles */}
      <div className="absolute inset-0 flex items-center justify-center">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute w-4 h-8 rounded-full origin-bottom"
            style={{
              '--angle': `${p.angle}deg`,
              backgroundColor: p.color,
              animation: 'explode-particle 1s ease-out forwards',
              boxShadow: `0 0 10px ${p.color}, 0 0 20px ${p.color}`
            } as React.CSSProperties}
          />
        ))}
      </div>
      
      {/* Secondary Explosion (Delayed) */}
      <div className="absolute inset-0 flex items-center justify-center">
         {particles.map((p) => (
            <div
                key={`sub-${p.id}`}
                className="absolute w-3 h-3 rounded-full origin-center"
                style={{
                  '--angle': `${p.angle + 5}deg`, // Offset angle
                  backgroundColor: p.color,
                  animation: 'explode-particle 1.2s ease-out 0.2s forwards', // Delayed
                } as React.CSSProperties}
            />
         ))}
      </div>
    </div>
  );
};

export const StoryReader: React.FC<StoryReaderProps> = ({ storyData }) => {
  const [activeSegmentId, setActiveSegmentId] = useState<string | null>(null);
  const [popupWord, setPopupWord] = useState<VocabularyWord | null>(null);
  
  // Quiz State
  const [activeQuestion, setActiveQuestion] = useState<InlineQuestion | null>(null);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [questionFeedback, setQuestionFeedback] = useState<'correct' | 'incorrect' | null>(null);

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

  const handleQuestionClick = (e: React.MouseEvent, question: InlineQuestion) => {
      e.stopPropagation();
      setActiveQuestion(question);
      // Shuffle options randomly so the answer isn't always first
      const shuffled = [...question.options].sort(() => Math.random() - 0.5);
      setCurrentOptions(shuffled);
      setQuestionFeedback(null);
  };

  const handleOptionSelect = (option: string) => {
      if (!activeQuestion) return;
      if (option === activeQuestion.correctAnswer) {
          setQuestionFeedback('correct');
          // Close modal after success animation
          setTimeout(() => {
              setActiveQuestion(null);
              setQuestionFeedback(null);
          }, 2000); 
      } else {
          setQuestionFeedback('incorrect');
          setTimeout(() => setQuestionFeedback(null), 1000);
      }
  };


  // Function to render text and highlight known vocabulary
  const renderText = (text: string) => {
    const parts = text.split(" ");
    return parts.map((part, index) => {
      // Improved logic to capture (Chinese) even with attached punctuation e.g., (週末)?
      // Matches: start with (, contains ), optional punctuation at end
      const chineseParenMatch = part.match(/^(\(.*\))([.,?!]+)?$/);

      if (chineseParenMatch) {
          const content = chineseParenMatch[1]; // The (Chinese) part including Parens
          const punctuation = chineseParenMatch[2] || '';
          return (
             <span key={index} className="mx-1 align-middle">
                 {/* Reduced font size for Chinese translation */}
                 <span className="text-base text-gray-400 font-bold font-['Noto_Sans_TC']">{content}</span>
                 {punctuation && <span className="font-black text-gray-800 ml-0.5">{punctuation}</span>}
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
      
      {/* Page Instruction & Banner */}
      <div className="text-center mb-6">
         <p className="text-3xl md:text-4xl font-black text-orange-500 bg-orange-50 inline-block px-8 py-3 rounded-full border-4 border-orange-200 shadow-sm animate-bounce">
           Turn your book to page 49! 📖
         </p>

         {/* The 'Real' Farm Life Banner (CSS Art) */}
         <div className="relative w-full max-w-2xl mx-auto h-48 mt-8 rounded-[3rem] overflow-hidden shadow-xl border-[6px] border-green-300 bg-sky-200 group transform rotate-1 hover:rotate-0 transition-transform duration-500">
            {/* Sun */}
            <div className="absolute top-4 right-8 w-20 h-20 bg-yellow-300 rounded-full blur-xl opacity-80 animate-pulse"></div>
            
            {/* Clouds */}
            <div className="absolute top-8 left-12 w-24 h-10 bg-white rounded-full opacity-70"></div>
            <div className="absolute top-12 left-28 w-16 h-8 bg-white rounded-full opacity-60"></div>

            {/* Hills */}
            <div className="absolute -bottom-16 -left-10 w-[120%] h-40 bg-green-400 rounded-[50%]"></div>
            <div className="absolute -bottom-20 right-0 w-[120%] h-40 bg-green-500 rounded-[50%] opacity-80"></div>

            {/* Fence - Simplified visual */}
            <div className="absolute bottom-4 left-0 right-0 px-8 flex justify-center gap-3 opacity-90">
               {Array.from({ length: 15 }).map((_, i) => (
                   <div key={i} className="w-3 h-10 bg-amber-800 rounded-t-md relative">
                       {/* Posts */}
                   </div>
               ))}
               <div className="absolute bottom-4 left-0 right-0 h-1 bg-amber-800 w-full opacity-50"></div>
               <div className="absolute bottom-8 left-0 right-0 h-1 bg-amber-800 w-full opacity-50"></div>
            </div>

            {/* Title Text */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pt-4">
                 <h1 className="text-5xl md:text-6xl font-black text-orange-500 tracking-tight transform -rotate-2 drop-shadow-[0_4px_0_rgba(255,255,255,1)]" style={{ WebkitTextStroke: '2px white' }}>
                    The 'real' farm life
                 </h1>
            </div>
         </div>
      </div>

      <div className="space-y-8">
        {storyData.map((segment) => {
          const isNarrator = segment.type === 'narrative';
          const isActive = activeSegmentId === segment.id;
          const inlineQuestion = STORY_QUESTIONS[segment.id];

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

                 {/* Inline Question Button */}
                 {inlineQuestion && (
                     <button 
                        onClick={(e) => handleQuestionClick(e, inlineQuestion)}
                        className="absolute bottom-2 right-2 w-14 h-14 bg-yellow-400 hover:bg-yellow-300 text-white rounded-full flex items-center justify-center text-3xl font-black shadow-lg border-4 border-white transform hover:scale-110 transition-all animate-bounce"
                        title="Click to quiz!"
                     >
                         ?
                     </button>
                 )}
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

                 {/* Inline Question Button */}
                 {inlineQuestion && (
                     <button 
                        onClick={(e) => handleQuestionClick(e, inlineQuestion)}
                        className="absolute bottom-2 right-2 w-14 h-14 bg-yellow-400 hover:bg-yellow-300 text-white rounded-full flex items-center justify-center text-3xl font-black shadow-lg border-4 border-white transform hover:scale-110 transition-all animate-bounce"
                        title="Click to quiz!"
                     >
                         ?
                     </button>
                 )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Vocabulary Modal */}
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

      {/* Quiz Modal - Redesigned */}
      {activeQuestion && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" onClick={() => setActiveQuestion(null)}>
            <div 
                className="bg-white rounded-[3rem] p-8 max-w-lg w-full shadow-2xl border-[8px] border-yellow-300 relative overflow-hidden animate-bounce-in transform transition-all"
                onClick={e => e.stopPropagation()}
            >
                {/* Decorative header blob */}
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-yellow-200 rounded-full blur-2xl opacity-50"></div>
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-orange-200 rounded-full blur-2xl opacity-50"></div>

                {/* Close Button */}
                <button 
                 onClick={() => setActiveQuestion(null)}
                 className="absolute right-6 top-6 bg-gray-100 hover:bg-red-400 hover:text-white rounded-full w-12 h-12 font-bold text-2xl transition-colors z-20 shadow-sm border-2 border-white"
                >
                 ✕
                </button>

                {/* Content */}
                <div className="mt-8 text-center relative z-10">
                    <div className="inline-block bg-yellow-100 text-yellow-700 px-6 py-2 rounded-full font-black text-xl mb-6 border-2 border-yellow-200 shadow-sm transform -rotate-2">
                        Quiz Time! 🧠
                    </div>
                    
                    <h3 className="text-3xl font-black text-gray-800 mb-8 leading-snug drop-shadow-sm">
                        {activeQuestion.question.split(/(\(.*\))/).map((part, i) => {
                            if (part.startsWith('(') && part.endsWith(')')) {
                                // Reduced font size here from text-2xl to text-lg
                                return <span key={i} className="block text-lg text-gray-500 font-bold mt-2 font-['Noto_Sans_TC']">{part}</span>
                            }
                            return <span key={i}>{part}</span>
                        })}
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                        {currentOptions.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleOptionSelect(opt)}
                                disabled={questionFeedback !== null}
                                className={`
                                    py-4 px-6 rounded-2xl text-xl font-bold border-b-4 transition-all transform active:scale-95 active:border-b-0 active:translate-y-1
                                    ${questionFeedback === 'correct' && opt === activeQuestion.correctAnswer 
                                        ? 'bg-green-500 border-green-700 text-white shadow-lg' 
                                        : questionFeedback === 'incorrect' && opt !== activeQuestion.correctAnswer
                                            ? 'opacity-50 bg-gray-100 border-gray-300'
                                            : 'bg-white border-blue-200 text-blue-800 hover:bg-blue-50 hover:border-blue-300 shadow-md'
                                    }
                                `}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>

                    {/* Feedback Overlay - Fireworks (No Emoji) */}
                    {questionFeedback === 'correct' && <Fireworks />}
                    
                     {/* Feedback Overlay - Incorrect */}
                     {questionFeedback === 'incorrect' && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 bg-red-100/10 backdrop-blur-[1px] rounded-[2.5rem]">
                            <div className="text-9xl animate-shake drop-shadow-lg filter grayscale opacity-80">❌</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
      )}

    </div>
  );
};
