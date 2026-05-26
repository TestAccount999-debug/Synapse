import { db } from "@/db";
import { notifications } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const decoded = verifyToken(token);
        if (!decoded || !decoded.userId) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

        const data = await db.query.notifications.findMany({
            where: eq(notifications.recipientId, Number(decoded.userId)),
            with: {
                sender: true,
                post: true
            },
            orderBy: desc(notifications.createdAt)
        });

        return NextResponse.json(data);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function PUT() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const decoded = verifyToken(token);
        if (!decoded || !decoded.userId) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

        await db.update(notifications)
            .set({ isRead: true })
            .where(eq(notifications.recipientId, Number(decoded.userId)));

        return NextResponse.json({ message: "Notifications marked as read" });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
