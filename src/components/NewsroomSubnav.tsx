import Link from "next/link";
import { newsPagePath } from "@/lib/news";
import { processPagePath } from "@/lib/process";

const links = [
  { href: newsPagePath, label: "News" },
  { href: "/about", label: "About SHINES" },
  { href: processPagePath, label: "Our process" },
] as const;

type NewsroomSubnavProps = {
  active?: "news" | "about" | "process";
};

export function NewsroomSubnav({ active = "news" }: NewsroomSubnavProps) {
  return (
    <nav
      aria-label="News section"
      className="border-b border-text-primary/10 bg-surface"
    >
      <div className="mx-auto flex max-w-[980px] flex-wrap items-center justify-between gap-4 px-section-even py-3">
        <ul className="flex flex-wrap items-center gap-5 text-sm">
          {links.map((link) => {
            const isNews = link.href === newsPagePath;
            const isActive =
              (active === "news" && isNews) ||
              (active === "about" && link.href === "/about") ||
              (active === "process" && link.href === processPagePath);

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
