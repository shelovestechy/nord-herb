import type { HerbDB } from "@/types";

export const HERB_DB: HerbDB = {
  // ----------------------------------------
  // SAFE / COMMON HERBS (existing ones)
  // ----------------------------------------

  dandelion: {
    id: "dandelion",
    source: "wild",
    toxicity: "safe",
    commonName: { fi: "Voikukka", en: "Dandelion" },
    latinName: "Taraxacum officinale",
    edibleParts: { fi: ["lehdet", "kukat", "juuret"], en: ["leaves", "flowers", "roots"] },
    medicinalNotes: {
      fi: "Kitkerä ruoansulatusyrtti; tukee maksaa; lievästi diureettinen.",
      en: "Bitter tonic; supports digestion and liver; mild diuretic."
    },
    lookalikes: { fi: ["kissankeltto"], en: ["cat's ear"] },
    caution: {
      fi: "Vältä teiden varret/käsitellyt nurmikot. Vahvista tunnistus useasta piirteestä.",
      en: "Avoid roadsides/treated lawns. Confirm ID with multiple features."
    },
    uses: { fi: ["tee", "salaatti (nuoret lehdet)", "juuripaahde"], en: ["tea", "salad (young leaves)", "roasted root"] },
    recipes: [
      {
        title: { fi: "Voikukanjuuripaahde", en: "Roasted Dandelion Root" },
        steps: {
          fi: ["Pese ja pilko juuret", "Paahda 150°C ~25 min", "Hauduta 10 min"],
          en: ["Wash & chop roots", "Roast 150°C ~25 min", "Simmer 10 min"]
        }
      }
    ],
    images: []
  },

  stinging_nettle: {
    id: "stinging_nettle",
    source: "wild",
    toxicity: "safe",
    commonName: { fi: "Nokkonen", en: "Stinging Nettle" },
    latinName: "Urtica dioica",
    edibleParts: { fi: ["nuoret versot", "lehdet (keitettynä)", "siemenet"], en: ["young tops", "leaves (cooked)", "seeds"] },
    medicinalNotes: {
      fi: "Ravinnerikas kevätyrtti (rauta, mineraalit). Pistävät karvat.",
      en: "Mineral-rich spring herb (iron). Stinging hairs."
    },
    caution: { fi: "Käytä hanskoja; kypsennä.", en: "Wear gloves; cook before eating." },
    uses: { fi: ["keitto", "pinaatin korvike", "tee"], en: ["soup", "spinach substitute", "tea"] },
    recipes: [
      {
        title: { fi: "Nokkoskeitto", en: "Nettle Soup" },
        steps: {
          fi: ["Ryöppää 1–2 min", "Soseuta voin/kerman kanssa", "Mausta"],
          en: ["Blanch 1–2 min", "Blend with butter/cream", "Season"]
        }
      }
    ],
    images: []
  },

  lavender: {
    id: "lavender",
    source: "store",
    toxicity: "safe",
    commonName: { fi: "Laventeli", en: "Lavender" },
    latinName: "Lavandula angustifolia",
    edibleParts: { fi: ["kukat (vähän)"], en: ["flowers (small amounts)"] },
    medicinalNotes: {
      fi: "Rauhoittava tuoksu; teehen, kylpyyn ja salvoihin.",
      en: "Calming aroma; for tea, baths, and salves."
    },
    uses: { fi: ["uni-tee", "kylpy", "ihosalva"], en: ["sleep tea", "bath", "skin salve"] },
    recipes: [
      {
        title: { fi: "Laventeli-hunajatee", en: "Lavender Honey Tea" },
        steps: {
          fi: ["1 tl kuivattua kukkaa/kuppi", "Hauduta 5–7 min", "Makeuta hunajalla"],
          en: ["1 tsp dried flowers/cup", "Steep 5–7 min", "Sweeten with honey"]
        }
      }
    ],
    images: []
  },

  turmeric: {
    id: "turmeric",
    source: "store",
    toxicity: "safe",
    commonName: { fi: "Kurkuma", en: "Turmeric" },
    latinName: "Curcuma longa",
    medicinalNotes: {
      fi: "Juurakko (mauste); antioksidanttinen.",
      en: "Rhizome spice; antioxidant."
    },
    uses: { fi: ["kulta-latte", "curry"], en: ["golden milk", "curry"] },
    recipes: [
      {
        title: { fi: "Kulta-latte", en: "Golden Milk" },
        steps: {
          fi: ["Kuumenna maito", "Lisää 1/2 tl kurkumaa + ripaus pippuria", "Makeuta"],
          en: ["Warm milk", "Add 1/2 tsp turmeric + pinch pepper", "Sweeten"]
        }
      }
    ],
    images: []
  },

  ginger: {
    id: "ginger",
    source: "store",
    toxicity: "safe",
    commonName: { fi: "Inkivääri", en: "Ginger" },
    latinName: "Zingiber officinale",
    medicinalNotes: {
      fi: "Lämmittävä juurakko; perinteinen pahoinvointiin ja flunssaan.",
      en: "Warming rhizome; traditional for nausea and colds."
    },
    uses: { fi: ["tee", "siirappi"], en: ["tea", "syrup"] },
    recipes: [
      {
        title: { fi: "Inkiväärisiirappi", en: "Ginger Syrup" },
        steps: {
          fi: ["Kiehauta viipaleet 10 min", "Lisää sokeri 1:1", "Keitä 5 min ja pullota"],
          en: ["Simmer slices 10 min", "Add sugar 1:1", "Boil 5 min & bottle"]
        }
      }
    ],
    images: []
  },

  // ----------------------------------------
  // POISONOUS / DO-NOT-TOUCH (new)
  // ----------------------------------------

  kielo: {
    id: "kielo",
    source: "wild",
    toxicity: "poison",
    commonName: { fi: "Kielo", en: "Lily-of-the-valley" },
    latinName: "Convallaria majalis",
    medicinalNotes: {
      fi: "Myrkyllinen koko kasvi. Valkoiset kellokukat; tyypillisesti kaksi leveää lehteä.",
      en: "Entire plant is poisonous. White bell flowers; typically two broad leaves."
    },
    lookalikes: {
      fi: ["Villi valkosipuli (karhunlaukka) – tuoksu selvästi valkosipulinen"],
      en: ["Wild garlic (ramsons) – strong garlic smell"]
    },
    caution: {
      fi: "Älä koske silmiin kosketuksen jälkeen. Älä sekoita villiin valkosipuliin.",
      en: "Do not touch eyes after contact. Do not confuse with wild garlic."
    },
    images: []
  },

  myrkkykeiso: {
    id: "myrkkykeiso",
    source: "wild",
    toxicity: "poison",
    commonName: { fi: "Myrkkykeiso", en: "Cowbane / Water hemlock" },
    latinName: "Cicuta virosa",
    medicinalNotes: {
      fi: "Erittäin myrkyllinen. Märät rannat; ontto juurakko; sateenvarjomaiset kukinnot.",
      en: "Extremely poisonous. Wet banks; hollow root; umbrella-shaped umbels."
    },
    lookalikes: { fi: ["Koiranputki, karhunputket"], en: ["Parsley-family lookalikes"] },
    caution: {
      fi: "ÄLÄ KOSKE TAI SYÖ. Pieni määrä voi olla tappava.",
      en: "DO NOT TOUCH OR EAT. Small amounts can be fatal."
    },
    images: []
  },

  sudenmarja: {
    id: "sudenmarja",
    source: "wild",
    toxicity: "poison",
    commonName: { fi: "Sudenmarja", en: "Herb Paris" },
    latinName: "Paris quadrifolia",
    medicinalNotes: {
      fi: "Yksi musta marja neljän lehden keskellä. Myrkyllinen.",
      en: "Single black berry centered by four leaves. Poisonous."
    },
    lookalikes: { fi: ["Jotkin orkideat (eri kukinta)"], en: ["Some orchids (different flowers)"] },
    caution: {
      fi: "Älä koske/älä syö. Pidä lapset ja lemmikit loitolla.",
      en: "Do not touch/eat. Keep children and pets away."
    },
    images: []
  },

  ukonhattu: {
    id: "ukonhattu",
    source: "wild",
    toxicity: "poison",
    commonName: { fi: "Ukonhattu", en: "Monkshood / Aconite" },
    latinName: "Aconitum napellus",
    medicinalNotes: {
      fi: "Syvän violetti 'huppu'-kukka. Erittäin myrkyllinen myös ihon kautta.",
      en: "Deep violet 'hood' flower. Highly poisonous; can absorb through skin."
    },
    caution: {
      fi: "Käytä hanskoja puutarhassa. Vältä kasvinesteeseen koskemista.",
      en: "Wear gloves in gardens. Avoid sap contact."
    },
    images: []
  },

  jattiputki: {
    id: "jattiputki",
    source: "wild",
    toxicity: "poison",
    commonName: { fi: "Jättiputki", en: "Giant Hogweed" },
    latinName: "Heracleum mantegazzianum",
    medicinalNotes: {
      fi: "Fototoksinen: mehu aiheuttaa palovamman auringossa.",
      en: "Phototoxic: sap causes burns in sunlight."
    },
    caution: {
      fi: "ÄLÄ KOSKE. Ilmoita esiintymät viranomaisille.",
      en: "DO NOT TOUCH. Report sightings to authorities."
    },
    images: []
  }
};
