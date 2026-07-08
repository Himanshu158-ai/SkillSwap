"use client";

import React, { useEffect, useState } from "react";
import useAuth from "@/context/AuthContext";

const Page = () => {
    const { user, loading, setUser } = useAuth();
    console.log(user);

    const [formData, setFormData] = useState({
        _id: "",
        name: "",
        email: "",
        phone: "",
        bio: "",
        location: "",
        canTeach: "",
        wantsToLearn: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                _id: user._id,
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                bio: user.bio || "",
                location: user.location || "",
                canTeach: user.canTeach?.join(", ") || "",
                wantsToLearn: user.wantsToLearn?.join(", ") || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const updateUser = async () => {
        const payload = {
            ...formData,
            canTeach: formData.canTeach
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),

            wantsToLearn: formData.wantsToLearn
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
        };

        const res = await fetch("/api/auth/login", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (data.success) {
            setUser(data.user);
            alert("Updated Successfully");
        }
    };

    if (loading) return <h1>Loading...</h1>;

    return (
        <div className="max-w-xl mx-auto mt-10 space-y-4">
            <h1 className="text-2xl font-bold">Update Profile</h1>

            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
            />

            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />

            <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
            />

            <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
            />

            <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
            />

            <input
                type="text"
                name="canTeach"
                value={formData.canTeach}
                onChange={handleChange}
                placeholder="HTML, CSS, React"
            />

            <input
                type="text"
                name="wantsToLearn"
                value={formData.wantsToLearn}
                onChange={handleChange}
                placeholder="Node.js, MongoDB, AWS"
            />

            <button onClick={updateUser}>
                Update
            </button>
        </div>
    );
};

export default Page;