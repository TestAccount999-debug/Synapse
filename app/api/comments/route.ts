import { db } from "@/db";
import { comments, posts, notifications } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
    const body = await req.json()
    const { userId, postId, content } = body;

    try {
        const numUserId = Number(userId);
        const numPostId = Number(postId);

        await db.insert(comments).values({
            userId: numUserId,
            postId: numPostId,
            content
        });

        const postRecord = await db.query.posts.findFirst({
            where: eq(posts.id, numPostId)
        });

        if (postRecord && postRecord.author && postRecord.author !== numUserId) {
            await db.insert(notifications).values({
                recipientId: postRecord.author,
                senderId: numUserId,
                type: "comment",
                postId: numPostId
            });
        }

        return NextResponse.json({ message: "Comment content added." })
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 })
    }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    if (!postId) {
        return NextResponse.json({ error: "postId is required" }, { status: 400 });
    }

    try {
        const data = await db.query.comments.findMany({
            where: (comments, { eq }) => eq(comments.postId, Number(postId)),
            with: {
                user: true
            }
        });

        return NextResponse.json(data)
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 400 })
    }
}

export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        const { id } = body;

        await db.delete(comments).where(eq(comments.id, Number(id)));

        revalidatePath("/", "layout");

        return NextResponse.json({ message: "Comment Deleted" }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}
