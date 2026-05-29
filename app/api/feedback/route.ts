import { db } from "@/db";
import { feedback, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, content } = body;

        let userId: number | null = null;

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (token) {
            const decoded = verifyToken(token);
            if (decoded && decoded.userId) {
                userId = Number(decoded.userId);
            }
        }

        await db.insert(feedback).values({
            userId,
            email,
            content,
        });

        return NextResponse.json({ message: "Feedback submitted" }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 });
    }
}

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Access Denied" }, { status: 403 });
    const decoded = verifyToken(token);
    if (!decoded) return NextResponse.json({ error: "Invalid token" }, { status: 403 });

    const admin = await db.query.users.findFirst({
        where: eq(users.id, Number(decoded.userId)),
    });

    if (!admin || admin.role !== "admin") {
        return NextResponse.json({ error: "Access Denied" }, { status: 403 });
    }

    const data = await db.query.feedback.findMany({
        orderBy: (feedback, { desc }) => [desc(feedback.createdAt)],
    });

    return NextResponse.json(data);
}
