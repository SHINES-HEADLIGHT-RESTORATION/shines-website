import type { FieldCategoryMessages } from "@/lib/field-category-content";
import { formatPrice, locationLabel, site } from "@/lib/site";

const warrantyFr = "garantie clarté 1 an";
const turnaroundLocalFr = "Environ 30 à 60 minutes par lentille";
const turnaroundMailInFr = "3 à 5 jours ouvrables";

/** French copy for vakgebieden pages. */
export function buildFieldCategoryMessagesFr(): FieldCategoryMessages {
  const loc = locationLabel();
  const pairFrom = formatPrice(site.pricing.pair.from);

  return {
    hubTitle: "Domaines d'expertise : ce que fait SHINES",
    hubBreadcrumb: "Domaines d'expertise",
    hubDescription: `SHINES à ${loc} est un atelier spécialisé dans la restauration de phares et d'optiques. Ces pages décrivent notre activité dans les domaines qui correspondent à notre expertise : entretien et préparation au contrôle technique, smart repair esthétique, detailing professionnel des lentilles et restauration optique complète.`,
    hubSectionTitle: "Parcourir par domaine",
    viewPricing: "Voir les tarifs",
    bookCta: `Réserver dès ${pairFrom}`,
    otherCategories: "Autres domaines",
    categories: {
      "autoreparatie-en-onderhoud": {
        name: "Réparation et entretien automobile",
        h1: "Entretien des phares et réparation prête pour le contrôle technique",
        metaDescription: `Refus au contrôle technique pour phares troubles ? SHINES à ${loc} restaure luminosité et clarté pour un faisceau sûr, moins cher que des optiques neuves. Flandre occidentale et Europe.`,
        summary: `Des phares mats ou jaunis réduisent la visibilité et sont une cause fréquente de refus au contrôle technique. SHINES restaure la clarté optique et un faisceau correct pour que votre véhicule roule à nouveau en sécurité, sans remplacer les blocs complets lorsque le boîtier est encore sain.`,
        pain: {
          title: "Le problème : refus au contrôle et éclairage dangereux",
          paragraphs: [
            "Des lentilles troubles, oxydées ou rayées dispersent la lumière au lieu de projeter un faisceau net. Moins de visibilité la nuit, et souvent un refus au contrôle.",
            "De nouveaux phares des deux côtés coûtent rapidement plusieurs centaines d'euros par unité. Lorsque joints, fixations et électronique sont intacts, le remplacement est souvent un coût inutile.",
          ],
        },
        solution: {
          title: "Notre approche : réparation optique professionnelle",
          paragraphs: [
            "Nous évaluons chaque lentille avant intervention. Ponçage et polissage industriels retirent la couche UV défaillante ; nous appliquons ensuite un vernis dur UV de qualité OEM, polymérisé en atelier, pas un scellant temporaire.",
            "Nous restaurons luminosité et qualité du faisceau selon les normes pratiques du contrôle. Si une lentille est trop abîmée pour une restauration sûre, nous le disons honnêtement avant paiement.",
          ],
        },
        gain: {
          title: "Ce que vous gagnez",
          paragraphs: [
            `Économies importantes par rapport à des phares OEM neufs, restauration dès ${pairFrom} pour une paire lorsque l'état le permet.`,
            "Roulez avec une visibilité retrouvée, passez le contrôle sereinement et préservez la valeur de revente avec des lentilles qui paraissent et fonctionnent comme neuves.",
          ],
        },
        services: {
          title: "Services connexes",
          items: [
            "Phares prêts pour le contrôle technique",
            "Restauration de phares jaunes ou orange",
            "Correction de trouble / voile sur les optiques",
            "Polissage professionnel et vernis UV",
            "Correction après échec DIY",
          ],
        },
        faq: {
          title: "Questions fréquentes",
          items: [
            {
              question: "Des phares restaurés peuvent-ils passer le contrôle technique ?",
              answer:
                "Oui, lorsque luminosité et clarté respectent les normes légales de visibilité. Nous évaluons l'état d'abord et conseillons le remplacement si c'est plus sûr.",
            },
            {
              question: "La restauration est-elle moins chère que de nouveaux phares ?",
              answer:
                "Dans la plupart des cas, oui. De nouveaux ensembles OEM coûtent souvent 300 à 800 € ou plus par côté. La restauration retrouve clarté et protection UV pour une fraction de ce prix lorsque les boîtiers sont sains.",
            },
            {
              question: "Combien de temps dure le service en atelier ?",
              answer: `${turnaroundLocalFr}. Le vernis UV est durci avant votre départ, pas de jours d'attente pour un scellant.`,
            },
          ],
        },
        geo: {
          title: "Zone desservie",
          body: `Atelier à ${loc}, Flandre occidentale. Service mobile dans la région et restauration par envoi postal en Belgique et en Europe.`,
        },
      },
      autoschadebedrijf: {
        name: "Carrosserie",
        h1: "Smart repair esthétique des phares et plastiques",
        metaDescription: `Smart repair esthétique pour phares rayés, décolorés ou abîmés à ${loc}. Pas de remplacement complet, restauration professionnelle des pièces optiques en plastique. Flandre occidentale.`,
        summary: `Tous les problèmes de phares ne demandent pas une unité neuve. SHINES est spécialisé dans le smart repair des dommages optiques : rayures, décoloration UV et défauts de surface sur lentilles de phares et feux arrière, pour retrouver l'aspect d'origine sans coût de remplacement carrosserie.`,
        pain: {
          title: "Le problème : dommages visibles et devis de remplacement",
          paragraphs: [
            "Rayures de parking, impacts de gravillons et dégradation UV vieillissent les lentilles et aggravent la dispersion lumineuse. Les garages offrent souvent un remplacement complet.",
            "Assurance et frais personnels augmentent alors que seule la couche externe est touchée.",
          ],
        },
        solution: {
          title: "Smart repair pour pièces optiques",
          paragraphs: [
            "Nous restaurons la couche transparente : ponçage progressif retire les dommages, polissage machine retrouve la clarté, vernis UV scelle le résultat des années, pas des semaines.",
            "C'est une réparation cosmétique et optique sur unités existantes, la même philosophie que le smart repair des pare-chocs, appliquée aux composants d'éclairage.",
          ],
        },
        gain: {
          title: "Ce que vous gagnez",
          paragraphs: [
            "Évitez un remplacement inutile et conservez le montage et l'électronique OEM d'origine.",
            "Aspect uniforme et soigné avant et arrière, important pour la revente et la fierté au quotidien.",
          ],
        },
        services: {
          title: "Services connexes",
          items: [
            "Réparation esthétique des rayures et décoloration sur phares",
            "Polissage et protection UV des feux arrière",
            "Correction après tentative DIY ratée",
            "Restauration par envoi pour unités rares ou classiques",
          ],
        },
        faq: {
          title: "Questions fréquentes",
          items: [
            {
              question: "Réparez-vous les boîtiers fissurés ou cassés ?",
              answer:
                "Nous restaurons la clarté optique sur boîtiers intacts. Fissures structurelles, fixations cassées ou infiltration d'humidité peuvent exiger un remplacement, nous évaluons honnêtement avant de commencer.",
            },
            {
              question: "Est-ce la même chose qu'une carrosserie classique ?",
              answer:
                "Nous sommes spécialisés dans la restauration optique des blocs d'éclairage, pas en tôlerie ou peinture. Pour un smart repair spécifique aux lentilles, nous allons plus loin qu'un simple polissage carrosserie.",
            },
            {
              question: "Pouvez-vous corriger les dégâts d'un kit DIY ?",
              answer:
                "Oui, un grain ou composé mal utilisé est une raison fréquente de consultation. Nous reconstruisons correctement la surface avant la protection UV professionnelle.",
            },
          ],
        },
        geo: {
          title: "Zone desservie",
          body: `Basé à ${loc}. Conducteurs à Ingelmunster, Izegem, Roulers, Courtrai, Waregem, Tielt et toute la Flandre occidentale. Envoi postal dans toute l'Europe.`,
        },
      },
      autoschoonmaakdienst: {
        name: "Service de nettoyage automobile",
        h1: "Detailing professionnel des phares et polissage des lentilles",
        metaDescription: `Detailing haut de gamme des lentilles de phares et feux à ${loc}. Polissage machine, clarté retrouvée et scellant UV, finition showroom sans brillance temporaire de kit. Flandre occidentale.`,
        summary: `Le detailing de phares va au-delà d'un simple polissage. SHINES utilise composés professionnels, polissage machine et scellant UV durable pour restaurer une transparence profonde, le même niveau de soin qu'un detailing premium, centré sur les composants optiques qui définissent l'aspect de votre voiture et votre visibilité nocturne.`,
        pain: {
          title: "Le problème : finition terne et brillance DIY éphémère",
          paragraphs: [
            "Kits bon marché et polissage à la main donnent une brillance temporaire mais laissent des micro-rayures ou échouent en quelques semaines au soleil et sous la pluie.",
            "Des lentilles ternes font paraître une voiture propre fatiguée et réduisent la luminosité quand vous en avez le plus besoin.",
          ],
        },
        solution: {
          title: "Processus detailing pour lentilles",
          paragraphs: [
            "Nous traitons phares et feux arrière avec la même discipline qu'un detailing premium : séquence de grains correcte, polissage machine et vernis dur UV résistant à la chaleur.",
            "Le polissage seul ne suffit pas, nous scellons la surface pour que la transparence dure, comme les detailers protègent la peinture, appliqué au plastique optique.",
          ],
        },
        gain: {
          title: "Ce que vous gagnez",
          paragraphs: [
            "Clarté et profondeur showroom, idéal avant vente, après achat ou pour un véhicule au meilleur de sa forme.",
            "Résultat durable avec protection UV, pas une brillance qui disparaît à la prochaine pluie.",
          ],
        },
        services: {
          title: "Services connexes",
          items: [
            "Polissage machine des phares",
            "Clarté et couleur des feux arrière",
            "Vernis UV après polissage",
            "Rafraîchissement optique avant vente",
            "Detailing mobile (phares sur site)",
          ],
        },
        faq: {
          title: "Questions fréquentes",
          items: [
            {
              question: "Quelle différence avec un kit DIY ?",
              answer:
                "Les kits DIY utilisent abrasifs génériques et scellants faibles. Nous adaptons le processus à l'état de la lentille et terminons par un vernis dur UV polymérisé en atelier.",
            },
            {
              question: "Détaillez-vous toute la voiture ?",
              answer:
                "Notre spécialité sont les composants optiques, phares et feux arrière. C'est là que nos équipements et revêtements sont optimisés.",
            },
            {
              question: "Combien de temps dure le résultat ?",
              answer: `Avec une protection UV correcte, le résultat dure typiquement des années. Chaque restauration inclut notre ${warrantyFr}.`,
            },
          ],
        },
        geo: {
          title: "Zone desservie",
          body: `Atelier detailing à ${loc}. Service mobile phares en Flandre occidentale où disponible. Unités par envoi postal bienvenues de Belgique et d'Europe.`,
        },
      },
      autorestauratie: {
        name: "Restauration automobile",
        h1: "Restauration technique des blocs d'éclairage oxydés et vieillis",
        metaDescription: `Restauration optique complète pour phares fortement jaunis, oxydés ou vintage à ${loc}. Processus industriel, reconstruction UV, envoi postal pour classiques. Belgique et Europe.`,
        summary: `La restauration automobile chez SHINES signifie ramener des blocs fortement dégradés à leur état optique d'origine, sur un véhicule quotidien, une classique ou un modèle rare où les pièces neuves sont introuvables. Nous reconstruisons la clarté à partir d'une dégradation UV sévère, pas seulement une brillance de surface.`,
        pain: {
          title: "Le problème : oxydation sévère et unités irremplaçables",
          paragraphs: [
            "Des lentilles entièrement jaunes ou orange ont perdu leur barrière UV d'usine. La luminosité chute fortement ; les unités classiques ou discontinuées ne sont parfois plus disponibles neuves.",
            "Un polissage superficiel ne corrige pas une dégradation profonde, la couche endommagée doit être correctement retirée et reconstruite.",
          ],
        },
        solution: {
          title: "Restauration complète, pas un polissage rapide",
          paragraphs: [
            "Nous retirons les couches UV défaillantes par ponçage et polissage industriel contrôlé, puis reconstruisons la protection avec un vernis dur UV durable.",
            "L'envoi postal permet aux propriétaires en Europe d'expédier des unités démontables, idéal pour classiques, exclusives et projets où la lentille d'origine doit être conservée.",
          ],
        },
        gain: {
          title: "Ce que vous gagnez",
          paragraphs: [
            "Conservez unités d'origine et authenticité sur classiques et modèles limités.",
            "Retrouvez luminosité et aspect proches du neuf, sécurité et valeur du véhicule préservées.",
          ],
        },
        services: {
          title: "Services connexes",
          items: [
            "Restauration de lentilles fortement jaunes / orange",
            "Restauration de phares par envoi postal (Europe)",
            "Blocs d'éclairage classiques et vintage",
            "Phares avant et feux arrière combinés",
            "Correction profonde après échec DIY",
          ],
        },
        faq: {
          title: "Questions fréquentes",
          items: [
            {
              question: "Pouvez-vous restaurer des phares très anciens ou classiques ?",
              answer:
                "Oui, l'envoi postal est populaire pour les classiques dont les unités sont démontées pour restauration. Nous évaluons photos ou pièces avant devis.",
            },
            {
              question: "Comment fonctionne la restauration par envoi ?",
              answer: `Emballez et expédiez à notre atelier à ${loc}. Délai typique : ${turnaroundMailInFr.toLowerCase()}. Retour tarifé à votre adresse.`,
            },
            {
              question: "Quand la restauration n'est-elle plus possible ?",
              answer:
                "Fissures profondes, humidité interne ou delamination peuvent exiger un remplacement. Nous inspectons d'abord et conseillons l'option sûre.",
            },
          ],
        },
        geo: {
          title: "Zone desservie",
          body: `Atelier de restauration à ${loc}, Belgique. Envoi postal dans toute l'Europe. Visites atelier sur rendez-vous en Flandre occidentale.`,
        },
      },
    },
  };
}
