# Booking & pricing overhaul — 2026-07-03

Owner: Principal Engineer session. Constraint: no commits/pushes; user reviews on port 3002 and decides commit vs restore.

## Decisions (and why)

1. **Reprice to top of market** (user directive: "we should be highest price because we are the professionals").
   - Single €89 → **€109**, Pair €149 → **€189**.
   - Benchmarks (checked 2026-07-03): AAS €100 single / €180 pair; Automotive Cardetailing ≈ €167 pair incl. BTW; idgarages "from €89"; C-Works ~€45/lamp. €189 is deliberately the highest fixed pair price, justified by strip + OEM-grade UV hard coat + in-shop cure + 1-year guarantee + specialists.
   - Pair saves €29 vs 2 singles (2×109−189) — now said out loud on the pair card.
2. **Kill the unreachable "Mail-in from €129"** (root cause fix). `site.pricing.mailIn.from` is now **computed** as pair + mail-in handling (189+25 = €214), so footer, Europe pages, FAQ, news, and translations can never drift from checkout again.
3. **Keep fixed return shipping, reprice with safety margin, show it upfront.**
   - Old table (BE 12 / NL 15 / DE 18 / FR 18 / LU 15 / GB 22 / OTHER 25) loses money: bpost 2026 list price to an address is €16.50 (2–10 kg) for surrounding countries + €3.55 insurance; rest-of-EU €34.60–52.70.
   - New table: **BE 15 / NL 25 / DE 25 / FR 25 / LU 25 / GB 55 / OTHER 55** (incl. BTW). OTHER/GB are safe ceilings; new export markets inherit OTHER automatically → scalable without code changes. Tune DOWN from real carrier invoices (business rates are far below bpost counter prices).
   - Booking page now shows the exact return fee for the selected country (charged later via the existing Stripe flow — unchanged).
4. **Condition step: stop taxing honesty.** "Be honest." → "Not sure? Pick what looks closest; we confirm the stage together at intake before any work starts." Stage 3 now includes crazing + failed DIY coatings. New optional checkbox "these lights were treated before (DIY kit/spray/earlier restoration)" — appended to booking notes, zero schema risk. (User rejected photo upload; not built.)
5. **Add-ons: fog lights (+€49) and tail lights (+€79) per pair.** Same craft, same tools; copy already promised tail lights. Scope statement stays coherent ("exterior light lenses"). **PPF deliberately NOT added** — no film stock/process in place yet; selling it would be a false promise. Badges/reflectors skipped (off-mission).
6. **Warranty stays 1 year** (single constant `site.warranty`); roadmap comment documents the 5-year upgrade path once the OEM coating line (Red Spot UVT610/UVT200, SilFORT UVHC5000; starter HBC 609-3) is adopted. No public claims about coating brands until purchased.
7. **Price display format unchanged** — "€ 189,00", "+ € 25,00", "Included" (Apple configurator pattern, user decision).
8. **Mobile fees shown as one line** on the method card ("+ € 84,00 service & travel up to 25 km") — receipt still itemizes. Stacked surcharges read as nickel-and-diming; one number reads as a price.
9. **Booking-aware appointment duration** stored at creation (visit: 60 single / 75 pair, +15 for stage-3 or complex, +15 per add-on, capped 120). Calendar already respects stored durations — prevents double-booking after heavy jobs with no API/picker changes.
10. **Dead code removed**: `buildBookingMailto` + `BookingMailtoParams`, `MailInBookingConfirmation`, `mobileTravelSummaryLines`, `isMobileTravelConfigured`, `mobileAppointmentNotice` (+ re-export), deprecated `footerColumns` / `footerContactLine`.

## Checklist

- [x] Plan written and reviewed against DCO gate / SEO framework / design-audit skills
- [x] `site.ts` — prices, computed mail-in, return-shipping table, comments
- [x] `booking.ts` — add-ons, copy, labels, breakdown, dead code out
- [x] `duration.ts` + file/postgres stores — booking-aware duration, addOnIds
- [x] `appointments/types.ts` + book API — addOnIds accepted + sanitized
- [x] i18n types + catalog + `en-build.ts` — new keys, honest copy
- [x] `patches/nl.ts`, `patches/fr.ts`, `patches/de.ts` — all changed keys translated
- [x] `BookingSection.tsx` — add-ons UI, treated-before, return-shipping line, selected check glyph
- [x] Emails + booking-details + public booking hub — add-on lines
- [x] `pricing.ts`, `mail-in-flow.ts`, `footer.ts` — fixed-return copy, add-on modifier row
- [x] `JsonLd.tsx` (minPrice + mail-in + add-on offers) + `public/llms.txt` refresh
- [x] Lint + build clean, dev on port 3002, browser smoke test
- [x] Review section below filled in

## Compliance packet (DCO gate)

- Skills loaded: dco-gate, seo-ai-visibility-framework, design-audit (earlier audit), accessibility-wcag21-aa-gate principles applied.
- Tokens: all UI edits reuse existing utility classes/components (SelectCard, BookingCheckbox); no new hard-coded colors; check glyph uses `text-action-primary`.
- Accessibility: selection state remains `aria-pressed` + border; new check glyph is `aria-hidden` (decorative, state already programmatic). New checkboxes use existing accessible `BookingCheckbox`.
- SEO/AEO: prices flow from one source (`site.ts`) into metadata, FAQ, JSON-LD offers (`minPrice` semantics), and `llms.txt`; structured data matches user-visible content (add-on offers are visible on /book).
- Exceptions: none.

