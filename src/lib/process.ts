import { site } from "@/lib/site";

export const processPagePath = "/headlight-restoration-process" as const;

export const processSummary =
  `SHINES restores headlights with a professional strip, recoat, and in-shop UV cure workflow. Each headlight or tail light typically takes about 30–60 minutes; both headlights usually about 45–90 minutes depending on size and condition. When you leave, the coating is already rock-hard. No delicate drive home, no keeping the car dust-free overnight. Results are UV-protected and backed by our ${site.warranty.toLowerCase()}.`;

export const processInstantCureBenefit =
  "Many shops polish and seal, but skip full in-shop curing. We harden every lens on-site before handover, so you can drive straight home, through rain, or to the car wash without worrying about dust, fingerprints, or a soft finish ruining the result.";

export const processPillars = [
  {
    id: "prep",
    title: "Precision prep & sanding",
    description:
      "We strip the failed factory UV layer completely, not just polish over it, using controlled professional sanding on purpose-built tooling.",
  },
  {
    id: "coat",
    title: "OEM-grade UV hard coat",
    description:
      "A certified OEM-style UV hard coat replaces the protection polycarbonate needs to stay clear. Not wax, not sealant, not a quick spray.",
  },
  {
    id: "cure",
    title: "UV cure & inspection",
    description:
      "The coating is fully hardened in-shop before you drive away. No soft finish, no overnight cure, no keeping the car sealed from dust.",
  },
] as const;

/** Customer-facing overview only. Full SOP stays internal. */
export const processOverview = [
  {
    id: "assess",
    title: "Assess & prepare",
    description:
      "We inspect both lenses, mask surrounding paint, and confirm restoration is the right option before work starts.",
  },
  {
    id: "restore",
    title: "Restore the lens surface",
    description:
      "Failed UV protection is removed and the lens is refined to a smooth, coating-ready finish using professional equipment in a controlled workspace.",
  },
  {
    id: "protect",
    title: "Apply factory-style protection",
    description:
      "An OEM-grade UV hard coat restores the protective layer your headlights lost from the factory.",
  },
  {
    id: "handover",
    title: "Cure, inspect, and hand over",
    description:
      "The coating is hardened on-site before you leave. You see the before and after, and drive away without a delicate trip home.",
  },
] as const;

export const processProof = [
  {
    id: "instant-cure",
    title: "Fully cured before you leave",
    description:
      "Unlike uncured sealants or air-dry coatings, our in-shop cure hardens the finish before handover. You do not need a careful drive home, a dust-free garage overnight, or days before washing the car.",
    source: "SHINES service standard",
    url: null,
  },
  {
    id: "ameca",
    title: "AMECA-tested UV performance",
    description:
      "We use a professional UV hard coat tested under automotive UV exposure protocols. That is the category of protection factory lenses are designed to carry.",
    source: "Automotive equipment compliance standards",
    url: null,
  },
  {
    id: "workflow",
    title: "Industry-standard restoration sequence",
    description:
      "Professional restoration follows one core sequence: strip the failed coat, refine the surface, apply a UV hard coat, and cure. Not a one-step polish.",
    source: "Professional headlight restoration industry",
    url: null,
  },
  {
    id: "specialists",
    title: "Headlight restoration specialists",
    description:
      "We do one service, professionally. Every lens is assessed, restored, and inspected by trained technicians who work to the same standard every time.",
    source: "SHINES",
    url: null,
  },
  {
    id: "turnaround",
    title: "About 30–60 minutes per lens",
    description:
      "Restoration plus full in-shop cure typically takes about 30–60 minutes per headlight or tail light, or about 45–90 minutes for both headlights depending on size and oxidation severity. The coating is fully hardened before you drive away.",
    source: "SHINES service standard",
    url: null,
  },
] as const;

export const processComparison = [
  {
    aspect: "What gets removed",
    diy: "Surface haze only. Old UV layer often stays underneath.",
    professional: "Failed factory UV coat stripped completely before recoating",
  },
  {
    aspect: "Finish protection",
    diy: "Wax, sealant, or weak spray. Yellows again in months.",
    professional: "UV-cured OEM-grade hard coat that protects for years",
  },
  {
    aspect: "Equipment & workspace",
    diy: "Hand pad, drill attachment, or driveway setup",
    professional: "Professional tooling in a controlled indoor workspace",
  },
  {
    aspect: "When you drive away",
    diy: "Soft or tacky finish. Must avoid dust, rain, and washing for days.",
    professional: "Fully hardened on-site. Drive home immediately.",
  },
  {
    aspect: "Inspection",
    diy: "No structured before and after check",
    professional: "Before and after inspection so you see the difference",
  },
  {
    aspect: "Durability",
    diy: "Weeks to months before haze returns",
    professional: `Years of clarity with proper UV protection, backed by ${site.warranty.toLowerCase()}`,
  },
] as const;

export const processStandards = [
  "Indoor, controlled workspace to prevent contamination",
  "Before and after inspection on every restoration",
  "Assessment before work begins: we tell you honestly if replacement is safer",
  "Fixed pricing online with no quote runaround",
] as const;
