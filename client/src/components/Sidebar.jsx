import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, LogIn, UserPlus, LayoutDashboard, FileUp, Clock, CheckSquare, Target, Building2, TrendingUp, FileText, Map, Eye, Settings } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function Sidebar() {
  const location = useLocation();

  const sections = [

    {
      title: 'CORE',
      items: [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, badge: 'P3' },
        { name: 'Resume Upload', path: '/resume', icon: FileUp, badge: 'P4' },
        { name: 'Skill Quiz', path: '/quiz', icon: Clock, badge: 'P5' },
        { name: 'Quiz Results', path: '/results', icon: CheckSquare, badge: 'NEW', isNew: true },
      ]
    },
    {
      title: 'INTELLIGENCE',
      items: [
        { name: 'Company Match', path: '/match', icon: Target, badge: 'P6' },
        { name: 'Company Detail', path: '/company', icon: Building2, badge: 'NEW', isNew: true },
        { name: 'Interview', path: '/interview', icon: TrendingUp, badge: 'P7' },
        { name: 'Interview Summary', path: '/summary', icon: FileText, badge: 'NEW', isNew: true },
        { name: 'Roadmap', path: '/roadmap', icon: Map, badge: 'P8' },
        { name: 'Roadmap Modal', path: '/roadmap-modal', icon: Eye, badge: 'NEW', isNew: true },
        { name: 'Profile / Settings', path: '/profile', icon: Settings, badge: 'NEW', isNew: true },
      ]
    }
  ];

  return (
    <div className="fixed top-0 left-0 h-full w-[280px] bg-white/80 backdrop-blur-xl border-r border-white shadow-[10px_0_40px_-10px_rgba(0,0,0,0.05)] z-50 flex flex-col p-6 hidden lg:flex custom-scrollbar overflow-y-auto">

      {/* Brand */}
      <Link to="/" className="flex flex-col items-start gap-1 mb-10">
        <div className="flex items-center gap-2 group cursor-pointer mb-1">
          <div className="bg-[#11b589]/10 p-2 rounded-xl group-hover:bg-[#11b589]/20 transition-colors">
            <BookOpen className="w-5 h-5 text-[#11b589]" />
          </div>
          <span className="text-2xl font-black text-[#0b261d] tracking-tight">SkillsLens</span>
        </div>
        <div className="text-[10px] font-black text-[#3b4b45]/40 uppercase tracking-widest pl-1">
          UI Design Doc • 13 Screens
        </div>
      </Link>

      {/* Nav Sections */}
      <nav className="flex-1 space-y-8 pb-10">
        {sections.map(section => (
          <div key={section.title}>
            <h3 className="text-[11px] font-black text-[#3b4b45]/40 uppercase tracking-widest mb-3 pl-2">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map(item => {
                const isActive = location.pathname === item.path || (location.pathname === '/' && item.path === '/login');

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="relative flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group overflow-hidden"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute inset-0 bg-[#d2fbf0]/80 rounded-xl"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}

                    <div className="relative z-10 flex items-center gap-3">
                      <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-[#11b589]' : 'text-[#3b4b45]/50 group-hover:text-[#11b589]'}`} />
                      <span className={`text-sm font-bold transition-colors ${isActive ? 'text-[#08241b]' : 'text-[#3b4b45]/60 group-hover:text-[#08241b]'}`}>
                        {item.name}
                      </span>
                    </div>

                    <div className="relative z-10 flex items-center">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${item.isNew ? 'bg-[#11b589]/10 text-[#11b589] border border-[#11b589]/20' : 'bg-gray-100 text-gray-400 border border-transparent group-hover:border-gray-200'}`}>
                        {item.badge}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}
