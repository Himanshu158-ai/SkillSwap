"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);

    if (data.success) {
      toast.success("Account created successfully! Redirecting to setup...");
      router.push("/setup");
    } else {
      toast.error(data.message || "Registration failed. Please try again.");
    }

  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4 py-16">
 
      <div className="w-full max-w-sm bg-[#111] border border-white/[0.08] rounded-[20px] p-10">
 
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#5465FF]" />
          <span className="text-[#5465FF] text-[13px] font-medium tracking-wide">
            SkillSwap
          </span>
        </div>
 
        {/* Heading */}
        <h1 className="text-[26px] font-medium text-white tracking-tight mb-1.5">
          Create account
        </h1>
        <p className="text-[13px] text-[#555] mb-8 leading-relaxed">
          Start your learning journey today
        </p>
 
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
 
          {/* Name */}
          <div>
            <label className="block text-[12px] text-[#666] tracking-wide mb-1.5">
              Name
            </label>
            <div className="relative">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444] pointer-events-none"
                width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="
                  w-full pl-10 pr-4 py-[11px]
                  bg-[#0D0D0D] border border-white/10 rounded-[10px]
                  text-[14px] text-[#E8E6E1] placeholder:text-[#444]
                  outline-none transition-colors duration-200
                  focus:border-[#5465FF]
                "
              />
            </div>
          </div>
 
          {/* Email */}
          <div>
            <label className="block text-[12px] text-[#666] tracking-wide mb-1.5">
              Email
            </label>
            <div className="relative">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444] pointer-events-none"
                width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="
                  w-full pl-10 pr-4 py-[11px]
                  bg-[#0D0D0D] border border-white/10 rounded-[10px]
                  text-[14px] text-[#E8E6E1] placeholder:text-[#444]
                  outline-none transition-colors duration-200
                  focus:border-[#5465FF]
                "
              />
            </div>
          </div>
 
          {/* Password */}
          <div>
            <label className="block text-[12px] text-[#666] tracking-wide mb-1.5">
              Password
            </label>
            <div className="relative">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444] pointer-events-none"
                width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                type="password"
                name="password"
                placeholder="Min. 8 characters"
                value={formData.password}
                onChange={handleChange}
                required
                className="
                  w-full pl-10 pr-4 py-[11px]
                  bg-[#0D0D0D] border border-white/10 rounded-[10px]
                  text-[14px] text-[#E8E6E1] placeholder:text-[#444]
                  outline-none transition-colors duration-200
                  focus:border-[#5465FF]
                "
              />
            </div>
            <p className="text-[11px] text-[#444] mt-1.5">
              Use at least 8 characters for better security.
            </p>
          </div>
 
          {/* Submit */}
          <button
            type="submit"
            className="
              w-full py-3 mt-1
              bg-[#5465FF] hover:bg-[#4354ee]
              text-white text-[14px] font-medium
              rounded-[10px] transition-colors duration-200 cursor-pointer
            "
          >
            Create account
          </button>
 
        </form>
 
        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/[0.07]" />
          <span className="text-[11px] text-[#444]">OR</span>
          <div className="flex-1 h-px bg-white/[0.07]" />
        </div>
 
        {/* Login link */}
        <p className="text-center text-[13px] text-[#555]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#5465FF] hover:underline">
            Login
          </Link>
        </p>
 
      </div>
    </div>
  );
}