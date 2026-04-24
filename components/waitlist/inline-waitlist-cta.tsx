"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { trackWaitlistFunnel } from "@/lib/analytics";
import { quickWaitlistSchema } from "@/lib/waitlist-schema";

const heroSchema = z.object({
  email: quickWaitlistSchema.shape.email,
});

type HeroFormValues = z.infer<typeof heroSchema>;

const source = "hero-cta";

export function InlineWaitlistCta() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const {
    register,
    handleSubmit,
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

  const onSubmit = (values: HeroFormValues) => {
    trackWaitlistFunnel("submit_started", source, {
      form_variant: "inline",
    });

    trackWaitlistFunnel("redirect_to_full_form", source, {
      form_variant: "inline",
    });

    setIsRedirecting(true);
    const target = `/waitlist?email=${encodeURIComponent(values.email)}&source=${source}`;
    router.push(target);
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
          disabled={isSubmitting || isRedirecting}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-deep px-6 text-sm font-semibold text-cream transition hover:bg-brand-bright disabled:cursor-not-allowed"
        >
          {isSubmitting || isRedirecting ? (
            <>
              <LoaderCircle className="size-4 animate-spin" />
              Redirecting...
            </>
          ) : (
            "Join the Waitlist"
          )}
        </button>
      </div>

      {errors.email ? (
        <p className="mt-2 text-sm text-coral">{errors.email.message}</p>
      ) : null}
    </form>
  );
}
