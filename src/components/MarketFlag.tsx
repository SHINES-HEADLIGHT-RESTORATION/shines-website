/** Wireframe globe for "Other countries" — matches Porsche market picker. */
function MarketGlobeIcon() {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      className="text-text-primary"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12H21" />
      <path d="M12 3C14.5 6.5 14.5 17.5 12 21C9.5 17.5 9.5 6.5 12 3Z" />
    </svg>
  );
}

/** Circular flag or globe — Porsche uses 24px icons in a grid row. */
export function MarketFlag({ code }: { code: string }) {
  if (code === "other") {
    return (
      <span className="flex h-6 w-6 shrink-0 items-center justify-center">
        <MarketGlobeIcon />
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- external flag CDN, tiny static asset
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      alt=""
      width={24}
      height={24}
      loading="lazy"
      decoding="async"
      className="h-6 w-6 shrink-0 rounded-full object-cover ring-1 ring-black/10"
    />
  );
}
