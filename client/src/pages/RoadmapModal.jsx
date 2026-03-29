import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Zap, X } from 'lucide-react';
import { createPortal } from 'react-dom';

export default function RoadmapModal({ isOpen, onClose, week, onToggleTask }) {
  if (!week) return null;

  const content = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 overflow-hidden pointer-events-auto">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[#08241b]/80 backdrop-blur-md" 
        onClick={onClose} 
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        className="relative bg-white w-full max-w-2xl h-[85vh] md:h-[80vh] overflow-hidden rounded-[2.5rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.5)] flex flex-col z-[10000]"
      >
        {/* Header */}
        <div className="p-8 border-b border-gray-100 flex justify-between items-start bg-white sticky top-0 z-20">
           <div>
              <span className="px-3 py-1 bg-[#d2fbf0] text-[#11b589] rounded-lg text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block">
                Week {week.weekNumber}
              </span>
              <h2 className="text-4xl font-black text-[#0b261d] leading-tight mb-2">{week.theme}</h2>
              <p className="text-[#3b4b45]/60 font-medium text-base">{week.goal}</p>
           </div>
           <button onClick={onClose} className="p-3 hover:bg-gray-100 rounded-2xl transition-all hover:rotate-90">
              <X className="w-8 h-8 text-gray-300" />
           </button>
        </div>

        {/* Task List */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-[#fbfbfa]">
           <div className="flex items-center justify-between mb-2">
             <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tasks & Milestones</h3>
             <span className="text-[10px] font-black text-[#11b589] uppercase tracking-widest">{week.tasks?.filter(t => t.done).length} Points Earned</span>
           </div>
           
           <div className="space-y-4">
              {week.tasks && week.tasks.length > 0 ? (
                week.tasks.map((task, idx) => (
                   <div 
                     key={task.id || idx} 
                     className={`p-6 rounded-3xl border transition-all duration-300 ${task.done ? 'bg-emerald-50/20 border-emerald-100' : 'bg-white border-white shadow-sm hover:shadow-xl hover:shadow-[#11b589]/5 hover:translate-x-1'}`}
                   >
                      <div className="flex items-start gap-5">
                         <button 
                           onClick={(e) => {
                             e.stopPropagation();
                             onToggleTask(week.weekNumber, task.id, !task.done);
                           }}
                           className={`mt-1.5 w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 ${task.done ? 'bg-[#11b589] border-[#11b589] text-white rotate-0 shadow-lg shadow-[#11b589]/30' : 'border-gray-200 hover:border-[#11b589]'}`}
                         >
                            {task.done && <CheckCircle2 className="w-5 h-5" />}
                         </button>
                         <div className="flex-1">
                            <h4 className={`text-xl font-black leading-tight mb-1.5 ${task.done ? 'text-emerald-800' : 'text-[#0b261d]'}`}>{task.title}</h4>
                            <p className="text-[#3b4b45]/70 text-sm font-medium leading-relaxed mb-4">{task.description}</p>
                            
                            <div className="flex flex-wrap gap-2">
                               <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#3b4b45]/40">
                                  <Clock className="w-3.5 h-3.5" /> {task.estimateHours}h
                               </div>
                               <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${task.difficulty === 'hard' ? 'bg-rose-50 text-rose-500' : task.difficulty === 'medium' ? 'bg-amber-50 text-amber-500' : 'bg-[#d2fbf0] text-[#11b589]'}`}>
                                  <Zap className="w-3.5 h-3.5" /> {task.difficulty}
                               </div>
                            </div>

                            {task.deliverable && (
                               <div className="mt-6 p-4 bg-gray-50/50 border border-gray-100 rounded-2xl flex items-center gap-3">
                                  <div className="w-1.5 h-1.5 bg-[#11b589] rounded-full" />
                                  <div>
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Weekly Output</p>
                                    <p className="text-xs font-bold text-[#3b4b45]">{task.deliverable}</p>
                                  </div>
                               </div>
                            )}
                         </div>
                      </div>
                   </div>
                ))
              ) : (
                <div className="py-20 text-center">
                   <p className="text-gray-400 font-bold italic">No specific tasks defined for this week.</p>
                </div>
              )}
           </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-gray-100 bg-white flex justify-between items-center sticky bottom-0 z-20">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex flex-col items-center justify-center border border-gray-100">
                 <span className="text-sm font-black text-[#0b261d]">{Math.round((week.tasks?.filter(t => t.done).length / week.tasks?.length) * 100 || 0)}%</span>
              </div>
              <div>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Overall Status</p>
                 <p className="text-sm font-bold text-[#0b261d]">{week.tasks?.filter(t => t.done).length} of {week.tasks?.length} Completed</p>
              </div>
           </div>
           <button 
             onClick={onClose}
             className="px-8 py-4 bg-[#08241b] text-white rounded-2xl font-black hover:bg-[#11b589] transition-all text-sm shadow-xl shadow-[#08241b]/20"
           >
              Dismiss View
           </button>
        </div>
      </motion.div>
    </div>
  );

  return createPortal(content, document.body);
}
