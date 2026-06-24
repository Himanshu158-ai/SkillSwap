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
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-white mb-8">
          Sent Requests
        </h1>

        {requests.length === 0 ? (
          <div className="bg-slate-900 p-8 rounded-xl text-center">
            <p className="text-slate-400">
              No requests sent yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {requests.map((request) => (
              <div
                key={request._id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5"
              >
                <div className="flex justify-between items-start">

                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {request.receiverId.name}
                    </h2>

                    <p className="text-slate-400 mt-1">
                      📍 {request.receiverId.location}
                    </p>

                    <p className="text-slate-300 mt-3">
                      {request.receiverId.bio}
                    </p>
                  </div>

                  <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                    {request.status}
                  </span>

                </div>
                <div className="mt-5">
                  <h3 className="text-green-400 font-semibold mb-2">
                    Can Teach
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {request.receiverId.canTeach?.map((skill) => (
                      <span
                        key={skill}
                        className="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <h3 className="text-blue-400 font-semibold mb-2">
                    Wants To Learn
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {request.receiverId.wantsToLearn?.map((skill) => (
                      <span
                        key={skill}
                        className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 border-t border-slate-800 pt-5">
                  <h3 className="text-white font-semibold mb-3">
                    Contact Information
                  </h3>

                  <div className="space-y-3">

                    <div className="bg-slate-800 p-3 rounded-lg flex justify-between">
                      <span className="text-slate-400">
                        Email
                      </span>

                      <span className="text-slate-500">
                        🔒 Hidden
                      </span>
                    </div>

                    <div className="bg-slate-800 p-3 rounded-lg flex justify-between">
                      <span className="text-slate-400">
                        Phone
                      </span>

                      <span className="text-slate-500">
                        🔒 Hidden
                      </span>
                    </div>

                  </div>

                  <p className="text-xs text-slate-500 mt-3">
                    Contact information will be available after request acceptance.
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}