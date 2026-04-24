"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { trackWaitlistFunnel } from "@/lib/analytics";
import { WAITLIST_USE_CASES } from "@/lib/content";
import { quickWaitlistSchema } from "@/lib/waitlist-schema";

const heroSchema = z.object({
  email: quickWaitlistSchema.shape.email,
});

type HeroFormValues = z.infer<typeof heroSchema>;

const source = "hero-cta";

export function InlineWaitlistCta() {
  const [message, setMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<HeroFormValues>({
    resolver: zodResolver(heroSchema),
    defaultValues: { email: "" },
  });

  useEffect(() => {
    trackWaitlistFunnel("form_view", source, {
      form_variant: "inline",
    });
  }, []);

  const onSubmit = async (values: HeroFormValues) => {
    setMessage("");

    trackWaitlistFunnel("submit_started", source, {
      form_variant: "inline",
    });

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Homepage Visitor",
          email: values.email,
          use_case: WAITLIST_USE_CASES[0].value,
          source,
        }),
      });
      const data: { message?: string } = await response.json();

      if (!response.ok) {
        trackWaitlistFunnel(
          response.status === 409 ? "duplicate_email" : "submit_failed",
          source,
          {
            form_variant: "inline",
            status_code: response.status,
          }
        );
        setMessage(data.message ?? "Could not submit. Please try again.");
        return;
      }

      trackWaitlistFunnel("submit_success", source, {
        form_variant: "inline",
      });
      setMessage("You're in. We'll be in touch soon.");
      reset({ email: "" });
    } catch {
      trackWaitlistFunnel("submit_failed", source, {
        form_variant: "inline",
        status_code: "network_error",
      });
      setMessage("Network error. Please try again.");
    }
  };

  const onInvalidSubmit = () => {
    trackWaitlistFunnel("validation_error", source, {
      form_variant: "inline",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
      className="w-full max-w-xl"
      noValidate
    >
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <input
            type="email"
            placeholder="Enter your email"
            className="focus-glow h-12 w-full rounded-full border border-brand-deep/20 bg-white px-4 text-sm text-ink outline-none"
            {...register("email")}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-deep px-6 text-sm font-semibold text-cream transition hover:bg-brand-bright disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="size-4 animate-spin" />
              Joining...
            </>
          ) : (
            "Join the Waitlist"
          )}
        </button>
      </div>

      {errors.email ? (
        <p className="mt-2 text-sm text-coral">{errors.email.message}</p>
      ) : null}
      {message ? <p className="mt-2 text-sm text-ink-soft">{message}</p> : null}
    </form>
  );
}
