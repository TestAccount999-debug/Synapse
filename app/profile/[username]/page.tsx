"use client"

import { Sidebar } from "@/components/social/sidebar";
import ProfilePage from "@/components/social/profile";

export default async function Profile({ params } : {params: Promise<{username: string}>}) {

    const usernameParams = await params;
    const decodedUsername = decodeURIComponent(usernameParams.username);

    return(
        <div className="flex min-h-screen bg-background">
            <Sidebar />
            <main className="flex-1 ml-20 lg:ml-64">
                <ProfilePage username = {decodedUsername}/>
            </main>
        </div>
    );
}
