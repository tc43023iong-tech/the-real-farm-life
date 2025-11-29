
import React from 'react';
import { VocabularyWord } from '../types';
import { speakText } from '../services/geminiService';

interface VocabularyListProps {
  words: VocabularyWord[];
}

export const VocabularyList: React.FC<VocabularyListProps> = ({ words }) => {
  return (
    <div className="max-w-4xl mx-auto pb-20">
       <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-green-800 mb-2">New Words (生字表)</h2>
        <p className="text-lg text-green-600">Learn the hard words!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {words.map((item) => (
          <div key={item.word} className="bg-white rounded-xl shadow-md p-6 border-b-4 border-green-400 hover:shadow-lg transition-shadow group">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                 <h3 className="text-2xl font-bold text-gray-800">{item.word}</h3>
                 {item.emoji && <span className="text-3xl group-hover:scale-125 transition-transform block">{item.emoji}</span>}
              </div>
              <button 
                onClick={() => speakText(item.word)}
                className="text-2xl p-2 rounded-full hover:bg-green-100 text-green-600 transition-colors"
                title="Listen"
              >
                🔊
              </button>
            </div>
            
            <p className="text-sm font-mono text-gray-500 mb-2">{item.phonetic}</p>
            
            <div className="bg-green-50 rounded-lg p-3 mb-3">
              <p className="text-xl font-bold text-green-800 font-['Noto_Sans_TC']">{item.chinese}</p>
            </div>
            
            <p className="text-gray-600 italic text-sm border-l-2 border-gray-300 pl-3">
              "{item.example}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
