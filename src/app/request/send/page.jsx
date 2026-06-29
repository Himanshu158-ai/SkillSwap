"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

export default function SentRequestsPage() {
  const [requests, setRequests] = useState([]);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/request/send");
      const data = await res.json();
      console.log(data);
      if (data.success) {
        setRequests(data.requests);
      } else {
        toast.error(data.message || "Failed to load sent requests.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch sent requests.");
    }
  };

  return (
    <div
      className="min-h-screen bg-[#1B1612] text-[#F6F3EE]"
      style={{ fontFamily: "'Geist', 'Inter', 'Manrope', sans-serif" }}
    >

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-[#1B1612]/80 backdrop-blur-2xl border-b border-white/[0.06] px-5 sm:px-8 h-[64px] flex items-center justify-between">
        <div>
          <div className="text-[15px] font-semibold text-[#F6F3EE] tracking-tight leading-none">SkillSwap</div>
          <div className="text-[9px] text-[#7F776E] mt-[3px] tracking-[0.5px]">Your Sent Requests</div>
        </div>
        <button
          onClick={() => router.push("/discover")}
          className="flex items-center gap-1.5 px-3 sm:px-3.5 py-[7px] rounded-[10px] border border-white/[0.08] text-[#9D9489] text-[12px] sm:text-[13px] font-medium hover:border-white/[0.15] hover:text-[#F6F3EE] hover:bg-white/[0.03] transition-all duration-200 cursor-pointer"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
          </svg>
          Discover
        </button>
      </nav>

      <main className="max-w-3xl mx-auto px-5 sm:px-6 py-10">

        {/* ── Page header ── */}
        <div className="mb-8">
          <h1 className="text-[28px] sm:text-[34px] font-bold text-[#F6F3EE] tracking-[-1px] leading-tight">
            Sent requests
          </h1>
          <p className="text-[13px] text-[#7F776E] mt-1.5">
            Track the status of your outgoing connection requests.
          </p>
        </div>

        {/* ── Empty state ── */}
        {requests.length === 0 ? (
          <div className="bg-[#241D18] border border-white/[0.07] rounded-2xl p-14 text-center">
            <div className="w-10 h-10 rounded-full bg-[#B68D5A]/08 border border-[#B68D5A]/12 flex items-center justify-center mx-auto mb-4">
              <svg width="18" height="18" className="text-[#7F776E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4 20-7z"/>
              </svg>
            </div>
            <p className="text-[#9D9489] text-[14px] font-medium">No requests sent yet</p>
            <p className="text-[#6B655F] text-[12px] mt-1.5">
              Visit Discover to find people and send your first request.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {requests.map((request) => (
              <div
                key={request._id}
                className={`relative overflow-hidden rounded-2xl p-5 sm:p-6 space-y-5 border transition-all duration-300
                  ${request.status === "accepted"
                    ? "bg-gradient-to-br from-[#18140b] via-[#12110d] to-[#111] border-[#D4AF37]/25 shadow-[0_0_35px_rgba(212,175,55,.08)]"
                    : "bg-[#241D18] border-white/[0.07]"
                  }`}
              >

                {/* Gold glow blobs — accepted only, untouched */}
                {request.status === "accepted" && (
                  <>
                    <div className="absolute -top-28 right-0 w-60 h-60 rounded-full bg-[#D4AF37]/10 blur-[90px]" />
                    <div className="absolute -bottom-24 left-0 w-60 h-60 rounded-full bg-[#D4AF37]/5 blur-[100px]" />
                  </>
                )}

                {/* ── Header ── */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">

                    {/* Avatar */}
                    <div className={`capitalize w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-semibold shrink-0
                      ${request.status === "accepted"
                        ? "bg-[#D4AF37]/15 border border-[#D4AF37]/25 text-[#F5D76E]"
                        : "bg-[#B68D5A]/12 border border-[#B68D5A]/20 text-[#D6B37A]"
                      }`}
                    >
                      {request.receiverId?.name?.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>

                    <div className="min-w-0">
                      <h2 className="text-[15px] font-semibold text-[#F6F3EE] truncate capitalize">
                        {request.receiverId?.name}
                      </h2>
                      <p className="text-[12px] text-[#7F776E] flex items-center gap-1 mt-0.5 capitalize">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                        </svg>
                        {request.receiverId?.location}
                      </p>
                    </div>
                  </div>

                  {/* Status badge */}
                  <span className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-semibold capitalize border tracking-[0.3px]
                    ${request.status === "accepted"
                      ? "bg-[#D4AF37]/15 border-[#D4AF37]/25 text-[#F5D76E]"
                      : request.status === "rejected"
                        ? "bg-[#E57373]/08 border-[#E57373]/20 text-[#E57373]"
                        : "bg-[#B68D5A]/10 border-[#B68D5A]/20 text-[#D6B37A]"
                    }`}
                  >
                    {request.status}
                  </span>
                </div>

                {/* ── Bio ── */}
                <p className="text-[13px] text-[#9D9489] leading-[1.7] line-clamp-3">
                  {request.receiverId?.bio}
                </p>

                {/* ── Skills ── */}
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] text-[#B68D5A] font-semibold tracking-[1px] uppercase mb-2">
                      Can teach
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {request.receiverId?.canTeach?.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 bg-[#B68D5A]/10 border border-[#B68D5A]/15 text-[#D6B37A] rounded-full text-[11px]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] text-[#7F776E] font-semibold tracking-[1px] uppercase mb-2">
                      Wants to learn
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {request.receiverId?.wantsToLearn?.map((skill) => (
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

                {/* ── Contact info ── */}
                <div className={`pt-5 space-y-2 ${request.status === "accepted" ? "border-t border-[#D4AF37]/15" : "border-t border-white/[0.06]"}`}>

                  {request.status === "accepted" ? (
                    <div className="flex items-center gap-2 mb-3">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      <p className="text-[#F5D76E] text-[12px] font-semibold">Contact unlocked</p>
                    </div>
                  ) : (
                    <p className="text-[11px] text-[#9D9489] font-semibold tracking-[0.5px] uppercase mb-3">
                      Contact information
                    </p>
                  )}

                  {/* Email row */}
                  <div className={`flex items-center justify-between rounded-xl px-4 py-3 transition-all
                    ${request.status === "accepted"
                      ? "bg-[#1b1811] border border-[#D4AF37]/20 hover:border-[#D4AF37]/40"
                      : "bg-[#1B1612] border border-white/[0.06]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <svg className={`w-4 h-4 ${request.status === "accepted" ? "text-[#F5D76E]" : "text-[#6B655F]"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      <span className={`text-[13px] ${request.status === "accepted" ? "text-[#F5D76E]" : "text-[#7F776E]"}`}>
                        Email
                      </span>
                    </div>
                    {request.status === "accepted" ? (
                      <span className="text-[12px] font-medium text-[#F5D76E]">{request.receiverId.email}</span>
                    ) : (
                      <div className="flex items-center gap-1.5 text-[#6B655F]">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <span className="text-[12px]">Hidden</span>
                      </div>
                    )}
                  </div>

                  {/* Phone row */}
                  <div className={`flex items-center justify-between rounded-xl px-4 py-3 transition-all
                    ${request.status === "accepted"
                      ? "bg-[#1b1811] border border-[#D4AF37]/20 hover:border-[#D4AF37]/40"
                      : "bg-[#1B1612] border border-white/[0.06]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <svg className={`w-4 h-4 ${request.status === "accepted" ? "text-[#F5D76E]" : "text-[#6B655F]"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.7 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span className={`text-[13px] ${request.status === "accepted" ? "text-[#F5D76E]" : "text-[#7F776E]"}`}>
                        Phone
                      </span>
                    </div>
                    {request.status === "accepted" ? (
                      <span className="text-[12px] font-medium text-[#F5D76E]">{request.receiverId.phone}</span>
                    ) : (
                      <div className="flex items-center gap-1.5 text-[#6B655F]">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <span className="text-[12px]">Hidden</span>
                      </div>
                    )}
                  </div>

                  <p className={`text-[11px] mt-2 ${request.status === "accepted" ? "text-[#F5D76E]" : "text-[#6B655F]"}`}>
                    {request.status === "accepted"
                      ? "You can now contact them for the skill swap."
                      : "Contact details visible after request is accepted."
                    }
                  </p>

                </div>

              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}