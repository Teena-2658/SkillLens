import React from 'react';
import { motion } from 'framer-motion';
import { Play, CheckCircle2, Trophy, Clock, Target, ArrowRight } from 'lucide-react';

export default function Quiz() {
  const quizzes = [
    { title: "React Fundamentals", category: "Frontend", time: "15 min", questions: 20, difficulty: "Medium", completed: false },
    { title: "Node.js Advanced", category: "Backend", time: "25 min", questions: 30, difficulty: "Hard", completed: true, score: "92%" },
    { title: "JavaScript ES6+", category: "Fullstack", time: "10 min", questions: 15, difficulty: "Easy", completed: false },
    { title: "System Design Basics", category: "Architecture", time: "30 min", questions: 25, difficulty: "Hard", completed: false }
  ];

  return (
    <>
            <div className="min-h-screen font-sans bg-[#f8faf9]  relative overflow-hidden flex flex-col pt-4 pb-12 px-6">
        
        {/* Background blobs */}
        <div className="absolute top-[-10%] right-[10%] w-[30%] h-[40%] bg-[#d2fbf0] rounded-full blur-[140px] pointer-events-none opacity-50" />
        
        <main className="flex-1 w-full max-w-6xl mx-auto relative z-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-black text-[#0b261d] tracking-tight">Skill Quizzes</h1>
                <span className="px-3 py-1 bg-[#11b589] text-white rounded-xl text-xs font-bold shadow-lg shadow-[#11b589]/30">4 Available</span>
              </div>
              <p className="text-[#3b4b45]/70 font-medium text-lg max-w-xl">
                Test your knowledge to pinpoint exact areas of improvement. These quizzes directly sync with your personalized roadmap.
              </p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Global Rank</p>
                <p className="text-xl font-black text-[#08241b]">Top 15%</p>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
             {quizzes.map((quiz, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={index}
                  className="bg-white backdrop-blur-xl border border-gray-100 hover:border-[#11b589]/30 rounded-[2rem] p-8 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_40px_-10px_rgba(17,181,137,0.15)] transition-all group flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <span className="px-3 py-1.5 bg-[#f0f4f3] text-[#08241b] rounded-lg text-xs font-bold tracking-widest uppercase">{quiz.category}</span>
                      {quiz.completed ? (
                         <span className="bg-[#d2fbf0] text-[#11b589] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1">
                           <CheckCircle2 className="w-3 h-3" /> {quiz.score}
                         </span>
                      ) : (
                         <span className="bg-orange-50 text-orange-500 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1">
                           <Target className="w-3 h-3" /> {quiz.difficulty}
                         </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-black text-[#0b261d] mb-3 leading-tight group-hover:text-[#11b589] transition-colors">{quiz.title}</h3>
                    <div className="flex items-center gap-4 text-sm font-medium text-gray-500 mb-8">
                       <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {quiz.time}</span>
                       <span className="flex items-center gap-1.5"><Target className="w-4 h-4" /> {quiz.questions} Qs</span>
                    </div>
                  </div>
                  
                  {quiz.completed ? (
                    <button className="w-full py-4 rounded-xl font-bold bg-gray-50 text-gray-400 border border-gray-100 cursor-not-allowed flex items-center justify-center gap-2">
                      Completed 
                    </button>
                  ) : (
                    <button className="w-full py-4 rounded-xl font-bold bg-white border-2 border-[#11b589] text-[#11b589] hover:bg-[#11b589] hover:text-white transition-colors flex items-center justify-center gap-2">
                       Start Quiz <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </motion.div>
             ))}
          </div>
        </main>
      </div>
    </>
  );
}