## Review

**Status: complete. 26 files changed (+575 / −278). `next build` green (types + lint + 240 pages). Browser smoke test on port 3002: 15/15 checks passed (EN + NL, /book, /pricing, /llms.txt). Nothing committed — user reviews and decides.**

### What changed, by surface

- **Prices** (`site.ts`): single €109, pair €189 (top of market by design), mail-in **computed** = pair + €25 handling = €214 → the old unreachable "from €129" bug is impossible to reintroduce. All metadata, FAQ, footer, Europe pages, news, and 4 locales pick the new numbers up automatically because everything reads `site.pricing`.
- **Return shipping** (`site.ts` + copy): fixed per-country table repriced against bpost 2026 list prices so no destination loses money (BE 15 / NL·DE·FR·LU 25 / GB·OTHER 55, incl. BTW). Booking page now shows the exact fee for the selected country with "paid later" framing; Stripe return-checkout flow untouched and still charges this table. New markets fall back to OTHER — scales internationally with zero code.
- **Add-ons**: fog lights +€49, tail lights +€79 (pair) — bookable toggles on /book, priced in the breakdown, persisted (`addOnIds`, JSON stores, no migration), shown in confirmation emails, customer booking hub, and admin. PPF intentionally NOT sold (no film process in place yet).
- **Condition step**: "Be honest" penalty-framing replaced with intake-confirmation reassurance; Stage 3 now covers crazing + failed DIY coatings; new optional "treated before" checkbox feeds the booking notes (no schema change; photo upload rejected by owner and not built).
- **Calendar safety**: stored appointment duration now scales with pair/severity/complex/add-ons (60→max 120 min), so a heavy job blocks the next slot correctly. Candidate-slot checks unchanged (no API/picker changes).
- **Copy/i18n**: pair card sells the €29 saving; mobile fees shown as one combined "+ € 84,00" line (receipt still itemized); VAT checkbox now says what it does; all of it translated in NL/FR/DE including a new fog/tail FAQ.
- **SEO/AEO**: JSON-LD offers use `minPrice`, gained mail-in + fog + tail offers; `llms.txt` fully rewritten with new prices, add-ons, return-shipping table, premium positioning Q&A.
- **Dead code removed**: `buildBookingMailto`, `BookingMailtoParams`, `MailInBookingConfirmation`, `mobileTravelSummaryLines`, `isMobileTravelConfigured`, `mobileAppointmentNotice`, deprecated `footerColumns`/`footerContactLine`.

### Deliberately NOT done (and why)

- 5-year warranty: stays 1 year until the OEM coating line (UVT610/UVT200/UVHC5000, starter HBC 609-3) is purchased — it is a one-string change in `site.ts` when ready, documented in a comment there. No coating brand names on the public site until real.
- PPF add-on, badges, reflectors: can't deliver yet / off-mission.
- Price display format: kept Apple-style "€ 189,00" / "+ € 25,00" / "Included" per owner decision.

### Watch after launch

- Return-shipping table: tune DOWN from real carrier invoices (business rates are far below the bpost list prices used as the safety ceiling); GB heavy parcels (>5 kg via bpost consumer rates) are the one case that can exceed €55 — use a business carrier.
- Track actual labor minutes per vehicle brand (German/Korean hard coats) from booking data; reprice size modifiers after ~20–30 jobs.
- No-show rate on "pay later" bookings.

---

# Follow-up session — 2026-07-03 (evening)

## Small UX/content fixes

- [x] Booking page garage address is now a clickable Google Maps link (`visitNoteLead` + linked address + `visitNoteTail` in all 4 locales; accessible label "Get directions: …").
- [x] Google Business Profile (`https://share.google/b8E078Gn5ikvTNfdy`) added to `site.googleBusinessProfile` → footer "Follow SHINES" row, JSON-LD `sameAs` (deduped), `llms.txt`.

## Google Search Console indexing fixes

GSC state (2026-07-03): 39 indexed, 275 not indexed. Buckets:

1. **Page with redirect (76, validation failed)** — mostly historic `?locale=` redirects from before the locale-keeping commits; those URLs now return 200. `www.shines.be/*` → apex 308 is intentional and stays. Action: revalidate in GSC.
2. **Duplicate without user-selected canonical (2, validation failed)** — root cause found and fixed: fr-BE/fr-FR/fr-LU (and nl-BE/nl-NL) served identical content, each self-canonical → duplicate cluster with no chosen winner.
   - Fix in `src/lib/seo/alternates.ts`: **one canonical per language bundle** — nl → `?locale=nl-BE`, fr → `?locale=fr-BE`, de → `?locale=de-DE`, en-family → bare. Regional variants canonicalize to their bundle primary.
   - hreflang is now **language-only** (`en`, `nl`, `fr`, `de`, `x-default`) in page `<head>` and sitemap — no more regional hreflang pointing at duplicate URLs.
   - Exactly 4 indexable URLs per page. Docs updated (`docs/SEO-CANONICAL-AND-INDEXING.md`).
3. **Discovered – currently not indexed (196)** — not a technical error (new site, crawl budget). Improves with time + the fixes above; keep sitemap fresh, request indexing for priority pages.
4. **Crawled – not indexed (1)** — same, no code action.

Verified locally: `?locale=fr-FR` canonical → `?locale=fr-BE`; `?locale=nl-NL` → `?locale=nl-BE`; `de-DE` self; bare self; sitemap hreflang set = de/en/fr/nl/x-default. `next build` green (240 pages).
