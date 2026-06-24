"use client";

import { useEffect, useState } from "react";

export default function SentRequestsPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const res = await fetch("/api/request/send");
    const data = await res.json();

    if (data.success) {
      setRequests(data.requests);
    }
  };

  return (
     <div className="min-h-screen bg-[#0D0D0D] text-[#E8E6E1]">
 
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#0D0D0D]/90 backdrop-blur-xl border-b border-white/[0.07] px-4 sm:px-6 h-16 flex items-center">
        <div>
          <div className="text-[15px] font-medium text-white tracking-tight leading-none">SkillSwap</div>
          <div className="text-[11px] text-[#555] mt-0.5">Your Sent Requests</div>
        </div>
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
                className="bg-[#111] border border-white/[0.08] rounded-[16px] p-5 sm:p-6 space-y-5"
              >
 
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
 
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-[#5465FF]/15 border border-[#5465FF]/20 flex items-center justify-center text-[#8B97FF] text-[13px] font-medium shrink-0">
                      {request.receiverId?.name?.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
 
                    <div className="min-w-0">
                      <h2 className="text-[15px] font-medium text-white truncate">
                        {request.receiverId?.name}
                      </h2>
                      <p className="text-[12px] text-[#555] flex items-center gap-1 mt-0.5">
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
                <div className="border-t border-white/[0.06] pt-5 space-y-2">
 
                  <p className="text-[12px] text-[#555] font-medium mb-3">Contact information</p>
 
                  <div className="flex items-center justify-between bg-[#0D0D0D] border border-white/[0.06] rounded-[10px] px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <svg className="text-[#333]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      <span className="text-[13px] text-[#555]">Email</span>
                    </div>
                    {
                      request.status === "accepted" ? (
                        <div className="flex items-center gap-1.5 text-[#333]">
                      <span className="text-[12px] font-medium">{request.receiverId.email}</span>
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
 
                  <div className="flex items-center justify-between bg-[#0D0D0D] border border-white/[0.06] rounded-[10px] px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <svg className="text-[#333]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.7 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span className="text-[13px] text-[#555]">Phone</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#333]">
                      {
                      request.status === "accepted" ? (
                        <div className="flex items-center gap-1.5 text-[#333]">
                      <span className="text-[12px] font-medium">{request.receiverId.phone}</span>
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
                      <p className="text-[11px] text-[#333] mt-2">
                        Now you can contact the user for the skill swap.
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