import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Search, MapPin, Users, Target, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function Company() {
  const companies = [
    { name: "Google", role: "Frontend Engineer", location: "Bangalore / Remote", type: "Product", fit: 75, match: "Medium" },
    { name: "Netflix", role: "UI Architect", location: "Remote", type: "Streaming", fit: 45, match: "Low" },
    { name: "Stripe", role: "Fullstack Developer", location: "Mumbai", type: "Fintech", fit: 92, match: "High" },
    { name: "Airbnb", role: "React Native Dev", location: "Remote", type: "Product", fit: 88, match: "High" },
  ];

  return (
    <>
            <div className="min-h-screen font-sans bg-[#f8faf9]  relative overflow-hidden flex flex-col pt-4 pb-12 px-6">
        
        {/* Abstract Background Matching Theme */}
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
                Discover product-based companies that perfectly match your current generated skillset.
              </p>
            </div>
            <div className="bg-white rounded-full flex items-center shadow-lg shadow-gray-200/50 p-2 md:w-96 border border-gray-100">
               <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mr-2">
                 <Search className="w-4 h-4 text-gray-400" />
               </div>
               <input type="text" placeholder="Search companies or roles..." className="bg-transparent border-none outline-none font-bold text-sm w-full placeholder:text-gray-400" />
               <button className="bg-[#08241b] text-white px-6 py-3 rounded-full text-sm font-black hover:bg-[#11b589] transition-colors">Find</button>
            </div>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
             {companies.map((company, i) => (
                <motion.div 
                   key={i}
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: i * 0.1 }}
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
                        <div className="text-right">
                           <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase ${company.match === 'High' ? 'bg-[#11b589] text-white shadow-xl shadow-[#11b589]/30' : company.match === 'Medium' ? 'bg-orange-100 text-orange-600' : 'bg-red-50 text-red-500'}`}>
                              {company.fit}% Match
                           </span>
                        </div>
                     </div>
                     
                     <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3 text-[#3b4b45] font-bold">
                           <Target className="w-5 h-5 text-gray-400 bg-gray-50 rounded p-0.5" />
                           Role: {company.role}
                        </div>
                        <div className="flex items-center gap-3 text-[#3b4b45] font-bold text-sm">
                           <MapPin className="w-5 h-5 text-gray-400 bg-gray-50 rounded p-0.5" />
                           {company.location}
                        </div>
                     </div>
                   </div>

                   <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                      <div className="text-xs font-bold text-gray-400 flex items-center gap-2">
                         <CheckCircle2 className="w-4 h-4 text-[#11b589]" /> Matches your Roadmap
                      </div>
                      <button className="flex items-center gap-2 text-[#08241b] font-black text-sm group-hover:text-[#11b589] transition-colors">
                         View Requirements <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </button>
                   </div>
                </motion.div>
             ))}
          </div>

        </main>
      </div>
    </>
  );
}
