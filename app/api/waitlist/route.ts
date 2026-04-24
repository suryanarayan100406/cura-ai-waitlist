import { NextResponse } from "next/server";

import { getSupabaseServerClient, hasSupabaseConfig } from "@/lib/supabase";
import {
  BASE_WAITLIST_COUNT,
  formatFamilyCount,
  waitlistSchema,
} from "@/lib/waitlist-schema";

async function getCurrentCount() {
  if (!hasSupabaseConfig()) {
    return BASE_WAITLIST_COUNT;
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return BASE_WAITLIST_COUNT;
  }

  const { count, error } = await supabase
    .from("waitlist")
    .select("id", { head: true, count: "exact" });

  if (error) {
    return BASE_WAITLIST_COUNT;
  }

  return BASE_WAITLIST_COUNT + (count ?? 0);
}

export async function GET() {
  const count = await getCurrentCount();

  return NextResponse.json({
    count,
    countLabel: `${formatFamilyCount(count)}+`,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = waitlistSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Invalid form data.";
      return NextResponse.json({ message: firstError }, { status: 400 });
    }

    if (!hasSupabaseConfig()) {
      return NextResponse.json(
        {
          message:
            "Waitlist backend is not configured yet. Add Supabase keys and try again.",
        },
        { status: 503 }
      );
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json(
        { message: "Supabase client is unavailable." },
        { status: 503 }
      );
    }

    const { error } = await supabase.from("waitlist").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      use_case: parsed.data.use_case,
      source: parsed.data.source,
    });

    if (error) {
      if (error.code === "23505") {
        const count = await getCurrentCount();
        return NextResponse.json(
          {
            message: "You are already on the waitlist with this email.",
            count,
            countLabel: `${formatFamilyCount(count)}+`,
          },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { message: "Could not save your signup right now. Please try again." },
        { status: 500 }
      );
    }

    const count = await getCurrentCount();

    return NextResponse.json(
      {
        message: "You're in. We'll be in touch soon.",
        count,
        countLabel: `${formatFamilyCount(count)}+`,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
