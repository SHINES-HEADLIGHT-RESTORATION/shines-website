import { site } from "@/lib/site";

type OpeningHoursSpec = {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string[];
  opens: string;
  closes: string;
};

const DAY_GROUPS: Record<string, string[]> = {
  "Monday – Friday": [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ],
  Saturday: ["Saturday"],
  Sunday: ["Sunday"],
};

function parseHoursRange(hours: string): { opens: string; closes: string } | null {
  const match = hours.match(/^(\d{1,2}:\d{2})\s*[–-]\s*(\d{1,2}:\d{2})$/);
  if (!match) return null;
  return { opens: match[1], closes: match[2] };
}

/** Maps site.contact.hours rows to schema.org OpeningHoursSpecification. */
export function buildOpeningHoursSpecification(): OpeningHoursSpec[] {
  return site.contact.hours.flatMap((row) => {
    const days = DAY_GROUPS[row.days];
    const range = parseHoursRange(row.hours);
    if (!days || !range) return [];
    return [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: days,
        opens: range.opens,
        closes: range.closes,
      },
    ];
  });
}
