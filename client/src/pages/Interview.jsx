import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, ShieldAlert, Cpu, Settings2, Loader2, MessageSquare } from 'lucide-react';

export default function Interview() {
  const [isRecording, setIsRecording] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [transcript, setTranscript] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [feedback, setFeedback] = useState([]);
  const [mode, setMode] = useState("audio"); // "audio" or "text"
  const [hasStarted, setHasStarted] = useState(false);

  // Use Speech Recognition and Synthesis
  const recognition = window.SpeechRecognition || window.webkitSpeechRecognition 
    ? new (window.SpeechRecognition || window.webkitSpeechRecognition)() 
    : null;

  if (recognition) {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      let currentTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setTranscript(currentTranscript);
    };
  }

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    synth.speak(utterance);
  };

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch("http://localhost:5800/api/interview", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setQuestions(data.data.questions);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInterview();
  }, []);

  const startInterview = () => {
    setHasStarted(true);
    if (questions.length > 0) {
       speak(questions[0].question);
    }
  };

  const handleNext = () => {
    if (mode === "audio" && !isRecording) {
      startRecording();
      return;
    }

    // Submit Log
    const currentQ = questions[currentIdx];
    const newFeedback = {
      question: currentQ.question,
      ideal: currentQ.ideal,
      answer: transcript,
      sentiment: transcript.length > 50 ? "professional" : "brief",
      rating: transcript.length > 100 ? 5 : 3,
      improvement: transcript.length < 50 ? "Add more technical details and specific examples." : "Great clarity, try to summarize the final impact of your choice."
    };
    
    const updatedFeedback = [...feedback, newFeedback];
    setFeedback(updatedFeedback);
    
    if (isRecording) stopRecording();

    const nextIdx = currentIdx + 1;
    if (nextIdx < questions.length) {
      setCurrentIdx(nextIdx);
      setTranscript("");
      setTimeout(() => speak(questions[nextIdx].question), 500);
    } else {
      localStorage.setItem('interview_feedback', JSON.stringify(updatedFeedback));
      window.location.href = '/summary';
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    recognition?.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    recognition?.stop();
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fbfbfa]">
       <Loader2 className="w-12 h-12 animate-spin text-[#11b589]" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fbfbfa] relative overflow-hidden flex flex-col pt-4 pb-12 px-6">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50">
          <div className="absolute top-[5%] right-[20%] w-[30%] h-[50%] bg-[#d2fbf0] rounded-full blur-[140px]" />
          <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[30%] bg-[#fae8fb] rounded-full blur-[150px]" />
      </div>

      <main className="flex-1 w-full max-w-6xl mx-auto relative z-10 space-y-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-end mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl font-black text-[#0b261d] tracking-tight">AI Voice Interview</h1>
                <div className="flex bg-gray-100 p-1.5 rounded-2xl gap-1">
                   <button 
                     onClick={() => setMode('audio')}
                     className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all ${mode === 'audio' ? 'bg-[#11b589] text-white shadow-xl' : 'text-gray-400'}`}
                   >
                     Audio Mode
                   </button>
                   <button 
                     onClick={() => setMode('text')}
                     className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all ${mode === 'text' ? 'bg-[#11b589] text-white shadow-xl' : 'text-gray-400'}`}
                   >
                     Text Mode
                   </button>
                </div>
              </div>
              <p className="text-[#3b4b45]/70 font-medium text-lg max-w-2xl">
                Choose your interaction style. The AI remains just as thorough in either case.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl font-bold text-[#08241b] shadow-sm border border-gray-100 hover:border-[#11b589] transition-all">
                {mode === 'audio' ? <Mic className="w-5 h-5 text-[#11b589]" /> : <MessageSquare className="w-5 h-5 text-[#11b589]" />} {mode === 'audio' ? 'Audio ON' : 'Text ON'}
              </button>
              <button className="hidden md:flex items-center gap-2 bg-white px-5 py-3 rounded-2xl font-bold text-[#08241b] shadow-sm border border-gray-100 hover:border-[#11b589] transition-all">
                <Settings2 className="w-5 h-5 text-gray-400" /> Options
              </button>
            </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Robot AI Avatar View */}
          <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-8 bg-[#010c09] rounded-[3rem] overflow-hidden shadow-[0_32px_128px_-16px_rgba(0,157,119,0.3)] relative min-h-[500px] flex flex-col items-center justify-center border border-[#11b589]/20"
          >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#010c09_70%)] opacity-60" />
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#11b589 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

              {/* ROBOT AVATAR */}
              <div className="relative w-80 h-80 flex items-center justify-center group">
                <motion.div 
                  animate={{ rotate: 360, scale: isSpeaking ? [1, 1.1, 1] : 1 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className={`absolute inset-0 border-2 border-dashed rounded-full border-[#11b589]/20 ${isSpeaking ? 'border-[#11b589]/40 border-solid' : ''}`}
                />
                
                <div className="w-52 h-52 bg-[#021812] rounded-[3.5rem] border-2 border-[#11b589]/30 shadow-[0_0_80px_rgba(17,181,137,0.15)] relative overflow-hidden flex flex-col items-center justify-center gap-6 z-10">
                  <div className="flex gap-4">
                      <div className={`w-8 h-8 rounded-full bg-[#11b589] shadow-[0_0_20px_rgba(17,181,137,1)] ${isSpeaking ? 'animate-bounce' : 'opacity-40 animate-pulse'}`} />
                      <div className={`w-8 h-8 rounded-full bg-[#11b589] shadow-[0_0_20px_rgba(17,181,137,1)] ${isSpeaking ? 'animate-bounce delay-150' : 'opacity-40 animate-pulse'}`} />
                  </div>
                  <div className="flex items-center gap-2 h-16">
                      {[...Array(12)].map((_, i) => (
                        <motion.div 
                          key={i}
                          animate={{ height: isSpeaking ? [10, 50, 15, 40, 10] : 10 }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.05 }}
                          className="w-1.5 bg-[#11b589] rounded-full shadow-[0_0_15px_rgba(17,181,137,0.4)]"
                        />
                      ))}
                  </div>
                </div>

                <div className="absolute -top-10 -right-10 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-xl z-20">
                  <p className="text-[10px] font-black text-[#11b589] uppercase tracking-widest mb-1">AUDIT LINK</p>
                  <p className="text-white text-xs font-bold">{isSpeaking ? 'INTERVIEWING...' : mode === 'audio' ? 'LISTENING...' : 'WAITING FOR TEXT...'}</p>
                </div>
              </div>

              <div className="absolute bottom-10 left-12 right-12 z-20">
                <div className="bg-black/40 backdrop-blur-3xl p-8 rounded-[2rem] border border-white/10 shadow-2xl">
                  <div className="flex items-center gap-2 mb-3">
                      <Cpu className="w-5 h-5 text-[#11b589]" />
                      <span className="text-[11px] font-black text-[#11b589] uppercase tracking-widest">{hasStarted ? `Question ${currentIdx + 1} OF ${questions.length}` : 'System Standby'}</span>
                  </div>
                  <p className="text-white font-black text-2xl tracking-normal leading-relaxed text-center">
                    {hasStarted ? `"${questions[currentIdx]?.question || 'Preparing...'}"` : 'Your technical evaluation is ready. Initialize when prepared.'}
                  </p>
                </div>
              </div>
          </motion.div>

          {/* Transcription & Controls View */}
          <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-4 flex flex-col gap-6"
          >
              <div className="bg-white border-2 border-[#11b589]/5 rounded-[2.5rem] p-8 shadow-xl flex-1 flex flex-col relative overflow-hidden group">
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#d2fbf0] rounded-full blur-[80px] opacity-30 group-hover:opacity-50 transition-opacity" />
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">{mode === 'audio' ? 'Live Transcript' : 'Type Your Answer'}</h3>
                      <div className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${isRecording ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400'}`}>
                        {mode === 'audio' ? (isRecording ? 'Voice Active' : 'Waiting') : 'Keyboard Input'}
                      </div>
                  </div>

                  <div className="min-h-[250px] mb-8 relative">
                      {mode === "audio" ? (
                        transcript ? (
                          <p className="text-[#08241b] text-base font-medium leading-relaxed bg-[#fbfbfa] p-6 rounded-2xl border border-gray-100 italic">
                            "{transcript}"
                          </p>
                        ) : (
                          <div className="flex flex-col items-center justify-center p-10 text-center space-y-4">
                            <Mic className="w-10 h-10 text-gray-200" />
                            <p className="text-gray-400 font-bold text-sm italic">Hit 'Start Listening' and speak clearly...</p>
                          </div>
                        )
                      ) : (
                        <textarea 
                           value={transcript}
                           onChange={(e) => setTranscript(e.target.value)}
                           placeholder="Describe your approach and technical choices here..."
                           className="w-full h-48 bg-[#fbfbfa] p-6 rounded-[2rem] border border-gray-100 focus:border-[#11b589]/30 focus:ring-4 focus:ring-[#11b589]/5 outline-none font-medium text-[#08241b] transition-all resize-none"
                        />
                      )}
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                  {!hasStarted ? (
                    <button 
                      onClick={startInterview}
                      className="w-full py-6 rounded-[2rem] font-black text-lg transition-all flex items-center justify-center gap-3 shadow-2xl bg-[#11b589] hover:bg-[#0e9671] text-white shadow-[#11b589]/30 uppercase tracking-widest"
                    >
                      Begin Interview
                    </button>
                  ) : (
                    <button 
                      onClick={handleNext}
                      className={`w-full py-6 rounded-[2rem] font-black text-lg transition-all flex items-center justify-center gap-3 shadow-2xl ${isRecording ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/30' : 'bg-[#11b589] hover:bg-[#0e9671] text-white shadow-[#11b589]/30'}`}
                    >
                      {mode === 'audio' ? (isRecording ? 'Submit Voice' : 'Start Listening') : 'Next Question'}
                    </button>
                  )}
                  
                  <div className="flex items-center gap-3 px-4">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: hasStarted ? `${((currentIdx + 1) / questions.length) * 100}%` : '0%' }}
                          className="h-full bg-[#11b589]"
                        />
                      </div>
                      <span className="text-[10px] font-black text-gray-400">{hasStarted ? Math.round(((currentIdx + 1) / questions.length) * 100) : 0}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#08241b] text-white p-6 rounded-3xl flex items-start gap-4 shadow-lg border border-white/5">
                <div className="w-10 h-10 bg-[#11b589]/20 rounded-2xl flex items-center justify-center text-[#11b589] shrink-0">
                    <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-[#11b589] mb-1">Technical Guidance</h4>
                  <p className="text-[11px] text-white/50 font-medium leading-relaxed">
                    Mention relevant experience. The AI analyzes **industry keywords** and **problem-solving syntax**.
                  </p>
                </div>
              </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
