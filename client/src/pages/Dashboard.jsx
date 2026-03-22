import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Target,
  BookOpen,
  Brain,
  Briefcase,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <div className="max-w-5xl mx-auto space-y-8 relative">
        {/* Page title */}
        <div className="mb-8 relative">
          <p className="text-xs text-[#8D8E8F] mb-2">Home / Dashboard</p>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-extrabold text-[#011813] tracking-tight">
              Dashboard
            </h1>
            <span className="bg-[#E8FAF5] border border-[rgba(0,157,119,0.2)] text-[#009D77] text-xs font-mono font-semibold px-3 py-1 rounded-full">
              /dashboard
            </span>
            <span className="text-xs text-[#8D8E8F] font-medium">
              Protected · JWT required
            </span>
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 dot-grid opacity-60 rounded-xl pointer-events-none hidden sm:block" />
        </div>

        {/* Greeting */}
        <div className="bg-white/75 backdrop-blur-sm border border-[rgba(0,157,119,0.12)] rounded-2xl p-5 hover:border-[rgba(0,157,119,0.30)] transition-colors duration-200 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h2 className="text-2xl font-bold text-[#011813] tracking-tight mb-2">
              Good morning, Rahul
            </h2>
            <p className="text-sm text-[#313233] leading-relaxed">
              Backend developer · 68 days to placement season
            </p>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FBF4C0] text-[#011813] text-sm font-bold border border-[rgba(0,157,119,0.12)]">
              <AlertCircle className="w-4 h-4 text-[#009D77]" />
              68 days left
            </div>
            <p className="text-xs text-[#8D8E8F] font-medium">
              Last active 2h ago
            </p>
          </div>
        </div>

        {/* Readiness */}
        <div className="bg-white/75 backdrop-blur-sm border border-[rgba(0,157,119,0.12)] rounded-2xl p-5 hover:border-[rgba(0,157,119,0.30)] transition-colors duration-200">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-shrink-0 flex flex-col items-center text-center md:text-left md:items-start">
              <div className="bg-[#011813] rounded-2xl p-5 text-white w-full max-w-[200px]">
                <div className="text-5xl font-extrabold tracking-tight leading-none mb-1">
                  62
                  <span className="text-2xl text-[rgba(255,255,255,0.45)]">
                    /100
                  </span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[rgba(255,255,255,0.55)] mb-3">
                  Readiness
                </div>
                <span className="inline-block bg-[#E8FAF5] text-[#009D77] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  Almost there
                </span>
              </div>
            </div>

            <div className="flex-1 w-full space-y-8 min-w-0">
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#8D8E8F] mb-2">
                  <span>0</span>
                  <span className="text-[#009D77]">62 / 100</span>
                  <span>100</span>
                </div>
                <div className="w-full h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "62%" }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-[#009D77] rounded-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-[#E8FAF5] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-[#009D77]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8D8E8F]">
                      Skills
                    </span>
                  </div>
                  <div className="text-2xl font-extrabold text-[#011813]">
                    56%
                  </div>
                  <p className="text-xs text-[#8D8E8F] font-medium mt-1">
                    Depth score
                  </p>
                </div>
                <div className="bg-[#E8FAF5] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-4 h-4 text-[#009D77]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8D8E8F]">
                      Interview
                    </span>
                  </div>
                  <div className="text-2xl font-extrabold text-[#011813]">
                    65%
                  </div>
                  <p className="text-xs text-[#8D8E8F] font-medium mt-1">
                    Mock avg.
                  </p>
                </div>
                <div className="bg-[#E8FAF5] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-[#009D77]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8D8E8F]">
                      Roadmap
                    </span>
                  </div>
                  <div className="text-2xl font-extrabold text-[#011813]">
                    37%
                  </div>
                  <p className="text-xs text-[#8D8E8F] font-medium mt-1">
                    Completion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/75 backdrop-blur-sm border border-[rgba(0,157,119,0.12)] rounded-2xl p-5 hover:border-[rgba(0,157,119,0.30)] transition-colors duration-200 flex flex-col">
            <h3 className="text-base font-bold text-[#011813] mb-6">
              Top Matches
            </h3>
            <div className="space-y-5 flex-1">
              {[
                { name: "TCS", score: 78, strong: true },
                { name: "Wipro", score: 71, strong: true },
                { name: "Razorpay", score: 31, strong: false },
              ].map((company) => (
                <div key={company.name} className="flex items-center gap-4">
                  <div className="w-24 text-sm font-semibold text-[#011813] shrink-0">
                    {company.name}
                  </div>
                  <div className="flex-1 h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden min-w-0">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${company.score}%` }}
                      transition={{ duration: 1, delay: 0.35 }}
                      className={`h-full rounded-full ${
                        company.strong ? "bg-[#009D77]" : "bg-[#EA4C89]"
                      }`}
                    />
                  </div>
                  <div
                    className={`w-12 text-right text-sm font-bold shrink-0 ${
                      company.strong ? "text-[#009D77]" : "text-[#EA4C89]"
                    }`}
                  >
                    {company.score}%
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/match"
              className="mt-8 w-full flex items-center justify-center gap-2 border border-[rgba(0,157,119,0.3)] text-[#009D77] text-sm font-semibold px-5 py-2.5 rounded-xl bg-transparent hover:bg-[#E8FAF5] transition-colors duration-150"
            >
              View all 25
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white/75 backdrop-blur-sm border border-[rgba(0,157,119,0.12)] rounded-2xl p-5 hover:border-[rgba(0,157,119,0.30)] transition-colors duration-200 flex flex-col">
            <h3 className="text-base font-bold text-[#011813] mb-6">
              Next step
            </h3>
            <div className="bg-[#E8FAF5]/60 rounded-2xl p-5 flex-1 flex flex-col justify-center relative overflow-hidden border border-[rgba(0,157,119,0.12)]">
              <div className="absolute top-3 right-3 opacity-[0.12] pointer-events-none">
                <Brain className="w-20 h-20 text-[#009D77]" />
              </div>
              <h4 className="text-xl font-bold text-[#011813] mb-2 relative z-10">
                Retake the MongoDB quiz
              </h4>
              <p className="text-sm text-[#313233] leading-relaxed relative z-10">
                Weakest skill · 30% depth ·{" "}
                <span className="text-[#009D77] font-semibold">
                  +7 pts expected
                </span>
              </p>
            </div>
            <Link
              to="/quiz"
              className="mt-6 w-full flex items-center justify-center gap-2 bg-[#009D77] text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-[#008a68] transition-colors duration-150"
            >
              Go to MongoDB quiz
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="bg-white/75 backdrop-blur-sm border border-[rgba(0,157,119,0.12)] rounded-2xl p-5 hover:border-[rgba(0,157,119,0.30)] transition-colors duration-200">
          <h3 className="text-base font-bold text-[#011813] mb-8">
            Readiness score history
          </h3>
          <div className="h-48 flex items-end justify-between gap-2">
            {[
              { date: "Mar 1", height: "15%", active: false },
              { date: "Mar 5", height: "25%", active: false },
              { date: "Mar 8", height: "35%", active: false },
              { date: "Mar 11", height: "40%", active: false },
              { date: "Mar 15", height: "42%", active: false },
              { date: "Mar 17", height: "45%", active: false },
              { date: "Mar 19", height: "62%", active: true },
            ].map((bar) => (
              <div
                key={bar.date}
                className="flex flex-col items-center flex-1 h-full justify-end min-w-0"
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: bar.height }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`w-full max-w-[3rem] rounded-t-lg transition-colors duration-200 ${
                    bar.active ? "bg-[#009D77]" : "bg-[#BDF1E5]"
                  }`}
                />
                <div
                  className={`mt-3 text-xs font-semibold ${
                    bar.active ? "text-[#009D77]" : "text-[#8D8E8F]"
                  }`}
                >
                  {bar.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className="cta-gradient rounded-3xl p-12 text-center mb-8">
          <h2 className="text-3xl font-extrabold text-[#011813] mb-3 tracking-tight">
            Stay placement-ready
          </h2>
          <p className="text-sm text-[#313233] mb-8 max-w-md mx-auto leading-relaxed">
            Get weekly tips and role alerts tailored for Indian engineering
            campuses.
          </p>
          <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-2 max-w-sm mx-auto border border-[#E7E7E8]">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 text-sm outline-none border-none text-[#011813] placeholder:text-[#8D8E8F] bg-transparent"
            />
            <button
              type="button"
              className="bg-[#009D77] text-white text-sm font-bold px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-[#008a68] transition-colors duration-150 shrink-0"
            >
              Join With Us →
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
