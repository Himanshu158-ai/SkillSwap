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
    <div className="min-h-screen bg-[#0D0D0D] text-[#E8E6E1]">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#0D0D0D]/90 backdrop-blur-xl border-b border-white/[0.07] px-4 sm:px-6 h-16 flex items-center justify-between">
        <div>
          <div className="text-[15px] font-medium text-white tracking-tight leading-none">SkillSwap</div>
          <div className="text-[11px] text-[#555] mt-0.5">Your Sent Requests</div>
        </div>
        <button
          onClick={() => router.push("/discover")}
          className="
                      px-3 sm:px-4 py-2 rounded-[8px]
                      bg-transparent border border-white/10 text-[#999]
                      text-[12px] sm:text-[13px] font-medium
                      hover:border-white/20 hover:text-white
                      transition-colors duration-200 cursor-pointer
                    "
        >
          Back to Discover
        </button>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-[28px] sm:text-[34px] font-medium text-white tracking-tight leading-tight">
            Sent requests
          </h1>
          <p className="text-[13px] text-[#555] mt-1">
            Track the status of your outgoing connection requests.
          </p>
        </div>

        {/* Empty state */}
        {requests.length === 0 ? (
          <div className="bg-[#111] border border-white/[0.08] rounded-[16px] p-12 text-center">
            <p className="text-[#444] text-[14px]">No requests sent yet</p>
            <p className="text-[#333] text-[12px] mt-1">
              Visit Discover to find people and send your first request
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request._id}
                className={`relative overflow-hidden rounded-[18px] p-5 sm:p-6 space-y-5 border transition-all duration-300
  ${request.status === "accepted"
                    ? "bg-gradient-to-br from-[#18140b] via-[#12110d] to-[#111] border-[#D4AF37]/25 shadow-[0_0_35px_rgba(212,175,55,.08)]"
                    : "bg-[#111] border-white/[0.08]"
                  }`}
              >
                {
                  request.status === "accepted" && (
                    <>
                      <div className="absolute -top-28 right-0 w-60 h-60 rounded-full bg-[#D4AF37]/10 blur-[90px]" />
                      <div className="absolute -bottom-24 left-0 w-60 h-60 rounded-full bg-[#D4AF37]/5 blur-[100px]" />
                    </>
                  )
                }

                {/* Header */}
                <div className="flex items-start justify-between gap-3">

                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className={`capitalize w-10 h-10 rounded-full flex items-center justify-center text-[20px] font-medium shrink-0
    ${request.status === "accepted"
                        ? "bg-[#D4AF37]/15 border border-[#D4AF37]/25 text-[#F5D76E]"
                        : "bg-[#5465FF]/15 border border-[#5465FF]/20 text-[#8B97FF]"
                      }`}>
                      {request.receiverId?.name?.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>

                    <div className="min-w-0">
                      <h2 className="text-[15px] font-medium text-white truncate capitalize">
                        {request.receiverId?.name}
                      </h2>
                      <p className="text-[12px] text-[#555] flex items-center gap-1 mt-0.5 capitalize">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                        </svg>
                        {request.receiverId?.location}
                      </p>
                    </div>
                  </div>

                  {/* Status badge */}
                  <span className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium capitalize border
                    ${request.status === "accepted"
                      ? "bg-green-500/10 border-green-500/20 text-green-400"
                      : request.status === "rejected"
                        ? "bg-red-500/10 border-red-500/20 text-red-400"
                        : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                    }`}
                  >
                    {request.status}
                  </span>

                </div>

                {/* Bio */}
                <p className="text-[13px] text-[#666] leading-relaxed line-clamp-3">
                  {request.receiverId?.bio}
                </p>

                {/* Skills */}
                <div className="grid sm:grid-cols-2 gap-3">

                  <div>
                    <p className="text-[11px] text-[#5465FF] font-medium tracking-wide uppercase mb-2">
                      Can teach
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {request.receiverId?.canTeach?.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 bg-[#5465FF]/10 border border-[#5465FF]/15 text-[#8B97FF] rounded-full text-[11px]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] text-[#666] font-medium tracking-wide uppercase mb-2">
                      Wants to learn
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {request.receiverId?.wantsToLearn?.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.08] text-[#777] rounded-full text-[11px]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Contact info */}
                <div
                  className={`pt-5 space-y-2 ${request.status === "accepted"
                    ? "border-t border-[#D4AF37]/15"
                    : "border-t border-white/[0.06]"
                    }`}
                >

                  {
                    request.status === "accepted"
                      ?
                      <div className="flex items-center gap-2 mb-3">

                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#D4AF37"
                          strokeWidth="2"
                        >
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>

                        <p className="text-[#F5D76E] text-[12px] font-semibold">
                          Contact unlocked
                        </p>

                      </div>

                      :

                      <p className="text-[12px] text-[#555] font-medium mb-3">
                        Contact information
                      </p>

                  }

                  <div
                    className={`flex items-center justify-between rounded-xl px-4 py-3 transition-all
${request.status === "accepted"
                        ? "bg-[#1b1811] border border-[#D4AF37]/20 hover:border-[#D4AF37]/40"
                        : "bg-[#0D0D0D] border border-white/[0.06]"
                      }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <svg className={`w-4 h-4 ${request.status === "accepted"
                        ? "text-[#F5D76E]"
                        : "text-[#333]"
                        }`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      <span className={`text-[13px] ${request.status === "accepted"
                        ? "text-[#F5D76E]"
                        : "text-[#333]"
                        }`}>Email</span>
                    </div>
                    {
                      request.status === "accepted" ? (
                        <div className="flex items-center gap-1.5 text-[#333]">
                          <span
                            className={`text-[12px] font-medium ${request.status === "accepted"
                              ? "text-[#F5D76E]"
                              : "text-white"
                              }`}
                          >{request.receiverId.email}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-[#333]">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                          <span className="text-[12px]">Hidden</span>
                        </div>
                      )
                    }
                  </div>

                  <div
                    className={`flex items-center justify-between rounded-xl px-4 py-3 transition-all
${request.status === "accepted"
                        ? "bg-[#1b1811] border border-[#D4AF37]/20 hover:border-[#D4AF37]/40"
                        : "bg-[#0D0D0D] border border-white/[0.06]"
                      }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <svg className={`w-4 h-4 ${request.status === "accepted"
                        ? "text-[#F5D76E]"
                        : "text-[#333]"
                        }`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.7 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span className={`text-[13px] ${request.status === "accepted"
                        ? "text-[#F5D76E]"
                        : "text-[#333]"
                        }`}>Phone</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#333]">
                      {
                        request.status === "accepted" ? (
                          <div className="flex items-center gap-1.5 text-[#333]">
                            <span
                              className={`text-[12px] font-medium ${request.status === "accepted"
                                ? "text-[#F5D76E]"
                                : "text-white"
                                }`}
                            >{request.receiverId.phone}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-[#333]">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            <span className="text-[12px]">Hidden</span>
                          </div>
                        )
                      }
                    </div>
                  </div>

                  {
                    request.status === "accepted" ? (
                      <p className={`text-[11px] mt-2 ${request.status === "accepted"
                        ? "text-[#F5D76E]"
                        : "text-[#333]"
                        }`}>
                        You can now contact them for the skill swap
                      </p>
                    ) : (
                      <p className="text-[11px] text-[#333] mt-2">
                        Contact details visible after request is accepted.
                      </p>
                    )
                  }

                </div>

              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}