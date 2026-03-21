import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Apne components import karein
import Sidebar from './components/Sidebar';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Resume from './pages/Resume.jsx';
import Quiz from './pages/Quiz.jsx';
import Results from './pages/Results.jsx';
import Match from './pages/Match.jsx';
import Company from './pages/Company.jsx';
import Interview from './pages/Interview.jsx';
import Summary from './pages/Summary.jsx';
import Roadmap from './pages/Roadmap.jsx';
import RoadmapModal from './pages/RoadmapModal.jsx';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-[#f8faf9]">

        {/* Sidebar hamesha left mein fixed rahega */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 w-full">
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

            {/* Default Route */}
            <Route path="/" element={<Dashboard />} />

            {/* Agar koi aisi link par jaye jo exist nahi karti */}
            <Route path="*" element={<div className="lg:ml-[280px] p-10 pt-32">404 - Page Not Found</div>} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;