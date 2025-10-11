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
  // +10 COMMON FINNISH HERBS (safe / caution)
  // ----------------------------------------

  plantain: {
    id: "plantain",
    source: "wild",
    toxicity: "safe",
    commonName: { fi: "Piharatamo (leveälehti)", en: "Plantain (broadleaf)" },
    latinName: "Plantago major",
    edibleParts: { fi: ["nuoret lehdet", "siemenet"], en: ["young leaves", "seeds"] },
    medicinalNotes: {
      fi: "Tyvirosetti; rinnakkaiset lehtisuonet. Perinteinen haavojen ja pistoihin lehtikääre.",
      en: "Basal rosette; parallel veins. Traditional leaf poultice for minor cuts/stings."
    },
    uses: { fi: ["poultis", "tee"], en: ["poultice", "tea"] },
    images: []
  },

  yarrow: {
    id: "yarrow",
    source: "wild",
    toxicity: "caution",
    commonName: { fi: "Siankärsämö", en: "Yarrow" },
    latinName: "Achillea millefolium",
    edibleParts: { fi: ["lehdet (vähin)", "kukat"], en: ["leaves (sparingly)", "flowers"] },
    medicinalNotes: {
      fi: "Höyhenmäiset lehdet; valkoiset kukinnot. Perinteinen katkero ja haavakasvi.",
      en: "Feathery leaves; white umbels. Traditional bitter and wound herb."
    },
    lookalikes: {
      fi: ["Myrkkykeiso (eri tuoksu/lehti; varoitus)"],
      en: ["Poison hemlock (different smell/leaf; warning)"]
    },
    caution: {
      fi: "Asterikasviherkkyys mahdollinen; käytä maltilla.",
      en: "Asteraceae sensitivity possible; use modestly."
    },
    uses: { fi: ["tee", "katkero", "haudeli ulkoisesti"], en: ["tea", "bitter", "compress (external)"] },
    images: []
  },

  chamomile: {
    id: "chamomile",
    source: "wild",
    toxicity: "safe",
    commonName: { fi: "Kamomilla / Saunakukka", en: "Chamomile (German)" },
    latinName: "Matricaria chamomilla",
    edibleParts: { fi: ["kukat"], en: ["flowers"] },
    medicinalNotes: {
      fi: "Omenainen tuoksu; ontto kukkapohjus. Rauhoittava tee.",
      en: "Apple-like scent; hollow receptacle. Calming tea."
    },
    lookalikes: {
      fi: ["Hajuton päivänkakkara – ei omenatuoksua, kiinteä keskus"],
      en: ["Scentless mayweed – no apple scent, solid center"]
    },
    uses: { fi: ["tee", "höyryhengitys", "ihobalmi"], en: ["tea", "steam inhalation", "skin balm"] },
    images: []
  },

  fireweed: {
    id: "fireweed",
    source: "wild",
    toxicity: "safe",
    commonName: { fi: "Maitohorsma", en: "Fireweed / Willowherb" },
    latinName: "Chamerion angustifolium",
    edibleParts: { fi: ["nuoret versot", "lehdet (tee)", "kukkatähkät"], en: ["young shoots", "leaves (tea)", "flower spikes"] },
    medicinalNotes: {
      fi: "Nopea pioneerikasvi; lehdistä ivan-chai -tee.",
      en: "Fast pioneer plant; leaves used for ivan-chai tea."
    },
    uses: { fi: ["tee", "nuoret versot ruokana"], en: ["tea", "young shoots as veg"] },
    images: []
  },

  ladys_mantle: {
    id: "ladys_mantle",
    source: "wild",
    toxicity: "safe",
    commonName: { fi: "Poimulehti", en: "Lady’s Mantle" },
    latinName: "Alchemilla vulgaris",
    edibleParts: { fi: ["lehdet (tee)"], en: ["leaves (tea)"] },
    medicinalNotes: {
      fi: "Astringoiva yrtti; sadepisarat helmeilevät lehdillä.",
      en: "Astringent herb; dew beads on pleated leaves."
    },
    uses: { fi: ["tee", "kurlaus"], en: ["tea", "gargle"] },
    images: []
  },

  meadowsweet: {
    id: "meadowsweet",
    source: "wild",
    toxicity: "caution",
    commonName: { fi: "Mesiangervo", en: "Meadowsweet" },
    latinName: "Filipendula ulmaria",
    edibleParts: { fi: ["kukat (aromiksi)"], en: ["flowers (for aroma)"] },
    medicinalNotes: {
      fi: "Hunajainen tuoksu; sisältää salisylaatteja.",
      en: "Honey-sweet scent; contains salicylates."
    },
    caution: {
      fi: "Vältä, jos salisylaatti/aspiriiniherkkyys.",
      en: "Avoid if sensitive to salicylates/aspirin."
    },
    uses: { fi: ["aromitee", "siirappi"], en: ["aromatic tea", "syrup"] },
    images: []
  },

  birch_leaf: {
    id: "birch_leaf",
    source: "wild",
    toxicity: "safe",
    commonName: { fi: "Koivunlehti", en: "Birch leaf" },
    latinName: "Betula pendula",
    edibleParts: { fi: ["mahla", "nuoret lehdet"], en: ["sap", "young leaves"] },
    medicinalNotes: {
      fi: "Kolmionmuotoiset, sahalaitaiset lehdet; lehtitee on kevyt diureetti.",
      en: "Triangular serrated leaves; leaf tea is mildly diuretic."
    },
    uses: { fi: ["tee", "saunavihta (ulkoisesti)"], en: ["tea", "sauna whisk (external)"] },
    images: []
  },

  red_clover: {
    id: "red_clover",
    source: "wild",
    toxicity: "safe",
    commonName: { fi: "Puna-apila", en: "Red Clover" },
    latinName: "Trifolium pratense",
    edibleParts: { fi: ["kukat", "nuoret lehdet"], en: ["flowers", "young leaves"] },
    medicinalNotes: {
      fi: "Pinkit kukinnot; lehdissä vaalea V-kuvio.",
      en: "Pink flower heads; pale V on leaves."
    },
    caution: { fi: "Vältä homeisia kukkia.", en: "Avoid moldy blossoms." },
    uses: { fi: ["tee", "siirappi"], en: ["tea", "syrup"] },
    images: []
  },

  selfheal: {
    id: "selfheal",
    source: "wild",
    toxicity: "safe",
    commonName: { fi: "Niittyhumala", en: "Self-heal" },
    latinName: "Prunella vulgaris",
    edibleParts: { fi: ["kukat", "lehdet (tee)"], en: ["flowers", "leaves (tea)"] },
    medicinalNotes: {
      fi: "Matalat, violettikukintaiset tähkät; perinteinen kurlausyrtti.",
      en: "Low violet spikes; traditional for gargles."
    },
    uses: { fi: ["tee", "kurlaus"], en: ["tea", "gargle"] },
    images: []
  },

  wood_sorrel: {
    id: "wood_sorrel",
    source: "wild",
    toxicity: "caution",
    commonName: { fi: "Ketunleipä", en: "Wood sorrel" },
    latinName: "Oxalis acetosella",
    edibleParts: { fi: ["lehdet (pieni määrä)"], en: ["leaves (small amounts)"] },
    medicinalNotes: {
      fi: "Hapokas, sitruunainen maku; kolmiapilamaiset lehdet.",
      en: "Tangy, lemony taste; clover-like leaflets."
    },
    caution: {
      fi: "Sisältää oksalaatteja; vältä suuria määriä tai munuaisvaivoissa.",
      en: "Contains oxalates; avoid large amounts or if kidney issues."
    },
    uses: { fi: ["salaattikoriste", "juomien mauste"], en: ["salad garnish", "drink flavoring"] },
    images: []
  },

    mint: {
    id: "mint",
    source: "wild",
    toxicity: "safe",
    commonName: { fi: "Minttu (metsäminttu ym.)", en: "Mint (wild mint, etc.)" },
    latinName: "Mentha arvensis (spp.)",
    edibleParts: { fi: ["lehdet"], en: ["leaves"] },
    medicinalNotes: {
      fi: "Neliömäinen varsi, vastakkaiset lehdet, vahva mintun tuoksu.",
      en: "Square stems, opposite leaves, strong mint aroma."
    },
    caution: { fi: "Vältä suuria määriä refluksissa.", en: "Large amounts may aggravate reflux." },
    uses: { fi: ["tee", "mauste", "viilentävät juomat"], en: ["tea", "culinary", "cooling drinks"] },
    images: []
  },

  raspberry_leaf: {
    id: "raspberry_leaf",
    source: "wild",
    toxicity: "caution",
    commonName: { fi: "Vadelmanlehti", en: "Raspberry leaf" },
    latinName: "Rubus idaeus",
    edibleParts: { fi: ["lehdet (tee)"], en: ["leaves (tea)"] },
    medicinalNotes: {
      fi: "Kolmiosaiset–viisiosaiset lehdet; perinteinen yrttitee.",
      en: "3–5 leaflet leaves; traditional herbal tea."
    },
    caution: {
      fi: "Raskaudessa keskustele ammattilaisen kanssa ennen käyttöä.",
      en: "If pregnant, consult a professional before use."
    },
    uses: { fi: ["tee"], en: ["tea"] },
    images: []
  },

  bilberry_leaf: {
    id: "bilberry_leaf",
    source: "wild",
    toxicity: "caution",
    commonName: { fi: "Mustikanlehti", en: "Bilberry leaf" },
    latinName: "Vaccinium myrtillus",
    edibleParts: { fi: ["lehdet (tee, pieniä määriä)"], en: ["leaves (tea, small amounts)"] },
    medicinalNotes: {
      fi: "Pienet soikeat lehdet; varvikkokasvi kuusikoissa ja kankailla.",
      en: "Small oval leaves; common dwarf shrub in forests."
    },
    caution: {
      fi: "Pitkäaikainen päivittäinen käyttö ei suositeltavaa.",
      en: "Not recommended for long-term daily use."
    },
    uses: { fi: ["tee"], en: ["tea"] },
    images: []
  },

  juniper: {
    id: "juniper",
    source: "wild",
    toxicity: "caution",
    commonName: { fi: "Katajanmarja", en: "Juniper berry" },
    latinName: "Juniperus communis",
    edibleParts: { fi: ["marjat (mausteena)"], en: ["berries (as spice)"] },
    medicinalNotes: {
      fi: "Neulaset, sinimustat marjat; voimakas aromi.",
      en: "Needles; blue-black berries; strong aroma."
    },
    caution: {
      fi: "Vältä raskauden ja munuaisvaivojen aikana.",
      en: "Avoid during pregnancy and kidney issues."
    },
    uses: { fi: ["mauste", "marinaliha", "tee (mieto)"], en: ["spice", "meat marinade", "mild tea"] },
    images: []
  },

  spruce_tips: {
    id: "spruce_tips",
    source: "wild",
    toxicity: "safe",
    commonName: { fi: "Kuusenkerkät", en: "Spruce tips" },
    latinName: "Picea abies (young tips)",
    edibleParts: { fi: ["nuoret kerkät"], en: ["young tips"] },
    medicinalNotes: {
      fi: "Kevään vaaleanvihreät kerkät; raikas sitruksinen maku.",
      en: "Spring light-green tips; bright citrusy taste."
    },
    uses: { fi: ["siirappi", "tee", "suola/voi"], en: ["syrup", "tea", "salt/butter"] },
    images: []
  },

  pine_needles: {
    id: "pine_needles",
    source: "wild",
    toxicity: "caution",
    commonName: { fi: "Männynneulaset", en: "Pine needles" },
    latinName: "Pinus sylvestris (needles)",
    edibleParts: { fi: ["neulaset (tee)"], en: ["needles (tea)"] },
    medicinalNotes: {
      fi: "Hartsinen, metsäinen aromi; C-vitamiinipitoinen tee.",
      en: "Resinous, forest aroma; vitamin-C rich tea."
    },
    caution: {
      fi: "Vältä raskauden aikana; käytä maltillisesti.",
      en: "Avoid during pregnancy; use in moderation."
    },
    uses: { fi: ["tee", "siirappi"], en: ["tea", "syrup"] },
    images: []
  },

  heather: {
    id: "heather",
    source: "wild",
    toxicity: "safe",
    commonName: { fi: "Kanerva", en: "Heather" },
    latinName: "Calluna vulgaris",
    edibleParts: { fi: ["kukat (tee)"], en: ["flowers (tea)"] },
    medicinalNotes: {
      fi: "Kanervakankaat; pienet vaaleanvioletit kukat loppukesällä.",
      en: "Heathlands; tiny pink-purple flowers in late summer."
    },
    uses: { fi: ["tee", "kylpy"], en: ["tea", "bath"] },
    images: []
  },

  ground_elder: {
    id: "ground_elder",
    source: "wild",
    toxicity: "caution",
    commonName: { fi: "Vuohenputki", en: "Ground elder" },
    latinName: "Aegopodium podagraria",
    edibleParts: { fi: ["nuoret lehdet"], en: ["young leaves"] },
    medicinalNotes: {
      fi: "Varjoisat pihat ja lehdoissa; maku persiljainen/sellerinen.",
      en: "Shady yards and groves; parsley/celery-like taste."
    },
    caution: {
      fi: "Sekoittuu helposti sarjakukkaiskasveihin; varmista tunnistus.",
      en: "Easily confused with other umbellifers; confirm ID carefully."
    },
    uses: { fi: ["pesto", "keitot", "salaatti (nuorena)"], en: ["pesto", "soups", "salad (young)"] },
    images: []
  },

  wild_thyme: {
    id: "wild_thyme",
    source: "wild",
    toxicity: "safe",
    commonName: { fi: "Nummitimiami / Kalliotimiami", en: "Wild thyme" },
    latinName: "Thymus serpyllum (s.l.)",
    edibleParts: { fi: ["lehdet ja kukat"], en: ["leaves and flowers"] },
    medicinalNotes: {
      fi: "Matala, tuoksuva maanpeite; pieniä liilan sävyisiä kukkia.",
      en: "Low fragrant mat; tiny lilac flowers."
    },
    caution: { fi: "Voi ärsyttää, jos on timjamiherkkyys.", en: "May irritate if sensitive to thyme." },
    uses: { fi: ["tee", "mauste", "hunajauute"], en: ["tea", "spice", "honey infusion"] },
    images: []
  },

  angelica: {
    id: "angelica",
    source: "wild",
    toxicity: "caution",
    commonName: { fi: "Väinönputki", en: "Angelica" },
    latinName: "Angelica archangelica",
    edibleParts: { fi: ["varsi (kandyroidaan)", "lehdet (aromiksi)"], en: ["stalk (candied)", "leaves (aroma)"] },
    medicinalNotes: {
      fi: "Suuri sarjakukka; paksu ontto varsi; makean–mausteinen tuoksu.",
      en: "Large umbel; thick hollow stem; sweet-spicy aroma."
    },
    caution: {
      fi: "Voi herkistää auringolle (furokumariinit). Sekoittuu myrkyllisiin sarjakukkiin—varmista tuntomerkit.",
      en: "Can increase sun sensitivity (furocoumarins). Confusable with poisonous umbellifers—confirm ID."
    },
    uses: { fi: ["kandointi", "likööriaromi", "katkero"], en: ["candied stalk", "liqueur aroma", "bitter"] },
    images: []
  },

    wild_strawberry_leaf: {
    id: "wild_strawberry_leaf",
    source: "wild",
    toxicity: "safe",
    commonName: { fi: "Ahomansikan lehti", en: "Wild strawberry leaf" },
    latinName: "Fragaria vesca",
    edibleParts: { fi: ["lehdet (tee)"], en: ["leaves (tea)"] },
    medicinalNotes: {
      fi: "Sahalaitaiset lehdet kolmilehdykkäisinä; mieto, marjainen aromi.",
      en: "Toothed trifoliate leaves; mild, fruity aroma."
    },
    uses: { fi: ["tee", "yhdistetään vadelmanlehteen"], en: ["tea", "mix with raspberry leaf"] },
    images: []
  },

  rowan_flower: {
    id: "rowan_flower",
    source: "wild",
    toxicity: "caution",
    commonName: { fi: "Pihlajankukka", en: "Rowan flower" },
    latinName: "Sorbus aucuparia",
    edibleParts: { fi: ["kukkaterttu (kuivattuna)"], en: ["flower clusters (dried)"] },
    medicinalNotes: {
      fi: "Valkoiset kukkatertut; vahva tuoksu; sisältää tanniineja ja sorbiinihappoa.",
      en: "White clusters; strong aroma; contain tannins and sorbic acid."
    },
    caution: {
      fi: "Kukat ja marjat raakana epämiellyttäviä; kuumenna tai kuivaa.",
      en: "Raw flowers/berries are unpleasant; heat or dry before use."
    },
    uses: { fi: ["aromitee", "siirappi"], en: ["aromatic tea", "syrup"] },
    images: []
  },

  field_horsetail: {
    id: "field_horsetail",
    source: "wild",
    toxicity: "caution",
    commonName: { fi: "Peltokorte", en: "Field horsetail" },
    latinName: "Equisetum arvense",
    edibleParts: { fi: ["versot (keitettynä)", "nuori kevätkasvu"], en: ["shoots (boiled)", "young spring stems"] },
    medicinalNotes: {
      fi: "Nivelikkäät varret; piipohjainen kasvi. Perinteinen virtsanpoisto-yrtti.",
      en: "Jointed stems; silica-rich plant. Traditional diuretic herb."
    },
    caution: {
      fi: "Älä sekoita suokortteeseen (myrkyllinen). Käytä vain tunnistettua lajia.",
      en: "Do not confuse with marsh horsetail (toxic). Use only confirmed species."
    },
    uses: { fi: ["tee", "hiushoito (ulkoisesti)"], en: ["tea", "hair rinse (external)"] },
    images: []
  },

  common_sorrel: {
    id: "common_sorrel",
    source: "wild",
    toxicity: "caution",
    commonName: { fi: "Niittysuolaheinä", en: "Common sorrel" },
    latinName: "Rumex acetosa",
    edibleParts: { fi: ["lehdet (nuoret)"], en: ["leaves (young)"] },
    medicinalNotes: {
      fi: "Hapokas maku; nuoret lehdet salaatteihin; sisältää oksalaatteja.",
      en: "Tangy taste; young leaves for salads; contains oxalates."
    },
    caution: {
      fi: "Älä käytä suuria määriä; voi ärsyttää munuaisia.",
      en: "Avoid large amounts; may irritate kidneys."
    },
    uses: { fi: ["salaatti", "keitot"], en: ["salad", "soups"] },
    images: []
  },

  mugwort: {
    id: "mugwort",
    source: "wild",
    toxicity: "caution",
    commonName: { fi: "Pujonlehdet", en: "Mugwort" },
    latinName: "Artemisia vulgaris",
    edibleParts: { fi: ["lehdet (kuivattuna mausteeksi)"], en: ["leaves (dried, as spice)"] },
    medicinalNotes: {
      fi: "Hopeanharmaa alapinta; aromaattinen katkera kasvi.",
      en: "Silvery underside; aromatic bitter herb."
    },
    caution: {
      fi: "Allergisoiva; vältettävä raskauden aikana.",
      en: "Allergenic; avoid during pregnancy."
    },
    uses: { fi: ["mauste", "katkero"], en: ["spice", "bitter"] },
    images: []
  },

  bog_rosemary: {
    id: "bog_rosemary",
    source: "wild",
    toxicity: "poison",
    commonName: { fi: "Suopursu", en: "Labrador tea / Bog rosemary" },
    latinName: "Rhododendron tomentosum",
    medicinalNotes: {
      fi: "Tuoksuva suo- ja tundrakasvi. Myrkyllinen suurina määrinä; vain tuoksutarkoitukseen.",
      en: "Aromatic bog plant. Poisonous in quantity; for scent use only."
    },
    caution: {
      fi: "Älä nauti sisäisesti. Käytä vain tuoksupusseihin tai hyönteiskarkotteeksi.",
      en: "Do not ingest. Use for scent sachets or insect repellent only."
    },
    uses: { fi: ["tuoksupussi", "karkote"], en: ["scent bag", "repellent"] },
    images: []
  },

  caraway: {
    id: "caraway",
    source: "wild",
    toxicity: "safe",
    commonName: { fi: "Kumina", en: "Caraway" },
    latinName: "Carum carvi",
    edibleParts: { fi: ["siemenet", "lehdet (nuoret)"], en: ["seeds", "young leaves"] },
    medicinalNotes: {
      fi: "Kaksivuotinen; siemenet mausteeksi ja ruoansulatukseen.",
      en: "Biennial; seeds for flavor and digestion aid."
    },
    uses: { fi: ["mauste", "leipä", "tee"], en: ["spice", "bread", "tea"] },
    images: []
  },

  marigold: {
    id: "marigold",
    source: "wild",
    toxicity: "safe",
    commonName: { fi: "Kehäkukka", en: "Calendula / Marigold" },
    latinName: "Calendula officinalis",
    edibleParts: { fi: ["kukat"], en: ["flowers"] },
    medicinalNotes: {
      fi: "Oranssit kukat; perinteinen iho- ja haavavoiteissa.",
      en: "Bright orange flowers; classic for skin and wound salves."
    },
    uses: { fi: ["salva", "tee", "öljyuute"], en: ["salve", "tea", "oil infusion"] },
    images: []
  },

  lady_fern: {
    id: "lady_fern",
    source: "wild",
    toxicity: "caution",
    commonName: { fi: "Kotkansiipi / Saniaisen verso", en: "Lady fern" },
    latinName: "Athyrium filix-femina",
    edibleParts: { fi: ["nuoret kääröversot (vain oikea laji, kypsennettynä)"], en: ["young fiddleheads (correct species, cooked)"] },
    medicinalNotes: {
      fi: "Lehdistö tuuhea, versoissa käärömäinen kärki. Älä sekoita kotkansiipeen tai myrkkykasveihin.",
      en: "Feathery fronds; coiled young shoots. Do not confuse with toxic ferns."
    },
    caution: {
      fi: "Käytä vain oikein tunnistettuja nuoria versoja, aina kypsennettynä.",
      en: "Use only correctly identified young shoots, always cooked."
    },
    uses: { fi: ["paistettu lisuke"], en: ["fried vegetable"] },
    images: []
  },

  meadow_clary: {
    id: "meadow_clary",
    source: "wild",
    toxicity: "safe",
    commonName: { fi: "Niittysalvia", en: "Meadow clary / wild sage" },
    latinName: "Salvia pratensis",
    edibleParts: { fi: ["lehdet (mauste)"], en: ["leaves (spice)"] },
    medicinalNotes: {
      fi: "Siniviolettikukintoinen; aromaattinen ja mieto salvia.",
      en: "Blue-violet flowers; mild aromatic sage."
    },
    uses: { fi: ["mauste", "tee"], en: ["spice", "tea"] },
    images: []
  },

    // ----------------------------------------
  // DEADLY & POISONOUS HERBS (do not touch / eat)
  // ----------------------------------------

  foxglove: {
    id: "foxglove",
    source: "wild",
    toxicity: "poison",
    commonName: { fi: "Sormustinkukka", en: "Foxglove" },
    latinName: "Digitalis purpurea",
    medicinalNotes: {
      fi: "Korkea, kellomaisia violetteja kukkia; sisältää sydämen digitalisglykosideja.",
      en: "Tall spikes of purple bell flowers; contains cardiac glycosides."
    },
    caution: {
      fi: "Älä koske tai niele; sydämen toimintaan vaikuttava myrkky.",
      en: "Do not touch or ingest; affects heart rhythm, potentially lethal."
    },
    uses: { fi: [], en: [] },
    images: []
  },

  wolfsbane: {
    id: "wolfsbane",
    source: "wild",
    toxicity: "poison",
    commonName: { fi: "Ukonhattu (sininen)", en: "Wolfsbane / Monkshood" },
    latinName: "Aconitum napellus",
    medicinalNotes: {
      fi: "Syvänvioletit 'huppukukat'; myrkyllinen jopa ihon läpi.",
      en: "Deep violet hooded flowers; deadly even through skin contact."
    },
    caution: {
      fi: "Älä koske ilman käsineitä; pidä lemmikit ja lapset poissa.",
      en: "Never touch barehanded; keep pets and children away."
    },
    uses: { fi: [], en: [] },
    images: []
  },

  deadly_nightshade: {
    id: "deadly_nightshade",
    source: "wild",
    toxicity: "poison",
    commonName: { fi: "Belladonna / Myrkkykoiso", en: "Deadly Nightshade" },
    latinName: "Atropa belladonna",
    medicinalNotes: {
      fi: "Tummanvioletit kukat ja kiiltävät mustat marjat. Erittäin myrkyllinen.",
      en: "Dark purple flowers and glossy black berries. Extremely poisonous."
    },
    caution: {
      fi: "Älä syö marjoja. Voi aiheuttaa hallusinaatioita ja hengityspysähdyksen.",
      en: "Do not eat berries. Can cause hallucinations and respiratory failure."
    },
    uses: { fi: [], en: [] },
    images: []
  },

  baneberry: {
    id: "baneberry",
    source: "wild",
    toxicity: "poison",
    commonName: { fi: "Konnanmarja", en: "Baneberry" },
    latinName: "Actaea spicata",
    medicinalNotes: {
      fi: "Mustat tai punaiset marjat; kasvaa varjoisissa lehdoissa.",
      en: "Black or red berries; grows in shady groves."
    },
    caution: {
      fi: "Jo muutama marja voi aiheuttaa vakavan myrkytyksen.",
      en: "Even a few berries can cause serious poisoning."
    },
    uses: { fi: [], en: [] },
    images: []
  },

  water_hemlock: {
    id: "water_hemlock",
    source: "wild",
    toxicity: "poison",
    commonName: { fi: "Myrkkykeiso", en: "Water Hemlock" },
    latinName: "Cicuta virosa",
    medicinalNotes: {
      fi: "Rantakasvi; ontto juuri ja valkoinen kukinto; Suomen myrkyllisimpiä.",
      en: "Wetland plant; hollow root, white umbels; among Finland’s deadliest."
    },
    caution: {
      fi: "Erittäin myrkyllinen. Älä koske tai maista. Pieni määrä tappava.",
      en: "Extremely toxic. Do not touch or taste. Minute dose can kill."
    },
    uses: { fi: [], en: [] },
    images: []
  },

  hemlock: {
    id: "hemlock",
    source: "wild",
    toxicity: "poison",
    commonName: { fi: "Mykerökeiso / Muurahaisputki", en: "Poison Hemlock" },
    latinName: "Conium maculatum",
    medicinalNotes: {
      fi: "Korkea sarjakukka; violetitäpläinen varsi; vahva hiiren haju.",
      en: "Tall umbellifer; purple-spotted stem; strong mouse-like odor."
    },
    caution: {
      fi: "Vältä kaikkea kosketusta; sekoittuu helposti syötäviin sarjakukkiin.",
      en: "Avoid any contact; easily mistaken for edible umbellifers."
    },
    uses: { fi: [], en: [] },
    images: []
  },

  lords_and_ladies: {
    id: "lords_and_ladies",
    source: "wild",
    toxicity: "poison",
    commonName: { fi: "Täpläimikkä / käärmeenpistoyrtti", en: "Lords-and-ladies / Cuckoo pint" },
    latinName: "Arum maculatum",
    medicinalNotes: {
      fi: "Nuijamainen kukka; punaiset marjat. Koko kasvi myrkyllinen.",
      en: "Club-shaped flower; red berries. Entire plant toxic."
    },
    caution: {
      fi: "Älä syö. Sisältää oksalaattikiteitä, polttaa suun ja nielun.",
      en: "Do not eat. Contains oxalate crystals; burns mouth and throat."
    },
    uses: { fi: [], en: [] },
    images: []
  },

  wolfsbane_yellow: {
    id: "wolfsbane_yellow",
    source: "wild",
    toxicity: "poison",
    commonName: { fi: "Keltaukonhattu", en: "Yellow Monkshood" },
    latinName: "Aconitum lycoctonum",
    medicinalNotes: {
      fi: "Keltainen lajimuoto; pohjoisten metsien laji; yhtä myrkyllinen kuin sininen ukonhattu.",
      en: "Yellow-flowered species; northern forests; as deadly as blue monkshood."
    },
    caution: {
      fi: "Älä koske; kasvineste imeytyy ihon läpi.",
      en: "Do not touch; sap absorbs through skin."
    },
    uses: { fi: [], en: [] },
    images: []
  },

  cow_parsnip_giant: {
    id: "cow_parsnip_giant",
    source: "wild",
    toxicity: "poison",
    commonName: { fi: "Jättiputki (Heracleum)", en: "Giant Hogweed" },
    latinName: "Heracleum mantegazzianum",
    medicinalNotes: {
      fi: "Valtava, yli 2 m korkea sarjakukka; mehu aiheuttaa palovamman auringossa.",
      en: "Huge umbel (2m+); sap causes skin burns in sunlight."
    },
    caution: {
      fi: "ÄLÄ KOSKE; ilmoita viranomaisille.",
      en: "DO NOT TOUCH; report sightings to authorities."
    },
    uses: { fi: [], en: [] },
    images: []
  },

  marsh_calla: {
    id: "marsh_calla",
    source: "wild",
    toxicity: "poison",
    commonName: { fi: "Vehka", en: "Marsh calla / Water arum" },
    latinName: "Calla palustris",
    medicinalNotes: {
      fi: "Suo- ja ojien kasvi; valkoinen huppumainen kukka; marjat punaisia ja myrkyllisiä.",
      en: "Wetland plant; white hooded flower; red berries highly poisonous."
    },
    caution: {
      fi: "Sisältää oksalaattikiteitä; aiheuttaa poltetta ja turvotusta.",
      en: "Contains oxalate crystals; causes burning and swelling."
    },
    uses: { fi: [], en: [] },
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
