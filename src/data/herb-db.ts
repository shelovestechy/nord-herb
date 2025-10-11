import type { HerbDB } from "@/types";

export const HERB_DB: HerbDB = {
  dandelion: {
    id: "dandelion",
    source: "wild",
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
      en: "Avoid roadsides/treated lawns. Confirm ID via multiple features."
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
    ]
  },

  stinging_nettle: {
    id: "stinging_nettle",
    source: "wild",
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
    ]
  },

  lavender: {
    id: "lavender",
    source: "store",
    commonName: { fi: "Laventeli", en: "Lavender" },
    latinName: "Lavandula angustifolia",
    edibleParts: { fi: ["kukat (vähän)"], en: ["flowers (small amounts)"] },
    medicinalNotes: {
      fi: "Rauhoittava tuoksu; teehen, kylpyyn ja salvoihin.",
      en: "Calming aroma; for tea, baths, salves."
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
    ]
  },

  turmeric: {
    id: "turmeric",
    source: "store",
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
    ]
  },

  ginger: {
    id: "ginger",
    source: "store",
    commonName: { fi: "Inkivääri", en: "Ginger" },
    latinName: "Zingiber officinale",
    medicinalNotes: {
      fi: "Lämmittävä juurakko; perinteinen pahoinvointiin/ flunssaan.",
      en: "Warming rhizome; traditional for nausea/colds."
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
    ]
  }
};

// ---------- TEMPLATE TO ADD MORE ----------
// Copy one block below, change fields, then paste inside HERB_DB { ... } above.
/*
new_herb_id: {
  id: "new_herb_id",
  source: "wild", // or "store"
  commonName: { fi: "Suomenkielinen", en: "English" },
  latinName: "Genus species",
  edibleParts: { fi: ["..."], en: ["..."] },
  medicinalNotes: { fi: "lyhyt kuvaus", en: "short description" },
  lookalikes: { fi: ["..."], en: ["..."] },
  caution: { fi: "varoitus", en: "caution" },
  uses: { fi: ["tee","salva"], en: ["tea","salve"] },
  recipes: [
    {
      title: { fi: "Nimi", en: "Name" },
      steps: { fi: ["Vaihe 1","Vaihe 2"], en: ["Step 1","Step 2"] }
    }
  ],
  images: ["https://.../photo.jpg"]
},
*/
