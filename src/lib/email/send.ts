import { site } from "@/lib/site";

export type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export type SendEmailResult =
  | { ok: true; id?: string; skipped?: false }
  | { ok: true; skipped: true; reason: string }
  | { ok: false; error: string };

function emailFromAddress(): string {
  return (
    process.env.RESEND_FROM?.trim() ||
    `${site.name} <onboarding@resend.dev>`
  );
}

export async function sendTransactionalEmail(
  input: SendEmailInput,
): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    if (process.env.NODE_ENV === "production") {
      return {
        ok: false,
        error: "RESEND_API_KEY is not configured.",
      };
    }
    console.info("[email:dev]", {
      to: input.to,
      subject: input.subject,
      text: input.text ?? input.html.replace(/<[^>]+>/g, " "),
    });
    return { ok: true, skipped: true, reason: "RESEND_API_KEY not set (dev log)" };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: emailFromAddress(),
      to: [input.to],
      subject: input.subject,
      html: input.html,
      text: input.text,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    return { ok: false, error: body || `Resend HTTP ${response.status}` };
  }

  const data = (await response.json()) as { id?: string };
  return { ok: true, id: data.id };
}
