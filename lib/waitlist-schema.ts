import { z } from "zod";

import { WAITLIST_USE_CASES } from "@/lib/content";

const validUseCases = WAITLIST_USE_CASES.map((option) => option.value);

export const BASE_WAITLIST_COUNT = 2400;

export const waitlistSchema = z.object({
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
      (value) => !value || /^\+91\d{10}$/.test(value),
      "Phone number must include +91 and 10 digits."
    ),
  use_case: z
    .string()
    .trim()
    .refine(
      (value) => validUseCases.includes(value as (typeof validUseCases)[number]),
      "Please select how you plan to use Cura AI."
    ),
  source: z.string().trim().default("website"),
});

export const quickWaitlistSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .toLowerCase(),
});

export type WaitlistPayload = z.infer<typeof waitlistSchema>;
export type QuickWaitlistPayload = z.infer<typeof quickWaitlistSchema>;

export function formatFamilyCount(count: number): string {
  return new Intl.NumberFormat("en-IN").format(count);
}
