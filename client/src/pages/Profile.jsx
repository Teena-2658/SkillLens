import React, { useState } from "react";
import {
  User,
  Mail,
  Briefcase,
  Save,
  Phone,
  MapPin,
  Github,
  Linkedin,
} from "lucide-react";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    jobTitle: "",
    bio: "",
    github: "",
    linkedin: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Data Saved:", formData);
  };

  const inputClass =
    "w-full border border-[rgba(0,157,119,0.2)] rounded-xl px-4 py-2.5 text-sm text-[#011813] placeholder:text-[#8D8E8F] bg-white focus:outline-none focus:border-[#009D77] focus:ring-2 focus:ring-[rgba(0,157,119,0.12)] transition-colors duration-150";

  return (
    <div className="min-h-screen relative">
      <Navbar />
      <div className="max-w-5xl mx-auto space-y-8 relative">
        <div className="mb-8 relative">
          <p className="text-xs text-[#8D8E8F] mb-2">
            Home / Profile / Settings
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-extrabold text-[#011813] tracking-tight">
              Profile settings
            </h1>
            <span className="bg-[#E8FAF5] border border-[rgba(0,157,119,0.2)] text-[#009D77] text-xs font-mono font-semibold px-3 py-1 rounded-full">
              /profile
            </span>
          </div>
          <p className="text-sm text-[#313233] leading-relaxed mt-2 max-w-xl">
            Manage your personal information and professional details.
          </p>
          <div className="absolute top-0 right-0 w-24 h-24 dot-grid opacity-60 rounded-xl pointer-events-none hidden sm:block" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white/75 backdrop-blur-sm border border-[rgba(0,157,119,0.12)] rounded-2xl p-5 hover:border-[rgba(0,157,119,0.30)] transition-colors duration-200 flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <div className="w-20 h-20 rounded-full ring-4 ring-[rgba(0,157,119,0.2)] bg-[#BDF1E5] flex items-center justify-center shrink-0">
              <User className="w-10 h-10 text-[#009D77]" />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h3 className="text-xl font-bold text-[#011813]">
                Profile photo
              </h3>
              <p className="text-sm text-[#313233] leading-relaxed mt-1 mb-4">
                Upload a professional picture (max 2MB).
              </p>
              <button
                type="button"
                className="bg-[#E8FAF5] text-[#009D77] text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-[#BDF1E5] transition-colors duration-150"
              >
                Choose image
              </button>
            </div>
          </div>

          <div className="bg-white/75 backdrop-blur-sm border border-[rgba(0,157,119,0.12)] rounded-2xl p-5 hover:border-[rgba(0,157,119,0.30)] transition-colors duration-200">
            <h3 className="text-xl font-bold text-[#011813] mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-[#009D77]" /> Personal information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="First name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                inputClass={inputClass}
              />
              <InputField
                label="Last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                inputClass={inputClass}
              />
              <InputField
                label="Email address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                type="email"
                icon={Mail}
                inputClass={inputClass}
              />
              <InputField
                label="Phone number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 00000 00000"
                type="tel"
                icon={Phone}
                inputClass={inputClass}
              />
            </div>
          </div>

          <div className="bg-white/75 backdrop-blur-sm border border-[rgba(0,157,119,0.12)] rounded-2xl p-5 hover:border-[rgba(0,157,119,0.30)] transition-colors duration-200">
            <h3 className="text-xl font-bold text-[#011813] mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#009D77]" /> Professional
              details
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Job title"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="e.g. Frontend developer"
                  inputClass={inputClass}
                />
                <InputField
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, India"
                  icon={MapPin}
                  inputClass={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#8D8E8F] uppercase tracking-wider mb-1.5">
                  Professional bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your experience and skills..."
                  className={`${inputClass} resize-none`}
                />
              </div>
              <div className="h-px bg-[#F0F0F0] my-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="GitHub URL"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/username"
                  type="url"
                  icon={Github}
                  inputClass={inputClass}
                />
                <InputField
                  label="LinkedIn URL"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                  type="url"
                  icon={Linkedin}
                  inputClass={inputClass}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pb-4">
            <button
              type="button"
              className="w-full sm:w-auto border border-[rgba(0,157,119,0.3)] text-[#009D77] text-sm font-semibold px-5 py-2.5 rounded-xl bg-transparent hover:bg-[#E8FAF5] transition-colors duration-150"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#009D77] text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-[#008a68] transition-colors duration-150"
            >
              <Save className="w-4 h-4" /> Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  icon: Icon,
  inputClass,
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#8D8E8F] uppercase tracking-wider mb-1.5">
        {Icon && (
          <Icon className="w-3.5 h-3.5 inline mr-1.5 text-[#009D77] align-text-bottom" />
        )}
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}
