"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

export default function DiscoverPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { user, loading, setUser } = useAuth();
  const toast = useToast();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error(data.message || "Failed to load users.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users.");
    }
  };

  const logOut = async () => {
    try {
      const res = await fetch("/api/auth/logout");
      const data = await res.json();
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        router.push("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to logout.");
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
  };

  if (loading || !user) {
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
      <nav className="sticky top-0 z-50 bg-[#1B1612]/80 backdrop-blur-2xl border-b border-white/[0.06] px-5 sm:px-8 h-[64px] flex items-center justify-between gap-4">

  <div>
    <div className="text-[15px] font-semibold text-[#F6F3EE] tracking-tight leading-none">SkillSwap</div>
    <div className="text-[9px] text-[#7F776E] mt-[3px] tracking-[0.5px]">Discover & Connect</div>
  </div>

  <div className="flex items-center gap-1.5">

    {/* Outbox — ghost */}
    <button
      onClick={() => router.push("/request/send")}
      className="flex items-center gap-1.5 px-3 sm:px-3.5 py-[7px] rounded-[10px] border border-white/[0.08] text-[#9D9489] text-[12px] sm:text-[13px] font-medium hover:border-white/[0.15] hover:text-[#F6F3EE] hover:bg-white/[0.03] transition-all duration-200 cursor-pointer"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4 20-7z"/>
      </svg>
      <span>Outbox</span>
    </button>

    {/* Inbox — warm tint */}
    <button
      onClick={() => router.push("/request/receive")}
      className="flex items-center gap-1.5 px-3 sm:px-3.5 py-[7px] rounded-[10px] border border-[#B68D5A]/20 bg-[#B68D5A]/08 text-[#D6B37A] text-[12px] sm:text-[13px] font-medium hover:bg-[#B68D5A]/14 hover:border-[#B68D5A]/32 hover:text-[#F0CC94] transition-all duration-200 cursor-pointer"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
      </svg>
      <span>Inbox</span>
    </button>

    {/* Separator */}
    <div className="w-px h-[18px] bg-white/[0.07] mx-0.5" />

    {/* Logout — ghost danger */}
    <button
      onClick={logOut}
      className="flex items-center gap-1.5 px-3 sm:px-3.5 py-[7px] rounded-[10px] border border-[#E57373]/15 text-[#c9726d] text-[12px] sm:text-[13px] font-medium hover:border-[#E57373]/30 hover:text-[#E57373] hover:bg-[#E57373]/06 transition-all duration-200 cursor-pointer"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
      </svg>
      <span>Logout</span>
    </button>

  </div>
</nav>

      {/* ── Main ── */}
      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-10">

        {/* Page header + search */}
        <div className="mb-10">
          <h1 className="text-[28px] sm:text-[34px] font-bold text-[#F6F3EE] tracking-[-1px] leading-tight mb-1.5">
            Discover users
          </h1>
          <p className="text-[13px] text-[#7F776E] mb-6">
            Find people who can teach what you want to learn.
          </p>

          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B655F] pointer-events-none"
              width="15" height="15" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search by skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
                w-full pl-11 pr-4 py-[13px]
                bg-[#241D18] border border-white/[0.07] rounded-xl
                text-[14px] text-[#F6F3EE] placeholder:text-[#6B655F]
                outline-none transition-all duration-200
                focus:border-[#B68D5A]/50
              "
            />
          </div>
        </div>

        {/* Results count */}
        <p className="text-[11px] text-[#6B655F] tracking-[0.3px] mb-5">
          {filteredUsers.length} {filteredUsers.length === 1 ? "user" : "users"} found
        </p>

        {/* User grid */}
        {filteredUsers.length > 0 ? (
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))" }}
          >
            {filteredUsers.map((u) => (
              <div
                key={u._id}
                className="
                  bg-[#241D18] border border-white/[0.07] rounded-2xl p-5 sm:p-6
                  flex flex-col gap-5
                  hover:border-white/[0.12] hover:bg-[#2D241D]
                  transition-all duration-200
                "
              >
                {/* User info */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#B68D5A]/12 border border-[#B68D5A]/20 flex items-center justify-center text-[#D6B37A] text-[12px] font-semibold shrink-0 uppercase">
                    {u.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-[15px] font-semibold text-[#F6F3EE] truncate capitalize">{u.name}</h2>
                    <p className="text-[12px] text-[#7F776E] flex items-center gap-1 mt-0.5 capitalize">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                      </svg>
                      {u.location}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-[13px] text-[#9D9489] leading-relaxed line-clamp-3">
                  {u.bio}
                </p>

                {/* Skills */}
                <div className="space-y-3">

                  <div>
                    <p className="text-[10px] text-[#B68D5A] font-semibold tracking-[1px] uppercase mb-2">
                      Can teach
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {u.canTeach?.map((skill) => (
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
                      {u.wantsToLearn?.map((skill) => (
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

                {/* CTA */}
                <button
                  onClick={() => viewDetail(u._id)}
                  className="
                    w-full py-[9px] mt-auto
                    bg-[#2D241D] hover:bg-[#352B23]
                    border border-white/[0.08] hover:border-white/[0.14]
                    text-[#C9C1B7] hover:text-[#F6F3EE]
                    text-[13px] font-medium
                    rounded-xl transition-all duration-200 cursor-pointer
                    active:scale-[0.98]
                  "
                >
                  View profile
                </button>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-[#7F776E] text-[14px]">No users found for "{searchTerm}"</p>
            <p className="text-[#6B655F] text-[12px] mt-1.5">Try a different skill or name</p>
          </div>
        )}

      </main>
    </div>
  );
}