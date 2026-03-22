import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Resume from "./pages/Resume.jsx";
import Quiz from "./pages/Quiz.jsx";
import Results from "./pages/Results.jsx";
import Match from "./pages/Match.jsx";
import Company from "./pages/Company.jsx";
import Interview from "./pages/Interview.jsx";
import Summary from "./pages/Summary.jsx";
import Roadmap from "./pages/Roadmap.jsx";
import RoadmapModal from "./pages/RoadmapModal.jsx";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 min-h-screen w-full min-w-0 p-6 lg:p-8 lg:ml-[240px]">
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
            <Route path="/match" element={<Match />} />
            <Route path="/company" element={<Company />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/roadmap-modal" element={<RoadmapModal />} />
            <Route path="/" element={<Dashboard />} />
            <Route
              path="*"
              element={
                <div className="max-w-5xl mx-auto space-y-4">
                  <p className="text-xs text-[#8D8E8F]">Home / Not found</p>
                  <h1 className="text-3xl font-extrabold text-[#011813] tracking-tight">
                    404 — Page not found
                  </h1>
                  <p className="text-sm text-[#313233] leading-relaxed">
                    The page you requested does not exist.
                  </p>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
