"use client"

import { Sidebar } from "@/components/social/sidebar"
import { useState, useEffect } from "react"
import { Heart, MessageCircle, Repeat2 } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/notifications")
      .then(res => {
        if (res.ok) return res.json()
        return []
      })
      .then(data => {
        setNotifications(data)
        setLoading(false)

        fetch("/api/notifications", {
          method: "PUT"
        }).catch(err => console.error(err))
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 ml-20 lg:ml-64">
        <main className="flex-1 border-x border-border min-h-screen max-w-2xl">
          <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border/50 h-12 flex items-center px-4">
            <h1 className="text-lg font-bold text-foreground">Notifications</h1>
          </div>

          <div className="p-4 space-y-4">
            {loading ? (
              <div className="py-20 text-center text-muted-foreground italic animate-pulse">
                Loading notifications...
              </div>
            ) : notifications.length > 0 ? (
              notifications.map((notif) => (
                <Card key={notif.id} className={`p-4 flex gap-4 items-center border border-border bg-card hover:bg-secondary/20 transition-colors ${!notif.isRead ? 'bg-primary/5 border-primary/20' : ''}`}>
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-secondary">
                    {notif.type === 'like' && <Heart className="text-rose-500 fill-rose-500 h-5 w-5" />}
                    {notif.type === 'comment' && <MessageCircle className="text-sky-500 h-5 w-5" />}
                    {notif.type === 'repost' && <Repeat2 className="text-emerald-500 h-5 w-5" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      <span className="font-bold">{notif.sender?.name}</span>{" "}
                      {notif.type === 'like' && 'liked your post'}
                      {notif.type === 'comment' && 'commented on your post'}
                      {notif.type === 'repost' && 'reposted your post'}
                    </p>
                    {notif.post && (
                      <p className="text-xs text-muted-foreground truncate mt-1">
                        "{notif.post.content}"
                      </p>
                    )}
                  </div>
                </Card>
              ))
            ) : (
              <div className="py-20 text-center text-muted-foreground italic">
                No notifications yet.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
