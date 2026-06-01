import { formatPrice, formatAddressLines, locationLabel, site } from "@/lib/site";

export const mailInSteps = [
  {
    title: "Book online",
    description:
      "Choose how many headlights, their size and condition, and select ship your headlights. Pay nothing yet; we confirm by email.",
  },
  {
    title: "Pack and ship yourself",
    description:
      "Removing, packing, and shipping your headlights is entirely your responsibility. Ship only the headlights in a sturdy, well-padded box with tracked and insured delivery to our workshop in Belgium.",
  },
  {
    title: "Documented intake",
    description:
      "Before we open your parcel, we record the unboxing on video. We then photograph each headlight unit before any restoration work. This protects both you and us if lenses arrived cracked or damaged in transit. Please note: we are not responsible for damage that occurred during shipping or from poor packaging.",
  },
  {
    title: "We restore, UV-cure, and return",
    description: `Typical workshop time is ${site.turnaround.mailIn.toLowerCase()}. We restore, fully cure the UV coat, inspect with photos, then ship back ready to refit. Return shipping is quoted before dispatch.`,
  },
] as const;

export const mailInNotes = [
  `Restoration from ${formatPrice(site.pricing.mailIn.from)} per pair (excl. shipping both ways).`,
  "Return shipping is quoted based on your country and box size before we dispatch.",
  "Only ship headlight units, not the entire vehicle.",
  "Use tracked and insured shipping. If we never receive your parcel, nothing is sent back.",
  "How you pack your headlights is your responsibility. Keep your shipping receipt.",
  "Moisture inside the housing or cracked lenses? Note it in booking; we assess before work starts.",
  site.contact.mailInNote,
] as const;

export const visitDropOffNote = `Drop off at our garage in ${locationLabel()}. ${site.turnaround.local}. ${site.contact.parkingNote}`;

export const mailInShipToNote =
  "Write your booking reference on the outside of the box. Use tracked and insured shipping — we don't start work until your parcel arrives. If we never receive it, nothing is sent back.";

export const mailInBookingSteps = [
  "Book online — we save your booking and show your reference and ship-to address.",
  "Pack your headlights securely and ship at your local carrier (cheapest for you).",
  "Add your tracking number on your booking page (optional but recommended).",
  "We email when your parcel arrives. When restoration is done, pay return shipping once on your booking page — then we ship back.",
] as const;

export function workshopShipToLines(): string[] {
  const lines = formatAddressLines();
  if (lines.length <= 1 && site.workshop.address) {
    return site.workshop.address.split(",").map((part) => part.trim());
  }
  return lines;
}
