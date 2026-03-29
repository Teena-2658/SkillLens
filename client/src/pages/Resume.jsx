import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileText, CheckCircle2, ChevronRight, BarChart3, Clock, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

export default function Resume() {
  const [isDragging, setIsDragging] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState(null);
  const fileInputRef = useRef(null);
  const [targetRole, setTargetRole] = useState(() => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.targetRole || 'frontend';
    } catch {
      return 'frontend';
    }
  });

  const handleFileUpload = async (file) => {
    if (!file) return;
    setLoading(true);
    setUploadMessage(null);
    setAnalysis(null);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("targetRole", targetRole);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:5800/api/resume/upload", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      });

      const result = await response.json();
      if (response.ok && result.success) {
         setUploadMessage({ type: "success", text: "Resume successfully analyzed!" });
         setAnalysis(result.data);
      } else {
         setUploadMessage({ type: "error", text: result.message || "Failed to upload resume" });
      }
    } catch (err) {
      setUploadMessage({ type: "error", text: "Error connecting to backend" });
    } finally {
      setLoading(false);
    }
  };

  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#f8faf9] relative overflow-hidden flex flex-col pt-4 pb-12 px-6">
        
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-40">
          <div className="absolute top-[-5%] right-[-10%] w-[40%] h-[50%] bg-[#d2fbf0] rounded-full blur-[140px]" />
          <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[40%] bg-[#fae8fb] rounded-full blur-[120px]" />
        </div>

        <main className="flex-1 w-full max-w-5xl mx-auto relative z-10 space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-2">
            <h1 className="text-4xl font-black text-[#0b261d] tracking-tight">AI Resume Analyzer</h1>
            <div className="px-3 py-1 bg-[#11b589]/10 text-[#11b589] rounded-xl text-xs font-bold border border-[#11b589]/20 uppercase tracking-widest">ATS Matcher</div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="lg:col-span-2 bg-white/80 backdrop-blur-2xl border border-white/60 rounded-[2rem] p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden"
            >
              <h2 className="text-xl font-bold text-[#08241b] mb-6 flex flex-wrap gap-4 items-center justify-between">
                <span className="flex items-center gap-2"><FileText className="w-5 h-5 text-[#11b589]" /> Upload Document</span>
                <select 
                  value={targetRole} 
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="bg-gray-50 border border-gray-200 text-sm font-bold text-[#0b261d] rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-[#11b589]/20 cursor-pointer"
                >
                  <option value="frontend">Frontend Developer</option>
                  <option value="backend">Backend Developer</option>
                  <option value="fullstack">Fullstack</option>
                  <option value="data">Data</option>
                  <option value="java">Java Endpoint</option>
                </select>
              </h2>
              
              <div 
                className={`w-full border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center transition-all ${isDragging ? 'border-[#11b589] bg-[#d2fbf0]/30' : 'border-gray-200 hover:border-[#11b589]/50 hover:bg-gray-50/50'}`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
              >
                <input 
                  type="file" 
                  accept=".pdf" 
                  ref={fileInputRef} 
                  onChange={onFileChange} 
                  className="hidden" 
                />
                
                {loading ? (
                  <div className="flex flex-col items-center justify-center space-y-4">
                     <Loader2 className="w-12 h-12 text-[#11b589] animate-spin" />
                     <p className="text-[#08241b] font-bold animate-pulse">Analyzing with AI...</p>
                  </div>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mb-6">
                      <UploadCloud className="w-10 h-10 text-[#11b589]" />
                    </div>
                    <h3 className="text-xl font-black text-[#0b261d] mb-2">Upload your Resume</h3>
                    <p className="text-[#3b4b45]/60 font-medium text-center max-w-xs mb-6">PDF format supported. Max 5MB.</p>
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="px-8 py-4 bg-[#08241b] hover:bg-[#11b589] text-white rounded-2xl font-bold transition-all shadow-xl shadow-[#11b589]/20 flex items-center gap-2 group"
                    >
                      Browse PDF <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </>
                )}
              </div>
              
              {uploadMessage && (
                <div className={`mt-4 p-4 rounded-xl text-center font-bold ${uploadMessage.type === 'success' ? 'bg-[#d2fbf0] text-[#08241b]' : 'bg-red-50 text-red-500'}`}>
                  {uploadMessage.text}
                </div>
              )}

              {analysis && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-8 pt-8 border-t border-gray-100">
                   <h3 className="font-bold text-[#08241b] mb-4">Skill Gaps for {analysis.targetRole}</h3>
                   <div className="flex flex-wrap gap-2">
                     {analysis.missingSkills.map(s => (
                       <span key={s} className="px-3 py-1 bg-red-50 text-red-500 rounded-lg text-xs font-bold border border-red-100 uppercase">{s}</span>
                     ))}
                     {analysis.missingSkills.length === 0 && <p className="text-[#11b589] font-bold">No missing skills! You're ready.</p>}
                   </div>
                </motion.div>
              )}
            </motion.div>

            {/* Score Panel */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <div className={`bg-gradient-to-br p-8 rounded-[2rem] text-white shadow-xl shadow-[#11b589]/30 relative overflow-hidden ${analysis ? 'from-[#08241b] to-[#11b589]' : 'from-gray-700 to-gray-800'}`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-[40px]" />
                <h3 className="text-white/80 font-bold uppercase tracking-widest text-xs mb-2">ATS Score</h3>
                <div className="flex items-end gap-2 mb-6">
                  <span className="text-5xl font-black">{analysis ? analysis.coveragePercent : '??'}</span>
                  <span className="text-white/80 font-medium mb-1">/ 100</span>
                </div>
                {analysis && (
                   <ul className="space-y-3 text-sm font-medium text-white/90">
                     <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-[#d2fbf0]" /> {analysis.detectedSkills.length} Skills Detected</li>
                     <li className="flex items-center gap-3"><AlertCircle className="w-4 h-4 text-orange-300" /> {analysis.missingSkills.length} Gaps Found</li>
                   </ul>
                )}
                {!analysis && <p className="text-sm text-gray-400">Upload your resume to see your score.</p>}
              </div>

              {analysis && (
                <button 
                  onClick={() => window.location.href = '/roadmap?generate=true'}
                  className="w-full bg-white border border-[#11b589] text-[#11b589] py-5 rounded-[2rem] font-black text-lg shadow-sm hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  View My Roadmap <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
}

