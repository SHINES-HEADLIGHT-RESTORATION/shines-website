import {
  messageLocale,
  type MessageBundleKey,
  type SupportedLocale,
} from "@/lib/i18n/config";
import { en } from "@/lib/i18n/messages/en";
import type { SiteMessages } from "@/lib/i18n/messages/types";

const lazyBundles: Record<
  Exclude<MessageBundleKey, "en">,
  () => Promise<SiteMessages>
> = {
  nl: () => import("@/lib/i18n/messages/nl").then((m) => m.nl),
  fr: () => import("@/lib/i18n/messages/fr").then((m) => m.fr),
  de: () => import("@/lib/i18n/messages/de").then((m) => m.de),
};

/** Sync English only, for sitemap / generateStaticParams at build time. */
export function getMessages(locale: SupportedLocale): SiteMessages {
  const key = messageLocale(locale);
  if (key === "en") return en;
  return en;
}

/** Loads a single locale bundle (avoids pulling all languages into every server page). */
export async function getMessagesAsync(
  locale: SupportedLocale,
): Promise<SiteMessages> {
  const key = messageLocale(locale);
  if (key === "en") return en;
  if (key in lazyBundles) {
    return lazyBundles[key as Exclude<MessageBundleKey, "en">]();
  }
  return en;
}
