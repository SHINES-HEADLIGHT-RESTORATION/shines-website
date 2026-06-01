import { AppleLinkListPage } from "@/components/AppleLinkListPage";
import { belgiumProvinces, cityLocationPath } from "@/lib/belgium-locations";

export const locationsPagePath = "/locations" as const;

export function LocationsIndexSection() {
  const sections = belgiumProvinces.map((province) => ({
    title: province.nameNl,
    items: province.cities.map((city) => ({
      label: city.name,
      href: cityLocationPath(city.slug),
    })),
  }));

  return (
    <AppleLinkListPage
      title="Service locations in Belgium"
      description="Professional headlight restoration across Belgium. Select your city to learn more and book online. Mail-in service is available across Europe."
      sections={sections}
    />
  );
}
