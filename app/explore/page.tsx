import { Sidebar } from "@/components/social/sidebar"
import { ExploreComponent } from "@/components/social/explore"

export default function ExplorePage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 ml-20 lg:ml-64">
        <ExploreComponent />
      </div>
    </div>
  )
}
