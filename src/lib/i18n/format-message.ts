/** Replace `{name}` placeholders in localized templates (client-safe). */
export function formatMessage(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = vars[key];
    return value !== undefined ? String(value) : `{${key}}`;
  });
}
