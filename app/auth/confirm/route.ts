import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (user && !userError) {
        let existingUser = await prisma.user.findUnique({
          where: { id: user.id },
        });

        if (!existingUser) {
          existingUser = await prisma.user.create({
            data: {
              id: user.id,
              email: user.email!,
              firstName: "",
              lastName: "",
              aboutMe: null,
              allergens: [],
              profileImage: null,
              role: "user",
            },
          });
        }
      }

      redirect(next);
    }
  }

  // redirect the user to an error page with some instructions
  redirect("/error");
}
