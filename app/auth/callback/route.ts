import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getErrorRedirect, getStatusRedirect } from "@/utils/helpers";

export async function GET(request: NextRequest) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the `@supabase/ssr` package. It exchanges an auth code for the user's session.
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  if (code) {
    const supabase = createClient();

    const { error, data: session } =
      await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(
        getErrorRedirect(
          `${requestUrl.origin}/signin`,
          error.name,
          "Sorry, we weren't able to log you in. Please try again.",
        ),
      );
    }
    const user = session.user;
    const now = new Date();
    const createdAt = new Date(user.created_at);
    const timeDiff = now.getTime() - createdAt.getTime();
   
    if (timeDiff > 3 * 6 * 1000) {
      return NextResponse.redirect(
        getStatusRedirect(
          `${requestUrl.origin}/dashboard/events`,
          "Success!",
          "You are now signed in.",
        ),
      );
    } else {
      return NextResponse.redirect(
        getStatusRedirect(
          `${requestUrl.origin}/onboarding`,
          "Success!",
          "You are now signed in.",
        ),
      );
    }
  }
}
