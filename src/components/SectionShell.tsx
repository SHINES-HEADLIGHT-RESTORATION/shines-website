import { type ReactNode } from "react";

type SectionShellProps = {
  id?: string;
  className?: string;
  evenPadding?: boolean;
  children: ReactNode;
};

export function SectionShell({
  id,
  className = "",
  evenPadding = false,
  children,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 bg-surface-section ${evenPadding ? "px-section-even" : "px-section"} pb-16 pt-16 md:pb-20 md:pt-20 ${className}`}
    >
      <div className="w-full">{children}</div>
    </section>
  );
}

export function SectionCards({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative mt-10 w-full ${className}`}>{children}</div>
  );
}

export function SectionHeading({
  children,
  className = "text-text-primary",
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Tag
      className={`text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.08] tracking-tight ${className}`}
    >
      {children}
    </Tag>
  );
}

export function PrimaryButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-xl bg-action-primary px-8 text-sm font-semibold text-text-on-dark transition-opacity hover:opacity-90 ${className}`}
    >
      {children}
    </a>
  );
}

export function TextLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "dark";
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-0.5 text-sm font-normal transition-opacity hover:opacity-80 ${
        variant === "dark" ? "text-footer" : "text-action-primary"
      } ${className}`}
    >
      {children}
    </a>
  );
}
