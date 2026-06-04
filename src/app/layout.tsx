import type { Metadata } from "next";
import { Suspense } from "react";
import { I18nProvider } from "@/components/I18nProvider";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { JsonLd } from "@/components/JsonLd";
import { LocaleFromQuery } from "@/components/LocaleFromQuery";
import { localeToHtmlLang } from "@/lib/i18n/config";
import { toClientMessages } from "@/lib/i18n/client-messages";
import { getRequestMessages } from "@/lib/i18n/server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { googleSiteVerification } from "@/lib/site-runtime";
import { site } from "@/lib/site";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export async function generateMetadata(): Promise<Metadata> {
  const { locale, messages } = await getRequestMessages();
  const base = buildPageMetadata({
    path: "/",
    locale,
    title: messages.meta.homeTitle,
    description: messages.meta.homeDescription,
  });
  const verification = googleSiteVerification();
  const withBase: Metadata = { metadataBase: new URL(site.url), ...base };
  return verification
    ? {
        ...withBase,
        verification: { google: verification },
      }
    : withBase;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { locale, messages } = await getRequestMessages();

  return (
    <html lang={localeToHtmlLang(locale)} className={cn("font-sans", geist.variable)}>
      <head>
        <link
          href="https://fonts.cdnfonts.com/css/sf-pro-display"
          rel="stylesheet"
        />
        <JsonLd />
      </head>
      <body>
        <GoogleAnalytics />
        <I18nProvider locale={locale} messages={toClientMessages(messages)}>
          <Suspense fallback={null}>
            <LocaleFromQuery />
          </Suspense>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
