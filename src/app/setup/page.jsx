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

  return (
    <div className="relative min-h-screen bg-[#F8FCFF] py-16 px-4 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#5465FF]/15 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#9BB1FF]/30 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto">

        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[32px] p-10 shadow-[0_20px_80px_rgba(84,101,255,0.12)]">

          {/* Header */}
          <div className="text-center mb-10">

            <div className="inline-flex items-center gap-2 bg-[#5465FF]/10 text-[#5465FF] px-4 py-2 rounded-full text-sm font-medium mb-5">
              <div className="h-2 w-2 rounded-full bg-[#5465FF]" />
              Complete Your Profile
            </div>

            <h1 className="text-4xl font-bold text-slate-900">
              Let's Build Your Profile
            </h1>

            <p className="text-slate-500 mt-3">
              Tell the community what you can teach and what you want to learn.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Phone */}
            <div>
              <label className="block text-slate-700 font-medium mb-2">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                placeholder="9876543210"
                value={formData.phone}
                onChange={handleChange}
                className="
w-full
px-4
py-4
bg-white
text-slate-900
placeholder:text-slate-400
border
border-slate-200
rounded-2xl
outline-none
transition-all
focus:border-[#5465FF]
focus:ring-4
focus:ring-[#5465FF]/10
"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-slate-700 font-medium mb-2">
                Location
              </label>

              <input
                type="text"
                name="location"
                placeholder="Indore, India"
                value={formData.location}
                onChange={handleChange}
                className="
w-full
px-4
py-4
bg-white
text-slate-900
placeholder:text-slate-400
border
border-slate-200
rounded-2xl
outline-none
transition-all
focus:border-[#5465FF]
focus:ring-4
focus:ring-[#5465FF]/10
"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-slate-700 font-medium mb-2">
                About You
              </label>

              <textarea
                rows="5"
                name="bio"
                placeholder="Tell people about yourself, your interests, and your goals..."
                value={formData.bio}
                onChange={handleChange}
                className="
w-full
px-4
py-4
bg-white
text-slate-900
placeholder:text-slate-400
border
border-slate-200
rounded-2xl
outline-none
transition-all
focus:border-[#5465FF]
focus:ring-4
focus:ring-[#5465FF]/10
"
              />
            </div>

            {/* Skills Section */}
            <div className="grid md:grid-cols-2 gap-6">

              {/* Teach */}
              <div>

                <label className="block text-slate-700 font-medium mb-2">
                  Skills You Can Teach
                </label>

                <input
                  type="text"
                  name="canTeach"
                  placeholder="React, Node.js, MongoDB"
                  value={formData.canTeach}
                  onChange={handleChange}
                  className="
w-full
px-4
py-4
bg-white
text-slate-900
placeholder:text-slate-400
border
border-slate-200
rounded-2xl
outline-none
transition-all
focus:border-[#5465FF]
focus:ring-4
focus:ring-[#5465FF]/10
"
                />

                <p className="text-xs text-slate-500 mt-2">
                  Separate multiple skills with commas.
                </p>

              </div>

              {/* Learn */}
              <div>

                <label className="block text-slate-700 font-medium mb-2">
                  Skills You Want To Learn
                </label>

                <input
                  type="text"
                  name="wantsToLearn"
                  placeholder="English, DSA, Public Speaking"
                  value={formData.wantsToLearn}
                  onChange={handleChange}
                  className="
w-full
px-4
py-4
bg-white
text-slate-900
placeholder:text-slate-400
border
border-slate-200
rounded-2xl
outline-none
transition-all
focus:border-[#5465FF]
focus:ring-4
focus:ring-[#5465FF]/10
"
                />

                <p className="text-xs text-slate-500 mt-2">
                  Add skills you are interested in learning.
                </p>

              </div>

            </div>

            {/* CTA */}
            <button
              type="submit"
              className="
          w-full
          py-4
          bg-[#5465FF]
          hover:bg-[#4354ee]
          text-white
          font-semibold
          rounded-2xl
          shadow-lg
          shadow-[#5465FF]/20
          transition-all
          hover:-translate-y-0.5
          "
            >
              Complete Profile
            </button>

          </form>

        </div>

      </div>

    </div>

  );
}