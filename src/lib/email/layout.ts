import { escapeHtml } from "@/lib/email/escape";
import { site } from "@/lib/site";

const brand = "#0f62fe";
const text = "#1d1d1f";
const muted = "#6e6e73";
const border = "#e8e8ed";
const surface = "#f5f5f7";

export function emailLayout(options: {
  preheader: string;
  body: string;
  footerNote?: string;
  lang?: string;
}): string {
  const preheader = escapeHtml(options.preheader);
  const footer = options.footerNote
    ? `<p style="margin:20px 0 0;font-size:13px;color:${muted};line-height:1.5">${escapeHtml(options.footerNote)}</p>`
    : "";

  return `<!DOCTYPE html>
<html lang="${options.lang ?? "en"}">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width"/>
<meta name="color-scheme" content="light"/>
<title>${site.name}</title>
</head>
<body style="margin:0;padding:0;background:${surface};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${surface};padding:32px 16px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;border:1px solid ${border};overflow:hidden">
<tr><td style="padding:28px 28px 8px">
<p style="margin:0;font-size:13px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:${brand}">${site.name}</p>
</td></tr>
<tr><td style="padding:8px 28px 28px;color:${text};font-size:16px;line-height:1.55">
${options.body}
${footer}
</td></tr>
<tr><td style="padding:20px 28px;background:${surface};border-top:1px solid ${border};font-size:13px;color:${muted};line-height:1.5">
${site.name} · ${escapeHtml(site.email)}<br/>
<a href="${site.url}" style="color:${brand};text-decoration:none">${site.url.replace("https://", "")}</a>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

export function emailPrimaryButton(href: string, label: string): string {
  const safeHref = escapeHtml(href);
  const safeLabel = escapeHtml(label);
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0 8px"><tr>
<td style="border-radius:10px;background:${brand}">
<a href="${safeHref}" style="display:inline-block;padding:14px 24px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none">${safeLabel}</a>
</td></tr></table>`;
}

export function emailDetailTable(rows: { label: string; value: string }[]): string {
  const cells = rows
    .map(
      (row) => `<tr>
<td style="padding:10px 0;border-bottom:1px solid ${border};font-size:13px;font-weight:600;color:${muted};vertical-align:top;width:38%">${escapeHtml(row.label)}</td>
<td style="padding:10px 0;border-bottom:1px solid ${border};font-size:15px;color:${text};vertical-align:top">${escapeHtml(row.value)}</td>
</tr>`,
    )
    .join("");

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0 4px;border-collapse:collapse">${cells}</table>`;
}

export function emailStepsList(steps: string[]): string {
  const items = steps
    .map(
      (step, i) => `<tr>
<td style="padding:0 12px 12px 0;vertical-align:top;width:28px;font-size:14px;font-weight:700;color:${brand}">${i + 1}</td>
<td style="padding:0 0 12px;font-size:15px;line-height:1.45;color:${text}">${escapeHtml(step)}</td>
</tr>`,
    )
    .join("");

  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:16px 0 8px">${items}</table>`;
}

export function emailReferenceBadge(reference: string): string {
  return `<p style="margin:16px 0 0;font-size:22px;font-weight:700;letter-spacing:0.02em;color:${text}">${escapeHtml(reference)}</p>`;
}
