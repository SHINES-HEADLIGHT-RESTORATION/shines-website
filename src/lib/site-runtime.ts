import { site } from "@/lib/site";

function envString(key: string): string | null {
  const value = process.env[key]?.trim();
  return value ? value : null;
}

/** Public contact email — override via SITE_EMAIL in Vercel without code changes. */
export function publicEmail(): string {
  return envString("SITE_EMAIL") ?? site.email;
}

export type PublicContact = {
  street: string | null;
  postalCode: string | null;
  city: string | null;
  phone: string | null;
  mapsLink: string | null;
  mapsEmbedUrl: string | null;
};

/** Workshop contact fields — override via Vercel env when your address goes live. */
export function publicContact(): PublicContact {
  return {
    street: envString("CONTACT_STREET") ?? site.contact.street,
    postalCode: envString("CONTACT_POSTAL_CODE") ?? site.contact.postalCode,
    city: envString("CONTACT_CITY") ?? site.location.city,
    phone: envString("CONTACT_PHONE") ?? site.contact.phone,
    mapsLink: envString("MAPS_LINK") ?? site.contact.mapsLink,
    mapsEmbedUrl: envString("MAPS_EMBED_URL") ?? site.contact.mapsEmbedUrl,
  };
}

export function googleSiteVerification(): string | null {
  return envString("GOOGLE_SITE_VERIFICATION");
}

export function formatPublicAddressLines(): string[] {
  const contact = publicContact();
  const lines: string[] = [];
  if (contact.street) lines.push(contact.street);
  const cityLine = [contact.postalCode, contact.city].filter(Boolean).join(" ");
  if (cityLine) lines.push(cityLine);
  lines.push(site.location.country);
  return lines;
}

export function publicLocationLabel(): string {
  const city = publicContact().city;
  return city ? `${city}, ${site.location.country}` : site.location.country;
}

/** Server-only contact bundle for the /contact page (env-aware). */
export function getContactSectionData() {
  const contact = publicContact();
  return {
    ...contact,
    addressLines: formatPublicAddressLines(),
    locationLabel: publicLocationLabel(),
  };
}

export type ContactSectionData = ReturnType<typeof getContactSectionData>;
