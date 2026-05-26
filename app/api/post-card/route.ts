import { db } from "@/db";
import { and, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { posts, users, likes, reposts, bookmark, notifications } from "@/db/schema";
import { BookMarked } from "lucide-react";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const postId = searchParams.get("postId");

    if (!userId || !postId) return NextResponse.json({ liked: false, reposted: false, bookmarked: false });

    const likedRow = await db.query.likes.findFirst({
        where: (likes, { eq, and }) => and(
            eq(likes.postID, Number(postId)),
            eq(likes.userID, Number(userId))
        )
    })

    const respostedRow = await db.query.reposts.findFirst({
        where: (reposts, { eq, and }) => and(
            eq(reposts.postID, Number(postId)),
            eq(reposts.userID, Number(userId))
        )
    })

    const bookmarkedRow = await db.query.bookmark.findFirst({
        where: (bookmark, { eq, and }) => and(
            eq(bookmark.postID, Number(postId)),
            eq(bookmark.userID, Number(userId))
        )
    })

    return NextResponse.json({ liked: !!likedRow, reposted: !!respostedRow, bookmarked: !!bookmarkedRow })
}

export async function POST(req: Request) {
    const body = await req.json();

    const { userId, postId, action, id, repost } = body;

    try {
        if (action === "like") {
            const numUserId = Number(userId);
            const numPostId = Number(postId);

            const row = await db.query.likes.findFirst({
                where: (likes, { eq, and }) => (
                    and(
                        eq(likes.postID, numPostId),
                        eq(likes.userID, numUserId)
                    )
                )
            })

            if (!row) {
                await db.insert(likes).values({
                    postID: numPostId,
                    userID: numUserId
                });

                await db.update(posts)
                    .set({ likes: sql`${posts.likes} + 1` })
                    .where(eq(posts.id, numPostId));

                const postRecord = await db.query.posts.findFirst({
                    where: eq(posts.id, numPostId)
                });
                if (postRecord && postRecord.author && postRecord.author !== numUserId) {
                    await db.insert(notifications).values({
                        recipientId: postRecord.author,
                        senderId: numUserId,
                        type: "like",
                        postId: numPostId
                    });
                }
            } else {
                return NextResponse.json({ liked: true, updated: false })
            }
        } else if (action === "unlike") {
            const numUserId = Number(userId);
            const numPostId = Number(postId);

            const row = await db.query.likes.findFirst({
                where: (likes, { eq, and }) => (
                    and(
                        eq(likes.postID, numPostId),
                        eq(likes.userID, numUserId)
                    )
                )
            })

            if (row) {
                await db.delete(likes).where(
                    and(
                        eq(likes.userID, numUserId),
                        eq(likes.postID, numPostId)
                    )
                );

                await db.update(posts)
                    .set({ likes: sql`GREATEST(0, ${posts.likes} - 1)` })
                    .where(eq(posts.id, numPostId));

                await db.delete(notifications).where(
                    and(
                        eq(notifications.senderId, numUserId),
                        eq(notifications.postId, numPostId),
                        eq(notifications.type, "like")
                    )
                );
            } else {
                return NextResponse.json({ liked: false, updated: false })
            }
        } else if (action === "repost") {
            const numUserId = Number(userId);
            const numPostId = Number(postId);

            const row = await db.query.reposts.findFirst({
                where: (reposts, { eq, and }) => (
                    and(
                        eq(reposts.postID, numPostId),
                        eq(reposts.userID, numUserId)
                    )
                )
            })

            if (!row) {
                await db.insert(reposts).values({
                    postID: numPostId,
                    userID: numUserId
                });

                await db.update(posts)
                    .set({ reposts: sql`${posts.reposts} + 1` })
                    .where(eq(posts.id, numPostId));

                const postRecord = await db.query.posts.findFirst({
                    where: eq(posts.id, numPostId)
                });
                if (postRecord && postRecord.author && postRecord.author !== numUserId) {
                    await db.insert(notifications).values({
                        recipientId: postRecord.author,
                        senderId: numUserId,
                        type: "repost",
                        postId: numPostId
                    });
                }
            } else {
                return NextResponse.json({ reposted: true, updated: false })
            }
        } else if (action === "unrepost") {
            const numUserId = Number(userId);
            const numPostId = Number(postId);

            const row = await db.query.reposts.findFirst({
                where: (reposts, { eq, and }) => (
                    and(
                        eq(reposts.postID, numPostId),
                        eq(reposts.userID, numUserId)
                    )
                )
            })

            if (row) {
                await db.delete(reposts).where(
                    and(
                        eq(reposts.userID, numUserId),
                        eq(reposts.postID, numPostId)
                    )
                );

                await db.update(posts)
                    .set({ reposts: sql`GREATEST(0, ${posts.reposts} - 1)` })
                    .where(eq(posts.id, numPostId));

                await db.delete(notifications).where(
                    and(
                        eq(notifications.senderId, numUserId),
                        eq(notifications.postId, numPostId),
                        eq(notifications.type, "repost")
                    )
                );
            }

            else {
                return NextResponse.json({ reposted: false, updated: false })
            }
        } else if (action === "bookmarked") {
            const numUserId = Number(userId)
            const numPostId = Number(postId)

            const row = await db.query.bookmark.findFirst({
                where: (bookmark, { eq, and }) => (
                    and(
                        eq(bookmark.postID, numPostId),
                        eq(bookmark.userID, numUserId)
                    )
                )
            });

            if (!row) {
                await db.insert(bookmark).values({
                    postID: numPostId,
                    userID: numUserId
                })
            } else {
                return NextResponse.json({ bookmarked: true, updated: false })
            }
        } else if (action === "unbookmarked") {
            const numUserId = Number(userId);
            const numPostId = Number(postId)

            const row = await db.query.bookmark.findFirst({
                where: (bookmark, { eq, and }) => (
                    and(
                        eq(bookmark.userID, numUserId),
                        eq(bookmark.postID, numPostId)
                    )
                )
            });

            if (row) {
                await db.delete(bookmark).where(
                    and(
                        eq(bookmark.postID, numPostId),
                        eq(bookmark.userID, numUserId)
                    )
                )
            } else {
                return NextResponse.json({ bookmarked: false, updated: false })
            }
        }

        return NextResponse.json({ message: "Update successfull" }, { status: 200 });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}
