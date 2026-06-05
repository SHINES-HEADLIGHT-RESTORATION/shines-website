import type { FieldCategoryMessages } from "@/lib/field-category-content";
import { formatPrice, locationLabel, site } from "@/lib/site";

const warrantyDe = "1-jährige Klarheitsgarantie";
const turnaroundLocalDe = "Etwa 30–60 Minuten pro Linse";
const turnaroundMailInDe = "3–5 Werktage";

/** German copy for vakgebieden pages. */
export function buildFieldCategoryMessagesDe(): FieldCategoryMessages {
  const loc = locationLabel();
  const pairFrom = formatPrice(site.pricing.pair.from);

  return {
    hubTitle: "Fachgebiete: was SHINES macht",
    hubBreadcrumb: "Fachgebiete",
    hubDescription: `SHINES in ${loc} ist eine spezialisierte Werkstatt für Scheinwerfer- und Optik-Restaurierung. Diese Seiten erklären unsere Arbeit in den Fachgebieten, die zu unserer Expertise passen: Wartung und TÜV-/Keuringsbereitschaft, kosmetischer Smart Repair, professionelles Linsen-Detailing und vollständige optische Restaurierung.`,
    hubSectionTitle: "Nach Fachgebiet durchsuchen",
    viewPricing: "Preise ansehen",
    bookCta: `Ab ${pairFrom} buchen`,
    otherCategories: "Weitere Fachgebiete",
    categories: {
      "autoreparatie-en-onderhoud": {
        name: "Kfz-Reparatur und -Wartung",
        h1: "Scheinwerfer-Wartung und prüfungsfertige Reparatur",
        metaDescription: `Abgelehnt bei der technischen Prüfung wegen trüber Scheinwerfer? SHINES in ${loc} stellt Lichtleistung und Linsenklarheit für einen sicheren Lichtstrahl wieder her, günstiger als neue Einheiten. Westflandern und Europa.`,
        summary: `Matte oder vergilbte Scheinwerfer mindern die Sicht und sind ein häufiger Grund für Ablehnung bei der technischen Prüfung. SHINES stellt optische Klarheit und einen korrekten Lichtstrahl wieder her, damit Ihr Fahrzeug wieder sicher fahren kann, ohne komplette Scheinwerfer-Einheiten zu ersetzen, wenn das Gehäuse noch intakt ist.`,
        pain: {
          title: "Das Problem: Ablehnung und unsicheres Licht",
          paragraphs: [
            "Trübe, oxidierte oder zerkratzte Linsen streuen Licht statt einen klaren Strahl zu projizieren. Weniger Sicht bei Nacht, und oft Ablehnung bei der Prüfung.",
            "Neue Scheinwerfer auf beiden Seiten kosten schnell mehrere hundert Euro pro Stück. Wenn Dichtungen, Halterungen und Elektronik noch intakt sind, ist Ersatz oft unnötige Kosten.",
          ],
        },
        solution: {
          title: "Unser Ansatz: professionelle Optik-Reparatur",
          paragraphs: [
            "Wir bewerten jede Linse vor Arbeitsbeginn. Industrielles Schleifen und Polieren entfernt die fehlgeschlagene UV-Schicht; danach tragen wir einen OEM-UV-Hardcoat auf, in der Werkstatt ausgehärtet, kein temporärer Wischversiegeler.",
            "Wir stellen Helligkeit und Strahlqualität nach praktischen Prüfungsnormen wieder her. Ist eine Linse zu weit geschädigt für sichere Restaurierung, sagen wir das ehrlich, bevor Sie zahlen.",
          ],
        },
        gain: {
          title: "Was Sie gewinnen",
          paragraphs: [
            `Deutliche Ersparnis gegenüber neuen OEM-Scheinwerfern, Restaurierung ab ${pairFrom} für ein Paar, wenn der Zustand es erlaubt.`,
            "Fahren Sie mit wiederhergestellter Sicht, bestehen Sie die Prüfung mit Vertrauen und erhalten Sie den Wiederverkaufswert mit Linsen, die aussehen und wirken wie neu.",
          ],
        },
        services: {
          title: "Verwandte Leistungen",
          items: [
            "Scheinwerfer bereit für die technische Prüfung",
            "Restaurierung gelber oder orangefarbener Scheinwerfer",
            "Trübung / milchige Scheinwerfer beheben",
            "Professionelles Polieren und UV-Beschichtung",
            "Korrektur nach gescheitertem DIY",
          ],
        },
        faq: {
          title: "Häufig gestellte Fragen",
          items: [
            {
              question: "Können restaurierte Scheinwerfer die technische Prüfung bestehen?",
              answer:
                "Ja, wenn Lichtleistung und Linsenklarheit den gesetzlichen Sichtnormen entsprechen. Wir bewerten den Zustand zuerst und raten zum Ersatz, wenn das die sicherere Option ist.",
            },
            {
              question: "Ist Restaurierung günstiger als neue Scheinwerfer?",
              answer:
                "In den meisten Fällen ja. Neue OEM-Baugruppen kosten oft 300–800 € oder mehr pro Seite. Restaurierung stellt Klarheit und UV-Schutz für einen Bruchteil wieder her, wenn Gehäuse noch intakt sind.",
            },
            {
              question: "Wie lange dauert der Werkstattservice?",
              answer: `${turnaroundLocalDe}. UV-Beschichtung ist ausgehärtet, bevor Sie abfahren, kein tagelanges Warten auf Versiegelung.`,
            },
          ],
        },
        geo: {
          title: "Einsatzgebiet",
          body: `Werkstatt in ${loc}, Westflandern. Mobile Service in der Region und Post-Restaurierung in ganz Belgien und Europa.`,
        },
      },
      autoschadebedrijf: {
        name: "Karosseriebetrieb",
        h1: "Kosmetischer Scheinwerfer- und Kunststoff-Smart-Repair",
        metaDescription: `Kosmetischer Smart Repair für zerkratzte, verblasste und beschädigte Scheinwerfer in ${loc}. Kein Kompletttausch, professionelle Restaurierung optischer Kunststoffteile. Westflandern.`,
        summary: `Nicht jedes Scheinwerferproblem braucht eine neue Einheit. SHINES ist spezialisiert auf Smart Repair bei optischen Schäden: Kratzer, UV-Verblassung und Oberflächendefekte an Scheinwerfer- und Rücklichtlinsen, Wiederherstellung des Originalaussehens ohne Karosserie-Ersatzkosten.`,
        pain: {
          title: "Das Problem: sichtbare Schäden und Ersatzangebote",
          paragraphs: [
            "Parkschäden, Steinschlag und UV-Degradation lassen Linsen alt wirken und verschärfen Lichtstreuung. Werkstätten bieten oft kompletten Scheinwerfertausch an.",
            "Versicherung und Eigenkosten steigen, obwohl nur die äußere Linsenschicht betroffen ist.",
          ],
        },
        solution: {
          title: "Smart Repair für optische Teile",
          paragraphs: [
            "Wir restaurieren die transparente Schicht: progressives Schleifen entfernt Schäden, Maschinenpolitur stellt Klarheit her, UV-Beschichtung versiegelt das Ergebnis jahrelang, nicht wochenlang.",
            "Das ist kosmetische und optische Reparatur an bestehenden Einheiten, dieselbe Philosophie wie Smart Repair an Stoßfängern, angewendet auf Beleuchtungskomponenten.",
          ],
        },
        gain: {
          title: "Was Sie gewinnen",
          paragraphs: [
            "Vermeiden Sie unnötigen Teiletausch und behalten Sie originale OEM-Passung und Elektronik.",
            "Einheitliches, gepflegtes Erscheinungsbild vorne und hinten, wichtig für Verkauf und Stolz auf Ihr Fahrzeug.",
          ],
        },
        services: {
          title: "Verwandte Leistungen",
          items: [
            "Kosmetische Reparatur von Kratzern und Verblassung an Scheinwerfern",
            "Rücklicht polieren und UV-Schutz",
            "Korrektur nach gescheitertem DIY-Versuch",
            "Post-Restaurierung für seltene oder klassische Einheiten",
          ],
        },
        faq: {
          title: "Häufig gestellte Fragen",
          items: [
            {
              question: "Reparieren Sie gerissene oder gebrochene Gehäuse?",
              answer:
                "Wir stellen optische Klarheit an intakten Gehäusen wieder her. Strukturelle Risse, gebrochene Halterungen oder Feuchtigkeitseintritt können Ersatz erfordern, wir bewerten ehrlich vor Beginn.",
            },
            {
              question: "Ist das dasselbe wie eine klassische Karosserie?",
              answer:
                "Wir spezialisieren uns auf optische Restaurierung von Beleuchtungseinheiten, nicht auf Blech- oder Lackarbeit. Für linsenspezifischen Smart Repair gehen wir tiefer als eine allgemeine Karosserie-Politur.",
            },
            {
              question: "Können Sie Schäden nach einem DIY-Kit beheben?",
              answer:
                "Ja, falsch verwendete Körnung oder Politur ist ein häufiger Grund für Kundenbesuche. Wir bauen die Oberfläche korrekt auf, bevor professioneller UV-Schutz aufgetragen wird.",
            },
          ],
        },
        geo: {
          title: "Einsatzgebiet",
          body: `Standort ${loc}. Für Fahrer in Ingelmunster, Izegem, Roeselare, Kortrijk, Waregem, Tielt und ganz Westflandern. Postservice in ganz Europa.`,
        },
      },
      autoschoonmaakdienst: {
        name: "Autoreinigungsdienst",
        h1: "Professionelles Scheinwerfer-Detailing und Linsenpolitur",
        metaDescription: `Hochwertiges Detailing von Scheinwerfer- und Rücklichtlinsen in ${loc}. Maschinenpolitur, Klarheitswiederherstellung und UV-Versiegelung, Showroom-Finish ohne temporären Kit-Glanz. Westflandern.`,
        summary: `Scheinwerfer-Detailing ist mehr als schnelles Polieren. SHINES nutzt professionelle Polituren, Maschinenpolitur und dauerhafte UV-Versiegelung für tiefe Transparenz, dasselbe Sorgniveau wie Premium-Detailing, fokussiert auf optische Komponenten, die das Aussehen Ihres Autos und Ihre Nachtsicht bestimmen.`,
        pain: {
          title: "Das Problem: matte Optik und kurzlebiger DIY-Glanz",
          paragraphs: [
            "Budget-Kits und Handpolitur geben temporären Glanz, hinterlassen aber Mikrokratzer oder scheitern innerhalb von Wochen bei Sonne und Regen.",
            "Matte Linsen lassen selbst ein sauberes Auto müde wirken und reduzieren Lichtleistung, wenn Sie sie am meisten brauchen.",
          ],
        },
        solution: {
          title: "Detailing-Prozess für Linsen",
          paragraphs: [
            "Wir behandeln Scheinwerfer- und Rücklichtlinsen mit derselben Disziplin wie Premium-Detailing: korrekte Körnfolge, Maschinenpolitur und hitzebeständiger UV-Hardcoat.",
            "Polieren allein reicht nicht, wir versiegeln die Oberfläche, damit Transparenz bleibt, vergleichbar damit, wie Detailer Lack schützen, angewendet auf optischen Kunststoff.",
          ],
        },
        gain: {
          title: "Was Sie gewinnen",
          paragraphs: [
            "Showroom-Klarheit und Tiefe, ideal vor Verkauf, nach Kauf oder wenn Ihr Auto bestmöglich aussehen soll.",
            "Dauerhaftes Ergebnis mit UV-Schutz, kein Glanz, der beim nächsten Regen verschwindet.",
          ],
        },
        services: {
          title: "Verwandte Leistungen",
          items: [
            "Maschinelles Scheinwerfer-Polieren",
            "Rücklicht-Klarheit und Farbwiederherstellung",
            "UV-Beschichtung nach Politur",
            "Optische Auffrischung vor Verkauf",
            "Mobiles Detailing (Scheinwerfer vor Ort)",
          ],
        },
        faq: {
          title: "Häufig gestellte Fragen",
          items: [
            {
              question: "Was ist der Unterschied zu einem DIY-Kit?",
              answer:
                "DIY-Kits nutzen generische Schleifmittel und schwache Versiegelungen. Wir passen den Prozess an den Linsenzustand an und enden mit professionellem UV-Hardcoat, in der Werkstatt ausgehärtet.",
            },
            {
              question: "Detailen Sie das ganze Auto?",
              answer:
                "Unsere Spezialität sind optische Komponenten, Scheinwerfer und Rücklichter. Dort sind unsere Geräte und Beschichtungen optimiert.",
            },
            {
              question: "Wie lange hält das Ergebnis?",
              answer: `Mit korrektem UV-Schutz hält das Ergebnis typischerweise jahrelang. Jede Restaurierung inklusive unserer ${warrantyDe}.`,
            },
          ],
        },
        geo: {
          title: "Einsatzgebiet",
          body: `Detailing-Werkstatt in ${loc}. Mobiler Scheinwerfer-Service in Westflandern wo verfügbar. Post-Einheiten aus ganz Belgien und Europa willkommen.`,
        },
      },
      autorestauratie: {
        name: "Fahrzeugrestaurierung",
        h1: "Technische Restaurierung veralteter und oxidierter Lichteinheiten",
        metaDescription: `Vollständige optische Restaurierung für stark vergilbte, oxidierte und vintage Scheinwerfer-Einheiten in ${loc}. Industrieprozess, UV-Neuaufbau, Post für Klassiker. Belgien und Europa.`,
        summary: `Fahrzeugrestaurierung bei SHINES bedeutet, stark degradierte Beleuchtungseinheiten in ihren originalen optischen Zustand zurückzubringen, auf einem Daily Driver, Klassiker oder seltenem Modell, wo neue Teile nicht mehr erhältlich sind. Wir bauen Klarheit aus schwerer UV-Schädigung wieder auf, nicht nur Oberflächenglanz.`,
        pain: {
          title: "Das Problem: schwere Oxidation und unersetzbare Einheiten",
          paragraphs: [
            "Vollständig gelbe oder orange Linsen haben ihre werkseitige UV-Barriere verloren. Lichtleistung kann stark sinken; klassische und eingestellte Einheiten sind manchmal nicht mehr neu erhältlich.",
            "Oberflächenpolitur allein behebt tiefe Degradation nicht, die beschädigte Schicht muss korrekt entfernt und neu aufgebaut werden.",
          ],
        },
        solution: {
          title: "Vollständige Restaurierung, keine schnelle Politur",
          paragraphs: [
            "Wir entfernen fehlgeschlagene UV-Schichten mit kontrolliertem industriellem Schleif- und Polierprozess und bauen Schutz mit dauerhaftem UV-Hardcoat wieder auf.",
            "Postservice ermöglicht Besitzern in ganz Europa abnehmbare Einheiten zu senden, ideal für Klassiker, Exoten und Projekte, wo die originale Linse erhalten bleiben muss.",
          ],
        },
        gain: {
          title: "Was Sie gewinnen",
          paragraphs: [
            "Bewahren Sie originale Einheiten und Authentizität bei Klassikern und Limited Models.",
            "Wiederherstellung nahezu werksmäßiger Lichtleistung und Optik, Sicherheit und Fahrzeugwert geschützt.",
          ],
        },
        services: {
          title: "Verwandte Leistungen",
          items: [
            "Restaurierung stark gelber / orangefarbener Linsen",
            "Post-Scheinwerfer-Restaurierung (Europa)",
            "Klassische und vintage Beleuchtungseinheiten",
            "Kombiniert Front- und Rücklicht",
            "Tiefe Korrektur nach gescheitertem DIY",
          ],
        },
        faq: {
          title: "Häufig gestellte Fragen",
          items: [
            {
              question: "Können Sie sehr alte oder klassische Scheinwerfer restaurieren?",
              answer:
                "Ja, Post ist beliebt für Klassiker, deren Einheiten zur Restaurierung demontiert werden. Wir bewerten Fotos oder Einheiten vor Angebot.",
            },
            {
              question: "Wie funktioniert Post-Restaurierung?",
              answer: `Verpacken und senden Sie an unsere Werkstatt in ${loc}. Typische Dauer: ${turnaroundMailInDe.toLowerCase()}. Rückversand wird an Ihre Adresse angeboten.`,
            },
            {
              question: "Wann ist Restaurierung nicht mehr möglich?",
              answer:
                "Tiefe Risse, interne Feuchtigkeitsschäden oder Delaminierung können Ersatz erfordern. Wir prüfen zuerst und empfehlen die sichere Option.",
            },
          ],
        },
        geo: {
          title: "Einsatzgebiet",
          body: `Restaurierungswerkstatt in ${loc}, Belgien. Postservice in ganz Europa. Lokale Werkstattbesuche nach Termin in Westflandern.`,
        },
      },
    },
  };
}
