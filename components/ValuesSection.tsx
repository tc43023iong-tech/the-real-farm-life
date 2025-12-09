
import React from 'react';

export const ValuesSection: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto pb-40 px-4 flex flex-col items-center justify-center min-h-[60vh]">
      
      {/* Hero Title */}
      <div className="text-center relative py-6 mb-12">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-amber-100 rounded-full blur-3xl opacity-60 -z-10"></div>
        <div className="inline-block bg-white px-12 py-6 rounded-[3rem] border-[5px] border-amber-200 shadow-[0_8px_0_0_rgba(253,230,138,1)] transform -rotate-2">
            <h2 className="text-4xl md:text-5xl font-black text-amber-500 tracking-tight flex items-center gap-3">
                <span>💡</span> Be Smart!
            </h2>
        </div>
      </div>

      {/* Two Simple Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          
          {/* Rule 1: Less Phone */}
          <div className="bg-white rounded-[3rem] p-12 border-[6px] border-red-200 shadow-[0_10px_0_0_rgba(254,202,202,0.5)] text-center flex flex-col items-center justify-center gap-8 group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-48 h-48 bg-red-50 rounded-full flex items-center justify-center text-[7rem] shadow-inner group-hover:scale-110 transition-transform duration-300">
                  📵
              </div>
              <div>
                  <h3 className="text-4xl md:text-5xl font-black text-red-500 mb-3 font-['Comic_Neue'] leading-tight">Use phone less.</h3>
                  <p className="text-3xl text-gray-400 font-bold font-['Noto_Sans_TC']">少玩手機</p>
              </div>
          </div>

          {/* Rule 2: More Nature */}
          <div className="bg-white rounded-[3rem] p-12 border-[6px] border-green-200 shadow-[0_10px_0_0_rgba(187,247,208,0.5)] text-center flex flex-col items-center justify-center gap-8 group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-48 h-48 bg-green-50 rounded-full flex items-center justify-center text-[7rem] shadow-inner group-hover:scale-110 transition-transform duration-300">
                  🌳
              </div>
              <div>
                  <h3 className="text-4xl md:text-5xl font-black text-green-500 mb-3 font-['Comic_Neue'] leading-tight">Play outside more.</h3>
                  <p className="text-3xl text-gray-400 font-bold font-['Noto_Sans_TC']">多靠近自然</p>
              </div>
          </div>

      </div>

    </div>
  );
};
