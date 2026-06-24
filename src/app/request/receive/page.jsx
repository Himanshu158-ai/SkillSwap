"use client";

import React, { useEffect, useState } from 'react'

// import React from 'react'

const ReceiveRequestPage = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        const res = await fetch("/api/request");
        const data = await res.json();
        console.log(data.requests);

        if (data.success) {
            setRequests(data.requests);
        }
    };


    const handelAccept = async(id)=>{
        console.log(id);
        const res = await fetch(`/api/action/accept/${id}`,{
            method:"POST",
        });
        const data = await res.json();
        if(data.success){
            console.log("request accepted",data);
            fetchRequests();
        }
    }

    const handelReject = async(id)=>{
        const res = await fetch(`/api/action/reject/${id}`,{
            method:"POST",
        });
        const data = await res.json();
        if(data.success){
            console.log("request rejected",data);
            fetchRequests();
        }
    }

    return (
        <>
            {
                requests.length > 0 && requests.map((request) => {
                    return <div
                        key={request._id}
                        className="bg-slate-900 border border-slate-800 rounded-xl p-6"
                    >
                        <div className="flex justify-between items-start">

                            <div>
                                <h2 className="text-xl font-semibold text-white">
                                    {request.senderId?.name}
                                </h2>

                                <p className="text-slate-400 mt-1">
                                    📍 {request.senderId?.location}
                                </p>
                            </div>

                            <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                                {request.status}
                            </span>

                        </div>

                        <p className="text-slate-300 mt-4">
                            {request.senderId?.bio}
                        </p>

                        {/* Can Teach */}

                        <div className="mt-5">
                            <h3 className="text-green-400 font-semibold mb-2">
                                Can Teach
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {request.senderId?.canTeach?.map((skill) => (
                                    <span
                                        key={skill}
                                        className="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Wants To Learn */}

                        <div className="mt-5">
                            <h3 className="text-blue-400 font-semibold mb-2">
                                Wants To Learn
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {request.senderId?.wantsToLearn?.map((skill) => (
                                    <span
                                        key={skill}
                                        className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Hidden Contact */}

                        <div className="mt-5 border-t border-slate-800 pt-5">
                            <h3 className="text-white font-semibold mb-3">
                                Contact Information
                            </h3>

                            <div className="space-y-3">

                                <div className="bg-slate-800 p-3 rounded-lg flex justify-between">
                                    <span>Email</span>
                                    <span>🔒 Hidden</span>
                                </div>

                                <div className="bg-slate-800 p-3 rounded-lg flex justify-between">
                                    <span>Phone</span>
                                    <span>🔒 Hidden</span>
                                </div>

                            </div>
                        </div>

                        {/* Actions */}

                        <div className="flex gap-3 mt-6">

                            <button
                                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg"
                                onClick={()=>{
                                    handelAccept(request._id);
                                }}
                            >
                                Accept
                            </button>

                            <button
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg"
                                onClick={()=>{
                                    handelReject(request._id);
                                }}
                            >
                                Reject
                            </button>

                        </div>

                    </div>
                })
            }
        </>
        // <h1>hello</h1>
    )
}

export default ReceiveRequestPage