"use client"

import useAuth from '@/context/AuthContext'
import React from 'react'

const page = () => {
    const { user, loading, setUser } = useAuth();
    console.log(user);

    async function updates(){
        const res = await fetch("/api/")
    }

    return (
        <div>page</div>
    )
}

export default page