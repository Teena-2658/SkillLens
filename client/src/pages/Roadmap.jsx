import React from 'react';
import { motion } from 'framer-motion';
import { Route, BookOpen, Clock, Activity, Flag, Plus, ArrowDown } from 'lucide-react';

export default function Roadmap() {
  const roadmapSteps = [
    { title: "HTML/CSS Fundamentals", status: "completed", duration: "1 Week" },
    { title: "JavaScript ES6+", status: "active", duration: "2 Weeks", highlight: true },
    { title: "React Basics & Hooks", status: "locked", duration: "3 Weeks" },
    { title: "State Management (Redux)", status: "locked", duration: "1 Week" },
    { title: "Performance & Testing", status: "locked", duration: "2 Weeks" },
  ];

  return (
    <>
            <div className="min-h-screen font-sans bg-[#fbfbfa]  relative overflow-hidden flex flex-col pt-4 pb-12 px-6">
        
        {/* Background abstract design */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-50">
           <div className="absolute top-[20%] left-[20%] w-[30%] h-[50%] bg-[#d2fbf0] rounded-full blur-[140px]" />
        </div>

        <main className="flex-1 w-full max-w-4xl mx-auto relative z-10 space-y-8">
          
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-end mb-8 border-b border-gray-200 pb-8">
             <div>
               <div className="flex items-center gap-3 mb-3">
                 <h1 className="text-4xl font-black text-[#0b261d] tracking-tight">Learning Roadmap</h1>
                 <span className="px-3 py-1 bg-[#11b589]/10 text-[#11b589] rounded-xl text-xs font-black tracking-widest uppercase">Frontend Track</span>
               </div>
               <p className="text-[#3b4b45]/70 font-medium text-lg max-w-xl">
                 Your personalized path generated from your Resume ATS score and recent skill quizzes.
               </p>
             </div>
             <button className="hidden md:flex items-center gap-2 bg-[#08241b] text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-[#08241b]/20 hover:bg-[#11b589] transition-all">
                <Plus className="w-5 h-5" /> Add Custom Goal
             </button>
          </motion.div>

          {/* Timeline */}
          <div className="relative pl-4 md:pl-0 space-y-8">
             {/* Timeline Line */}
             <div className="absolute top-0 bottom-0 left-[31px] md:left-[50px] w-1 bg-gray-100 rounded-full" />

             {roadmapSteps.map((step, idx) => (
                <motion.div 
                   key={idx}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: idx * 0.1 }}
                   className="relative flex items-center md:items-start gap-6 md:gap-10"
                >
                   {/* Icon Node */}
                   <div className={`relative z-10 w-12 h-12 rounded-full border-4 border-[#fbfbfa] shadow-sm flex items-center justify-center shrink-0 ${step.status === 'completed' ? 'bg-[#11b589] text-white' : step.status === 'active' ? 'bg-orange-500 text-white animate-pulse' : 'bg-gray-200 text-gray-400'}`}>
                      {step.status === 'completed' ? <Flag className="w-5 h-5" /> : step.status === 'active' ? <Activity className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                   </div>

                   {/* Card Content */}
                   <div className={`flex-1 bg-white p-6 rounded-3xl shadow-sm border transition-all hover:shadow-md ${step.highlight ? 'border-orange-500 shadow-orange-500/10 scale-[1.02]' : 'border-gray-100'}`}>
                      <div className="flex justify-between items-start mb-2">
                         <h3 className={`text-xl font-black ${step.status === 'locked' ? 'text-gray-400' : 'text-[#0b261d]'}`}>{step.title}</h3>
                         <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest ${step.status === 'completed' ? 'bg-[#d2fbf0] text-[#11b589]' : step.status === 'active' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'}`}>
                            {step.status}
                         </span>
                      </div>
                      
                      <div className="flex items-center gap-6 mt-4">
                         <span className="flex items-center gap-2 text-sm font-bold text-gray-400">
                           <Clock className="w-4 h-4" /> Est. {step.duration}
                         </span>
                         {step.status === 'active' && (
                           <button className="flex items-center gap-2 text-orange-500 font-black text-sm hover:underline">
                              Start Learning <ArrowDown className="w-4 h-4 -rotate-90" />
                           </button>
                         )}
                      </div>
                   </div>
                </motion.div>
             ))}
          </div>

        </main>
      </div>
    </>
  );
}
