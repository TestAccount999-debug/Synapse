import { id } from "date-fns/locale";
import { Trash2, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useState } from "react";

interface CommentProps {
    comment: {
        id: string,
        content: string,
        userId: string,
        postId: string,
        created_at?: string,
        user: {
            id: string,
            name: string,
            avatar?: string
        }
    },
    isProfileView?: boolean
}

export default function CommentBox({ comment, isProfileView }: CommentProps) {

    const [isLiked, setIsLiked] = useState(false);

    const formatCommentTime = (dateString?: string) => {
        if (!dateString) return "1d";

        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 1) return "now";
        if (diffMins < 60) return `${diffMins}m`
        if (diffHours < 24) return `${diffHours}hr`

        return `${diffDays}d`;
    }

    const handleDelete = async () => {
        try {
            const data = await fetch("/api/comments", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: comment.id })
            });

            if (data.ok) {
                window.location.reload();
            } else {
                const res = await data.json()
                console.error("Failed to delete the comment: ", res)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="comment-box-border flex items-start justify-between py-2.5 group">
            <div className="flex items-start gap-3 flex-1 min-w-0">
                <Avatar className="h-8 w-8 shrink-0 border border-border/50">
                    <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                        {comment.user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0 text-sm">
                    <p className="leading-normal">
                        <span className="font-semibold text-foreground mr-1.5 hover:underline cursor-pointer">{comment.user.name}</span>
                        <span className="text-foreground/90 whitespace-pre-wrap">{comment.content}</span>
                    </p>

                    <div className="flex items-center gap-4 mt-1.5 text-xs text-muted-foreground select-none">
                        <span>
                            {formatCommentTime(comment.created_at)}
                        </span>
                        <button className="hover:text-foreground font-semibold transition-colors">Reply</button>
                        {
                            isProfileView && (
                                <button
                                    onClick={handleDelete}
                                    className="opacity-0 group-hover:opacity-100 hover:text-destructive flex items-center gap-1 transition-all duration-200"
                                >
                                    <Trash2 className="h-3 w-3">Delete</Trash2>
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>

            <button
                onClick={() => setIsLiked(!isLiked)}
                className="text-muted-foreground hover:text-rose-500 transition-colors p-1.5 shrink-0"
            >
                <Heart className={
                    `h-3.5 w-3.5 transition-transform duration-200 active:scale-125 ${isLiked ? "fill-rose-500 text-rose-500" : ""}`
                }></Heart>
            </button>

        </div>
    );
}