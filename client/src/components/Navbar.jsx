import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: 'Login', path: '/login' },
    { name: 'Dashboard', path: '/dashboard' }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl px-6 py-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex justify-between items-center">
          
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-[#11b589]/10 p-2 rounded-xl group-hover:bg-[#11b589]/20 transition-colors">
              <BookOpen className="w-5 h-5 text-[#11b589]" />
            </div>
            <span className="text-xl font-black text-[#0b261d] tracking-tight">SkillsLens</span>
          </Link>

          <div className="flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (location.pathname === '/' && link.path === '/login');
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative px-4 py-2 text-sm font-bold transition-colors"
                >
                  {isActive ? (
                    <>
                      <span className="relative z-10 text-[#08241b]">{link.name}</span>
                      <motion.div 
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-[#d2fbf0] rounded-xl -z-0"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    </>
                  ) : (
                    <span className="text-gray-500 hover:text-[#08241b]">{link.name}</span>
                  )}
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </nav>
  );
}
