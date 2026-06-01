import Link from "next/link";
import type { ReactNode } from "react";

export type LinkColumnSection = {
  title: string;
  items: { label: string; href: string; external?: boolean }[];
};

type AppleLinkListPageProps = {
  title: string;
  description: string;
  sections: LinkColumnSection[];
  breadcrumb?: ReactNode;
};

function LinkItem({
  label,
  href,
  external,
}: {
  label: string;
  href: string;
  external?: boolean;
}) {
  const className =
    "text-[12px] leading-5 text-action-primary transition-opacity hover:opacity-80 hover:underline";

  if (external) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export function AppleLinkListPage({
  title,
  description,
  sections,
  breadcrumb,
}: AppleLinkListPageProps) {
  return (
    <div className="w-full px-section-even pb-20 pt-12 md:pb-24 md:pt-16">
      {breadcrumb}
      <h1 className="text-[32px] font-semibold leading-tight tracking-tight text-text-primary md:text-[40px]">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-body">
        {description}
      </p>

      <div className="mt-12 space-y-10">
        {sections.map((section) => (
          <section key={section.title} aria-labelledby={`section-${section.title}`}>
            <h2
              id={`section-${section.title}`}
              className="text-xs font-semibold text-text-primary"
            >
              {section.title}
            </h2>
            <ul className="mt-3 columns-1 gap-x-10 sm:columns-2 lg:columns-3 [&>li]:break-inside-avoid">
              {section.items.map((item) => (
                <li key={`${section.title}-${item.label}`} className="mb-2.5">
                  <LinkItem {...item} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
