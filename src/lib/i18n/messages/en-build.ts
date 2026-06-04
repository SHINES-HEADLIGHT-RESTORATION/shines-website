import {
  conditionSeverities,
  headlightQuantities,
  headlightSizes,
  serviceMethods,
} from "@/lib/booking";
import { isPublicBookingEnabled } from "@/lib/booking-access";
import {
  footerFinePrint,
  footerLegalLinks,
  getFooterColumns,
  getFooterContactLine,
} from "@/lib/footer";
import type { SiteMessages } from "@/lib/i18n/messages/types";
import {
  mailInBookingSteps,
  mailInNotes,
  mailInShipToNote,
  mailInSteps,
  visitDropOffNote,
} from "@/lib/mail-in-flow";
import { mailInStatusLabels } from "@/lib/mail-in-status";
import { newsArticles } from "@/lib/news/articles-en";
import type { NewsCategory } from "@/lib/news/types";

const newsCategoryLabels: Record<NewsCategory, string> = {
  UPDATE: "Update",
  GUIDE: "Guide",
  "PRESS RELEASE": "Press release",
  LOCAL: "Local",
  "QUICK TIP": "Quick tip",
};
import {
  pricingComparisonIntro,
  pricingModifiers,
  pricingSummary,
  pricingTiers,
  pricingValueComparison,
} from "@/lib/pricing";
import {
  processComparison,
  processInstantCureBenefit,
  processOverview,
  processPagePath,
  processPillars,
  processProof,
  processStandards,
  processSummary,
} from "@/lib/process";
import { regionGroups } from "@/lib/regions";
import { formatPrice, locationLabel, site } from "@/lib/site";

