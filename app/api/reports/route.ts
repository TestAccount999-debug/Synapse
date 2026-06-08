import { db } from "@/db";
import { reports, posts, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { deleteImage } from "@/lib/upload-image";

async function getAdminUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return null;
    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId) return null;

    const user = await db.query.users.findFirst({
        where: eq(users.id, Number(decoded.userId)),
    });

    if (user && user.role === "admin") {
        return user;
    }
    return null;
}

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const decoded = verifyToken(token);
        if (!decoded || !decoded.userId) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

        const body = await req.json();
        const { postId, reason } = body;

        await db.insert(reports).values({
            reporterId: Number(decoded.userId),
            postId: Number(postId),
            reason,
        });

        return NextResponse.json({ message: "Report submitted" }, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function GET() {
    const admin = await getAdminUser();
    if (!admin) return NextResponse.json({ error: "Access Denied" }, { status: 403 });

    try {
        const data = await db.query.reports.findMany({
            with: {
                reporter: true,
                post: {
                    with: {
                        author: true,
                    },
                },
            },
        });
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: "Failed to fetch reports" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const admin = await getAdminUser();
    if (!admin) return NextResponse.json({ error: "Access Denied" }, { status: 403 });

    try {
        const { searchParams } = new URL(req.url);
        const reportId = searchParams.get("id");
        const action = searchParams.get("action");
        const postId = searchParams.get("postId");

        if (!reportId) return NextResponse.json({ error: "Missing report ID" }, { status: 400 });

        if (action === "deletePost" && postId) {
            // Retrieve the post to check if there is an image to delete from Supabase Storage
            const post = await db.query.posts.findFirst({
                where: eq(posts.id, Number(postId))
            });

            if (post?.image) {
                await deleteImage(post.image);
            }

            await db.delete(posts).where(eq(posts.id, Number(postId)));
        } else {
            await db.delete(reports).where(eq(reports.id, Number(reportId)));
        }

        return NextResponse.json({ message: "Action completed" });
    } catch (err) {
        return NextResponse.json({ error: "Failed to complete action" }, { status: 500 });
    }
}
