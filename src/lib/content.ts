import { formatPrice, locationLabel, site } from "@/lib/site";

export const faqs = [
  {
    question: "How much does headlight restoration cost in Belgium?",
    answer: `Single lenses start from ${formatPrice(site.pricing.single.from)}; pairs from ${formatPrice(site.pricing.pair.from)}. Mail-in restoration across Europe starts from ${formatPrice(site.pricing.mailIn.from)} plus shipping. Final price depends on damage level; we confirm before work begins.`,
  },
  {
    question: "Is headlight restoration worth it vs. buying new lights?",
    answer:
      "New OEM headlight assemblies often cost €300–€800 or more per side. Professional restoration delivers comparable clarity for a fraction of the price, especially when housings and electronics are still in good condition.",
  },
  {
    question:
      "Will restored headlights pass technical inspection (keuring / contrôle technique)?",
    answer:
      "Restored headlights can pass inspection when lenses meet visibility standards. We assess condition before starting and will tell you honestly if replacement is the safer option.",
  },
  {
    question: "How long does restoration take?",
    answer: `At our garage, professional restoration takes ${site.turnaround.local.toLowerCase()}, often a bit less for one lens. Both headlights usually take around two hours. Mail-in orders typically take ${site.turnaround.mailIn.toLowerCase()}.`,
  },
  {
    question: "Can I drive home right after restoration?",
    answer:
      "Yes. We UV-cure every lens in-shop before handover. The coating is fully hardened when you leave, so you do not need a careful drive home, a dust-free garage overnight, or days before washing. Rain and road dust are not a problem.",
  },
  {
    question: "Do you serve customers outside Belgium?",
    answer: `Yes. Visit our garage in ${locationLabel()}, or choose mail-in headlight restoration anywhere in Europe. We guide you through safe packing and return shipping.`,
  },
  {
    question: "How long do results last?",
    answer: `With professional sealing and UV protection, results typically last years, not months like DIY kits. Every restoration includes our ${site.warranty.toLowerCase()}.`,
  },
] as const;
