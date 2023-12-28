import { type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);
  const session = await supabase.auth.getSession();
  const userID = session.data?.session?.user?.id;
  const onboarded = await supabase
    .from("profiles")
    .select("onboarded")
    .eq("id", userID);

  if (!session.data.session) {
    if (request.nextUrl.pathname != "/login") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (session.data.session && !onboarded.data![0].onboarded) {
    if (request.nextUrl.pathname != "/onboarding") {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|auth).*)"],
};
