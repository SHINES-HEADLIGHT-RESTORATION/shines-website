import type { MessageBundleKey } from "@/lib/i18n/config";
import type { ServiceMethodId } from "@/lib/booking";

export type BookingConfirmationEmailCopy = {
  subject: Record<ServiceMethodId, string>;
  preheader: Record<ServiceMethodId, string>;
  greeting: string;
  lead: Record<ServiceMethodId, string>;
  referenceLabel: string;
  detailsTitle: string;
  detailLabels: {
    service: string;
    when: string;
    vehicle: string;
    headlights: string;
    size: string;
    condition: string;
    total: string;
    address: string;
    returnAddress: string;
    shipTo: string;
  };
  mailInAwaiting: string;
  stepsTitle: string;
  steps: Record<ServiceMethodId, string[]>;
  cta: string;
  reassurance: string;
  footer: string;
  shipToTitle: string;
  internalSubject: string;
};

const en: BookingConfirmationEmailCopy = {
  subject: {
    visit: "Your visit is confirmed · {reference}",
    mobile: "Your mobile appointment is confirmed · {reference}",
    ship: "Your mail-in booking is confirmed · {reference}",
  },
  preheader: {
    visit: "Your time slot is reserved. See date, location, and what to expect.",
    mobile: "We've locked your visit in our schedule. Here's when we arrive.",
    ship: "Your reference is active. Ship your headlights when you're ready.",
  },
  greeting: "Hi {name},",
  lead: {
    visit:
      "Thank you for choosing SHINES. Your garage visit is confirmed — your slot is reserved and there's nothing to pay online today.",
    mobile:
      "Thank you for choosing SHINES. Your mobile appointment is confirmed — we've reserved the time in our schedule and will come to your address.",
    ship:
      "Thank you for choosing SHINES. Your mail-in booking is live — pack and ship when it suits you; we'll handle the rest with full intake documentation.",
  },
  referenceLabel: "Booking reference",
  detailsTitle: "Your booking at a glance",
  detailLabels: {
    service: "Service",
    when: "When",
    vehicle: "Vehicle",
    headlights: "Headlights",
    size: "Size",
    condition: "Condition",
    total: "Estimate (incl. BTW)",
    address: "Service address",
    returnAddress: "Return address",
    shipTo: "Ship to",
  },
  mailInAwaiting: "Mail-in · ship when ready",
  stepsTitle: "What happens next",
  steps: {
    visit: [
      "Arrive at the time below — free on-site parking for drop-off.",
      "We inspect your headlights and confirm the final scope before work starts.",
      "Restoration and UV curing typically while you wait (about 30–90 minutes for both lights).",
      "Collect your vehicle with our clarity guarantee — pay at the workshop.",
    ],
    mobile: [
      "Have the vehicle ready and headlights accessible at the scheduled time.",
      "Our technician arrives within the reserved window (travel time is included in your quote).",
      "We restore and UV-cure on site — no garage visit needed.",
      "Review the result with us; payment is due after service.",
    ],
    ship: [
      "Pack your headlights securely and ship with your preferred carrier (tracked & insured recommended).",
      "Write your booking reference clearly on the outside of the box.",
      "Add inbound tracking on your private booking page when you've shipped.",
      "We email when your parcel arrives; after restoration you pay return shipping once, then we send everything back.",
    ],
  },
  cta: "Open my booking",
  reassurance:
    "Save this email and your private booking link. No account required — your reference and email are all you need to return.",
  footer: "Questions? Reply to this email or contact us at info@shines.be.",
  shipToTitle: "Ship to our workshop",
  internalSubject: "New online booking · {reference} · {service}",
};

