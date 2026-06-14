import { locationsPagePath } from "@/lib/belgium-locations";
import { europeHubPath } from "@/lib/europe-countries";
import { fieldCategoriesHubPath } from "@/lib/field-categories";
import { buildFieldCategoryMessagesDe } from "@/lib/field-category-content-de";
import { pricingPagePath } from "@/lib/pricing";
import { processPagePath } from "@/lib/process";
import { formatPrice, locationLabel, mailtoQuote, site } from "@/lib/site";
import type { DeepPartial } from "../merge";
import type { SiteMessages } from "../types";

const processUrl = `${site.url}${processPagePath}`;
const loc = locationLabel();
const pairFrom = formatPrice(site.pricing.pair.from);
const singleFrom = formatPrice(site.pricing.single.from);
const mailInFrom = formatPrice(site.pricing.mailIn.from);

export const dePatch: DeepPartial<SiteMessages> = {
  common: {
    included: "Inklusive",
    optional: "Optional",
    close: "Schließen",
    loading: "Wird geladen…",
    bookFromTemplate: "Ab {price} buchen",
    viewPricing: "Preise ansehen",
    contact: "Kontakt",
    seeProcess: "Unseren Ablauf ansehen",
    bookNow: "Jetzt buchen",
    backToHome: "Zur Startseite",
    breadcrumbHome: "Start",
    europe: "Europa",
    locations: "Standorte",
    shinesHome: `${site.name} Startseite`,
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    menu: "Menü",
    previous: "Zurück",
    next: "Weiter",
  },
  meta: {
    homeTitle: `Scheinwerfer-Restaurierung ${loc} | ${site.name}`,
    homeDescription: `Professionelle Scheinwerfer-Restaurierung in ${loc}. Trübe, vergilbte Scheinwerfer ab ${pairFrom}. Werkstatt vor Ort oder Postservice in ganz Europa.`,
    aboutTitle: `Über ${site.name} | Professionelle Scheinwerfer-Restaurierung`,
    aboutDescription: `${site.name} stellt trübe, vergilbte Scheinwerfer wieder her mit OEM-UV-Hardcoat und Werkstatt-Aushärtung in ${loc}. Postservice in ganz Europa.`,
    contactTitle: `Kontakt & Besuch | ${site.name}`,
    contactDescription: `Kontaktieren Sie ${site.name} für Scheinwerfer-Restaurierung in ${loc}. Online buchen, E-Mail an ${site.email}, oder Fragen zu Mobile- und Postservice in Europa.`,
    pricingTitle: `Preise | Scheinwerfer-Restaurierung ab ${pairFrom} | ${site.name}`,
    pricingDescription: `Feste Preise für Scheinwerfer-Restaurierung ab ${pairFrom} für beide Scheinwerfer. Feste Preise, keine versteckten Gebühren. Optionen auf der Buchungsseite wählen und den genauen Preis sofort sehen.`,
    processTitle: `Scheinwerfer-Restaurierungsprozess | ${site.name}`,
    processDescription: `${site.name} restauriert Scheinwerfer mit professionellem Abtragen, Neubeschichten und Werkstatt-UV-Aushärtung. Pro Scheinwerfer oder Rücklicht typischerweise etwa 30–60 Minuten; beide Scheinwerfer meist etwa 45–90 Minuten je nach Größe und Zustand. Beim Abholen ist der Lack bereits ausgehärtet. Keine vorsichtige Heimfahrt, kein staubfreie Garage über Nacht. Ergebnisse sind UV-geschützt und durch unsere ${site.warranty.toLowerCase()} abgedeckt.`,
    bookTitle: `Scheinwerfer-Restaurierung buchen | ${site.name}`,
    bookDescription: `Professionelle Scheinwerfer-Restaurierung online buchen. Feste Preise ab ${pairFrom}. Besuch in ${loc}, Mobile-Service oder Post in ganz Europa.`,
    newsTitle: `News | Scheinwerfer-Restaurierung Ratgeber & Updates | ${site.name}`,
    newsDescription: `Ratgeber, Updates und Expertenrat zur Scheinwerfer-Restaurierung in ${loc} und in ganz Europa. Gelbe Scheinwerfer, UV-Beschichtung, Prüftipps und ${site.name} Service-News.`,
    locationsTitle: `Standorte in Belgien | ${site.name}`,
    locationsDescription: `Professionelle Scheinwerfer-Restaurierung in ganz Belgien. Stadt wählen. Postservice in ganz Europa verfügbar.`,
    regionTitle: `Land oder Region wählen | ${site.name}`,
    regionDescription: `Wählen Sie Ihr Land oder Ihre Region für ${site.name} Scheinwerfer-Restaurierung und Spracheinstellungen.`,
    bookingLookupTitle: `Buchung finden | ${site.name}`,
    bookingLookupDescription: `${site.name}-Buchung mit Referenz und E-Mail nachschlagen. Kein Konto erforderlich.`,
    myBookingTitle: `Meine Buchung | ${site.name}`,
    privacyTitle: `Datenschutz | ${site.name}`,
    privacyDescription: `Wie ${site.name} Ihre Buchungs- und Kontaktdaten verwendet. Wir verkaufen Ihre Daten nicht.`,
    termsTitle: `Nutzungsbedingungen | ${site.name}`,
    termsDescription: `Bedingungen für ${site.url.replace("https://", "")} und die Buchung von Scheinwerfer-Restaurierung bei ${site.name}.`,
    cityTitleTemplate: `Scheinwerfer-Restaurierung {city} | ${site.name}`,
    cityDescriptionTemplate:
      "Professionelle Scheinwerfer-Restaurierung in {city}, {province}. Online ab {price} buchen. UV-ausgehärtet vor der Abfahrt.",
    fieldsHubTitle: "Fachgebiete | Scheinwerfer-Restaurierung und Optik",
    fieldsHubDescription:
      "Was SHINES in Ingelmunster macht: Wartung und Prüfungsbereitschaft, kosmetischer Smart Repair, professionelles Linsen-Detailing und vollständige optische Restaurierung, abgestimmt auf unsere Werkstatt-Expertise.",
  },
  nav: {
    home: "Start",
    process: "Ablauf",
    pricing: "Preise",
    news: "News",
    about: "Über uns",
    contact: "Kontakt",
    bookNow: "Buchen",
    locationsBelgium: "Belgien",
    locationsEurope: "Europa",
  },
  hero: {
    title: "Sicher fahren bei Dunkelheit",
    subtitle: `Trübe Scheinwerfer schmälern die Sicht, wenn Sie sie am meisten brauchen. ${site.name} stellt Klarheit wieder her, damit Sie weiter sehen, sicherer fahren und die Prüfung bestehen in ${loc} oder per Post in ganz Europa.`,
    cta: "Scheinwerfer jetzt instand setzen",
    secondary: "Vorher / Nachher",
  },
  restoration: {
    title: "Warum Scheinwerfer versagen und warum Warten gefährlich ist",
    intro:
      "Jede Woche kommen Fahrer zu Shines mit Scheinwerfern, die so trüb sind, dass sie die Straße kaum erkennen. Das ist kein Kosmetikproblem, sondern eine Sicherheitsfrage. Das passiert mit Ihren Lichtern:",
    reasons: [
      {
        title: "Oxidation",
        text: "Scheinwerfer können durch langanhaltende UV-Strahlung vergilben. Besonders häufig bei Fahrzeugen, die nicht in einer Garage stehen.",
      },
      {
        title: "Wasserdampf",
        text: "Ist die wasserdichte Dichtung am Scheinwerfer abgenutzt oder beschädigt, kann Wasserdampf in der Acrylglocke kondensieren. Besonders gefährlich bei Nachtfahrten.",
      },
      {
        title: "Fahrbedingungen",
        text: "Ihr Auto trifft täglich Staub, Schmutz und Steinschlag. Kratzer und Abschürfungen an der Linse mindern die Lichtwirkung mit der Zeit.",
      },
    ],
    cta: "Kostenlose Einschätzung anfordern",
    imageAlts: {
      yellowed: "Vor der Restaurierung: vergilbte und trübe Scheinwerferlinse",
      restored: "Nach der Restaurierung: kristallklare Scheinwerferlinse",
      mustang: "Ford Mustang mit restaurierten Scheinwerfern in einer Tiefgarage",
    },
  },
  value: {
    outcomesTitle: "Was sich ändert, wenn Ihre Scheinwerfer restauriert sind",
    outcomesIntro:
      "Scheinwerfer-Restaurierung geht nicht ums Aussehen. Es geht um Sicht und Vertrauen, die Sie verloren haben.",
    outcomes: [
      {
        title: "Die Straße wieder sehen",
        description:
          "Restaurierte Linsen verbessern die Lichtleistung, sodass Regen, unbeleuchtete Straßen und Gegenverkehr wieder beherrschbar wirken, nicht etwas, das Sie mit Anspannung meistern.",
      },
      {
        title: "Fahren ohne dieses mulmige Gefühl",
        description:
          "Kein Raten mehr, wie weit Sie sehen. Kein Meiden von Nachtfahrten, weil Ihre Lichter im entscheidenden Moment versagen.",
      },
      {
        title: "Prüfung bestehen. Wiederverkaufswert schützen.",
        description:
          "Klare Scheinwerfer helfen bei der technischen Prüfung und lassen Ihr Auto gepflegt wirken. Käufer bemerken sofort, wenn die Linsen wie neu aussehen.",
      },
    ],
    turnaroundNote: `Die meisten lokalen Restaurierungen sind innerhalb von ${site.turnaround.local.toLowerCase()} fertig, abgedeckt durch unsere ${site.warranty.toLowerCase()}. Jede Linse wird vor Ort UV-ausgehärtet, ausgehärtet vor der Abfahrt, nicht Tage später.`,
    trustTitle: "Vertrauen von Fahrern in Belgien und Europa",
    trustIntro:
      "Echte Ergebnisse von echten Fahrern: wiederhergestellte Klarheit, sichereres Nachtfahren und Scheinwerfer, die klar bleiben, weil wir sie richtig versiegeln.",
    trustCards: [
      {
        eyebrow: "Ablauf",
        title: "OEM-Prozess",
        description:
          "Gleiche Standards wie die Branche, die Ihre Scheinwerfer baut, abgeschlossen mit Werkstatt-UV-Aushärtung, damit der Lack vor der Abfahrt ausgehärtet ist.",
        linkLabel: "Unseren Ablauf lesen",
      },
      {
        eyebrow: "Ergebnisse",
        title: "Vorher und Nachher, jedes Mal",
        description:
          "Sie sehen den Unterschied vor der Abfahrt. Kristallklare Linsen mit professioneller Versiegelung und UV-Schutz.",
      },
      {
        eyebrow: "Service",
        title: "Werkstatt in Belgien, europaweit",
        description: `Lokal abgeben in ${loc}, oder Scheinwerfer für Post-Restaurierung in ganz Europa einsenden.`,
      },
    ],
    bookCta: "Jetzt buchen",
  },
  howItWorks: {
    title: "Kristallklare Scheinwerfer in 3 einfachen Schritten",
    intro:
      "Kein Rätselraten. Keine Abkürzungen. Ein bewährter Ablauf, der Ihre Sicherheit zuerst setzt, dann die Technik, die es dauerhaft macht.",
    introLink: "Jetzt buchen",
    steps: [
      {
        eyebrow: "Schritt 1",
        title: "Online buchen",
        description:
          "Größe, Zustand und Servicemethode wählen. Der Preis aktualisiert sich sofort, kein Angebot nötig.",
      },
      {
        eyebrow: "Schritt 2",
        title: "Besuchen oder einsenden",
        description: `Abgabe in ${loc}, Mobile-Service wählen oder Scheinwerfer in ganz Europa einsenden.`,
      },
      {
        eyebrow: "Schritt 3",
        title: "Sicher fahren",
        description:
          "Wir restaurieren, UV-härten und prüfen Ihre Linsen vor Ort. Der Lack ist vor der Abfahrt ausgehärtet. Keine vorsichtige Heimfahrt oder staubfreie Garage über Nacht.",
      },
    ],
    processBody:
      "Unser Prozess nutzt professionelle Ausrüstung und OEM-trusted Restaurierungsstandards, denn eine Abkürzung heute bedeutet Vergilbung in sechs Monaten.",
    processLink: "Vollständige Prozessstudie lesen",
    carouselLabel: "So funktioniert Scheinwerfer-Restaurierung",
  },
  bookCta: {
    title: "Bereit, die Straße wieder klar zu sehen?",
    body: "In Minuten online buchen. Größe, Zustand und Servicemethode wählen. Der Preis aktualisiert sich sofort. Kein Angebot nötig.",
    link: "Jetzt buchen",
  },
  about: {
    title: "Professionelle Scheinwerfer-Restaurierung, nichts anderes",
    intro: `${site.name} existiert für eine Aufgabe: trübe, vergilbte Scheinwerfer auf werkstattklare Sicht zurückbringen und richtig schützen. Keine schnellen Polituren oder andere Autoservices. Jede Linse durchläuft denselben OEM-Ablauf: abtragen, neu beschichten und Werkstatt-UV-Aushärtung vor der Abfahrt.`,
    whyTitle: "Warum OEM-Qualität zählt",
    whyBody:
      "Fehlgeschlagener UV-Schutz ist der Grund, warum Scheinwerfer nach einer Politur wieder trüb werden. Wir entfernen diese Schicht vollständig, tragen einen OEM-Hardcoat auf und UV-härten vor Ort, sodass der Finish beim Verlassen ausgehärtet ist. Das ist der Unterschied zwischen Wochen Klarheit und Jahren.",
    whereTitle: "Wo wir arbeiten",
    whereBody: `Besuchen Sie unsere Werkstatt in ${loc}, wählen Sie Mobile-Service oder senden Sie Scheinwerfer per Post in ganz Europa. Gleicher Ablauf, gleiche Garantie, ob lokal oder per Post.`,
    promiseTitle: "Unser Versprechen",
    promiseItems: [
      site.warranty,
      `${site.turnaround.local} in unserer Werkstatt`,
      "Vorher- und Nachher-Prüfung bei jeder Restaurierung",
      "Feste Preise online, keine Angebotsanrufe",
    ],
    processTitle: "Den vollen Ablauf ansehen",
    processBody:
      "Equipment, Phasen und warum UV-Aushärtung vor Übergabe alles für Fahrer ändert, die dauerhafte Klarheit brauchen.",
    processLink: "Unsere Prozessstudie lesen",
    cta: "Restaurierung buchen",
  },
  contact: {
    title: "Kontakt & Besuch",
    intro:
      "Online buchen für die schnellste Antwort, oder uns direkt kontaktieren bei Fragen zu Abgabe, Mobile-Service oder Post-Restaurierung in Europa.",
    addressTitle: "Adresse",
    addressPendingTemplate:
      "Vollständige Adresse folgt in Kürze. Buchen Sie online oder mailen Sie uns für Wegbeschreibung in {location}.",
    directionsLabel: "Wegbeschreibung",
    hoursTitle: "Öffnungszeiten",
    hoursRows: [
      { days: "Montag – Freitag", hours: "Nach Vereinbarung" },
      { days: "Samstag", hours: "Nach Vereinbarung" },
      { days: "Sonntag", hours: "Geschlossen" },
    ],
    reachTitle: "Erreichen Sie uns",
    dropOffTitle: "Abgabe & Post",
    mapSrOnly: "Karte",
    mapPlaceholder:
      "Die Karte erscheint hier, sobald Ihre Google-Maps-Einbettungs-URL in den Site-Einstellungen hinterlegt ist.",
    viewAllLocations: "Alle Standorte ansehen",
    parkingNote: "Kostenlose Parkplätze vor Ort für die Abgabe.",
    mailInNote:
      "Postsendungen nutzen dieselbe Werkstattadresse. Verpackung und Versand liegen in Ihrer Verantwortung.",
    bookCta: "Online buchen",
    emailCta: "Kontakt aufnehmen",
  },
  pricing: {
    title: "Restaurierung, die hält. Keine schnelle Politur.",
    summary:
      "Feste Preise für professionelle Scheinwerfer-Restaurierung. Keine Angebotsanrufe, keine versteckten Gebühren. Optionen auf der Buchungsseite wählen und den genauen Preis sofort sehen.",
    bookLink: "Jetzt buchen",
    comparisonTitle: "Warum SHINES",
    comparisonIntro:
      "Wir machen nur professionelle Scheinwerfer-Restaurierung. Das heißt abtragen, neu beschichten und UV-Aushärtung, keine schnelle Politur. Das ist im Vergleich zu einem DIY-Kit zu Hause enthalten.",
    tableHeadAspect: "",
    tableHeadShines: "SHINES",
    tableHeadDiy: "DIY-Kit",
    comingSoon: "Demnächst",
    tiersTitle: "Startpreise",
    modifiersTitle: "Was Ihren Preis bestimmt",
    footerCta: "Bereit zu buchen?",
    tiers: [
      {
        label: "Restaurierung eines Scheinwerfers",
        description: "Eine trübe, zerkratzte oder vergilbte Linse.",
        includes: "Restaurieren, versiegeln und UV-gehärteter Hardcoat.",
      },
      {
        label: "Paar (beide Scheinwerfer)",
        description: "Ausgewogene Lichtleistung. Unsere meistgebuchte Option.",
        includes: "Restaurieren, versiegeln und UV-Aushärtung.",
      },
      {
        label: "Post-Restaurierung (Europa)",
        description: `Einsenden aus ganz Europa, wenn ein Besuch in ${loc} nicht möglich ist.`,
        includes: "Gleicher OEM-Ablauf. Rückversand separat angeboten.",
      },
    ],
    valueRows: [
      { label: "Vorher- und Nachher-Prüfung, damit Sie den Unterschied sehen" },
      { label: "Klarheit, die Jahre hält, nicht Wochen" },
      { label: "OEM-UV-Hardcoat, der jahrelang schützt" },
      { label: "Vollständig ausgehärtet vor der Abfahrt" },
      { label: site.warranty },
      { label: "Scheinwerfer-Ausrichtungsprüfung (Paar-Buchungen)" },
      { label: "Scheinwerfer-Restaurierungsspezialisten (wir machen nichts anderes)" },
      { label: "Fehlgeschlagene werkseitige UV-Schicht vollständig entfernt" },
      { label: `${site.turnaround.local} in unserer Werkstatt` },
      { label: "Innenarbeitsplatz ohne Staub- oder Sonnenkontamination" },
      { label: "Stützt sich nur auf temporäre Politur oder Versiegelung" },
    ],
    modifiers: [
      {
        label: "Scheinwerfergröße",
        detail: "Standard, große Wraparound-Form oder komplexe Formen.",
      },
      {
        label: "Linsenzustand",
        detail: "Leichte Trübung, starke Oxidation oder schwerer Schaden.",
      },
      {
        label: "Servicemethode",
        detail: `Besuch in ${loc}, Mobile-Service oder Post in ganz Europa.`,
      },
    ],
    comparisonClosing:
      "Neue OEM-Scheinwerfer-Einheiten kosten oft 300–800 € oder mehr pro Seite. Professionelle Restaurierung liefert vergleichbare Klarheit für einen Bruchteil des Preises, wenn die Gehäuse noch intakt sind.",
  },
  processPage: {
    label: "Ablauf",
    title: "Professionelle Scheinwerfer-Restaurierung, der Sie vertrauen können",
    summary: `${site.name} restauriert Scheinwerfer mit professionellem Abtragen, Neubeschichten und Werkstatt-UV-Aushärtung. Pro Scheinwerfer oder Rücklicht typischerweise etwa 30–60 Minuten; beide Scheinwerfer meist etwa 45–90 Minuten je nach Größe und Zustand. Beim Verlassen ist der Lack bereits ausgehärtet. Keine vorsichtige Heimfahrt, kein staubfreie Garage über Nacht. Ergebnisse sind UV-geschützt und durch unsere ${site.warranty.toLowerCase()} abgedeckt.`,
    bookCta: "Restaurierung buchen",
    instantCureTitle: "Voll ausgehärtet abfahren, nicht Tage später",
    instantCureBody:
      "Viele Werkstätten polieren und versiegeln, überspringen aber die volle Werkstatt-Aushärtung. Wir härten jede Linse vor Ort vor der Übergabe, sodass Sie direkt nach Hause fahren, durch Regen oder zur Waschanlage können, ohne Angst vor Staub, Fingerabdrücken oder weichem Finish.",
    oemTitle: 'Warum „OEM-Qualität" kein Marketing ist. Es ist Chemie.',
    oemBody1:
      "Polycarbonat-Scheinwerfer verlassen das Werk mit einem harten UV-Coat. Wenn dieser versagt, vergilbt und trübt sich der Kunststoff. Eine schnelle Politur oder ein DIY-Kit poliert nur den Schaden. Es ersetzt nicht die Schutzschicht. Ohne neuen UV-Hardcoat verblasst die Klarheit innerhalb von Monaten wieder.",
    oemBody2:
      "Unser Ablauf folgt der professionellen Restaurierungssequenz: abtragen, verfeinern, beschichten, aushärten. Deshalb sehen Ergebnisse aus und wirken wie neue Linsen, nicht wie temporärer Glanz.",
    pillarsTitle: "Das Dreiteil-System",
    overviewTitle: "Was passiert, wenn Sie buchen",
    overviewTiming: `Typische Dauer: ${site.turnaround.local.toLowerCase()} in unserer Werkstatt in ${loc}. Schwerer Schaden oder übergroße Linsen können länger dauern.`,
    stepLabelTemplate: "Schritt {n}",
    pillars: [
      {
        title: "Präzise Vorbereitung & Schleifen",
        description:
          "Wir entfernen die fehlgeschlagene werkseitige UV-Schicht vollständig, nicht nur darüber polieren, mit kontrolliertem professionellem Schleifen an zweckgebautem Equipment.",
      },
      {
        title: "OEM-UV-Hardcoat",
        description:
          "Ein zertifizierter OEM-UV-Hardcoat ersetzt den Schutz, den Polycarbonat braucht, um klar zu bleiben. Kein Wachs, keine Versiegelung, kein schneller Sprühnebel.",
      },
      {
        title: "UV-Aushärtung & Prüfung",
        description:
          "Der Lack wird in der Werkstatt vollständig ausgehärtet, bevor Sie abfahren. Kein weiches Finish, keine Aushärtung über Nacht, kein staubfreies Auto nötig.",
      },
    ],
    overview: [
      {
        title: "Beurteilen & vorbereiten",
        description:
          "Wir prüfen beide Linsen, maskieren angrenzende Lackflächen und bestätigen, dass Restaurierung die richtige Option ist, bevor die Arbeit beginnt.",
      },
      {
        title: "Linsenoberfläche restaurieren",
        description:
          "Fehlgeschlagener UV-Schutz wird entfernt und die Linse auf eine glatte, beschichtungsfertige Oberfläche verfeinert, mit professionellem Equipment in kontrollierter Umgebung.",
      },
      {
        title: "Werkstattähnlichen Schutz auftragen",
        description:
          "Ein OEM-UV-Hardcoat stellt die Schutzschicht wieder her, die Ihre Scheinwerfer ab Werk verloren haben.",
      },
      {
        title: "Aushärten, prüfen und übergeben",
        description:
          "Der Lack wird vor Ort ausgehärtet, bevor Sie gehen. Sie sehen Vorher und Nachher und fahren ohne vorsichtige Heimfahrt ab.",
      },
    ],
    proofTitle: "Warum Kunden SHINES wählen",
    proofIntro:
      "Wir konzentrieren uns auf Ergebnisse und Standards, die Sie bei der Übergabe prüfen können, nicht auf Werkstattjargon.",
    proof: [
      {
        title: "Voll ausgehärtet vor dem Verlassen",
        description:
          "Anders als ungehärtete Versiegelungen oder lufttrocknende Beschichtungen härten wir in der Werkstatt vor der Übergabe. Keine vorsichtige Heimfahrt, staubfreie Garage über Nacht oder Tage bis zur Autowäsche nötig.",
        source: "SHINES Servicestandard",
      },
      {
        title: "AMECA-geprüfte UV-Leistung",
        description:
          "Wir verwenden einen professionellen UV-Hardcoat, getestet unter automobilen UV-Belastungsprotokollen. Das ist die Schutzkategorie, für die Werkstlinsen ausgelegt sind.",
        source: "Automotive-Equipment-Compliance-Standards",
      },
      {
        title: "Branchenübliche Restaurierungssequenz",
        description:
          "Professionelle Restaurierung folgt einer Kernsequenz: fehlgeschlagenen Coat entfernen, Oberfläche verfeinern, UV-Hardcoat auftragen und aushärten. Keine Ein-Schritt-Politur.",
        source: "Professionelle Scheinwerfer-Restaurierungsbranche",
      },
      {
        title: "Scheinwerfer-Restaurierungsspezialisten",
        description:
          "Wir machen einen Service, professionell. Jede Linse wird beurteilt, restauriert und geprüft von geschulten Technikern nach dem gleichen Standard.",
        source: "SHINES",
      },
      {
        title: "Etwa 30–60 Minuten pro Linse",
        description:
          "Restaurierung plus volle Werkstatt-Aushärtung dauert typischerweise etwa 30–60 Minuten pro Scheinwerfer oder Rücklicht, oder etwa 45–90 Minuten für beide Scheinwerfer je nach Größe und Oxidationsgrad. Der Lack ist vor der Abfahrt voll ausgehärtet.",
        source: "SHINES Servicestandard",
      },
    ],
    comparisonTitle: "DIY-Kit vs. professionelle Restaurierung",
    comparisonHeaders: {
      aspect: "Faktor",
      diy: "DIY / schnelle Politur",
      professional: "SHINES",
    },
    comparisonRows: [
      {
        aspect: "Was entfernt wird",
        diy: "Nur Oberflächentrübung. Alte UV-Schicht bleibt oft darunter.",
        professional: "Fehlgeschlagener werkseitiger UV-Coat vollständig entfernt vor Neubeschichtung",
      },
      {
        aspect: "Oberflächenschutz",
        diy: "Wachs, Versiegelung oder schwacher Sprühnebel. Vergilbt wieder in Monaten.",
        professional: "UV-gehärteter OEM-Hardcoat, der jahrelang schützt",
      },
      {
        aspect: "Equipment & Arbeitsplatz",
        diy: "Handpad, Bohraufsatz oder Einfahrt-Setup",
        professional: "Professionelles Equipment in kontrollierter Innenumgebung",
      },
      {
        aspect: "Beim Abfahren",
        diy: "Weiches oder klebriges Finish. Staub, Regen und Waschen tagelang meiden.",
        professional: "Vor Ort voll ausgehärtet. Sofort nach Hause fahren.",
      },
      {
        aspect: "Prüfung",
        diy: "Keine strukturierte Vorher-Nachher-Kontrolle",
        professional: "Vorher- und Nachher-Prüfung, damit Sie den Unterschied sehen",
      },
      {
        aspect: "Haltbarkeit",
        diy: "Wochen bis Monate, bis Trübung zurückkehrt",
        professional: `Jahre Klarheit mit richtigem UV-Schutz, abgedeckt durch ${site.warranty.toLowerCase()}`,
      },
    ],
    standardsTitle: "Unsere Standards bei jedem Auftrag",
    standards: [
      "Innenarbeitsplatz in kontrollierter Umgebung gegen Kontamination",
      "Vorher- und Nachher-Prüfung bei jeder Restaurierung",
      "Beurteilung vor Arbeitsbeginn: wir sagen ehrlich, wenn Ersatz sicherer ist",
      "Feste Preise online ohne Angebots-Hin und Her",
    ],
    closingTitle: "Bereit für werkstattklare Scheinwerfer?",
    closingBody: `In Minuten online buchen. Feste Preise ab ${pairFrom} für beide Scheinwerfer. Werkstatt in ${loc}, Mobile-Service oder Versand in ganz Europa.`,
    backHome: "Zur Startseite",
  },
  faq: {
    title: "Häufige Fragen",
    intro:
      "Klare Antworten zur professionellen Scheinwerfer-Aufbereitung in Belgien und zum Postservice in Europa: Ablauf, Preise, Dauer, Prüfung und Unterschied zu DIY-Kits.",
    contactPrompt: "Keine passende Antwort gefunden?",
    contactOr: "oder",
    contactLink: "Kontakt",
    items: [
      {
        question: "Was umfasst die professionelle Scheinwerfer-Restaurierung?",
        answer: `SHINES restauriert Polycarbonat-Scheinwerferlinsen mit einem mehrstufigen Profi-Ablauf: Inspektion, Abkleben, vollständige Entfernung der defekten werkseitigen UV-Schicht (nicht nur Oberflächentrübung), Verfeinerung auf eine glatte, beschichtungsfertige Oberfläche, OEM-UV-Hardcoat und vollständige Werkstatt-Aushärtung vor Übergabe. Schritt-für-Schritt-Übersicht: ${processUrl}.`,
      },
      {
        question: "Welche Schäden können Sie beheben?",
        answer:
          "Außenoxidation, Vergilbung, Trübung, Verfärbung und leichte bis mittlere Kratzer an Polycarbonatlinsen. Tiefe Risse, Durchbrüche oder stark geschmolzenes Material können Ersatz erfordern. Wir beurteilen jede Linse ehrlich vor Arbeitsbeginn und empfehlen neue Einheiten, wenn Restaurierung nicht die sichere Wahl ist.",
      },
      {
        question: "Kommt die Trübung von innen?",
        answer:
          "Meist nein. Die meisten trüben Scheinwerfer entstehen durch UV-Abbau und Oxidation außen an der Polycarbonatlinse. Innere Feuchtigkeit ist selten und deutet oft auf eine defekte oder abgenutzte Dichtung hin. Scheinwerfer haben Belüftung; Wärme von der Glühbirne beseitigt leichte Feuchtigkeit normalerweise mit der Zeit. Bei innerem Schaden sagen wir, ob Restaurierung oder Ersatz sinnvoll ist.",
      },
      {
        question: "Glas oder Kunststoff?",
        answer:
          "Die meisten modernen Scheinwerfer nutzen Polycarbonat: leichter, bruchsicherer und aerodynamisch geformt. Ältere oder einfachere Fahrzeuge können noch Glas haben. SHINES spezialisiert sich auf professionelle Restaurierung und UV-Neubeschichtung von Polycarbonatlinsen, die heute die Mehrheit auf belgischen und europäischen Straßen ausmachen.",
      },
      {
        question: "Muss ich die Scheinwerfer ausbauen?",
        answer:
          "Nein. Scheinwerfer können am Fahrzeug bleiben. Das ist unsere bevorzugte Methode. Wir maskieren und kleben um jede Lampe zum Schutz Ihres Lacks. Eine geöffnete Motorhaube erleichtert den Zugang. Bereits ausgebaute Lampen bearbeiten wir auf der Bank; geben Sie das bei der Buchung an.",
      },
      {
        question: "Wie lange dauert es?",
        answer: `In unserer Werkstatt in ${loc}: ${site.turnaround.localDetail} Postbestellungen in ganz Europa dauern typischerweise ${site.turnaround.mailIn.toLowerCase()}, plus Versandzeit je Richtung.`,
      },
      {
        question: "Darf ich sofort nach Hause fahren?",
        answer:
          "Ja. Anders als Werkstätten, die nur polieren und Stunden oder Tage auf trocknende Versiegelung warten, UV-härtet SHINES jede Linse vor Ort vor der Übergabe. Der Lack ist beim Verlassen ausgehärtet, ohne vorsichtige Heimfahrt, staubfreie Garage über Nacht oder Einschränkungen vor Regen oder Waschen.",
      },
      {
        question: "Warum SHINES statt DIY-Kit?",
        answer:
          "DIY-Kits können bei leichter Trübung helfen, sind aber Einheitslösungen: falsche Körnung oder Druck können schlimmere Kratzer hinterlassen, viele Kits entfernen schwere Oxidation nicht, und günstige Versiegelungen versagen oft in Monaten. SHINES passt Schleifen, Polituren und Beschichtung pro Linse an Hersteller, Größe und Schaden an, mit Profi-Werkzeug, OEM-UV-Hardcoat und Werkstatt-Aushärtung. Jeder Auftrag inklusive unserer Klarheitsgarantie, nicht einer generischen Box-Garantie.",
      },
      {
        question: "Was kostet es in Belgien?",
        answer: `Transparente Preise ab ${pairFrom} für beide Scheinwerfer (${singleFrom} für eine Linse). Post-Restaurierung in ganz Europa ab ${mailInFrom} zzgl. Versand. Endpreis hängt von Größe, Schweregrad und Servicemethode ab (Werkstatt, Mobile oder Post). Bestätigter Preis vor Verbindlichkeit.`,
      },
      {
        question: "Lohnt sich Restaurierung vs. neue Scheinwerfer?",
        answer:
          "Neue OEM-Scheinwerfer-Einheiten kosten oft 300–800 € oder mehr pro Seite zzgl. Einbau. Bei intakten Gehäusen, Dichtungen und Elektronik stellt professionelle Restaurierung Lichtleistung und Optik für einen Bruchteil wieder her, mit UV-Schutz für Jahre, nicht Wochen.",
      },
      {
        question:
          "Bestehen restaurierte Scheinwerfer die technische Prüfung (Keuring / contrôle technique)?",
        answer:
          "Restaurierte Scheinwerfer können die Prüfung bestehen, wenn Lichtstärke und Linsenklarheit den gesetzlichen Sichtvorgaben entsprechen. Wir beurteilen den Zustand vor Beginn und sagen ehrlich, wenn Ersatz die sicherere Option für Sicherheit oder Prüfung ist.",
      },
      {
        question: "Wie lange hält das Ergebnis?",
        answer: `Mit entfernter fehlgeschlagener UV-Schicht und neu aufgetragenem Profi-Hardcoat halten Ergebnisse typischerweise Jahre, nicht Monate wie schnelle Politur-und-Versiegelung-Jobs. Jede SHINES-Restaurierung inklusive ${site.warranty.toLowerCase()}.`,
      },
      {
        question: "Bedienen Sie Kunden außerhalb Belgiens?",
        answer: `Ja. Besuchen Sie unsere Werkstatt in ${loc}, buchen Sie Mobile-Service wo verfügbar, oder nutzen Sie Post-Restaurierung in ganz Europa. Wir führen Sie durch sichere Verpackung, Einsendung und angebotenen Rückversand.`,
      },
    ],
  },
  footer: {
    finePrint: [
      `Angezeigte Preise sind Startpreise ab ${pairFrom} für beide Scheinwerfer. Endpreis hängt von Größe, Zustand und Servicemethode ab. Bestätigt auf der Buchungsseite vor der Zahlung.`,
      `Rückversand bei Post wird separat nach Ihrem Standort angeboten. Lokale Bearbeitung: ${site.turnaround.local.toLowerCase()}. Postbestellungen typischerweise ${site.turnaround.mailIn.toLowerCase()}.`,
      `Jede Restaurierung inklusive ${site.warranty.toLowerCase()}. Ergebnisse hängen vom Linsenzustand ab; wir prüfen jeden Scheinwerfer vor Arbeitsbeginn.`,
    ],
    breadcrumb: "Scheinwerfer-Restaurierung",
    followTitle: "SHINES folgen",
    copyrightTemplate: `Copyright © {year} ${site.name}. Alle Rechte vorbehalten. Scheinwerfer-Restaurierung, {location} & Europa.`,
    contactLineBooking: `Online buchen unter ${site.url.replace("https://", "")}/book oder E-Mail an ${site.email}.`,
    contactLineEmail: `Fragen? E-Mail an ${site.email}.`,
    columns: {
      bookPricing: {
        title: "Buchen & Preise",
        links: [
          { label: "Online buchen", href: "/book" },
          { label: "Preise", href: pricingPagePath },
          { label: `Einzelner Scheinwerfer ab ${singleFrom}`, href: "/book" },
          { label: `Paar ab ${pairFrom}`, href: "/book" },
          { label: `Post ab ${mailInFrom}`, href: "/book" },
        ],
      },
      learn: {
        title: "Mehr erfahren",
        links: [
          { label: "News", href: "/news" },
          { label: "So funktioniert es", href: "/#how-it-works" },
          { label: "Unser Ablauf", href: processPagePath },
          { label: "Warum restaurieren", href: "/#technology" },
          { label: "Ergebnisse", href: "/#proof" },
          { label: "FAQ", href: "/#faq" },
        ],
      },
      service: {
        title: "Service",
        links: [
          { label: `Werkstatt in ${loc}`, href: "/contact" },
          { label: "Belgien Städte", href: locationsPagePath },
          { label: "Europa", href: europeHubPath },
          { label: "Fachgebiete", href: fieldCategoriesHubPath },
          { label: "Mobile-Service", href: "/book" },
          { label: "Post (Europa)", href: "/book" },
          { label: site.email, href: mailtoQuote() },
        ],
      },
      shines: {
        title: "SHINES",
        links: [
          { label: "Über uns", href: "/about" },
          { label: "Kontakt", href: "/contact" },
          { label: site.warranty, href: pricingPagePath },
          { label: site.url.replace("https://", ""), href: site.url },
        ],
      },
    },
    legal: {
      privacy: "Datenschutz",
      terms: "Nutzungsbedingungen",
      warranty: "Garantie",
      locations: "Standorte",
      europe: "Europa",
      fields: "Fachgebiete",
    },
    changeRegionLabel: "Land oder Region ändern",
  },
  europe: {
    hubTitle: "Scheinwerfer-Restaurierung in ganz Europa",
    hubDescription:
      "SHINES sitzt in Belgien mit professionellem Werkstattservice vor Ort und sicherer Post-Restaurierung für Fahrer in Europa. Land wählen für Service-Details und Preise.",
    countryTitleTemplate: "Scheinwerfer-Restaurierung in {country}",
    countryIntroTemplate: `Professionelle Scheinwerfer-Restaurierung für Fahrer in {country} ({countryLocal}). Scheinwerfer an unsere belgische Werkstatt senden oder uns in ${loc} besuchen. UV-ausgehärtet, ausgehärtet vor der Abfahrt.`,
    mailInNote:
      "Postservice inklusive Verpackungsanleitung, Sendungsverfolgung, Restaurierung und angebotenem Rückversand an Ihre Adresse.",
    belgiumGarage: `Werkstattservice in ${loc}`,
    viewPricing: "Preise ansehen",
  },
  fields: buildFieldCategoryMessagesDe(),
  locations: {
    belgiumTitle: "Standorte in Belgien",
    belgiumDescription:
      "Professionelle Scheinwerfer-Restaurierung in ganz Belgien. Stadt wählen, mehr erfahren und online buchen. Postservice in ganz Europa verfügbar.",
    europeLink: "Alle europäischen Länder",
    cityWarrantyTemplate: `${site.warranty}. ${site.turnaround.local}. Für {city}, {province} und ganz Belgien.`,
    cityBookCta: `Ab ${pairFrom} buchen`,
    cityPricingCta: "Preise ansehen",
  },
  regions: {
    pageTitle: "Land oder Region wählen",
    pageIntro:
      "Wählen Sie Land oder Region für Ihre Sprache. Die Website ist vollständig auf Englisch, Niederländisch, Französisch und Deutsch verfügbar.",
    breadcrumb: "Land oder Region",
    groups: [{ title: "Belgien" }, { title: "Europa" }, { title: "Andere Regionen" }],
  },
  news: {
    indexTitle: "News",
    latestTitle: "Aktuelle News",
    featuredSr: "Top-Story",
    aboutTitle: `Über ${site.name} News`,
    aboutBody: `Updates, Ratgeber und Service-News von ${site.name}, Ihrem Spezialisten für professionelle Scheinwerfer-Restaurierung in Belgien und Europa.`,
    relatedTitle: "Verwandte Artikel",
    readMore: "Weiterlesen",
    categories: {
      UPDATE: "Update",
      GUIDE: "Ratgeber",
      "PRESS RELEASE": "Pressemitteilung",
      LOCAL: "Lokal",
      "QUICK TIP": "Kurztip",
    },
    subnav: {
      news: "News",
      about: "Über SHINES",
      process: "Unser Ablauf",
    },
  },
  legal: {
    privacyHeading: "Datenschutz",
    privacyBody: `Wir verwenden Buchungs- und Kontaktdaten nur zur Terminbestätigung, Restaurierungsarbeit und Service-Nachverfolgung. Wir verkaufen Ihre Daten nicht. Datenschutzfragen: ${site.email}.`,
    termsHeading: "Nutzungsbedingungen",
    termsBody: `Preise auf ${site.url.replace("https://", "")} sind Startpreise. Endpreis wird auf der Buchungsseite vor der Zahlung bestätigt. Wir prüfen jede Linse vor Arbeitsbeginn und beraten, wenn Ersatz die sicherere Option ist. Garantiebedingungen auf unserer Preisseite.`,
  },
  booking: {
    pageTitle: "Restaurierung buchen",
    pageIntro:
      "Wählen Sie Scheinwerfergröße, Schadensgrad und Servicemethode. Ihr Preis aktualisiert sich sofort. Alle Preise inkl. MwSt., außer bei Firmenrechnung mit USt.",
    stepLegends: {
      quantity: "1. Wie viele Scheinwerfer?",
      quantitySingleMobile: "Mobile Besuche sind nicht für ein Licht verfügbar.",
      size: "2. Welche Größe haben Ihre Scheinwerfer?",
      sizeHint:
        "Wählen Sie nach Fahrzeug. Größere oder komplexere Lichter brauchen mehr Zeit und Material.",
      condition: "3. Wie schlimm sehen sie aus?",
      conditionHint: "Seien Sie ehrlich. Tieferer Schaden braucht mehr Schleifen und Zeit.",
      service: "4. Wie möchten Sie Service erhalten?",
    },
    contactDetailsTitle: "Wie erreichen wir Sie?",
    shipAddressNote:
      "Wir speichern Name und Rücksendeadresse, um Ihr Paket bei Ankunft zuzuordnen und sicher zurückzusenden.",
    mobileOutOfAreaNote:
      "Mobile Besuche nur in {area} (innerhalb {radius} km unserer Werkstatt). Für {country} wählen Sie {shipLabel} oder kontaktieren Sie uns für ein Angebot.",
    distanceLoading: "Reisestrecke wird berechnet…",
    distanceLoadingSlots: "Reisestrecke wird berechnet, bevor Zeiten angezeigt werden…",
    mobileAddressRequired:
      "Geben Sie oben Ihre vollständige Adresse ein, um verfügbare Termine zu sehen.",
    submitEmailHint:
      "Wir senden Ihre Bestätigung sofort per E-Mail. Fragen? Kontakt unter",
    summaryTitle: "Ihre Buchung",
    summaryVat: "Inkl. MwSt. · {warranty}",
    summaryLabels: {
      size: "Größe",
      condition: "Zustand",
      service: "Service",
      quantity: "Anzahl",
      pair: "Beide Scheinwerfer",
      single: "Ein Scheinwerfer",
    },
    returnShippingNote:
      "Rückversand wird separat angeboten, bevor wir Ihre Scheinwerfer zurücksenden.",
    priceFrom: "ab {price}",
    mobileTravelQuote:
      "{km} km einfache Strecke · Anfahrtsgebühr {fee} (inkl. MwSt.). {breakdown}",
    steps: {
      options: "Optionen",
      details: "Ihre Angaben",
      schedule: "Termin",
      confirm: "Bestätigen",
    },
    chooseOptions: "Optionen wählen",
    quantity: [
      { label: "Ein Scheinwerfer", description: "Restaurierung einer Linse" },
      { label: "Beide Scheinwerfer", description: "Am beliebtesten, ausgewogene Lichtleistung" },
    ],
    sizes: [
      {
        label: "Standard / Kompakt",
        description: "Kleine, flache oder runde Lichter, z. B. VW Golf, ältere Limousinen, Stadtautos.",
      },
      {
        label: "Groß / Wraparound",
        description: "Moderne Lichter, die in den Kotflügel reichen, z. B. BMW, Audi, neuere SUVs.",
      },
      {
        label: "Komplex / Übergroß",
        description: "Extra große Lkw-Lichter oder Lichter mit scharfen Winkeln, Zierleisten oder komplexen Formen.",
      },
    ],
    conditions: [
      {
        label: "Stufe 1: Leichte Trübung",
        shortLabel: "Leichte Trübung",
        description: "Leicht trüb oder matt. Kein Abblättern, nur Verlust des ursprünglichen Glanzes.",
      },
      {
        label: "Stufe 2: Starke Oxidation",
        shortLabel: "Starke Oxidation",
        description: "Deutlicher Gelbstich oder krustige Oberfläche. Licht kann nicht klar durch.",
      },
      {
        label: "Stufe 3: Schwerer Schaden",
        shortLabel: "Schwerer Schaden",
        description: "Abblätternder Klarlack oder sichtbare tiefe Kratzer durch Steinschlag.",
      },
    ],
    services: [
      {
        label: "Unsere Werkstatt besuchen",
        description: "Unsere günstigste Option. Abgeben und warten, während wir arbeiten.",
      },
      {
        label: "Scheinwerfer einsenden",
        description: "Bequemer Postservice für große Entfernungen in ganz Europa.",
      },
      {
        label: "Wir kommen zu Ihnen",
        description: `Mobile-Service inklusive Hin- und Rückfahrt für Kunden bis ${site.mobileTravel.includedRadiusKm} km von uns (Entfernung einfache Strecke).`,
      },
    ],
    priceLabels: {
      base: "Basis",
      size: "Größe",
      condition: "Zustand",
      service: "Service",
      travel: "Anfahrt",
      total: "Gesamt",
      mailInHandling: "Post-Bearbeitung",
      mobileService: "Mobile-Service",
    },
    continue: "Weiter",
    back: "Zurück",
    confirmBooking: "Buchung bestätigen & später zahlen",
    whereTitle: {
      mobile: "Wohin sollen wir kommen?",
      ship: "Von wo senden Sie?",
      default: "Angaben eingeben",
    },
    whereSubtitle: "Name und Adresse eingeben:",
    fields: {
      firstName: "Vorname",
      lastName: "Nachname",
      suffix: "Zusatz",
      street: "Straße und Hausnummer",
      apartment: "Wohnung, Suite, Zugangscode",
      postalCode: "Postleitzahl",
      city: "Stadt",
      country: "Land / Region",
      businessAddress: "Geschäftsadresse",
      companyName: "Firmenname",
      vatNumber: "USt-IdNr.",
      billingAddress: "Rechnungsadresse",
      email: "E-Mail-Adresse",
      phone: "Mobilnummer",
      vehicle: "Automarke & Modell",
      notes: "Anmerkungen",
      preferredSlot: "Bevorzugtes Datum & Uhrzeit",
    },
    contactAside:
      "Wir mailen Ihre Buchungsbestätigung sofort. Ihre Mobilnummer hilft uns, Sie zum Termin und bei Anfahrtdetails zu erreichen.",
    aboutSection: {
      ship: "Über Ihre Buchung",
      default: "Über Ihren Termin",
    },
    mailInHow: "So funktioniert Post",
    pairOnlyMobile:
      "Wir haben Ihre Buchung auf beide Scheinwerfer aktualisiert. Mobile-Besuche sind für ein Licht nicht verfügbar.",
    slotError: "Dieser Termin ist nicht mehr verfügbar. Bitte wählen Sie einen anderen.",
    travelFeeNote:
      "Anfahrtsgebühr nicht im Gesamtpreis. Innerhalb von 24 Stunden manuell bestätigt. Mobile-Servicegebühr ist enthalten.",
    validation: {
      firstName: "Bitte Vornamen eingeben.",
      lastName: "Bitte Nachnamen eingeben.",
      street: "Bitte Straße und Hausnummer eingeben.",
      postalCode: "Bitte Postleitzahl eingeben.",
      city: "Bitte Stadt eingeben.",
      companyName: "Bitte Firmennamen eingeben.",
      vatNumber: "Bitte USt-IdNr. eingeben.",
      emailRequired: "Bitte E-Mail-Adresse eingeben.",
      emailInvalid: "Bitte gültige E-Mail-Adresse eingeben.",
      phoneRequired: "Bitte Mobilnummer eingeben.",
      phoneInvalid: "Bitte gültige Mobilnummer eingeben.",
      vehicle: "Bitte Automarke und Modell eingeben.",
      preferredSlot: "Bitte bevorzugtes Datum und Uhrzeit wählen.",
    },
    lookup: {
      title: "Buchung finden",
      intro:
        "Kein Konto nötig. Referenz aus Ihrer Bestätigung eingeben (z. B. SH-1001) und die bei der Buchung verwendete E-Mail. Wir öffnen Ihre private Buchungsseite.",
      label: "Buchungsreferenz",
      placeholder: "SH-1001",
      submit: "Meine Buchung öffnen",
      error: "Buchung nicht gefunden.",
    },
    hub: {
      title: "Meine Buchung",
      loading: "Buchung wird geladen…",
      cancelled: "Diese Buchung wurde storniert.",
      bookmarkShip:
        "Kein Konto nötig. Seite bookmarken, um Ihr Paket zu verfolgen und Ihre Post-Buchung zu verwalten.",
      bookmarkDefault:
        "Kein Konto nötig. Seite bookmarken, um Ihren Termin anzuzeigen oder zu stornieren.",
      details: "Details",
      cancel: "Buchung stornieren",
      cancelConfirm:
        "Diese Buchung stornieren? Wir geben Ihren Termin frei oder erwarten Ihr Paket nicht mehr.",
      reference: "Ihre Buchung",
    },
    confirmation: {
      title: "Buchung bestätigt",
      referenceLine: "Referenz {reference}",
      totalLine: "Schätzung {total} inkl. MwSt. · {warranty}",
      stepsVisit: [
        "Kommen Sie zur geplanten Zeit, kostenloses Parken vor Ort für die Abgabe.",
        "Wir prüfen Ihre Scheinwerfer und bestätigen den Umfang vor Arbeitsbeginn.",
        "Restaurierung und UV-Aushärtung meist während der Wartezeit (ca. 30–90 Min. für beide Lampen).",
        "Holen Sie Ihr Fahrzeug mit unserer Klarheitsgarantie ab, Zahlung in der Werkstatt.",
      ],
      stepsMobile: [
        "Fahrzeug bereitstellen, Scheinwerfer zum Termin erreichbar.",
        "Unser Techniker kommt im reservierten Fenster (Fahrt ist in Ihrem Angebot enthalten).",
        "Restaurierung und UV-Aushärtung vor Ort, kein Werkstattbesuch nötig.",
        "Ergebnis gemeinsam prüfen; Zahlung nach der Leistung.",
      ],
      stepsShip: [
        "Online buchen. Wir speichern Ihre Buchung und zeigen Referenz und Versandadresse.",
        "Scheinwerfer sicher verpacken und bei Ihrem lokalen Versanddienstleister einsenden (günstigste Option für Sie).",
        "Sendungsnummer auf Ihrer Buchungsseite eintragen (optional, empfohlen).",
        "E-Mail bei Paketeingang. Nach Restaurierung einmal Rückversand auf Ihrer Buchungsseite bezahlen, dann senden wir zurück.",
      ],
      visitLocationTitle: "Besuchen Sie uns in",
      shipToTitle: "Versand an",
      shipToFallback:
        "Wir mailen die Werkstattadresse an {email}. Kontaktieren Sie uns, wenn Sie sie früher brauchen.",
      openBooking: "Meine Buchung öffnen",
      emailUs: "E-Mail schreiben",
      footnote:
        "Bewahren Sie Ihren privaten Link oder die Referenz {reference}. Kein Konto nötig.",
      footnoteShip:
        "Bewahren Sie Ihren privaten Link oder die Referenz {reference}. Referenz deutlich auf dem Paket vor Versand. Kein Konto nötig.",
      emailSent:
        "Wir haben Ihre Bestätigung an die angegebene E-Mail-Adresse gesendet. Prüfen Sie auch den Spam-Ordner.",
      emailPending:
        "Ihre Buchung ist gespeichert. Keine Bestätigungsmail innerhalb weniger Minuten? Öffnen Sie Ihre Buchung unten oder kontaktieren Sie uns.",
    },
    mailIn: {
      confirmationTitle: "Buchung bestätigt",
      confirmationSteps: [
        "Online buchen. Wir speichern Ihre Buchung und zeigen Referenz und Versandadresse.",
        "Scheinwerfer sicher verpacken und bei Ihrem lokalen Versanddienstleister einsenden (günstigste Option für Sie).",
        "Sendungsnummer auf Ihrer Buchungsseite eintragen (optional, empfohlen).",
        "E-Mail bei Paketeingang. Nach Restaurierung einmal Rückversand auf Ihrer Buchungsseite bezahlen, dann senden wir zurück.",
      ],
      shippingTitle: "Einsendungs-Tracking",
      shippingCarrier: "Versanddienstleister",
      shippingTracking: "Sendungsnummer",
      shippingSave: "Tracking speichern",
      returnPayTitle: "Rückversand",
      returnPayBody:
        "Ihre Restaurierung ist fertig. Rückversand in einem Schritt bezahlen, dann senden wir Ihre Scheinwerfer an Ihre gespeicherte Adresse.",
      returnPayButton: "Rückversand bezahlen",
      returnPaid: "Rückversand bezahlt. Wir bereiten Ihr Paket für den Versand vor.",
    },
    picker: {
      chooseDate: "Datum und Uhrzeit wählen",
      chooseTime: "Verfügbare Zeiten",
      noSlots: "An diesem Datum keine Zeiten mehr frei.",
      loading: "Termine werden geladen…",
    },
  },
  mailInFlow: {
    steps: [
      "Online buchen",
      "Selbst verpacken und versenden",
      "Dokumentierte Annahme",
      "Wir restaurieren, UV-härten und senden zurück",
    ],
    stepDetails: [
      {
        title: "Online buchen",
        description:
          "Wählen Sie Anzahl, Größe und Zustand, dann Postversand. Noch nicht zahlen; wir bestätigen per E-Mail.",
      },
      {
        title: "Selbst verpacken und versenden",
        description:
          "Ausbau, Verpackung und Versand liegen vollständig bei Ihnen. Senden Sie nur die Scheinwerfer in einem stabilen, gut gepolsterten Karton mit Tracking und Versicherung an unsere Werkstatt in Belgien.",
      },
      {
        title: "Dokumentierte Annahme",
        description:
          "Vor dem Öffnen Ihres Pakets filmen wir das Auspacken. Wir fotografieren jede Linse vor der Restaurierung. Das schützt beide Seiten bei Transportschäden. Wir haften nicht für Versandschäden oder schlechte Verpackung.",
      },
      {
        title: "Wir restaurieren, UV-härten und senden zurück",
        description: `Typische Werkstattzeit: ${site.turnaround.mailIn.toLowerCase()}. Wir restaurieren, häuten die UV-Beschichtung vollständig aus, prüfen mit Fotos und senden montagefertig zurück. Rückversand wird vor Versand angeboten.`,
      },
    ],
    notes: [
      `Restaurierung ab ${formatPrice(site.pricing.mailIn.from)} pro Paar (ohne Versand hin und zurück).`,
      "Rückversand wird nach Land und Kartongröße vor Versand angeboten.",
      "Nur Scheinwerfer-Einheiten senden, nicht das ganze Fahrzeug.",
      "Tracking und Versicherung nutzen. Erhalten wir Ihr Paket nicht, senden wir nichts zurück.",
      "Verpackung liegt in Ihrer Verantwortung. Bewahren Sie den Versandbeleg auf.",
      "Feuchtigkeit im Gehäuse oder Risse? In der Buchung vermerken; wir prüfen vor Arbeitsbeginn.",
      "Postsendungen nutzen dieselbe Werkstattadresse. Verpackung und Versand liegen in Ihrer Verantwortung.",
    ],
    shipToNote:
      "Schreiben Sie Ihre Buchungsreferenz auf die Außenseite der Box. Sendungsverfolgung und Versicherung nutzen. Wir beginnen erst, wenn Ihr Paket ankommt. Wenn wir es nie erhalten, wird nichts zurückgesendet.",
    visitNote: `Abgabe in unserer Werkstatt in ${loc}. ${site.turnaround.local}. Kostenlose Parkplätze vor Ort für die Abgabe.`,
    unboxingNote:
      "Vor dem Öffnen Ihres Pakets zeichnen wir das Auspacken per Video auf. Dann fotografieren wir jede Scheinwerfereinheit vor jeder Restaurierungsarbeit. Das schützt Sie und uns, falls Linsen beim Transport gebrochen oder beschädigt ankamen. Hinweis: Wir haften nicht für Schäden durch Versand oder schlechte Verpackung.",
    workshopNote: `Typische Werkstattzeit: ${site.turnaround.mailIn.toLowerCase()}. Wir restaurieren, härten den UV-Coat vollständig aus, prüfen mit Fotos und senden versandfertig zurück. Rückversand wird vor Versand angeboten.`,
  },
  mailInStatus: {
    awaiting_parcel: "Paket erwartet",
    in_transit: "Unterwegs",
    arrived: "Angekommen",
    in_workshop: "In der Werkstatt",
    ready_to_ship: "Bereit zur Rücksendung",
    return_shipped: "Rücksendung unterwegs",
    completed: "Abgeschlossen",
  },
  mobilePricing: {
    manualQuoteTemplate:
      "{km} km einfache Strecke, wir bestätigen Ihre Anfahrtsgebühr innerhalb von 24 Stunden. Bei dieser Entfernung ist Post oft günstiger.",
    breakdownLabels: {
      regio: "Regio-Anfahrt",
      extra: "Extra km (Hin und Rück)",
      total: "Anfahrt gesamt",
    },
  },
  appointments: {
    goTo: "Meine Buchung öffnen",
    returnTo: "Zurück zur Buchung",
    mailInAwaiting: "Post · Paket erwartet",
    mobileNoticeTemplate:
      "Mobile-Besuche reservieren {hours} Stunden in Ihrem Kalender ({km} km einfache Strecke, Schätzung). Bitte Fahrzeug zur Ankunftszeit bereit halten. Verzögerungen können spätere Termine beeinflussen.",
  },
  articles: [
    {
      slug: "why-headlights-turn-yellow-and-hazy",
      publishedAt: "2026-05-20",
      category: "GUIDE",
      title: "Warum Scheinwerfer gelb und trüb werden (und was wirklich hilft)",
      dek: "Der werkseitige UV-Schutz versagt mit der Zeit. Politur allein ersetzt ihn nicht. Das sollten Fahrer in Belgien und Europa wissen.",
      image: {
        src: "/news/why-headlights-turn-yellow-and-hazy.png",
        alt: "Vorher und nachher: vergilbte trübe Linse zu klarer restaurierter Scheinwerferlinse",
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
          text: "Sahen Ihre Scheinwerfer neu klar aus, leuchten sie nachts aber gelb oder streuen Licht, ist das Problem meist kein Schmutz. Moderne Scheinwerfer bestehen aus Polycarbonat mit werkseitigem UV-Hardcoat. Sonne, Straßenschmutz und jahrelange Wärmezyklen bauen diesen Coat ab. Wenn er versagt, oxidiert der Kunststoff selbst.",
        },
        {
          type: "paragraph",
          text: "Eine schnelle Politur oder ein DIY-Kit kann Linsen wochenlang besser aussehen lassen. Es entfernt Oberflächentrübung, lässt aber den darunterliegenden Kunststoff ungeschützt. Ohne neuen UV-Hardcoat kehrt Vergilbung schnell zurück, besonders bei Autos, die draußen in belgischen und europäischen Klimazonen stehen.",
        },
        {
          type: "heading",
          text: "Was professionelle Restaurierung ändert",
        },
        {
          type: "list",
          items: [
            "Die fehlgeschlagene werkseitige UV-Schicht wird vollständig entfernt, nicht darüber poliert.",
            "Die Linse wird auf eine glatte, beschichtungsfertige Oberfläche verfeinert.",
            "Ein OEM-UV-Hardcoat ersetzt den Schutz, den die Linse verloren hat.",
            "Der Lack wird in der Werkstatt vor Übergabe ausgehärtet, sodass Sie sofort nach Hause fahren können.",
          ],
        },
        {
          type: "paragraph",
          text: `Bei ${site.name} folgen wir dieser vollen Sequenz bei jeder Restaurierung. Feste Preise ab ${formatPrice(site.pricing.pair.from)} für beide Scheinwerfer. Online buchen oder unseren Prozessüberblick lesen, um zu sehen, was bei einem Besuch in unserer Werkstatt in ${locationLabel()} passiert.`,
        },
      ],
    },
    {
      slug: "professional-headlight-restoration-vs-diy-kits",
      publishedAt: "2026-05-18",
      category: "GUIDE",
      title: "Professionelle Scheinwerfer-Restaurierung vs. DIY-Kits: was hält",
      dek: "Kits sind günstig am Anfang. Profi-Arbeit kostet einmal mehr. So wählen Sie nach Haltbarkeit, Sicherheit und Gesamtkosten.",
      image: {
        src: "/news/professional-headlight-restoration-vs-diy-kits.png",
        alt: "Vergleich professionelle Scheinwerfer-Restaurierung vs. DIY-Kits: trübes DIY-Ergebnis neben klarem Profi-Ergebnis",
      },
      thumbnailClass: "from-[#2c2c2e] to-[#6e6e73]",
      tags: ["DIY headlight restoration", "headlight kits", "UV hard coat"],
      blocks: [
        {
          type: "paragraph",
          text: "DIY-Scheinwerfer-Kits versprechen Showroom-Klarheit an einem Nachmittag. Für manche Fahrer reicht das. Wer zuverlässige Nachtsicht über Jahre braucht, sieht einen großen Unterschied zwischen Einfahrt-Politur und professioneller Restaurierung.",
        },
        {
          type: "heading",
          text: "Wo DIY-Kits an Grenzen stoßen",
        },
        {
          type: "list",
          items: [
            "Die meisten Kits polieren die Oberfläche, ohne die fehlgeschlagene UV-Schicht darunter vollständig zu entfernen.",
            "Versiegelungen und Wachse sind nicht dasselbe wie ein werkstattähnlicher UV-Hardcoat.",
            "Ergebnisse verblassen oft in Wochen oder Monaten, besonders bei täglicher Sonne.",
            "Ungleichmäßiges Schleifen kann wellige Linsen hinterlassen, die Licht schlechter streuen als zuvor.",
          ],
        },
        {
          type: "heading",
          text: "Was professionelle Restaurierung bietet",
        },
        {
          type: "list",
          items: [
            "Kontrollierter Arbeitsplatz und zweckgebautes Equipment für konsistente Ergebnisse.",
            "Voller Ablauf: abtragen, verfeinern, beschichten und Werkstatt-Aushärtung.",
            "Vorher- und Nachher-Prüfung bei Übergabe.",
            `${site.warranty} auf Klarheit, wenn die Linse für Restaurierung geeignet ist.`,
          ],
        },
        {
          type: "paragraph",
          text: "Beim Vergleich: Preisseite für feste Startpreise ansehen und Termin buchen, wenn Sie bereit sind. Stark gerissene oder tief angegriffene Linsen brauchen eventuell Ersatz; wir beurteilen ehrlich vor Arbeitsbeginn.",
        },
      ],
    },
    {
      slug: "shines-launches-headlight-restoration-belgium",
      publishedAt: "2026-05-15",
      category: "PRESS RELEASE",
      title: `${site.name} startet professionelle Scheinwerfer-Restaurierung in Belgien`,
      dek: `Neuer Service bietet UV-ausgehärtete OEM-Ergebnisse ab ${formatPrice(site.pricing.pair.from)} pro Paar, mit Werkstattbesuch, Mobile-Optionen und Postservice in ganz Europa.`,
      image: {
        src: "/news/shines-launches-headlight-restoration-belgium.png",
        alt: "SHINES Start der professionellen Scheinwerfer-Restaurierung in Belgien mit Vorher-Nachher-Scheinwerfern in der Werkstatt",
      },
      thumbnailClass: "from-[#0b0b0e] to-[#0076df]",
      tags: ["SHINES", "Belgium", "headlight restoration", "AutoRepair"],
      blocks: [
        {
          type: "paragraph",
          text: `${site.name} kündigt heute professionelle Scheinwerfer-Restaurierung für Fahrer in ${locationLabel()} und ganz Europa an. Der Service richtet sich an trübe, vergilbte und UV-geschädigte Polycarbonatlinsen mit Abtragen, Neubeschichten und Werkstatt-Aushärtung.`,
        },
        {
          type: "paragraph",
          text: `Typische Bearbeitung: ${site.turnaround.local.toLowerCase()} in der Werkstatt. Post-Kunden in ganz Europa können Linsen zur Restaurierung einsenden; Rückversand separat angeboten. Jeder Auftrag inklusive ${site.warranty.toLowerCase()}.`,
        },
        {
          type: "heading",
          text: "So buchen",
        },
        {
          type: "paragraph",
          text: `Kunden buchen online unter ${site.url.replace("https://", "")}/book mit festen Startpreisen vor der Zahlung. Fragen an ${site.email}.`,
        },
      ],
    },
    {
      slug: "foggy-headlights-vehicle-inspection-belgium",
      publishedAt: "2026-05-12",
      category: "LOCAL",
      title: "Können trübe Scheinwerfer die Fahrzeugprüfung in Belgien nicht bestehen?",
      dek: "Getrübte Linsen mindern Lichtleistung und können Compliance-Probleme verursachen. Das sollten belgische Fahrer vor Prüfung oder langer Nachtfahrt prüfen.",
      image: {
        src: "/news/foggy-headlights-vehicle-inspection-belgium.png",
        alt: "Trüber vergilbter Scheinwerfer an einem Auto in einer belgischen Prüfwerkstatt",
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
          text: "Belgische Fahrer bemerken Scheinwerferprobleme oft zuerst nachts: schwache Strahlen, gelber Schein oder Licht, das über die Linse streut. Neben Komfort beeinträchtigt reduzierte Leistung, wie früh Fußgänger, Radfahrer und Markierungen sichtbar werden.",
        },
        {
          type: "paragraph",
          text: "Prüfregeln fokussieren, ob Beleuchtung wie vorgesehen funktioniert. Stark getrübte oder falsch ausgerichtete Scheinwerfer können bei Kontrollen auffallen, weil sie keine vorhersagbaren Lichtbilder mehr liefern. Restaurierung ist oft günstiger als Ersatz, wenn das Gehäuse strukturell intakt ist.",
        },
        {
          type: "heading",
          text: "Wann Restaurierung sinnvoll ist",
        },
        {
          type: "list",
          items: [
            "Gelbe oder trübe Linsen ohne größere Risse oder tiefe Kerben.",
            "Feuchtigkeit im Gehäuse sollte zuerst geklärt werden; wir beraten bei der Beurteilung.",
            "Sie wollen werkstattklare Lichtleistung ohne volle Scheinwerfereinheiten zu bezahlen.",
          ],
        },
        {
          type: "paragraph",
          text: `${site.name} bedient Fahrer in ganz Belgien mit Werkstatt-, Mobile- und Post-Optionen. Standorte-Index für stadtbezogene Seiten, oder direkt buchen, wenn Sie Ihre Servicemethode kennen.`,
        },
      ],
    },
    {
      slug: "mail-in-headlight-restoration-europe",
      publishedAt: "2026-05-08",
      category: "UPDATE",
      title: "Post-Scheinwerfer-Restaurierung jetzt in ganz Europa verfügbar",
      dek: `Senden Sie Ihre Scheinwerfereinheiten an ${site.name} für dieselbe professionelle UV-ausgehärtete Qualität wie unser lokaler Werkstattservice.`,
      image: {
        src: "/news/mail-in-headlight-restoration-europe.png",
        alt: "SHINES Post-Scheinwerfer-Restaurierung mit verpackter Versandbox, restaurierten Scheinwerfern und Bestellformular",
      },
      thumbnailClass: "from-[#1c1c1e] to-[#48484a]",
      tags: ["mail-in", "Europe", "headlight restoration"],
      blocks: [
        {
          type: "paragraph",
          text: `Fahrer außerhalb ${locationLabel()} können jetzt den Postservice von ${site.name} nutzen. Scheinwerfereinheiten ausbauen, sicher verpacken und an unsere Werkstatt senden. Wir restaurieren, UV-härten und senden montagefertig zurück.`,
        },
        {
          type: "paragraph",
          text: `Post-Preise ab ${formatPrice(site.pricing.mailIn.from)} pro Paar. Typische Bearbeitung: ${site.turnaround.mailIn.toLowerCase()}. Rückversand wird nach Ihrem Land angeboten, bevor Sie bestätigen.`,
        },
        {
          type: "heading",
          text: "Vor dem Versand",
        },
        {
          type: "list",
          items: [
            "Online buchen und Post wählen, damit wir Verpackungshinweise senden können.",
            "Linsen vorher fotografieren für Ihre Unterlagen.",
            "Risse, Feuchtigkeit oder defekte Befestigungspunkte in den Buchungsnotizen angeben.",
          ],
        },
      ],
    },
    {
      slug: "drive-away-fully-cured-why-in-shop-hardening-matters",
      publishedAt: "2026-05-05",
      category: "QUICK TIP",
      title: "Voll ausgehärtet abfahren: warum Werkstatt-Aushärtung zählt",
      dek: "Manche Beschichtungen bleiben tagelang nach dem Auftrag weich. Unsere ist vor Übergabe ausgehärtet, sodass Regen, Staub und die Heimfahrt den Finish nicht ruinieren.",
      image: {
        src: "/news/drive-away-fully-cured-why-in-shop-hardening-matters.png",
        alt: "UV-ausgehärtete Scheinwerfer-Restaurierung in professioneller Werkstatt mit Aushärtungslampe",
      },
      thumbnailClass: "from-[#0076df] to-[#64d2ff]",
      tags: ["UV cure", "headlight coating", "drive home"],
      blocks: [
        {
          type: "paragraph",
          text: "Nicht jeder Scheinwerferservice härtet den neuen UV-Coat vor der Abfahrt vollständig aus. Lufttrocknende oder ungehärtete Versiegelungen können stunden- oder tagelang klebrig bleiben. Staub, Fingerabdrücke oder leichter Regen auf der Heimfahrt können die Linse dann markieren.",
        },
        {
          type: "paragraph",
          text: `${site.name} härtet jede Restaurierung vor Ort vor der Übergabe aus. Sie können sofort nach Hause fahren, das Auto normal waschen und auf die empfindliche Garage-über-Nacht-Routine verzichten, die manche Werkstätten noch verlangen.`,
        },
        {
          type: "paragraph",
          text: "Eine der einfachsten Fragen an jeden Anbieter: Ist der Lack voll ausgehärtet, bevor ich gehe? Wenn nein, das Risiko von Nacharbeit und verlorener Zeit einplanen.",
        },
      ],
    },
  ],
};
