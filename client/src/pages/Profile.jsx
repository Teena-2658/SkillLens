import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Briefcase, Camera, Save, Phone, MapPin, Link as LinkIcon, Github, Linkedin } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function Profile() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        jobTitle: '',
        bio: '',
        github: '',
        linkedin: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Profile Data Saved:', formData);
        // Add your API call here
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen lg:ml-[280px] p-6 lg:p-10 relative overflow-hidden pt-32">
                {/* Gradient Background Layer */}
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#e0f7fa] via-[#f0f4f8] to-[#fce4ec] opacity-60 pointer-events-none"></div>

                <div className="max-w-4xl mx-auto relative z-10">
                    {/* Header Section */}
                    <div className="mb-10 text-center lg:text-left">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            // Updated text color to match the bold heading in the image
                            className="text-4xl lg:text-5xl font-extrabold text-[#081b16] tracking-tight mb-3"
                        >
                            Profile Settings
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-[#3b4b45]/70 font-medium text-lg"
                        >
                            Manage your personal information and professional details.
                        </motion.p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Avatar / Profile Picture Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-lg shadow-[#081b16]/5 border border-white/50 flex flex-col sm:flex-row items-center sm:items-start gap-8"
                        >

                            <div className="text-center sm:text-left">
                                <h3 className="text-lg font-bold text-[#081b16]">Profile Photo</h3>
                                <p className="text-sm text-[#3b4b45]/60 mb-3">Upload a professional picture (Max 2MB)</p>
                                <button type="button" className="text-sm font-bold text-[#11b589] hover:text-[#0b261d] transition-colors px-4 py-2 rounded-full bg-[#11b589]/10 hover:bg-[#11b589]/20">
                                    Choose Image
                                </button>
                            </div>
                        </motion.div>

                        {/* Personal Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-lg shadow-[#081b16]/5 border border-white/50"
                        >
                            <h3 className="text-xl font-bold text-[#081b16] mb-6 flex items-center gap-2">
                                <User className="w-5 h-5 text-[#11b589]" /> Personal Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" />
                                <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" />
                                <InputField label="Email Address" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" type="email" icon={Mail} />
                                <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" type="tel" icon={Phone} />
                            </div>
                        </motion.div>

                        {/* Professional Details */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-lg shadow-[#081b16]/5 border border-white/50"
                        >
                            <h3 className="text-xl font-bold text-[#081b16] mb-6 flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-[#11b589]" /> Professional Details
                            </h3>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="e.g. Frontend Developer" />
                                    <InputField label="Location" name="location" value={formData.location} onChange={handleChange} placeholder="City, Country" icon={MapPin} />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[#3b4b45]/80 pl-1">Professional Bio</label>
                                    <textarea
                                        name="bio" value={formData.bio} onChange={handleChange}
                                        rows="4"
                                        placeholder="Tell us a little about your experience and skills..."
                                        className="w-full px-5 py-4 bg-white border border-gray-200 shadow-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#11b589]/30 focus:border-[#11b589] transition-all text-[#081b16] placeholder:text-gray-400 font-medium resize-none"
                                    ></textarea>
                                </div>

                                {/* Social Links */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                                    <InputField label="GitHub URL" name="github" value={formData.github} onChange={handleChange} placeholder="https://github.com/username" type="url" icon={Github} />
                                    <InputField label="LinkedIn URL" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/username" type="url" icon={Linkedin} />
                                </div>
                            </div>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4 pb-10"
                        >
                            <button
                                type="button"
                                className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-[#3b4b45] bg-transparent border-2 border-transparent rounded-xl hover:bg-gray-100 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold text-white bg-[#081b16] rounded-full hover:bg-[#11b589] shadow-lg shadow-[#081b16]/20 transition-all hover:-translate-y-0.5"
                            >
                                <Save className="w-4 h-4" /> Save Changes
                            </button>
                        </motion.div>

                    </form>
                </div>
            </div>
        </>
    );
}

// Reusable Input Component to keep code clean
const InputField = ({ label, name, value, onChange, placeholder, type = "text", icon: Icon }) => (
    <div className="space-y-2">
        <label className="text-sm font-bold text-[#3b4b45]/80 pl-1 flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4 text-[#11b589]" />} {label}
        </label>
        <input
            type={type} name={name} value={value} onChange={onChange}
            placeholder={placeholder}
            // Styled similar to the search bar in the image (rounded-full, shadow)
            className="w-full px-5 py-4 bg-white border border-gray-100 shadow-sm rounded-full focus:outline-none focus:ring-2 focus:ring-[#11b589]/30 focus:border-[#11b589] transition-all text-[#081b16] placeholder:text-gray-400 font-medium"
        />
    </div>
);