const nl: BookingConfirmationEmailCopy = {
  subject: {
    visit: "Uw bezoek is bevestigd · {reference}",
    mobile: "Uw mobiele afspraak is bevestigd · {reference}",
    ship: "Uw postboeking is bevestigd · {reference}",
  },
  preheader: {
    visit: "Uw tijdslot is gereserveerd. Datum, locatie en wat u mag verwachten.",
    mobile: "Uw bezoek staat in onze planning. Zo weten wij wanneer we arriveren.",
    ship: "Uw referentie is actief. Verstuur uw koplampen wanneer het u past.",
  },
  greeting: "Hallo {name},",
  lead: {
    visit:
      "Bedankt dat u voor SHINES koos. Uw werkplaatsbezoek is bevestigd — uw slot is gereserveerd en u betaalt vandaag niets online.",
    mobile:
      "Bedankt dat u voor SHINES koos. Uw mobiele afspraak is bevestigd — het tijdslot staat vast en wij komen naar uw adres.",
    ship:
      "Bedankt dat u voor SHINES koos. Uw postboeking is actief — verpak en verstuur wanneer het u uitkomt; wij nemen het over met volledige intake-documentatie.",
  },
  referenceLabel: "Boekingsreferentie",
  detailsTitle: "Uw boeking in één oogopslag",
  detailLabels: {
    service: "Service",
    when: "Wanneer",
    vehicle: "Voertuig",
    headlights: "Koplampen",
    size: "Formaat",
    condition: "Conditie",
    total: "Schatting (incl. BTW)",
    address: "Serviceadres",
    returnAddress: "Retouradres",
    shipTo: "Verzenden naar",
  },
  mailInAwaiting: "Post · verstuur wanneer klaar",
  stepsTitle: "Wat gebeurt er nu",
  steps: {
    visit: [
      "Kom op het onderstaande tijdstip — gratis parkeren op locatie voor aflevering.",
      "Wij inspecteren uw koplampen en bevestigen de scope vóór we starten.",
      "Restauratie en UV-uitharding meestal terwijl u wacht (ongeveer 30–90 minuten voor beide lampen).",
      "Haal uw voertuig op met onze helderheidsgarantie — betalen in de werkplaats.",
    ],
    mobile: [
      "Zorg dat het voertuig klaarstaat en de koplampen bereikbaar zijn op het geplande tijdstip.",
      "Onze technieker arriveert binnen het gereserveerde venster (reistijd zit in uw offerte).",
      "Wij restaureren en UV-uitharden ter plaatse — geen bezoek aan de werkplaats nodig.",
      "Bekijk het resultaat samen met ons; betaling na de service.",
    ],
    ship: [
      "Verpak uw koplampen stevig en verstuur via uw gekozen vervoerder (aangetekend & verzekerd aanbevolen).",
      "Schrijf uw boekingsreferentie duidelijk op de doos.",
      "Voeg tracking toe op uw privé-boekingspagina zodra u verstuurd heeft.",
      "Wij mailen bij aankomst; na restauratie betaalt u retourverzending één keer, daarna sturen wij alles terug.",
    ],
  },
  cta: "Open mijn boeking",
  reassurance:
    "Bewaar deze e-mail en uw privé-link. Geen account nodig — referentie en e-mailadres volstaan om terug te keren.",
  footer: "Vragen? Antwoord op deze mail of contacteer ons via info@shines.be.",
  shipToTitle: "Verzenden naar onze werkplaats",
  internalSubject: "Nieuwe online boeking · {reference} · {service}",
};

const fr: BookingConfirmationEmailCopy = {
  subject: {
    visit: "Votre visite est confirmée · {reference}",
    mobile: "Votre rendez-vous mobile est confirmé · {reference}",
    ship: "Votre envoi postal est confirmé · {reference}",
  },
  preheader: {
    visit: "Votre créneau est réservé. Date, adresse et déroulement.",
    mobile: "Votre passage est planifié. Voici quand nous arrivons.",
    ship: "Votre référence est active. Expédiez vos phares quand vous êtes prêt.",
  },
  greeting: "Bonjour {name},",
  lead: {
    visit:
      "Merci d'avoir choisi SHINES. Votre visite à l'atelier est confirmée — le créneau est réservé et aucun paiement en ligne n'est requis aujourd'hui.",
    mobile:
      "Merci d'avoir choisi SHINES. Votre rendez-vous mobile est confirmé — le créneau est bloqué et nous nous déplaçons à votre adresse.",
    ship:
      "Merci d'avoir choisi SHINES. Votre réservation par envoi est active — expédiez quand vous le souhaitez ; nous gérons la suite avec une intake documentée.",
  },
  referenceLabel: "Référence de réservation",
  detailsTitle: "Votre réservation en un coup d'œil",
  detailLabels: {
    service: "Service",
    when: "Quand",
    vehicle: "Véhicule",
    headlights: "Phares",
    size: "Taille",
    condition: "État",
    total: "Estimation (TVA incl.)",
    address: "Adresse d'intervention",
    returnAddress: "Adresse de retour",
    shipTo: "Expédier à",
  },
  mailInAwaiting: "Envoi postal · expédiez quand prêt",
  stepsTitle: "Et ensuite",
  steps: {
    visit: [
      "Arrivez à l'heure indiquée — parking gratuit sur place pour le dépôt.",
      "Nous inspectons vos phares et confirmons le périmètre avant de commencer.",
      "Restauration et durcissement UV en général pendant l'attente (environ 30–90 min pour les deux phares).",
      "Récupérez votre véhicule avec notre garantie de clarté — paiement à l'atelier.",
    ],
    mobile: [
      "Ayez le véhicule prêt et les phares accessibles à l'heure prévue.",
      "Notre technicien arrive dans le créneau réservé (le déplacement est inclus dans votre devis).",
      "Nous restaurons et durcissons UV sur place — pas de visite à l'atelier.",
      "Validez le résultat avec nous ; paiement après la prestation.",
    ],
    ship: [
      "Emballez solidement vos phares et expédiez avec le transporteur de votre choix (suivi & assurance recommandés).",
      "Indiquez clairement votre référence sur le colis.",
      "Ajoutez le suivi aller sur votre page de réservation privée une fois expédié.",
      "Nous vous écrivons à l'arrivée ; après restauration, payez le retour en une fois, puis nous renvoyons tout.",
    ],
  },
  cta: "Ouvrir ma réservation",
  reassurance:
    "Conservez cet e-mail et votre lien privé. Pas de compte requis — référence et e-mail suffisent pour revenir.",
  footer: "Des questions ? Répondez à cet e-mail ou contactez-nous à info@shines.be.",
  shipToTitle: "Expédier vers notre atelier",
  internalSubject: "Nouvelle réservation en ligne · {reference} · {service}",
};

