import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileText, CheckCircle2, ChevronRight, BarChart3, Clock, AlertCircle } from 'lucide-react';

export default function Resume() {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <>
            <div className="min-h-screen font-sans bg-[#f8faf9]  relative overflow-hidden flex flex-col pt-4 pb-12 px-6">
        
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-40">
          <div className="absolute top-[-5%] right-[-10%] w-[40%] h-[50%] bg-[#d2fbf0] rounded-full blur-[140px]" />
          <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[40%] bg-[#fae8fb] rounded-full blur-[120px]" />
        </div>

        <main className="flex-1 w-full max-w-5xl mx-auto relative z-10 space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-2">
            <h1 className="text-4xl font-black text-[#0b261d] tracking-tight">AI Resume Analyzer</h1>
            <div className="px-3 py-1 bg-[#11b589]/10 text-[#11b589] rounded-xl text-xs font-bold border border-[#11b589]/20 uppercase tracking-widest">ATS Matcher</div>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-[#3b4b45]/70 font-medium max-w-2xl text-lg">
            Upload your latest resume to discover skill gaps, fix ATS issues, and get personalized roadmap recommendations.
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Upload Area */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="lg:col-span-2 bg-white/80 backdrop-blur-2xl border border-white/60 rounded-[2rem] p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden"
            >
              <h2 className="text-xl font-bold text-[#08241b] mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#11b589]" /> Upload Document
              </h2>
              
              <div 
                className={`w-full border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center transition-all ${isDragging ? 'border-[#11b589] bg-[#d2fbf0]/30' : 'border-gray-200 hover:border-[#11b589]/50 hover:bg-gray-50/50'}`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
              >
                <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mb-6">
                  <UploadCloud className="w-10 h-10 text-[#11b589]" />
                </div>
                <h3 className="text-xl font-black text-[#0b261d] mb-2">Drag & Drop your Resume</h3>
                <p className="text-[#3b4b45]/60 font-medium text-center max-w-xs mb-6">
                  Supports PDF, DOCX, or TXT formats. Maximum file size 5MB.
                </p>
                <button className="px-8 py-4 bg-[#08241b] hover:bg-[#11b589] text-white rounded-2xl font-bold transition-all shadow-xl shadow-[#11b589]/20 flex items-center gap-2 group">
                  Browse Files <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Quick Stats Panel */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-[#08241b] to-[#11b589] p-8 rounded-[2rem] text-white shadow-xl shadow-[#11b589]/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-[40px]" />
                <h3 className="text-white/80 font-bold uppercase tracking-widest text-xs mb-2">Previous Scan</h3>
                <div className="flex items-end gap-2 mb-6">
                  <span className="text-5xl font-black">78</span>
                  <span className="text-white/80 font-medium mb-1">/ 100 ATS Score</span>
                </div>
                <ul className="space-y-3 text-sm font-medium text-white/90">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-[#d2fbf0]" /> Formatting Passed</li>
                  <li className="flex items-center gap-3"><AlertCircle className="w-4 h-4 text-orange-300" /> Missing Action Verbs</li>
                  <li className="flex items-center gap-3"><AlertCircle className="w-4 h-4 text-orange-300" /> Keywords too low</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm">
                <h3 className="text-[#08241b] font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" /> Recent Uploads
                </h3>
                <div className="space-y-4">
                   <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#fae8fb] text-[#d946ef] rounded-lg flex items-center justify-center font-bold">PDF</div>
                        <div>
                          <p className="text-sm font-bold text-[#08241b]">Vishal_CV_2026.pdf</p>
                          <p className="text-xs text-gray-400 font-medium">Updated 2 days ago</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300" />
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
