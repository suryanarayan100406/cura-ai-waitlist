export type WaitlistFunnelStep =
  | "form_view"
  | "submit_started"
  | "redirect_to_full_form"
  | "submit_success"
  | "duplicate_email"
  | "validation_error"
  | "submit_failed";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (
      command: "event",
      eventName: string,
      eventParams?: Record<string, unknown>
    ) => void;
  }
}

export function trackEvent(
  eventName: string,
  eventParams: Record<string, unknown> = {}
) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...eventParams });

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, eventParams);
  }
}

export function trackWaitlistFunnel(
  step: WaitlistFunnelStep,
  source: string,
  extraParams: Record<string, unknown> = {}
) {
  trackEvent("waitlist_funnel", {
    step,
    source,
    ...extraParams,
  });
}
