import { db } from "@/db"
import { posts } from "@/db/schema"
import { NextResponse } from "next/server"
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { deleteImage } from "@/lib/upload-image";

export async function POST(req: Request) {
    const body = await req.json();

    const { content, authorId, image } = body;

    if (!content || !authorId) {
        return NextResponse.json({ error: "Missing Fields" }, { status: 400 });
    }

    try {
        await db.insert(posts).values({
            content,
            author: authorId,
            image: image
        });

        revalidatePath("/", "layout");
        return NextResponse.json({ message: "Content Inserted" });
    } catch (err) {
        return NextResponse.json({ error: "Content Already Exist" }, { status: 400 });
    }
}

export async function PUT(req: Request) {
    const body = await req.json();

    const { id, content } = body;

    await db.update(posts).set({ content }).where(eq(posts.id, Number(id)));

    revalidatePath("/", "layout");
    return NextResponse.json({ message: "Post Updated" });
}

export async function DELETE(req: Request) {

    try {
        const body = await req.json();

        const { id } = body;

        // Retrieve the post to check if there is an image to delete from Supabase Storage
        const post = await db.query.posts.findFirst({
            where: eq(posts.id, Number(id))
        });

        if (post?.image) {
            await deleteImage(post.image);
        }

        await db.delete(posts).where(eq(posts.id, Number(id)));

        revalidatePath("/", "layout");

        return NextResponse.json({ message: "Post Deleted" }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ error: err }, {status: 500});
    }

}
