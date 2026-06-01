import type { Metadata } from "next";
import { Suspense } from "react";
import { JsonLd } from "@/components/JsonLd";
import { LocaleFromQuery } from "@/components/LocaleFromQuery";
import { formatPrice, locationLabel, site } from "@/lib/site";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: `Headlight Restoration ${locationLabel()} | ${site.name} | Belgium & Europe`,
  description: `Professional headlight restoration in ${locationLabel()}. Restore foggy, yellowed headlights from ${formatPrice(site.pricing.pair.from)}. Local garage or mail-in service across Europe. Book today.`,
  metadataBase: new URL(site.url),
  openGraph: {
    title: `${site.name} | Headlight Restoration ${locationLabel()}`,
    description: `Crystal-clear headlights, safer night driving. Local restoration in ${locationLabel()} or mail-in across Europe from ${formatPrice(site.pricing.pair.from)}.`,
    url: site.url,
    siteName: site.name,
    locale: "en_BE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <head>
        <link
          href="https://fonts.cdnfonts.com/css/sf-pro-display"
          rel="stylesheet"
        />
        <JsonLd />
      </head>
      <body>
        <Suspense fallback={null}>
          <LocaleFromQuery />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
