
import React from 'react';

export const ValuesSection: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto pb-40 space-y-12">
      
      {/* Hero Title */}
      <div className="text-center bg-yellow-100 rounded-[3rem] p-8 border-8 border-yellow-300 transform rotate-1 shadow-xl">
        <h2 className="text-6xl font-black text-yellow-600 tracking-tight drop-shadow-sm mb-2">Be Smart with Tech! 💡</h2>
        <p className="text-3xl text-yellow-700 font-bold font-['Noto_Sans_TC']">善用資訊科技</p>
      </div>

      {/* The Great Debate */}
      <div className="relative">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
             <div className="bg-red-500 text-white px-6 py-2 rounded-full text-2xl font-black shadow-lg border-4 border-white animate-pulse">VS</div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {/* Virtual World */}
             <div className="bg-gray-100 rounded-[2.5rem] p-8 border-4 border-gray-300 text-center group hover:bg-gray-200 transition-colors">
                 <div className="text-8xl mb-4 group-hover:scale-110 transition-transform">📱</div>
                 <h3 className="text-4xl font-black text-gray-700 mb-2">Screen World</h3>
                 <p className="text-2xl font-bold text-gray-500 font-['Noto_Sans_TC'] mb-4">(虛擬世界)</p>
                 <div className="bg-white rounded-2xl p-4 text-xl font-bold text-gray-600 shadow-sm border-2 border-gray-200">
                    <span className="text-red-500">☹️ Hurts eyes</span><br/>
                    <span className="text-gray-400 text-lg font-['Noto_Sans_TC']">(傷眼睛)</span>
                 </div>
             </div>

             {/* Real World */}
             <div className="bg-green-100 rounded-[2.5rem] p-8 border-4 border-green-300 text-center group hover:bg-green-200 transition-colors">
                 <div className="text-8xl mb-4 group-hover:scale-110 transition-transform">🌿</div>
                 <h3 className="text-4xl font-black text-green-700 mb-2">Real World</h3>
                 <p className="text-2xl font-bold text-green-600 font-['Noto_Sans_TC'] mb-4">(真實世界)</p>
                 <div className="bg-white rounded-2xl p-4 text-xl font-bold text-green-700 shadow-sm border-2 border-green-200">
                    <span className="text-green-600">😃 Fresh Air & Fun</span><br/>
                    <span className="text-green-400 text-lg font-['Noto_Sans_TC']">(新鮮空氣)</span>
                 </div>
             </div>
         </div>
      </div>

      {/* Mission Card */}
      <div className="bg-sky-50 rounded-[3rem] p-8 md:p-12 border-4 border-sky-200 shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -top-10 bg-sky-200 w-40 h-40 rounded-full opacity-50 blur-2xl"></div>
          
          <h3 className="text-4xl font-black text-sky-800 text-center mb-8 relative z-10">
              Which one is better? 🤔
          </h3>

          <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border-2 border-sky-100 shadow-sm">
                  <span className="text-4xl">✅</span>
                  <div>
                      <p className="text-2xl font-bold text-gray-800">Talk to real people.</p>
                      <p className="text-gray-400 font-['Noto_Sans_TC'] font-bold">與真人交談</p>
                  </div>
              </div>
              <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border-2 border-sky-100 shadow-sm">
                  <span className="text-4xl">✅</span>
                  <div>
                      <p className="text-2xl font-bold text-gray-800">Play outside.</p>
                      <p className="text-gray-400 font-['Noto_Sans_TC'] font-bold">去戶外玩</p>
                  </div>
              </div>
              <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border-2 border-sky-100 shadow-sm">
                  <span className="text-4xl">❌</span>
                  <div>
                      <p className="text-2xl font-bold text-gray-500">Play phone all day.</p>
                      <p className="text-gray-400 font-['Noto_Sans_TC'] font-bold">整天玩手機</p>
                  </div>
              </div>
          </div>
      </div>

    </div>
  );
};
