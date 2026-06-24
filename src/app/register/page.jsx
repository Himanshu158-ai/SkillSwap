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
    <div className="relative min-h-screen flex items-center justify-center px-4 py-8 overflow-hidden bg-[#F8FCFF]">

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#5465FF]/15 rounded-full blur-[120px]" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#9BB1FF]/30 rounded-full blur-[120px]" />

      <div
        className="
  relative
  z-10
  w-full
  max-w-md
  bg-white/80
  backdrop-blur-xl
  border
  border-white
  rounded-[32px]
  p-10
  shadow-[0_20px_80px_rgba(84,101,255,0.15)]
"
      >

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            Create Account
          </h1>
          <p className="text-slate-500 mt-3">
            Create your account and start learning today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm text-slate-700 font-medium mb-2">
              Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="
w-full
px-4
py-4
bg-white
border
border-slate-200
rounded-2xl
outline-none
transition-all
placeholder:text-slate-400
focus:border-[#5465FF]
focus:ring-4
focus:ring-[#5465FF]/10
"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-700 font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="
w-full
px-4
py-4
bg-white
border
border-slate-200
rounded-2xl
outline-none
transition-all
placeholder:text-slate-400
focus:border-[#5465FF]
focus:ring-4
focus:ring-[#5465FF]/10
"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-700 font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className="
w-full
px-4
py-4
bg-white
border
border-slate-200
rounded-2xl
outline-none
transition-all
placeholder:text-slate-400
focus:border-[#5465FF]
focus:ring-4
focus:ring-[#5465FF]/10
"
              required
            />
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Use at least 8 characters for better security.
          </p>

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
cursor-pointer
"
          >
            Create Account
          </button>
          <div className="flex items-center gap-4 my-6">

            <div className="flex-1 h-px bg-slate-200" />

            <span className="text-sm text-slate-400">
              OR
            </span>

            <div className="flex-1 h-px bg-slate-200" />

          </div>
        </form>


        <p className="text-center text-slate-500 mt-8">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#5465FF] font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}