const de: BookingConfirmationEmailCopy = {
  subject: {
    visit: "Ihr Besuch ist bestätigt · {reference}",
    mobile: "Ihr mobiler Termin ist bestätigt · {reference}",
    ship: "Ihre Postbuchung ist bestätigt · {reference}",
  },
  preheader: {
    visit: "Ihr Zeitfenster ist reserviert. Datum, Adresse und Ablauf.",
    mobile: "Ihr Termin ist eingeplant. So wissen Sie, wann wir ankommen.",
    ship: "Ihre Referenz ist aktiv. Versenden Sie die Scheinwerfer, wenn es passt.",
  },
  greeting: "Hallo {name},",
  lead: {
    visit:
      "Danke, dass Sie SHINES gewählt haben. Ihr Werkstattbesuch ist bestätigt — Ihr Slot ist reserviert, heute ist keine Online-Zahlung nötig.",
    mobile:
      "Danke, dass Sie SHINES gewählt haben. Ihr mobiler Termin ist bestätigt — das Zeitfenster ist fest und wir kommen zu Ihrer Adresse.",
    ship:
      "Danke, dass Sie SHINES gewählt haben. Ihre Postbuchung ist aktiv — verpacken und versenden Sie, wenn es passt; wir übernehmen mit vollständiger Eingangsdokumentation.",
  },
  referenceLabel: "Buchungsreferenz",
  detailsTitle: "Ihre Buchung auf einen Blick",
  detailLabels: {
    service: "Service",
    when: "Wann",
    vehicle: "Fahrzeug",
    headlights: "Scheinwerfer",
    size: "Größe",
    condition: "Zustand",
    total: "Schätzung (inkl. MwSt.)",
    address: "Serviceadresse",
    returnAddress: "Rücksendeadresse",
    shipTo: "Versand an",
  },
  mailInAwaiting: "Post · Versand bei Gelegenheit",
  stepsTitle: "Wie es weitergeht",
  steps: {
    visit: [
      "Kommen Sie zur angegebenen Zeit — kostenloses Parken vor Ort für die Abgabe.",
      "Wir prüfen Ihre Scheinwerfer und bestätigen den Umfang vor Arbeitsbeginn.",
      "Restaurierung und UV-Aushärtung meist während der Wartezeit (ca. 30–90 Min. für beide Lampen).",
      "Holen Sie Ihr Fahrzeug mit unserer Klarheitsgarantie ab — Zahlung in der Werkstatt.",
    ],
    mobile: [
      "Fahrzeug bereitstellen, Scheinwerfer zum Termin erreichbar.",
      "Unser Techniker kommt im reservierten Fenster (Fahrt ist in Ihrem Angebot enthalten).",
      "Restaurierung und UV-Aushärtung vor Ort — kein Werkstattbesuch nötig.",
      "Ergebnis gemeinsam prüfen; Zahlung nach der Leistung.",
    ],
    ship: [
      "Scheinwerfer sicher verpacken und mit Ihrem Versanddienstleister senden (Sendungsverfolgung & Versicherung empfohlen).",
      "Buchungsreferenz deutlich auf dem Paket angeben.",
      "Inbound-Tracking auf Ihrer privaten Buchungsseite hinterlegen, sobald versendet.",
      "E-Mail bei Ankunft; nach Restaurierung einmal Rückversand zahlen, dann senden wir alles zurück.",
    ],
  },
  cta: "Meine Buchung öffnen",
  reassurance:
    "Bewahren Sie diese E-Mail und Ihren privaten Link auf. Kein Konto nötig — Referenz und E-Mail genügen.",
  footer: "Fragen? Antworten Sie auf diese E-Mail oder schreiben Sie an info@shines.be.",
  shipToTitle: "Versand an unsere Werkstatt",
  internalSubject: "Neue Online-Buchung · {reference} · {service}",
};

export function getBookingConfirmationEmailCopy(
  bundle: MessageBundleKey,
): BookingConfirmationEmailCopy {
  if (bundle === "nl") return nl;
  if (bundle === "fr") return fr;
  if (bundle === "de") return de;
  return en;
}

export function formatEmailTemplate(
  template: string,
  vars: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? "");
}
