"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";

export type AppleCardItem = {
  id: string;
  eyebrow?: string;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
  icon?: ReactNode;
  image?: {
    src: string;
    alt: string;
    position?: "center" | "edge" | "near-center" | "lower-right";
    size?: "sm" | "default" | "lg";
    offsetX?: number;
    offsetY?: number;
  };
};

function CardActionButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="absolute bottom-[26px] right-[26px] z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand text-text-on-dark transition-opacity hover:opacity-80"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path
          d="M5 3L9 7L5 11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </Link>
  );
}

export function AppleCard({
  item,
  className = "",
}: {
  item: AppleCardItem;
  className?: string;
}) {
  if (item.image) {
    return (
      <article
        className={`relative flex h-[380px] w-[370px] max-w-full flex-col overflow-visible rounded-[26px] bg-surface p-[26px] ${className}`}
      >
        <div className="relative z-10 shrink-0">
          {item.eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">
              {item.eyebrow}
            </p>
          )}
          <h3
            className={`text-[34px] font-semibold leading-[1.12] text-brand ${
              item.eyebrow ? "mt-2" : ""
            }`}
          >
            {item.title}
          </h3>
          <p className="mt-3 text-[18px] font-medium leading-[1.35] text-text-body">
            {item.description}
          </p>
        </div>

        <div
          className={`pointer-events-none absolute z-0 ${
            item.image.position === "edge"
              ? "right-0 bottom-0"
              : item.image.position === "lower-right"
                ? "right-16 bottom-6"
                : item.image.position === "near-center"
                  ? "inset-x-0 bottom-0 flex items-end justify-center"
                  : "inset-x-0 bottom-0 overflow-hidden rounded-b-[26px]"
          }`}
          aria-hidden="true"
        >
          <Image
            src={item.image.src}
            alt={item.image.alt}
            width={480}
            height={270}
            sizes="(max-width: 640px) 90vw, 370px"
            style={
              item.image.position === "near-center"
                ? {
                    transform: `translateX(${item.image.offsetX ?? 0}px) translateY(${item.image.offsetY ?? 0}px)`,
                  }
                : undefined
            }
            className={
              item.image.position === "edge"
                ? "h-[128px] w-auto max-w-none translate-x-1 translate-y-1 object-contain object-right-bottom"
                : item.image.position === "lower-right"
                  ? "h-[128px] w-auto max-w-none object-contain object-right-bottom"
                  : item.image.position === "near-center"
                    ? `${
                        item.image.size === "sm"
                          ? "h-[88px]"
                          : item.image.size === "lg"
                            ? "h-[172px]"
                            : "h-[128px]"
                      } w-auto max-w-none object-contain object-bottom`
                    : `${
                        item.image.size === "sm" ? "h-[88px]" : "h-[148px]"
                      } w-full object-cover object-bottom`
            }
          />
        </div>

        {item.href && (
          <CardActionButton
            href={item.href}
            label={item.linkLabel ?? item.title}
          />
        )}
      </article>
    );
  }

  return (
    <article
      className={`flex h-[380px] w-[370px] max-w-full flex-col rounded-[26px] bg-surface p-[26px] ${className}`}
    >
      {item.icon && (
        <div
          className="mb-5 shrink-0 text-brand [&_svg]:h-[46px] [&_svg]:w-[46px]"
          aria-hidden="true"
        >
          {item.icon}
        </div>
      )}
      {item.eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-wide text-brand">
          {item.eyebrow}
        </p>
      )}
      <h3
        className={`text-[34px] font-semibold leading-[1.12] text-brand ${
          item.eyebrow ? "mt-2" : ""
        }`}
      >
        {item.title}
      </h3>
      <p className="mt-4 flex-1 text-[18px] font-medium leading-[1.35] text-text-body">
        {item.description}
      </p>
      {item.href && item.linkLabel && (
        <Link
          href={item.href}
          className="mt-4 inline-flex items-center gap-0.5 text-[18px] font-medium text-action-primary transition-opacity hover:opacity-80"
        >
          {item.linkLabel}
          <span aria-hidden="true">&rsaquo;</span>
        </Link>
      )}
    </article>
  );
}
