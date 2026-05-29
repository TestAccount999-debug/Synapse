import { db } from "@/db";
import { users } from "@/db/schema"
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ error: "No Token Found" }, {status: 401});
        }

        const decoded = verifyToken(token);

        if(!decoded || !decoded.userId) {
            return NextResponse.json({error: "Invalid token"}, {status: 401});
        }

        const user = await db.query.users.findFirst({
            where: eq(users.id, Number(decoded.userId)),
        });

        if(!user) {
            return NextResponse.json({error: "User not found."}, {status: 404});
        }

        return NextResponse.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } catch (err) {
        return NextResponse.json({error: "Server error"}, {status: 500});
    }
}
