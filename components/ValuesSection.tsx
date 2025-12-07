
import React from 'react';

export const ValuesSection: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto pb-40 space-y-12 px-4">
      
      {/* Hero Title - Friendly & Bubby */}
      <div className="text-center relative py-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-40 bg-amber-100 rounded-full blur-3xl opacity-60 -z-10"></div>
        <div className="inline-block bg-white px-10 py-5 rounded-[3rem] border-4 border-amber-200 shadow-xl transform rotate-1">
            <h2 className="text-4xl md:text-5xl font-black text-amber-500 tracking-tight flex items-center gap-3">
                <span>💡</span> Be Tech Smart!
            </h2>
            <p className="text-xl text-amber-400 font-bold font-['Noto_Sans_TC'] mt-1">做個聰明的小孩</p>
        </div>
      </div>

      {/* The Balance Scale: Two Worlds */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Screen World Card */}
          <div className="bg-white rounded-[2.5rem] p-8 border-4 border-blue-100 shadow-lg text-center flex flex-col items-center hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-50 rounded-full opacity-50"></div>
              
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-6xl mb-4 group-hover:scale-110 transition-transform">
                  📱
              </div>
              <h3 className="text-3xl font-black text-gray-700 mb-1">Screen World</h3>
              <p className="text-lg font-bold text-gray-400 font-['Noto_Sans_TC'] mb-6">(虛擬世界)</p>
              
              <div className="bg-red-50 rounded-2xl p-4 w-full border border-red-100">
                  <div className="text-4xl mb-2">😵‍💫</div>
                  <p className="font-bold text-red-400">Tired Eyes</p>
                  <p className="text-sm text-red-300 font-['Noto_Sans_TC']">眼睛好累</p>
              </div>
          </div>

          {/* Real World Card */}
          <div className="bg-white rounded-[2.5rem] p-8 border-4 border-green-100 shadow-lg text-center flex flex-col items-center hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-50 rounded-full opacity-50"></div>
              
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-6xl mb-4 group-hover:scale-110 transition-transform">
                  🌳
              </div>
              <h3 className="text-3xl font-black text-green-600 mb-1">Real World</h3>
              <p className="text-lg font-bold text-green-400 font-['Noto_Sans_TC'] mb-6">(真實世界)</p>
              
              <div className="bg-green-50 rounded-2xl p-4 w-full border border-green-100">
                  <div className="text-4xl mb-2">🥰</div>
                  <p className="font-bold text-green-500">Happy & Healthy</p>
                  <p className="text-sm text-green-300 font-['Noto_Sans_TC']">健康快樂</p>
              </div>
          </div>
      </div>

      {/* Smart Kid Checklist */}
      <div className="bg-sky-50 rounded-[3rem] p-8 md:p-10 border-[6px] border-sky-200 shadow-xl relative">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-sky-400 text-white px-6 py-2 rounded-full font-black shadow-md text-lg">
              MY PROMISE 🤙
          </div>
          
          <h3 className="text-3xl font-black text-sky-800 text-center mb-8 mt-4">
              I am a Smart Kid! 🦸
          </h3>

          <div className="space-y-4">
              {[
                  { icon: "👀", text: "I look at real people when talking.", sub: "看著別人的眼睛說話", color: "bg-white" },
                  { icon: "🏃", text: "I play outside with friends.", sub: "和朋友去外面玩", color: "bg-white" },
                  { icon: "📵", text: "I put my phone away.", sub: "把手機收起來", color: "bg-white" }
              ].map((item, idx) => (
                  <div key={idx} className={`flex items-center gap-4 ${item.color} p-4 rounded-2xl border-2 border-sky-100 shadow-sm transition-transform hover:scale-[1.02]`}>
                      <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center text-2xl shrink-0">
                          {item.icon}
                      </div>
                      <div className="flex-1">
                          <p className="text-xl font-bold text-gray-700 leading-tight">{item.text}</p>
                          <p className="text-gray-400 font-['Noto_Sans_TC'] font-bold text-sm">{item.sub}</p>
                      </div>
                      <div className="text-3xl text-sky-300">
                          ✔
                      </div>
                  </div>
              ))}
          </div>
      </div>

    </div>
  );
};
