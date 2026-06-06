"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Image, Smile, MapPin, CalendarDays, BarChart3, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { users } from "@/db/schema"
import { readRouteCacheEntry } from "next/dist/client/components/segment-cache/cache"

export function ComposeBox() {
  const [content, setContent] = useState("")
  const [authorID, setAuthorID] = useState<{ id: number } | null>(null);
  const [showUploadContainer, setShowUploadContainer] = useState(false);
  const [attachedImageUrl, setAttachedImageUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false);
  const maxLength = 280

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) return

    const userID = JSON.parse(storedUser)

    setAuthorID(userID.id)

  }, [])

  const handleComposePost = async () => {

    const data = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content,
        authorId: authorID,
        image: attachedImageUrl
      })
    });

    if (data.ok) {
      setContent("");
      setAttachedImageUrl(null);
      window.location.reload();
    }
  }

  return (
    <Card className="border-border bg-card mb-6">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="flex-1 space-y-4">
            <Textarea
              placeholder="What's happening?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-24 resize-none border-0 bg-transparent text-lg placeholder:text-muted-foreground focus-visible:ring-0 p-0"
              maxLength={maxLength}
            />
            <div className="flex items-center justify-between border-t border-border pt-4">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-primary hover:bg-primary/10"
                  onClick={() => setShowUploadContainer(true)}
                >
                  <Image className="h-5 w-5" />
                </Button>
                {showUploadContainer && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-card text-card-foreground border border-border shadow-2xl rounded-2xl w-full max-w-md p-6 relative flex flex-col gap-4 animate-in zoom-in-95 duration-200">

                      {/* Header */}
                      <div className="flex items-center justify-between pb-2 border-b border-border">
                        <h3 className="font-bold text-lg">Add Photo</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full text-muted-foreground hover:bg-secondary"
                          onClick={() => setShowUploadContainer(false)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Upload Zone */}
                      <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-xl bg-background/50 hover:bg-background/80 transition-colors relative min-h-[160px]">
                        {uploading ? (
                          <div className="flex flex-col items-center gap-2">
                            <Loader2 className="h-8 w-8 text-primary animate-spin" />
                            <p className="text-sm text-muted-foreground">Uploading image to Supabase...</p>
                          </div>
                        ) : attachedImageUrl ? (
                          <div className="relative w-full flex flex-col items-center gap-2">
                            <img
                              src={attachedImageUrl}
                              alt="Preview"
                              className="max-h-48 rounded-lg object-cover border border-border"
                            />
                            <Button
                              variant="destructive"
                              size="sm"
                              className="mt-2 rounded-xl"
                              onClick={() => setAttachedImageUrl(null)}
                            >
                              Remove Photo
                            </Button>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center gap-2 cursor-pointer w-full text-center">
                            <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                              <Image className="h-6 w-6" />
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-primary underline">Browse files</span>
                              <p className="text-xs text-muted-foreground mt-1">Supports PNG, JPG, GIF up to 5MB</p>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0]
                                if (!file) return

                                try {
                                  setUploading(true)
                                  // Import the upload utility we built previously
                                  const { uploadImage } = await import('@/lib/upload-image')
                                  const url = await uploadImage(file, 'post-images')
                                  setAttachedImageUrl(url)
                                } catch (err: any) {
                                  alert(err.message || 'Failed to upload image')
                                } finally {
                                  setUploading(false)
                                }
                              }}
                            />
                          </label>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                        <Button
                          variant="ghost"
                          className="rounded-xl"
                          onClick={() => setShowUploadContainer(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          disabled={!attachedImageUrl}
                          className="rounded-xl bg-primary text-primary-foreground hover:opacity-90"
                          onClick={() => setShowUploadContainer(false)}
                        >
                          Confirm
                        </Button>
                      </div>

                    </div>
                  </div>
                )}

                {attachedImageUrl && (
                  <div className="relative inline-block mt-3 rounded-2xl overflow-hidden border border-border group max-w-sm">
                    <img src={attachedImageUrl} alt="Attachment Preview" className="max-h-[200px] object-cover" />
                    <button
                      type="button"
                      onClick={() => setAttachedImageUrl(null)}
                      className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-primary hover:bg-primary/10"
                >
                  <Smile className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-primary hover:bg-primary/10"
                >
                  <BarChart3 className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-primary hover:bg-primary/10"
                >
                  <CalendarDays className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-primary hover:bg-primary/10"
                >
                  <MapPin className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex items-center gap-3">
                {content.length > 0 && (
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "h-6 w-6 rounded-full border-2 flex items-center justify-center text-xs",
                        content.length > maxLength * 0.9
                          ? "border-destructive text-destructive"
                          : content.length > maxLength * 0.7
                            ? "border-yellow-500 text-yellow-500"
                            : "border-primary text-primary"
                      )}
                    >
                      {maxLength - content.length < 20 && maxLength - content.length}
                    </div>
                  </div>
                )}
                <Button
                  className="rounded-full px-5"
                  disabled={content.length === 0 || content.length > maxLength}
                  onClick={handleComposePost}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