export function buildEnMessages(): SiteMessages {
  const processUrl = `${site.url}${processPagePath}`;
  const loc = locationLabel();
  const pairFrom = formatPrice(site.pricing.pair.from);
  const singleFrom = formatPrice(site.pricing.single.from);
  const mailInFrom = formatPrice(site.pricing.mailIn.from);
  const footerColumns = getFooterColumns();
  const [bookPricing, learn, service, shinesCol] = footerColumns;
  const bookingEnabled = isPublicBookingEnabled();
  const contactLine = getFooterContactLine();

  return {
    common: {
      included: "Included",
      optional: "Optional",
      close: "Close",
      loading: "Loading…",
      bookFromTemplate: "Book from {price}",
      viewPricing: "View pricing",
      contact: "Contact",
      seeProcess: "See our process",
      bookNow: "Book now",
      backToHome: "Back to home",
      breadcrumbHome: "Home",
      europe: "Europe",
      locations: "Locations",
      shinesHome: `${site.name} home`,
      openMenu: "Open menu",
      closeMenu: "Close menu",
      menu: "Menu",
      previous: "Previous",
      next: "Next",
    },
    meta: {
      homeTitle: `Headlight Restoration ${loc} | ${site.name} | Belgium & Europe`,
      homeDescription: `Professional headlight restoration in ${loc}. Restore foggy, yellowed headlights from ${pairFrom}. Local garage or mail-in service across Europe.`,
      aboutTitle: `About ${site.name} | Professional Headlight Restoration`,
      aboutDescription: `${site.name} restores foggy, yellowed headlights with an OEM-grade UV hard coat and in-shop curing in ${loc}. Mail-in service across Europe.`,
      contactTitle: `Contact & Visit | ${site.name}`,
      contactDescription: `Contact ${site.name} for headlight restoration in ${loc}. Book online, email ${site.email}, or ask about mobile and mail-in service across Europe.`,
      pricingTitle: `Pricing | Headlight Restoration from ${pairFrom} | ${site.name}`,
      pricingDescription: `Fixed headlight restoration pricing from ${pairFrom} for both headlights. ${pricingSummary}`,
      processTitle: `Headlight Restoration Process | ${site.name}`,
      processDescription: processSummary,
      bookTitle: `Book Headlight Restoration | ${site.name}`,
      bookDescription: `Book professional headlight restoration online. Fixed pricing from ${pairFrom}. Visit ${loc}, mobile service, or mail-in across Europe.`,
      newsTitle: `News | Headlight Restoration Guides & Updates | ${site.name}`,
      newsDescription: `Guides, updates, and expert advice on headlight restoration in ${loc} and across Europe. Yellow headlights, UV coating, inspection tips, and ${site.name} service news.`,
      locationsTitle: `Belgium Service Locations | ${site.name}`,
      locationsDescription: `Professional headlight restoration across Belgium. Choose your city. Mail-in service available across Europe.`,
      regionTitle: `Choose Country or Region | ${site.name}`,
      regionDescription: `Select your country or region for ${site.name} headlight restoration content and language preferences.`,
      bookingLookupTitle: `Find Your Booking | ${site.name}`,
      bookingLookupDescription: `Look up your ${site.name} booking with your reference and email. No account needed.`,
      myBookingTitle: `My Booking | ${site.name}`,
      privacyTitle: `Privacy Policy | ${site.name}`,
      privacyDescription: `How ${site.name} uses your booking and contact details. We do not sell your data.`,
      termsTitle: `Terms of Use | ${site.name}`,
      termsDescription: `Terms for using ${site.url.replace("https://", "")} and booking headlight restoration with ${site.name}.`,
      cityTitleTemplate: `Headlight Restoration {city} | ${site.name}`,
      cityDescriptionTemplate:
        "Professional headlight restoration in {city}, {province}. Book online from {price}. UV-cured before you drive away.",
    },
    nav: {
      home: "Home",
      process: "Process",
      pricing: "Pricing",
      news: "News",
      about: "About",
      contact: "Contact",
      bookNow: "Book Now",
      locationsBelgium: "Belgium",
      locationsEurope: "Europe",
    },
    hero: {
      title: "Drive with confidence after dark",
      subtitle: `Foggy headlights cut your visibility when you need it most. ${site.name} restores clarity so you see further, drive safer, and pass inspection in ${loc} or by mail across Europe.`,
      cta: "Fix your headlights now",
      secondary: "See before & after",
    },
    restoration: {
      title: "Why your headlights fail, and why it's dangerous to wait",
      intro:
        "Every week, drivers arrive at Shines with headlights so cloudy they can barely see the road. It's not cosmetic; it's a safety issue. Here's what's happening to your lights:",
      reasons: [
        {
          title: "Oxidation",
          text: "Car headlights can become yellowed by prolonged exposure to UV rays. This is particularly common for vehicles that are not stored in a garage.",
        },
        {
          title: "Water Vapor",
          text: "If the watertight seal around the headlight is worn or damaged, water vapor can condense inside the acrylic lens. This is particularly dangerous during nighttime driving.",
        },
        {
          title: "Driving Conditions",
          text: "Your car encounters dust, dirt, and rocks on the road each day. Run-ins with debris can scratch and scrape the lens, reducing the effectiveness of your headlight over time.",
        },
      ],
      cta: "Get a free assessment",
      imageAlts: {
        yellowed: "Before restoration, yellowed and foggy headlight lens",
        restored: "After restoration, crystal clear headlight lens",
        mustang: "Ford Mustang with restored headlights in a parking garage",
      },
    },
    value: {
      outcomesTitle: "What changes when your headlights are restored",
      outcomesIntro:
        "Headlight restoration is not about making your car look pretty. It is about getting back the visibility and confidence you lost.",
      outcomes: [
        {
          title: "See the road again",
          description:
            "Restored lenses improve light output so rain, unlit roads, and oncoming traffic feel manageable again, not something you white-knuckle through.",
        },
        {
          title: "Drive without that knot in your stomach",
          description:
            "No more guessing how far you can see. No more avoiding night drives because your lights let you down when you need them most.",
        },
        {
          title: "Pass inspection. Protect resale value.",
          description:
            "Clear headlights help with technical inspection and make your car look cared-for. Buyers notice immediately when the lenses look new.",
        },
      ],
      turnaroundNote: `Most local restorations are completed within ${site.turnaround.local.toLowerCase()}, backed by our ${site.warranty.toLowerCase()}. Every lens is UV-cured on-site, hardened before you leave, not days later.`,
      trustTitle: "Trusted by drivers across Belgium and Europe",
      trustIntro:
        "Real results from real drivers: restored clarity, safer night driving, and headlights that stay clear because we seal them properly.",
      trustCards: [
        {
          eyebrow: "Process",
          title: "OEM-grade process",
          description:
            "Same standards as the industry that builds your headlights, finished with in-shop UV curing so the coat is rock-hard before you drive away.",
          linkLabel: "Read our process",
        },
        {
          eyebrow: "Results",
          title: "Before & after, every time",
          description:
            "You see the difference before you leave. Crystal-clear lenses with professional sealing and UV protection.",
        },
        {
          eyebrow: "Service",
          title: "Belgium garage, Europe-wide",
          description: `Drop off locally in ${loc}, or ship your headlights for mail-in restoration anywhere in Europe.`,
        },
      ],
      bookCta: "Book now",
    },
    howItWorks: {
      title: "Crystal-clear headlights in 3 simple steps",
      intro:
        "No guesswork. No shortcuts. Just a proven process that puts your safety first, then the technology that makes it last.",
      introLink: "Book now",
      steps: [
        {
          eyebrow: "Step 1",
          title: "Book online",
          description:
            "Choose your headlight size, condition, and service method. Price updates instantly, no quote needed.",
        },
        {
          eyebrow: "Step 2",
          title: "Visit or ship",
          description: `Drop off in ${loc}, choose mobile service, or ship your headlights anywhere in Europe.`,
        },
        {
          eyebrow: "Step 3",
          title: "Drive with confidence",
          description:
            "We restore, UV-cure, and inspect your lenses on-site. The coating is rock-hard before you drive away. No delicate trip home or overnight dust worries.",
        },
      ],
      processBody:
        "Our process uses professional-grade equipment and OEM-trusted restoration standards, because a shortcut today means yellowing again in six months.",
      processLink: "Read the full process study",
      carouselLabel: "How headlight restoration works",
    },
    bookCta: {
      title: "Ready to see the road clearly again?",
      body: "Book online in minutes. Choose your size, condition, and service method. Your price updates instantly. No quote needed.",
      link: "Book now",
    },
    about: {
      title: "Professional headlight restoration, nothing else",
      intro: `${site.name} exists for one job: restore foggy, yellowed headlights to factory-clear visibility and protect them properly. We do not offer quick buffs or unrelated car services. Every lens gets the same OEM-grade process: strip, recoating, and in-shop UV curing before you drive away.`,
      whyTitle: "Why OEM-grade matters",
      whyBody:
        "Failed UV protection is why headlights haze again after a polish. We remove that layer completely, apply an OEM-grade hard coat, and UV-cure it on-site so the finish is rock-hard when you leave. That is the difference between weeks of clarity and years.",
      whereTitle: "Where we work",
      whereBody: `Visit our garage in ${loc}, choose mobile service, or ship your headlights mail-in anywhere in Europe. Same process, same warranty, whether you drop off locally or post your lenses.`,
      promiseTitle: "Our promise",
      promiseItems: [
        site.warranty,
        `${site.turnaround.local} at our garage`,
        "Before and after inspection on every restoration",
        "Fixed pricing online, no quote calls",
      ],
      processTitle: "See the full process",
      processBody:
        "Equipment, phases, and why UV curing before handover changes everything for drivers who need clarity that lasts.",
      processLink: "Read our process study",
      cta: "Book restoration",
    },
    contact: {
      title: "Contact & visit",
      intro:
        "Book online for the fastest response, or reach us directly for questions about drop-off, mobile service, or mail-in restoration across Europe.",
      addressTitle: "Address",
      addressPendingTemplate:
        "Full street address coming soon. Book online or email us for directions in {location}.",
      directionsLabel: "Get directions",
      hoursTitle: "Opening hours",
      hoursRows: [
        { days: "Monday – Friday", hours: "By appointment" },
        { days: "Saturday", hours: "By appointment" },
        { days: "Sunday", hours: "Closed" },
      ],
      reachTitle: "Reach us",
      dropOffTitle: "Drop-off & mail-in",
      mapSrOnly: "Map",
      mapPlaceholder:
        "Map will appear here once your Google Maps embed URL is added in site settings.",
      viewAllLocations: "View all locations",
      parkingNote: site.contact.parkingNote,
      mailInNote: site.contact.mailInNote,
      bookCta: "Book online",
      emailCta: "Contact us",
    },
    pricing: {
      title: "Restoration that lasts. Not a quick buff.",
      summary: pricingSummary,
      bookLink: "Book now",
      comparisonTitle: "Why choose SHINES",
      comparisonIntro: pricingComparisonIntro,
      tableHeadAspect: "",
      tableHeadShines: "SHINES",
      tableHeadDiy: "DIY kit",
      comingSoon: "Soon",
      tiersTitle: "Starting prices",
      modifiersTitle: "What shapes your price",
      footerCta: "Ready to book?",
      tiers: pricingTiers.map((tier) => ({
        label: tier.label,
        description: tier.description,
        includes: tier.includes,
      })),
      valueRows: pricingValueComparison.map((row) => ({ label: row.label })),
      modifiers: pricingModifiers.map((item) => ({
        label: item.label,
        detail: item.detail,
      })),
      comparisonClosing: `New OEM headlight assemblies often cost €300–€800 or more per side. Professional restoration delivers comparable clarity for a fraction of the price when housings are still sound.`,
    },
    processPage: {
      label: "Process",
      title: "Professional headlight restoration you can trust",
      summary: processSummary,
      bookCta: "Book restoration",
      instantCureTitle: "Drive away fully cured, not days later",
      instantCureBody: processInstantCureBenefit,
      oemTitle: 'Why "OEM-grade" is not marketing. It is chemistry.',
      oemBody1:
        "Polycarbonate headlights ship from the factory with a hard UV coat. When that coat fails, the plastic yellows and hazes. A quick buff or DIY kit only polishes the damage. It does not replace the protection layer. Without a new UV hard coat, clarity fades again within months.",
      oemBody2:
        "Our workflow follows the professional restoration sequence: strip, refine, coat, cure. That is why results look and perform like new lenses, not like a temporary shine.",
      pillarsTitle: "The three-part system",
      overviewTitle: "What happens when you book",
      overviewTiming: `Typical timing: ${site.turnaround.local.toLowerCase()} at our garage in ${loc}. Severe damage or oversized lenses may take longer.`,
      stepLabelTemplate: "Step {n}",
      pillars: processPillars.map((p) => ({
        title: p.title,
        description: p.description,
      })),
      overview: processOverview.map((step) => ({
        title: step.title,
        description: step.description,
      })),
      proofTitle: "Why customers choose SHINES",
      proofIntro:
        "We focus on outcomes and standards you can verify at handover, not workshop jargon.",
      proof: processProof.map((item) => ({
        title: item.title,
        description: item.description,
        source: item.source,
      })),
      comparisonTitle: "DIY kit vs. professional restoration",
      comparisonHeaders: {
        aspect: "Factor",
        diy: "DIY / quick buff",
        professional: "SHINES",
      },
      comparisonRows: processComparison.map((row) => ({
        aspect: row.aspect,
        diy: row.diy,
        professional: row.professional,
      })),
      standardsTitle: "Our standards on every job",
      standards: [...processStandards],
      closingTitle: "Ready for factory-clear headlights?",
      closingBody: `Book online in minutes. Fixed pricing from ${pairFrom} for both headlights. Visit our garage in ${loc}, choose mobile service, or ship across Europe.`,
      backHome: "Back to home",
    },
    faq: {
      title: "Frequently asked questions",
      intro:
        "Clear answers about professional headlight restoration in Belgium and mail-in service across Europe: process, pricing, timing, inspection, and how we differ from DIY kits.",
      contactPrompt: "Can't find what you're looking for?",
      contactOr: "or",
      contactLink: "contact us",
      items: [
        {
          question: "What is involved in professional headlight restoration?",
          answer: `SHINES restores polycarbonate headlight lenses with a multi-step professional process: we inspect each lens, mask surrounding paint, remove the failed factory UV layer (not just surface haze), refine the lens to a smooth coating-ready finish, apply an OEM-grade UV hard coat, and fully cure it in-shop before handover. You see the result before you leave. Step-by-step overview: ${processUrl}.`,
        },
        {
          question: "What types of headlight damage can you fix?",
          answer:
            "We can remove exterior oxidation, yellowing, cloudiness, haziness, discoloration, and light to moderate scratches on polycarbonate lenses. Deep cracks, chips through the lens, or badly melted plastic may need replacement. We assess every lens honestly before work starts and will recommend new assemblies when restoration is not the safe choice.",
        },
        {
          question: "Is the foggy look coming from inside the headlight?",
          answer:
            "Usually no. Most cloudy headlights are caused by UV breakdown and oxidation on the outside of the polycarbonate lens. Internal moisture is rare and often means a broken or worn seal, allowing condensation inside the housing. Headlights have venting; heat from the bulb normally clears minor moisture over time. If we see internal damage during inspection, we will tell you whether restoration or replacement is appropriate.",
        },
        {
          question: "Are headlight lenses made of glass or plastic?",
          answer:
            "Most modern car headlights use polycarbonate plastic: lighter, shatter-resistant, and shaped for aerodynamic styling. Older or simpler vehicles (some trucks, vans, and classics) may still use glass. SHINES specialises in professional restoration and UV recoating of polycarbonate lenses, which make up the vast majority of vehicles on Belgian and European roads today.",
        },
        {
          question: "Do I need to remove my headlights before restoration?",
          answer:
            "No. Headlights can stay on the vehicle. That is our preferred method. We mask and tape around each lamp to protect your paint. Popping the hood gives us easier access. If your headlights are already removed (for example after bodywork), we can restore them on the bench; just let us know when you book.",
        },
        {
          question: "How long does headlight restoration take?",
          answer: `At our garage in ${loc}, ${site.turnaround.localDetail} Mail-in orders across Europe typically take ${site.turnaround.mailIn.toLowerCase()}, plus shipping time each way.`,
        },
        {
          question: "Can I drive home right after restoration?",
          answer:
            "Yes. Unlike shops that only polish and ask you to wait hours or days for a sealant to dry, SHINES UV-cures every lens on-site before handover. The coating is rock-hard when you leave, with no delicate drive home, no keeping the car in a dust-free garage overnight, and no restriction before rain or washing.",
        },
        {
          question: "Why choose SHINES over a DIY headlight restoration kit?",
          answer:
            "DIY kits can help light haze if used carefully, but they are one-size-fits-all: wrong grit or pressure can leave worse scratches, many kits cannot remove severe oxidation, and budget sealants often fail within months. SHINES adjusts sanding, compounds, and coating to each lens based on manufacturer, size, and damage level, with professional tooling, an OEM-grade UV hard coat, and in-shop curing. Every job includes our clarity guarantee, not a generic box warranty.",
        },
        {
          question: "How much does headlight restoration cost in Belgium?",
          answer: `Transparent pricing from ${pairFrom} for both headlights (${singleFrom} for a single lens). Mail-in restoration across Europe starts from ${mailInFrom} plus shipping. Final price depends on headlight size, condition severity, and service method (garage visit, mobile, or mail-in). You see the confirmed price before you commit.`,
        },
        {
          question: "Is headlight restoration worth it compared to new headlights?",
          answer:
            "New OEM headlight assemblies often cost €300–€800 or more per side, plus fitting. When housings, seals, and electronics are still sound, professional restoration restores light output and appearance for a fraction of that cost, with UV protection designed to last years, not weeks.",
        },
        {
          question:
            "Will restored headlights pass technical inspection (keuring / contrôle technique)?",
          answer:
            "Restored headlights can pass inspection when light output and lens clarity meet legal visibility standards. We assess condition before starting and will tell you honestly if replacement is the safer option for safety or inspection.",
        },
        {
          question: "How long do restored headlights last?",
          answer: `With the failed UV layer removed and a professional hard coat reapplied, results typically last years, not months like quick buff-and-seal jobs. Every SHINES restoration includes our ${site.warranty.toLowerCase()}.`,
        },
        {
          question: "Do you serve customers outside Belgium?",
          answer: `Yes. Visit our workshop in ${loc}, book mobile service where available, or use mail-in headlight restoration anywhere in Europe. We guide you through safe packing, inbound shipping, and quoted return delivery.`,
        },
      ],
    },
    footer: {
      finePrint: [...footerFinePrint],
      breadcrumb: "Headlight restoration",
      followTitle: "Follow SHINES",
      copyrightTemplate: `Copyright © {year} ${site.name}. All rights reserved. Headlight restoration, {location} & Europe.`,
      contactLineBooking: bookingEnabled
        ? `Book online at ${site.url.replace("https://", "")}/book or email ${site.email}.`
        : contactLine,
      contactLineEmail: `Questions? Email ${site.email}.`,
      columns: {
        bookPricing: {
          title: bookPricing.title,
          links: bookPricing.links.map((l) => ({
            label: l.label,
            href: l.href,
          })),
        },
        learn: {
          title: learn.title,
          links: learn.links.map((l) => ({ label: l.label, href: l.href })),
        },
        service: {
          title: service.title,
          links: service.links.map((l) => ({ label: l.label, href: l.href })),
        },
        shines: {
          title: shinesCol.title,
          links: shinesCol.links.map((l) => ({ label: l.label, href: l.href })),
        },
      },
      legal: {
        privacy: footerLegalLinks[0]!.label,
        terms: footerLegalLinks[1]!.label,
        warranty: footerLegalLinks[2]!.label,
        locations: footerLegalLinks[3]!.label,
        europe: "Europe",
      },
      changeRegionLabel: "Change country or region",
    },
    europe: {
      hubTitle: "Headlight restoration across Europe",
      hubDescription:
        "SHINES is based in Belgium with professional garage service locally and secure mail-in restoration for drivers across Europe. Select your country for service details and pricing.",
      countryTitleTemplate: "Headlight restoration in {country}",
      countryIntroTemplate: `Professional headlight restoration for drivers in {country} ({countryLocal}). Ship your headlights to our Belgian workshop or visit us in ${loc}. UV-cured, hardened before you drive away.`,
      mailInNote:
        "Mail-in service includes guided packing, tracked shipping, restoration, and quoted return delivery to your address.",
      belgiumGarage: `Garage service in ${loc}`,
      viewPricing: "View pricing",
    },
    locations: {
      belgiumTitle: "Service locations in Belgium",
      belgiumDescription:
        "Professional headlight restoration across Belgium. Select your city to learn more and book online. Mail-in service is available across Europe.",
      europeLink: "Browse all European countries",
      cityWarrantyTemplate: `${site.warranty}. ${site.turnaround.local}. Serving {city}, {province}, and all of Belgium.`,
      cityBookCta: `Book from ${pairFrom}`,
      cityPricingCta: "View pricing",
    },
    regions: {
      pageTitle: "Choose your country or region",
      pageIntro:
        "Select a country or region to set your language. Full site copy is available in English, Dutch, French, and German.",
      breadcrumb: "Country or region",
      groups: regionGroups.map((group) => ({ title: group.title })),
    },
    news: {
      indexTitle: "News",
      latestTitle: "Latest news",
      featuredSr: "Featured story",
      aboutTitle: `About ${site.name} News`,
      aboutBody: `Updates, guides, and service news from ${site.name}, your professional headlight restoration specialist in Belgium and across Europe.`,
      relatedTitle: "Related articles",
      readMore: "Read more",
      categories: { ...newsCategoryLabels },
      subnav: {
        news: "News",
        about: "About SHINES",
        process: "Our process",
      },
    },
    legal: {
      privacyHeading: "Privacy Policy",
      privacyBody: `We use booking and contact details only to confirm your appointment, perform restoration work, and follow up on service. We do not sell your data. For privacy questions, email ${site.email}.`,
      termsHeading: "Terms of Use",
      termsBody: `Prices on ${site.url.replace("https://", "")} are starting prices. Final pricing is confirmed on the booking page before payment. We assess each lens before work begins and will advise if replacement is the safer option. Warranty terms are described on our pricing page.`,
    },
    booking: {
      pageTitle: "Book your restoration",
      pageIntro:
        "Pick your headlight size, how bad the damage looks, and how you want service. Your price updates instantly. All prices incl. BTW unless a VAT invoice is requested for your company.",
      popularLabel: "Most popular",
      stepLegends: {
        quantity: "1. How many headlights?",
        quantitySingleMobile: "Mobile visits aren't available for one light.",
        size: "2. What size are your headlights?",
        sizeHint:
          "Choose based on your car. Larger or more complex lights take more time and materials.",
        condition: "3. How bad do they look?",
        conditionHint: "Be honest. Deeper damage needs more sanding and takes longer.",
        service: "4. How would you like to get service?",
      },
      contactDetailsTitle: "What are your contact details?",
      shipAddressNote:
        "We keep your name and return address on file so we can match your parcel when it arrives and ship your headlights back securely.",
      mobileOutOfAreaNote:
        "Mobile visits are available in {area} only (within {radius} km of our workshop). For {country}, choose {shipLabel} or contact us for a custom quote.",
      distanceLoading: "Calculating travel distance…",
      distanceLoadingSlots: "Calculating travel distance before showing times…",
      mobileAddressRequired:
        "Enter your full address above to see available appointment times.",
      submitEmailHint:
        "We'll email your confirmation right away. Questions? Contact us at",
      summaryTitle: "Your booking",
      summaryVat: "Incl. BTW · {warranty}",
      summaryLabels: {
        size: "Size",
        condition: "Condition",
        service: "Service",
        quantity: "Quantity",
        pair: "Both headlights",
        single: "One headlight",
      },
      returnShippingNote:
        "Return shipping is quoted separately before we send your headlights back.",
      priceFrom: "from {price}",
      mobileTravelQuote:
        "{km} km one-way · Travel fee {fee} (incl. BTW). {breakdown}",
      steps: {
        options: "Options",
        details: "Your details",
        schedule: "Schedule",
        confirm: "Confirm",
      },
      chooseOptions: "Choose your options",
      quantity: headlightQuantities.map((q) => ({
        label: q.label,
        description: q.description,
      })),
      sizes: headlightSizes.map((s) => ({
        label: s.label,
        description: s.description,
      })),
      conditions: conditionSeverities.map((c) => ({
        label: c.label,
        shortLabel: c.shortLabel,
        description: c.description,
      })),
      services: serviceMethods.map((m) => ({
        label: m.label,
        description: m.description,
      })),
      priceLabels: {
        base: "Base",
        size: "Size",
        condition: "Condition",
        service: "Service",
        travel: "Travel",
        total: "Total",
        mailInHandling: "Mail-in handling",
        mobileService: "Mobile service",
      },
      continue: "Continue",
      back: "Back",
      confirmBooking: "Confirm booking & pay later",
      whereTitle: {
        mobile: "Where should we come?",
        ship: "Where are you shipping from?",
        default: "Enter your details",
      },
      whereSubtitle: "Enter your name and address:",
      fields: {
        firstName: "First name",
        lastName: "Last name",
        suffix: "Suffix",
        street: "Street and number",
        apartment: "Apartment, suite, access code",
        postalCode: "Postal code",
        city: "City",
        country: "Country / Region",
        businessAddress: "This is a business address",
        companyName: "Company name",
        vatNumber: "VAT number",
        billingAddress: "Billing address",
        email: "Email address",
        phone: "Mobile phone number",
        vehicle: "Car make & model",
        notes: "Notes",
        preferredSlot: "Preferred date & time",
      },
      contactAside:
        "We'll email your booking confirmation immediately. Your mobile number helps us reach you about your appointment time and travel details.",
      aboutSection: {
        ship: "About your booking",
        default: "About your appointment",
      },
      mailInHow: "How mail-in works",
      pairOnlyMobile:
        "We updated your booking to both headlights. Mobile visits aren't available for one light.",
      slotError: "That time slot is no longer available. Please choose another.",
      travelFeeNote:
        "Travel fee excluded from total. Confirmed manually within 24 hours. Mobile service fee is included.",
      validation: {
        firstName: "Enter your first name.",
        lastName: "Enter your last name.",
        street: "Enter your street and number.",
        postalCode: "Enter your postal code.",
        city: "Enter your city.",
        companyName: "Enter your company name.",
        vatNumber: "Enter your VAT number.",
        emailRequired: "Enter your email address.",
        emailInvalid: "Enter a valid email address.",
        phoneRequired: "Enter your mobile phone number.",
        phoneInvalid: "Enter a valid mobile phone number.",
        vehicle: "Enter your car make and model.",
        preferredSlot: "Choose your preferred date and time.",
      },
      lookup: {
        title: "Find your booking",
        intro:
          "No account needed. Enter the reference from your confirmation (e.g. SH-1001) and the email you used when booking. We'll open your private booking page.",
        label: "Booking reference",
        placeholder: "SH-1001",
        submit: "Open my booking",
        error: "Booking not found.",
      },
      hub: {
        title: "My booking",
        loading: "Loading your booking…",
        cancelled: "This booking was cancelled.",
        bookmarkShip:
          "No account needed. Bookmark this page to track your parcel and manage your mail-in booking.",
        bookmarkDefault:
          "No account needed. Bookmark this page to view or cancel your appointment.",
        details: "Details",
        cancel: "Cancel booking",
        cancelConfirm:
          "Cancel this booking? We'll release your appointment slot or stop expecting your parcel.",
        reference: "Your booking",
      },
      confirmation: {
        title: "Booking confirmed",
        referenceLine: "Reference {reference}",
        totalLine: "Total estimate {total} incl. BTW · {warranty}",
        stepsVisit: [
          "Arrive at your scheduled time — free on-site parking for drop-off.",
          "We inspect your headlights and confirm the final scope before work starts.",
          "Restoration and UV curing typically while you wait (about 30–90 minutes for both lights).",
          "Collect your vehicle with our clarity guarantee — pay at the workshop.",
        ],
        stepsMobile: [
          "Have the vehicle ready and headlights accessible at the scheduled time.",
          "Our technician arrives within the reserved window (travel time is included in your quote).",
          "We restore and UV-cure on site — no garage visit needed.",
          "Review the result with us; payment is due after service.",
        ],
        stepsShip: [...mailInBookingSteps],
        visitLocationTitle: "Visit us at",
        shipToTitle: "Ship to",
        shipToFallback:
          "We'll email the workshop address to {email}. Contact us if you need it sooner.",
        openBooking: "Open my booking",
        emailUs: "Email us",
        footnote:
          "Save your private link or reference {reference}. No account needed.",
        footnoteShip:
          "Save your private link or reference {reference}. Write the reference on the outside of your parcel before shipping. No account needed.",
        emailSent:
          "We've sent your confirmation to the email address you provided. Check your inbox (and spam folder).",
        emailPending:
          "Your booking is saved. If you don't receive a confirmation email within a few minutes, open your booking below or contact us.",
      },
      mailIn: {
        confirmationTitle: "Booking confirmed",
        confirmationSteps: [...mailInBookingSteps],
        shippingTitle: "Inbound tracking",
        shippingCarrier: "Carrier",
        shippingTracking: "Tracking number",
        shippingSave: "Save tracking",
        returnPayTitle: "Return shipping",
        returnPayBody:
          "Your restoration is done. Pay return shipping in one step, then we send your headlights to your saved address.",
        returnPayButton: "Pay return shipping",
        returnPaid:
          "Return shipping paid. We're preparing your parcel for dispatch.",
      },
      picker: {
        chooseDate: "Choose a date and time",
        chooseTime: "Available times",
        noSlots: "No times left on this date.",
        loading: "Loading dates…",
      },
    },
    mailInFlow: {
      steps: mailInSteps.map((step) => step.title),
      stepDetails: mailInSteps.map((step) => ({
        title: step.title,
        description: step.description,
      })),
      notes: [...mailInNotes],
      shipToNote: mailInShipToNote,
      visitNote: visitDropOffNote,
      unboxingNote: mailInSteps[2]!.description,
      workshopNote: mailInSteps[3]!.description,
    },
    mailInStatus: { ...mailInStatusLabels },
    mobilePricing: {
      manualQuoteTemplate:
        "{km} km one-way, we'll confirm your travel fee within 24 hours. At this distance, mail-in is often better value.",
      breakdownLabels: {
        regio: "Regio travel",
        extra: "Extra km (round trip)",
        total: "Travel total",
      },
    },
    appointments: {
      goTo: "Open my booking",
      returnTo: "Return to booking",
      mailInAwaiting: "Mail-in · awaiting parcel",
      mobileNoticeTemplate:
        "Mobile visits reserve {hours} hours on your calendar ({km} km one-way estimate). Please have the vehicle ready at the arrival time. Delays can affect later appointments.",
    },
    articles: newsArticles,
  };
}
