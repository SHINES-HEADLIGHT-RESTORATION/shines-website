import { processPagePath } from "@/lib/process";
import { locationsPagePath } from "@/lib/belgium-locations";
import { europeHubPath } from "@/lib/europe-countries";
import { pricingPagePath } from "@/lib/pricing";
import { formatPrice, locationLabel, mailtoQuote, site } from "@/lib/site";
import type { DeepPartial } from "../merge";
import type { SiteMessages } from "../types";

const processUrl = `${site.url}${processPagePath}`;
const loc = locationLabel();
const pairFrom = formatPrice(site.pricing.pair.from);
const singleFrom = formatPrice(site.pricing.single.from);
const mailInFrom = formatPrice(site.pricing.mailIn.from);

const pricingSummaryNl =
  "Vaste prijzen voor professionele koplamprestauratie. Geen offertegesprekken, geen verborgen kosten. Kies opties op de boekingspagina en zie meteen uw exacte prijs.";

const pricingComparisonIntroNl =
  "We doen enkel professionele koplamprestauratie. Dat betekent strippen, recoating en UV-uitharding, geen snelle polijstbeurt. Dit is inbegrepen vergeleken met een DIY-kit thuis.";

const warrantyNl = "1 jaar helderheidsgarantie";
const turnaroundLocalNl =
  "Ongeveer 30–60 minuten per koplamp of achterlicht; ongeveer 45–90 minuten voor beide";
const turnaroundLocalDetailNl =
  "Typisch duurt restauratie plus volledige uitharding in de shop ongeveer 30–60 minuten per koplamp of achterlicht, of ongeveer 45–90 minuten voor beide koplampen afhankelijk van formaat en oxidatie. De coating is volledig gehard vóór u vertrekt.";
const turnaroundMailInNl = "3–5 werkdagen plus verzending";
const parkingNoteNl = "Gratis parkeren ter plaatse bij aflevering.";
const mailInNoteNl =
  "Postpakketten gebruiken hetzelfde werkplaatsadres. U verpakt en verstuurt op eigen verantwoordelijkheid.";

const processSummaryNl = `SHINES herstelt koplampen met een professionele strip-, recoat- en UV-uithardingsworkflow in de shop. Elke koplamp of achterlicht duurt typisch ongeveer 30–60 minuten; beide koplampen meestal ongeveer 45–90 minuten afhankelijk van formaat en staat. Wanneer u vertrekt, is de coating al hard. Geen voorzichtige rit, geen stofvrije garage overnight. Resultaten zijn UV-beschermd en gedekt door onze ${warrantyNl.toLowerCase()}.`;

const processInstantCureBenefitNl =
  "Veel shops polijsten en sealen, maar slaan volledige uitharding in de shop over. We harden elke lens ter plaatse vóór aflevering, zodat u meteen naar huis kunt, door regen kunt rijden of naar de carwash kunt zonder stof, vingerafdrukken of een zachte afwerking die het resultaat ruïneert.";

