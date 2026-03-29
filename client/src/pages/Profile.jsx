import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Briefcase,
  Save,
  Github,
  Linkedin,
  Zap,
  Loader2,
  Camera,
  Globe,
  Edit3,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export default function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    targetRole: "",
    bio: "",
    github: "",
    linkedin: "",
    profileImage: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [detectedSkills, setDetectedSkills] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");

        const profileRes = await fetch("http://localhost:5800/api/auth/profile", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const profileData = await profileRes.json();

        if (profileData.success && profileData.data?.user) {
          const u = profileData.data.user;
          setFormData({
            name: u.name || "",
            email: u.email || "",
            targetRole: u.targetRole || "frontend",
            bio: u.bio || "",
            github: u.socials?.github || "",
            linkedin: u.socials?.linkedin || "",
            profileImage: u.profileImage || null
          });
          setDetectedSkills(u.detectedSkills || []);
        }

        const statsRes = await fetch("http://localhost:5800/api/quiz/stats", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const statsData = await statsRes.json();
        if (statsData.success) {
          setStats(statsData.data);
        }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size should be less than 2MB");
        return;
      }
      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result });
        setUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5800/api/auth/profile", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          targetRole: formData.targetRole.toLowerCase(),
          bio: formData.bio,
          profileImage: formData.profileImage,
          socials: { github: formData.github, linkedin: formData.linkedin }
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem("user", JSON.stringify(data.data.user));
        setMessage("Profile synchronized!");
        setIsEditing(false); // Switch back to VIEW mode
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(data.message || "Failed to update.");
      }
    } catch (err) {
      setMessage("Connection error.");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8faf9]">
      <Loader2 className="w-12 h-12 animate-spin text-[#11b589]" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8faf9] relative overflow-hidden flex flex-col pt-4 pb-12 px-6">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-[-10%] right-[10%] w-[50%] h-[40%] bg-[#d2fbf0] rounded-full blur-[160px]" />
        <div className="absolute bottom-[20%] left-[0%] w-[40%] h-[40%] bg-[#fae8fb] rounded-full blur-[160px]" />
      </div>

      <main className="flex-1 w-full max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* PROFILE CARD - Shared */}
          <div className="lg:w-1/3 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-[0_32px_128px_-32px_rgba(0,0,0,0.05)] text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#11b589]/5 rounded-full blur-3xl -mr-16 -mt-16" />

              <div className="relative w-40 h-40 mx-auto mb-6 group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#11b589] to-[#BDF1E5] rounded-full animate-pulse blur-xl opacity-20" />
                <div className="relative w-40 h-40 rounded-full border-4 border-white bg-[#08241b] flex items-center justify-center overflow-hidden shadow-xl">
                  {formData.profileImage ? (
                    <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-20 h-20 text-[#11b589]" />
                  )}

                  {isEditing && (
                    <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                      <Camera className="w-8 h-8 text-white mb-1" />
                      <span className="text-[10px] text-white font-black uppercase">Update</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                  )}
                </div>
                {uploading && (
                  <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-full z-20">
                    <Loader2 className="w-8 h-8 animate-spin text-[#11b589]" />
                  </div>
                )}
              </div>

              <h2 className="text-3xl font-black text-[#0b261d] mb-1">{formData.name}</h2>
              <p className="text-[#11b589] font-black uppercase tracking-widest text-[10px] mb-6 flex items-center justify-center gap-2">
                <Globe className="w-3 h-3" /> {formData.targetRole} Expert
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-4 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col items-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase mb-1">Quizzes</span>
                  <span className="text-xl font-black text-[#0b261d]">{stats?.totalAttempts || 0}</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col items-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase mb-1">Avg Score</span>
                  <span className="text-xl font-black text-[#11b589]">{stats?.avgScore || 0}%</span>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-50 flex justify-center gap-4">
                <a href={formData.github} target="_blank" className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-[#0b261d] hover:border-[#0b261d] transition-all">
                  <Github className="w-5 h-5" />
                </a>
                <a href={formData.linkedin} target="_blank" className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-[#0077b5] hover:border-[#0077b5] transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#08241b] rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="relative z-10 text-white">
                <h3 className="text-sm font-black uppercase tracking-widest text-[#11b589] mb-6 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Technical Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {detectedSkills.length > 0 ? detectedSkills.map((s, i) => (
                    <span key={i} className="px-4 py-2 bg-white/10 border border-white/5 rounded-xl text-xs font-bold text-white/80 hover:bg-white/20 transition-all cursor-default">
                      {s}
                    </span>
                  )) : (
                    <p className="text-white/40 text-[11px] font-medium leading-relaxed italic">Upload resume to sync your stack.</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div
                  key="edit"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white/80 backdrop-blur-2xl border border-white rounded-[3rem] p-10 shadow-[0_32px_128px_-32px_rgba(0,0,0,0.05)]"
                >
                  <div className="flex items-center justify-between mb-10">
                    <div>
                      <h3 className="text-2xl font-black text-[#0b261d]">Edit Experience</h3>
                      <p className="text-[#3b4b45]/60 font-medium text-sm">Update your public profile and technical persona.</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#11b589]" />
                          <input readOnly value={formData.name} className="w-full bg-gray-50 border border-transparent p-4 pl-12 rounded-2xl text-[#0b261d] font-bold opacity-60 cursor-not-allowed text-sm" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Current Target</label>
                        <div className="relative">
                          <select
                            name="targetRole"
                            value={formData.targetRole}
                            onChange={handleChange}
                            className="w-full bg-white border border-gray-100 p-4 rounded-2xl text-[#0b261d] font-bold focus:ring-4 focus:ring-[#11b589]/5 focus:border-[#11b589]/20 outline-none transition-all appearance-none cursor-pointer text-sm"
                          >
                            <option value="frontend">Frontend Developer</option>
                            <option value="backend">Backend Developer</option>
                            <option value="fullstack">Fullstack Ninja</option>
                            <option value="data">Data Architect</option>
                            <option value="java">Enterprise Java</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Bio / Expertise</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about your industry impact..."
                        className="w-full bg-white border border-gray-100 p-6 rounded-3xl text-[#0b261d] font-medium focus:ring-4 focus:ring-[#11b589]/5 focus:border-[#11b589]/20 outline-none transition-all resize-none text-sm leading-relaxed"
                      />
                    </div>

                    <div className="h-px bg-gray-50" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">GitHub Profile</label>
                        <div className="relative">
                          <Github className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input name="github" value={formData.github} onChange={handleChange} placeholder="https://github.com/..." className="w-full bg-white border border-gray-100 p-4 pl-12 rounded-2xl text-[#0b261d] font-bold focus:ring-4 focus:ring-[#11b589]/5 focus:border-[#11b589]/20 outline-none transition-all text-sm" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">LinkedIn Profile</label>
                        <div className="relative">
                          <Linkedin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="https://linkedin.com/..." className="w-full bg-white border border-gray-100 p-4 pl-12 rounded-2xl text-[#0b261d] font-bold focus:ring-4 focus:ring-[#11b589]/5 focus:border-[#11b589]/20 outline-none transition-all text-sm" />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-8 py-5 rounded-[2rem] border border-gray-100 text-gray-400 font-bold hover:bg-gray-50 transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-[#11b589] text-white p-5 rounded-[2rem] font-black text-lg shadow-xl shadow-[#11b589]/20 hover:bg-[#0e9671] transition-all flex items-center justify-center gap-3 group"
                      >
                        <Save className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                        Save Profile Changes
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="view"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  {/* Header with Edit Button */}
                  <div className="bg-white/80 backdrop-blur-2xl border border-white rounded-[3rem] p-10 shadow-sm flex items-center justify-between">
                    <div>
                      <h3 className="text-3xl font-black text-[#0b261d]">Professional Profile</h3>
                      <p className="text-[#3b4b45]/60 font-medium">Synced with SkillLens AI Engine</p>
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 bg-[#08241b] text-white px-6 py-4 rounded-[1.5rem] font-bold hover:bg-[#11b589] transition-all shadow-xl shadow-[#08241b]/20"
                    >
                      <Edit3 className="w-4 h-4" /> Edit Profile
                    </button>
                  </div>

                  {/* Bio & Details */}
                  <div className="bg-white/80 backdrop-blur-2xl border border-white rounded-[3rem] p-10 shadow-sm space-y-10">
                    <section>
                      <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4">About Designer</h4>
                      <p className="text-[#0b261d] text-lg font-medium leading-[1.8] italic">
                        "{formData.bio || "No bio added yet. Tell us about your journey and industry impact to stand out."}"
                      </p>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-6">
                        <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Contact Node</h4>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 group">
                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-[#11b589] transition-all">
                              <Mail className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</p>
                              <p className="text-[#0b261d] font-bold">{formData.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 group">
                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-[#11b589] transition-all">
                              <Briefcase className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Industry Persona</p>
                              <p className="text-[#0b261d] font-bold">{formData.targetRole.toUpperCase()}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Social Integration</h4>
                        <div className="space-y-4">
                          {formData.github && (
                            <a href={formData.github} target="_blank" className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl hover:border-[#0b261d] border border-transparent transition-all group">
                              <div className="flex items-center gap-4">
                                <Github className="w-5 h-5 text-gray-400 group-hover:text-[#0b261d]" />
                                <span className="text-[#0b261d] font-bold">GitHub Profile</span>
                              </div>
                              <ExternalLink className="w-4 h-4 text-gray-300" />
                            </a>
                          )}
                          {formData.linkedin && (
                            <a href={formData.linkedin} target="_blank" className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl hover:border-[#0077b5] border border-transparent transition-all group">
                              <div className="flex items-center gap-4">
                                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-[#0077b5]" />
                                <span className="text-[#0b261d] font-bold">LinkedIn Profile</span>
                              </div>
                              <ExternalLink className="w-4 h-4 text-gray-300" />
                            </a>
                          )}
                        </div>
                      </div>
                    </section>


                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
