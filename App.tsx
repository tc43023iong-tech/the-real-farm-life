
import React, { useState } from 'react';
import { ViewMode } from './types';
import { STORY_DATA, VOCABULARY_DATA, PHONICS_DATA } from './constants';
import { StoryReader } from './components/StoryReader';
import { VocabularyList } from './components/VocabularyList';
import { PhonicsStation } from './components/PhonicsStation';
import { ValuesSection } from './components/ValuesSection';
import { WarmUpChat } from './components/WarmUpChat';
import { PostReadingSection } from './components/PostReadingSection';
import { LanguageFocusSection } from './components/LanguageFocusSection';

const App: React.FC = () => {
  // Defaulting to VOCABULARY as it's now the first item
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.VOCABULARY);

  const renderContent = () => {
    switch (viewMode) {
      case ViewMode.VOCABULARY:
        return <VocabularyList words={VOCABULARY_DATA} />;
      case ViewMode.LANGUAGE_FOCUS:
        return <LanguageFocusSection />;
      case ViewMode.WARMUP_QA:
        return <WarmUpChat />;
      case ViewMode.READING:
        return <StoryReader storyData={STORY_DATA} />;
      case ViewMode.POST_READING:
        return <PostReadingSection />;
      case ViewMode.PHONICS:
        return <PhonicsStation rules={PHONICS_DATA} />;
      case ViewMode.VALUES:
        return <ValuesSection />;
      default:
        return <VocabularyList words={VOCABULARY_DATA} />;
    }
  };

  const NavButton = ({ mode, icon, label, colorClass, borderColorClass }: { mode: ViewMode, icon: string, label: string, colorClass: string, borderColorClass: string }) => (
    <button
      onClick={() => {
        setViewMode(mode);
        window.scrollTo(0, 0);
      }}
      className={`
        flex flex-col items-center justify-center p-2 rounded-2xl transition-all w-full min-w-[60px]
        ${viewMode === mode 
          ? `${colorClass} text-white shadow-[0_4px_0_0_rgba(0,0,0,0.2)] transform -translate-y-2 border-b-0` 
          : `bg-white text-gray-500 border-2 ${borderColorClass} hover:bg-gray-50`}
      `}
    >
      <span className="text-xl md:text-2xl mb-1 filter drop-shadow-sm">{icon}</span>
      <span className="font-bold text-[10px] md:text-xs tracking-wide leading-tight text-center w-full">{label}</span>
    </button>
  );

  return (
    // Added a polka dot pattern via background-image in inline style for simplicity
    <div className="min-h-screen font-comic-neue" style={{
        backgroundColor: '#e0f2fe',
        backgroundImage: 'radial-gradient(#bae6fd 2px, transparent 2px)',
        backgroundSize: '30px 30px'
    }}>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b-4 border-sky-200">
        <div className="max-w-5xl mx-auto px-4 h-20 flex items-center justify-center md:justify-between">
          <div className="flex items-center gap-3 animate-bounce-slow">
            <span className="text-5xl filter drop-shadow-md">🐮</span>
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-black text-gray-800 tracking-tight leading-none">
                The 'real' farm life
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area - Expanded max-w to 7xl for wider vocab list */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderContent()}
      </main>

      {/* Persistent Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-2 z-50 pointer-events-none">
        <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl p-2 border-4 border-white pointer-events-auto overflow-x-auto">
          {/* 
             Nav Order: 
             1. Words (Vocabulary) + Match
             2. Grammar (Language Focus)
             3. Chat (WarmUp QA)
             4. Story (Reading)
             5. Quiz (Post Reading)
             6. Sounds (Phonics)
             7. Values 
          */}
          <div className="grid grid-cols-7 gap-1 md:gap-2 min-w-[500px]">
            <NavButton 
              mode={ViewMode.VOCABULARY} 
              icon="🍎" 
              label="Words" 
              colorClass="bg-green-400" 
              borderColorClass="border-green-200"
            />
            <NavButton 
              mode={ViewMode.LANGUAGE_FOCUS} 
              icon="🧠" 
              label="Grammar" 
              colorClass="bg-fuchsia-400" 
              borderColorClass="border-fuchsia-200"
            />
             <NavButton 
              mode={ViewMode.WARMUP_QA} 
              icon="💬" 
              label="Chat" 
              colorClass="bg-purple-400"
              borderColorClass="border-purple-200"
            />
            <NavButton 
              mode={ViewMode.READING} 
              icon="📖" 
              label="Story" 
              colorClass="bg-amber-400"
              borderColorClass="border-amber-200"
            />
             <NavButton 
              mode={ViewMode.POST_READING} 
              icon="✍️" 
              label="Quiz" 
              colorClass="bg-teal-400"
              borderColorClass="border-teal-200"
            />
            <NavButton 
              mode={ViewMode.PHONICS} 
              icon="🎵" 
              label="Sounds" 
              colorClass="bg-indigo-400" 
              borderColorClass="border-indigo-200"
            />
            <NavButton 
              mode={ViewMode.VALUES} 
              icon="❤️" 
              label="Values" 
              colorClass="bg-pink-400" 
              borderColorClass="border-pink-200"
            />
          </div>
        </div>
      </div>
      
      {/* Footer padding to prevent content being hidden behind nav */}
      <div className="h-32"></div>
    </div>
  );
};

export default App;
