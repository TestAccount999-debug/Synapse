"use client"

import { useState, useEffect } from "react"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { posts } from "@/db/schema"
import { id } from "date-fns/locale"
import { useRouter } from "next/navigation"

interface MockProps {
    post: {
        id: string,
        author: {
            name: string,
            username: string,
            avatar?: string,
            verified?: boolean
        }
        content: string
        image?: string
        like: number
        comments: number
        reposts: number
        timestamp: string
        isLiked?: boolean
        isBookmarked?: boolean
    }
}

export default function MockPosts({ post }: MockProps) {

    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState("");
    const [authorID, setAuthorID] = useState<{ id: number } | null>(null);
    const maxLength = 200;
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (!storedUser) return

        const userID = JSON.parse(storedUser);

        setAuthorID(userID.id);
    }, [])

    const handleEdits = async () => {
        try {
            const data = await fetch("/api/posts", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: post.id, content: editContent })
            });

            if (data.ok) {
                setIsEditing(false);
                window.location.reload();
            } else {
                const res = await data.json();
                console.error("Failed to update:", res);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const deletePost = async () => {
        try {
            const data = await fetch("/api/posts", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: post.id })
            });

            if (data.ok) {
                window.location.reload();
            } else {
                const res = await data.json();
                console.error("Failed to delete:", res);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (

        <div className="mt-1 pt-8 border-t border-border pb-12">
            <div className="space-y-4">

                {isEditing ? (
                    <div className="p-4 border-border rounded-xl bg-secondary/20 transition-colors flex flex-col gap-3 group">
                        <div className="flex flex-col gap-3">
                            <Textarea
                                className="resize-none min-h-[100px] text-sm bg-background border-border"
                                placeholder="Edit your post..."
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                maxLength={maxLength}
                            />

                            <div className="flex justify-end gap-2">
                                <button
                                    className="px-4 py-1.5 text-xs font-bold bg-secondary text-secondary-foreground rounded-full hover:opacity-90 transition-opacity"
                                    onClick={() => {
                                        setIsEditing(false);
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-1.5 text-xs font-bold bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
                                    onClick={handleEdits}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>

                ) : (
                    <div className="p-4 border border-border rounded-xl hover:bg-secondary/5 transition-colors flex flex-col gap-3 group">
                        <div className="flex justify-between items-start gap-4">
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
                            <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                    onClick={() => {
                                        setEditContent(post.content);
                                        setIsEditing(true);
                                    }}
                                    className="p-2 bg-secondary/50 text-foreground hover:text-primary hover:bg-secondary transition-colors rounded-full"
                                    title="Edit post"
                                >
                                    <Pencil className="h-4 w-4" />
                                </button>
                                <button
                                    className="p-2 bg-secondary/50 text-foreground hover:text-destructive hover:bg-secondary transition-colors rounded-full"
                                    title="Delete Post"
                                    onClick={deletePost}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                    </div>
                )}

            </div>
        </div>
    );
}
