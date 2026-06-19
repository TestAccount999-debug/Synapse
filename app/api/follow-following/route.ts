import { db } from "@/db";
import { follows } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json()

    try {
        const numFollowerID = Number(body.followerId)
        const numFollowingID = Number(body.followingId)

        const row = await db.query.follows.findFirst({
            where: (follows, { eq, and }) => (
                and (
                    eq(follows.followerID, numFollowerID),
                    eq(follows.followingID,numFollowingID)
                )
            )
        })

        if (!row) {
            await db.insert(follows).values({
                followerID: numFollowerID,
                followingID: numFollowingID
            })
    
            return NextResponse.json({message: "Values inserted"}, {status: 201})
        } else {
            return NextResponse.json({message: "Already Following or followed"}, {status: 409})
        }

    } catch (err) {
        return NextResponse.json({error: err}, {status: 500})
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const followerIdParam = searchParams.get("followerId");
        const followingIdParam = searchParams.get("followingId");

        if (!followerIdParam || !followingIdParam) {
            return NextResponse.json({ error: "Missing followerId or followingId" }, { status: 400 });
        }

        const numFollowerId = Number(followerIdParam);
        const numFollowingId = Number(followingIdParam);

        const yes = await db.query.follows.findFirst({
            where: (follows, { eq, and }) => (
                and (
                    eq(follows.followerID, numFollowerId),
                    eq(follows.followingID, numFollowingId)
                )
            )
        });

        if (yes) {
            return NextResponse.json({ isFollowing: true, status: 409 });
        } else {
            return NextResponse.json({ isFollowing: false, status: 404 });
        }
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}