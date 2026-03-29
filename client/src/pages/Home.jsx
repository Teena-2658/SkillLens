import React from "react";
import { motion } from "framer-motion";
import {
   ArrowRight,
   FileText,
   Brain,
   Target,
   Mic,
   Map as MapIcon,
   BarChart3,
   Sparkles,
   Star,
   Github,
   Linkedin,
   Globe,
   PlayCircle
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
   return (
      <div className="bg-slate-50 min-h-screen font-sans selection:bg-[#1a9e7a]/20 overflow-x-hidden text-slate-800">

         {/* NAVIGATION */}
         <nav className="fixed top-0 left-0 w-full z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
               <div className="flex items-center gap-3 group cursor-pointer">
                  <motion.div
                     whileHover={{ rotate: 10, scale: 1.05 }}
                     className="w-10 h-10 bg-gradient-to-br from-[#1a9e7a] to-[#147a5e] rounded-xl flex items-center justify-center shadow-lg shadow-[#1a9e7a]/30"
                  >
                     <Target className="w-6 h-6 text-white" />
                  </motion.div>
                  <span className="text-2xl font-extrabold tracking-tight text-slate-800 group-hover:text-[#1a9e7a] transition-colors">SkillLens</span>
               </div>

               <div className="hidden lg:flex items-center gap-10 text-[14px] font-semibold text-slate-600">
                  <a href="#features" className="hover:text-[#1a9e7a] transition-colors">Platform</a>
                  <a href="#workflow" className="hover:text-[#1a9e7a] transition-colors">How it Works</a>
                  <a href="#stories" className="hover:text-[#1a9e7a] transition-colors">Success Stories</a>
               </div>

               <div className="flex items-center gap-6">
                  <Link to="/login" className="hidden md:block text-sm font-bold text-slate-600 hover:text-[#1a9e7a] transition-colors">Sign In</Link>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                     <Link to="/login" className="bg-gradient-to-r from-[#1a9e7a] to-[#128a69] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#1a9e7a]/25 hover:shadow-[#1a9e7a]/40 transition-all border border-[#1a9e7a]/20">
                        Get Started Free
                     </Link>
                  </motion.div>
               </div>
            </div>
         </nav>

         {/* HERO SECTION */}
         <section className="pt-40 pb-20 md:pt-52 md:pb-32 px-6 relative overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#1a9e7a]/15 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#e8496a]/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="space-y-8 flex-1 text-center lg:text-left relative z-10"
               >
                  <motion.div
                     whileHover={{ scale: 1.02 }}
                     className="inline-flex items-center gap-2 bg-white text-[#1a9e7a] px-4 py-2 rounded-full text-xs font-bold border border-slate-200 shadow-sm"
                  >
                     <span className="w-2 h-2 bg-[#1a9e7a] rounded-full animate-pulse" />
                     The standard for technical readiness
                  </motion.div>
                  <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.15] tracking-tight text-slate-800">
                     A precision platform for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a9e7a] to-[#e8496a]">modern careers.</span>
                  </h1>
                  <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium mx-auto lg:mx-0 max-w-2xl">
                     SkillLens systematically analyzes your resume, evaluates your depth through adaptive engineering quizzes, and tailors a roadmap directly to your target role.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                     <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link to="/login" className="bg-[#1a9e7a] text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center shadow-xl shadow-[#1a9e7a]/20 transition-all gap-2 hover:bg-[#147a5e]">
                           Start Your Evaluation <ArrowRight className="w-5 h-5" />
                        </Link>
                     </motion.div>
                     <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white text-slate-700 border border-slate-200 flex items-center justify-center px-8 py-4 rounded-xl font-bold text-lg hover:border-slate-300 hover:text-slate-900 shadow-sm hover:bg-slate-50 transition-all gap-2"
                     >
                        <PlayCircle className="w-5 h-5 text-slate-400" /> Watch Platform Demo
                     </motion.button>
                  </div>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex-1 w-full max-w-2xl lg:max-w-none relative"
               >
                  {/* Glassmorphism Dashboard Mockup */}
                  <div className="bg-white/40 backdrop-blur-2xl p-4 rounded-[2.5rem] shadow-[0_30px_100px_-15px_rgba(0,0,0,0.08)] border border-white/60 relative z-20 overflow-hidden transform lg:rotate-[2deg] hover:rotate-0 transition-transform duration-700 ease-out">
                     <div className="bg-white rounded-[2rem] overflow-hidden p-8 shadow-sm border border-slate-100 space-y-8">
                        <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-4">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                                 <div className="w-5 h-5 bg-gradient-to-r from-[#1a9e7a] to-[#e8496a] rounded-full" />
                              </div>
                              <div>
                                 <h3 className="text-slate-800 font-bold">Welcome back, Developer</h3>
                                 <p className="text-xs text-slate-400 font-medium tracking-wide">Target: Standard Software Track</p>
                              </div>
                           </div>
                        </div>

                        <div className="bg-gradient-to-r from-[#1a9e7a] to-[#e8496a] p-8 rounded-[1.5rem] text-white shadow-lg space-y-6">
                           <div className="flex justify-between items-end">
                              <div>
                                 <p className="text-4xl font-extrabold mb-1">82%</p>
                                 <p className="text-xs font-bold uppercase tracking-wider text-white/80">Skill Match Readiness</p>
                              </div>
                              <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-bold tracking-wide">
                                 On Track
                              </div>
                           </div>
                           <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                              <div className="h-full bg-white rounded-full w-[82%]" />
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                           <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-center justify-between">
                              <div>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Skills</p>
                                 <p className="text-xl font-extrabold text-slate-800">14 Verified</p>
                              </div>
                              <Target className="w-8 h-8 text-[#1a9e7a] opacity-50" />
                           </div>
                           <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-center justify-between">
                              <div>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Platform Auth</p>
                                 <p className="text-xl font-extrabold text-slate-800">Secured</p>
                              </div>
                              <BarChart3 className="w-8 h-8 text-[#e8496a] opacity-50" />
                           </div>
                        </div>
                     </div>
                  </div>
               </motion.div>
            </div>
         </section>

         {/* STATS SECTION */}
         <section className="py-16 bg-white border-y border-slate-200">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
               <StatBox value="98%" label="Accuracy Rate" color="text-[#1a9e7a]" />
               <StatBox value="1M+" label="Data Points Analyzed" color="text-[#e8496a]" />
               <StatBox value="45+" label="Supported Roles" color="text-[#e8496a]" />
               <StatBox value="24/7" label="AI Availability" color="text-slate-800" />
            </div>
         </section>

         {/* FEATURES SECTION */}
         <section id="features" className="py-24 px-6 relative">
            <div className="max-w-7xl mx-auto">
               <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                  <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-800">Engineered for precision.</h2>
                  <p className="text-lg text-slate-500 font-medium">A suite of interconnected tools mapping your current knowledge to enterprise-level requirements.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <ProfessionalFeature 
                     icon={FileText} 
                     title="Intelligent Parsing" 
                     desc="Automated extraction of experience and skill metadata directly from your existing resume documents." 
                  />
                  <ProfessionalFeature 
                     icon={Brain} 
                     title="Adaptive Assessment" 
                     desc="Dynamic questioning matrices that intelligently calibrate to gauge your precise technical depth." 
                     accent="pink"
                  />
                  <ProfessionalFeature 
                     icon={MapIcon} 
                     title="Generative Roadmaps" 
                     desc="Automated learning trajectories built dynamically based on your identified capability gaps." 
                     accent="pink"
                  />
                  <ProfessionalFeature 
                     icon={Target} 
                     title="Market Alignment" 
                     desc="Benchmark your current readiness against contemporary industry standard requirements." 
                     accent="pink"
                  />
                  <ProfessionalFeature 
                     icon={Mic} 
                     title="Dialogue Simulation" 
                     desc="Context-aware AI interview environments with instantaneous micro-feedback loops." 
                     accent="pink"
                  />
                  <ProfessionalFeature 
                     icon={BarChart3} 
                     title="Performance Analytics" 
                     desc="Comprehensive dashboards tracking velocity, improvement vectors, and testing history." 
                  />
               </div>
            </div>
         </section>

         {/* WORKFLOW SECTION */}
         <section id="workflow" className="py-24 px-6 bg-white border-t border-slate-100">
            <div className="max-w-7xl mx-auto">
               <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800">Seamless integration pipeline</h2>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <WorkflowNode step="01" title="Data Ingestion" desc="Provide your resume to initialize your technical profile state." />
                  <WorkflowNode step="02" title="Calibration" desc="Engage with focused assessments to verify depth assertions." />
                  <WorkflowNode step="03" title="Analysis" desc="Review generated gap matrices and alignment metrics." />
                  <WorkflowNode step="04" title="Execution" desc="Follow the AI-generated curriculum to address deficits." />
               </div>
            </div>
         </section>

         {/* CALL TO ACTION */}
         <section className="py-24 px-6">
            <div className="max-w-5xl mx-auto">
               <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-[#1a9e7a] to-[#e8496a] p-12 md:p-20 rounded-[3rem] text-center text-white relative overflow-hidden shadow-2xl shadow-[#1a9e7a]/20"
               >
                  <div className="absolute top-0 left-0 w-full h-full bg-white/5 pattern-diagonal-lines pointer-events-none" />
                  <div className="relative z-10 space-y-8 flex flex-col items-center">
                     <Sparkles className="w-12 h-12 text-white/90" />
                     <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">Deploy your potential.</h2>
                     <p className="text-xl text-white/80 font-medium max-w-2xl">
                        Join the professionals utilizing structured analysis to accelerate their career trajectories. Setup takes less than two minutes.
                     </p>
                     <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="pt-4">
                        <Link to="/login" className="bg-white text-[#1a9e7a] px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-2">
                           Create Free Account <ArrowRight className="w-5 h-5" />
                        </Link>
                     </motion.div>
                  </div>
               </motion.div>
            </div>
         </section>

         {/* FOOTER */}
         <footer className="bg-white py-12 px-6 border-t border-slate-200">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
               <div className="flex items-center gap-2">
                  <Target className="w-6 h-6 text-[#1a9e7a]" />
                  <span className="text-xl font-extrabold text-slate-800 tracking-tight">SkillLens</span>
               </div>
               <p className="text-sm font-medium text-slate-400">© 2026 SkillLens Technologies. All rights reserved.</p>
               <div className="flex gap-6">
                  <Github className="w-5 h-5 text-slate-400 hover:text-[#1a9e7a] transition-colors cursor-pointer" />
                  <Linkedin className="w-5 h-5 text-slate-400 hover:text-[#1a9e7a] transition-colors cursor-pointer" />
                  <Globe className="w-5 h-5 text-slate-400 hover:text-[#1a9e7a] transition-colors cursor-pointer" />
               </div>
            </div>
         </footer>
      </div>
   );
}

// Subcomponents

function StatBox({ value, label, color }) {
   return (
      <div className="p-4 space-y-2">
         <div className={`text-4xl md:text-5xl font-extrabold ${color}`}>{value}</div>
         <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{label}</div>
      </div>
   );
}

function ProfessionalFeature({ icon: Icon, title, desc, accent = "green" }) {
   const accentColors = {
      green: "text-[#1a9e7a] bg-[#1a9e7a]/10",
      blue: "text-[#0ea5e9] bg-[#0ea5e9]/10",
      pink: "text-[#e8496a] bg-[#e8496a]/10"
   };
   
   return (
      <motion.div 
         whileHover={{ y: -8 }}
         className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all cursor-default"
      >
         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${accentColors[accent]}`}>
            <Icon className="w-7 h-7" />
         </div>
         <h3 className="text-xl font-extrabold text-slate-800 mb-3">{title}</h3>
         <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
      </motion.div>
   );
}

function WorkflowNode({ step, title, desc }) {
   return (
      <motion.div 
         whileHover={{ scale: 1.02 }}
         className="bg-slate-50 p-8 rounded-3xl border border-slate-200 relative overflow-hidden group"
      >
         <div className="text-5xl font-black text-slate-200/60 absolute -top-2 -right-2 transform group-hover:scale-110 transition-transform duration-500">
            {step}
         </div>
         <div className="block mt-6 space-y-3 relative z-10">
            <h4 className="text-lg font-extrabold text-slate-800">{title}</h4>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">{desc}</p>
         </div>
      </motion.div>
   );
}

