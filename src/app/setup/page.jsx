"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";

export default function ProfileSetupPage() {
  const router = useRouter();
  const toast = useToast();
  const [formData, setFormData] = useState({
    phone: "",
    bio: "",
    location: "",
    canTeach: "",
    wantsToLearn: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      canTeach: formData.canTeach
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),

      wantsToLearn: formData.wantsToLearn
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    };

    console.log(payload);

    // API Call
    const res = await fetch("/api/profile/setup", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Profile setup completed successfully!");
      router.push("/discover");
    } else {
      toast.error(data.message || "Profile setup failed. Please try again.");
    }


  };

  const inputClass = `
    w-full pl-10 pr-4 py-[11px]
    bg-[#0D0D0D] border border-white/10 rounded-[10px]
    text-[14px] text-[#E8E6E1] placeholder:text-[#444]
    outline-none transition-colors duration-200
    focus:border-[#5465FF]
  `;

    const inputClassNoIcon = `
    w-full px-4 py-[11px]
    bg-[#0D0D0D] border border-white/10 rounded-[10px]
    text-[14px] text-[#E8E6E1] placeholder:text-[#444]
    outline-none transition-colors duration-200
    focus:border-[#5465FF]
  `;

  return (
    <div className="min-h-screen bg-[#0D0D0D] py-16 px-4">
      <div className="max-w-2xl mx-auto">

        <div className="bg-[#111] border border-white/[0.08] rounded-[20px] p-10">

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#5465FF]" />
              <span className="text-[#5465FF] text-[13px] font-medium tracking-wide">
                SkillSwap
              </span>
            </div>

            <div className="inline-flex items-center gap-2 bg-[#5465FF]/10 border border-[#5465FF]/20 text-[#8B97FF] px-4 py-1.5 rounded-full text-[12px] font-medium mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5465FF]" />
              Complete your profile
            </div>

            <h1 className="text-[26px] font-medium text-white tracking-tight mb-1.5">
              Let's build your profile
            </h1>
            <p className="text-[13px] text-[#555] leading-relaxed">
              Tell the community what you can teach and what you want to learn.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Phone */}
            <div>
              <label className="block text-[12px] text-[#666] tracking-wide mb-1.5">
                Phone number
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444] pointer-events-none"
                  width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.7 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <input
                  type="text"
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
              <label className="block text-[12px] text-[#666] tracking-wide mb-1.5">
                Location
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444] pointer-events-none"
                  width="16" height="16" viewBox="0 0 24 24"
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
              <label className="block text-[12px] text-[#666] tracking-wide mb-1.5">
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

              {/* Can Teach */}
              <div>
                <label className="block text-[12px] text-[#666] tracking-wide mb-1.5">
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
                <p className="text-[11px] text-[#444] mt-1.5">
                  Separate multiple skills with commas.
                </p>
              </div>

              {/* Wants to Learn */}
              <div>
                <label className="block text-[12px] text-[#666] tracking-wide mb-1.5">
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
                <p className="text-[11px] text-[#444] mt-1.5">
                  Add skills you are interested in learning.
                </p>
              </div>

            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.07] my-2" />

            {/* Submit */}
            <button
              type="submit"
              className="
                w-full py-3
                bg-[#5465FF] hover:bg-[#4354ee]
                text-white text-[14px] font-medium
                rounded-[10px] transition-colors duration-200 cursor-pointer
              "
            >
              Complete profile
            </button>

          </form>

        </div>
      </div>
    </div>

  );
}