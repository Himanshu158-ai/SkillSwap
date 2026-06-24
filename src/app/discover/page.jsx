"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/context/AuthContext";

export default function DiscoverPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user]);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();

    if (data.success) {
      setUsers(data.users);
    }
  };


  const filteredUsers = users.filter((user) => {
    if (!searchTerm.trim()) return true;

    return (
      user.canTeach?.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      user.wantsToLearn?.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  const viewDetail = async (id) => {
    router.push(`/discover/${id}`);
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-white/[0.08] border-t-[#5465FF] animate-spin" />
          <p className="text-[13px] text-[#444]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#E8E6E1]">
 
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#0D0D0D]/90 backdrop-blur-xl border-b border-white/[0.07] px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
 
        <div>
          <div className="text-[15px] font-medium text-white tracking-tight leading-none">SkillSwap</div>
          <div className="text-[11px] text-[#555] mt-0.5">Discover & Connect</div>
        </div>
 
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => router.push("/request/send")}
            className="
              px-3 sm:px-4 py-2 rounded-[8px]
              bg-transparent border border-white/10 text-[#999]
              text-[12px] sm:text-[13px] font-medium
              hover:border-white/20 hover:text-white
              transition-colors duration-200 cursor-pointer
            "
          >
            <span className="hidden sm:inline">Outbox </span>
          </button>
          <button
            onClick={() => router.push("/request/receive")}
            className="
              px-3 sm:px-4 py-2 rounded-[8px]
              bg-[#5465FF] hover:bg-[#4354ee] text-white
              text-[12px] sm:text-[13px] font-medium
              transition-colors duration-200 cursor-pointer
            "
          >
            <span className="hidden sm:inline">Inbox </span>
          </button>
        </div>
 
      </nav>
 
      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
 
        {/* Page header + search */}
        <div className="mb-10">
          <h1 className="text-[28px] sm:text-[34px] font-medium text-white tracking-tight leading-tight mb-1">
            Discover users
          </h1>
          <p className="text-[13px] text-[#555] mb-4">
            Find people who can teach what you want to learn.
          </p>
 
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#444] pointer-events-none"
              width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search by name or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
                w-full pl-11 pr-4 py-[11px]
                bg-[#111] border border-white/[0.08] rounded-[10px]
                text-[14px] text-[#E8E6E1] placeholder:text-[#444]
                outline-none transition-colors duration-200
                focus:border-[#5465FF]
              "
            />
          </div>
        </div>
 
        {/* Results count */}
        <p className="text-[12px] text-[#444] mb-5">
          {filteredUsers.length} {filteredUsers.length === 1 ? "user" : "users"} found
        </p>
 
        {/* User grid */}
        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="
                  bg-[#111] border border-white/[0.08] rounded-[16px] p-6
                  flex flex-col gap-5
                  hover:border-white/[0.14] transition-colors duration-200
                "
              >
                {/* User info */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#5465FF]/15 border border-[#5465FF]/20 flex items-center justify-center text-[#8B97FF] text-[13px] font-medium shrink-0 uppercase">
                    {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-[15px] font-medium text-white truncate">{user.name}</h2>
                    <p className="text-[12px] text-[#555] flex items-center gap-1 mt-0.5">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                      </svg>
                      {user.location}
                    </p>
                  </div>
                </div>
 
                {/* Bio */}
                <p className="text-[13px] text-[#666] leading-relaxed line-clamp-3">
                  {user.bio}
                </p>
 
                {/* Skills */}
                <div className="space-y-3">
 
                  <div>
                    <p className="text-[11px] text-[#5465FF] font-medium tracking-wide uppercase mb-2">
                      Can teach
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {user.canTeach?.map((skill) => (
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
                      {user.wantsToLearn?.map((skill) => (
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
 
                {/* CTA */}
                <button
                  onClick={() => viewDetail(user._id)}
                  className="
                    w-full py-2.5 mt-auto
                    bg-[#5465FF] hover:bg-[#4354ee]
                    text-white text-[13px] font-medium
                    rounded-[8px] transition-colors duration-200 cursor-pointer
                  "
                >
                  View profile
                </button>
 
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-[#444] text-[14px]">No users found for "{searchTerm}"</p>
            <p className="text-[#333] text-[12px] mt-1">Try a different skill or name</p>
          </div>
        )}
 
      </main>
    </div>
  );
}