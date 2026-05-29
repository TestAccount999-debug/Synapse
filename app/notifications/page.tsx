"use client"

import { Sidebar } from "@/components/social/sidebar"
import { useState, useEffect } from "react"
import { Heart, MessageCircle, Repeat2, Check } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

interface Notification {
  id: number;
  recipientId: number;
  senderId: number;
  type: "like" | "comment" | "repost";
  postId: number | null;
  isRead: boolean;
  createdAt: string;
  sender: {
    id: number;
    name: string;
    avatar: string | null;
  } | null;
  post: {
    id: number;
    content: string;
    image: string | null;
  } | null;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const fetchNotifications = () => {
    fetch("/api/notifications")
      .then(res => {
        if (res.ok) return res.json()
        return []
      })
      .then(data => {
        if (Array.isArray(data)) {
          setNotifications(data)
        } else {
          setNotifications([])
        }
        setLoading(false)

        fetch("/api/notifications", { method: "PUT" }).catch(err => console.error(err))
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  const handleMarkAllRead = async () => {
    try {
      const res = await fetch("/api/notifications", { method: "PUT" })
      if (res.ok) {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleNotificationClick = (postId: number | null) => {
    if (postId) {
      router.push(`/feed?postId=${postId}`)
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return "now"
    if (diffMins < 60) return `${diffMins}m`
    if (diffHours < 24) return `${diffHours}h`
    if (diffDays < 7) return `${diffDays}d`
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
  }

  const getGroupedNotifications = () => {
    const now = new Date()
    const grouped: {
      new: Notification[]
      today: Notification[]
      yesterday: Notification[]
      thisWeek: Notification[]
      earlier: Notification[]
    } = {
      new: [],
      today: [],
      yesterday: [],
      thisWeek: [],
      earlier: []
    }

    notifications.forEach(notif => {
      const created = new Date(notif.createdAt)
      const diffTime = Math.abs(now.getTime() - created.getTime())
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

      if (!notif.isRead) {
        grouped.new.push(notif)
      } else if (diffDays === 0) {
        grouped.today.push(notif)
      } else if (diffDays === 1) {
        grouped.yesterday.push(notif)
      } else if (diffDays < 7) {
        grouped.thisWeek.push(notif)
      } else {
        grouped.earlier.push(notif)
      }
    })

    return grouped
  }

  const grouped = getGroupedNotifications()
  const hasNotifications = notifications.length > 0

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 ml-20 lg:ml-64 justify-center">
        <main className="flex-1 border-r border-border/50 min-h-screen w-full max-w-none bg-background/50 backdrop-blur-sm">
          {/* Header */}
          <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border/40 h-14 flex items-center justify-between px-6">
            <h1 className="text-xl font-bold text-foreground tracking-tight">Notifications</h1>
            {notifications.some(n => !n.isRead) && (
              <button
                onClick={handleMarkAllRead}
                className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors py-1.5 px-3 rounded-full hover:bg-primary/10"
              >
                <Check className="h-3.5 w-3.5" />
                Mark all read
              </button>
            )}
          </div>

          {/* List Area */}
          <div className="p-2 md:p-4 space-y-6">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center space-y-3">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <span className="text-sm text-muted-foreground italic font-medium">Checking activity...</span>
              </div>
            ) : hasNotifications ? (
              <div className="divide-y divide-border/20">
                {/* Render Notification Group helper */}
                {Object.entries(grouped).map(([key, list]) => {
                  if (list.length === 0) return null

                  const titleMap: { [key: string]: string } = {
                    new: "New",
                    today: "Today",
                    yesterday: "Yesterday",
                    thisWeek: "This Week",
                    earlier: "Earlier"
                  }

                  return (
                    <div key={key} className="py-4 first:pt-0">
                      <h2 className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-3 px-2">
                        {titleMap[key]}
                      </h2>
                      <div className="space-y-1">
                        {list.map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => handleNotificationClick(notif.postId)}
                            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-secondary/40 transition-all duration-200 cursor-pointer group"
                          >
                            <div className="flex items-center gap-3.5 min-w-0 flex-1">
                              {/* Avatar Block with overlaid action icon */}
                              <div className="relative shrink-0">
                                <Avatar className="h-11 w-11 border border-border/50 group-hover:scale-105 transition-transform duration-200">
                                  {notif.sender?.avatar && <AvatarImage src={notif.sender.avatar} alt={notif.sender.name} />}
                                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                                    {notif.sender?.name?.charAt(0).toUpperCase() || "U"}
                                  </AvatarFallback>
                                </Avatar>

                                {/* Tiny overlaid type icon in bottom right */}
                                <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background shadow-sm bg-background">
                                  {notif.type === 'like' && <Heart className="text-rose-500 fill-rose-500 h-3 w-3" />}
                                  {notif.type === 'comment' && <MessageCircle className="text-sky-500 fill-sky-500 h-3 w-3" />}
                                  {notif.type === 'repost' && <Repeat2 className="text-emerald-500 h-3 w-3" />}
                                </div>
                              </div>

                              {/* Notification text details */}
                              <div className="flex-1 min-w-0 text-sm leading-snug">
                                <span className="font-bold text-foreground hover:underline mr-1.5">
                                  {notif.sender?.name || "Someone"}
                                </span>
                                <span className="text-muted-foreground">
                                  {notif.type === 'like' && 'liked your post.'}
                                  {notif.type === 'comment' && 'commented on your post.'}
                                  {notif.type === 'repost' && 'reposted your post.'}
                                </span>
                                <span className="text-xs text-muted-foreground ml-1.5 whitespace-nowrap">
                                  {formatTimeAgo(notif.createdAt)}
                                </span>
                              </div>
                            </div>

                            {/* Right side: Post thumbnail preview OR Unread indicator dot */}
                            <div className="flex items-center gap-3 shrink-0 ml-4">
                              {/* Preview thumbnail of the post */}
                              {notif.post && (
                                <div className="h-21 w-41 rounded-lg overflow-hidden border border-border/80 group-hover:border-primary/40 transition-colors bg-secondary/20 flex shrink-0">
                                  {notif.post.image ? (
                                    <img src={notif.post.image} alt="post preview" className="h-full w-full object-cover" />
                                  ) : (
                                    <div className="h-full w-full flex items-center justify-center p-1.5 overflow-hidden text-[6px] text-muted-foreground font-mono leading-none select-none break-all">
                                      {notif.post.content}
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Unread blue dot */}
                              {!notif.isRead && (
                                <div className="h-2 w-2 rounded-full bg-primary animate-pulse shrink-0" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="py-24 flex flex-col items-center justify-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-secondary/30 flex items-center justify-center text-muted-foreground">
                  <Heart className="h-8 w-8 stroke-[1.5]" />
                </div>
                <div className="text-center space-y-1">
                  <h3 className="font-semibold text-foreground">No notifications yet</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">When people like, comment, or repost your content, you'll see it here.</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
