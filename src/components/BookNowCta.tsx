import Link from "next/link";
import type { ReactNode } from "react";
import { PrimaryButton, TextLink } from "@/components/SectionShell";
import { isPublicBookingEnabled } from "@/lib/booking-access";

export function BookNowPrimaryButton({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  if (!isPublicBookingEnabled()) return null;
  return (
    <PrimaryButton href="/book" className={className}>
      {children}
    </PrimaryButton>
  );
}

export function BookNowTextLink({
  children,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  variant?: "primary" | "dark";
  className?: string;
}) {
  if (!isPublicBookingEnabled()) return null;
  return (
    <TextLink href="/book" variant={variant} className={className}>
      {children}
    </TextLink>
  );
}

export function BookNowHeaderLink({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className: string;
  onClick?: () => void;
}) {
  if (!isPublicBookingEnabled()) return null;
  return (
    <Link href="/book" className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export function BookNowHeroLink({ children }: { children: ReactNode }) {
  if (!isPublicBookingEnabled()) return null;
  return (
    <Link
      href="/book"
      className="inline-flex items-center text-[14px] font-medium text-action-primary underline underline-offset-4 transition-colors hover:text-text-on-dark"
    >
      {children}
    </Link>
  );
}

export function BookNowInlineLink({ children }: { children: ReactNode }) {
  if (!isPublicBookingEnabled()) return null;
  return (
    <Link
      href="/book"
      className="mt-2 inline-flex items-center gap-0.5 text-[14px] font-normal text-action-primary transition-opacity hover:opacity-80"
    >
      {children}
      <span aria-hidden="true">&rsaquo;</span>
    </Link>
  );
}
