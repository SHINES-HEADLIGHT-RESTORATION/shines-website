import { cookies, headers } from "next/headers";
import {
  defaultLocale,
  isSupportedLocale,
  LOCALE_COOKIE,
  type SupportedLocale,
} from "@/lib/i18n/config";
import { getMessagesAsync } from "@/lib/i18n/get-messages";

export async function getRequestLocale(): Promise<SupportedLocale> {
  const headerStore = await headers();
  const fromMiddleware = headerStore.get("x-shines-locale");
  if (fromMiddleware && isSupportedLocale(fromMiddleware)) {
    return fromMiddleware;
  }

  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  if (value && isSupportedLocale(value)) {
    return value;
  }
  return defaultLocale;
}

export async function getRequestMessages() {
  const locale = await getRequestLocale();
  return { locale, messages: await getMessagesAsync(locale) };
}
