import { locationsPagePath } from "@/lib/belgium-locations";
import { europeHubPath } from "@/lib/europe-countries";
import { fieldCategoriesHubPath } from "@/lib/field-categories";
import { buildFieldCategoryMessagesFr } from "@/lib/field-category-content-fr";
import { pricingPagePath } from "@/lib/pricing";
import { processPagePath } from "@/lib/process";
import { formatPrice, locationLabel, mailtoQuote, site } from "@/lib/site";
import type { mergeMessages } from "../merge";

const processUrl = `${site.url}${processPagePath}`;
const loc = locationLabel();
const pairFrom = formatPrice(site.pricing.pair.from);
const singleFrom = formatPrice(site.pricing.single.from);
const mailInFrom = formatPrice(site.pricing.mailIn.from);

export const frPatch: Parameters<typeof mergeMessages>[1] = {
  common: {
    included: "Inclus",
    optional: "Optionnel",
    close: "Fermer",
    loading: "Chargement…",
    bookFromTemplate: "Réserver dès {price}",
    viewPricing: "Voir les tarifs",
    contact: "Contact",
    seeProcess: "Voir notre processus",
    bookNow: "Réserver",
    backToHome: "Retour à l'accueil",
    breadcrumbHome: "Accueil",
    europe: "Europe",
    locations: "Zones desservies",
    shinesHome: `Accueil ${site.name}`,
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    menu: "Menu",
    previous: "Précédent",
    next: "Suivant",
  },
  meta: {
    homeTitle: `Restauration de phares ${loc} | ${site.name}`,
    homeDescription: `Restauration professionnelle de phares à ${loc}. Phares troubles ou jaunis dès ${pairFrom}. Atelier local ou envoi postal dans toute l'Europe.`,
    aboutTitle: `À propos de ${site.name} | Restauration professionnelle de phares`,
    aboutDescription: `${site.name} restaure les phares troubles et jaunis avec un vernis UV de qualité OEM et polymérisation en atelier à ${loc}. Service postal dans toute l'Europe.`,
    contactTitle: `Contact et visite | ${site.name}`,
    contactDescription: `Contactez ${site.name} pour la restauration de phares à ${loc}. Réservez en ligne, écrivez à ${site.email}, ou renseignez-vous sur le service mobile et postal en Europe.`,
    pricingTitle: `Tarifs | Restauration de phares dès ${pairFrom} | ${site.name}`,
    pricingDescription: `Tarifs fixes pour la restauration de phares dès ${pairFrom} pour les deux phares. Tarification transparente, sans frais cachés.`,
    processTitle: `Processus de restauration de phares | ${site.name}`,
    processDescription: `SHINES restaure les phares avec un processus professionnel : décapage, revêtement et polymérisation UV en atelier. Chaque phare prend environ 30 à 60 minutes ; les deux phares, environ 45 à 90 minutes selon la taille et l'état. Au départ, le revêtement est déjà durci. Pas de trajet délicat, pas de garage sans poussière toute la nuit. Résultats protégés UV avec ${site.warranty.toLowerCase()}.`,
    bookTitle: `Réserver une restauration de phares | ${site.name}`,
    bookDescription: `Réservez en ligne une restauration professionnelle de phares. Tarifs fixes dès ${pairFrom}. Visite à ${loc}, service mobile ou envoi postal en Europe.`,
    newsTitle: `Actualités | Guides et mises à jour restauration de phares | ${site.name}`,
    newsDescription: `Guides, actualités et conseils sur la restauration de phares à ${loc} et en Europe. Phares jaunes, vernis UV, contrôle technique et nouveautés ${site.name}.`,
    locationsTitle: `Zones desservies en Belgique | ${site.name}`,
    locationsDescription: `Restauration professionnelle de phares dans toute la Belgique. Choisissez votre ville. Envoi postal disponible en Europe.`,
    regionTitle: `Choisissez votre marché ou région | ${site.name}`,
    regionDescription: `Choisissez votre pays et votre langue pour la restauration de phares ${site.name}. Service en Belgique et en Europe — français, néerlandais, allemand et anglais.`,
    bookingLookupTitle: `Retrouver votre réservation | ${site.name}`,
    bookingLookupDescription: `Retrouvez votre réservation ${site.name} avec votre référence et votre e-mail. Aucun compte requis.`,
    myBookingTitle: `Ma réservation | ${site.name}`,
    privacyTitle: `Politique de confidentialité | ${site.name}`,
    privacyDescription: `Comment ${site.name} utilise vos données de réservation et de contact. Nous ne vendons pas vos données.`,
    termsTitle: `Conditions d'utilisation | ${site.name}`,
    termsDescription: `Conditions d'utilisation de ${site.url.replace("https://", "")} et de réservation avec ${site.name}.`,
    cityTitleTemplate: `Restauration de phares {city} | ${site.name}`,
    cityDescriptionTemplate:
      "Restauration professionnelle de phares à {city}, {province}. Réservez en ligne dès {price}. Polymérisation UV avant votre départ.",
    fieldsHubTitle: "Domaines d'expertise | Restauration de phares et optiques",
    fieldsHubDescription:
      "Ce que fait SHINES à Ingelmunster : entretien et préparation au contrôle, smart repair esthétique, detailing professionnel des lentilles et restauration optique complète, aligné sur notre expertise d'atelier.",
  },
  nav: {
    home: "Accueil",
    process: "Processus",
    pricing: "Tarifs",
    news: "Actualités",
    about: "À propos",
    contact: "Contact",
    bookNow: "Réserver",
    locationsBelgium: "Belgique",
    locationsEurope: "Europe",
  },
  hero: {
    title: "Roulez en confiance après la tombée de la nuit",
    subtitle: `Des phares troubles réduisent votre visibilité quand vous en avez le plus besoin. ${site.name} restaure la clarté pour voir plus loin, rouler plus sûr et passer le contrôle technique à ${loc} ou par envoi postal dans toute l'Europe.`,
    cta: "Réparez vos phares maintenant",
    secondary: "Voir avant / après",
  },
  restoration: {
    title: "Pourquoi vos phares se dégradent, et pourquoi attendre est dangereux",
    intro:
      "Chaque semaine, des conducteurs arrivent chez Shines avec des phares si troubles qu'ils voient à peine la route. Ce n'est pas esthétique : c'est un problème de sécurité. Voici ce qui arrive à vos optiques :",
    reasons: [
      {
        title: "Oxydation",
        text: "Les phares jaunissent avec une exposition prolongée aux UV, surtout sur les véhicules garés à l'extérieur.",
      },
      {
        title: "Vapeur d'eau",
        text: "Si le joint étanche autour du phare est usé ou endommagé, de la condensation peut se former à l'intérieur de la lentille. Particulièrement dangereux la nuit.",
      },
      {
        title: "Conditions de conduite",
        text: "Poussière, saleté et gravillons abîment la lentille au quotidien. Les rayures réduisent l'efficacité de vos phares avec le temps.",
      },
    ],
    cta: "Demandez une évaluation gratuite",
    imageAlts: {
      yellowed: "Avant restauration, lentille de phare jaunie et trouble",
      restored: "Après restauration, lentille de phare parfaitement claire",
      mustang: "Ford Mustang avec phares restaurés dans un parking",
    },
  },
  value: {
    outcomesTitle: "Ce qui change lorsque vos phares sont restaurés",
    outcomesIntro:
      "La restauration de phares ne vise pas seulement l'esthétique. C'est retrouver la visibilité et la confiance que vous avez perdues.",
    outcomes: [
      {
        title: "Revoyez la route",
        description:
          "Des lentilles restaurées améliorent l'éclairage : pluie, routes non éclairées et trafic opposé redeviennent gérables, sans conduire le poing serré.",
      },
      {
        title: "Roulez sans ce nœud au ventre",
        description:
          "Fini les doutes sur la distance de visibilité. Fini d'éviter la nuit parce que vos phares vous lâchent au mauvais moment.",
      },
      {
        title: "Passez le contrôle. Protégez la valeur.",
        description:
          "Des phares clairs aident au contrôle technique et donnent un véhicule soigné. Les acheteurs remarquent tout de suite des lentilles comme neuves.",
      },
    ],
    turnaroundNote: `La plupart des restaurations locales sont terminées en ${site.turnaround.local.toLowerCase()}, avec notre ${site.warranty.toLowerCase()}. Chaque lentille est polymérisée sur place, durcie avant votre départ, pas des jours plus tard.`,
    trustTitle: "La confiance des conducteurs en Belgique et en Europe",
    trustIntro:
      "Des résultats concrets : clarté retrouvée, conduite de nuit plus sûre, et phares qui restent clairs grâce à une protection adaptée.",
    trustCards: [
      {
        eyebrow: "Processus",
        title: "Processus de qualité OEM",
        description:
          "Les mêmes standards que l'industrie qui fabrique vos phares, avec polymérisation UV en atelier pour un revêtement durci avant votre départ.",
        linkLabel: "Lire notre processus",
      },
      {
        eyebrow: "Résultats",
        title: "Avant / après, à chaque fois",
        description:
          "Vous voyez la différence avant de partir. Lentilles parfaitement claires avec scellement professionnel et protection UV.",
      },
      {
        eyebrow: "Service",
        title: "Atelier en Belgique, Europe entière",
        description: `Dépôt local à ${loc}, ou envoi de vos phares pour restauration postal partout en Europe.`,
      },
    ],
    bookCta: "Réserver",
  },
  howItWorks: {
    title: "Des phares parfaitement clairs en 3 étapes simples",
    intro:
      "Pas de tâtonnements. Pas de raccourcis. Un processus éprouvé qui place votre sécurité en premier, puis la technologie qui fait durer le résultat.",
    introLink: "Réserver",
    steps: [
      {
        eyebrow: "Étape 1",
        title: "Réservez en ligne",
        description:
          "Choisissez la taille, l'état et le mode de service. Le prix se met à jour instantanément, sans devis.",
      },
      {
        eyebrow: "Étape 2",
        title: "Visitez ou expédiez",
        description: `Dépôt à ${loc}, service mobile, ou envoi de vos phares partout en Europe.`,
      },
      {
        eyebrow: "Étape 3",
        title: "Roulez en confiance",
        description:
          "Nous restaurons, polymérisons UV et inspectons vos lentilles sur place. Le revêtement est durci avant votre départ. Pas de trajet délicat ni de garage sans poussière toute la nuit.",
      },
    ],
    processBody:
      "Notre processus utilise un équipement professionnel et des standards de restauration de confiance OEM, car un raccourci aujourd'hui signifie un jaunissement dans six mois.",
    processLink: "Lire l'étude complète du processus",
    carouselLabel: "Comment fonctionne la restauration de phares",
  },
  bookCta: {
    title: "Prêt à revoir la route clairement ?",
    body: "Réservez en ligne en quelques minutes. Choisissez taille, état et mode de service. Votre prix se met à jour instantanément. Sans devis.",
    link: "Réserver",
  },
  about: {
    title: "Restauration professionnelle de phares, rien d'autre",
    intro: `${site.name} existe pour une seule mission : restaurer les phares troubles et jaunis à une clarté d'origine et les protéger correctement. Pas de polissage rapide ni de services auto divers. Chaque lentille suit le même processus de qualité OEM : décapage, revêtement et polymérisation UV en atelier avant votre départ.`,
    whyTitle: "Pourquoi la qualité OEM compte",
    whyBody:
      "La protection UV défaillante explique pourquoi les phares se voilent à nouveau après un polissage. Nous supprimons cette couche entièrement, appliquons un vernis dur OEM et le polymérisons sur place pour un fini durci au départ. C'est la différence entre des semaines de clarté et des années.",
    whereTitle: "Où nous intervenons",
    whereBody: `Visitez notre atelier à ${loc}, choisissez le service mobile, ou expédiez vos phares par courrier partout en Europe. Même processus, même garantie, que vous déposiez sur place ou envoyiez vos lentilles.`,
    promiseTitle: "Notre engagement",
    promiseItems: [
      site.warranty,
      `${site.turnaround.local} à notre atelier`,
      "Inspection avant / après sur chaque restauration",
      "Tarifs fixes en ligne, sans appels de devis",
    ],
    processTitle: "Voir le processus complet",
    processBody:
      "Équipement, phases, et pourquoi la polymérisation UV avant restitution change tout pour les conducteurs qui veulent une clarté durable.",
    processLink: "Lire notre étude du processus",
    cta: "Réserver une restauration",
  },
  contact: {
    title: "Contact et visite",
    intro:
      "Réservez en ligne pour une réponse rapide, ou contactez-nous directement pour le dépôt, le service mobile ou la restauration par envoi postal en Europe.",
    addressTitle: "Adresse",
    addressPendingTemplate:
      "Adresse complète bientôt disponible. Réservez en ligne ou écrivez-nous pour l'itinéraire à {location}.",
    directionsLabel: "Itinéraire",
    hoursTitle: "Heures d'ouverture",
    hoursRows: [
      { days: "Lundi – vendredi", hours: "Sur rendez-vous" },
      { days: "Samedi", hours: "Sur rendez-vous" },
      { days: "Dimanche", hours: "Fermé" },
    ],
    reachTitle: "Nous joindre",
    dropOffTitle: "Dépôt et envoi postal",
    mapSrOnly: "Carte",
    mapPlaceholder:
      "La carte s'affichera ici une fois l'URL d'intégration Google Maps ajoutée dans les paramètres du site.",
    viewAllLocations: "Voir toutes les zones desservies",
    parkingNote:
      "Parking gratuit sur place pour le dépôt.",
    mailInNote:
      "Les colis postaux utilisent la même adresse d'atelier. Emballage et envoi sont sous votre responsabilité.",
    bookCta: "Réserver en ligne",
    emailCta: "Nous contacter",
  },
  pricing: {
    title: "Une restauration qui dure. Pas un polissage rapide.",
    summary:
      "Tarifs fixes pour une restauration professionnelle de phares. Sans appels de devis, sans frais cachés. Choisissez vos options sur la page de réservation et voyez votre prix exact instantanément.",
    bookLink: "Réserver",
    comparisonTitle: "Pourquoi choisir SHINES",
    comparisonIntro:
      "Nous ne faisons que la restauration professionnelle de phares : décapage, revêtement et polymérisation UV, pas un simple polissage. Voici ce qui est inclus par rapport à un kit DIY à domicile.",
    tableHeadAspect: "",
    tableHeadShines: "SHINES",
    tableHeadDiy: "Kit DIY",
    comingSoon: "Bientôt",
    tiersTitle: "Tarifs de départ",
    modifiersTitle: "Ce qui influence votre prix",
    footerCta: "Prêt à réserver ?",
    tiers: [
      {
        label: site.pricing.single.label,
        description: "Une lentille trouble, rayée ou jaunie.",
        includes: "Restauration, scellement et vernis dur UV polymérisé.",
      },
      {
        label: site.pricing.pair.label,
        description: "Éclairage équilibré. Notre option la plus réservée.",
        includes: "Restauration, scellement et polymérisation UV.",
      },
      {
        label: site.pricing.mailIn.label,
        description: `Expédiez depuis n'importe où en Europe si vous ne pouvez pas venir à ${loc}.`,
        includes: "Même processus de qualité OEM. Retour tarifé séparément.",
      },
    ],
    valueRows: [
      { label: "Inspection avant / après pour voir la différence" },
      { label: "Clarté qui dure des années, pas des semaines" },
      { label: "Vernis dur UV de qualité OEM qui protège pendant des années" },
      { label: "Entièrement durci avant votre départ" },
      { label: site.warranty },
      { label: "Contrôle de l'alignement des phares (réservation par paire)" },
      { label: "Spécialistes de la restauration de phares (nous ne faisons que cela)" },
      { label: "Couche UV d'origine retirée entièrement" },
      { label: `${site.turnaround.local} à notre atelier` },
      { label: "Atelier intérieur sans poussière ni contamination solaire" },
      { label: "Repose sur un polissage ou scellement temporaire uniquement" },
    ],
    modifiers: [
      {
        label: "Taille du phare",
        detail: "Standard, grand enveloppant ou formes complexes.",
      },
      {
        label: "État de la lentille",
        detail: "Légère opacité, oxydation importante ou dommages sévères.",
      },
      {
        label: "Mode de service",
        detail: `Visite à ${loc}, service mobile ou envoi postal en Europe.`,
      },
    ],
    comparisonClosing:
      "Les optiques OEM neuves coûtent souvent 300 à 800 € ou plus par côté. La restauration professionnelle offre une clarté comparable pour une fraction du prix lorsque les boîtiers sont encore sains.",
  },
  processPage: {
    label: "Processus",
    title: "Une restauration de phares professionnelle de confiance",
    summary: `SHINES restaure les phares avec un processus professionnel : décapage, revêtement et polymérisation UV en atelier. Chaque phare ou feu prend environ 30 à 60 minutes ; les deux phares, environ 45 à 90 minutes selon la taille et l'état. Au départ, le revêtement est déjà durci. Pas de trajet délicat, pas de garage sans poussière toute la nuit. Résultats protégés UV avec ${site.warranty.toLowerCase()}.`,
    bookCta: "Réserver une restauration",
    instantCureTitle: "Repartez avec un revêtement entièrement durci, pas des jours plus tard",
    instantCureBody:
      "Beaucoup d'ateliers polissent et scellent, mais omettent la polymérisation complète en atelier. Nous durcissons chaque lentille sur place avant restitution : vous pouvez rentrer chez vous directement, sous la pluie ou au lavage, sans craindre poussière, traces de doigts ou fini mou.",
    oemTitle: 'Pourquoi "qualité OEM" n\'est pas du marketing. C\'est de la chimie.',
    oemBody1:
      "Les phares en polycarbonate quittent l'usine avec un vernis dur UV. Quand ce vernis échoue, le plastique jaunit et se voile. Un polissage rapide ou un kit DIY ne fait que lustrer les dégâts. Sans nouveau vernis dur UV, la clarté s'estompe en quelques mois.",
    oemBody2:
      "Notre méthode suit la séquence professionnelle : décapage, finition, revêtement, polymérisation. C'est pourquoi le résultat ressemble et performe comme des lentilles neuves, pas comme un éclat temporaire.",
    pillarsTitle: "Le système en trois parties",
    overviewTitle: "Ce qui se passe lorsque vous réservez",
    overviewTiming: `Délai habituel : ${site.turnaround.local.toLowerCase()} à notre atelier à ${loc}. Dommages sévères ou lentilles surdimensionnées : délai plus long possible.`,
    stepLabelTemplate: "Étape {n}",
    pillars: [
      {
        title: "Préparation et ponçage de précision",
        description:
          "Nous retirons entièrement la couche UV d'origine défaillante, pas seulement un polissage superficiel, avec un ponçage professionnel contrôlé sur équipement dédié.",
      },
      {
        title: "Vernis dur UV de qualité OEM",
        description:
          "Un vernis dur UV de type OEM remplace la protection dont le polycarbonate a besoin pour rester clair. Pas de cire, pas de scellement, pas de spray rapide.",
      },
      {
        title: "Polymérisation UV et inspection",
        description:
          "Le revêtement est entièrement durci en atelier avant votre départ. Pas de fini mou, pas de polymérisation nocturne, pas de garage étanche à la poussière.",
      },
    ],
    overview: [
      {
        title: "Évaluer et préparer",
        description:
          "Nous inspectons les deux lentilles, masquons la carrosserie et confirmons que la restauration est la bonne option avant de commencer.",
      },
      {
        title: "Restaurer la surface de la lentille",
        description:
          "La protection UV défaillante est retirée et la lentille est affinée pour un fini lisse, prêt au revêtement, avec un équipement professionnel en atelier contrôlé.",
      },
      {
        title: "Appliquer une protection de type usine",
        description:
          "Un vernis dur UV de qualité OEM restaure la couche protectrice que vos phares ont perdue depuis l'usine.",
      },
      {
        title: "Polymériser, inspecter et restituer",
        description:
          "Le revêtement est durci sur place avant votre départ. Vous voyez l'avant / après et repartez sans trajet délicat.",
      },
    ],
    proofTitle: "Pourquoi les clients choisissent SHINES",
    proofIntro:
      "Nous visons des résultats et des standards vérifiables à la restitution, pas du jargon d'atelier.",
    proof: [
      {
        title: "Entièrement polymérisé avant votre départ",
        description:
          "Contrairement aux scellants non polymérisés ou revêtements à séchage à l'air, notre polymérisation en atelier durcit le fini avant restitution. Pas de trajet délicat, pas de garage sans poussière toute la nuit, pas de jours d'attente avant le lavage.",
        source: "Standard de service SHINES",
      },
      {
        title: "Performance UV testée AMECA",
        description:
          "Nous utilisons un vernis dur UV professionnel testé selon les protocoles d'exposition UV automobile. C'est la catégorie de protection prévue pour les lentilles d'origine.",
        source: "Normes de conformité équipement automobile",
      },
      {
        title: "Séquence de restauration standard de l'industrie",
        description:
          "La restauration professionnelle suit une séquence : retirer la couche défaillante, affiner la surface, appliquer un vernis dur UV et polymériser. Pas un polissage en une étape.",
        source: "Industrie de la restauration de phares",
      },
      {
        title: "Spécialistes de la restauration de phares",
        description:
          "Un seul service, exécuté professionnellement. Chaque lentille est évaluée, restaurée et inspectée par des techniciens formés selon le même standard.",
        source: "SHINES",
      },
      {
        title: "Environ 30 à 60 minutes par lentille",
        description:
          "Restauration plus polymérisation complète en atelier : environ 30 à 60 minutes par phare ou feu, ou environ 45 à 90 minutes pour les deux phares selon la taille et l'oxydation. Le revêtement est entièrement durci avant votre départ.",
        source: "Standard de service SHINES",
      },
    ],
    comparisonTitle: "Kit DIY vs. restauration professionnelle",
    comparisonHeaders: {
      aspect: "Facteur",
      diy: "DIY / polissage rapide",
      professional: "SHINES",
    },
    comparisonRows: [
      {
        aspect: "Ce qui est retiré",
        diy: "Voile superficiel seulement. L'ancienne couche UV reste souvent en dessous.",
        professional: "Couche UV d'origine défaillante retirée entièrement avant revêtement",
      },
      {
        aspect: "Protection du fini",
        diy: "Cire, scellement ou spray faible. Jaunit à nouveau en quelques mois.",
        professional: "Vernis dur UV polymérisé de qualité OEM qui protège pendant des années",
      },
      {
        aspect: "Équipement et atelier",
        diy: "Pad à main, perceuse ou setup dans l'allée",
        professional: "Outillage professionnel en atelier intérieur contrôlé",
      },
      {
        aspect: "Au moment du départ",
        diy: "Fini mou ou collant. Éviter poussière, pluie et lavage pendant des jours.",
        professional: "Entièrement durci sur place. Rentrez chez vous immédiatement.",
      },
      {
        aspect: "Inspection",
        diy: "Pas de contrôle structuré avant / après",
        professional: "Inspection avant / après pour voir la différence",
      },
      {
        aspect: "Durabilité",
        diy: "Semaines à mois avant le retour du voile",
        professional: `Des années de clarté avec protection UV adaptée, avec ${site.warranty.toLowerCase()}`,
      },
    ],
    standardsTitle: "Nos standards sur chaque intervention",
    standards: [
      "Atelier intérieur contrôlé pour éviter toute contamination",
      "Inspection avant / après sur chaque restauration",
      "Évaluation avant travail : nous disons honnêtement si le remplacement est plus sûr",
      "Tarifs fixes en ligne sans tergiversations de devis",
    ],
    closingTitle: "Prêt pour des phares clairs comme à l'usine ?",
    closingBody: `Réservez en ligne en quelques minutes. Tarifs fixes dès ${pairFrom} pour les deux phares. Visitez notre atelier à ${loc}, choisissez le service mobile ou expédiez en Europe.`,
    backHome: "Retour à l'accueil",
  },
  faq: {
    title: "Questions fréquentes",
    intro:
      "Réponses claires sur la restauration professionnelle de phares en Belgique et l'envoi postal en Europe : processus, tarifs, délais, contrôle technique et différence avec les kits DIY.",
    contactPrompt: "Vous ne trouvez pas votre réponse ?",
    contactOr: "ou",
    contactLink: "contactez-nous",
    items: [
      {
        question: "En quoi consiste la restauration professionnelle de phares ?",
        answer: `SHINES restaure les lentilles en polycarbonate avec un processus professionnel en plusieurs étapes : inspection, masquage de la carrosserie, suppression complète de la couche UV d'origine défaillante (pas seulement le voile superficiel), finition de la lentille, application d'un vernis dur UV de qualité OEM et polymérisation complète en atelier avant restitution. Vous voyez le résultat avant de partir. Vue d'ensemble : ${processUrl}.`,
      },
      {
        question: "Quels types de dommages pouvez-vous réparer ?",
        answer:
          "Oxydation extérieure, jaunissement, opacité, décoloration et rayures légères à modérées sur polycarbonate. Fissures profondes, éclats traversants ou plastique fortement fondu peuvent nécessiter un remplacement. Nous évaluons chaque lentille honnêtement avant intervention et recommandons des optiques neuves si la restauration n'est pas le choix sûr.",
      },
      {
        question: "Le voile vient-il de l'intérieur du phare ?",
        answer:
          "En général non. La plupart des phares troubles viennent de la dégradation UV et de l'oxydation à l'extérieur. L'humidité interne est rare et indique souvent un joint usé ou cassé. Les phares sont ventilés ; la chaleur de l'ampoule évacue normalement l'humidité légère. Si nous voyons des dommages internes, nous vous indiquons si restauration ou remplacement convient.",
      },
      {
        question: "Les lentilles sont-elles en verre ou en plastique ?",
        answer:
          "La majorité des phares modernes sont en polycarbonate : léger, résistant aux chocs et profilé pour l'aérodynamisme. Certains véhicules plus anciens (camions, utilitaires, classiques) peuvent encore avoir du verre. SHINES se spécialise dans la restauration professionnelle et le revêtement UV du polycarbonate, qui équipe la grande majorité des véhicules en Belgique et en Europe.",
      },
      {
        question: "Dois-je démonter mes phares ?",
        answer:
          "Non. Les phares peuvent rester sur le véhicule, c'est notre préférence. Nous masquons soigneusement la peinture autour de chaque optique. Un capot ouvert facilite l'accès. Si vos phares sont déjà démontés (par exemple après carrosserie), nous les traitons sur établi ; indiquez-le à la réservation.",
      },
      {
        question: "Combien de temps dure la restauration ?",
        answer: `Dans notre atelier à ${loc}, ${site.turnaround.localDetail} Les envois postaux en Europe prennent généralement ${site.turnaround.mailIn.toLowerCase()}, plus les délais d'expédition aller-retour.`,
      },
      {
        question: "Puis-je repartir immédiatement après la restauration ?",
        answer:
          "Oui. Contrairement aux ateliers qui polissent et demandent d'attendre des heures ou des jours, SHINES polymérise chaque lentille sur place avant restitution. Le revêtement est dur au départ, sans trajet délicat, sans garage sans poussière toute la nuit, et sans restriction avant pluie ou lavage.",
      },
      {
        question: "Pourquoi SHINES plutôt qu'un kit DIY ?",
        answer:
          "Les kits DIY peuvent aider sur un voile léger avec soin, mais ils sont génériques : un mauvais grain ou une pression excessive peut creuser les rayures, beaucoup ne retirent pas l'oxydation sévère, et les scellants bon marché échouent en quelques mois. SHINES adapte ponçage, composés et revêtement à chaque lentille selon le constructeur, la taille et l'état, avec outillage professionnel, vernis dur UV OEM et polymérisation en atelier. Chaque intervention inclut notre garantie clarté, pas une garantie générique de boîte.",
      },
      {
        question: "Quel est le prix en Belgique ?",
        answer: `Tarifs transparents dès ${pairFrom} pour les deux phares (${singleFrom} pour une lentille). L'envoi postal en Europe commence à ${mailInFrom} plus frais de port. Le prix final dépend de la taille, de l'état et du mode de service (atelier, mobile ou postal). Vous voyez le prix confirmé avant de vous engager.`,
      },
      {
        question: "La restauration vaut-elle le coup vs. des phares neufs ?",
        answer:
          "Les optiques OEM neuves coûtent souvent 300 à 800 € ou plus par côté, plus la pose. Si boîtiers, joints et électronique sont sains, la restauration professionnelle retrouve luminosité et aspect pour une fraction du prix, avec une protection UV conçue pour durer des années, pas des semaines.",
      },
      {
        question:
          "Les phares restaurés passent-ils le contrôle technique (keuring / contrôle technique) ?",
        answer:
          "Oui, lorsque la luminosité et la clarté respectent les normes légales. Nous évaluons avant intervention et recommandons le remplacement si c'est plus sûr pour la sécurité ou le contrôle.",
      },
      {
        question: "Combien de temps durent les résultats ?",
        answer: `Avec la couche UV défaillante retirée et un vernis dur professionnel réappliqué, les résultats durent généralement des années, pas des mois comme un polissage rapide. Chaque restauration SHINES inclut ${site.warranty.toLowerCase()}.`,
      },
      {
        question: "Servez-vous les clients hors de Belgique ?",
        answer: `Oui. Visitez notre atelier à ${loc}, réservez le service mobile où disponible, ou utilisez l'envoi postal partout en Europe. Nous vous guidons pour l'emballage, l'expédition entrante et le retour tarifé.`,
      },
    ],
  },
  footer: {
    finePrint: [
      `Les prix affichés sont des tarifs de départ dès ${pairFrom} pour les deux phares. Le prix final dépend de la taille, de l'état et du mode de service. Confirmé sur la page de réservation avant paiement.`,
      `Le retour postal est tarifé séparément selon votre localisation. Délai local : ${site.turnaround.local.toLowerCase()}. Commandes postales : généralement ${site.turnaround.mailIn.toLowerCase()}.`,
      `Chaque restauration inclut ${site.warranty.toLowerCase()}. Les résultats dépendent de l'état de la lentille ; nous évaluons chaque phare avant intervention.`,
    ],
    breadcrumb: "Restauration de phares",
    followTitle: "Suivez SHINES",
    copyrightTemplate: `Copyright © {year} ${site.name}. Tous droits réservés. Restauration de phares, {location} et Europe.`,
    contactLineBooking: `Réservez en ligne sur ${site.url.replace("https://", "")}/book ou écrivez à ${site.email}.`,
    contactLineEmail: `Des questions ? Écrivez à ${site.email}.`,
    columns: {
      bookPricing: {
        title: "Réserver et tarifs",
        links: [
          { label: "Réserver en ligne", href: "/book" },
          { label: "Tarifs", href: pricingPagePath },
          {
            label: `Un phare dès ${singleFrom}`,
            href: "/book",
          },
          {
            label: `Paire dès ${pairFrom}`,
            href: "/book",
          },
          {
            label: `Envoi postal dès ${mailInFrom}`,
            href: "/book",
          },
        ],
      },
      learn: {
        title: "En savoir plus",
        links: [
          { label: "Actualités", href: "/news" },
          { label: "Comment ça marche", href: "/#how-it-works" },
          { label: "Notre processus", href: processPagePath },
          { label: "Pourquoi restaurer", href: "/#technology" },
          { label: "Résultats", href: "/#proof" },
          { label: "FAQ", href: "/#faq" },
        ],
      },
      service: {
        title: "Service",
        links: [
          { label: `Atelier à ${loc}`, href: "/contact" },
          { label: "Villes en Belgique", href: locationsPagePath },
          { label: "Europe", href: europeHubPath },
          { label: "Domaines d'expertise", href: fieldCategoriesHubPath },
          { label: "Service mobile", href: "/book" },
          { label: "Envoi postal (Europe)", href: "/book" },
          { label: site.email, href: mailtoQuote() },
        ],
      },
      shines: {
        title: "SHINES",
        links: [
          { label: "À propos", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: site.warranty, href: pricingPagePath },
          { label: site.url.replace("https://", ""), href: site.url },
        ],
      },
    },
    legal: {
      privacy: "Politique de confidentialité",
      terms: "Conditions d'utilisation",
      warranty: "Garantie",
      locations: "Zones desservies",
      europe: "Europe",
      fields: "Domaines d'expertise",
    },
    changeRegionLabel: "Changer de pays ou région",
  },
  europe: {
    hubTitle: "Restauration de phares dans toute l'Europe",
    hubDescription:
      "SHINES est basé en Belgique avec service en atelier local et restauration par envoi postal sécurisé pour les conducteurs en Europe. Choisissez votre pays pour les détails et tarifs.",
    countryTitleTemplate: "Restauration de phares en {country}",
    countryIntroTemplate: `Restauration professionnelle pour les conducteurs en {country} ({countryLocal}). Envoyez vos phares à notre atelier belge ou visitez-nous à ${loc}. Polymérisation UV, durci avant votre départ.`,
    mailInNote:
      "L'envoi postal inclut guide d'emballage, suivi, restauration et retour tarifé à votre adresse.",
    belgiumGarage: `Atelier à ${loc}`,
    viewPricing: "Voir les tarifs",
  },
  fields: buildFieldCategoryMessagesFr(),
  locations: {
    belgiumTitle: "Zones desservies en Belgique",
    belgiumDescription:
      "Restauration professionnelle de phares dans toute la Belgique. Choisissez votre ville pour en savoir plus et réserver en ligne. Envoi postal disponible en Europe.",
    europeLink: "Parcourir tous les pays européens",
    cityWarrantyTemplate: `${site.warranty}. ${site.turnaround.local}. Service à {city}, {province}, et dans toute la Belgique.`,
    cityBookCta: `Réserver dès ${pairFrom}`,
    cityPricingCta: "Voir les tarifs",
  },
  regions: {
    pageTitle: "Choisissez votre marché ou région",
    currentMarketLabel: "Vous consultez actuellement le contenu pour",
    searchPlaceholder: "Rechercher un marché ou une région",
    noResults: "Aucun marché ne correspond à votre recherche.",
    breadcrumb: "Pays ou région",
    groups: [
      { id: "europe", title: "Europe" },
      { id: "other", title: "Autres régions" },
    ],
  },
  news: {
    indexTitle: "Actualités",
    latestTitle: "Dernières actualités",
    featuredSr: "Article à la une",
    aboutTitle: `À propos des actualités ${site.name}`,
    aboutBody: `Mises à jour, guides et nouveautés service de ${site.name}, votre spécialiste de la restauration professionnelle de phares en Belgique et en Europe.`,
    relatedTitle: "Articles connexes",
    readMore: "Lire la suite",
    categories: {
      UPDATE: "Mise à jour",
      GUIDE: "Guide",
      "PRESS RELEASE": "Communiqué",
      LOCAL: "Local",
      "QUICK TIP": "Conseil rapide",
    },
    subnav: {
      news: "Actualités",
      about: "À propos de SHINES",
      process: "Notre processus",
    },
  },
  legal: {
    privacyHeading: "Politique de confidentialité",
    privacyBody: `Nous utilisons vos données de réservation et de contact uniquement pour confirmer votre rendez-vous, effectuer la restauration et assurer le suivi. Nous ne vendons pas vos données. Questions : ${site.email}.`,
    termsHeading: "Conditions d'utilisation",
    termsBody: `Les prix sur ${site.url.replace("https://", "")} sont des tarifs de départ. Le prix final est confirmé sur la page de réservation avant paiement. Nous évaluons chaque lentille avant intervention et conseillons le remplacement si c'est plus sûr. Les conditions de garantie sont décrites sur notre page tarifs.`,
  },
  booking: {
    pageTitle: "Réservez votre restauration",
    pageIntro:
      "Choisissez la taille de vos phares, l'état des dégâts et le mode de service. Votre prix se met à jour instantanément. Tous les prix incluent la TVA sauf facture TVA pour entreprise.",
    stepLegends: {
      quantity: "1. Combien de phares ?",
      quantitySingleMobile: "Les visites mobiles ne sont pas disponibles pour un seul phare.",
      size: "2. Quelle taille ont vos phares ?",
      sizeHint:
        "Choisissez selon votre véhicule. Les phares plus grands ou complexes demandent plus de temps et de matériaux.",
      condition: "3. Quel est leur état ?",
      conditionHint: "Soyez honnête. Les dommages profonds demandent plus de ponçage et de temps.",
      service: "4. Comment souhaitez-vous être servi ?",
    },
    contactDetailsTitle: "Quelles sont vos coordonnées ?",
    shipAddressNote:
      "Nous conservons votre nom et adresse de retour pour associer votre colis à l'arrivée et renvoyer vos phares en toute sécurité.",
    mobileOutOfAreaNote:
      "Les visites mobiles sont disponibles en {area} uniquement (dans un rayon de {radius} km de notre atelier). Pour {country}, choisissez {shipLabel} ou contactez-nous pour un devis.",
    distanceLoading: "Calcul de la distance de déplacement…",
    distanceLoadingSlots: "Calcul de la distance avant d'afficher les créneaux…",
    mobileAddressRequired:
      "Saisissez votre adresse complète ci-dessus pour voir les créneaux disponibles.",
    submitEmailHint:
      "Nous envoyons votre confirmation par e-mail tout de suite. Questions ? Contactez-nous à",
    summaryTitle: "Votre réservation",
    summaryVat: "TVA incl. · {warranty}",
    summaryLabels: {
      size: "Taille",
      condition: "État",
      service: "Service",
      quantity: "Quantité",
      pair: "Les deux phares",
      single: "Un phare",
    },
    returnShippingNote:
      "Le retour postal est tarifé séparément avant l'envoi de vos phares.",
    priceFrom: "dès {price}",
    mobileTravelQuote:
      "{km} km aller simple · Frais de déplacement {fee} (TVA incl.). {breakdown}",
    steps: {
      options: "Options",
      details: "Vos coordonnées",
      schedule: "Planning",
      confirm: "Confirmation",
    },
    chooseOptions: "Choisissez vos options",
    quantity: [
      {
        label: "Un phare",
        description: "Restauration d'une lentille",
      },
      {
        label: "Les deux phares",
        description: "Le plus populaire, éclairage équilibré",
      },
    ],
    sizes: [
      {
        label: "Standard / Compact",
        description:
          "Petits phares plats ou ronds, ex. VW Golf, berlines anciennes, citadines.",
      },
      {
        label: "Grand / Enveloppant",
        description:
          "Phares modernes qui remontent vers l'aile, ex. BMW, Audi, SUV récents.",
      },
      {
        label: "Complexe / Surdimensionné",
        description:
          "Phares de camion extra larges ou formes anguleuses avec garnitures complexes.",
      },
    ],
    conditions: [
      {
        label: "Stade 1 : Légère opacité",
        shortLabel: "Légère opacité",
        description:
          "Légèrement trouble ou terne. Pas d'écaillage, juste une perte d'éclat d'origine.",
      },
      {
        label: "Stade 2 : Oxydation importante",
        shortLabel: "Oxydation importante",
        description:
          "Teinte jaune nette ou surface rugueuse. La lumière ne traverse plus clairement.",
      },
      {
        label: "Stade 3 : Dommages sévères",
        shortLabel: "Dommages sévères",
        description:
          "Vernis qui s'écaille, ou rayures profondes visibles dues aux gravillons.",
      },
    ],
    services: [
      {
        label: "Visite à notre atelier",
        description: "Notre option la plus économique. Déposez et attendez pendant l'intervention.",
      },
      {
        label: "Expédiez vos phares",
        description: "Service postal pratique pour les longues distances en Europe.",
      },
      {
        label: "Nous venons chez vous",
        description: `Profitez de notre service mobile, trajet aller-retour inclus jusqu'à ${site.mobileTravel.includedRadiusKm} km (distance mesurée en aller simple).`,
      },
    ],
    priceLabels: {
      base: "Base",
      size: "Taille",
      condition: "État",
      service: "Service",
      travel: "Déplacement",
      total: "Total",
      mailInHandling: "Frais envoi postal",
      mobileService: "Service mobile",
    },
    continue: "Continuer",
    back: "Retour",
    confirmBooking: "Confirmer la réservation et payer plus tard",
    whereTitle: {
      mobile: "Où devons-nous venir ?",
      ship: "D'où expédiez-vous ?",
      default: "Entrez vos coordonnées",
    },
    whereSubtitle: "Entrez votre nom et adresse :",
    fields: {
      firstName: "Prénom",
      lastName: "Nom",
      suffix: "Suffixe",
      street: "Rue et numéro",
      apartment: "Appartement, suite, code d'accès",
      postalCode: "Code postal",
      city: "Ville",
      country: "Pays / Région",
      businessAddress: "Il s'agit d'une adresse professionnelle",
      companyName: "Nom de l'entreprise",
      vatNumber: "Numéro de TVA",
      billingAddress: "Adresse de facturation",
      email: "Adresse e-mail",
      phone: "Numéro de mobile",
      vehicle: "Marque et modèle",
      notes: "Remarques",
      preferredSlot: "Date et heure souhaitées",
    },
    contactAside:
      "Nous envoyons votre confirmation de réservation immédiatement par e-mail. Votre mobile nous aide à vous joindre pour le rendez-vous et les détails de déplacement.",
    aboutSection: {
      ship: "À propos de votre réservation",
      default: "À propos de votre rendez-vous",
    },
    mailInHow: "Comment fonctionne l'envoi postal",
    pairOnlyMobile:
      "Nous avons mis à jour votre réservation pour les deux phares. Le service mobile n'est pas disponible pour un seul phare.",
    slotError: "Ce créneau n'est plus disponible. Veuillez en choisir un autre.",
    travelFeeNote:
      "Frais de déplacement exclus du total. Confirmés manuellement sous 24 h. Les frais de service mobile sont inclus.",
    validation: {
      firstName: "Entrez votre prénom.",
      lastName: "Entrez votre nom.",
      street: "Entrez votre rue et numéro.",
      postalCode: "Entrez votre code postal.",
      city: "Entrez votre ville.",
      companyName: "Entrez le nom de votre entreprise.",
      vatNumber: "Entrez votre numéro de TVA.",
      emailRequired: "Entrez votre adresse e-mail.",
      emailInvalid: "Entrez une adresse e-mail valide.",
      phoneRequired: "Entrez votre numéro de mobile.",
      phoneInvalid: "Entrez un numéro de mobile valide.",
      vehicle: "Entrez la marque et le modèle de votre véhicule.",
      preferredSlot: "Choisissez votre date et heure préférées.",
    },
    lookup: {
      title: "Retrouver votre réservation",
      intro:
        "Aucun compte requis. Entrez la référence de votre confirmation (ex. SH-1001) et l'e-mail utilisé lors de la réservation. Nous ouvrirons votre page de réservation privée.",
      label: "Référence de réservation",
      placeholder: "SH-1001",
      submit: "Ouvrir ma réservation",
      error: "Réservation introuvable.",
    },
    hub: {
      title: "Ma réservation",
      loading: "Chargement de votre réservation…",
      cancelled: "Cette réservation a été annulée.",
      bookmarkShip:
        "Aucun compte requis. Ajoutez cette page en favori pour suivre votre colis et gérer votre réservation postal.",
      bookmarkDefault:
        "Aucun compte requis. Ajoutez cette page en favori pour voir ou annuler votre rendez-vous.",
      details: "Détails",
      cancel: "Annuler la réservation",
      cancelConfirm:
        "Annuler cette réservation ? Nous libérerons votre créneau ou n'attendrons plus votre colis.",
      reference: "Votre réservation",
    },
    confirmation: {
      title: "Réservation confirmée",
      referenceLine: "Référence {reference}",
      totalLine: "Estimation {total} TVA incl. · {warranty}",
      stepsVisit: [
        "Arrivez à l'heure prévue, parking gratuit sur place pour le dépôt.",
        "Nous inspectons vos phares et confirmons le périmètre avant de commencer.",
        "Restauration et durcissement UV en général pendant l'attente (environ 30–90 min pour les deux phares).",
        "Récupérez votre véhicule avec notre garantie de clarté, paiement à l'atelier.",
      ],
      stepsMobile: [
        "Ayez le véhicule prêt et les phares accessibles à l'heure prévue.",
        "Notre technicien arrive dans le créneau réservé (le déplacement est inclus dans votre devis).",
        "Nous restaurons et durcissons UV sur place, pas de visite à l'atelier.",
        "Validez le résultat avec nous ; paiement après la prestation.",
      ],
      stepsShip: [
        "Réservez en ligne. Nous enregistrons votre réservation et affichons votre référence et l'adresse d'expédition.",
        "Emballez vos phares solidement et expédiez via votre transporteur local (le plus économique pour vous).",
        "Ajoutez votre numéro de suivi sur votre page de réservation (optionnel mais recommandé).",
        "Nous vous écrivons à l'arrivée du colis. Une fois la restauration terminée, payez le retour en une étape sur votre page de réservation, puis nous renvoyons vos phares.",
      ],
      visitLocationTitle: "Rendez-vous à",
      shipToTitle: "Expédier à",
      shipToFallback:
        "Nous enverrons l'adresse de l'atelier à {email}. Contactez-nous si vous en avez besoin plus tôt.",
      openBooking: "Ouvrir ma réservation",
      emailUs: "Nous écrire",
      footnote:
        "Conservez votre lien privé ou la référence {reference}. Aucun compte requis.",
      footnoteShip:
        "Conservez votre lien privé ou la référence {reference}. Indiquez la référence sur le colis avant expédition. Aucun compte requis.",
      emailSent:
        "Nous avons envoyé votre confirmation à l'adresse e-mail indiquée. Vérifiez aussi vos indésirables.",
      emailPending:
        "Votre réservation est enregistrée. Pas d'e-mail de confirmation sous quelques minutes ? Ouvrez votre réservation ci-dessous ou contactez-nous.",
    },
    mailIn: {
      confirmationTitle: "Réservation confirmée",
      confirmationSteps: [
        "Réservez en ligne. Nous enregistrons votre réservation et affichons votre référence et l'adresse d'expédition.",
        "Emballez vos phares solidement et expédiez via votre transporteur local (le plus économique pour vous).",
        "Ajoutez votre numéro de suivi sur votre page de réservation (optionnel mais recommandé).",
        "Nous vous écrivons à l'arrivée du colis. Une fois la restauration terminée, payez le retour en une étape sur votre page de réservation, puis nous renvoyons vos phares.",
      ],
      shippingTitle: "Suivi entrant",
      shippingCarrier: "Transporteur",
      shippingTracking: "Numéro de suivi",
      shippingSave: "Enregistrer le suivi",
      returnPayTitle: "Expédition retour",
      returnPayBody:
        "Votre restauration est terminée. Payez le retour en une étape, puis nous expédions vos phares à l'adresse enregistrée.",
      returnPayButton: "Payer l'expédition retour",
      returnPaid:
        "Retour payé. Nous préparons votre colis pour l'expédition.",
    },
    picker: {
      chooseDate: "Choisissez une date et une heure",
      chooseTime: "Horaires disponibles",
      noSlots: "Plus de créneaux ce jour.",
      loading: "Chargement des dates…",
    },
  },
  mailInFlow: {
    steps: [
      "Réserver en ligne",
      "Emballer et expédier vous-même",
      "Réception documentée",
      "Nous restaurons, polymérisons UV et renvoyons",
    ],
    stepDetails: [
      {
        title: "Réserver en ligne",
        description:
          "Choisissez le nombre de phares, taille et état, puis l'envoi postal. Pas de paiement immédiat ; nous confirmons par e-mail.",
      },
      {
        title: "Emballer et expédier vous-même",
        description:
          "Démontage, emballage et expédition sont entièrement sous votre responsabilité. Envoyez uniquement les phares dans un carton solide et bien rembourré avec suivi et assurance vers notre atelier en Belgique.",
      },
      {
        title: "Réception documentée",
        description:
          "Avant d'ouvrir votre colis, nous enregistrons le déballage en vidéo. Nous photographions chaque phare avant restauration. Cela protège les deux parties en cas de dommage en transit. Nous ne sommes pas responsables des dommages d'expédition ou d'un mauvais emballage.",
      },
      {
        title: "Nous restaurons, polymérisons UV et renvoyons",
        description: `Délai atelier habituel : ${site.turnaround.mailIn.toLowerCase()}. Nous restaurons, polymérisons entièrement le vernis UV, inspectons avec photos, puis renvoyons prêt à remonter. Le retour est tarifé avant expédition.`,
      },
    ],
    notes: [
      `Restauration dès ${formatPrice(site.pricing.mailIn.from)} par paire (hors envoi aller-retour).`,
      "Le retour postal est tarifé selon votre pays et la taille du colis avant expédition.",
      "N'envoyez que les unités phare, pas le véhicule entier.",
      "Utilisez un envoi suivi et assuré. Si nous ne recevons pas votre colis, rien n'est renvoyé.",
      "L'emballage est sous votre responsabilité. Conservez votre preuve d'envoi.",
      "Humidité dans le boîtier ou lentilles fissurées ? Indiquez-le à la réservation ; nous évaluons avant travail.",
      "Les colis postaux utilisent la même adresse d'atelier. Emballage et envoi sont sous votre responsabilité.",
    ],
    shipToNote:
      "Inscrivez votre référence de réservation à l'extérieur du colis. Utilisez un envoi suivi et assuré. Nous ne commençons pas tant que le colis n'est pas arrivé. Si nous ne le recevons pas, rien n'est renvoyé.",
    visitNote: `Dépôt à notre atelier à ${loc}. ${site.turnaround.local}. ${site.contact.parkingNote}`,
    unboxingNote:
      "Avant d'ouvrir votre colis, nous enregistrons le déballage en vidéo. Nous photographions ensuite chaque phare avant toute restauration. Cela vous protège, nous aussi, si une lentille est arrivée fissurée ou endommagée en transit. Note : nous ne sommes pas responsables des dommages survenus pendant l'expédition ou dus à un mauvais emballage.",
    workshopNote: `Délai atelier habituel : ${site.turnaround.mailIn.toLowerCase()}. Nous restaurons, polymérisons entièrement le vernis UV, inspectons avec photos, puis renvoyons prêt à remonter. Le retour est tarifé avant expédition.`,
  },
  mailInStatus: {
    awaiting_parcel: "En attente du colis",
    in_transit: "En transit",
    arrived: "Arrivé",
    in_workshop: "En atelier",
    ready_to_ship: "Prêt pour retour",
    return_shipped: "Retour expédié",
    completed: "Terminé",
  },
  mobilePricing: {
    manualQuoteTemplate:
      "{km} km aller simple, nous confirmons vos frais de déplacement sous 24 h. À cette distance, l'envoi postal est souvent plus avantageux.",
    breakdownLabels: {
      regio: "Déplacement région",
      extra: "Km supplémentaires (aller-retour)",
      total: "Total déplacement",
    },
  },
  appointments: {
    goTo: "Ouvrir ma réservation",
    returnTo: "Retour à la réservation",
    mailInAwaiting: "Envoi postal · en attente du colis",
    mobileNoticeTemplate:
      "Les visites mobiles réservent {hours} heures sur votre calendrier (estimation {km} km aller simple). Ayez le véhicule prêt à l'heure d'arrivée. Un retard peut affecter les rendez-vous suivants.",
  },
  articles: [
    {
      slug: "why-headlights-turn-yellow-and-hazy",
      publishedAt: "2026-05-20",
      category: "GUIDE",
      title: "Pourquoi les phares jaunissent et se voilent (et ce qui les répare vraiment)",
      dek: "La protection UV d'origine échoue avec le temps. Un polissage seul ne la remplace pas. Ce que les conducteurs en Belgique et en Europe doivent savoir.",
      image: {
        src: "/news/why-headlights-turn-yellow-and-hazy.png",
        alt: "Avant et après restauration de phare montrant une lentille jaune trouble redevenue claire",
      },
      thumbnailClass: "from-[#1a3a5c] to-[#0076df]",
      featured: true,
      tags: [
        "phares jaunes",
        "restauration de phares",
        "vernis UV",
        "lentilles polycarbonate",
      ],
      blocks: [
        {
          type: "paragraph",
          text: "Si vos phares étaient clairs à l'achat mais brillent maintenant en jaune ou diffusent la lumière la nuit, le problème n'est généralement pas la saleté. Les phares modernes sont en polycarbonate avec un vernis dur UV d'origine. Soleil, gravillons et cycles de chaleur dégradent ce vernis. Une fois échoué, le plastique s'oxyde.",
        },
        {
          type: "paragraph",
          text: "Un polissage rapide ou un kit DIY peut améliorer l'aspect pendant quelques semaines. Il retire le voile superficiel mais laisse le plastique sous-jacent sans protection. Sans nouveau vernis dur UV, le jaunissement revient vite, surtout sur les voitures garées dehors sous le climat belge et européen.",
        },
        {
          type: "heading",
          text: "Ce que change une restauration professionnelle",
        },
        {
          type: "list",
          items: [
            "La couche UV d'origine défaillante est retirée entièrement, pas polie par-dessus.",
            "La lentille est affinée pour un fini lisse, prêt au revêtement.",
            "Un vernis dur UV de qualité OEM remplace la protection perdue.",
            "Le revêtement est durci en atelier avant restitution : vous pouvez rentrer chez vous immédiatement.",
          ],
        },
        {
          type: "paragraph",
          text: `Chez ${site.name}, nous suivons cette séquence complète à chaque restauration. Tarifs fixes dès ${pairFrom} pour les deux phares. Réservez en ligne ou consultez notre processus pour voir ce qui se passe lors de votre visite à notre atelier à ${loc}.`,
        },
      ],
    },
    {
      slug: "professional-headlight-restoration-vs-diy-kits",
      publishedAt: "2026-05-18",
      category: "GUIDE",
      title: "Restauration professionnelle vs kits DIY : ce qui dure",
      dek: "Les kits coûtent peu au départ. Le travail pro coûte plus une fois. Comment choisir selon durabilité, sécurité et coût total.",
      image: {
        src: "/news/professional-headlight-restoration-vs-diy-kits.png",
        alt: "Comparaison restauration professionnelle de phares vs kits DIY montrant un résultat DIY trouble à côté d'un résultat pro clair",
      },
      thumbnailClass: "from-[#2c2c2e] to-[#6e6e73]",
      tags: ["restauration DIY phares", "kits phares", "vernis dur UV"],
      blocks: [
        {
          type: "paragraph",
          text: "Les kits DIY promettent une clarté showroom en un après-midi. Pour certains conducteurs, c'est suffisant. Pour ceux qui ont besoin d'une visibilité nocturne fiable pendant des années, l'écart entre un polissage dans l'allée et une restauration professionnelle est grand.",
        },
        {
          type: "heading",
          text: "Où les kits DIY échouent",
        },
        {
          type: "list",
          items: [
            "La plupart polissent la surface sans retirer entièrement la couche UV défaillante en dessous.",
            "Scellants et cires ne remplacent pas un vernis dur UV de type usine.",
            "Les résultats s'estompent souvent en semaines ou mois, surtout avec exposition solaire quotidienne.",
            "Un ponçage inégal peut laisser des lentilles ondulées qui diffusent la lumière plus qu'avant.",
          ],
        },
        {
          type: "heading",
          text: "Ce que vous obtenez avec une restauration professionnelle",
        },
        {
          type: "list",
          items: [
            "Atelier contrôlé et outillage dédié pour des résultats constants.",
            "Séquence complète : décapage, finition, revêtement et polymérisation en atelier.",
            "Inspection avant / après à la restitution.",
            `${site.warranty} sur la clarté lorsque la lentille convient à la restauration.`,
          ],
        },
        {
          type: "paragraph",
          text: "Pour comparer les options, consultez notre page tarifs pour les prix de départ fixes et réservez un créneau quand vous êtes prêt. Lentilles fortement fissurées ou profondément piquetées : remplacement possible ; nous évaluons honnêtement avant intervention.",
        },
      ],
    },
    {
      slug: "shines-launches-headlight-restoration-belgium",
      publishedAt: "2026-05-15",
      category: "PRESS RELEASE",
      title: `${site.name} lance la restauration professionnelle de phares en Belgique`,
      dek: `Nouveau service avec résultats de qualité OEM polymérisés UV dès ${pairFrom} par paire, visites atelier, options mobiles et envoi postal en Europe.`,
      image: {
        src: "/news/shines-launches-headlight-restoration-belgium.png",
        alt: "Lancement restauration professionnelle de phares SHINES en Belgique avec phares avant/après en atelier",
      },
      thumbnailClass: "from-[#0b0b0e] to-[#0076df]",
      tags: ["SHINES", "Belgique", "restauration de phares", "AutoRepair"],
      blocks: [
        {
          type: "paragraph",
          text: `${site.name} annonce aujourd'hui la restauration professionnelle de phares pour les conducteurs à ${loc} et en Europe. Le service cible les lentilles en polycarbonate troubles, jaunies et endommagées par les UV avec un processus décapage, revêtement et polymérisation en atelier.`,
        },
        {
          type: "paragraph",
          text: `Délai habituel : ${site.turnaround.local.toLowerCase()} à l'atelier. Les clients postaux en Europe peuvent expédier leurs phares ; le retour est tarifé séparément. Chaque intervention inclut ${site.warranty.toLowerCase()}.`,
        },
        {
          type: "heading",
          text: "Comment réserver",
        },
        {
          type: "paragraph",
          text: `Les clients réservent en ligne sur ${site.url.replace("https://", "")}/book avec tarifs de départ affichés avant paiement. Questions : ${site.email}.`,
        },
      ],
    },
    {
      slug: "foggy-headlights-vehicle-inspection-belgium",
      publishedAt: "2026-05-12",
      category: "LOCAL",
      title: "Des phares troubles peuvent-ils faire échouer le contrôle technique en Belgique ?",
      dek: "Des lentilles voilées réduisent l'éclairage et peuvent poser des problèmes de conformité. Ce que les conducteurs belges doivent vérifier avant un contrôle ou un long trajet de nuit.",
      image: {
        src: "/news/foggy-headlights-vehicle-inspection-belgium.png",
        alt: "Phare jaune et trouble sur une voiture dans un atelier de contrôle technique belge",
      },
      thumbnailClass: "from-[#003d6b] to-[#5ac8fa]",
      tags: [
        "Belgique",
        "contrôle technique",
        "clarté des phares",
        "sécurité routière",
      ],
      blocks: [
        {
          type: "paragraph",
          text: "Les conducteurs belges remarquent souvent les problèmes de phares la nuit : faisceaux faibles, lueur jaune ou lumière dispersée sur la lentille. Au-delà du confort, une sortie réduite affecte la distance à laquelle vous voyez piétons, cyclistes et marquages.",
        },
        {
          type: "paragraph",
          text: "Le contrôle technique vérifie si l'éclairage fonctionne comme prévu. Des phares fortement voilés ou mal alignés peuvent attirer l'attention car ils ne produisent plus un faisceau prévisible. La restauration coûte souvent moins cher que le remplacement lorsque le boîtier est encore sain.",
        },
        {
          type: "heading",
          text: "Quand la restauration a du sens",
        },
        {
          type: "list",
          items: [
            "Lentilles jaunes ou troubles sans fissures majeures ni entailles profondes.",
            "L'humidité dans le boîtier doit d'abord être résolue ; nous conseillons lors de l'évaluation.",
            "Vous voulez un éclairage clair comme à l'usine sans payer des optiques complètes.",
          ],
        },
        {
          type: "paragraph",
          text: `${site.name} sert les conducteurs en Belgique avec atelier, mobile et envoi postal. Consultez notre index des zones pour les pages par ville, ou réservez directement si vous connaissez déjà votre mode de service.`,
        },
      ],
    },
    {
      slug: "mail-in-headlight-restoration-europe",
      publishedAt: "2026-05-08",
      category: "UPDATE",
      title: "Restauration de phares par envoi postal disponible dans toute l'Europe",
      dek: `Expédiez vos phares à ${site.name} pour le même fini professionnel polymérisé UV que notre service atelier local.`,
      image: {
        src: "/news/mail-in-headlight-restoration-europe.png",
        alt: "Restauration de phares par envoi postal SHINES avec colis emballé, phares restaurés et formulaire de commande",
      },
      thumbnailClass: "from-[#1c1c1e] to-[#48484a]",
      tags: ["envoi postal", "Europe", "restauration de phares"],
      blocks: [
        {
          type: "paragraph",
          text: `Les conducteurs hors ${loc} peuvent désormais utiliser le service postal ${site.name}. Retirez les phares, emballez-les solidement et expédiez-les à notre atelier. Nous restaurons, polymérisons UV et les renvoyons prêts à remonter.`,
        },
        {
          type: "paragraph",
          text: `Tarif postal dès ${mailInFrom} par paire. Délai habituel : ${site.turnaround.mailIn.toLowerCase()}. Le retour est tarifé selon votre pays avant confirmation.`,
        },
        {
          type: "heading",
          text: "Avant d'expédier",
        },
        {
          type: "list",
          items: [
            "Réservez en ligne et sélectionnez l'envoi postal pour recevoir le guide d'emballage.",
            "Photographiez les lentilles avant expédition pour vos archives.",
            "Signalez fissures, humidité ou points de fixation cassés dans les remarques de réservation.",
          ],
        },
      ],
    },
    {
      slug: "drive-away-fully-cured-why-in-shop-hardening-matters",
      publishedAt: "2026-05-05",
      category: "QUICK TIP",
      title: "Repartez avec un revêtement entièrement durci : pourquoi la polymérisation en atelier compte",
      dek: "Certains revêtements restent mous pendant des jours. Le nôtre est durci avant restitution : pluie, poussière et trajet retour ne peuvent pas abîmer le fini.",
      image: {
        src: "/news/drive-away-fully-cured-why-in-shop-hardening-matters.png",
        alt: "Restauration de phare polymérisée UV en atelier professionnel avec lampe de polymérisation",
      },
      thumbnailClass: "from-[#0076df] to-[#64d2ff]",
      tags: ["polymérisation UV", "revêtement phare", "trajet retour"],
      blocks: [
        {
          type: "paragraph",
          text: "Tous les services de phares ne polymérisent pas entièrement le nouveau vernis UV avant votre départ. Scellants à séchage à l'air ou non polymérisés peuvent rester collants des heures ou des jours. Poussière, traces de doigts ou une pluie légère au retour peuvent marquer la lentille.",
        },
        {
          type: "paragraph",
          text: `${site.name} durcit chaque restauration sur place avant restitution. Vous pouvez rentrer chez vous immédiatement, laver la voiture comme d'habitude, et éviter le garage sans poussière toute la nuit que certains ateliers demandent encore.`,
        },
        {
          type: "paragraph",
          text: "C'est l'une des questions les plus simples à poser à tout prestataire : le revêtement est-il entièrement durci avant mon départ ? Si la réponse est non, comptez le risque de reprise et de temps perdu.",
        },
      ],
    },
  ],
};
