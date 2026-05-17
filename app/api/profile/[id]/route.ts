import { db } from "@/db";
import { likes, users, posts, comments } from "@/db/schema"
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { useId } from "react";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { searchParams } = new URL(req.url);
    const tabParams = searchParams.get("tab");
    const { id } = await params;
    const userID = Number(id);

    const validTabs = ["posts", "likes", "comments", "bookmarks", "reposts"] as const;
    const tabs = validTabs.includes(tabParams as any) ? tabParams : "posts"

    let data;

    switch (tabs) {
        
        case "posts":
            data = await db.query.users.findFirst({
                where: (users, { eq, and }) => eq(users.id, userID),
                with: {
                    posts: true
                }
            })
            break;

        case "likes":
            data = await db.query.users.findFirst({
                where: (users, { eq, and }) => eq(users.id, userID),
                with: {
                    likes: {
                        with: {
                            post: {
                                with: {
                                    author: true
                                }
                            }
                        }
                    }
                }

            })
            break;

        case "reposts":
            data = await db.query.users.findFirst({
                where: (users, {eq}) => eq(users.id, userID),
                with: {
                    reposts: {
                        with: {
                            post: {
                                with: {
                                    author: true
                                }
                            }
                        }
                    }
                }
            })
            break;

        case "bookmarks":
            data = await db.query.users.findFirst({
                where: (users, { eq })=> eq(users.id, userID),
                with: {
                    bookmarks: {
                        with: {
                            post: {
                                with: {
                                    author: true
                                }
                            }
                        }
                    }
                }
            })
            break;

        case "comments":
            data = await db.query.users.findFirst({
                where: (users, { eq }) => eq(users.id, userID),
                with: {
                    comments: {
                        with: {
                            post: {
                                with: {
                                    author: true
                                }
                            }
                        }
                    }
                }
            })
            break;

    }
        
    return NextResponse.json(data)
}

export async function PUT(req: Request) {
    const body = await req.json();

    const { id, name, bio, location, website, avatar, banner } = body;
    
    try {
        await db.update(users).set({
            name: name,
            bio: bio,
            location: location,
            website: website,
            avatar: avatar,
            banner: banner
        }).where(eq(users.id, Number(id)))
    
        revalidatePath("/", "layout")
        return NextResponse.json({ message: "Profile Updated"}, { status: 200})
    } catch (err) {
        return NextResponse.json({ error: err}, { status: 500})
    }

}