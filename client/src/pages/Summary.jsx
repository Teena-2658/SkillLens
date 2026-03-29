import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, TrendingUp, CheckCircle, Flame, Star, Award, ShieldAlert, MessageSquare, Cpu, Loader2 } from 'lucide-react';

export default function Summary() {
  const [stats, setStats] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5800/api/quiz/stats", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setStats(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
     return (
       <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#11b589]" />
       </div>
     );
  }

  const cards = [
    { title: 'Learning Streak', value: `${stats?.learningStreak || 0} Days`, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
    { title: 'Quizzes Passed', value: stats?.totalAttempts || 0, icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { title: 'Global Score', value: `${stats?.avgScore || 0}%`, icon: TrophyIcon, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { title: 'Skill Footprint', value: `${stats?.uniqueSkills || 0} Skills`, icon: Target, color: 'text-blue-500', bg: 'bg-blue-50' }
  ];

  return (
    <>
            <div className="min-h-screen bg-[#f8faf9]  relative overflow-hidden flex flex-col pt-4 pb-12 px-6">
        
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
              {/* Interview Performance Section */}
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.4 }}
                 className="lg:col-span-2 bg-white/90 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col min-h-[500px]"
              >
                  <div className="flex items-center justify-between mb-8">
                     <h3 className="text-[#08241b] font-black text-2xl flex items-center gap-3">
                       <MessageSquare className="w-6 h-6 text-[#11b589]" /> Interview Evaluation
                     </h3>
                     <span className="px-3 py-1 bg-[#d2fbf0] text-[#11b589] rounded-lg text-[10px] font-black uppercase tracking-widest">AI Audit v1.0</span>
                  </div>

                  <div className="space-y-6 overflow-y-auto max-h-[500px] pr-4 custom-scrollbar">
                     {JSON.parse(localStorage.getItem('interview_feedback') || '[]').length > 0 ? (
                       JSON.parse(localStorage.getItem('interview_feedback') || '[]').map((item, idx) => (
                          <div key={idx} className="p-6 rounded-3xl bg-[#fbfbfa] border border-gray-100 hover:border-[#11b589]/20 transition-all">
                             <div className="flex justify-between items-start mb-4">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Question {idx + 1}</p>
                                <div className="flex gap-1">
                                   {[...Array(5)].map((_, i) => (
                                      <Star key={i} className={`w-3 h-3 ${i < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                                   ))}
                                </div>
                             </div>
                             <h4 className="text-[#0b261d] font-bold text-lg mb-3">"{item.question}"</h4>
                             <div className="bg-white p-4 rounded-2xl border border-gray-50 mb-4 shadow-sm italic text-[#3b4b45]/80 text-sm">
                                <span className="block text-[10px] font-black text-gray-400 uppercase mb-2">Your Answer:</span>
                                "{item.answer || "No response recorded."}"
                             </div>
                             
                             <div className="bg-[#11b589]/5 p-4 rounded-2xl border border-[#11b589]/10 mb-4 text-[#08241b] text-sm font-medium">
                                <span className="block text-[10px] font-black text-[#11b589] uppercase mb-2">Proper Technical Answer:</span>
                                {item.ideal}
                             </div>

                             <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                <Zap className="w-4 h-4 text-[#11b589] shrink-0 mt-0.5" />
                                <div>
                                   <p className="text-[10px] font-black text-[#11b589] uppercase tracking-widest leading-none mb-1">AI Recommendation</p>
                                   <p className="text-xs font-bold text-emerald-800 leading-relaxed">{item.improvement}</p>
                                </div>
                             </div>
                          </div>
                       ))
                     ) : (
                       <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                          <Cpu className="w-16 h-16 mb-4" />
                          <p className="font-bold italic">Speak with our AI to unlock detailed interview analysis.</p>
                       </div>
                     )}
                  </div>
              </motion.div>

              {/* Progress Chart Placeholder (Optimized for sidebar) */}
              <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.5 }}
                 className="flex flex-col gap-6"
              >
                 <div className="bg-gradient-to-br from-[#08241b] to-black rounded-[2rem] p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between flex-1 min-h-[300px]">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-[60px] pointer-events-none" />
                    <div>
                       <h3 className="text-white/60 font-black uppercase tracking-widest text-[10px] mb-4 flex items-center gap-2">
                         <TrendingUp className="w-4 h-4 text-[#11b589]" /> Growth Rate
                       </h3>
                       <div className="flex items-end gap-3">
                         <span className="text-4xl font-black text-white">+42%</span>
                         <span className="text-white/40 font-bold mb-1 text-xs">MONTHLY</span>
                       </div>
                    </div>
                    {/* Simplified Chart for Sidebar */}
                    <div className="w-full h-24 mt-8 flex items-end gap-2">
                       {[30, 50, 40, 70, 60, 90, 85].map((h, i) => (
                         <div key={i} className="flex-1 bg-[#11b589]/30 rounded-t-md hover:bg-[#11b589] transition-colors" style={{ height: `${h}%` }} />
                       ))}
                    </div>
                 </div>

                 {/* Recent Badges Small */}
                 <div className="bg-white/90 backdrop-blur-xl border border-white rounded-[2rem] p-6 shadow-sm border-gray-100">
                    <h3 className="text-[#08241b] font-black text-base mb-4 flex items-center gap-2 italic"><Award className="w-4 h-4 text-[#11b589]" /> Recent Perks</h3>
                    <div className="space-y-3">
                       {[{ t: "React Master", i: "⚛️" }, { t: "Node Guru", i: "🚀" }].map((b, k) => (
                          <div key={k} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                             <span className="text-xl">{b.i}</span>
                             <span className="text-sm font-black text-[#0b261d]">{b.t}</span>
                          </div>
                       ))}
                    </div>
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
