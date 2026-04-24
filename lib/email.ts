interface WaitlistConfirmationParams {
  name: string;
  email: string;
  useCase: string;
}

type EmailSendResult =
  | { sent: true }
  | { sent: false; reason: "email-not-configured" | "provider-error" };

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(input: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return input.replace(/[&<>"']/g, (char) => map[char] ?? char);
}

function extractEmailAddress(value?: string): string | undefined {
  const normalized = normalizeFromAddress(value);
  if (!normalized) {
    return undefined;
  }

  const bracketMatch = normalized.match(/<([^>]+)>/);
  const candidate = (bracketMatch ? bracketMatch[1] : normalized).trim().toLowerCase();

  if (EMAIL_PATTERN.test(candidate)) {
    return candidate;
  }

  return undefined;
}

function normalizeFromAddress(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();

  const angleFormatMatch = trimmed.match(/^(.*?)<\s*([^<>\s@]+@[^<>\s@]+\.[^<>\s@]+)\s*>$/);
  if (angleFormatMatch) {
    const name = angleFormatMatch[1].trim().replace(/^"|"$/g, "");
    const email = angleFormatMatch[2].trim().toLowerCase();
    return name ? `${name} <${email}>` : email;
  }

  if (EMAIL_PATTERN.test(trimmed)) {
    return trimmed.toLowerCase();
  }

  const trailingEmailMatch = trimmed.match(
    /^(.*?)\s+([^\s@]+@[^\s@]+\.[^\s@]+)$/
  );
  if (trailingEmailMatch) {
    const name = trailingEmailMatch[1].trim().replace(/^"|"$/g, "");
    const email = trailingEmailMatch[2].trim().toLowerCase();
    return name ? `${name} <${email}>` : email;
  }

  return undefined;
}

function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = normalizeFromAddress(process.env.WAITLIST_FROM_EMAIL);
  const replyTo =
    extractEmailAddress(process.env.WAITLIST_REPLY_TO) || extractEmailAddress(from);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://curai.health";

  return {
    apiKey,
    from,
    replyTo,
    siteUrl,
  };
}

function buildWaitlistEmailHtml({
  name,
  siteUrl,
}: {
  name: string;
  siteUrl: string;
}) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1A1714; background: #FAF8F3; padding: 24px;">
      <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border: 1px solid rgba(45,106,79,0.16); border-radius: 14px; padding: 24px;">
        <p style="margin: 0; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #2D6A4F; font-weight: 700;">
          Cura AI Waitlist
        </p>
        <h1 style="margin: 12px 0 8px; font-size: 26px; line-height: 1.2; color: #1A1714;">
          You are in, ${name}.
        </h1>
        <p style="margin: 0 0 14px; font-size: 16px; line-height: 1.65; color: #2B2A28;">
          Thank you for joining the Cura AI founding waitlist. We will share early-access updates with you soon.
        </p>
        <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.65; color: #2B2A28;">
          Our mission is simple: help Indian families stay prepared with clear, connected health history.
        </p>
        <a href="${siteUrl}/waitlist" style="display: inline-block; background: #2D6A4F; color: #FAF8F3; text-decoration: none; font-size: 14px; font-weight: 700; border-radius: 999px; padding: 11px 18px;">
          View Waitlist Page
        </a>
        <p style="margin: 18px 0 0; font-size: 13px; color: #5B5753;">
          If this was not you, please ignore this email.
        </p>
      </div>
    </div>
  `;
}

function buildWaitlistEmailText({ name, useCase, siteUrl }: {
  name: string;
  useCase: string;
  siteUrl: string;
}) {
  return [
    `Hi ${name},`,
    "",
    "You are in. Thank you for joining the Cura AI founding waitlist.",
    "",
    `Use case selected: ${useCase}`,
    "",
    `Waitlist page: ${siteUrl}/waitlist`,
    "",
    "We will email you early-access updates soon.",
    "",
    "Cura AI Team",
  ].join("\n");
}

export async function sendWaitlistConfirmationEmail(
  params: WaitlistConfirmationParams
): Promise<EmailSendResult> {
  const config = getEmailConfig();

  if (!config.apiKey || !config.from) {
    return { sent: false, reason: "email-not-configured" };
  }

  const safeName = escapeHtml(params.name.trim() || "there");

  const payload: Record<string, unknown> = {
    from: config.from,
    to: [params.email],
    subject: "You're on the Cura AI waitlist",
    html: buildWaitlistEmailHtml({
      name: safeName,
      siteUrl: config.siteUrl,
    }),
    text: buildWaitlistEmailText({
      name: params.name.trim() || "there",
      useCase: params.useCase,
      siteUrl: config.siteUrl,
    }),
  };

  if (config.replyTo) {
    payload.reply_to = config.replyTo;
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error("Waitlist email failed:", details);
      return { sent: false, reason: "provider-error" };
    }

    return { sent: true };
  } catch (error) {
    console.error("Waitlist email request error:", error);
    return { sent: false, reason: "provider-error" };
  }
}
