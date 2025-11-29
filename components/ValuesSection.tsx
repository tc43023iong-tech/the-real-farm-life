
import React from 'react';

export const ValuesSection: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto pb-32 space-y-8">
      {/* Main Container without fixed aspect ratio/height */}
      <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden border-8 border-emerald-100">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-teal-400 to-emerald-500 p-8 text-white relative">
          <div className="absolute -top-6 -right-6 text-9xl opacity-20">🤔</div>
          <h2 className="text-5xl font-black mb-2 tracking-tight drop-shadow-md">Use IT Wisely</h2>
          <p className="text-3xl opacity-90 font-['Noto_Sans_TC'] font-bold">善用資訊科技</p>
        </div>
        
        <div className="p-8 space-y-10">
          
          {/* Question */}
          <div className="text-center space-y-2">
            <div>
                <h3 className="text-4xl font-black text-gray-800 inline-block mr-4">Think About It 🧠</h3>
                <span className="text-2xl text-gray-400 font-['Noto_Sans_TC'] font-bold">(想一想)</span>
            </div>
            <p className="text-3xl text-gray-600 leading-snug font-bold">
              Which is more fun?
            </p>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            {/* Game */}
            <div className="p-8 bg-gray-50 rounded-3xl border-4 border-gray-200 transform rotate-1 text-center hover:scale-105 transition-transform">
              <span className="text-7xl mb-4 block">🎮</span>
              <p className="font-black text-gray-800 text-3xl leading-tight">Playing a game</p>
              <p className="text-gray-500 text-2xl font-['Noto_Sans_TC'] font-bold mt-2">(玩遊戲)</p>
            </div>
            
            {/* VS Badge - Absolute for desktop, between for mobile */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-yellow-400 rounded-full items-center justify-center text-white font-black text-2xl border-4 border-white shadow-xl z-10">
                VS
            </div>

            {/* Real Farm */}
            <div className="p-8 bg-emerald-50 rounded-3xl border-4 border-emerald-200 transform -rotate-1 text-center hover:scale-105 transition-transform">
              <span className="text-7xl mb-4 block">🚜</span>
              <p className="font-black text-emerald-900 text-3xl leading-tight">Visiting a farm</p>
              <p className="text-emerald-600 text-2xl font-['Noto_Sans_TC'] font-bold mt-2">(去農場)</p>
            </div>
          </div>

          {/* Pros/Cons List */}
          <div className="bg-sky-50 p-8 rounded-3xl border-4 border-sky-100 space-y-6">
             <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                 <span className="text-6xl">📱</span>
                 <div className="flex-1">
                     <p className="font-bold text-gray-700 text-2xl leading-relaxed">Games are fun, but <span className="text-red-500 bg-red-100 px-2 py-1 rounded-lg box-decoration-clone">staring at a screen</span> hurts your eyes.</p>
                     <p className="text-gray-400 font-['Noto_Sans_TC'] font-bold text-xl mt-1">盯著屏幕 / 傷眼睛</p>
                 </div>
             </div>
             
             <div className="w-full h-px bg-sky-200 border-t-2 border-dashed border-sky-300"></div>
             
             <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                 <span className="text-6xl">🌿</span>
                 <div className="flex-1">
                     <p className="font-bold text-emerald-700 text-2xl leading-relaxed">Real life has <span className="text-emerald-600 bg-emerald-100 px-2 py-1 rounded-lg box-decoration-clone">fresh air</span> and <span className="text-emerald-600 bg-emerald-100 px-2 py-1 rounded-lg box-decoration-clone">real feelings</span>!</p>
                     <p className="text-gray-400 font-['Noto_Sans_TC'] font-bold text-xl mt-1">新鮮空氣 / 真實的感覺</p>
                 </div>
             </div>
          </div>

          {/* Pledge */}
          <div className="bg-yellow-50 p-8 rounded-3xl border-4 border-yellow-200 relative text-center mt-4">
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-yellow-400 text-white px-8 py-2 rounded-full font-black text-lg shadow-lg tracking-wider border-4 border-white">MY PLEDGE</div>
             <p className="font-handwriting text-4xl text-yellow-900 leading-snug mt-6">
               "I will <span className="text-orange-500 underline decoration-4 decoration-orange-300">put down my phone</span> and <span className="text-green-500 underline decoration-4 decoration-green-300">play outside</span>!"
             </p>
             <p className="text-yellow-600/70 font-['Noto_Sans_TC'] font-bold mt-4 text-2xl">(放下手機 / 出去玩)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
