import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, User, ChevronDown, ArrowUpRight } from 'lucide-react';

export default function Login() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Frontend');
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const handleGoogleLogin = () => {
    // Simulate google auth handling
    console.log("Routing to Google via Firebase...", { name, role });
  };

  const roles = ['Frontend', 'Backend'];

  return (
    <div className="min-h-screen font-sans bg-[#fbfbfa] relative overflow-hidden flex flex-col">
      {/* Abstract Background Matching Theme */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-60">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[60%] bg-[#d2fbf0] rounded-full blur-[140px]" />
        <div className="absolute top-[-5%] right-[-10%] w-[45%] h-[55%] bg-[#fae8fb] rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-white rounded-full blur-[100px]" />
      </div>



      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          {/* Tag */}
          <div className="flex justify-center mb-6">
            <div className="px-4 py-2 bg-white rounded-full flex items-center gap-2 text-sm font-bold text-[#08241b] shadow-sm border border-gray-100">
              <BookOpen className="w-4 h-4 text-[#11b589]" />
              Unlock Your Potential
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="flex flex-col items-center tracking-tighter leading-none gap-2">
              <span className="text-5xl md:text-6xl font-black text-[#0b261d]">Welcome to</span>
              <span className="text-5xl md:text-6xl font-black text-[#0b261d] ">SkillsLens</span>
            </h1>
          </div>

          {/* Login Card */}
          <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 sm:p-10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]">
            <div className="space-y-6">
              <div className="space-y-5">
                <div className="relative group">
                  <label className="block text-xs font-extrabold uppercase tracking-widest text-[#3b4b45] mb-2 ml-1">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-[#3b4b45]/80 group-focus-within:text-[#11b589] transition-colors" />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full bg-white border border-gray-200 shadow-sm rounded-2xl py-3.5 pl-11 pr-4 text-[#08241b] focus:outline-none focus:ring-2 focus:ring-[#11b589]/50 focus:border-[#11b589] transition-all font-bold placeholder:text-[#3b4b45]/60"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-xs font-extrabold uppercase tracking-widest text-[#3b4b45] mb-2 ml-1">Select Role</label>
                  <div className="relative cursor-pointer" onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}>
                    <div className="w-full bg-white border border-gray-200 shadow-sm hover:border-gray-300 rounded-2xl py-3.5 pl-4 pr-11 text-[#08241b] font-bold flex justify-between items-center transition-all">
                      {role}
                      <ChevronDown className={`h-5 w-5 text-[#3b4b45]/80 transition-transform duration-300 absolute right-4 ${isRoleDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  <AnimatePresence>
                    {isRoleDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-2xl border border-gray-100 rounded-xl overflow-hidden shadow-xl z-20"
                      >
                        {roles.map((r) => (
                          <div
                            key={r}
                            className={`px-5 py-3.5 cursor-pointer hover:bg-[#d2fbf0] hover:text-[#08241b] transition-colors ${role === r ? 'bg-[#d2fbf0]/80 text-[#08241b] font-bold' : 'text-gray-600 font-medium'}`}
                            onClick={() => {
                              setRole(r);
                              setIsRoleDropdownOpen(false);
                            }}
                          >
                            {r}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-[#08241b] border border-gray-200 rounded-2xl py-4 transition-all shadow-sm group"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="font-extrabold text-sm tracking-wide">Continue to Google</span>
              </button>
            </div>
          </div>
        </motion.div>
      </main>
      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-gray-400 text-sm font-medium">
        <p>© 2026 SkillsLens. All rights reserved.</p>
      </footer>

    </div>
  );
}
