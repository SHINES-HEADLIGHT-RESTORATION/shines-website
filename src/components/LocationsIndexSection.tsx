import Link from "next/link";
import { AppleLinkListPage } from "@/components/AppleLinkListPage";
import { belgiumProvinces, cityLocationPath, locationsPagePath } from "@/lib/belgium-locations";
import { europeHubPath } from "@/lib/europe-countries";
import { getRequestMessages } from "@/lib/i18n/server";

export { locationsPagePath };

export async function LocationsIndexSection() {
  const { messages: m } = await getRequestMessages();

  const sections = belgiumProvinces.map((province) => ({
    title: province.nameNl,
    items: province.cities.map((city) => ({
      label: city.name,
      href: cityLocationPath(city.slug),
    })),
  }));

  return (
    <div>
      <AppleLinkListPage
        title={m.locations.belgiumTitle}
        description={m.locations.belgiumDescription}
        sections={sections}
      />
      <p className="px-section-even pb-16 text-sm text-text-body">
        <Link
          href={europeHubPath}
          className="font-medium text-action-primary underline underline-offset-4"
        >
          {m.locations.europeLink}
        </Link>
      </p>
    </div>
  );
}
