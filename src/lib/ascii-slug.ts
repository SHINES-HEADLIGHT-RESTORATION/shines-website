/** Strip diacritics for URL path segments (Liège → liege). */
export function toAsciiSlug(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/'/g, "");
}
