"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/context/ToastContext";

export default function UserProfile() {
    const { id } = useParams();
    const toast = useToast();

    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const res = await fetch(`/api/users/${id}`);
        const data = await res.json();

        if (data.success) {
            setUser(data.user);
        }
    };

    const handelRequest = async (receiverId) => {
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
        } else {
            toast.error(data.message || "Failed to send request.");
        }
    }



    if (!user) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 p-6">
            <div className="max-w-4xl mx-auto">

                <div className="bg-slate-900 rounded-xl p-6">
                    <h1 className="text-3xl font-bold text-white">
                        {user.name}
                    </h1>

                    <p className="text-slate-400 mt-2">
                        📍 {user.location}
                    </p>

                    <p className="text-slate-300 mt-4">
                        {user.bio}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">

                    <div className="bg-slate-900 p-5 rounded-xl">
                        <h2 className="text-green-400 font-semibold mb-3">
                            Can Teach
                        </h2>

                        {user.canTeach?.map((skill) => (
                            <span
                                key={skill}
                                className="inline-block bg-green-500/20 text-green-400 px-3 py-1 rounded mr-2 mb-2"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>

                    <div className="bg-slate-900 p-5 rounded-xl">
                        <h2 className="text-blue-400 font-semibold mb-3">
                            Wants To Learn
                        </h2>

                        {user.wantsToLearn?.map((skill) => (
                            <span
                                key={skill}
                                className="inline-block bg-blue-500/20 text-blue-400 px-3 py-1 rounded mr-2 mb-2"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Locked Contact Info */}

                <div className="bg-slate-900 rounded-xl p-6 mt-6">
                    <h2 className="text-white text-xl font-semibold mb-4">
                        Contact Information
                    </h2>

                    <div className="space-y-3">

                        <div className="bg-slate-800 p-4 rounded-lg">
                            🔒 Email Hidden
                        </div>

                        <div className="bg-slate-800 p-4 rounded-lg">
                            🔒 Phone Hidden
                        </div>

                    </div>

                    <p className="text-slate-400 text-sm mt-4">
                        Send a connection request. Once accepted,
                        you will be able to view personal information.
                    </p>

                    <button className="w-full mt-5 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg"
                        onClick={() => {
                            handelRequest(user._id)
                        }}
                    >
                        Send Request
                    </button>
                </div>

            </div>
        </div>
    );
}