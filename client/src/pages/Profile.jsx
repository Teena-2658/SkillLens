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
    <div className="min-h-screen bg-[#F8F9FA] relative flex flex-col justify-center py-4 px-4 sm:px-6">
      <main className="w-full max-w-md mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.div
              key="edit"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-[#E7E7E8] rounded-2xl p-5 shadow-sm flex flex-col"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#E7E7E8] mb-4">
                <div>
                  <h3 className="text-base font-bold text-[#011813]">Edit Profile</h3>
                  <p className="text-[10px] text-[#475467] mt-0.5">Update your professional information.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="flex flex-col items-center mb-3">
                  <div className="relative w-16 h-16 mb-1.5 group">
                    <div className="relative w-full h-full rounded-full border border-[#E7E7E8] bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
                      {formData.profileImage ? (
                        <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-8 h-8 text-[#009D77]" />
                      )}
                      
                      <label className="absolute inset-x-0 bottom-0 bg-[#011813]/70 py-1 flex flex-col items-center justify-center transition-all cursor-pointer hover:bg-[#009D77]/90">
                        <Camera className="w-3 h-3 text-white" />
                        <span className="text-[7px] text-white font-bold uppercase mt-0.5">Change</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                      </label>
                    </div>
                    {uploading && (
                      <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-full z-20">
                        <Loader2 className="w-5 h-5 animate-spin text-[#009D77]" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#475467] uppercase tracking-wider">Full Name</label>
                    <input readOnly value={formData.name} className="w-full bg-[#F8F9FA] border border-[#E7E7E8] p-2.5 rounded-lg text-[#011813] text-xs opacity-70 cursor-not-allowed outline-none focus:ring-0" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#475467] uppercase tracking-wider">Target Role</label>
                    <select
                      name="targetRole"
                      value={formData.targetRole}
                      onChange={handleChange}
                      className="w-full bg-white border border-[#E7E7E8] p-2.5 rounded-lg text-[#011813] text-xs focus:ring-2 focus:ring-[#009D77]/20 outline-none transition-shadow"
                    >
                      <option value="frontend">Frontend Developer</option>
                      <option value="backend">Backend Developer</option>
                      <option value="fullstack">Fullstack Ninja</option>
                      <option value="data">Data Architect</option>
                      <option value="java">Enterprise Java</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-[#475467] uppercase tracking-wider">Professional Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Tell us about yourself..."
                    className="w-full bg-white border border-[#E7E7E8] p-2.5 rounded-lg text-[#011813] text-xs focus:ring-2 focus:ring-[#009D77]/20 outline-none resize-none transition-shadow"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#475467] uppercase tracking-wider">GitHub URL</label>
                    <div className="relative">
                        <Github className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-[#98A2B3]" />
                        <input name="github" value={formData.github} onChange={handleChange} className="w-full bg-white border border-[#E7E7E8] p-2.5 pl-8 rounded-lg text-[#011813] text-xs focus:ring-2 focus:ring-[#009D77]/20 outline-none transition-shadow" placeholder="https://github.com/..." />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#475467] uppercase tracking-wider">LinkedIn URL</label>
                    <div className="relative">
                        <Linkedin className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-[#98A2B3]" />
                        <input name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full bg-white border border-[#E7E7E8] p-2.5 pl-8 rounded-lg text-[#011813] text-xs focus:ring-2 focus:ring-[#009D77]/20 outline-none transition-shadow" placeholder="https://linkedin.com/..." />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-[#E7E7E8] mt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-lg border border-[#E7E7E8] text-[#475467] text-[11px] font-bold hover:bg-[#F8F9FA] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#EC4899] text-white text-[11px] font-bold rounded-lg hover:bg-[#d93a86] transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Details
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-[#E7E7E8] rounded-2xl p-5 shadow-sm relative flex flex-col items-center overflow-hidden"
            >
              <button
                onClick={() => setIsEditing(true)}
                className="absolute top-4 right-4 flex items-center gap-1 bg-white border border-[#E7E7E8] text-[#011813] px-2.5 py-1.5 rounded-md text-[10px] font-bold hover:bg-[#F8F9FA] transition-colors shadow-sm focus:ring-2 focus:ring-[#009D77]/20 z-10"
              >
                <Edit3 className="w-3 h-3" /> Edit
              </button>

              <div className="relative w-20 h-20 mb-1 mt-1">
                <div className="relative w-full h-full rounded-full border border-[#E7E7E8] shadow-sm bg-gray-100 flex items-center justify-center overflow-hidden">
                  {formData.profileImage ? (
                    <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-10 h-10 text-[#009D77]" />
                  )}
                </div>
              </div>

              <h2 className="text-lg font-extrabold text-[#011813]">{formData.name}</h2>
              <p className="text-[#009D77] font-semibold text-[11px] capitalize flex items-center gap-1 justify-center mb-3">
                <Globe className="w-3 h-3" /> {formData.targetRole || "Role Not Set"}
              </p>

              {formData.bio ? (
                  <p className="text-[#475467] text-[11px] leading-relaxed max-w-sm mx-auto mb-4 bg-[#F8F9FA] p-2.5 rounded-lg border border-[#E7E7E8] italic text-center">
                    {formData.bio}
                  </p>
              ) : (
                  <p className="text-[#98A2B3] text-[11px] leading-relaxed max-w-sm mx-auto mb-4 bg-[#F8F9FA] p-2.5 rounded-lg border border-[#E7E7E8] border-dashed text-center">
                    No professional bio provided yet. Click 'Edit' to add one.
                  </p>
              )}

              <div className="w-full grid grid-cols-2 gap-3 mb-4">
                <div className="p-2.5 bg-[#F8F9FA] rounded-xl border border-[#E7E7E8] flex flex-col items-center">
                  <span className="text-[8px] font-bold text-[#475467] uppercase mb-0.5 tracking-wider">Quizzes</span>
                  <span className="text-xl font-extrabold text-[#011813]">{stats?.totalAttempts || 0}</span>
                </div>
                <div className="p-2.5 bg-[#F8F9FA] rounded-xl border border-[#E7E7E8] flex flex-col items-center">
                  <span className="text-[8px] font-bold text-[#EC4899] uppercase mb-0.5 tracking-wider">Avg Score</span>
                  <span className="text-xl font-extrabold text-[#EC4899]">{stats?.avgScore || 0}%</span>
                </div>
              </div>

              <div className="w-full flex flex-col gap-3 text-left border-t border-[#E7E7E8] pt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[9px] font-bold uppercase tracking-wider text-[#98A2B3]">Contact Email</h3>
                    <p className="text-[11px] font-semibold text-[#011813] flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#009D77]" />
                      {formData.email}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-[#E7E7E8] border-dashed">
                    <h3 className="text-[9px] font-bold uppercase tracking-wider text-[#98A2B3]">Social Links</h3>
                    <div className="flex gap-2">
                      {formData.github && (
                        <a href={formData.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[11px] font-semibold text-[#011813] px-2 py-1 rounded-md border border-[#E7E7E8] hover:bg-[#F8F9FA] transition-colors shadow-sm">
                          <Github className="w-3 h-3" /> GitHub
                        </a>
                      )}
                      {formData.linkedin && (
                        <a href={formData.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[11px] font-semibold text-[#011813] px-2 py-1 rounded-md border border-[#E7E7E8] hover:bg-[#eaf1f8] hover:border-[#0077b5] hover:text-[#0077b5] transition-colors shadow-sm">
                          <Linkedin className="w-3 h-3" /> LinkedIn
                        </a>
                      )}
                      {!formData.github && !formData.linkedin && (
                        <span className="text-[11px] text-[#98A2B3] italic">No links added</span>
                      )}
                    </div>
                  </div>
              </div>

              {detectedSkills.length > 0 && (
                <div className="w-full text-left mt-4 border-t border-[#E7E7E8] pt-4">
                  <h3 className="text-[9px] font-bold uppercase tracking-wider text-[#98A2B3] mb-2 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-[#EC4899]" /> Detected Stack
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {detectedSkills.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 bg-[#FDF2F8] border border-[rgba(236,72,153,0.12)] rounded-md text-[9px] font-semibold text-[#EC4899] shadow-sm">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
