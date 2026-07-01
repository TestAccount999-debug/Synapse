import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { signToken } from "@/lib/auth";

export async function GET(req: Request) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const errorParam = searchParams.get("error");

    if (errorParam) {
      console.error(`[OAuth Callback] Google OAuth returned parameter error: ${errorParam}`);
      return NextResponse.redirect(`${appUrl}/login?error=${encodeURIComponent("Authorization declined by user.")}`);
    }

    if (!code) {
      console.error("[OAuth Callback] Authorization code is missing from URL.");
      return NextResponse.redirect(`${appUrl}/login?error=${encodeURIComponent("Missing authentication code.")}`);
    }

    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectURI = `${appUrl}/api/auth/callback/google`;

    if (!clientID || !clientSecret) {
      console.error("[OAuth Callback] Server configuration error: Google client credentials missing.");
      return NextResponse.redirect(`${appUrl}/login?error=${encodeURIComponent("Authentication server configured incorrectly.")}`);
    }

    console.log("[OAuth Callback] Exchanging code for tokens...");

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: clientID,
        client_secret: clientSecret,
        redirect_uri: redirectURI,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("[OAuth Callback] Token exchange failed:", tokenData);
      return NextResponse.redirect(
        `${appUrl}/login?error=${encodeURIComponent(tokenData.error_description || "Token exchange failed.")}`
      );
    }

    const accessToken = tokenData.access_token;
    console.log("[OAuth Callback] Fetching Google user profile...");

    const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const googleUser = await userInfoResponse.json();

    if (!userInfoResponse.ok) {
      console.error("[OAuth Callback] Failed to fetch user profile:", googleUser);
      return NextResponse.redirect(`${appUrl}/login?error=${encodeURIComponent("Failed to fetch user profile info.")}`);
    }

    const { email, name, picture } = googleUser;

    if (!email) {
      console.error("[OAuth Callback] Google account is missing email address:", googleUser);
      return NextResponse.redirect(`${appUrl}/login?error=${encodeURIComponent("Email address not provided by Google.")}`);
    }

    console.log(`[OAuth Callback] Processing database records for: ${email}`);

    const userSession = await db.transaction(async (tx) => {
      let matchedUser = await tx.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (!matchedUser) {
        console.log(`[OAuth Callback] User not found. Registering new profile for: ${email}`);

        let uniqueName = name
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "");

        if (!uniqueName) {
          uniqueName = "user";
        }

        const nameCollision = await tx.query.users.findFirst({
          where: eq(users.name, uniqueName),
        });

        if (nameCollision) {
          uniqueName = `${uniqueName}${Math.floor(1000 + Math.random() * 9000)}`;
        }

        const randomPassword = crypto.randomUUID();
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        const newUsers = await tx.insert(users).values({
          email,
          name: uniqueName,
          password: hashedPassword,
          avatar: picture || null,
          role: "user",
        }).returning();

        matchedUser = newUsers[0];
        console.log(`[OAuth Callback] Successfully registered user ID ${matchedUser.id} with handle: @${uniqueName}`);
      }

      return matchedUser;
    });

    const appToken = signToken({ userId: userSession.id });

    (await cookies()).set("token", appToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    console.log(`[OAuth Callback] Session established for user ID ${userSession.id}. Redirecting...`);
    return NextResponse.redirect(`${appUrl}/feed`);

  } catch (err: any) {
    console.error("[OAuth Callback] Unexpected exception:", err);
    return NextResponse.redirect(
      `${appUrl}/login?error=${encodeURIComponent("An unexpected error occurred during Google Sign-In.")}`
    );
  }
}
