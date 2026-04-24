"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { BrandLogo } from "@/components/brand-logo";
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
}

export function WaitlistForm({
  source = "website",
  className,
  showCount = true,
}: WaitlistFormProps) {
  const [serverError, setServerError] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [count, setCount] = useState(BASE_WAITLIST_COUNT);

  const defaultValues = useMemo<WaitlistFormValues>(
    () => ({
      name: "",
      email: "",
      phone: "",
      use_case: WAITLIST_USE_CASES[0].value,
    }),
    []
  );

  const {
    register,
    handleSubmit,
    reset,
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

      const data: { message?: string; count?: number } = await response.json();

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

      setIsSuccess(true);
      trackWaitlistFunnel("submit_success", source, {
        form_variant: "full",
      });
      if (typeof data.count === "number") {
        setCount(data.count);
      }
      reset(defaultValues);
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

        <AnimatePresence>
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="flex items-center gap-3 rounded-xl border border-brand-bright/35 bg-brand-bright/10 p-3"
            >
              <motion.div
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="text-brand-deep"
              >
                <CheckCircle2 className="size-5" />
              </motion.div>
              <div>
                <p className="text-sm font-semibold text-brand-deep">
                  You are in. We will be in touch soon.
                </p>
                <div className="mt-1">
                  <BrandLogo showWordmark={false} iconClassName="size-6" />
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </form>

      {showCount ? (
        <p className="mt-5 text-center text-sm text-ink-soft">
          Joined by {formatFamilyCount(count)}+ families across India
        </p>
      ) : null}
    </div>
  );
}
