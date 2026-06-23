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

    if(data.success){
      toast.success("Profile setup completed successfully!");
      router.push("/discover");
    } else {
      toast.error(data.message || "Profile setup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl p-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Complete Your Profile 🚀
          </h1>

          <p className="text-slate-400 mt-2">
            Tell others what you can teach and what you want to learn.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Phone */}
          <div>
            <label className="block text-slate-300 mb-2">
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              placeholder="9876543210"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-slate-300 mb-2">
              Location
            </label>

            <input
              type="text"
              name="location"
              placeholder="Delhi, India"
              value={formData.location}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-slate-300 mb-2">
              Bio
            </label>

            <textarea
              rows="4"
              name="bio"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white resize-none"
            />
          </div>

          {/* Can Teach */}
          <div>
            <label className="block text-slate-300 mb-2">
              Skills You Can Teach
            </label>

            <input
              type="text"
              name="canTeach"
              placeholder="React, Node.js, MongoDB"
              value={formData.canTeach}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
            />

            <p className="text-xs text-slate-500 mt-2">
              Separate skills with commas.
            </p>
          </div>

          {/* Wants To Learn */}
          <div>
            <label className="block text-slate-300 mb-2">
              Skills You Want To Learn
            </label>

            <input
              type="text"
              name="wantsToLearn"
              placeholder="English, DSA, Public Speaking"
              value={formData.wantsToLearn}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Complete Profile
          </button>
        </form>
      </div>
    </div>
  );
}