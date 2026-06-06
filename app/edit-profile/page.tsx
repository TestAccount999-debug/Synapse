import { Sidebar } from "@/components/social/sidebar";
import EditProfilePage from "@/components/social/edit-profile";

export default function Page() {
    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar />
            <main className="flex-1 ml-20 lg:ml-64">
                <EditProfilePage />
            </main>
        </div>
    );
}
