import type { FieldCategoryMessages } from "@/lib/field-category-content";
import { formatPrice, locationLabel, site } from "@/lib/site";

/** Dutch copy, primary market for Google Business Profile alignment. */
export function buildFieldCategoryMessagesNl(): FieldCategoryMessages {
  const loc = locationLabel();
  const pairFrom = formatPrice(site.pricing.pair.from);

  return {
    hubTitle: "Vakgebieden: wat SHINES doet",
    hubBreadcrumb: "Vakgebieden",
    hubDescription: `SHINES in ${loc} is een gespecialiseerde werkplaats voor koplamp- en optisch herstel. Op deze pagina's leggen we uit wat we doen binnen de vakgebieden die passen bij onze expertise: onderhoud en keuringsgereedheid, cosmetisch smart repair, professionele detailing van lenzen, en volledige optische restauratie.`,
    hubSectionTitle: "Blader per vakgebied",
    viewPricing: "Bekijk prijzen",
    bookCta: `Boek vanaf ${pairFrom}`,
    otherCategories: "Andere vakgebieden",
    categories: {
      "autoreparatie-en-onderhoud": {
        name: "Autoreparatie en -onderhoud",
        h1: "Koplampen onderhoud en keuringsgereed herstel",
        metaDescription: `Auto afgekeurd door doffe koplampen? SHINES in ${loc} herstelt lichtopbrengst en lenshelderheid voor een veilig lichtbeeld, goedkoper dan nieuwe units. West-Vlaanderen & Europa.`,
        summary: `Matte of vergeelde koplampen verminderen zicht en zijn een frequente reden voor afkeuring bij de technische keuring. SHINES herstelt optische helderheid en een correcte lichtbundel zodat uw wagen opnieuw veilig de weg op kan, zonder volledige koplampunits te vervangen wanneer de behuizing nog in orde is.`,
        pain: {
          title: "Het probleem: afkeuring en onveilig licht",
          paragraphs: [
            "Doffe, geoxideerde of bekraste lenzen verstrooien licht in plaats van een heldere bundel te projecteren. Minder zicht 's nachts, en vaak een rode kaart bij keuring.",
            "Nieuwe koplampen aan beide zijden kosten al snel honderden euro's per stuk. Wanneer afdichting, bevestiging en elektronica nog intact zijn, is vervanging vaak onnodige kosten.",
          ],
        },
        solution: {
          title: "Onze aanpak: professioneel optisch herstel",
          paragraphs: [
            "We beoordelen elke lens vóór we beginnen. Industrieel schuren en polijsten verwijdert de falende UV-laag; daarna brengen we een OEM-grade UV-hardcoat aan, uitgehard in de werkplaats, geen tijdelijke wipe-on sealant.",
            "We herstellen helderheid en bundelkwaliteit volgens de praktische normen van keuring. Is een lens te ver gaan voor veilig herstel, dan zeggen we dat eerlijk vóór u betaalt.",
          ],
        },
        gain: {
          title: "Wat u wint",
          paragraphs: [
            `Bespaar aanzienlijk t.o.v. nieuwe OEM-koplampen, restauratie vanaf ${pairFrom} voor een paar wanneer de staat het toelaat.`,
            "Rij opnieuw met hersteld zicht, keur met vertrouwen, en behoud de restwaarde met lenzen die eruitzien en presteren als nieuw.",
          ],
        },
        services: {
          title: "Gerelateerde diensten",
          items: [
            "Koplampen klaar voor technische keuring",
            "Geel oranje koplampen herstellen",
            "Turbiditeit / beslagen koplampen oplossen",
            "Professionele polijst en UV-coating",
            "Mislukte DIY / doe-het-zelf herstel",
          ],
        },
        faq: {
          title: "Veelgestelde vragen",
          items: [
            {
              question: "Kunnen gerestaureerde koplampen de keuring halen?",
              answer:
                "Ja, wanneer lichtopbrengst en lenshelderheid voldoen aan de wettelijke zichtbaarheidsnormen. We beoordelen de staat eerst en adviseren wanneer vervanging de veiligere optie is.",
            },
            {
              question: "Is restauratie goedkoper dan nieuwe koplampen?",
              answer:
                "In de meeste gevallen wel. Nieuwe OEM-assemblages kosten vaak €300–€800+ per zijde. Restauratie herstelt helderheid en UV-bescherming voor een fractie daarvan wanneer behuizingen nog sound zijn.",
            },
            {
              question: "Hoe lang duurt garageservice?",
              answer: `${site.turnaround.local}. UV-coating wordt uitgehard vóór u vertrekt, geen dagen wachten op sealants.`,
            },
          ],
        },
        geo: {
          title: "Werkgebied",
          body: `Werkplaats in ${loc}, West-Vlaanderen. Mobiele service in de regio en postrestauratie in heel België en Europa.`,
        },
      },
      autoschadebedrijf: {
        name: "Autoschadebedrijf",
        h1: "Cosmetisch koplamp- en kunststof smart repair",
        metaDescription: `Cosmetisch smart repair voor bekraste, verbleekte en beschadigde koplampen in ${loc}. Geen volledige vervanging, professioneel herstel van optische kunststof delen. West-Vlaanderen.`,
        summary: `Niet elk koplampprobleem vraagt een nieuwe unit. SHINES is gespecialiseerd in smart repair voor optische schade: krassen, UV-verbleking en oppervlaktedefecten aan koplamp- en achterlichtlenzen, het herstellen van de originele uitstraling zonder carrosserie-vervangingskosten.`,
        pain: {
          title: "Het probleem: zichtbare schade en vervangingsoffertes",
          paragraphs: [
            "Parkeerschade, steenslag en UV-degradatie laten lenzen oud ogen en verergeren lichtverstrooiing. Garages offreren vaak volledige koplampvervanging.",
            "Verzekering en eigen kosten lopen op wanneer enkel de buitenste lenslaag aangetast is.",
          ],
        },
        solution: {
          title: "Smart repair voor optische delen",
          paragraphs: [
            "We focussen op het herstellen van de transparante laag: progressief schuren verwijdert schade, machinaal polijsten herstelt helderheid, UV-coating verzegelt het resultaat jarenlang, niet weken.",
            "Dit is cosmetisch en optisch herstel op bestaande units, dezelfde filosofie als smart repair voor bumpers, toegepast op verlichtingscomponenten.",
          ],
        },
        gain: {
          title: "Wat u wint",
          paragraphs: [
            "Vermijd onnodige onderdeelvervanging en behoud originele OEM-passing en elektronica.",
            "Uniform, verzorgd uiterlijk voor en achter, belangrijk voor verkoop en dagelijks trots op uw wagen.",
          ],
        },
        services: {
          title: "Gerelateerde diensten",
          items: [
            "Cosmetisch herstel van krassen en verbleking op koplampen",
            "Achterlicht polijsten en UV-bescherming",
            "Correctie na mislukte DIY-pogingen",
            "Postrestauratie voor zeldzame of klassieke units",
          ],
        },
        faq: {
          title: "Veelgestelde vragen",
          items: [
            {
              question: "Herstellen jullie gebarsten of gebroken behuizingen?",
              answer:
                "We herstellen optische helderheid op intacte behuizingen. Structurele barsten, gebroken bevestigingen of vochtinfiltratie kunnen vervanging vereisen, we beoordelen eerlijk vóór we beginnen.",
            },
            {
              question: "Is dit hetzelfde als een traditioneel schadebedrijf?",
              answer:
                "We specialiseren ons in optische restauratie van verlichtingsunits, niet in plaatwerk of lak. Voor lens-specifiek smart repair gaan we dieper dan een algemene polijstbeurt in de carrosserie.",
            },
            {
              question: "Kunnen jullie schade herstellen na een DIY-kit?",
              answer:
                "Ja, verkeerd gebruikte korrel of compound is een frequente reden waarom klanten naar ons komen. We bouwen het oppervlak correct op vóór professionele UV-bescherming.",
            },
          ],
        },
        geo: {
          title: "Werkgebied",
          body: `Gevestigd in ${loc}. Voor bestuurders in Ingelmunster, Izegem, Roeselare, Kortrijk, Waregem, Tielt en ruimer West-Vlaanderen. Postservice in heel Europa.`,
        },
      },
      autoschoonmaakdienst: {
        name: "Autoschoonmaakdienst",
        h1: "Professionele koplamp-detailing en lenspolijst",
        metaDescription: `Hoogwaardige detailing van koplamp- en achterlichtlenzen in ${loc}. Machinaal polijsten, helderheid herstellen en UV-afsluiting, showroomfinish zonder tijdelijke kit-glans. West-Vlaanderen.`,
        summary: `Koplamp-detailing is meer dan snel buffen. SHINES gebruikt professionele compounds, machinaal polijsten en duurzame UV-afsluiting om diepe transparantie te herstellen, hetzelfde zorgniveau als premium detailing, gericht op optische componenten die bepalen hoe uw wagen oogt én hoe goed u 's nachts ziet.`,
        pain: {
          title: "Het probleem: doffe finish en kortstondige DIY-glans",
          paragraphs: [
            "Budgetkits en handpolijsten geven tijdelijke glans maar laten microkrassen achter of falen binnen weken in zon en regen.",
            "Doffe lenzen laten zelfs een schone wagen moe uitstralen en verminderen lichtopbrengst wanneer u die het meest nodig hebt.",
          ],
        },
        solution: {
          title: "Detailing-grade proces voor lenzen",
          paragraphs: [
            "We behandelen koplamp- en achterlichtlenzen met dezelfde discipline als premium detailing: correcte korrelvolgorde, machinaal polijsten en een hittebestendige UV-hardcoat.",
            "Polijsten alleen volstaat niet, we verzegelen het oppervlak zodat transparantie blijft, vergelijkbaar met hoe detailers lak beschermen, toegepast op optisch kunststof.",
          ],
        },
        gain: {
          title: "Wat u wint",
          paragraphs: [
            "Showroom-helderheid en diepte, ideaal vóór verkoop, na aankoop, of wanneer u wilt dat uw wagen op zijn best oogt.",
            "Blijvend resultaat met UV-bescherming, geen glans die verdwijnt bij de volgende regenbui.",
          ],
        },
        services: {
          title: "Gerelateerde diensten",
          items: [
            "Machinaal koplampen polijsten",
            "Achterlicht helderheid en kleurherstel",
            "UV-coating na polijst",
            "Optische refresh vóór verkoop",
            "Mobiele detailing (koplampen op locatie)",
          ],
        },
        faq: {
          title: "Veelgestelde vragen",
          items: [
            {
              question: "Wat is het verschil met een DIY-kit?",
              answer:
                "DIY-kits gebruiken generieke schuurmaterialen en zwakke sealants. Wij stemmen het proces af op lensconditie en eindigen met een professionele UV-hardcoat, uitgehard in de werkplaats.",
            },
            {
              question: "Detailen jullie de hele wagen?",
              answer:
                "Onze specialiteit zijn optische componenten, koplampen en achterlichten. Daar zijn onze apparatuur en coatings op geoptimaliseerd.",
            },
            {
              question: "Hoe lang blijft het resultaat?",
              answer: `Met correcte UV-bescherming gaat het resultaat typisch jaren mee. Elke restauratie omvat onze ${site.warranty.toLowerCase()}.`,
            },
          ],
        },
        geo: {
          title: "Werkgebied",
          body: `Detailing-werkplaats in ${loc}. Mobiele koplampenservice in West-Vlaanderen waar beschikbaar. Postunits welkom uit heel België en Europa.`,
        },
      },
      autorestauratie: {
        name: "Autorestauratie",
        h1: "Technische restauratie van verouderde en geoxideerde lichtunits",
        metaDescription: `Volledige optische restauratie voor zwaar vergeelde, geoxideerde en vintage koplampunits in ${loc}. Industrieel proces, UV-opbouw, post voor klassiekers. België & Europa.`,
        summary: `Autorestauratie bij SHINES betekent zwaar gedegradeerde verlichtingsunits terugbrengen naar hun originele optische staat, op een daily driver, een klassieker of een zeldzaam model waar nieuwe onderdelen niet meer verkrijgbaar zijn. We herbouwen helderheid vanuit ernstige UV-schade, niet enkel oppervlakteglans.`,
        pain: {
          title: "Het probleem: ernstige oxidatie en onvervangbare units",
          paragraphs: [
            "Volledig gele of oranje lenzen hebben hun fabriek UV-barrière verloren. Lichtopbrengst kan drastisch dalen; klassieke en uitgelopen units zijn soms niet meer nieuw te koop.",
            "Oppervlaktepolijst alleen lost diepe degradatie niet op, de beschadigde laag moet correct verwijderd en opgebouwd worden.",
          ],
        },
        solution: {
          title: "Volledige restauratie, geen snelle polijst",
          paragraphs: [
            "We verwijderen falende UV-lagen met een gecontroleerd industrieel schuur- en polijstproces, en herbouwen bescherming met een duurzame UV-hardcoat.",
            "Postservice laat eigenaren in heel Europa verwijderbare units opsturen, ideaal voor klassiekers, exclusieven en projecten waar de originele lens behouden moet blijven.",
          ],
        },
        gain: {
          title: "Wat u wint",
          paragraphs: [
            "Behoud originele units en authenticiteit op klassiekers en limited models.",
            "Herstel van bijna-fabriek lichtopbrengst en uiterlijk, veiligheid én wagwaarde beschermd.",
          ],
        },
        services: {
          title: "Gerelateerde diensten",
          items: [
            "Zwaar geel / oranje lensrestauratie",
            "Mail-in koplamprestauratie (Europa)",
            "Klassieke en vintage verlichtingsunits",
            "Gecombineerd voor- en achterlicht",
            "Diepe correctie na mislukte DIY",
          ],
        },
        faq: {
          title: "Veelgestelde vragen",
          items: [
            {
              question: "Kunnen jullie zeer oude of klassieke koplampen restaureren?",
              answer:
                "Ja, post is populair voor klassiekers waar units verwijderd worden voor restauratie. We beoordelen foto's of units vóór offerte.",
            },
            {
              question: "Hoe werkt postrestauratie?",
              answer: `Verpak en verstuur naar onze werkplaats in ${loc}. Typische doorlooptijd: ${site.turnaround.mailIn.toLowerCase()}. Retourverzending wordt geoffreerd naar uw adres.`,
            },
            {
              question: "Wanneer is restauratie niet meer mogelijk?",
              answer:
                "Diepe barsten, intern vochtschade of delaminatie kunnen vervanging vereisen. We inspecteren eerst en adviseren de veilige optie.",
            },
          ],
        },
        geo: {
          title: "Werkgebied",
          body: `Restauratiewerkplaats in ${loc}, België. Postservice in heel Europa. Lokale garagebezoeken op afspraak in West-Vlaanderen.`,
        },
      },
    },
  };
}
