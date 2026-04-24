"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { WAITLIST_USE_CASES } from "@/lib/content";
import { trackWaitlistFunnel } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { BASE_WAITLIST_COUNT, formatFamilyCount } from "@/lib/waitlist-schema";

const waitlistFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .toLowerCase(),
  phone: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => !value || /^\d{10}$/.test(value),
      "Enter 10 digits for phone number."
    ),
  use_case: z.string().min(1, "Please select one option."),
});

type WaitlistFormValues = z.infer<typeof waitlistFormSchema>;

interface WaitlistFormProps {
  source?: string;
  className?: string;
  showCount?: boolean;
  initialEmail?: string;
}

export function WaitlistForm({
  source = "website",
  className,
  showCount = true,
  initialEmail,
}: WaitlistFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string>("");
  const [count, setCount] = useState(BASE_WAITLIST_COUNT);

  const normalizedInitialEmail = useMemo(
    () => initialEmail?.trim().toLowerCase() ?? "",
    [initialEmail]
  );

  const defaultValues = useMemo<WaitlistFormValues>(
    () => ({
      name: "",
      email: normalizedInitialEmail,
      phone: "",
      use_case: WAITLIST_USE_CASES[0].value,
    }),
    [normalizedInitialEmail]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues,
  });

  useEffect(() => {
    trackWaitlistFunnel("form_view", source, {
      form_variant: "full",
    });

    const loadCount = async () => {
      try {
        const response = await fetch("/api/waitlist", { cache: "no-store" });
        if (!response.ok) {
          return;
        }
        const data: { count?: number } = await response.json();
        if (typeof data.count === "number") {
          setCount(data.count);
        }
      } catch {
        // Intentionally silent: count fallback still keeps page usable.
      }
    };

    void loadCount();
  }, [source]);

  const onSubmit = async (values: WaitlistFormValues) => {
    setServerError("");

    trackWaitlistFunnel("submit_started", source, {
      form_variant: "full",
      has_phone: Boolean(values.phone),
      use_case: values.use_case,
    });

    const payload = {
      name: values.name,
      email: values.email,
      phone: values.phone ? `+91${values.phone}` : undefined,
      use_case: values.use_case,
      source,
    };

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: {
        message?: string;
        count?: number;
        emailSent?: boolean;
      } = await response.json();

      if (!response.ok) {
        setServerError(data.message ?? "Could not submit. Please try again.");

        trackWaitlistFunnel(
          response.status === 409 ? "duplicate_email" : "submit_failed",
          source,
          {
            form_variant: "full",
            status_code: response.status,
          }
        );

        if (response.status === 409 && typeof data.count === "number") {
          setCount(data.count);
        }
        return;
      }

      trackWaitlistFunnel("submit_success", source, {
        form_variant: "full",
        email_sent: Boolean(data.emailSent),
      });
      if (typeof data.count === "number") {
        setCount(data.count);
      }

      const thankYouUrl = new URL("/thank-you", window.location.origin);
      thankYouUrl.searchParams.set("emailSent", data.emailSent ? "1" : "0");
      thankYouUrl.searchParams.set("source", source);
      if (values.email) {
        thankYouUrl.searchParams.set("email", values.email);
      }

      router.push(thankYouUrl.pathname + thankYouUrl.search);
    } catch {
      trackWaitlistFunnel("submit_failed", source, {
        form_variant: "full",
        status_code: "network_error",
      });
      setServerError("Network error. Please check your internet and try again.");
    }
  };

  const onInvalidSubmit = () => {
    trackWaitlistFunnel("validation_error", source, {
      form_variant: "full",
    });
  };

  return (
    <div className={cn("rounded-3xl border border-brand-deep/15 bg-white p-6 shadow-sm sm:p-8", className)}>
      <form
        onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
        className="space-y-4"
        noValidate
      >
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-soft" htmlFor="name">
            Full name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Aarav Sharma"
            className="focus-glow h-12 w-full rounded-xl border border-brand-deep/20 bg-cream px-3.5 text-sm text-ink outline-none"
            {...register("name")}
          />
          {errors.name ? (
            <p className="mt-1 text-xs text-coral">{errors.name.message}</p>
          ) : null}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-soft" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="focus-glow h-12 w-full rounded-xl border border-brand-deep/20 bg-cream px-3.5 text-sm text-ink outline-none"
            {...register("email")}
          />
          {errors.email ? (
            <p className="mt-1 text-xs text-coral">{errors.email.message}</p>
          ) : null}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-soft" htmlFor="phone">
            Phone number (optional)
          </label>
          <div className="flex h-12 overflow-hidden rounded-xl border border-brand-deep/20 bg-cream">
            <span className="inline-flex items-center border-r border-brand-deep/15 px-3 text-sm font-semibold text-brand-deep">
              +91
            </span>
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              maxLength={10}
              placeholder="9876543210"
              className="focus-glow h-full w-full bg-transparent px-3.5 text-sm text-ink outline-none"
              {...register("phone")}
            />
          </div>
          {errors.phone ? (
            <p className="mt-1 text-xs text-coral">{errors.phone.message}</p>
          ) : null}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-soft" htmlFor="use_case">
            I am...
          </label>
          <select
            id="use_case"
            className="focus-glow h-12 w-full rounded-xl border border-brand-deep/20 bg-cream px-3.5 text-sm text-ink outline-none"
            {...register("use_case")}
          >
            {WAITLIST_USE_CASES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.use_case ? (
            <p className="mt-1 text-xs text-coral">{errors.use_case.message}</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-deep px-5 text-sm font-semibold text-cream transition hover:bg-brand-bright disabled:cursor-not-allowed disabled:opacity-80"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="size-4 animate-spin" />
              Joining...
            </>
          ) : (
            "Join the Waitlist →"
          )}
        </button>

        {serverError ? <p className="text-sm text-coral">{serverError}</p> : null}

      </form>

      {showCount ? (
        <p className="mt-5 text-center text-sm text-ink-soft">
          Joined by {formatFamilyCount(count)}+ families across India
        </p>
      ) : null}
    </div>
  );
}
