import Link from "next/link";
import { newsPagePath } from "@/lib/news";
import { getRequestMessages } from "@/lib/i18n/server";
import { processPagePath } from "@/lib/process";

type NewsroomSubnavProps = {
  active?: "news" | "about" | "process";
};

export async function NewsroomSubnav({ active = "news" }: NewsroomSubnavProps) {
  const { messages } = await getRequestMessages();
  const { subnav } = messages.news;

  const links = [
    { href: newsPagePath, label: subnav.news, key: "news" as const },
    { href: "/about", label: subnav.about, key: "about" as const },
    { href: processPagePath, label: subnav.process, key: "process" as const },
  ];

  return (
    <nav
      aria-label="News section"
      className="border-b border-text-primary/10 bg-surface"
    >
      <div className="mx-auto flex max-w-[980px] flex-wrap items-center justify-between gap-4 px-section-even py-3">
        <ul className="flex flex-wrap items-center gap-5 text-sm">
          {links.map((link) => {
            const isActive = active === link.key;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    isActive
                      ? "font-semibold text-text-primary"
                      : "text-text-body transition-opacity hover:opacity-80"
                  }
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
