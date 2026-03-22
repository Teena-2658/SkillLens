import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, BarChart, X, Check, Target, Zap, Building2, Search } from 'lucide-react';

export default function Match() {
  const [activeTab, setActiveTab] = useState('Frontend');
  const roles = ['Frontend', 'Backend', 'Fullstack', 'Data'];

  return (
    <>
            <div className="min-h-screen font-sans bg-[#f8faf9]  relative overflow-hidden flex flex-col pt-4 pb-12 px-6">
        
        <div className="absolute top-[-10%] left-[10%] w-[30%] h-[40%] bg-[#d2fbf0] rounded-full blur-[140px] pointer-events-none opacity-50" />
        <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[30%] bg-blue-50 rounded-full blur-[150px] pointer-events-none opacity-60" />

        <main className="flex-1 w-full max-w-6xl mx-auto relative z-10 space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <h1 className="text-4xl font-black text-[#0b261d] tracking-tight mb-3">Role Matcher</h1>
            <p className="text-[#3b4b45]/70 font-medium text-lg max-w-2xl">
              See how your current skill profile stacks up against industry standards for different engineering roles. Let's find your perfect fit.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8 mt-6">
            
            {/* Roles Sidebar */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:w-1/4 space-y-3">
              <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
                <div className="relative mb-4">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <Search className="w-4 h-4 text-gray-400" />
                   </div>
                   <input type="text" placeholder="Search roles..." className="w-full bg-gray-50 text-[#08241b] rounded-xl py-3 pl-10 pr-4 text-sm font-bold border border-gray-100 focus:ring-2 focus:ring-[#11b589]" />
                </div>
                {roles.map((role) => (
                  <button 
                    key={role}
                    onClick={() => setActiveTab(role)}
                    className={`w-full text-left px-5 py-4 rounded-2xl font-bold transition-all flex justify-between items-center ${activeTab === role ? 'bg-[#08241b] text-white shadow-lg shadow-[#08241b]/20' : 'bg-transparent text-[#3b4b45] hover:bg-[#d2fbf0]/50'}`}
                  >
                    <span>{role} Developer</span>
                    {activeTab === role && <Target className="w-4 h-4 text-emerald-400" />}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Match Detail Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:w-3/4">
              <div className="bg-white backdrop-blur-2xl border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] h-full">
                
                {/* Header Profile */}
                <div className="p-10 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-white to-gray-50/50">
                   <div className="flex items-center gap-6">
                     <div className="w-20 h-20 bg-emerald-50 text-[#11b589] rounded-2xl flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-transform">
                        <Briefcase className="w-10 h-10" />
                     </div>
                     <div>
                       <div className="flex items-center gap-3 mb-1">
                          <h2 className="text-3xl font-black text-[#0b261d]">{activeTab} Match</h2>
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-black tracking-widest uppercase">85% Fit</span>
                       </div>
                       <p className="text-[#3b4b45]/60 font-medium">Based on 14 analyzed skills and previous quiz results.</p>
                     </div>
                   </div>
                   <button className="px-6 py-4 bg-[#11b589] hover:bg-[#0e9671] text-white rounded-2xl font-black text-sm transition-all shadow-xl shadow-[#11b589]/20 flex items-center justify-center gap-2 whitespace-nowrap">
                     <Zap className="w-5 h-5" /> Generate Roadmap
                   </button>
                </div>

                {/* Body Metrics */}
                <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                   
                   <div className="space-y-6">
                     <h3 className="text-xl font-bold text-[#08241b] flex items-center gap-2 mb-6">
                        <Check className="w-5 h-5 text-green-500 bg-green-100 rounded-full p-0.5" /> Matched Skills
                     </h3>
                     <div className="space-y-4">
                        {['React.js ecosystem', 'State Management (Redux)', 'Responsive CSS / Tailwind', 'REST API Integration'].map(skill => (
                           <div key={skill} className="flex justify-between items-center text-sm font-bold text-[#3b4b45]">
                              <span>{skill}</span>
                              <div className="flex gap-1">
                                <div className="w-16 h-2 bg-[#11b589] rounded-full" />
                                <div className="w-4 h-2 bg-gray-100 rounded-full" />
                              </div>
                           </div>
                        ))}
                     </div>
                   </div>

                   <div className="space-y-6 relative before:absolute before:inset-y-0 before:-left-5 before:w-px before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent hidden md:block">
                     <h3 className="text-xl font-bold text-[#08241b] flex items-center gap-2 mb-6 ml-6">
                        <X className="w-5 h-5 text-red-500 bg-red-100 rounded-full p-0.5" /> Missing Skills
                     </h3>
                     <div className="space-y-4 ml-6">
                        {['GraphQL Fundamentals', 'Web Performance Optimization', 'Advanced TypeScript'].map(skill => (
                           <div key={skill} className="flex justify-between items-center text-sm font-bold text-[#3b4b45]/70">
                              <span>{skill}</span>
                              <div className="px-3 py-1 bg-orange-50 text-orange-600 rounded-lg text-[10px] uppercase font-black">Learn</div>
                           </div>
                        ))}
                     </div>
                   </div>

                </div>

              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
}
