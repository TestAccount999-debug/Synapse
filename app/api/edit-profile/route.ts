import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return NextResponse.json({ error: "No Token Found" }, {status: 401});
    }

    const decoded = verifyToken(token);

    if(!decoded || !decoded.userId) {
        return NextResponse.json({error: "Invalid token"}, {status: 401});
    }

    const userID = Number(decoded.userId);

    const userData = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, userID),
        with: {
            posts: true
        }
    })

    return NextResponse.json(userData);
}

export async function PATCH(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return NextResponse.json({ error: "No Token Found" }, {status: 401});
    }

    const decoded = verifyToken(token);

    if(!decoded || !decoded.userId) {
        return NextResponse.json({error: "Invalid token"}, {status: 401});
    }

    const userID = Number(decoded.userId);
    const body = await req.json();
    const { name, bio, website, location, avatar, banner } = body;

    try {
        await db.update(users)
            .set({ name, bio, website, location, avatar, banner })
            .where(eq(users.id, userID));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to update edit-profile:", error);
        return NextResponse.json({ error: "Failed to update edit-profile" }, { status: 500 });
    }
}