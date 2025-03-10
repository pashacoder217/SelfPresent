import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getStatusRedirect } from "@/utils/helpers";
import { createClient } from "@/utils/supabase/server";
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createClient();

    const { error, data: session } =
      await supabase.auth.exchangeCodeForSession(code);
    console.log(session);
    return NextResponse.redirect(
      getStatusRedirect(
        `${requestUrl.origin}/dashboard/events`,
        "Success!",
        "You are now signed in.",
      ),
    );
  }
}
