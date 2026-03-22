import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Mic, MessageSquare, ShieldAlert, Cpu, Award, Zap, Settings2 } from 'lucide-react';

export default function Interview() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <>
            <div className="min-h-screen font-sans bg-[#fbfbfa]  relative overflow-hidden flex flex-col pt-4 pb-12 px-6">
        
        {/* Background abstract design */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50">
           <div className="absolute top-[5%] right-[20%] w-[30%] h-[50%] bg-[#d2fbf0] rounded-full blur-[140px]" />
           <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[30%] bg-[#fae8fb] rounded-full blur-[150px]" />
        </div>

        <main className="flex-1 w-full max-w-6xl mx-auto relative z-10 space-y-8">
          
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-end mb-8">
             <div>
               <div className="flex items-center gap-3 mb-3">
                 <h1 className="text-4xl font-black text-[#0b261d] tracking-tight">AI Mock Interview</h1>
                 <span className="px-3 py-1 bg-red-100 text-red-600 rounded-xl text-xs font-black tracking-widest uppercase flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Live Now
                 </span>
               </div>
               <p className="text-[#3b4b45]/70 font-medium text-lg max-w-2xl">
                 Practice real-time technical interviews with our AI interviewer. Get instant feedback on communication and technical accuracy.
               </p>
             </div>
             <button className="hidden md:flex items-center gap-2 bg-white px-5 py-3 rounded-2xl font-bold text-[#08241b] shadow-sm border border-gray-100 hover:border-[#11b589] transition-all">
                <Settings2 className="w-5 h-5 text-gray-400" /> Settings
             </button>
          </motion.div>

          {/* Video Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Video (AI) */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.1 }}
               className="lg:col-span-2 bg-[#08241b] rounded-[2rem] overflow-hidden shadow-2xl relative aspect-video flex flex-col items-center justify-center border border-gray-800"
            >
               <div className="absolute top-6 left-6 px-4 py-2 bg-black/40 backdrop-blur-md text-white rounded-xl text-sm font-black tracking-widest flex items-center gap-2">
                 <Cpu className="w-4 h-4 text-[#11b589]" /> AI Interviewer
               </div>

               {/* Center Glow / AI Visualization */}
               <div className="w-40 h-40 rounded-full border border-white/10 relative flex items-center justify-center">
                  <div className={`absolute inset-0 bg-[#11b589]/20 rounded-full blur-2xl ${isRecording ? 'animate-pulse' : ''}`} />
                  <Mic className={`w-12 h-12 text-white/50 ${isRecording ? 'text-[#11b589]' : ''}`} />
                  {/* Ripples */}
                  {isRecording && <div className="absolute inset-x-[-50%] inset-y-[-50%] border border-[#11b589]/30 rounded-full animate-ping opacity-20" />}
               </div>

               {/* Subtitles Overlay */}
               <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-4/5">
                 <div className="bg-black/60 backdrop-blur-md p-4 rounded-2xl text-center border border-white/10 shadow-xl">
                   <p className="text-white font-medium text-lg tracking-wide">
                     "Can you explain the difference between client-side rendering and server-side rendering in modern frameworks?"
                   </p>
                 </div>
               </div>
            </motion.div>


            {/* Self View & Controls */}
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
               className="flex flex-col gap-6"
            >
               {/* Self Camera Box */}
               <div className="bg-gradient-to-br from-gray-900 to-black rounded-[2rem] aspect-video relative overflow-hidden shadow-xl border border-gray-800 flex items-center justify-center group">
                 <Video className="w-10 h-10 text-gray-700" />
                 <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md text-white/80 rounded-lg text-xs font-bold tracking-widest">
                   You
                 </div>
               </div>

               {/* Action Panel */}
               <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] flex-1 flex flex-col justify-between">
                 
                 <div>
                    <h3 className="text-xl font-bold text-[#08241b] mb-4 flex items-center gap-2">
                       <MessageSquare className="w-5 h-5 text-[#11b589]" /> Analytics
                    </h3>
                    <div className="space-y-4">
                       <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                          <span className="text-[#3b4b45] font-bold text-sm">Clarity</span>
                          <span className="bg-[#11b589]/10 text-[#11b589] px-3 py-1 rounded-lg text-xs font-black">Good</span>
                       </div>
                       <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                          <span className="text-[#3b4b45] font-bold text-sm">Keywords Hit</span>
                          <span className="text-[#08241b] font-black text-sm">3 / 5</span>
                       </div>
                    </div>
                 </div>

                 {/* Microphone Button */}
                 <button 
                   onClick={() => setIsRecording(!isRecording)}
                   className={`w-full py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl ${isRecording ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/30' : 'bg-[#11b589] hover:bg-[#0e9671] text-white shadow-[#11b589]/30'}`}
                 >
                   <Mic className={`w-6 h-6 ${isRecording ? 'animate-pulse' : ''}`} /> 
                   {isRecording ? 'Stop Recording' : 'Hold to Speak'}
                 </button>

               </div>
            </motion.div>
          </div>

        </main>
      </div>
    </>
  );
}
