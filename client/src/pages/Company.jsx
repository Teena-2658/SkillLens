import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Search, MapPin, Users, Target, ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react';

export default function Company() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch("http://localhost:5800/api/companies", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const result = await response.json();
        
        if (response.ok && result.success) {
          // Map backend data to frontend structure where needed
          const formattedCompanies = result.data.companies.map(c => ({
            id: c.id,
            name: c.name,
            role: "Target Role", // Role is based on user target role in backend
            location: c.sector || "Remote", // Using sector as fallback location
            type: c.type,
            fit: c.matchPercent,
            match: c.readinessLabel.includes("Good") ? "High" : c.readinessLabel.includes("Needs") ? "Medium" : "Low",
          }));
          setCompanies(formattedCompanies);
        } else {
          setError(result.message || "Failed to load companies");
        }
      } catch (err) {
        setError("Error connecting to backend");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [gapData, setGapData] = useState(null);
  const [fetchingGap, setFetchingGap] = useState(false);

  const fetchGap = async (id) => {
    setSelectedCompanyId(id);
    setFetchingGap(true);
    setGapData(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5800/api/companies/${id}/gap`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.success) setGapData(result.data);
    } catch (err) { console.error(err); }
    finally { setFetchingGap(false); }
  };

  return (
    <>
      <div className="min-h-screen bg-[#f8faf9] relative overflow-hidden flex flex-col pt-4 pb-12 px-6">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
           <div className="absolute top-[10%] left-[20%] w-[30%] h-[40%] bg-[#fae8fb] rounded-full blur-[140px]" />
           <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[30%] bg-[#d2fbf0] rounded-full blur-[120px]" />
        </div>

        <main className="flex-1 w-full max-w-6xl mx-auto relative z-10 space-y-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl font-black text-[#0b261d] tracking-tight mb-2 flex items-center gap-3">
                 <Building2 className="w-8 h-8 text-[#11b589]" /> Company Radar
              </h1>
              <p className="text-[#3b4b45]/70 font-medium text-lg">
                Discover product-based companies that perfectly match your current skillset.
              </p>
            </div>
          </motion.div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-[#11b589] mb-4" />
              <p className="text-[#3b4b45] font-bold">Loading companies...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-500 rounded-2xl p-6 text-center shadow-sm">
              <h3 className="font-bold mb-2">Notice</h3>
              <p>{error}</p>
            </div>
          ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
             {companies.map((company, i) => (
                <motion.div 
                   key={i}
                   onClick={() => fetchGap(company.id)}
                   className="bg-white/90 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_50px_-10px_rgba(17,181,137,0.15)] transition-all flex flex-col justify-between group cursor-pointer"
                >
                   <div>
                     <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                           <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center font-black text-2xl text-[#08241b] border border-gray-100 shadow-sm group-hover:scale-110 transition-transform">
                              {company.name.charAt(0)}
                           </div>
                           <div>
                              <h3 className="text-2xl font-black text-[#0b261d]">{company.name}</h3>
                              <p className="text-[#11b589] font-bold text-sm">{company.type}</p>
                           </div>
                        </div>
                        <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase ${company.fit >= 70 ? 'bg-[#11b589] text-white' : 'bg-orange-100 text-orange-600'}`}>
                           {company.fit}% Match
                        </span>
                     </div>
                     <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3 text-[#3b4b45] font-bold text-sm">
                           <MapPin className="w-5 h-5 text-gray-400 bg-gray-50 rounded p-0.5" />
                           Sector: {company.location}
                        </div>
                     </div>
                   </div>
                   <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                      <div className="text-xs font-bold text-gray-400 flex items-center gap-2">
                         <CheckCircle2 className="w-4 h-4 text-[#11b589]" /> Detailed Analysis Available
                      </div>
                      <button className="flex items-center gap-2 text-[#08241b] font-black text-sm group-hover:text-[#11b589] transition-colors">
                         View Details <ArrowUpRight className="w-4 h-4" />
                      </button>
                   </div>
                </motion.div>
              ))}
          </div>
          )}
        </main>
      </div>

      {/* Detail Modal Overlay */}
      {selectedCompanyId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-[#08241b]/40 backdrop-blur-md" onClick={() => setSelectedCompanyId(null)} />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl p-8 md:p-12">
            <button onClick={() => setSelectedCompanyId(null)} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors">
               <span className="text-2xl font-bold">&times;</span>
            </button>
            
            {fetchingGap ? (
              <div className="py-20 flex flex-col items-center">
                <Loader2 className="w-12 h-12 animate-spin text-[#11b589] mb-4" />
                <p className="font-bold text-gray-400">Analyzing requirements...</p>
              </div>
            ) : gapData ? (
              <div className="space-y-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b pb-8">
                   <div>
                     <h2 className="text-4xl font-black text-[#0b261d] mb-2">{gapData.company}</h2>
                     <p className="text-[#11b589] font-black uppercase tracking-widest text-sm">Target Role Requirements</p>
                   </div>
                   <div className="text-right mt-4 md:mt-0">
                     <p className="text-xs font-bold text-gray-400 uppercase mb-1">Your Match</p>
                     <p className="text-5xl font-black text-[#11b589]">{gapData.currentMatchPercent}%</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h3 className="text-xl font-black text-[#0b261d]">Skill Gap Analysis</h3>
                    <div className="space-y-4">
                      {gapData.topGaps.map((gap, idx) => (
                        <div key={idx} className="bg-red-50/50 border border-red-100 p-5 rounded-2xl relative overflow-hidden group hover:border-red-200 transition-colors">
                           <div className="flex justify-between items-start mb-3">
                             <h4 className="font-black text-red-600 uppercase tracking-tight">{gap.skill}</h4>
                             <span className="text-xs font-bold text-red-400 bg-white px-2 py-1 rounded-lg">Weight: {gap.skillWeight}%</span>
                           </div>
                           <p className="text-sm font-medium text-red-700/70 mb-4">{gap.actionToFix}</p>
                           <div className="flex items-center gap-4">
                             <div className="flex-1 h-2 bg-red-100 rounded-full overflow-hidden">
                               <div className="h-full bg-red-400" style={{ width: `${(gap.studentDepth / gap.minimumDepth) * 100}%` }} />
                             </div>
                             <span className="text-xs font-black text-red-600 shrink-0">{gap.studentDepth} / {gap.minimumDepth}</span>
                           </div>
                        </div>
                      ))}
                      {gapData.topGaps.length === 0 && (
                        <div className="bg-[#d2fbf0] p-6 rounded-2xl text-[#11b589] font-bold text-center">
                          You meet all required technical skills!
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-black text-[#0b261d]">Hiring Verdict</h3>
                    <div className="bg-[#08241b] text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
                      <p className="text-lg font-medium leading-relaxed mb-8">"{gapData.verdict}"</p>
                      <div className="flex justify-between items-center text-xs font-bold text-white/50 border-t border-white/10 pt-6">
                        <span>Projected Match (after fix)</span>
                        <span className="text-white text-xl font-black">{gapData.projectedMatchIfAllFixed}%</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => window.location.href = `/roadmap?generateFor=${gapData.companyId}`}
                      className="w-full py-5 bg-[#11b589] hover:bg-[#0e9671] text-white rounded-2xl font-black transition-all flex items-center justify-center gap-2"
                    >
                      Optimize Roadmap for {gapData.company} <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-10 text-center text-gray-400 font-bold">Failed to load details.</div>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
}
