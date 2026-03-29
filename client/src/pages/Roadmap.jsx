import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Clock, Activity, Flag, Plus, Loader2, CheckCircle2, ChevronRight } from 'lucide-react';
import RoadmapModal from './RoadmapModal';

export default function Roadmap() {
  const [weeks, setWeeks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [track, setTrack] = useState("Developer Track");
  const [selectedWeekIdx, setSelectedWeekIdx] = useState(null);

  const fetchRoadmap = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:5800/api/roadmap", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const result = await response.json();
      if (response.ok && result?.success && result.data?.weeks) {
        setWeeks(result.data.weeks);
        setTrack(result.data.targetRole || "Developer");
      } else {
        setWeeks([]);
        setError(result?.message || "Failed to load roadmap");
      }
    } catch (err) {
      setError("Error connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const companyId = params.get('generateFor');
    const shouldGenerate = params.get('generate');
    if (companyId) {
      generateRoadmap(companyId);
    } else if (shouldGenerate === 'true') {
      generateRoadmap();
    } else {
      fetchRoadmap();
    }
  }, []);

  const generateRoadmap = async (targetCompanyId = null) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:5800/api/roadmap/generate", {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ targetCompanyId })
      });
      const result = await response.json();
      if (response.ok && result.success) {
        // Clear search params after generating
        window.history.replaceState({}, '', window.location.pathname);
        fetchRoadmap();
      } else {
        setError(result.message || "Failed to generate roadmap");
      }
    } catch (err) {
      setError("Error connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (weekNumber, taskId, done) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5800/api/roadmap/${weekNumber}/tasks/${taskId}`, {
        method: "PATCH",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ done })
      });
      fetchRoadmap();
    } catch (err) {
       console.error(err);
    }
  };

  const handleToggleWeek = async (weekNumber, done) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5800/api/roadmap/${weekNumber}/complete`, {
        method: "PATCH",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ done })
      });
      fetchRoadmap();
    } catch (err) {
       console.error(err);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#fbfbfa] relative overflow-hidden flex flex-col pt-4 pb-12 px-6">
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-40">
           <div className="absolute top-[20%] left-[20%] w-[40%] h-[50%] bg-[#d2fbf0] rounded-full blur-[140px]" />
           <div className="absolute bottom-[0%] right-[10%] w-[30%] h-[30%] bg-[#fae8fb] rounded-full blur-[120px]" />
        </div>

        <main className="flex-1 w-full max-w-4xl mx-auto relative z-10 space-y-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-end mb-8 border-b border-gray-100 pb-10">
             <div>
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-5xl font-black text-[#0b261d] tracking-tight">Growth Path</h1>
                  <span className="px-3 py-1 bg-[#11b589] text-white rounded-xl text-xs font-black tracking-widest uppercase shadow-lg shadow-[#11b589]/20">{track}</span>
                </div>
                <p className="text-[#3b4b45]/60 font-medium text-lg max-w-xl">
                  Your personalized 8-week journey to developer fluency, optimized for your target companies.
                </p>
             </div>
             <div className="hidden md:flex flex-col items-end gap-1">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Est. Completion</span>
                <span className="text-2xl font-black text-[#0b261d]">Aug 15</span>
             </div>
          </motion.div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-[#11b589] mb-4" />
              <p className="text-[#3b4b45] font-bold">Synchronizing your path...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-500 rounded-3xl p-10 text-center shadow-sm">
              <h3 className="font-bold mb-2">Roadmap Not Found</h3>
              <p className="mb-6 opacity-70">We need to analyze your profile to build your roadmap.</p>
              <button 
                onClick={generateRoadmap}
                className="px-10 py-4 bg-[#08241b] text-white rounded-2xl font-black hover:bg-[#11b589] transition-all shadow-xl shadow-[#08241b]/20"
              >
                Generate My Roadmap
              </button>
            </div>
          ) : (
          <div className="relative pl-4 md:pl-0 space-y-12">
             <div className="absolute top-0 bottom-0 left-[31px] md:left-[51px] w-1.5 bg-gray-100 rounded-full" />

             {weeks.map((week, idx) => {
                const isActive = !week.done && (idx === 0 || weeks[idx-1].done);
                const isLocked = !week.done && !isActive;

                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative flex items-center md:items-start gap-6 md:gap-12"
                  >
                    <div className={`relative z-10 w-14 h-14 rounded-2xl border-[6px] border-[#fbfbfa] shadow-xl flex items-center justify-center shrink-0 transition-all duration-500 ${week.done ? 'bg-[#11b589] text-white rotate-0' : isActive ? 'bg-orange-500 text-white animate-bounce' : 'bg-gray-200 text-gray-400 grayscale'}`}>
                        {week.done ? <Flag className="w-6 h-6" /> : isActive ? <Activity className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                    </div>

                    <div 
                      onClick={() => !isLocked && setSelectedWeekIdx(idx)}
                      className={`flex-1 bg-white p-8 rounded-[2.5rem] shadow-sm border transition-all cursor-pointer group hover:shadow-2xl hover:shadow-[#11b589]/10 ${isActive ? 'ring-2 ring-orange-500/10 border-orange-200' : isLocked ? 'opacity-50 grayscale hover:grayscale-0' : 'border-gray-100'}`}
                    >
                        <div className="flex justify-between items-start mb-6">
                           <div>
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1 block">Week {week.weekNumber}</span>
                              <h3 className={`text-2xl font-black ${isLocked ? 'text-gray-400' : 'text-[#0b261d]'}`}>{week.theme}</h3>
                           </div>
                           <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${week.done ? 'bg-[#d2fbf0] text-[#11b589]' : isActive ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'}`}>
                              {week.done ? 'Completed' : isActive ? 'In Progress' : 'Upcoming'}
                           </span>
                        </div>
                        
                        <p className="text-[#3b4b45]/60 font-medium text-sm line-clamp-2 mb-8 leading-relaxed">
                           {week.goal}
                        </p>

                        <div className="flex items-center justify-between mt-auto">
                           <div className="flex items-center gap-6">
                              <span className="flex items-center gap-2 text-xs font-bold text-gray-400">
                                <Clock className="w-4 h-4" /> {week.tasks.length} Checkpoints
                              </span>
                              {!isLocked && (
                                <div className="flex items-center gap-2">
                                  <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                     <div className="h-full bg-[#11b589]" style={{ width: `${(week.tasks.filter(t => t.done).length / week.tasks.length) * 100}%` }} />
                                  </div>
                                  <span className="text-[10px] font-black text-[#11b589]">{Math.round((week.tasks.filter(t => t.done).length / week.tasks.length) * 100)}%</span>
                                </div>
                              )}
                           </div>
                           <ChevronRight className="w-5 h-5 text-gray-300 group-hover:translate-x-1 group-hover:text-[#11b589] transition-all" />
                        </div>
                    </div>
                  </motion.div>
                );
             })}
          </div>
          )}
        </main>
      </div>

      <AnimatePresence>
        {selectedWeekIdx !== null && (
          <RoadmapModal 
            isOpen={true} 
            onClose={() => setSelectedWeekIdx(null)}
            week={weeks[selectedWeekIdx]}
            onToggleTask={handleToggleTask}
          />
        )}
      </AnimatePresence>
    </>
  );
}
