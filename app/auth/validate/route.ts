import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.email?.includes("@college.harvard.edu")) {
    await supabase.from("profiles").upsert(
      {
        id: user.id,
        email: user.email,
        full_name: user.user_metadata.full_name,
      },
      { onConflict: "id" }
    );
  } else {
    await supabase.auth.signOut();
    return NextResponse.redirect(
      new URL("/login?message=invalid-account", request.url)
    );
  }

  return NextResponse.redirect(requestUrl.origin);
}
