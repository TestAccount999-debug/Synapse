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
    
            return NextResponse.json({message: "Values inserted"}, {status: 200})
        } else {
            return NextResponse.json({message: "Already Following or followed"})
        }


    } catch (err) {
        return NextResponse.json({error: err}, {status: 500})
    }
}

export async function GET(req: Request) {
    const body = await req.json()
}