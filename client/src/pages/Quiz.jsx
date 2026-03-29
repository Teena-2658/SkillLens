import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Trophy, Clock, Target, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Quiz() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { "Authorization": `Bearer ${token}` };
        const [skillsRes, profRes] = await Promise.all([
          fetch("http://localhost:5800/api/quiz/skills", { headers }),
          fetch("http://localhost:5800/api/quiz/profiles", { headers })
        ]);
        const skillsData = await skillsRes.json();
        const profData = await profRes.json();
        if (skillsData.success && skillsData.data?.skills) {
           const profilesMap = (profData.data?.profiles || []).reduce((acc, p) => { acc[p.skill] = p; return acc; }, {});
           const mappedQuizzes = skillsData.data.skills.map(skill => {
             const prof = profilesMap[skill];
             return {
               title: skill.charAt(0).toUpperCase() + skill.slice(1) + " Proficiency",
               category: "Assessment", time: "10 min", questions: 10, difficulty: "Adaptive",
               completed: prof && prof.quizAttempts > 0,
               score: prof ? `${Math.round((prof.depthScore / 10) * 100)}%` : "0%",
               rawSkill: skill
             };
           });
           setQuizzes(mappedQuizzes);
        }
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchQuizzes();
  }, []);

  const startQuiz = async (skill) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5800/api/quiz/questions", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ skills: [skill] })
      });
      const data = await res.json();
      if (data.success) {
        setActiveQuiz(data.data.questions);
        setCurrentQuestionIdx(0);
        setAnswers([]);
      }
    } catch (err) { alert("Failed to start quiz"); } finally { setLoading(false); }
  };

  const handleAnswer = (questionId, selectedIdx) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIdx] = { questionId, selectedIndex: selectedIdx };
    setAnswers(newAnswers);
  };

  const submitFinalQuiz = async () => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5800/api/quiz/submit", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ answers, timeSpentSeconds: 60 })
      });
      const data = await res.json();
      if (data.success) {
        navigate(`/results?id=${data.data.attemptId}`);
      }
    } catch (err) { alert("Submission failed"); } finally { setSubmitting(false); }
  };

  if (activeQuiz) {
    const q = activeQuiz[currentQuestionIdx];
    return (
      <div className="min-h-screen bg-[#f8faf9] flex flex-col items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-2xl bg-white rounded-[2rem] p-10 shadow-xl border border-gray-100">
           <div className="flex justify-between items-center mb-8">
             <span className="text-[#11b589] font-black uppercase tracking-widest text-xs">Question {currentQuestionIdx + 1} / {activeQuiz.length}</span>
             <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-400">{q.skill} · {q.difficulty}</span>
           </div>
           
           <h2 className="text-2xl font-black text-[#0b261d] mb-8 leading-tight">{q.question}</h2>
           
           <div className="space-y-4">
             {q.options.map((opt, idx) => (
               <button 
                 key={idx}
                 onClick={() => handleAnswer(q.id, idx)}
                 className={`w-full p-5 rounded-2xl text-left font-bold transition-all border-2 ${answers[currentQuestionIdx]?.selectedIndex === idx ? 'border-[#11b589] bg-[#d2fbf0]/30 text-[#08241b]' : 'border-gray-50 bg-gray-50/50 text-[#3b4b45] hover:border-gray-200'}`}
               >
                 <span className="inline-block w-8 h-8 rounded-lg bg-white shadow-sm mr-4 text-center leading-8 text-xs">{String.fromCharCode(65 + idx)}</span>
                 {opt}
               </button>
             ))}
           </div>

           <div className="mt-10 flex gap-4">
             {currentQuestionIdx > 0 && (
               <button onClick={() => setCurrentQuestionIdx(prev => prev - 1)} className="flex-1 py-4 bg-gray-100 text-[#3b4b45] rounded-xl font-bold hover:bg-gray-200 transition-all">Previous</button>
             )}
             {currentQuestionIdx < activeQuiz.length - 1 ? (
               <button 
                 disabled={answers[currentQuestionIdx] === undefined}
                 onClick={() => setCurrentQuestionIdx(prev => prev + 1)} 
                 className="flex-[2] py-4 bg-[#08241b] text-white rounded-xl font-bold hover:bg-[#11b589] disabled:opacity-50 transition-all"
               >
                 Next Question
               </button>
             ) : (
               <button 
                 disabled={submitting || answers[currentQuestionIdx] === undefined}
                 onClick={submitFinalQuiz}
                 className="flex-[2] py-4 bg-[#11b589] text-white rounded-xl font-bold hover:bg-[#0e9671] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
               >
                 {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Finish & Score"}
               </button>
             )}
           </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf9] relative overflow-hidden flex flex-col pt-4 pb-12 px-6">
      <div className="absolute top-[-10%] right-[10%] w-[30%] h-[40%] bg-[#d2fbf0] rounded-full blur-[140px] pointer-events-none opacity-50" />
      <main className="flex-1 w-full max-w-6xl mx-auto relative z-10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-black text-[#0b261d] tracking-tight">Skill Quizzes</h1>
              <span className="px-3 py-1 bg-[#11b589] text-white rounded-xl text-xs font-bold shadow-lg shadow-[#11b589]/30">{quizzes.length} Available</span>
            </div>
            <p className="text-[#3b4b45]/70 font-medium text-lg max-w-xl">
              Test your knowledge to pinpoint exact areas of improvement. These quizzes directly sync with your personalized roadmap.
            </p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Global Rank</p>
              <p className="text-xl font-black text-[#08241b]">Top 15%</p>
            </div>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-[#11b589] mb-4" />
            <p className="text-[#3b4b45] font-bold">Loading quizzes...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
             {quizzes.map((quiz, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={index}
                  className="bg-white backdrop-blur-xl border border-gray-100 hover:border-[#11b589]/30 rounded-[2rem] p-8 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_40px_-10px_rgba(17,181,137,0.15)] transition-all group flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <span className="px-3 py-1.5 bg-[#f0f4f3] text-[#08241b] rounded-lg text-xs font-bold tracking-widest uppercase">{quiz.category}</span>
                      {quiz.completed ? (
                         <span className="bg-[#d2fbf0] text-[#11b589] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1">
                           <CheckCircle2 className="w-3 h-3" /> {quiz.score}
                         </span>
                      ) : (
                         <span className="bg-orange-50 text-orange-500 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1">
                           <Target className="w-3 h-3" /> {quiz.difficulty}
                         </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-black text-[#0b261d] mb-3 leading-tight group-hover:text-[#11b589] transition-colors">{quiz.title}</h3>
                    <div className="flex items-center gap-4 text-sm font-medium text-gray-500 mb-8">
                       <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {quiz.time}</span>
                       <span className="flex items-center gap-1.5"><Target className="w-4 h-4" /> {quiz.questions} Qs</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => startQuiz(quiz.rawSkill)} 
                    className={`w-full py-4 rounded-[1.5rem] font-black text-lg transition-all flex items-center justify-center gap-2 ${
                      quiz.completed 
                      ? 'bg-white border-2 border-[#11b589] text-[#11b589] hover:bg-[#11b589] hover:text-white' 
                      : 'bg-[#08241b] text-white hover:bg-[#11b589] shadow-xl shadow-[#08241b]/20 hover:shadow-[#11b589]/30'
                    }`}
                  >
                     {quiz.completed ? 'Retake Quiz' : 'Start Quiz'} <ArrowRight className="w-5 h-5" />
                  </button>
                 </motion.div>
             ))}
          </div>
        )}
      </main>
    </div>
  );
}
