import type { FieldCategorySlug } from "@/lib/field-categories";
import type { FaqItem } from "@/lib/i18n/messages/types";
import { formatPrice, locationLabel, site } from "@/lib/site";

export type FieldCategoryPageContent = {
  name: string;
  h1: string;
  metaDescription: string;
  summary: string;
  pain: { title: string; paragraphs: string[] };
  solution: { title: string; paragraphs: string[] };
  gain: { title: string; paragraphs: string[] };
  services: { title: string; items: string[] };
  faq: { title: string; items: FaqItem[] };
  geo: { title: string; body: string };
};

export type FieldCategoryMessages = {
  hubTitle: string;
  hubBreadcrumb: string;
  hubDescription: string;
  hubSectionTitle: string;
  viewPricing: string;
  bookCta: string;
  otherCategories: string;
  categories: Record<FieldCategorySlug, FieldCategoryPageContent>;
};

export function buildFieldCategoryMessages(): FieldCategoryMessages {
  const loc = locationLabel();
  const pairFrom = formatPrice(site.pricing.pair.from);

  return {
    hubTitle: "What SHINES does: specialist fields",
    hubBreadcrumb: "Specialist fields",
    hubDescription: `SHINES in ${loc} is a specialist workshop for headlight and optical restoration. These pages explain our work across the service fields that match our expertise: maintenance and inspection readiness, cosmetic smart repair, professional detailing of lenses, and full optical restoration.`,
    hubSectionTitle: "Browse by field",
    viewPricing: "View pricing",
    bookCta: `Book from ${pairFrom}`,
    otherCategories: "Other fields",
    categories: {
      "autoreparatie-en-onderhoud": {
        name: "Vehicle maintenance & repair",
        h1: "Headlight maintenance and inspection-ready repair",
        metaDescription: `Auto rejected at technical inspection for foggy headlights? SHINES in ${loc} restores light output and lens clarity for a safe beam pattern, cheaper than new units. West Flanders & Europe.`,
        summary: `Dull or yellowed headlights reduce visibility and can fail technical inspection (keuring). SHINES restores optical clarity and correct light distribution so your vehicle is safe on the road again, without replacing entire headlight assemblies when the housing is still sound.`,
        pain: {
          title: "The problem: failed inspection and unsafe light",
          paragraphs: [
            "Foggy, oxidised, or scratched lenses scatter light instead of projecting a clear beam. That means less visibility at night and a common reason for inspection rejection.",
            "Replacing both headlight units can cost hundreds of euros per side. When seals, mounts, and electronics are still fine, replacement is often unnecessary expense.",
          ],
        },
        solution: {
          title: "Our approach: professional optical repair",
          paragraphs: [
            "We assess each lens before work begins. Industrial sanding and polishing remove the failed UV layer, then we apply an OEM-grade UV hard coat cured in-shop, not a temporary wipe-on sealant.",
            "We restore brightness and beam quality to meet practical inspection standards. If a lens is too far gone for safe restoration, we tell you honestly before you pay.",
          ],
        },
        gain: {
          title: "What you gain",
          paragraphs: [
            `Save significantly compared with new OEM headlights, restoration from ${pairFrom} for a pair when condition allows.`,
            "Drive with restored visibility, pass inspection with confidence, and protect resale value with lenses that look and perform like new.",
          ],
        },
        services: {
          title: "Related services",
          items: [
            "Headlights ready for technical inspection (keuring)",
            "Yellow or orange headlight restoration",
            "Turbid / hazy lens correction",
            "Professional polish and UV coating",
            "Failed DIY repair correction",
          ],
        },
        faq: {
          title: "Frequently asked questions",
          items: [
            {
              question: "Can restored headlights pass technical inspection?",
              answer:
                "Yes, when light output and lens clarity meet legal visibility standards. We assess condition first and advise if replacement is the safer option.",
            },
            {
              question:
                "Is restoration cheaper than buying new headlights?",
              answer:
                "In most cases, yes. New OEM assemblies often cost €300–€800+ per side. Restoration restores clarity and UV protection for a fraction of that when housings are still sound.",
            },
            {
              question: "How long does garage service take?",
              answer: `${site.turnaround.local}. UV coating is cured before you leave, no waiting days for sealants to dry.`,
            },
          ],
        },
        geo: {
          title: "Service area",
          body: `Workshop in ${loc}, West Flanders. Mobile service across the region and mail-in restoration across Belgium and Europe.`,
        },
      },
      autoschadebedrijf: {
        name: "Body & cosmetic damage repair",
        h1: "Cosmetic headlight and plastic smart repair",
        metaDescription: `Cosmetic smart repair for scratched, faded, and damaged headlight lenses in ${loc}. Avoid full replacement, professional restoration of optical plastic parts. West Flanders.`,
        summary: `Not every headlight problem needs a new unit. SHINES specialises in smart repair for optical damage: scratches, UV fading, and surface defects on headlight and rear-light lenses, restoring the original appearance without bodyshop replacement costs.`,
        pain: {
          title: "The problem: visible damage and replacement quotes",
          paragraphs: [
            "Parking scrapes, stone chips, and UV degradation make lenses look aged and can worsen light scatter. Garages often quote full headlight replacement.",
            "Insurance and out-of-pocket costs add up fast when only the outer lens layer is affected.",
          ],
        },
        solution: {
          title: "Smart repair for optical parts",
          paragraphs: [
            "We focus on restoring the transparent layer: progressive sanding removes damage, machine polishing restores clarity, and UV coating seals the result for years, not weeks.",
            "This is cosmetic and optical repair on existing units, the same philosophy as smart repair for bumpers, applied to lighting components.",
          ],
        },
        gain: {
          title: "What you gain",
          paragraphs: [
            "Avoid unnecessary part replacement and keep original OEM fitment and electronics.",
            "Uniform, cared-for appearance front and rear, important for resale and daily pride in your vehicle.",
          ],
        },
        services: {
          title: "Related services",
          items: [
            "Cosmetic scratch and fade repair on headlight lenses",
            "Rear light polish and UV protection",
            "Correction after failed DIY polishing attempts",
            "Mail-in restoration for rare or classic units",
          ],
        },
        faq: {
          title: "Frequently asked questions",
          items: [
            {
              question: "Do you repair cracked or broken housings?",
              answer:
                "We restore optical clarity on intact housings. Structural cracks, broken mounts, or moisture ingress may require replacement, we assess honestly before starting.",
            },
            {
              question: "Is this the same as a traditional body shop?",
              answer:
                "We specialise in optical restoration of lighting units, not panel beating or paint. For lens-specific smart repair, we go deeper than a general body shop polish.",
            },
            {
              question: "Can you fix damage after a DIY kit made it worse?",
              answer:
                "Yes, misused grit or compound is a common reason people come to us. We rebuild the surface properly before applying professional UV protection.",
            },
          ],
        },
        geo: {
          title: "Service area",
          body: `Based in ${loc}. Serving drivers in Ingelmunster, Izegem, Roeselare, Kortrijk, Waregem, Tielt, and wider West Flanders. Mail-in available across Europe.`,
        },
      },
      autoschoonmaakdienst: {
        name: "Auto detailing service",
        h1: "Professional headlight detailing and lens polishing",
        metaDescription: `High-end detailing for headlight and tail light lenses in ${loc}. Machine polish, clarity restoration, and UV seal, showroom finish without temporary kit gloss. West Flanders.`,
        summary: `Headlight detailing is more than a quick buff. SHINES uses professional compounds, machine polishing, and durable UV sealing to restore deep transparency, the same care level as showroom detailing, focused on optical components that define how your car looks and how well you see at night.`,
        pain: {
          title: "The problem: dull finish and short-lived DIY gloss",
          paragraphs: [
            "Budget kits and hand polishing can add temporary shine but leave micro-scratches or fail within weeks in sun and rain.",
            "Dull lenses make even a clean car look tired and reduce light output when you need it most.",
          ],
        },
        solution: {
          title: "Detailing-grade process for lenses",
          paragraphs: [
            "We treat headlight and rear-light lenses with the same discipline as premium detailing: correct grit sequence, machine polish, and a heat-resistant UV hard coat.",
            "Polish alone is not enough, we seal the surface so transparency lasts, matching how professional detailers protect paint, applied to optical plastic.",
          ],
        },
        gain: {
          title: "What you gain",
          paragraphs: [
            "Showroom-level clarity and depth, ideal before sale, after a purchase, or when you want your car to look its best.",
            "Lasting results with UV protection, not a shine that washes away in the next rain.",
          ],
        },
        services: {
          title: "Related services",
          items: [
            "Machine headlight polishing",
            "Rear light clarity and colour restoration",
            "UV coating after polish",
            "Pre-sale optical refresh",
            "Mobile detailing visit (headlights on location)",
          ],
        },
        faq: {
          title: "Frequently asked questions",
          items: [
            {
              question:
                "What is the difference between detailing and a DIY kit?",
              answer:
                "DIY kits use generic abrasives and weak sealants. We match process to lens condition and finish with a professional UV hard coat cured in-shop.",
            },
            {
              question: "Do you detail the whole car?",
              answer:
                "Our specialty is optical components, headlights and rear lights. That is where our equipment and coatings are optimised.",
            },
            {
              question: "How long does the finish last?",
              answer: `With proper UV protection, results typically last years. Every restoration includes our ${site.warranty.toLowerCase()}.`,
            },
          ],
        },
        geo: {
          title: "Service area",
          body: `Detailing workshop in ${loc}. Mobile headlight service in West Flanders where available. Mail-in units welcome from across Belgium and Europe.`,
        },
      },
      autorestauratie: {
        name: "Automotive restoration",
        h1: "Technical restoration of aged and oxidised lighting units",
        metaDescription: `Full optical restoration for heavily yellowed, oxidised, and vintage headlight units in ${loc}. Industrial process, UV rebuild, mail-in for classics. Belgium & Europe.`,
        summary: `Autorestauratie at SHINES means bringing heavily degraded lighting units back to their original optical state, whether on a daily driver, a classic, or a rare model where new parts are unavailable. We rebuild clarity from severe UV damage, not just surface shine.`,
        pain: {
          title: "The problem: severe oxidation and irreplaceable units",
          paragraphs: [
            "Fully yellow or orange lenses have lost their factory UV barrier. Light output can drop dramatically; classic and discontinued units may be impossible to source new.",
            "Surface-only polishing cannot fix deep degradation, the damaged layer must be properly removed and rebuilt.",
          ],
        },
        solution: {
          title: "Full restoration, not a quick polish",
          paragraphs: [
            "We strip failed UV layers with a controlled industrial sand-and-polish sequence, then rebuild protection with a durable UV hard coat.",
            "Mail-in service lets owners across Europe send removable units, ideal for classics, exclusives, and projects where the original lens must be preserved.",
          ],
        },
        gain: {
          title: "What you gain",
          paragraphs: [
            "Preserve original units and authenticity on classics and limited models.",
            "Restore near-factory light output and appearance, protecting safety and vehicle value.",
          ],
        },
        services: {
          title: "Related services",
          items: [
            "Heavy yellow / orange lens restoration",
            "Mail-in headlight restoration (Europe)",
            "Classic and vintage lighting units",
            "Front and rear light combined restoration",
            "Failed DIY deep correction",
          ],
        },
        faq: {
          title: "Frequently asked questions",
          items: [
            {
              question: "Can you restore very old or classic headlights?",
              answer:
                "Yes, mail-in is popular for classics where units are removed for restoration. We assess photos or units before quoting.",
            },
            {
              question: "How does mail-in restoration work?",
              answer: `Pack and ship to our ${loc} workshop. Typical turnaround: ${site.turnaround.mailIn.toLowerCase()}. Return shipping is quoted to your address.`,
            },
            {
              question: "When is restoration no longer possible?",
              answer:
                "Deep cracks, internal moisture damage, or delamination may require replacement. We inspect first and recommend the safe option.",
            },
          ],
        },
        geo: {
          title: "Service area",
          body: `Restoration workshop in ${loc}, Belgium. Mail-in service across Europe. Local garage visits by appointment in West Flanders.`,
        },
      },
    },
  };
}
