"use client";

import React, { useEffect, useState } from "react";
import useAuth from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

const Page = () => {
    const { user, loading, setUser } = useAuth();
    const toast = useToast();

    const [formData, setFormData] = useState({
        _id: "",
        name: "",
        email: "",
        phone: "",
        bio: "",
        location: "",
        canTeach: "",
        wantsToLearn: "",
    });

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                _id: user._id,
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                bio: user.bio || "",
                location: user.location || "",
                canTeach: user.canTeach?.join(", ") || "",
                wantsToLearn: user.wantsToLearn?.join(", ") || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const updateUser = async () => {
        setSaving(true);
        try {
            const payload = {
                ...formData,
                canTeach: formData.canTeach
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
                wantsToLearn: formData.wantsToLearn
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
            };

            const res = await fetch("/api/auth/login", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (data.success) {
                setUser(data.user);
                toast.success("Updated Successfully")
            } else {
                toast.error(data.message || "Update failed")
            }
        } catch (err) {
            toast.error("Something went wrong");
        } finally {
            setSaving(false);
        }
    };

    const inputClass = `
    w-full pl-10 pr-4 py-[11px]
    bg-[#1B1612] border border-white/[0.08] rounded-xl
    text-[14px] text-[#F6F3EE] placeholder:text-[#6B655F]
    outline-none transition-all duration-200
    focus:border-[#B68D5A]/50
  `;

    const inputClassNoIcon = `
    w-full px-4 py-[11px]
    bg-[#1B1612] border border-white/[0.08] rounded-xl
    text-[14px] text-[#F6F3EE] placeholder:text-[#6B655F]
    outline-none transition-all duration-200
    focus:border-[#B68D5A]/50
  `;

    if (loading)
        return (
            <div className="min-h-screen bg-[#1B1612] flex items-center justify-center">
                <p className="text-[#7F776E] text-[13px]">Loading...</p>
            </div>
        );

    return (
        <div
            className="min-h-screen bg-[#1B1612] py-16 px-4"
            style={{ fontFamily: "'Geist', 'Inter', 'Manrope', sans-serif" }}
        >
            <div className="max-w-2xl mx-auto">
                <div className="bg-[#241D18] border border-white/[0.07] rounded-2xl p-9 shadow-[0_8px_40px_rgba(0,0,0,0.45)]">

                    {/* Header */}
                    <div className="mb-10">
                        <div className="flex items-center gap-2 mb-7">
                            <span className="w-[7px] h-[7px] rounded-full bg-[#B68D5A]" />
                            <span className="text-[#B68D5A] text-[13px] font-semibold tracking-wide">
                                SkillSwap
                            </span>
                        </div>

                        <div className="inline-flex items-center gap-2 bg-[#B68D5A]/10 border border-[#B68D5A]/20 text-[#D6B37A] px-4 py-1.5 rounded-full text-[11px] font-medium mb-5 tracking-[0.2px]">
                            <span className="w-[5px] h-[5px] rounded-full bg-[#B68D5A]" />
                            Edit profile
                        </div>

                        <h1 className="text-[26px] font-bold text-[#F6F3EE] tracking-[-0.8px] mb-1.5">
                            Update your profile
                        </h1>
                        <p className="text-[13px] text-[#7F776E] leading-relaxed">
                            Keep your info fresh so the community knows how to connect with you.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-5">

                        {/* Name */}
                        <div>
                            <label className="block text-[11px] font-medium text-[#9D9489] tracking-[0.5px] uppercase mb-2">
                                Full name
                            </label>
                            <div className="relative">
                                <svg
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B655F] pointer-events-none"
                                    width="15" height="15" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="1.5"
                                    strokeLinecap="round" strokeLinejoin="round"
                                >
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-[11px] font-medium text-[#9D9489] tracking-[0.5px] uppercase mb-2">
                                Phone number
                            </label>
                            <div className="relative">
                                <svg
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B655F] pointer-events-none"
                                    width="15" height="15" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="1.5"
                                    strokeLinecap="round" strokeLinejoin="round"
                                >
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.7 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="9876543210"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-[11px] font-medium text-[#9D9489] tracking-[0.5px] uppercase mb-2">
                                Location
                            </label>
                            <div className="relative">
                                <svg
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B655F] pointer-events-none"
                                    width="15" height="15" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="1.5"
                                    strokeLinecap="round" strokeLinejoin="round"
                                >
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Noida, India"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Bio */}
                        <div>
                            <label className="block text-[11px] font-medium text-[#9D9489] tracking-[0.5px] uppercase mb-2">
                                About you
                            </label>
                            <textarea
                                rows={4}
                                name="bio"
                                placeholder="Tell people about yourself, your interests, and your goals..."
                                value={formData.bio}
                                onChange={handleChange}
                                className={`${inputClassNoIcon} resize-none`}
                            />
                        </div>

                        {/* Skills grid */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[11px] font-medium text-[#9D9489] tracking-[0.5px] uppercase mb-2">
                                    Skills you can teach
                                </label>
                                <input
                                    type="text"
                                    name="canTeach"
                                    placeholder="React, Node.js, MongoDB"
                                    value={formData.canTeach}
                                    onChange={handleChange}
                                    className={inputClassNoIcon}
                                />
                                <p className="text-[11px] text-[#6B655F] mt-2">
                                    Separate multiple skills with commas.
                                </p>
                            </div>

                            <div>
                                <label className="block text-[11px] font-medium text-[#9D9489] tracking-[0.5px] uppercase mb-2">
                                    Skills you want to learn
                                </label>
                                <input
                                    type="text"
                                    name="wantsToLearn"
                                    placeholder="English, DSA, Public Speaking"
                                    value={formData.wantsToLearn}
                                    onChange={handleChange}
                                    className={inputClassNoIcon}
                                />
                                <p className="text-[11px] text-[#6B655F] mt-2">
                                    Add skills you are interested in learning.
                                </p>
                            </div>
                        </div>

                        <div className="h-px bg-white/[0.06] my-1" />

                        <button
                            onClick={updateUser}
                            disabled={saving}
                            className="
                w-full py-[11px]
                bg-[#B68D5A] hover:bg-[#C9A06A]
                text-[#1B1612] text-[14px] font-semibold
                rounded-xl transition-all duration-200 cursor-pointer
                active:scale-[0.98]
                disabled:opacity-60 disabled:cursor-not-allowed
              "
                        >
                            {saving ? "Updating..." : "Update profile"}
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Page;