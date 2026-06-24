import { db } from "@/db";
import { follows, notifications } from "@/db/schema";
import { and, eq, gt } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    console.log("[Server API] Received POST request on /api/follow-following");
    const body = await req.json()
    console.log("[Server API] Request payload:", body);

    try {
        const numFollowerID = Number(body.followerId)
        const numFollowingID = Number(body.followingId)
        const action = body.action

        console.log(`[Server API] Parsed Params -> followerId: ${numFollowerID}, followingId: ${numFollowingID}, action: ${action}`);

        const row = await db.query.follows.findFirst({
            where: (follows, { eq, and }) => (
                and(
                    eq(follows.followerID, numFollowerID),
                    eq(follows.followingID, numFollowingID)
                )
            )
        })

        if (action === "unfollow" || (action === undefined && row)) {
            if (row) {
                await db.delete(follows).where(
                    and(
                        eq(follows.followerID, numFollowerID),
                        eq(follows.followingID, numFollowingID),
                    )
                );

                await db.delete(notifications).where(
                    and(
                        eq(notifications.senderId, numFollowerID),
                        eq(notifications.recipientId, numFollowingID),
                        eq(notifications.type, "follow")
                    )
                )
            }

            return NextResponse.json({ isFollowing: false, message: "Unfollowed" }, { status: 200 })
        }

        if (action === "follow" || (action === undefined && !row)) {
            if (!row) {
                await db.insert(follows).values({
                    followerID: numFollowerID,
                    followingID: numFollowingID
                })
            }

            const cooldownPeriodMs = 1 * 60 * 1000; // 1 minute cooldown
            const cooldownThreshold = new Date(Date.now() - cooldownPeriodMs);

            const recentNotification = await db.query.notifications.findFirst({
                where: (notifications, { eq, and }) => and(
                    eq(notifications.senderId, numFollowerID),
                    eq(notifications.recipientId, numFollowingID),
                    eq(notifications.type, "follow"),
                    gt(notifications.createdAt, cooldownThreshold)
                )
            })

            if (!recentNotification) {
                console.log(`[Cooldown Inactive] Sending follow notification.`);
                await db.insert(notifications).values({
                    recipientId: numFollowingID,
                    senderId: numFollowerID,
                    type: "follow"
                })
            } else {
                const elapsedMs = Date.now() - recentNotification.createdAt.getTime();
                const remainingMs = cooldownPeriodMs - elapsedMs;
                const remainingSec = Math.max(0, Math.ceil(remainingMs / 1000));
                console.log(`[Cooldown Active] Follow notification suppressed. Time remaining: ${remainingSec}s`);
            }

            return NextResponse.json({ isFollowing: true, message: "Followed" }, { status: 201 })
        }

    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 })
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
                and(
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