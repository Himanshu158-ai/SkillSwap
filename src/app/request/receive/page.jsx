"use client";

import React, { useEffect, useState } from 'react';
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

const ReceiveRequestPage = () => {
  const [requests, setRequests] = useState([]);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/request");
      const data = await res.json();
      console.log(data.requests);
      if (data.success) {
        setRequests(data.requests);
      } else {
        toast.error(data.message || "Failed to load requests.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch received requests.");
    }
  };

  const handelAccept = async (id) => {
    try {
      console.log(id);
      const res = await fetch(`/api/action/accept/${id}`, { method: "POST" });
      const data = await res.json();
      if (data.success) {
        console.log("request accepted", data);
        toast.success(data.message || "Request accepted successfully!");
        fetchRequests();
      } else {
        toast.error(data.message || "Failed to accept request.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handelReject = async (id) => {
    try {
      const res = await fetch(`/api/action/reject/${id}`, { method: "POST" });
      const data = await res.json();
      if (data.success) {
        console.log("request rejected", data);
        toast.success(data.message || "Request rejected successfully!");
        fetchRequests();
      } else {
        toast.error(data.message || "Failed to reject request.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen bg-[#1B1612] text-[#F6F3EE]"
      style={{ fontFamily: "'Geist', 'Inter', 'Manrope', sans-serif" }}
    >

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-[#1B1612]/80 backdrop-blur-2xl border-b border-white/[0.06] px-5 sm:px-8 h-[64px] flex items-center justify-between gap-4">
        <div>
          <div className="text-[15px] font-semibold text-[#F6F3EE] tracking-tight leading-none">SkillSwap</div>
          <div className="text-[9px] text-[#7F776E] mt-[3px] tracking-[0.5px]">Received Requests</div>
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
            Received requests
          </h1>
          <p className="text-[13px] text-[#7F776E] mt-1.5">
            Review and respond to incoming connection requests.
          </p>
        </div>

        {requests.length > 0 ? (
          <div className="space-y-3">
            {requests.map((request) => (
              <div
                key={request._id}
                className="bg-[#241D18] border border-white/[0.07] rounded-2xl p-5 sm:p-6 space-y-5"
              >

                {/* ── Header ── */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">

                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-[#B68D5A]/12 border border-[#B68D5A]/20 flex items-center justify-center text-[#D6B37A] text-[12px] font-semibold shrink-0 uppercase">
                      {request.senderId?.name?.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>

                    <div className="min-w-0">
                      <h2 className="text-[15px] font-semibold text-[#F6F3EE] truncate capitalize">
                        {request.senderId?.name}
                      </h2>
                      <p className="text-[12px] text-[#7F776E] flex items-center gap-1 mt-0.5 capitalize">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                        </svg>
                        {request.senderId?.location}
                      </p>
                    </div>
                  </div>

                  {/* Status badge */}
                  <span className="shrink-0 px-2.5 py-1 bg-[#B68D5A]/10 border border-[#B68D5A]/20 text-[#D6B37A] rounded-full text-[10px] font-semibold capitalize tracking-[0.3px]">
                    {request.status}
                  </span>
                </div>

                {/* ── Bio ── */}
                <p className="text-[13px] text-[#9D9489] leading-[1.7] line-clamp-3">
                  {request.senderId?.bio}
                </p>

                {/* ── Skills ── */}
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] text-[#B68D5A] font-semibold tracking-[1px] uppercase mb-2">
                      Can teach
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {request.senderId?.canTeach?.map((skill) => (
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
                      {request.senderId?.wantsToLearn?.map((skill) => (
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
                <div className="border-t border-white/[0.06] pt-5 space-y-2">
                  <p className="text-[11px] text-[#9D9489] font-semibold tracking-[0.5px] uppercase mb-3">
                    Contact information
                  </p>

                  {/* Email row */}
                  <div className="flex items-center justify-between bg-[#1B1612] border border-white/[0.06] rounded-xl px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <svg className="text-[#6B655F]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      <span className="text-[12px] text-[#7F776E]">Email</span>
                    </div>
                    <span className="text-[12px] text-[#C9C1B7]">
                      {request?.senderId?.email || 'Not shared'}
                    </span>
                  </div>

                  {/* Phone row */}
                  <div className="flex items-center justify-between bg-[#1B1612] border border-white/[0.06] rounded-xl px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <svg className="text-[#6B655F]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.7 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span className="text-[12px] text-[#7F776E]">Phone</span>
                    </div>
                    <span className="text-[12px] text-[#C9C1B7]">
                      {request?.senderId?.phone || 'Not shared'}
                    </span>
                  </div>
                </div>

                {/* ── Actions ── */}
                <div className="flex gap-2.5 pt-1">
                  {
                    request.status==="pending"?(<>
                      <button
                    onClick={() => handelAccept(request._id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-[10px] bg-[#78C67A]/10 border border-[#78C67A]/20 hover:bg-[#78C67A]/16 hover:border-[#78C67A]/32 text-[#78C67A] text-[13px] font-semibold rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.98]"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                    Accept
                  </button>

                  <button
                    onClick={() => handelReject(request._id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-[10px] border border-[#E57373]/15 hover:border-[#E57373]/30 hover:bg-[#E57373]/06 text-[#c9726d] hover:text-[#E57373] text-[13px] font-medium rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.98]"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                    </svg>
                    Reject
                  </button>
                    </>):(
                      <p className="text-center text-[13px] text-[#78C67A]">
                        Request Already Accepted
                      </p>
                    )
                  }
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#241D18] border border-white/[0.07] rounded-2xl p-14 text-center">
            <div className="w-10 h-10 rounded-full bg-[#B68D5A]/08 border border-[#B68D5A]/12 flex items-center justify-center mx-auto mb-4">
              <svg width="18" height="18" className="text-[#7F776E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
              </svg>
            </div>
            <p className="text-[#9D9489] text-[14px] font-medium">No requests yet</p>
            <p className="text-[#6B655F] text-[12px] mt-1.5">
              When someone sends you a request, it'll appear here.
            </p>
          </div>
        )}

      </main>
    </div>
  );
};

export default ReceiveRequestPage;