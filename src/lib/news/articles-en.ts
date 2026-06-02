import { formatPrice, locationLabel, site } from "@/lib/site";
import type { NewsArticle } from "@/lib/news/types";

export const newsArticles: NewsArticle[] =
[
  {
    slug: "why-headlights-turn-yellow-and-hazy",
    publishedAt: "2026-05-20",
    category: "GUIDE",
    title: "Why headlights turn yellow and hazy (and what actually fixes it)",
    dek: "Factory UV protection fails over time. Polishing alone cannot replace it. Here is what drivers in Belgium and across Europe should know.",
    image: {
      src: "/news/why-headlights-turn-yellow-and-hazy.png",
      alt: "Before and after headlight restoration showing yellow hazy lens restored to clear",
    },
    thumbnailClass: "from-[#1a3a5c] to-[#0076df]",
    featured: true,
    tags: [
      "yellow headlights",
      "headlight restoration",
      "UV coating",
      "polycarbonate lenses",
    ],
    blocks: [
      {
        type: "paragraph",
        text: "If your headlights looked clear when the car was new but now glow yellow or scatter light at night, the problem is usually not dirt. Modern headlights are made from polycarbonate plastic with a factory UV hard coat. Sun, road grit, and years of heat cycling break that coat down. Once it fails, the plastic itself oxidizes.",
      },
      {
        type: "paragraph",
        text: "A quick buff or DIY kit can make lenses look better for a few weeks. It removes surface haze but leaves the underlying plastic unprotected. Without a new UV hard coat, yellowing returns fast, especially on cars parked outside in Belgian and European climates.",
      },
      {
        type: "heading",
        text: "What professional restoration changes",
      },
      {
        type: "list",
        items: [
          "The failed factory UV layer is stripped completely, not polished over.",
          "The lens is refined to a smooth, coating-ready finish.",
          "An OEM-grade UV hard coat replaces the protection the lens lost.",
          "The coating is hardened in-shop before handover, so you can drive home immediately.",
        ],
      },
      {
        type: "paragraph",
        text: `At ${site.name}, we follow that full sequence on every restoration. Fixed pricing starts from ${formatPrice(site.pricing.pair.from)} for both headlights. Book online or read our process overview to see what happens when you visit our garage in ${locationLabel()}.`,
      },
    ],
  },
  {
    slug: "professional-headlight-restoration-vs-diy-kits",
    publishedAt: "2026-05-18",
    category: "GUIDE",
    title: "Professional headlight restoration vs DIY kits: what lasts",
    dek: "Kits are cheap upfront. Professional work costs more once. Here is how to choose based on durability, safety, and total cost.",
    image: {
      src: "/news/professional-headlight-restoration-vs-diy-kits.png",
      alt: "Professional headlight restoration vs DIY kits comparison showing cloudy DIY result next to clear professional result",
    },
    thumbnailClass: "from-[#2c2c2e] to-[#6e6e73]",
    tags: ["DIY headlight restoration", "headlight kits", "UV hard coat"],
    blocks: [
      {
        type: "paragraph",
        text: "DIY headlight kits promise showroom clarity in an afternoon. For some drivers that is enough. For anyone who needs reliable night visibility for years, the gap between a driveway polish and professional restoration is large.",
      },
      {
        type: "heading",
        text: "Where DIY kits fall short",
      },
      {
        type: "list",
        items: [
          "Most kits polish the surface without fully removing the failed UV coat underneath.",
          "Sealants and waxes are not the same as a factory-style UV hard coat.",
          "Results often fade within weeks or months, especially with daily sun exposure.",
          "Uneven sanding can leave wavy lenses that scatter light worse than before.",
        ],
      },
      {
        type: "heading",
        text: "What you get with professional restoration",
      },
      {
        type: "list",
        items: [
          "Controlled workspace and purpose-built tooling for consistent results.",
          "Full strip, refine, coat, and in-shop cure workflow.",
          "Before and after inspection at handover.",
          `${site.warranty} on clarity when the lens is suitable for restoration.`,
        ],
      },
      {
        type: "paragraph",
        text: "If you are comparing options, see our pricing page for fixed starting prices and book a slot when you are ready. Severely cracked or deeply pitted lenses may need replacement instead; we assess honestly before work begins.",
      },
    ],
  },
  {
    slug: "shines-launches-headlight-restoration-belgium",
    publishedAt: "2026-05-15",
    category: "PRESS RELEASE",
    title: `${site.name} launches professional headlight restoration in Belgium`,
    dek: `New service offers UV-cured OEM-grade results from ${formatPrice(site.pricing.pair.from)} per pair, with local garage visits, mobile options, and mail-in service across Europe.`,
    image: {
      src: "/news/shines-launches-headlight-restoration-belgium.png",
      alt: "SHINES professional headlight restoration launch in Belgium with before and after headlights in workshop",
    },
    thumbnailClass: "from-[#0b0b0e] to-[#0076df]",
    tags: ["SHINES", "Belgium", "headlight restoration", "AutoRepair"],
    blocks: [
      {
        type: "paragraph",
        text: `${site.name} today announced professional headlight restoration for drivers in ${locationLabel()} and across Europe. The service targets foggy, yellowed, and UV-damaged polycarbonate lenses using a strip, recoat, and in-shop cure workflow.`,
      },
      {
        type: "paragraph",
        text: `Typical turnaround is ${site.turnaround.local.toLowerCase()} at the garage. Mail-in customers across Europe can ship lenses for restoration with return shipping quoted separately. Every job includes ${site.warranty.toLowerCase()}.`,
      },
      {
        type: "heading",
        text: "How to book",
      },
      {
        type: "paragraph",
        text: `Customers book online at ${site.url.replace("https://", "")}/book with fixed starting prices shown before payment. Questions can be sent to ${site.email}.`,
      },
    ],
  },
  {
    slug: "foggy-headlights-vehicle-inspection-belgium",
    publishedAt: "2026-05-12",
    category: "LOCAL",
    title: "Can foggy headlights fail vehicle inspection in Belgium?",
    dek: "Clouded lenses reduce light output and can create compliance issues. Here is what Belgian drivers should check before an inspection or long night drive.",
    image: {
      src: "/news/foggy-headlights-vehicle-inspection-belgium.png",
      alt: "Foggy yellowed headlight on a car in a Belgian vehicle inspection workshop",
    },
    thumbnailClass: "from-[#003d6b] to-[#5ac8fa]",
    tags: [
      "Belgium",
      "vehicle inspection",
      "headlight clarity",
      "road safety",
    ],
    blocks: [
      {
        type: "paragraph",
        text: "Belgian drivers often notice headlight problems first at night: dim beams, yellow glow, or light scattered across the lens. Beyond comfort, reduced output affects how early you see pedestrians, cyclists, and road markings.",
      },
      {
        type: "paragraph",
        text: "Inspection rules focus on whether lighting works as intended. Heavily hazed or misaligned headlights can draw attention during checks because they no longer deliver predictable beam patterns. Restoration is often cheaper than replacement when the lens housing is still structurally sound.",
      },
      {
        type: "heading",
        text: "When restoration makes sense",
      },
      {
        type: "list",
        items: [
          "Yellow or cloudy lenses with no major cracks or deep gouges.",
          "Moisture inside the housing should be resolved first; we can advise during assessment.",
          "You want factory-clear output without paying for full headlight units.",
        ],
      },
      {
        type: "paragraph",
        text: `${site.name} serves drivers across Belgium with garage, mobile, and mail-in options. See our locations index for city-specific pages, or book directly if you already know your preferred service method.`,
      },
    ],
  },
  {
    slug: "mail-in-headlight-restoration-europe",
    publishedAt: "2026-05-08",
    category: "UPDATE",
    title: "Mail-in headlight restoration now available across Europe",
    dek: `Ship your headlight units to ${site.name} for the same professional UV-cured finish as our local garage service.`,
    image: {
      src: "/news/mail-in-headlight-restoration-europe.png",
      alt: "SHINES mail-in headlight restoration with packed shipping box, restored headlights, and order form",
    },
    thumbnailClass: "from-[#1c1c1e] to-[#48484a]",
    tags: ["mail-in", "Europe", "headlight restoration"],
    blocks: [
      {
        type: "paragraph",
        text: `Drivers outside ${locationLabel()} can now use ${site.name} mail-in service. Remove the headlight units, pack them securely, and ship to our workshop. We restore, UV-cure, and return them ready to refit.`,
      },
      {
        type: "paragraph",
        text: `Mail-in pricing starts from ${formatPrice(site.pricing.mailIn.from)} per pair. Typical turnaround is ${site.turnaround.mailIn.toLowerCase()}. Return shipping is quoted based on your country before you confirm.`,
      },
      {
        type: "heading",
        text: "Before you ship",
      },
      {
        type: "list",
        items: [
          "Book online and select mail-in so we can send packing guidance.",
          "Photograph lenses beforehand for your records.",
          "Note any cracks, moisture, or broken mounting points in the booking notes.",
        ],
      },
    ],
  },
  {
    slug: "drive-away-fully-cured-why-in-shop-hardening-matters",
    publishedAt: "2026-05-05",
    category: "QUICK TIP",
    title: "Drive away fully cured: why in-shop hardening matters",
    dek: "Some coatings stay soft for days after application. Ours is hardened before handover so rain, dust, and the trip home cannot ruin the finish.",
    image: {
      src: "/news/drive-away-fully-cured-why-in-shop-hardening-matters.png",
      alt: "UV-cured headlight restoration in a professional workshop with curing lamp",
    },
    thumbnailClass: "from-[#0076df] to-[#64d2ff]",
    tags: ["UV cure", "headlight coating", "drive home"],
    blocks: [
      {
        type: "paragraph",
        text: "Not every headlight service fully cures the new UV coat before you leave. Air-dry or uncured sealants can stay tacky for hours or days. That means dust, fingerprints, or even a light rain on the drive home can mark the lens.",
      },
      {
        type: "paragraph",
        text: `${site.name} hardens every restoration on-site before handover. You can drive home immediately, wash the car when you normally would, and skip the delicate overnight garage routine some shops still ask for.`,
      },
      {
        type: "paragraph",
        text: "It is one of the simplest questions to ask any provider: is the coating fully cured before I leave? If the answer is no, factor in the risk of redo work and lost time.",
      },
    ],
  },
];
