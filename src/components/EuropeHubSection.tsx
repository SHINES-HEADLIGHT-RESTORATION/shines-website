import Link from "next/link";
import { AppleLinkListPage } from "@/components/AppleLinkListPage";
import { europeCountries, europeCountryPath, europeHubPath } from "@/lib/europe-countries";
import { getRequestMessages } from "@/lib/i18n/server";
import { locationsPagePath } from "@/lib/belgium-locations";

export async function EuropeHubSection() {
  const { messages: m } = await getRequestMessages();

  const sections = [
    {
      title: "Europe",
      items: europeCountries.map((country) => ({
        label: country.name,
        href: europeCountryPath(country.slug),
      })),
    },
  ];

  return (
    <div>
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-2 px-section-even pt-12 text-xs text-text-body"
      >
        <Link href="/" className="hover:opacity-80">
          SHINES
        </Link>
        <span aria-hidden="true">›</span>
        <span>{m.europe.hubTitle}</span>
      </nav>
      <AppleLinkListPage
        title={m.europe.hubTitle}
        description={m.europe.hubDescription}
        sections={sections}
      />
      <p className="px-section-even pb-16 text-sm text-text-body">
        <Link href={locationsPagePath} className="text-action-primary underline underline-offset-4">
          {m.locations.belgiumTitle}
        </Link>
        {" · "}
        <Link href={europeHubPath} className="text-action-primary underline underline-offset-4">
          {m.locations.europeLink}
        </Link>
      </p>
    </div>
  );
}
