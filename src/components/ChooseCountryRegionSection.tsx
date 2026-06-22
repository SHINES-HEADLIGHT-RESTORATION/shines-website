"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { MarketFlag } from "@/components/MarketFlag";
import {
  getMarketCountryName,
  marketSearchText,
  offeredMarketGroups,
  type Market,
} from "@/lib/regions";

function marketSwitchHref(locale: Market["locale"]): string {
  return `/?locale=${encodeURIComponent(locale)}`;
}

function MarketLink({ market }: { market: Market }) {
  return (
    <Link
      href={marketSwitchHref(market.locale)}
      aria-label={`${market.country}, ${market.language}`}
      className="grid grid-cols-[24px_minmax(0,1fr)] items-center gap-x-4 rounded-lg px-2 py-1.5 no-underline transition-colors duration-300 hover:bg-black/[0.04]"
    >
      <MarketFlag code={market.flag} />
      <span className="min-w-0">
        <span className="block text-sm leading-snug text-text-primary">
          {market.country}
        </span>
        <span className="block text-sm leading-snug text-text-body">
          {market.language}
        </span>
      </span>
    </Link>
  );
}

export function ChooseCountryRegionSection() {
  const { locale, messages } = useI18n();
  const r = messages.regions;
  const [query, setQuery] = useState("");
  const currentCountry = getMarketCountryName(locale);

  const groups = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const base = offeredMarketGroups();

    if (!normalized) return base;

    return base
      .map((group) => ({
        ...group,
        markets: group.markets.filter((market) =>
          marketSearchText(market).includes(normalized),
        ),
      }))
      .filter((group) => group.markets.length > 0);
  }, [query]);

  return (
    <div className="mx-auto w-full max-w-5xl px-6 pb-20 pt-12 md:my-20 md:pb-24 md:pt-16">
      <div className="mb-10 flex justify-center md:mb-12">
        <Link href="/" aria-label="SHINES home">
          <div className="overflow-hidden rounded-[22%] shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
            <Image
              src="/images/shineslogowithbackground.svg"
              alt="SHINES"
              width={64}
              height={64}
              className="h-16 w-16"
              priority
            />
          </div>
        </Link>
      </div>

      <div className="text-center">
        <h1 className="text-[32px] font-semibold leading-tight tracking-tight text-text-primary md:text-[40px]">
          {r.pageTitle}
        </h1>
        <p className="mt-4 text-base text-text-body">
          {r.currentMarketLabel}{" "}
          <strong className="font-semibold text-text-primary">
            {currentCountry}
          </strong>
        </p>

        <div className="relative mx-auto mt-8 max-w-xl">
          <label htmlFor="market-search" className="sr-only">
            {r.searchPlaceholder}
          </label>
          <input
            id="market-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={r.searchPlaceholder}
            className="h-12 w-full rounded-xl border border-black/10 bg-surface px-4 pr-11 text-base text-text-primary outline-none transition-shadow placeholder:text-text-body/70 focus-visible:ring-2 focus-visible:ring-action-primary"
            autoComplete="off"
          />
          <svg
            className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-body"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20L16 16" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="mt-10 space-y-0 md:mt-12">
        {groups.length === 0 ? (
          <p className="py-8 text-center text-sm text-text-body">
            {r.noResults}
          </p>
        ) : (
          groups.map((group, index) => (
            <details
              key={group.id}
              className="group border-b border-black/10"
              open={index === 0 || query.length > 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-lg font-semibold text-text-primary marker:content-none [&::-webkit-details-marker]:hidden">
                {r.groups.find((g) => g.id === group.id)?.title ?? group.title}
                <svg
                  className="h-5 w-5 shrink-0 text-text-body transition-transform group-open:rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M6 9L12 15L18 9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <div className="pb-8 pt-2">
                <ul className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-4 md:gap-x-16 lg:gap-x-24">
                  {group.markets.map((market) => (
                    <li key={market.id}>
                      <MarketLink market={market} />
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))
        )}
      </div>
    </div>
  );
}
