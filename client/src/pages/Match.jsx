import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Check, Zap, Loader2 } from 'lucide-react';

export default function Match() {
  const [loading, setLoading] = useState(true);
  const [bestMatch, setBestMatch] = useState(null);
  const [targetRole, setTargetRole] = useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { "Authorization": `Bearer ${token}` };
        
        const profRes = await fetch("http://localhost:5800/api/auth/profile", { headers });
        const profData = await profRes.json();
        setTargetRole(profData.data?.user?.targetRole || "Developer");

        const res = await fetch("http://localhost:5800/api/companies/gaps", { headers });
        const data = await res.json();
        if (data.success && data.data.companies.length > 0) {
           // Company gaps are sorted by totalRequiredGap then matchPercent
           setBestMatch(data.data.companies[0]);
        }
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  if (loading) return (
     <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#11b589]" />
     </div>
  );

  return (
    <>
      <div className="min-h-screen bg-[#f8faf9] relative overflow-hidden flex flex-col pt-4 pb-12 px-6">
        <div className="absolute top-[-10%] left-[10%] w-[30%] h-[40%] bg-[#d2fbf0] rounded-full blur-[140px] pointer-events-none opacity-50" />
        
        <main className="flex-1 w-full max-w-6xl mx-auto relative z-10 space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-black text-[#0b261d] tracking-tight mb-3 uppercase">Best Fit Analysis</h1>
            <p className="text-[#3b4b45]/70 font-medium text-lg max-w-2xl">
              We've analyzed your current skills against industry requirements for {targetRole} roles.
            </p>
          </motion.div>

          {!bestMatch ? (
             <div className="bg-white p-20 rounded-[2rem] text-center shadow-sm border border-gray-100">
               <h3 className="text-2xl font-black text-[#0b261d] mb-4">No data yet</h3>
               <p className="text-gray-400 mb-8">Upload your resume and take a few quizzes to see your matches!</p>
               <button onClick={() => window.location.href='/resume'} className="px-8 py-4 bg-[#08241b] text-white rounded-2xl font-bold">Start Now</button>
             </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-100 relative overflow-hidden"
               >
                 <div className="absolute top-0 right-0 w-64 h-64 bg-[#d2fbf0]/20 rounded-full -mr-20 -mt-20 blur-3xl" />
                 
                 <div className="flex items-center gap-6 mb-12">
                   <div className="w-20 h-20 bg-[#08241b] text-white rounded-[2rem] flex items-center justify-center font-black text-3xl">
                      {bestMatch.company.charAt(0)}
                   </div>
                   <div>
                     <h2 className="text-3xl font-black text-[#0b261d] mb-1">{bestMatch.company}</h2>
                     <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-black uppercase tracking-widest">{bestMatch.tier} Tier</span>
                        <span className="text-gray-400 font-bold text-sm">{bestMatch.sector}</span>
                     </div>
                   </div>
                 </div>

                 <div className="grid grid-cols-2 gap-8 mb-12">
                    <div className="bg-[#f8faf9] p-6 rounded-3xl border border-gray-100">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Technical Match</p>
                      <p className="text-5xl font-black text-[#11b589]">{bestMatch.currentMatchPercent}%</p>
                    </div>
                    <div className="bg-[#f8faf9] p-6 rounded-3xl border border-gray-100">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Readiness</p>
                      <p className="text-2xl font-black text-[#08241b] mt-2">{bestMatch.readinessLabel}</p>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <h3 className="text-xl font-bold text-[#0b261d]">Core Skill Checks</h3>
                    <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden">
                       <div className="p-6 bg-gray-50 flex justify-between text-xs font-black uppercase tracking-widest text-gray-400">
                          <span>Requirement Status</span>
                          <span>Details</span>
                       </div>
                       <div className="divide-y divide-gray-50">
                          <div className="p-6 flex justify-between items-center group hover:bg-emerald-50/30 transition-colors">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
                                   <Check className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-[#3b4b45]">Mandatory Skills Met</span>
                             </div>
                             <span className="font-black text-[#11b589]">{bestMatch.metRequiredCount} / {bestMatch.requiredSkillCount}</span>
                          </div>
                          
                          {bestMatch.topGap && (
                            <div className="p-6 flex justify-between items-center group hover:bg-orange-50/30 transition-colors">
                               <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                                     <Zap className="w-5 h-5" />
                                  </div>
                                  <span className="font-bold text-[#3b4b45]">Biggest Gap: <span className="uppercase text-[#08241b] ml-1">{bestMatch.topGap.skill}</span></span>
                               </div>
                               <span className="font-black text-orange-600">-{bestMatch.topGap.depthGap} Lv.</span>
                            </div>
                          )}
                       </div>
                    </div>
                 </div>
               </motion.div>

               <div className="space-y-6">
                  <div className="bg-[#08241b] p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                     <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#11b589]/20 rounded-full -mb-10 -mr-10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                     <h3 className="text-2xl font-black mb-4 leading-tight">Ready to see more matches?</h3>
                     <p className="text-white/60 font-medium mb-8">We found {bestMatch.totalCompanies} other companies hiring for {targetRole} developers.</p>
                     <button 
                        onClick={() => window.location.href='/company'}
                        className="w-full py-5 bg-[#11b589] hover:bg-white hover:text-[#08241b] text-white rounded-2xl font-black transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#11b589]/20"
                     >
                        Browse Radar <Briefcase className="w-5 h-5" />
                     </button>
                  </div>

                  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                     <h4 className="font-black text-[#0b261d] mb-4">How we calculate fit</h4>
                     <p className="text-sm text-[#3b4b45]/70 font-medium leading-relaxed">
                        Match scores are calculated using your latest quiz depth scores against each company's minimum threshold for their respective engineering stacks.
                     </p>
                  </div>
               </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
