"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/context/ToastContext";
import useAuth from "@/context/AuthContext";

export default function UserProfile() {
  const { id } = useParams();
  const toast = useToast();

  const [userr, setUserr] = useState(null);
  const [isAlready, setIsAlready] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [id]);

  const fetchUser = async () => {
    try {
      const res = await fetch(`/api/users/${id}`);
      const data = await res.json();
      if (data.success) {
        setUserr(data.user);
      } else {
        toast.error(data.message || "Failed to load user profile.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch user profile.");
    }
  };

  const handelRequest = async (receiverId) => {
    try {
      const res = await fetch("/api/request/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receiverId }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setIsAlready(true);
      } else {
        toast.error(data.message || "Failed to send request.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while sending connection request.");
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await fetch(`/api/request/send/${id}`, { method: "GET" });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        setIsAlready(true);
        return;
      }
      setIsAlready(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch request status.");
    }
  };

  if (!userr) {
    return (
      <div className="min-h-screen bg-[#1B1612] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-7 h-7 rounded-full border-2 border-white/[0.06] border-t-[#B68D5A] animate-spin" />
          <p className="text-[12px] text-[#6B655F]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#1B1612] text-[#F6F3EE]"
      style={{ fontFamily: "'Geist', 'Inter', 'Manrope', sans-serif" }}
    >

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-[#1B1612]/80 backdrop-blur-2xl border-b border-white/[0.06] px-5 sm:px-8 h-[64px] flex items-center">
        <div>
          <div className="text-[15px] font-semibold text-[#F6F3EE] tracking-tight leading-none">SkillSwap</div>
          <div className="text-[9px] text-[#7F776E] mt-[3px] tracking-[0.5px] capitalize">
            Viewing {userr?.name}
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-5 sm:px-6 py-10 space-y-3">

        {/* ── Profile card ── */}
        <div className="bg-[#241D18] border border-white/[0.07] rounded-2xl p-6 sm:p-8">
          <div className="flex items-start gap-4">

            {/* Avatar */}
            <div className="w-[52px] h-[52px] rounded-full bg-[#B68D5A]/12 border border-[#B68D5A]/20 flex items-center justify-center text-[#D6B37A] text-[18px] font-semibold shrink-0 capitalize">
              {userr?.name?.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>

            <div className="min-w-0">
              <h1 className="text-[22px] font-bold text-[#F6F3EE] tracking-[-0.6px] leading-tight capitalize">
                {userr?.name}
              </h1>
              <p className="text-[12px] text-[#7F776E] flex items-center gap-1.5 mt-1 capitalize">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                </svg>
                {userr?.location}
              </p>
            </div>
          </div>

          <p className="text-[13px] text-[#9D9489] leading-[1.7] mt-5">
            {userr?.bio}
          </p>
        </div>

        {/* ── Skills grid ── */}
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))" }}
        >

          {/* Can Teach */}
          <div className="bg-[#241D18] border border-white/[0.07] rounded-2xl p-5">
            <p className="text-[10px] text-[#B68D5A] font-semibold tracking-[1px] uppercase mb-3">
              Can teach
            </p>
            <div className="flex flex-wrap gap-1.5">
              {userr?.canTeach?.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 bg-[#B68D5A]/10 border border-[#B68D5A]/15 text-[#D6B37A] rounded-full text-[11px]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Wants to Learn */}
          <div className="bg-[#241D18] border border-white/[0.07] rounded-2xl p-5">
            <p className="text-[10px] text-[#7F776E] font-semibold tracking-[1px] uppercase mb-3">
              Wants to learn
            </p>
            <div className="flex flex-wrap gap-1.5">
              {userr?.wantsToLearn?.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.07] text-[#9D9489] rounded-full text-[11px]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* ── Contact card ── */}
        <div className="bg-[#241D18] border border-white/[0.07] rounded-2xl p-6 sm:p-8">

          <h2 className="text-[15px] font-semibold text-[#F6F3EE] mb-5">
            Contact information
          </h2>

          <div className="space-y-2">

            {/* Email row */}
            <div className="flex items-center gap-3 bg-[#1B1612] border border-white/[0.06] rounded-xl px-4 py-3">
              <svg className="text-[#6B655F] shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span className="text-[13px] text-[#6B655F]">Email hidden</span>
              <svg className="ml-auto text-[#6B655F]/60 shrink-0" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>

            {/* Phone row */}
            <div className="flex items-center gap-3 bg-[#1B1612] border border-white/[0.06] rounded-xl px-4 py-3">
              <svg className="text-[#6B655F] shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.7 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className="text-[13px] text-[#6B655F]">Phone hidden</span>
              <svg className="ml-auto text-[#6B655F]/60 shrink-0" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>

          </div>

          <p className="text-[12px] text-[#7F776E] mt-4 leading-[1.65]">
            Send a connection request. Once accepted, you'll be able to view their contact details.
          </p>

          {/* Divider */}
          <div className="h-px bg-white/[0.06] my-5" />

          {/* Send request button */}
          <button
            onClick={() => handelRequest(userr._id)}
            disabled={isAlready}
            className={`
              w-full py-[11px]
              text-[14px] font-semibold
              rounded-xl transition-all duration-200
              ${isAlready
                ? "bg-[#78C67A]/08 border border-[#78C67A]/20 text-[#78C67A] cursor-not-allowed"
                : "bg-[#B68D5A] hover:bg-[#C9A06A] text-[#1B1612] cursor-pointer active:scale-[0.98]"
              }
            `}
          >
            {isAlready ? "Already sent" : "Send request"}
          </button>

          <p className="text-[12px] text-[#7F776E] mt-4 leading-[1.65]">
            The receiver can see your contact information before they accept your request.
          </p>

        </div>

      </main>
    </div>
  );
}