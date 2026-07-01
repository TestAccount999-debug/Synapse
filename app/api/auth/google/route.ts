import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const redirectURI = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/callback/google`

    if (!clientId) {
        return NextResponse.json({error: "Google client ID is not configured"}, {status: 500})
    }

    const scope = "email profile"
    const googleOAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectURI)}&response_type=code&scope=${encodeURIComponent(scope)}&prompt=select_account`

    return NextResponse.redirect(googleOAuthURL);
}