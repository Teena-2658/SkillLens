import React from 'react';
import { motion } from 'framer-motion';
import { Target, BookOpen, Brain, Briefcase, ChevronRight, AlertCircle, TrendingUp } from 'lucide-react';
// Dhyan rakhein ki Navbar ka path aapke folder structure ke hisaab se sahi ho
import Navbar from '../components/Navbar';

export default function Dashboard() {
  return (
    /* 1. Yahan React Fragment (<>) lagaya gaya hai */
    <>
      <Navbar />

      {/* 2. Yahan lg:ml-[280px] add kiya gaya hai taaki yeh Sidebar ke bagal mein aaye */}
      <div className="min-h-screen font-sans bg-[#fbfbfa] lg:ml-[280px] relative overflow-hidden flex flex-col pt-32 pb-12">

        {/* Abstract Background Matching Theme */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-60 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[60%] bg-[#d2fbf0] rounded-full blur-[140px]" />
          <div className="absolute top-[-5%] right-[-10%] w-[45%] h-[55%] bg-[#fae8fb] rounded-full blur-[140px]" />
          <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-white rounded-full blur-[100px]" />
        </div>

        <main className="flex-1 w-full max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Top Title */}
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl font-black text-[#0b261d] tracking-tight">Dashboard</h1>
              <div className="px-3 py-1 bg-[#11b589]/10 text-[#11b589] rounded-lg text-sm font-bold border border-[#11b589]/20">/dashboard</div>
              <div className="text-sm font-medium text-[#3b4b45]/60 flex items-center gap-2 ml-4">
                Protected <span className="w-1 h-1 rounded-full bg-[#3b4b45]/40" /> JWT required
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-[#08241b] mb-2 tracking-tight">Good morning, Rahul</h2>
                <p className="text-[#3b4b45]/70 font-medium">Backend developer • 68 days to placement season</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-amber-50 text-amber-600 rounded-xl font-bold flex items-center gap-2 border border-amber-100">
                  <AlertCircle className="w-4 h-4" />
                  68 days left
                </div>
                <p className="text-sm font-medium text-[#3b4b45]/50">Last active 2h ago</p>
              </div>
            </div>

            {/* Readiness Section */}
            <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="text-7xl font-black text-[#11b589] tracking-tighter leading-none mb-2">
                    62<span className="text-4xl text-[#3b4b45]/30">/100</span>
                  </div>
                  <div className="font-extrabold uppercase tracking-widest text-[#3b4b45] text-xs mb-3">Readiness</div>
                  <div className="px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-xs font-bold border border-amber-100">Almost there</div>
                </div>

                <div className="flex-1 w-full space-y-8">
                  <div>
                    <div className="flex justify-between text-sm font-bold text-[#3b4b45]/60 mb-3">
                      <span>0</span>
                      <span className="text-[#11b589]">62 / 100</span>
                      <span>100</span>
                    </div>
                    <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '62%' }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-[#11b589] rounded-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-[#11b589]" />
                        <span className="text-xs font-bold text-[#3b4b45]/70 uppercase tracking-wider">Skills</span>
                      </div>
                      <div className="text-2xl font-black text-[#08241b]">56%</div>
                    </div>
                    <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="w-4 h-4 text-[#11b589]" />
                        <span className="text-xs font-bold text-[#3b4b45]/70 uppercase tracking-wider">Interview</span>
                      </div>
                      <div className="text-2xl font-black text-[#08241b]">65%</div>
                    </div>
                    <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-[#11b589]" />
                        <span className="text-xs font-bold text-[#3b4b45]/70 uppercase tracking-wider">Roadmap</span>
                      </div>
                      <div className="text-2xl font-black text-[#08241b]">37%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Top Matches Section */}
              <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] flex flex-col">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#3b4b45] mb-6">Top Matches</h3>

                <div className="space-y-6 flex-1">
                  {[
                    { name: 'TCS', score: 78, color: 'bg-[#11b589]' },
                    { name: 'Wipro', score: 71, color: 'bg-[#11b589]' },
                    { name: 'Razorpay', score: 31, color: 'bg-amber-500' }
                  ].map((company) => (
                    <div key={company.name} className="flex items-center gap-4">
                      <div className="w-24 font-bold text-[#08241b]">{company.name}</div>
                      <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${company.score}%` }}
                          transition={{ duration: 1, delay: 0.4 }}
                          className={`h-full ${company.color} rounded-full`}
                        />
                      </div>
                      <div className={`w-10 text-right font-black ${company.score > 50 ? 'text-[#11b589]' : 'text-amber-500'}`}>
                        {company.score}%
                      </div>
                    </div>
                  ))}
                </div>

                <button className="mt-8 w-full py-3.5 bg-gray-50 hover:bg-gray-100 text-[#08241b] rounded-xl font-bold transition-colors flex items-center justify-center gap-2 border border-gray-200">
                  View all 25
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Next Step Section */}
              <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] flex flex-col">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#3b4b45] mb-6">Next Step</h3>

                <div className="bg-gradient-to-br from-[#d2fbf0]/50 to-white border border-[#11b589]/20 rounded-2xl p-6 flex-1 flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Brain className="w-24 h-24 text-[#11b589]" />
                  </div>
                  <h4 className="text-2xl font-black text-[#0b261d] mb-2 relative z-10">Retake the MongoDB quiz</h4>
                  <p className="text-[#3b4b45]/70 font-medium relative z-10 flex items-center gap-2">
                    Weakest skill • 30% depth • <span className="text-[#11b589] font-bold">+7 pts expected</span>
                  </p>
                </div>

                <button className="mt-8 w-full py-4 bg-[#11b589] hover:bg-[#0e9671] text-white rounded-xl font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#11b589]/20 group">
                  Go to MongoDB quiz
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Readiness Score History */}
            <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#3b4b45] mb-8">Readiness Score History</h3>

              <div className="h-48 flex items-end justify-between gap-2 overflow-hidden">
                {[
                  { date: 'Mar 1', height: '15%', active: false },
                  { date: 'Mar 5', height: '25%', active: false },
                  { date: 'Mar 8', height: '35%', active: false },
                  { date: 'Mar 11', height: '40%', active: false },
                  { date: 'Mar 15', height: '42%', active: false },
                  { date: 'Mar 17', height: '45%', active: false },
                  { date: 'Mar 19', height: '62%', active: true },
                ].map((bar, i) => (
                  <div key={bar.date} className="flex flex-col items-center flex-1 group cursor-pointer h-full justify-end">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: bar.height }}
                      transition={{ duration: 0.8, delay: 0.5 + (i * 0.1) }}
                      className={`w-full max-w-[4rem] rounded-t-xl transition-colors ${bar.active ? 'bg-[#11b589]' : 'bg-[#11b589]/10 group-hover:bg-[#11b589]/30'}`}
                    />
                    <div className={`mt-3 text-xs font-bold ${bar.active ? 'text-[#11b589]' : 'text-[#3b4b45]/50'}`}>
                      {bar.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </main>
      </div>
    </> /* React Fragment close */
  );
}