import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle, XCircle, Clock, ChevronRight, BarChart, ArrowRight } from 'lucide-react';

export default function Results() {
  const resultData = {
    score: 85,
    total: 100,
    time: "14:32",
    percentile: "Top 12%",
    questions: [
      { q: "What is the Virtual DOM?", correct: true },
      { q: "Explain useState vs useReducer", correct: true },
      { q: "How does React.memo work?", correct: false },
      { q: "Describe Context API performance issues", correct: true },
      { q: "What is hydration in Next.js?", correct: false }
    ]
  };

  return (
    <>
            <div className="min-h-screen font-sans bg-[#f8faf9]  relative overflow-hidden flex flex-col pt-4 pb-12 px-6">
        
        <div className="absolute top-[10%] left-[10%] w-[30%] h-[40%] bg-[#d2fbf0] rounded-full blur-[140px] pointer-events-none opacity-50" />
        <div className="absolute bottom-[0%] right-[10%] w-[40%] h-[30%] bg-[#fae8fb] rounded-full blur-[150px] pointer-events-none opacity-60" />

        <main className="flex-1 w-full max-w-5xl mx-auto relative z-10 space-y-8">
          
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-12">
             <div className="w-20 h-20 bg-emerald-50 text-[#11b589] rounded-3xl mx-auto flex items-center justify-center transform -rotate-6 hover:rotate-0 transition-transform mb-6 shadow-xl border border-emerald-100">
               <Trophy className="w-10 h-10" />
             </div>
             <h1 className="text-5xl font-black text-[#0b261d] tracking-tight mb-4">Quiz Completed!</h1>
             <p className="text-[#3b4b45]/70 font-medium text-lg">
               You successfully completed the "React Advanced Patterns" test. Here's a detailed breakdown of your performance.
             </p>
          </motion.div>

          {/* Top Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-2">Final Score</p>
                <p className="text-4xl font-black text-[#11b589]">{resultData.score}%</p>
             </motion.div>
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-2">Rank</p>
                <p className="text-3xl font-black text-[#08241b] mt-1">{resultData.percentile}</p>
             </motion.div>
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-2 flex justify-center items-center gap-1"><Clock className="w-3 h-3" /> Time</p>
                <p className="text-3xl font-black text-[#08241b] mt-1">{resultData.time}</p>
             </motion.div>
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center flex flex-col justify-center">
                <button className="bg-[#08241b] hover:bg-[#11b589] text-white py-3 px-4 rounded-xl font-black text-sm transition-all shadow-xl flex items-center justify-center gap-2 group">
                   Update Roadmap <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
             </motion.div>
          </div>

          {/* Detailed Question Answers */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]">
             <h3 className="text-[#08241b] font-black text-2xl mb-6">Detailed Analysis</h3>
             <div className="space-y-4">
                {resultData.questions.map((item, idx) => (
                   <div key={idx} className="flex justify-between items-center p-4 rounded-2xl hover:bg-[#f0f4f3] border border-gray-100 hover:border-gray-200 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-4">
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${item.correct ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                            {idx + 1}
                         </div>
                         <h4 className="text-[#0b261d] font-bold">{item.q}</h4>
                      </div>
                      <div className="flex items-center gap-4">
                         {item.correct ? (
                            <span className="flex items-center gap-1.5 text-emerald-500 font-black text-xs uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-lg">
                               <CheckCircle className="w-4 h-4" /> Correct
                            </span>
                         ) : (
                            <span className="flex items-center gap-1.5 text-red-500 font-black text-xs uppercase tracking-widest bg-red-50 px-3 py-1 rounded-lg">
                               <XCircle className="w-4 h-4" /> Incorrect
                            </span>
                         )}
                         <ChevronRight className="w-5 h-5 text-gray-300 group-hover:translate-x-1 transition-transform" />
                      </div>
                   </div>
                ))}
             </div>
          </motion.div>

        </main>
      </div>
    </>
  );
}
