import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, TrendingUp, CheckCircle, Flame, Star, Award, ShieldAlert } from 'lucide-react';

export default function Summary() {
  const cards = [
    { title: 'Learning Streak', value: '14 Days', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
    { title: 'Quizzes Passed', value: '28', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { title: 'Global Rank', value: 'Top 5%', icon: TrophyIcon, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { title: 'Skill Matches', value: '6 Roles', icon: Target, color: 'text-blue-500', bg: 'bg-blue-50' }
  ];

  return (
    <>
            <div className="min-h-screen font-sans bg-[#f8faf9]  relative overflow-hidden flex flex-col pt-4 pb-12 px-6">
        
        {/* Abstract Background Matching Theme */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-40">
           <div className="absolute top-[20%] left-[10%] w-[40%] h-[30%] bg-[#d2fbf0] rounded-full blur-[150px]" />
           <div className="absolute bottom-[0%] right-[30%] w-[30%] h-[40%] bg-[#fae8fb] rounded-full blur-[140px]" />
        </div>

        <main className="flex-1 w-full max-w-6xl mx-auto relative z-10 space-y-8">
          
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-end mb-8">
             <div>
               <h1 className="text-4xl font-black text-[#0b261d] tracking-tight mb-3 flex items-center gap-3">
                 <Zap className="w-8 h-8 text-[#11b589]" /> My Analytics
               </h1>
               <p className="text-[#3b4b45]/70 font-medium text-lg max-w-xl">
                 Overview of your overall progress, learning patterns, and algorithmic recommendations.
               </p>
             </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
             {cards.map((stat, i) => (
                <motion.div 
                   key={i}
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: i * 0.1 }}
                   className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-6 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all"
                >
                   <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6`}>
                      <stat.icon className="w-6 h-6" />
                   </div>
                   <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-1">{stat.title}</p>
                   <h3 className="text-3xl font-black text-[#0b261d]">{stat.value}</h3>
                </motion.div>
             ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
             {/* Progress Chart Placeholder */}
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2 bg-gradient-to-br from-[#08241b] to-black rounded-[2rem] p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[400px]"
             >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] pointer-events-none" />
                <div>
                   <h3 className="text-white/80 font-bold uppercase tracking-widest text-sm mb-2 flex items-center gap-2">
                     <TrendingUp className="w-5 h-5 text-[#11b589]" /> Skill Growth Trajectory
                   </h3>
                   <div className="flex items-end gap-3 mt-4">
                     <span className="text-5xl font-black text-white">+42%</span>
                     <span className="text-white/60 font-medium mb-1">this month</span>
                   </div>
                </div>

                <div className="w-full h-40 mt-8 border-b-2 border-l-2 border-white/20 relative flex items-end gap-4 p-4">
                  {/* Decorative chart bars */}
                  {[40, 60, 50, 80, 70, 95].map((h, index) => (
                     <div key={index} className="flex-1 bg-gradient-to-t from-[#11b589]/50 to-[#11b589] rounded-t-lg group relative" style={{ height: `${h}%` }}>
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white text-black px-3 py-1 rounded-lg font-bold text-xs shadow-xl transition-opacity">
                           {h}%
                        </div>
                     </div>
                  ))}
                </div>
             </motion.div>

             {/* Recent Badges */}
             <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/90 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]"
             >
                <h3 className="text-[#08241b] font-black text-2xl mb-6">Recent Badges</h3>
                <div className="space-y-6">
                   {[
                     { title: "React Master", sub: "Score > 90%", icon: "⚛️" },
                     { title: "Node.js Guru", sub: "Completed Track", icon: "🚀" },
                     { title: "Resume Fixed", sub: "ATS Optimized", icon: "✨" }
                   ].map((badge, k) => (
                     <div key={k} className="flex items-center gap-5 p-4 rounded-2xl hover:bg-[#f0f4f3] border border-transparent hover:border-gray-200 transition-colors cursor-pointer">
                        <div className="w-14 h-14 bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm border border-gray-200 rounded-full flex items-center justify-center text-2xl">
                           {badge.icon}
                        </div>
                        <div>
                           <h4 className="text-[#0b261d] font-black">{badge.title}</h4>
                           <p className="text-[#11b589] font-bold text-xs uppercase tracking-widest">{badge.sub}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </motion.div>
          </div>

        </main>
      </div>
    </>
  );
}

// Inline fallback icon to prevent import errors if not found
function TrophyIcon(props) {
  return <Award {...props} />;
}
