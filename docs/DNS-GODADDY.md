# DNS for shines.be → Vercel

**Current setup (June 2026):** Nameservers point to **Vercel DNS**, not GoDaddy DNS.

| Nameserver | Status |
|------------|--------|
| `ns1.vercel-dns.com` | Active |
| `ns2.vercel-dns.com` | Active |

GoDaddy is still the **registrar** (where you bought the domain). DNS is managed in **Vercel**, not GoDaddy’s DNS panel.

## If `shines.be` shows GoDaddy “Launching Soon” but `www` works

1. **Nameservers must be Vercel** (see above). At GoDaddy → Domain → **Nameservers** → Custom → `ns1.vercel-dns.com` + `ns2.vercel-dns.com`.
2. **Remove GoDaddy Website / Coming Soon**, My Products → shines.be → disconnect any GoDaddy website or forwarding on the root domain.
3. **Clear browser cache** or open an **incognito** window and visit `https://shines.be` (use HTTPS, not HTTP).
4. Wait up to 1 hour for DNS cache to expire on your ISP.

## Verify in Vercel

- Dashboard → **islamxyz/shines** → **Settings → Domains**
- Both `shines.be` and `www.shines.be` should show **Valid Configuration**

## Live URLs

- https://shines.be
- https://www.shines.be

## Old GoDaddy DNS records (ignore if using Vercel nameservers)

If nameservers are Vercel, editing A/CNAME records in GoDaddy DNS **has no effect**. Manage DNS at:

- Vercel → **Domains** → **shines.be** → DNS Records

Or CLI: `npx vercel dns ls shines.be`

## Email DNS (add in Vercel when ready)

When you set up Google Workspace or Resend, add MX/TXT/CNAME records in **Vercel DNS** (same place), not GoDaddy.

See [LAUNCH.md](./LAUNCH.md) Phase 3 for email setup.
