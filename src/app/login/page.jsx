"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import Link from "next/link";
import useAuth from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const toast = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Login API Call
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log(data);
    if (data.success) {
      toast.success("Welcome back! Logging in...");
      setUser(data.user);
      router.push("/discover");
    } else {
      toast.error(data.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen bg-[#1B1612] flex items-center justify-center px-4 py-16"
      style={{ fontFamily: "'Geist', 'Inter', 'Manrope', sans-serif" }}
    >
      <div className="w-full max-w-sm bg-[#241D18] border border-white/[0.07] rounded-2xl p-9 shadow-[0_8px_40px_rgba(0,0,0,0.45)]">

        {/* Logo */}
        <div className="flex items-center gap-2 mb-9">
          <span className="w-[7px] h-[7px] rounded-full bg-[#B68D5A]" />
          <span className="text-[#B68D5A] text-[13px] font-semibold tracking-wide">
            SkillSwap
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-[26px] font-bold text-[#F6F3EE] tracking-[-0.8px] mb-1.5">
          Welcome back
        </h1>
        <p className="text-[13px] text-[#7F776E] mb-8 leading-relaxed">
          Sign in to continue your learning journey
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-[11px] font-medium text-[#9D9489] tracking-[0.5px] uppercase mb-2">
              Email
            </label>
            <div className="relative">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B655F] pointer-events-none"
                width="15" height="15" viewBox="0 0 24 24"
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
                className="
                  w-full pl-10 pr-4 py-[11px]
                  bg-[#1B1612] border border-white/[0.08] rounded-xl
                  text-[14px] text-[#F6F3EE] placeholder:text-[#6B655F]
                  outline-none transition-all duration-200
                  focus:border-[#B68D5A]/50 focus:bg-[#1B1612]
                "
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[11px] font-medium text-[#9D9489] tracking-[0.5px] uppercase mb-2">
              Password
            </label>
            <div className="relative">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B655F] pointer-events-none"
                width="15" height="15" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="
                  w-full pl-10 pr-4 py-[11px]
                  bg-[#1B1612] border border-white/[0.08] rounded-xl
                  text-[14px] text-[#F6F3EE] placeholder:text-[#6B655F]
                  outline-none transition-all duration-200
                  focus:border-[#B68D5A]/50
                "
              />
            </div>
            <div className="flex justify-end mt-2">
              <a
                href="#"
                className="text-[12px] text-[#9D9489] hover:text-[#D6B37A] transition-colors duration-150"
              >
                Forgot password?
              </a>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full py-[11px] mt-1
              bg-[#B68D5A] hover:bg-[#C9A06A]
              text-[#1B1612] text-[14px] font-semibold
              rounded-xl transition-all duration-200 cursor-pointer
              active:scale-[0.98]
            "
          >
            Sign in
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-7">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-[11px] text-[#6B655F] tracking-[0.5px]">OR</span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        {/* Register link */}
        <p className="text-center text-[13px] text-[#7F776E]">
          Don't have an account?{" "}
          <Link href="/register" className="text-[#D6B37A] hover:text-[#F6F3EE] transition-colors duration-150 font-medium">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}