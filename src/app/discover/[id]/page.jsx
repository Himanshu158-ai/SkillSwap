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
                headers: {
                    "Content-Type": "application/json",
                },
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
    }

    const fetchRequests = async () => {
        try {
            const res = await fetch(`/api/request/send/${id}`, {
                method: "GET",
            });
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
            <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">

                    {/* Spinner */}
                    <div className="w-8 h-8 rounded-full border-2 border-white/[0.08] border-t-[#5465FF] animate-spin" />

                    <p className="text-[13px] text-[#444]">Loading...</p>

                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0D0D0D] text-[#E8E6E1]">

            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-[#0D0D0D]/90 backdrop-blur-xl border-b border-white/[0.07] px-4 sm:px-6 h-16 flex items-center">
                <div>
                    <div className="text-[15px] font-medium text-white tracking-tight leading-none">SkillSwap</div>
                    <div className="text-[11px] text-[#555] mt-0.5">To {userr?.name}</div>
                </div>
            </nav>

            <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-4">

                {/* Profile card */}
                <div className="bg-[#111] border border-white/[0.08] rounded-[16px] p-6 sm:p-8">

                    <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="w-[52px] h-[52px] rounded-full bg-[#5465FF]/15 border border-[#5465FF]/20 flex items-center justify-center text-[#8B97FF] text-[25px] font-medium shrink-0 capitalize">
                            {userr?.name?.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>

                        <div className="min-w-0">
                            <h1 className="text-[22px] font-medium text-white tracking-tight leading-tight capitalize">
                                {userr?.name}
                            </h1>
                            <p className="text-[12px] text-[#555] flex items-center gap-1 mt-1 capitalize">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                                </svg>
                                {userr?.location}
                            </p>
                        </div>
                    </div>

                    <p className="text-[13px] text-[#666] leading-relaxed mt-5">
                        {userr?.bio}
                    </p>

                </div>

                {/* Skills grid */}
                <div className="grid gap-3"
                    style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))" }}>

                    {/* Can Teach */}
                    <div className="bg-[#111] border border-white/[0.08] rounded-[16px] p-5">
                        <p className="text-[11px] text-[#5465FF] font-medium tracking-wide uppercase mb-3">
                            Can teach
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                            {userr?.canTeach?.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-2.5 py-1 bg-[#5465FF]/10 border border-[#5465FF]/15 text-[#8B97FF] rounded-full text-[11px]"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Wants to Learn */}
                    <div className="bg-[#111] border border-white/[0.08] rounded-[16px] p-5">
                        <p className="text-[11px] text-[#666] font-medium tracking-wide uppercase mb-3">
                            Wants to learn
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                            {userr?.wantsToLearn?.map((skill) => (
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
                <div className="bg-[#111] border border-white/[0.08] rounded-[16px] p-6 sm:p-8">

                    <h2 className="text-[15px] font-medium text-white mb-4">
                        Contact information
                    </h2>

                    <div className="space-y-2.5">

                        <div className="flex items-center gap-3 bg-[#0D0D0D] border border-white/[0.06] rounded-[10px] px-4 py-3">
                            <svg className="text-[#333] shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                            <span className="text-[13px] text-[#444]">Email hidden</span>
                            <svg className="ml-auto text-[#333] shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </div>

                        <div className="flex items-center gap-3 bg-[#0D0D0D] border border-white/[0.06] rounded-[10px] px-4 py-3">
                            <svg className="text-[#333] shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.7 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            <span className="text-[13px] text-[#444]">Phone hidden</span>
                            <svg className="ml-auto text-[#333] shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </div>

                    </div>

                    <p className="text-[12px] text-[#444] mt-4 leading-relaxed">
                        Send a connection request. Once accepted, you'll be able to view their contact details.
                    </p>

                    {/* Divider */}
                    <div className="h-px bg-white/[0.06] my-5" />

                    <button
                        onClick={() => handelRequest(userr._id)}
                        disabled={isAlready}
                        className={`
    w-full py-3
    text-[14px] font-medium
    rounded-[10px] transition-colors duration-200
    ${isAlready
                                ? "bg-green-400/10 border border-green-400/20 text-green-400 cursor-not-allowed"
                                : "bg-[#5465FF] hover:bg-[#4354ee] text-white cursor-pointer"
                            }
  `}
                    >
                        {isAlready
                            ? "Already sent a request!"
                            : "Send request"}
                    </button>
                    <p className="text-[12px] text-[#444] mt-4 leading-relaxed">
                        The receiver can see your contact information before they accept your request.
                    </p>

                </div>

            </main>
        </div>
    );
}