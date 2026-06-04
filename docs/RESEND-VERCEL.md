# Resend on Vercel — one secret to add

The site sends mail-in emails via Resend. **`RESEND_FROM` is set in `vercel.json`** so you do not need to add it in the dashboard (unless you want to override it).

## You add only this in Vercel

1. [Vercel → shines → Settings → Environment Variables](https://vercel.com/islamxyz/shines/settings/environment-variables)
2. **Add New**
   - **Key:** `RESEND_API_KEY`
   - **Value:** your Resend key (`re_...`, **Sending access**)
   - **Environment:** Production (optional: Preview if you want preview deploys to send mail)
3. **Save**
4. **Deployments** → latest Production → **⋯** → **Redeploy**

## Resend checklist (before the key works)

- [ ] Domain `shines.be` **Verified** in [Resend → Domains](https://resend.com/domains)
- [ ] DNS records added in **Vercel → Domains → shines.be → DNS** (DKIM + sending SPF from Resend)
- [ ] **Enable Receiving** off in Resend unless you use Resend inbound (see [LAUNCH.md](./LAUNCH.md) Phase 3)

## Test

1. Resend dashboard → send test from `info@shines.be` to your personal email.
2. Live site → `/admin` → change a mail-in status so a customer email fires.

If it fails, open the deployment **Logs** and search for `RESEND` or `Resend HTTP`.

## Local dev

Copy `.env.example` to `.env.local` and set `RESEND_API_KEY` there. Without it, dev logs emails to the console instead of sending.
