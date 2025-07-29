import Sidebar from "@/components/Sidebar"
import Profile from "@/components/Profile"
import React from 'react'

const ProfilePage = () => {
    return (
        <>
            <section className="max-w-7xl  mx-auto h-screen flex  justify-between items-center gap-5">
                <Sidebar />
                <Profile />
            </section>
        </>
    )
}

export default ProfilePage