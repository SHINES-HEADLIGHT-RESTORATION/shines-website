import type { Metadata } from "next";
import { Suspense } from "react";
import { I18nProvider } from "@/components/I18nProvider";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { MicrosoftClarity } from "@/components/MicrosoftClarity";
import { JsonLd } from "@/components/JsonLd";
import { SeoAlternateLinks } from "@/components/SeoAlternateLinks";
import { LocaleFromQuery } from "@/components/LocaleFromQuery";
import { localeToHtmlLang } from "@/lib/i18n/config";
import { toClientMessages } from "@/lib/i18n/client-messages";
import { getRequestMessages } from "@/lib/i18n/server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { bingSiteVerification, googleSiteVerification } from "@/lib/site-runtime";
import { site } from "@/lib/site";
import "./globals.css";
import { Geist } from "next/font/google";
import { sfProDisplay } from "@/lib/fonts/sf-pro-display";
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
  const google = googleSiteVerification();
  const bing = bingSiteVerification();
  const withBase: Metadata = { metadataBase: new URL(site.url), ...base };
  if (!google && !bing) return withBase;
  return {
    ...withBase,
    verification: {
      ...(google ? { google } : {}),
      ...(bing ? { other: { "msvalidate.01": bing } } : {}),
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { locale, messages } = await getRequestMessages();

  return (
    <html
      lang={localeToHtmlLang(locale)}
      className={cn("font-sans", geist.variable, sfProDisplay.variable)}
    >
      <head>
        <SeoAlternateLinks />
        <JsonLd />
      </head>
      <body>
        <GoogleAnalytics />
        <MicrosoftClarity />
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
