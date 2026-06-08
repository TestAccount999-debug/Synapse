import { supabase } from "./supabase";

export async function uploadImage(file: File, bucket: string = 'post-images'): Promise<string> {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
        })

    if (error) {
        throw new Error(`Upload Failed ${error.message}`)
    }

    const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath)

    return publicUrl
}

export async function deleteImage(imageUrl: string | null, bucket: string = 'post-images'): Promise<void> {
    if (!imageUrl) return

    try {
        const bucketSearchStr = `/${bucket}/`
        const index = imageUrl.indexOf(bucketSearchStr)
        if (index === -1) return

        const filePath = imageUrl.substring(index + bucketSearchStr.length)
        if (!filePath) return

        const { error } = await supabase.storage
            .from(bucket)
            .remove([filePath])

        if (error) {
            console.error(`Failed to delete image from Supabase Storage: ${error.message}`)
        }
    } catch (err) {
        console.error("Error deleting image from Supabase Storage:", err)
    }
}