"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    Home,
    Search,
    Bell,
    Mail,
    Bookmark,
    User,
    MoreHorizontal,
    PenSquare,
    Settings,
    TrendingUp,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

const navItems: { icon: any; label: string; href: string; badge?: number }[] = [
    { icon: Home, label: "Home", href: "/feed" },
    // { icon: Search, label: "Explore", href: "/explore" },
    { icon: Bell, label: "Notifications", href: "/notifications", badge: 3 },
    // { icon: Mail, label: "Messages", href: "/messages", badge: 12 },
    { icon: User, label: "Profile", href: "/profile" },
    // { icon: Settings, label: "Settings", href: "/settings" },
]

export function Sidebar() {
    const pathname = usePathname()
    const [user, setUser] = useState<{ id: Number | string; name: string } | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("/api/user/me");
                if (response.ok) {
                    const data = await response.json()
                    setUser(data);
                } else {
                    setUser(null);
                }
            } catch (err) {
                console.error("Failed to fetch the user.", err)
                setUser(null);
            }
        }

        fetchUser();
    }, [])

    return (
        <aside className="fixed left-0 top-0 z-40 flex h-screen w-20 flex-col items-center border-r border-border bg-sidebar py-6 lg:w-64 lg:items-start lg:px-4">
            <Link href="/" className="mb-8 flex items-center gap-3 px-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                    <span className="text-xl font-bold text-primary-foreground">N</span>
                </div>
                <span className="hidden text-xl font-bold text-foreground lg:block">Synapse</span>
            </Link>

            <nav className="flex flex-1 flex-col gap-1 w-full">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    // Dynamic profile link
                    const href = item.href

                    return (
                        <Link
                            key={item.href}
                            href={href}
                            className={cn(
                                "group relative flex items-center gap-4 rounded-xl px-3 py-3 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground lg:justify-start justify-center",
                                isActive && "bg-secondary text-foreground"
                            )}
                        >
                            <item.icon className="h-6 w-6 shrink-0" />
                            <span className="hidden text-base font-medium lg:block">{item.label}</span>
                            {item.badge && (
                                <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground lg:relative lg:right-auto lg:top-auto lg:ml-auto">
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    )
                })}
            </nav>

            <Button className="mb-4 lg:hidden rounded-xl" size="icon">
                <PenSquare className="h-5 w-5" />
            </Button>
        </aside>
    )
}