export const nlPatch: DeepPartial<SiteMessages> = {
  common: {
    included: "Inbegrepen",
    optional: "Optioneel",
    close: "Sluiten",
    loading: "Laden…",
    bookFromTemplate: "Boek vanaf {price}",
    viewPricing: "Bekijk prijzen",
    contact: "Contact",
    seeProcess: "Bekijk ons proces",
    bookNow: "Boek nu",
    backToHome: "Terug naar home",
    breadcrumbHome: "Home",
    europe: "Europa",
    locations: "Locaties",
    shinesHome: `${site.name} home`,
    openMenu: "Menu openen",
    closeMenu: "Menu sluiten",
    menu: "Menu",
    previous: "Vorige",
    next: "Volgende",
  },
  meta: {
    homeTitle: `Koplamprestauratie ${loc} | ${site.name} | België & Europa`,
    homeDescription: `Professionele koplamprestauratie in ${loc}. Herstel matte, vergeelde koplampen vanaf ${pairFrom}. Lokale garage of postservice in heel Europa.`,
    aboutTitle: `Over ${site.name} | Professionele koplamprestauratie`,
    aboutDescription: `${site.name} herstelt matte, vergeelde koplampen met een OEM UV-hardcoat en uitharding in de werkplaats in ${loc}. Postservice in heel Europa.`,
    contactTitle: `Contact & bezoek | ${site.name}`,
    contactDescription: `Contacteer ${site.name} voor koplamprestauratie in ${loc}. Boek online, mail ${site.email}, of vraag naar mobiele service en postrestauratie in heel Europa.`,
    pricingTitle: `Prijzen | Koplamprestauratie vanaf ${pairFrom} | ${site.name}`,
    pricingDescription: `Vaste prijzen voor koplamprestauratie vanaf ${pairFrom} voor beide koplampen. ${pricingSummaryNl}`,
    processTitle: `Koplamprestauratieproces | ${site.name}`,
    processDescription: processSummaryNl,
    bookTitle: `Boek koplamprestauratie | ${site.name}`,
    bookDescription: `Boek professionele koplamprestauratie online. Vaste prijzen vanaf ${pairFrom}. Bezoek ${loc}, mobiele service of post in heel Europa.`,
    newsTitle: `Nieuws | Gidsen & updates koplamprestauratie | ${site.name}`,
    newsDescription: `Gidsen, updates en advies over koplamprestauratie in ${loc} en heel Europa. Gele koplampen, UV-coating, keuringstips en nieuws over ${site.name}.`,
    locationsTitle: `Locaties in België | ${site.name}`,
    locationsDescription:
      "Professionele koplamprestauratie in heel België. Kies uw stad. Postservice beschikbaar in heel Europa.",
    regionTitle: `Kies land of regio | ${site.name}`,
    regionDescription: `Selecteer uw land of regio voor ${site.name} koplamprestauratie en taalvoorkeuren.`,
    bookingLookupTitle: `Zoek uw boeking | ${site.name}`,
    bookingLookupDescription: `Zoek uw ${site.name}-boeking met referentie en e-mail. Geen account nodig.`,
    myBookingTitle: `Mijn boeking | ${site.name}`,
    privacyTitle: `Privacybeleid | ${site.name}`,
    privacyDescription: `Hoe ${site.name} uw boekings- en contactgegevens gebruikt. We verkopen uw gegevens niet.`,
    termsTitle: `Gebruiksvoorwaarden | ${site.name}`,
    termsDescription: `Voorwaarden voor het gebruik van ${site.url.replace("https://", "")} en het boeken van koplamprestauratie bij ${site.name}.`,
    cityTitleTemplate: `Koplamprestauratie {city} | ${site.name}`,
    cityDescriptionTemplate:
      "Professionele koplamprestauratie in {city}, {province}. Boek online vanaf {price}. UV-gehard vóór u vertrekt.",
  },
  nav: {
    home: "Home",
    process: "Proces",
    pricing: "Prijzen",
    news: "Nieuws",
    about: "Over ons",
    contact: "Contact",
    bookNow: "Boek nu",
    locationsBelgium: "België",
    locationsEurope: "Europa",
  },
  hero: {
    title: "Rij met vertrouwen in het donker",
    subtitle: `Matte koplampen verminderen uw zicht wanneer u ze het meest nodig heeft. ${site.name} herstelt helderheid zodat u verder ziet, veiliger rijdt en de keuring haalt in ${loc} of via post in heel Europa.`,
    cta: "Los uw koplampen nu op",
    secondary: "Bekijk voor en na",
  },
  restoration: {
    title: "Waarom uw koplampen falen, en waarom wachten gevaarlijk is",
    intro:
      "Elke week komen bestuurders bij Shines met koplampen zo troebel dat ze de weg nauwelijks zien. Het is geen cosmetisch probleem; het is veiligheid. Dit gebeurt er met uw lampen:",
    reasons: [
      {
        title: "Oxidatie",
        text: "Koplampen kunnen vergelen door langdurige blootstelling aan UV-stralen. Dat komt vooral voor bij wagens die niet in een garage staan.",
      },
      {
        title: "Waterdamp",
        text: "Als de waterdichte afdichting rond de koplamp versleten of beschadigd is, kan waterdamp condenseren in de acryllen lens. Dat is bijzonder gevaarlijk bij nachtelijk rijden.",
      },
      {
        title: "Rijomstandigheden",
        text: "Uw wagen stuit elke dag op stof, vuil en steentjes. Schade aan de lens vermindert de werking van uw koplamp na verloop van tijd.",
      },
    ],
    cta: "Vraag een gratis beoordeling",
    imageAlts: {
      yellowed: "Vóór restauratie: vergeelde en matte koplamplens",
      restored: "Na restauratie: kristalheldere koplamplens",
      mustang: "Ford Mustang met gerestaureerde koplampen in een parkeergarage",
    },
  },
  value: {
    outcomesTitle: "Wat verandert wanneer uw koplampen gerestaureerd zijn",
    outcomesIntro:
      "Koplamprestauratie draait niet om mooi maken. Het gaat om het terugkrijgen van zicht en vertrouwen dat u bent kwijtgeraakt.",
    outcomes: [
      {
        title: "Zie de weg opnieuw",
        description:
          "Gerestaureerde lenzen verbeteren het licht zodat regen, onverlichte wegen en tegenliggers weer behapbaar aanvoelen, niet iets waar u zich zorgen over maakt.",
      },
      {
        title: "Rij zonder die knoop in uw maag",
        description:
          "Geen giswerk meer over hoe ver u kunt zien. Geen vermijden van nachtritten omdat uw licht faalt wanneer u het het meest nodig heeft.",
      },
      {
        title: "Haal de keuring. Bescherm de restwaarde.",
        description:
          "Heldere koplampen helpen bij de technische keuring en laten uw wagen verzorgd ogen. Kopers merken meteen wanneer de lenzen als nieuw ogen.",
      },
    ],
    turnaroundNote: `De meeste lokale restauraties zijn klaar binnen ${turnaroundLocalNl.toLowerCase()}, met onze ${warrantyNl.toLowerCase()}. Elke lens wordt ter plaatse UV-gehard, hard vóór u vertrekt, niet dagen later.`,
    trustTitle: "Vertrouwd door bestuurders in België en Europa",
    trustIntro:
      "Echte resultaten van echte bestuurders: herstelde helderheid, veiliger nachtelijk rijden en koplampen die helder blijven omdat we ze correct afsluiten.",
    trustCards: [
      {
        eyebrow: "Proces",
        title: "OEM-proces",
        description:
          "Dezelfde normen als de sector die uw koplampen bouwt, afgewerkt met UV-uitharding in de werkplaats zodat de coating hard is vóór u vertrekt.",
        linkLabel: "Lees ons proces",
      },
      {
        eyebrow: "Resultaat",
        title: "Voor en na, elke keer",
        description:
          "U ziet het verschil vóór u vertrekt. Kristalheldere lenzen met professionele afsluiting en UV-bescherming.",
      },
      {
        eyebrow: "Service",
        title: "Belgische garage, heel Europa",
        description: `Lokaal afleveren in ${loc}, of uw koplampen opsturen voor postrestauratie overal in Europa.`,
      },
    ],
    bookCta: "Boek nu",
  },
  howItWorks: {
    title: "Kristalheldere koplampen in 3 eenvoudige stappen",
    intro:
      "Geen giswerk. Geen shortcuts. Een bewezen proces dat uw veiligheid eerst zet, daarna de technologie die het resultaat laat aanhouden.",
    introLink: "Boek nu",
    steps: [
      {
        eyebrow: "Stap 1",
        title: "Boek online",
        description:
          "Kies formaat, staat en servicemethode. De prijs wordt meteen bijgewerkt, geen offerte nodig.",
      },
      {
        eyebrow: "Stap 2",
        title: "Bezoek of verstuur",
        description: `Afleveren in ${loc}, kies mobiele service of stuur uw koplampen op vanuit heel Europa.`,
      },
      {
        eyebrow: "Stap 3",
        title: "Rij met vertrouwen",
        description:
          "We restaureren, UV-harden en inspecteren uw lenzen ter plaatse. De coating is hard vóór u vertrekt. Geen voorzichtige rit naar huis of stofzorgen overnight.",
      },
    ],
    processBody:
      "Ons proces gebruikt professionele apparatuur en OEM-trusted restauratiestandaarden, want een shortcut vandaag betekent opnieuw vergelen binnen een half jaar.",
    processLink: "Lees de volledige processtudie",
    carouselLabel: "Hoe koplamprestauratie werkt",
  },
  bookCta: {
    title: "Klaar om de weg weer helder te zien?",
    body: "Boek online in enkele minuten. Kies formaat, staat en servicemethode. Uw prijs wordt meteen bijgewerkt. Geen offerte nodig.",
    link: "Boek nu",
  },
  about: {
    title: "Professionele koplamprestauratie, niets anders",
    intro: `${site.name} bestaat voor één taak: matte, vergeelde koplampen herstellen naar fabriekhelder zicht en ze correct beschermen. Geen snelle polijstbeurten of andere autodiensten. Elke lens krijgt hetzelfde OEM-proces: strippen, recoating en UV-uitharding in de werkplaats vóór u vertrekt.`,
    whyTitle: "Waarom OEM-kwaliteit telt",
    whyBody:
      "Mislukte UV-bescherming is waarom koplampen na polijsten opnieuw troebelen. We verwijderen die laag volledig, brengen een OEM-hardcoat aan en UV-harden ter plaatse zodat de afwerking hard is wanneer u vertrekt. Dat is het verschil tussen weken helderheid en jaren.",
    whereTitle: "Waar we werken",
    whereBody: `Bezoek onze garage in ${loc}, kies mobiele service of stuur uw koplampen per post vanuit heel Europa. Hetzelfde proces, dezelfde garantie, lokaal of per post.`,
    promiseTitle: "Onze belofte",
    promiseItems: [
      warrantyNl,
      `${turnaroundLocalNl} in onze garage`,
      "Voor- en na-inspectie bij elke restauratie",
      "Vaste online prijzen, geen offertegesprekken",
    ],
    processTitle: "Bekijk het volledige proces",
    processBody:
      "Materiaal, fases en waarom UV-uitharding vóór aflevering alles verandert voor bestuurders die helderheid willen die aanhoudt.",
    processLink: "Lees onze processtudie",
    cta: "Boek restauratie",
  },
  contact: {
    title: "Contact & bezoek",
    intro:
      "Boek online voor het snelste antwoord, of contacteer ons rechtstreeks voor vragen over aflevering, mobiele service of postrestauratie in heel Europa.",
    addressTitle: "Adres",
    addressPendingTemplate:
      "Volledig adres volgt binnenkort. Boek online of mail ons voor routebeschrijving in {location}.",
    directionsLabel: "Routebeschrijving",
    hoursTitle: "Openingsuren",
    hoursRows: [
      { days: "Maandag – vrijdag", hours: "Op afspraak" },
      { days: "Zaterdag", hours: "Op afspraak" },
      { days: "Zondag", hours: "Gesloten" },
    ],
    reachTitle: "Bereik ons",
    dropOffTitle: "Aflevering & post",
    mapSrOnly: "Kaart",
    mapPlaceholder:
      "De kaart verschijnt hier zodra uw Google Maps embed-URL is toegevoegd in de site-instellingen.",
    viewAllLocations: "Alle locaties bekijken",
    parkingNote: parkingNoteNl,
    mailInNote: mailInNoteNl,
    bookCta: "Boek online",
    emailCta: "Contacteer ons",
  },
  pricing: {
    title: "Restauratie die aanhoudt. Geen snelle polijstbeurt.",
    summary: pricingSummaryNl,
    bookLink: "Boek nu",
    comparisonTitle: "Waarom kiezen voor SHINES",
    comparisonIntro: pricingComparisonIntroNl,
    tableHeadAspect: "",
    tableHeadShines: "SHINES",
    tableHeadDiy: "DIY-kit",
    comingSoon: "Binnenkort",
    tiersTitle: "Startprijzen",
    modifiersTitle: "Wat uw prijs bepaalt",
    footerCta: "Klaar om te boeken?",
    tiers: [
      {
        label: "Restauratie van één koplamp",
        description: "Eén matte, bekraste of vergeelde lens.",
        includes: "Herstel, afsluiting en UV-geharde hardcoat.",
      },
      {
        label: "Paar (beide koplampen)",
        description: "Evenwichtig lichtbeeld. Onze meest geboekte optie.",
        includes: "Herstel, afsluiting en UV-uitharding.",
      },
      {
        label: "Postrestauratie (Europa)",
        description: `Verstuur vanuit heel Europa wanneer u ${loc} niet kunt bezoeken.`,
        includes: "Hetzelfde OEM-proces. Retourverzending apart geoffreerd.",
      },
    ],
    valueRows: [
      { label: "Voor- en na-inspectie zodat u het verschil ziet" },
      { label: "Helderheid die jaren aanhoudt, niet weken" },
      { label: "OEM UV-hardcoat die jarenlang beschermt" },
      { label: "Volledig gehard vóór u vertrekt" },
      { label: warrantyNl },
      { label: "Koplampuitlijning (boeking paar)" },
      { label: "Specialisten in koplamprestauratie (we doen niets anders)" },
      { label: "Mislukte fabriek UV-laag volledig verwijderd" },
      { label: `${turnaroundLocalNl} in onze garage` },
      { label: "Binnenwerkplaats zonder stof of zon" },
      { label: "Steunt enkel op tijdelijke polijst of sealant" },
    ],
    modifiers: [
      {
        label: "Koplampformaat",
        detail: "Standaard, groot wraparound of complexe vormen.",
      },
      {
        label: "Lensstaat",
        detail: "Lichte troebeling, zware oxidatie of ernstige schade.",
      },
      {
        label: "Servicemethode",
        detail: `Bezoek ${loc}, mobiele service of post in heel Europa.`,
      },
    ],
    comparisonClosing:
      "Nieuwe OEM-koplampunits kosten vaak €300–€800 of meer per zijde. Professionele restauratie levert vergelijkbare helderheid voor een fractie van de prijs wanneer de behuizing nog intact is.",
  },
  processPage: {
    label: "Proces",
    title: "Professionele koplamprestauratie waar u op kunt vertrouwen",
    summary: processSummaryNl,
    bookCta: "Boek restauratie",
    instantCureTitle: "Vertrek volledig gehard, niet dagen later",
    instantCureBody: processInstantCureBenefitNl,
    oemTitle: 'Waarom "OEM-kwaliteit" geen marketing is. Het is chemie.',
    oemBody1:
      "Polycarbonaten koplampen verlaten de fabriek met een harde UV-coating. Wanneer die faalt, vergeelt en troebelt het plastic. Een snelle polijstbeurt of DIY-kit polijst enkel de schade. Die vervangt de beschermlaag niet. Zonder nieuwe UV-hardcoat vervaagt de helderheid opnieuw binnen enkele maanden.",
    oemBody2:
      "Onze workflow volgt de professionele restauratiereeks: strippen, verfijnen, coaten, uitharden. Daarom ogen en presteren resultaten als nieuwe lenzen, niet als een tijdelijke glans.",
    pillarsTitle: "Het drie-delige systeem",
    overviewTitle: "Wat gebeurt wanneer u boekt",
    overviewTiming: `Typische duur: ${turnaroundLocalNl.toLowerCase()} in onze garage in ${loc}. Ernstige schade of oversized lenzen kunnen langer duren.`,
    stepLabelTemplate: "Stap {n}",
    pillars: [
      {
        title: "Precieze voorbereiding & schuren",
        description:
          "We strippen de mislukte fabriek UV-laag volledig, niet enkel polijsten, met gecontroleerd professioneel schuren op doelgerichte apparatuur.",
      },
      {
        title: "OEM UV-hardcoat",
        description:
          "Een gecertificeerde OEM UV-hardcoat vervangt de bescherming die polycarbonaat nodig heeft om helder te blijven. Geen wax, geen sealant, geen snelle spray.",
      },
      {
        title: "UV-uitharding & inspectie",
        description:
          "De coating wordt volledig gehard in de werkplaats vóór u vertrekt. Geen zachte afwerking, geen overnight uitharding, geen stofvrije garage nodig.",
      },
    ],
    overview: [
      {
        title: "Beoordelen & voorbereiden",
        description:
          "We inspecteren beide lenzen, maskeren omliggende lak en bevestigen dat restauratie de juiste optie is vóór we beginnen.",
      },
      {
        title: "Het lensoppervlak herstellen",
        description:
          "Mislukte UV-bescherming wordt verwijderd en de lens verfijnd tot een glad, coating-klaar oppervlak met professionele apparatuur in een gecontroleerde werkplaats.",
      },
      {
        title: "Fabrieksstijl bescherming aanbrengen",
        description:
          "Een OEM UV-hardcoat herstelt de beschermlaag die uw koplampen vanuit de fabriek verloren.",
      },
      {
        title: "Uitharden, inspecteren en afleveren",
        description:
          "De coating wordt ter plaatse gehard vóór u vertrekt. U ziet voor en na, en rijdt weg zonder een voorzichtige rit naar huis.",
      },
    ],
    proofTitle: "Waarom klanten voor SHINES kiezen",
    proofIntro:
      "We focussen op resultaten en normen die u bij aflevering kunt verifiëren, niet op werkplaatsjargon.",
    proof: [
      {
        title: "Volledig gehard vóór u vertrekt",
        description:
          "Anders dan ongeharde sealants of lucht-droog coatings hardt onze uitharding in de shop de afwerking af vóór aflevering. Geen voorzichtige rit, geen stofvrije garage overnight, geen dagen wachten vóór u mag wassen.",
        source: "SHINES servicenorm",
      },
      {
        title: "AMECA-geteste UV-prestatie",
        description:
          "We gebruiken een professionele UV-hardcoat getest onder automotive UV-blootstelling. Dat is de categorie bescherming waarvoor fabriekslenzen zijn ontworpen.",
        source: "Automotive compliancenormen",
      },
      {
        title: "Industriestandaard restauratiereeks",
        description:
          "Professionele restauratie volgt één kernreeks: strip de mislukte coat, verfijn het oppervlak, breng UV-hardcoat aan en hard uit. Geen eenstaps polijstbeurt.",
        source: "Professionele koplamprestauratie-industrie",
      },
      {
        title: "Specialisten in koplamprestauratie",
        description:
          "We doen één service, professioneel. Elke lens wordt beoordeeld, gerestaureerd en geïnspecteerd door opgeleide technici volgens dezelfde norm.",
        source: "SHINES",
      },
      {
        title: "Ongeveer 30–60 minuten per lens",
        description:
          "Restauratie plus volledige uitharding in de shop duurt typisch ongeveer 30–60 minuten per koplamp of achterlicht, of ongeveer 45–90 minuten voor beide koplampen afhankelijk van formaat en oxidatie. De coating is volledig gehard vóór u vertrekt.",
        source: "SHINES servicenorm",
      },
    ],
    comparisonTitle: "DIY-kit vs. professionele restauratie",
    comparisonHeaders: {
      aspect: "Factor",
      diy: "DIY / snelle polijst",
      professional: "SHINES",
    },
    comparisonRows: [
      {
        aspect: "Wat wordt verwijderd",
        diy: "Enkel oppervlaktemist. Oude UV-laag blijft vaak onderaan.",
        professional: "Mislukte fabriek UV-coat volledig gestript vóór recoating",
      },
      {
        aspect: "Afwerkingsbescherming",
        diy: "Wax, sealant of zwakke spray. Vergelt opnieuw binnen maanden.",
        professional: "UV-geharde OEM-hardcoat die jarenlang beschermt",
      },
      {
        aspect: "Materiaal & werkplaats",
        diy: "Handpad, boormachine-opzetstuk of oprit",
        professional: "Professioneel gereedschap in gecontroleerde binnenwerkplaats",
      },
      {
        aspect: "Wanneer u vertrekt",
        diy: "Zachte of plakkerige afwerking. Stof, regen en wassen vermijden gedurende dagen.",
        professional: "Volledig gehard ter plaatse. Meteen naar huis rijden.",
      },
      {
        aspect: "Inspectie",
        diy: "Geen gestructureerde voor- en na-controle",
        professional: "Voor- en na-inspectie zodat u het verschil ziet",
      },
      {
        aspect: "Duurzaamheid",
        diy: "Weken tot maanden vóór mist terugkeert",
        professional: `Jaren helderheid met correcte UV-bescherming, met ${warrantyNl.toLowerCase()}`,
      },
    ],
    standardsTitle: "Onze normen bij elke job",
    standards: [
      "Binnenwerkplaats met gecontroleerde omgeving tegen verontreiniging",
      "Voor- en na-inspectie bij elke restauratie",
      "Beoordeling vóór start: we zeggen eerlijk wanneer vervanging veiliger is",
      "Vaste online prijzen zonder offertegedoe",
    ],
    closingTitle: "Klaar voor fabriekheldere koplampen?",
    closingBody: `Boek online in enkele minuten. Vaste prijzen vanaf ${pairFrom} voor beide koplampen. Bezoek onze garage in ${loc}, kies mobiele service of stuur op in heel Europa.`,
    backHome: "Terug naar home",
  },
  faq: {
    title: "Veelgestelde vragen",
    intro:
      "Duidelijke antwoorden over professionele koplamprestauratie in België en postservice in heel Europa: proces, prijzen, timing, keuring en het verschil met DIY-kits.",
    contactPrompt: "Staat uw vraag er niet bij?",
    contactOr: "of",
    contactLink: "neem contact op",
    items: [
      {
        question: "Wat houdt professionele koplamprestauratie in?",
        answer: `SHINES herstelt polycarbonaten koplamplenzen met een professioneel meerstappenproces: we inspecteren elke lens, maskeren omliggende lak, verwijderen de mislukte fabriek UV-laag (niet enkel oppervlaktemist), verfijnen de lens tot een glad coating-klaar oppervlak, brengen een OEM UV-hardcoat aan en harden volledig uit in de werkplaats vóór aflevering. U ziet het resultaat vóór u vertrekt. Stap-voor-stap overzicht: ${processUrl}.`,
      },
      {
        question: "Welke schade aan koplampen kunnen jullie herstellen?",
        answer:
          "We kunnen externe oxidatie, vergeling, troebeling, haziness, verkleuring en lichte tot matige krassen op polycarbonaten lenzen verwijderen. Diepe scheuren, chips door de lens of sterk gesmolten plastic kunnen vervanging vereisen. We beoordelen elke lens eerlijk vóór we beginnen en adviseren nieuwe units wanneer restauratie niet de veilige keuze is.",
      },
      {
        question: "Komt het mistige uiterlijk van binnen in de koplamp?",
        answer:
          "Meestal niet. De meeste troebele koplampen worden veroorzaakt door UV-afbraak en oxidatie aan de buitenkant van de polycarbonaten lens. Intern vocht is zeldzaam en wijst vaak op een gebroken of versleten afdichting waardoor condens in de behuizing komt. Koplampen hebben ventilatie; warmte van de lamp wist licht vocht na verloop van tijd. Zien we interne schade bij inspectie, dan zeggen we of restauratie of vervanging passend is.",
      },
      {
        question: "Zijn koplamplenzen van glas of kunststof?",
        answer:
          "De meeste moderne koplampen gebruiken polycarbonaat: lichter, slagvast en aerodynamisch gevormd. Oudere of eenvoudigere wagens (sommige trucks, bestelwagens en klassiekers) kunnen nog glas hebben. SHINES specialiseert zich in professioneel herstel en UV-recoating van polycarbonaten lenzen, de overgrote meerderheid op Belgische en Europese wegen vandaag.",
      },
      {
        question: "Moet ik mijn koplampen demonteren vóór restauratie?",
        answer:
          "Nee. Koplampen kunnen op de wagen blijven. Dat is onze voorkeur. We maskeren en tapen rond elke lamp om uw lak te beschermen. Een open motorkap geeft betere toegang. Zijn uw koplampen al gedemonteerd (bijvoorbeeld na carrosseriewerk), dan kunnen we ze op de werkbank restaureren; vermeld het bij het boeken.",
      },
      {
        question: "Hoe lang duurt koplamprestauratie?",
        answer: `In onze garage in ${loc}: ${turnaroundLocalDetailNl} Postorders in heel Europa duren typisch ${turnaroundMailInNl.toLowerCase()}, plus verzendtijd heen en terug.`,
      },
      {
        question: "Mag ik meteen na restauratie rijden?",
        answer:
          "Ja. Anders dan shops die enkel polijsten en u uren of dagen laten wachten op een drogende sealant, UV-hardt SHINES elke lens ter plaatse vóór aflevering. De coating is hard wanneer u vertrekt, zonder voorzichtige rit, stofvrije garage overnight of beperking vóór regen of wassen.",
      },
      {
        question: "Waarom SHINES in plaats van een DIY koplamprestauratiekit?",
        answer:
          "DIY-kits kunnen lichte mist helpen bij zorgvuldig gebruik, maar ze zijn one-size-fits-all: verkeerd korrel of druk kan erger krassen geven, veel kits verwijderen zware oxidatie niet, en budget sealants falen vaak binnen maanden. SHINES past schuren, compounds en coating aan per lens op basis van fabrikant, formaat en schade, met professioneel gereedschap, OEM UV-hardcoat en uitharding in de shop. Elke job inclusief onze helderheidsgarantie, geen generieke doosgarantie.",
      },
      {
        question: "Wat kost koplamprestauratie in België?",
        answer: `Transparante prijzen vanaf ${pairFrom} voor beide koplampen (${singleFrom} voor één lens). Postrestauratie in heel Europa vanaf ${mailInFrom} plus verzending. Eindprijs hangt af van koplampformaat, staat en servicemethode (garage, mobiel of post). U ziet de bevestigde prijs vóór u betaalt.`,
      },
      {
        question: "Is koplamprestauratie de moeite vs. nieuwe koplampen?",
        answer:
          "Nieuwe OEM-koplampunits kosten vaak €300–€800 of meer per zijde, plus montage. Wanneer behuizingen, afdichtingen en elektronica nog intact zijn, herstelt professionele restauratie lichtsterkte en uiterlijk voor een fractie van die kost, met UV-bescherming ontworpen om jaren mee te gaan, niet weken.",
      },
      {
        question:
          "Halen gerestaureerde koplampen de technische keuring (keuring / contrôle technique)?",
        answer:
          "Gerestaureerde koplampen kunnen de keuring halen wanneer lichtsterkte en lenshelderheid aan de wettelijke zichtnorm voldoen. We beoordelen de staat vóór start en zeggen eerlijk wanneer vervanging de veiligere optie is voor veiligheid of keuring.",
      },
      {
        question: "Hoe lang blijven gerestaureerde koplampen helder?",
        answer: `Met de mislukte UV-laag verwijderd en een professionele hardcoat opnieuw aangebracht, houden resultaten typisch jaren aan, niet maanden zoals snelle buff-and-seal jobs. Elke SHINES-restauratie inclusief onze ${warrantyNl.toLowerCase()}.`,
      },
      {
        question: "Bedienen jullie klanten buiten België?",
        answer: `Ja. Bezoek onze werkplaats in ${loc}, boek mobiele service waar beschikbaar, of gebruik postrestauratie overal in Europa. We begeleiden u bij veilig verpakken, heenzending en geoffreerde retourlevering.`,
      },
    ],
  },
  footer: {
    finePrint: [
      `Getoonde prijzen zijn startprijzen vanaf ${pairFrom} voor beide koplampen. Eindprijs hangt af van formaat, staat en servicemethode. Bevestigd op de boekingspagina vóór u betaalt.`,
      `Retourverzending per post wordt apart geoffreerd op basis van uw locatie. Lokale doorlooptijd is ${turnaroundLocalNl.toLowerCase()}. Postorders duren typisch ${turnaroundMailInNl.toLowerCase()}.`,
      `Elke restauratie inclusief onze ${warrantyNl.toLowerCase()}. Resultaat hangt af van lensstaat; we beoordelen elke koplamp vóór we beginnen.`,
    ],
    breadcrumb: "Koplamprestauratie",
    followTitle: "Volg SHINES",
    copyrightTemplate: `Copyright © {year} ${site.name}. Alle rechten voorbehouden. Koplamprestauratie, {location} & Europa.`,
    contactLineBooking: `Boek online op ${site.url.replace("https://", "")}/book of mail ${site.email}.`,
    contactLineEmail: `Vragen? Mail ${site.email}.`,
    columns: {
      bookPricing: {
        title: "Boeken & prijzen",
        links: [
          { label: "Boek online", href: "/book" },
          { label: "Prijzen", href: pricingPagePath },
          {
            label: `Eén koplamp vanaf ${singleFrom}`,
            href: "/book",
          },
          {
            label: `Paar vanaf ${pairFrom}`,
            href: "/book",
          },
          {
            label: `Post vanaf ${mailInFrom}`,
            href: "/book",
          },
        ],
      },
      learn: {
        title: "Ontdek",
        links: [
          { label: "Nieuws", href: "/news" },
          { label: "Hoe het werkt", href: "/#how-it-works" },
          { label: "Ons proces", href: processPagePath },
          { label: "Waarom restaureren", href: "/#technology" },
          { label: "Resultaten", href: "/#proof" },
          { label: "FAQ", href: "/#faq" },
        ],
      },
      service: {
        title: "Service",
        links: [
          { label: `Garage in ${loc}`, href: "/contact" },
          { label: "Belgische steden", href: locationsPagePath },
          { label: "Europa", href: europeHubPath },
          { label: "Mobiele service", href: "/book" },
          { label: "Post (Europa)", href: "/book" },
          { label: site.email, href: mailtoQuote() },
        ],
      },
      shines: {
        title: "SHINES",
        links: [
          { label: "Over ons", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: warrantyNl, href: pricingPagePath },
          {
            label: site.url.replace("https://", ""),
            href: site.url,
          },
        ],
      },
    },
    legal: {
      privacy: "Privacybeleid",
      terms: "Gebruiksvoorwaarden",
      warranty: "Garantie",
      locations: "Locaties",
      europe: "Europa",
    },
    changeRegionLabel: "Land of regio wijzigen",
  },
  europe: {
    hubTitle: "Koplamprestauratie in heel Europa",
    hubDescription:
      "SHINES is gevestigd in België met professionele garageservice lokaal en veilige postrestauratie voor bestuurders in heel Europa. Selecteer uw land voor servicedetails en prijzen.",
    countryTitleTemplate: "Koplamprestauratie in {country}",
    countryIntroTemplate: `Professionele koplamprestauratie voor bestuurders in {country} ({countryLocal}). Stuur uw koplampen naar onze Belgische werkplaats of bezoek ons in ${loc}. UV-gehard, hard vóór u vertrekt.`,
    mailInNote:
      "Postservice omvat begeleide verpakking, tracking, restauratie en geoffreerde retourlevering naar uw adres.",
    belgiumGarage: `Garageservice in ${loc}`,
    viewPricing: "Bekijk prijzen",
  },
  locations: {
    belgiumTitle: "Servicelocaties in België",
    belgiumDescription:
      "Professionele koplamprestauratie in heel België. Selecteer uw stad voor meer info en online boeken. Postservice beschikbaar in heel Europa.",
    europeLink: "Alle Europese landen bekijken",
    cityWarrantyTemplate: `${warrantyNl}. ${turnaroundLocalNl}. Voor {city}, {province}, en heel België.`,
    cityBookCta: `Boek vanaf ${pairFrom}`,
    cityPricingCta: "Bekijk prijzen",
  },
  regions: {
    pageTitle: "Kies uw land of regio",
    pageIntro:
      "Selecteer een land of regio voor uw taal. Volledige site-inhoud is beschikbaar in het Engels, Nederlands, Frans en Duits.",
    breadcrumb: "Land of regio",
    groups: [{ title: "België" }, { title: "Europa" }, { title: "Andere regio's" }],
  },
  news: {
    indexTitle: "Nieuws",
    latestTitle: "Laatste nieuws",
    featuredSr: "Uitgelicht artikel",
    aboutTitle: `Over ${site.name} Nieuws`,
    aboutBody: `Updates, gidsen en servicenieuws van ${site.name}, uw specialist in professionele koplamprestauratie in België en heel Europa.`,
    relatedTitle: "Gerelateerde artikels",
    readMore: "Lees meer",
    categories: {
      UPDATE: "Update",
      GUIDE: "Gids",
      "PRESS RELEASE": "Persbericht",
      LOCAL: "Lokaal",
      "QUICK TIP": "Snelle tip",
    },
    subnav: {
      news: "Nieuws",
      about: "Over SHINES",
      process: "Ons proces",
    },
  },
  legal: {
    privacyHeading: "Privacybeleid",
    privacyBody: `We gebruiken boekings- en contactgegevens enkel om uw afspraak te bevestigen, restauratiewerk uit te voeren en op te volgen. We verkopen uw gegevens niet. Voor privacyvragen: ${site.email}.`,
    termsHeading: "Gebruiksvoorwaarden",
    termsBody: `Prijzen op ${site.url.replace("https://", "")} zijn startprijzen. Eindprijs wordt bevestigd op de boekingspagina vóór betaling. We beoordelen elke lens vóór we beginnen en adviseren wanneer vervanging de veiligere optie is. Garantievoorwaarden staan op onze prijspagina.`,
  },
  booking: {
    pageTitle: "Boek uw restauratie",
    pageIntro:
      "Kies het formaat van uw koplampen, hoe erg de schade is en hoe u service wilt. Uw prijs wordt direct bijgewerkt. Alle prijzen incl. BTW, tenzij u een BTW-factuur voor uw bedrijf aanvraagt.",
    stepLegends: {
      quantity: "1. Hoeveel koplampen?",
      quantitySingleMobile: "Mobiele bezoeken zijn niet beschikbaar voor één lamp.",
      size: "2. Welk formaat hebben uw koplampen?",
      sizeHint:
        "Kies op basis van uw wagen. Grotere of complexere lampen kosten meer tijd en materiaal.",
      condition: "3. Hoe erg zien ze eruit?",
      conditionHint: "Wees eerlijk. Diepere schade vraagt meer schuren en meer tijd.",
      service: "4. Hoe wilt u service ontvangen?",
    },
    contactDetailsTitle: "Wat zijn uw contactgegevens?",
    shipAddressNote:
      "We bewaren uw naam en retouradres zodat we uw pakket kunnen koppelen bij aankomst en uw koplampen veilig terugsturen.",
    mobileOutOfAreaNote:
      "Mobiele bezoeken zijn enkel beschikbaar in {area} (binnen {radius} km van onze werkplaats). Voor {country}, kies {shipLabel} of contacteer ons voor een offerte op maat.",
    distanceLoading: "Reisafstand berekenen…",
    distanceLoadingSlots: "Reisafstand berekenen vóór we tijden tonen…",
    mobileAddressRequired:
      "Vul hierboven uw volledige adres in om beschikbare afspraaktijden te zien.",
    submitEmailHint:
      "We sturen uw bevestiging meteen per e-mail. Vragen? Contacteer ons via",
    summaryTitle: "Uw boeking",
    summaryVat: "Incl. BTW · {warranty}",
    summaryLabels: {
      size: "Formaat",
      condition: "Staat",
      service: "Service",
      quantity: "Aantal",
      pair: "Beide koplampen",
      single: "Eén koplamp",
    },
    returnShippingNote:
      "Retourverzending wordt apart geoffreerd vóór we uw koplampen terugsturen.",
    priceFrom: "vanaf {price}",
    mobileTravelQuote:
      "{km} km enkele rit · Reiskosten {fee} (incl. BTW). {breakdown}",
    steps: {
      options: "Opties",
      details: "Uw gegevens",
      schedule: "Planning",
      confirm: "Bevestigen",
    },
    chooseOptions: "Kies uw opties",
    quantity: [
      {
        label: "Eén koplamp",
        description: "Restauratie van één lens",
      },
      {
        label: "Beide koplampen",
        description: "Meest populair, evenwichtig lichtbeeld",
      },
    ],
    sizes: [
      {
        label: "Standaard / Compact",
        description:
          "Kleine, platte of ronde lampen, bv. VW Golf, oudere sedans, stadsauto's.",
      },
      {
        label: "Groot / Wraparound",
        description:
          "Moderne lampen die teruglopen in de spatbord, bv. BMW, Audi, nieuwere SUV's.",
      },
      {
        label: "Complex / Oversized",
        description:
          "Extra grote trucklampen of lampen met scherpe hoeken, trim of complexe vormen.",
      },
    ],
    conditions: [
      {
        label: "Fase 1: Lichte troebeling",
        shortLabel: "Lichte troebeling",
        description:
          "Licht troebel of dof. Geen afbladderende laag, enkel verlies van originele glans.",
      },
      {
        label: "Fase 2: Zware oxidatie",
        shortLabel: "Zware oxidatie",
        description:
          "Duidelijke gele tint of korstig gevoel. Licht kan niet helder door.",
      },
      {
        label: "Fase 3: Ernstige schade",
        shortLabel: "Ernstige schade",
        description:
          "Afschilferende clear coat, of zichtbare diepe krassen door wegdebris.",
      },
    ],
    services: [
      {
        label: "Bezoek onze garage",
        description: "Onze meest betaalbare optie. Afleveren en wachten terwijl we werken.",
      },
      {
        label: "Stuur uw koplampen op",
        description: "Handige postservice voor grote afstanden in heel Europa.",
      },
      {
        label: "Wij komen naar u",
        description: `Geniet van het gemak van onze mobiele service, inclusief heen-en-terug reizen voor klanten tot ${site.mobileTravel.includedRadiusKm} km van ons (afstand enkele rit).`,
      },
    ],
    priceLabels: {
      base: "Basis",
      size: "Formaat",
      condition: "Staat",
      service: "Service",
      travel: "Reizen",
      total: "Totaal",
      mailInHandling: "Postafhandeling",
      mobileService: "Mobiele service",
    },
    continue: "Verder",
    back: "Terug",
    confirmBooking: "Boeking bevestigen & later betalen",
    whereTitle: {
      mobile: "Waar moeten we komen?",
      ship: "Vanwaar verstuurt u?",
      default: "Vul uw gegevens in",
    },
    whereSubtitle: "Vul uw naam en adres in:",
    fields: {
      firstName: "Voornaam",
      lastName: "Achternaam",
      suffix: "Achtervoegsel",
      street: "Straat en nummer",
      apartment: "Appartement, suite, toegangscode",
      postalCode: "Postcode",
      city: "Stad",
      country: "Land / Regio",
      businessAddress: "Dit is een zakelijk adres",
      companyName: "Bedrijfsnaam",
      vatNumber: "BTW-nummer",
      billingAddress: "Facturatieadres",
      email: "E-mailadres",
      phone: "Mobiel telefoonnummer",
      vehicle: "Merk & model wagen",
      notes: "Opmerkingen",
      preferredSlot: "Voorkeursdatum & tijd",
    },
    contactAside:
      "We mailen uw boekingsbevestiging onmiddellijk. Uw mobiel nummer helpt ons u te bereiken over afspraaktijd en reisdetails.",
    aboutSection: {
      ship: "Over uw boeking",
      default: "Over uw afspraak",
    },
    mailInHow: "Hoe post werkt",
    pairOnlyMobile:
      "We hebben uw boeking bijgewerkt naar beide koplampen. Mobiele bezoeken zijn niet beschikbaar voor één lamp.",
    slotError: "Dat tijdslot is niet meer beschikbaar. Kies een ander.",
    travelFeeNote:
      "Reiskosten uitgesloten van totaal. Binnen 24 uur handmatig bevestigd. Mobiele servicekost is inbegrepen.",
    validation: {
      firstName: "Vul uw voornaam in.",
      lastName: "Vul uw achternaam in.",
      street: "Vul straat en nummer in.",
      postalCode: "Vul uw postcode in.",
      city: "Vul uw stad in.",
      companyName: "Vul uw bedrijfsnaam in.",
      vatNumber: "Vul uw BTW-nummer in.",
      emailRequired: "Vul uw e-mailadres in.",
      emailInvalid: "Vul een geldig e-mailadres in.",
      phoneRequired: "Vul uw mobiel telefoonnummer in.",
      phoneInvalid: "Vul een geldig mobiel telefoonnummer in.",
      vehicle: "Vul merk en model van uw wagen in.",
      preferredSlot: "Kies uw voorkeursdatum en tijd.",
    },
    lookup: {
      title: "Zoek uw boeking",
      intro:
        "Geen account nodig. Vul de referentie uit uw bevestiging in (bv. SH-1001) en het e-mailadres dat u bij het boeken gebruikte. We openen uw privé boekingspagina.",
      label: "Boekingsreferentie",
      placeholder: "SH-1001",
      submit: "Open mijn boeking",
      error: "Boeking niet gevonden.",
    },
    hub: {
      title: "Mijn boeking",
      loading: "Uw boeking laden…",
      cancelled: "Deze boeking werd geannuleerd.",
      bookmarkShip:
        "Geen account nodig. Bookmark deze pagina om uw pakket te volgen en uw postboeking te beheren.",
      bookmarkDefault:
        "Geen account nodig. Bookmark deze pagina om uw afspraak te bekijken of te annuleren.",
      details: "Details",
      cancel: "Boeking annuleren",
      cancelConfirm:
        "Deze boeking annuleren? We geven uw afspraakslot vrij of verwachten uw pakket niet meer.",
      reference: "Uw boeking",
    },
    confirmation: {
      title: "Boeking bevestigd",
      referenceLine: "Referentie {reference}",
      totalLine: "Schatting {total} incl. BTW · {warranty}",
      stepsVisit: [
        "Kom op uw geplande tijdstip — gratis parkeren op locatie voor aflevering.",
        "Wij inspecteren uw koplampen en bevestigen de scope vóór we starten.",
        "Restauratie en UV-uitharding meestal terwijl u wacht (ongeveer 30–90 minuten voor beide lampen).",
        "Haal uw voertuig op met onze helderheidsgarantie — betalen in de werkplaats.",
      ],
      stepsMobile: [
        "Zorg dat het voertuig klaarstaat en de koplampen bereikbaar zijn op het geplande tijdstip.",
        "Onze technieker arriveert binnen het gereserveerde venster (reistijd zit in uw offerte).",
        "Wij restaureren en UV-uitharden ter plaatse — geen bezoek aan de werkplaats nodig.",
        "Bekijk het resultaat samen met ons; betaling na de service.",
      ],
      stepsShip: [
        "Boek online. We bewaren uw boeking en tonen referentie en verzendadres.",
        "Verpak uw koplampen stevig en verstuur via uw lokale vervoerder (goedkoopst voor u).",
        "Voeg uw trackingnummer toe op uw boekingspagina (optioneel maar aanbevolen).",
        "We mailen wanneer uw pakket aankomt. Is de restauratie klaar, betaal retourverzending één keer op uw boekingspagina, dan sturen we terug.",
      ],
      visitLocationTitle: "Bezoek ons op",
      shipToTitle: "Verzenden naar",
      shipToFallback:
        "We mailen het werkplaatsadres naar {email}. Contacteer ons als u het sneller nodig heeft.",
      openBooking: "Open mijn boeking",
      emailUs: "Mail ons",
      footnote:
        "Bewaar uw privé-link of referentie {reference}. Geen account nodig.",
      footnoteShip:
        "Bewaar uw privé-link of referentie {reference}. Schrijf de referentie duidelijk op de doos vóór verzending. Geen account nodig.",
      emailSent:
        "We hebben uw bevestiging gestuurd naar het opgegeven e-mailadres. Controleer ook uw spammap.",
      emailPending:
        "Uw boeking is opgeslagen. Geen bevestigingsmail binnen enkele minuten? Open uw boeking hieronder of contacteer ons.",
    },
    mailIn: {
      confirmationTitle: "Boeking bevestigd",
      confirmationSteps: [
        "Boek online. We bewaren uw boeking en tonen referentie en verzendadres.",
        "Verpak uw koplampen stevig en verstuur via uw lokale vervoerder (goedkoopst voor u).",
        "Voeg uw trackingnummer toe op uw boekingspagina (optioneel maar aanbevolen).",
        "We mailen wanneer uw pakket aankomt. Is de restauratie klaar, betaal retourverzending één keer op uw boekingspagina, dan sturen we terug.",
      ],
      shippingTitle: "Tracking heenzending",
      shippingCarrier: "Vervoerder",
      shippingTracking: "Trackingnummer",
      shippingSave: "Tracking opslaan",
      returnPayTitle: "Retourverzending",
      returnPayBody:
        "Uw restauratie is klaar. Betaal retourverzending in één stap, dan sturen we uw koplampen naar uw opgeslagen adres.",
      returnPayButton: "Betaal retourverzending",
      returnPaid: "Retourverzending betaald. We bereiden uw pakket voor op verzending.",
    },
    picker: {
      chooseDate: "Kies een datum en tijd",
      chooseTime: "Beschikbare tijden",
      noSlots: "Geen tijden meer op deze datum.",
      loading: "Datums laden…",
    },
  },
  mailInFlow: {
    steps: [
      "Boek online",
      "Verpak en verstuur zelf",
      "Gedocumenteerde intake",
      "Wij restaureren, UV-harden en sturen terug",
    ],
    stepDetails: [
      {
        title: "Boek online",
        description:
          "Kies hoeveel koplampen, formaat en staat, en selecteer post. Nog niet betalen; we bevestigen per e-mail.",
      },
      {
        title: "Verpak en verstuur zelf",
        description:
          "Demontage, verpakking en verzending zijn volledig uw verantwoordelijkheid. Verstuur enkel de koplampen in een stevige, goed gedempte doos met tracking en verzekering naar onze werkplaats in België.",
      },
      {
        title: "Gedocumenteerde intake",
        description:
          "Vóór we uw pakket openen, nemen we de unboxing op video op. We fotograferen elke koplamp vóór restauratie. Dat beschermt u en ons bij schade tijdens transport. Let op: we zijn niet verantwoordelijk voor transportschade of slechte verpakking.",
      },
      {
        title: "Wij restaureren, UV-harden en sturen terug",
        description: `Typische werkplaatstijd is ${turnaroundMailInNl.toLowerCase()}. We restaureren, harden de UV-coating volledig uit, inspecteren met foto's en sturen terug klaar om te monteren. Retourverzending wordt geoffreerd vóór verzending.`,
      },
    ],
    notes: [
      `Restauratie vanaf ${mailInFrom} per paar (excl. verzending heen en terug).`,
      "Retourverzending wordt geoffreerd op basis van uw land en doosgrootte vóór verzending.",
      "Verstuur enkel koplampunits, niet het volledige voertuig.",
      "Gebruik tracking en verzekering. Ontvangen we uw pakket niet, sturen we niets terug.",
      "Hoe u verpakt is uw verantwoordelijkheid. Bewaar uw verzendbewijs.",
      "Vocht in de behuizing of gebarsten lenzen? Vermeld het bij boeking; we beoordelen vóór we beginnen.",
      mailInNoteNl,
    ],
    shipToNote:
      "Schrijf uw boekingsreferentie op de buitenkant van de doos. Gebruik tracking en verzekering. We starten pas wanneer uw pakket aankomt. Ontvangen we het niet, sturen we niets terug.",
    visitNote: `Afleveren in onze garage in ${loc}. ${turnaroundLocalNl}. ${parkingNoteNl}`,
    unboxingNote:
      "Vóór we uw pakket openen, nemen we de unboxing op video op. We fotograferen elke koplamp vóór restauratie. Dat beschermt u en ons als lenzen gebarsten of beschadigd aankwamen. Let op: we zijn niet verantwoordelijk voor schade tijdens verzending of door slechte verpakking.",
    workshopNote: `Typische werkplaatstijd is ${turnaroundMailInNl.toLowerCase()}. We restaureren, harden de UV-coating volledig uit, inspecteren met foto's en sturen terug klaar om te monteren. Retourverzending wordt geoffreerd vóór verzending.`,
  },
  mailInStatus: {
    awaiting_parcel: "Wacht op pakket",
    in_transit: "Onderweg",
    arrived: "Aangekomen",
    in_workshop: "In werkplaats",
    ready_to_ship: "Klaar voor retour",
    return_shipped: "Retour verzonden",
    completed: "Afgerond",
  },
  mobilePricing: {
    manualQuoteTemplate:
      "{km} km enkele rit, we bevestigen uw reiskosten binnen 24 uur. Op deze afstand is post vaak voordeliger.",
    breakdownLabels: {
      regio: "Regio-reis",
      extra: "Extra km (heen en terug)",
      total: "Reistotaal",
    },
  },
  appointments: {
    goTo: "Open mijn boeking",
    returnTo: "Terug naar boeking",
    mailInAwaiting: "Post · wacht op pakket",
    mobileNoticeTemplate:
      "Mobiele bezoeken reserveren {hours} uur in uw agenda ({km} km enkele rit). Zorg dat het voertuig klaar staat op het aankomsttijdstip. Vertraging kan latere afspraken beïnvloeden.",
  },
  articles: [
    {
      slug: "why-headlights-turn-yellow-and-hazy",
      publishedAt: "2026-05-20",
      category: "GUIDE",
      title: "Waarom koplampen geel en troebel worden (en wat het echt oplost)",
      dek: "Fabrieks UV-bescherming faalt na verloop van tijd. Polijsten alleen vervangt die niet. Dit moeten bestuurders in België en heel Europa weten.",
      image: {
        src: "/news/why-headlights-turn-yellow-and-hazy.png",
        alt: "Voor en na koplamprestauratie: gele matte lens hersteld naar helder",
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
          text: "Leken uw koplampen helder toen de wagen nieuw was, maar gloeien ze nu geel of verspreiden ze licht 's nachts, dan is het probleem meestal geen vuil. Moderne koplampen zijn van polycarbonaat met een fabriek UV-hardcoat. Zon, weggrit en jarenlange warmtecycli breken die coat af. Faalt die, dan oxideert het plastic zelf.",
        },
        {
          type: "paragraph",
          text: "Een snelle polijstbeurt of DIY-kit kan lenzen enkele weken beter laten ogen. Het verwijdert oppervlaktemist maar laat het onderliggende plastic onbeschermd. Zonder nieuwe UV-hardcoat keert vergeling snel terug, vooral bij wagens buiten geparkeerd in het Belgische en Europese klimaat.",
        },
        {
          type: "heading",
          text: "Wat professionele restauratie verandert",
        },
        {
          type: "list",
          items: [
            "De mislukte fabriek UV-laag wordt volledig gestript, niet enkel gepolijst.",
            "De lens wordt verfijnd tot een glad, coating-klaar oppervlak.",
            "Een OEM UV-hardcoat vervangt de bescherming die de lens verloor.",
            "De coating wordt in de werkplaats gehard vóór aflevering, zodat u meteen naar huis kunt rijden.",
          ],
        },
        {
          type: "paragraph",
          text: `Bij ${site.name} volgen we die volledige reeks bij elke restauratie. Vaste prijzen vanaf ${pairFrom} voor beide koplampen. Boek online of lees ons procesoverzicht om te zien wat gebeurt wanneer u onze garage in ${loc} bezoekt.`,
        },
      ],
    },
    {
      slug: "professional-headlight-restoration-vs-diy-kits",
      publishedAt: "2026-05-18",
      category: "GUIDE",
      title: "Professionele koplamprestauratie vs DIY-kits: wat aanhoudt",
      dek: "Kits zijn goedkoop upfront. Professioneel werk kost één keer meer. Zo kiest u op basis van duurzaamheid, veiligheid en totale kost.",
      image: {
        src: "/news/professional-headlight-restoration-vs-diy-kits.png",
        alt: "Vergelijking professionele koplamprestauratie vs DIY-kits: troebel DIY-resultaat naast helder professioneel resultaat",
      },
      thumbnailClass: "from-[#2c2c2e] to-[#6e6e73]",
      tags: ["DIY headlight restoration", "headlight kits", "UV hard coat"],
      blocks: [
        {
          type: "paragraph",
          text: "DIY koplampkits beloven showroomhelderheid in een namiddag. Voor sommige bestuurders volstaat dat. Voor wie betrouwbaar nachtzicht jarenlang nodig heeft, is de kloof tussen opritpolijst en professionele restauratie groot.",
        },
        {
          type: "heading",
          text: "Waar DIY-kits tekortschieten",
        },
        {
          type: "list",
          items: [
            "De meeste kits polijsten het oppervlak zonder de mislukte UV-laag eronder volledig te verwijderen.",
            "Sealants en waxen zijn niet hetzelfde als een fabrieksstijl UV-hardcoat.",
            "Resultaten vervagen vaak binnen weken of maanden, vooral bij dagelijkse zon.",
            "Ongelijk schuren kan golvende lenzen geven die licht erger verspreiden dan vóór.",
          ],
        },
        {
          type: "heading",
          text: "Wat u krijgt met professionele restauratie",
        },
        {
          type: "list",
          items: [
            "Gecontroleerde werkplaats en doelgericht gereedschap voor consistente resultaten.",
            "Volledige strip, verfijn, coat en uitharding in de shop.",
            "Voor- en na-inspectie bij aflevering.",
            `${warrantyNl} op helderheid wanneer de lens geschikt is voor restauratie.`,
          ],
        },
        {
          type: "paragraph",
          text: "Vergelijkt u opties, bekijk onze prijspagina voor vaste startprijzen en boek een slot wanneer u klaar bent. Ernstig gebarsten of diep gepitte lenzen kunnen vervanging vereisen; we beoordelen eerlijk vóór we beginnen.",
        },
      ],
    },
    {
      slug: "shines-launches-headlight-restoration-belgium",
      publishedAt: "2026-05-15",
      category: "PRESS RELEASE",
      title: `${site.name} lanceert professionele koplamprestauratie in België`,
      dek: `Nieuwe service biedt UV-geharde OEM-resultaten vanaf ${pairFrom} per paar, met lokale garagebezoeken, mobiele opties en postservice in heel Europa.`,
      image: {
        src: "/news/shines-launches-headlight-restoration-belgium.png",
        alt: "SHINES lanceert professionele koplamprestauratie in België met voor en na koplampen in werkplaats",
      },
      thumbnailClass: "from-[#0b0b0e] to-[#0076df]",
      tags: ["SHINES", "Belgium", "headlight restoration", "AutoRepair"],
      blocks: [
        {
          type: "paragraph",
          text: `${site.name} kondigde vandaag professionele koplamprestauratie aan voor bestuurders in ${loc} en heel Europa. De service richt zich op matte, vergeelde en UV-beschadigde polycarbonaten lenzen met een strip-, recoat- en uithardingsworkflow in de werkplaats.`,
        },
        {
          type: "paragraph",
          text: `Typische doorlooptijd is ${turnaroundLocalNl.toLowerCase()} in de garage. Postklanten in heel Europa kunnen lenzen opsturen; retourverzending wordt apart geoffreerd. Elke job inclusief ${warrantyNl.toLowerCase()}.`,
        },
        {
          type: "heading",
          text: "Hoe boeken",
        },
        {
          type: "paragraph",
          text: `Klanten boeken online op ${site.url.replace("https://", "")}/book met vaste startprijzen vóór betaling. Vragen naar ${site.email}.`,
        },
      ],
    },
    {
      slug: "foggy-headlights-vehicle-inspection-belgium",
      publishedAt: "2026-05-12",
      category: "LOCAL",
      title: "Kunnen matte koplampen de keuring niet halen in België?",
      dek: "Troebele lenzen verminderen lichtsterkte en kunnen compliance-problemen geven. Dit moeten Belgische bestuurders controleren vóór keuring of lange nachtrit.",
      image: {
        src: "/news/foggy-headlights-vehicle-inspection-belgium.png",
        alt: "Matte vergeelde koplamp op een wagen in een Belgische keuringswerkplaats",
      },
      thumbnailClass: "from-[#003d6b] to-[#5ac8fa]",
      tags: ["Belgium", "vehicle inspection", "headlight clarity", "road safety"],
      blocks: [
        {
          type: "paragraph",
          text: "Belgische bestuurders merken koplampproblemen vaak eerst 's nachts: zwakke bundels, gele gloed of licht verspreid over de lens. Naast comfort beïnvloedt verminderde output hoe vroeg u voetgangers, fietsers en wegmarkeringen ziet.",
        },
        {
          type: "paragraph",
          text: "Keuringsregels focussen op of verlichting werkt zo bedoeld. Sterk getroebele of verkeerd uitgelijnde koplampen kunnen aandacht trekken omdat ze geen voorspelbaar lichtbeeld meer geven. Restauratie is vaak goedkoper dan vervanging wanneer de behuizing structureel intact is.",
        },
        {
          type: "heading",
          text: "Wanneer restauratie zinvol is",
        },
        {
          type: "list",
          items: [
            "Gele of troebele lenzen zonder grote scheuren of diepe gaten.",
            "Vocht in de behuizing moet eerst opgelost worden; we adviseren bij beoordeling.",
            "U wilt fabriekhelder licht zonder volledige koplampunits te betalen.",
          ],
        },
        {
          type: "paragraph",
          text: `${site.name} bedient bestuurders in heel België met garage, mobiel en post. Bekijk onze locatie-index voor stadspecifieke pagina's, of boek direct als u uw servicemethode kent.`,
        },
      ],
    },
    {
      slug: "mail-in-headlight-restoration-europe",
      publishedAt: "2026-05-08",
      category: "UPDATE",
      title: "Postrestauratie van koplampen nu beschikbaar in heel Europa",
      dek: `Stuur uw koplampunits naar ${site.name} voor dezelfde professionele UV-geharde afwerking als onze lokale garageservice.`,
      image: {
        src: "/news/mail-in-headlight-restoration-europe.png",
        alt: "SHINES postrestauratie koplampen met verpakte verzenddoos, gerestaureerde koplampen en bestelformulier",
      },
      thumbnailClass: "from-[#1c1c1e] to-[#48484a]",
      tags: ["mail-in", "Europe", "headlight restoration"],
      blocks: [
        {
          type: "paragraph",
          text: `Bestuurders buiten ${loc} kunnen nu de postservice van ${site.name} gebruiken. Demonteer de koplampunits, verpak ze stevig en stuur naar onze werkplaats. We restaureren, UV-harden en sturen terug klaar om te monteren.`,
        },
        {
          type: "paragraph",
          text: `Postprijzen vanaf ${mailInFrom} per paar. Typische doorlooptijd ${turnaroundMailInNl.toLowerCase()}. Retourverzending wordt geoffreerd op basis van uw land vóór u bevestigt.`,
        },
        {
          type: "heading",
          text: "Vóór u verstuurt",
        },
        {
          type: "list",
          items: [
            "Boek online en kies post zodat we verpakkingsrichtlijnen kunnen sturen.",
            "Fotografeer lenzen vooraf voor uw administratie.",
            "Noteer scheuren, vocht of gebroken bevestigingen in de boekingsopmerkingen.",
          ],
        },
      ],
    },
    {
      slug: "drive-away-fully-cured-why-in-shop-hardening-matters",
      publishedAt: "2026-05-05",
      category: "QUICK TIP",
      title: "Vertrek volledig gehard: waarom uitharding in de werkplaats telt",
      dek: "Sommige coatings blijven dagen zacht na aanbrengen. Onze is gehard vóór aflevering zodat regen, stof en de rit naar huis de afwerking niet ruïneren.",
      image: {
        src: "/news/drive-away-fully-cured-why-in-shop-hardening-matters.png",
        alt: "UV-geharde koplamprestauratie in professionele werkplaats met uithardingslamp",
      },
      thumbnailClass: "from-[#0076df] to-[#64d2ff]",
      tags: ["UV cure", "headlight coating", "drive home"],
      blocks: [
        {
          type: "paragraph",
          text: "Niet elke koplampenservice hardt de nieuwe UV-coating volledig uit vóór u vertrekt. Lucht-droog of ongeharde sealants kunnen uren of dagen plakkerig blijven. Stof, vingerafdrukken of lichte regen op de rit naar huis kunnen de lens dan beschadigen.",
        },
        {
          type: "paragraph",
          text: `${site.name} hardt elke restauratie ter plaatse uit vóór aflevering. U kunt meteen rijden, de wagen wassen wanneer u normaal zou, en de voorzichtige overnight garage-routine overslaan die sommige shops nog vragen.`,
        },
        {
          type: "paragraph",
          text: "Het is een van de eenvoudigste vragen aan elke aanbieder: is de coating volledig gehard vóór ik vertrek? Is het antwoord nee, tel het risico op herwerk en verloren tijd mee.",
        },
      ],
    },
  ],
};
