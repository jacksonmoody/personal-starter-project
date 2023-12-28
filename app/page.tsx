import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.auth.getUser();
  if (!data) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  return (
    <main className="animate-in">
      <h1 className="text-5xl font-bold mt-10 text-center">Welcome, {data.user?.user_metadata.full_name}!</h1>
    </main>
  );
}
