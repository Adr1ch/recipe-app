import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { addOrCreateUser } from "@/app/actions/profile";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  if (token_hash && type) {
    const supabase = await createClient();

    const { error: verifyOtpError, ...verifyOtpData } =
      await supabase.auth.verifyOtp({
        type,
        token_hash,
      });

    console.log("MSG: reote handle GET", {
      verifyOtpError,
      verifyOtpData,
    });

    if (!verifyOtpError) {
      await addOrCreateUser();
      return redirect(next);
    }
  }

  return redirect("/error");
}
