"use client";

import { createClient } from "@/utils/supabase/client";
import Alert from "@/components/ui/Alert";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const supabase = createClient();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const completeOnboarding = async () => {
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      const { error } = await supabase
        .from("profiles")
        .update({ onboarded: true })
        .eq("id", data.user.id);
      if (error) {
        setError(error.message);
      } else {
        router.push("/");
      }
    }
  };

  return (
    <div className="animate-in mt-10 text-center flex flex-col gap-5">
      <h1 className="text-6xl font-bold">Welcome!</h1>
      <form action={completeOnboarding}>
        <button className="btn btn-primary">Complete Onboarding</button>
      </form>
      {error && <Alert message="Error Completing Onboarding" />}
    </div>
  );
}
