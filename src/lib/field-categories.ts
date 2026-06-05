export type FieldCategorySlug =
  | "autoreparatie-en-onderhoud"
  | "autoschadebedrijf"
  | "autoschoonmaakdienst"
  | "autorestauratie";

export type FieldCategory = {
  slug: FieldCategorySlug;
  /** Google Business Profile category label (NL) */
  googleCategoryNl: string;
};

export const fieldCategories: FieldCategory[] = [
  {
    slug: "autoreparatie-en-onderhoud",
    googleCategoryNl: "Autoreparatie en -onderhoud",
  },
  {
    slug: "autoschadebedrijf",
    googleCategoryNl: "Autoschadebedrijf",
  },
  {
    slug: "autoschoonmaakdienst",
    googleCategoryNl: "Autoschoonmaakdienst",
  },
  {
    slug: "autorestauratie",
    googleCategoryNl: "Autorestauratie",
  },
];

export const fieldCategoriesHubPath = "/vakgebieden" as const;

export function fieldCategoryPath(slug: FieldCategorySlug | string) {
  return `${fieldCategoriesHubPath}/${slug}`;
}

export function getFieldCategoryBySlug(
  slug: string,
): FieldCategory | undefined {
  return fieldCategories.find((category) => category.slug === slug);
}

export const allFieldCategorySlugs = fieldCategories.map(({ slug }) => slug);
