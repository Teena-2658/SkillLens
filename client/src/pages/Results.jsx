import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle, XCircle, Clock, ChevronRight, Loader2, ArrowRight, BookOpen } from 'lucide-react';

export default function Results() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");
      
      const url = id 
        ? `http://localhost:5800/api/quiz/attempts/${id}`
        : `http://localhost:5800/api/quiz/attempts/latest`;

      try {
        const token = localStorage.getItem("token");
        const res = await fetch(url, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setResult(data.data);
        } else {
          setResult(null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8faf9] flex flex-col items-center justify-center p-6">
        <Loader2 className="w-12 h-12 animate-spin text-[#11b589] mb-4" />
        <p className="text-[#3b4b45] font-bold">Fetching results...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-[#f8faf9] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center mb-8 text-gray-300">
           <BookOpen className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-black text-[#0b261d] mb-4">No Quiz History</h2>
        <p className="text-[#3b4b45]/60 font-medium max-w-sm mb-10 leading-relaxed">
           You haven't completed any skill quizzes yet. Take your first test to benchmark your industry readiness.
        </p>
        <button 
           onClick={() => window.location.href = '/quiz'}
           className="px-10 py-5 bg-[#08241b] text-white rounded-[2rem] font-black shadow-xl shadow-[#08241b]/20 hover:bg-[#11b589] transition-all"
        >
           Start My First Quiz
        </button>
      </div>
    );
  }

  const resultData = {
    score: result.overallPercent,
    title: result.title,
    time: `${Math.floor(result.timeSpentSeconds / 60)}:${(result.timeSpentSeconds % 60).toString().padStart(2, '0')}`,
    percentile: result.overallPercent > 80 ? "Top 5%" : result.overallPercent > 60 ? "Top 20%" : "Average",
    questions: result.questionReviews.map(r => ({
      q: r.question,
      correct: r.isCorrect
    }))
  };

  return (
    <>
            <div className="min-h-screen bg-[#f8faf9]  relative overflow-hidden flex flex-col pt-4 pb-12 px-6">
        
        <div className="absolute top-[10%] left-[10%] w-[30%] h-[40%] bg-[#d2fbf0] rounded-full blur-[140px] pointer-events-none opacity-50" />
        <div className="absolute bottom-[0%] right-[10%] w-[40%] h-[30%] bg-[#fae8fb] rounded-full blur-[150px] pointer-events-none opacity-60" />

        <main className="flex-1 w-full max-w-5xl mx-auto relative z-10 space-y-8">
          
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-12">
             <div className="w-20 h-20 bg-emerald-50 text-[#11b589] rounded-3xl mx-auto flex items-center justify-center transform -rotate-6 hover:rotate-0 transition-transform mb-6 shadow-xl border border-emerald-100">
               <Trophy className="w-10 h-10" />
             </div>
             <h1 className="text-5xl font-black text-[#0b261d] tracking-tight mb-4">Quiz Completed!</h1>
             <p className="text-[#3b4b45]/70 font-medium text-lg">
               You successfully completed the "{resultData.title}" test. Here's a detailed breakdown of your performance.
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
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center gap-2">
                <button 
                  onClick={() => window.location.href = '/quiz'}
                  className="bg-[#08241b] hover:bg-[#11b589] text-white py-3 px-4 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 group"
                >
                   Retake Quiz <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => window.location.href = '/dashboard'}
                  className="bg-white border border-gray-100 text-[#3b4b45] py-2 px-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                >
                   Dashboard <ChevronRight className="w-3 h-3" />
                </button>
             </motion.div>
          </div>

          {/* Roadmap Integration Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.6 }}
            className="bg-[#08241b] text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#11b589]/20 rounded-full blur-[100px] -mr-32 -mt-32" />
             <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                   <h3 className="text-3xl font-black mb-3">Your Roadmap is Updated!</h3>
                   <p className="text-white/60 font-medium text-lg max-w-lg leading-relaxed">
                      We've analyzed your results and adjusted your learning path. New goals have been unlocked based on your proficiency.
                   </p>
                </div>
                <button 
                  onClick={() => window.location.href = '/roadmap'}
                  className="px-10 py-5 bg-[#11b589] hover:bg-white hover:text-[#08241b] text-white rounded-2xl font-black transition-all flex items-center gap-3 shadow-xl whitespace-nowrap"
                >
                   View My Path <ArrowRight className="w-5 h-5" />
                </button>
             </div>
          </motion.div>

          {/* Detailed Question Answers */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]">
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
