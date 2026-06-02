"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { ClientSiteMessages } from "@/lib/i18n/client-messages";

type I18nContextValue = {
  locale: SupportedLocale;
  messages: ClientSiteMessages;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  locale,
  messages,
  children,
}: I18nContextValue & { children: ReactNode }) {
  return (
    <I18nContext.Provider value={{ locale, messages }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}
