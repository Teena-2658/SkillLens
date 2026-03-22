import React from 'react';

export default function RoadmapModal() {
  return (
    <>
            <div className="min-h-screen font-sans bg-[#fbfbfa]  relative overflow-hidden flex flex-col pt-4 pb-12 px-6">
        <main className="flex-1 w-full max-w-6xl mx-auto relative z-10 space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-3xl font-black text-[#0b261d] tracking-tight">Roadmap Modal Detail</h1>
            <div className="px-3 py-1 bg-[#11b589]/10 text-[#11b589] rounded-lg text-sm font-bold border border-[#11b589]/20">/roadmap-modal</div>
          </div>
          <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]">
            <h2 className="text-2xl font-bold text-[#08241b] mb-4">Module Insights</h2>
            <p className="text-[#3b4b45]/70">This is the Roadmap Modal page. It will act as a detailed pop-up view for a specific roadmap item in the future.</p>
          </div>
        </main>
      </div>
    </>
  );
}
