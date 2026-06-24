"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DiscoverPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

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



  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <nav className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          <h1 className="text-2xl font-bold text-green-400">
            SkillSwap
          </h1>

          <div className="flex gap-4 flex-wrap">

            <button
              onClick={() => router.push("/request/send")}
              className="text-white hover:text-green-400"
            >
              Sent Requests
            </button>

            <button
              onClick={() => router.push("/request/receive")}
              className="text-white hover:text-green-400"
            >
              Received Requests
            </button>

          </div>
        </div>
      </nav>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search skill (React, English, Node...)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none"
        />
      </div>
      <h1 className="text-3xl font-bold text-white mb-8">
        Discover Users
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5"
          >
            <h2 className="text-xl font-semibold text-white">
              {user.name}
            </h2>

            <p className="text-slate-400 mt-2">
              {user.location}
            </p>

            <p className="text-slate-300 mt-3">
              {user.bio}
            </p>

            <div className="mt-4">
              <p className="text-green-400 font-medium">
                Can Teach
              </p>

              <div className="flex flex-wrap gap-2 mt-2">
                {user.canTeach?.map((skill) => (
                  <span
                    key={skill}
                    className="bg-green-500/20 text-green-400 px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="text-blue-400 font-medium">
                Wants To Learn
              </p>

              <div className="flex flex-wrap gap-2 mt-2">
                {user.wantsToLearn?.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button
              className="w-full mt-5 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
              onClick={() => {
                viewDetail(user._id);
              }}
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}