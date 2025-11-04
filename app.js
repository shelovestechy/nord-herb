// ===== Config =====
const FALLBACK_SVG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360">
  <defs><style>
    .bg{fill:#f1f7f3;} .frame{fill:#dbe8e0;stroke:#c0d3c7;stroke-width:6;} .leaf{fill:none;stroke:#89b38f;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;}
    .txt{fill:#2f6c3c;font:600 30px 'Inter',sans-serif;letter-spacing:4px;}
  </style></defs>
  <rect class="bg" width="640" height="360" rx="36"/>
  <rect class="frame" x="36" y="40" width="568" height="280" rx="28"/>
  <path class="leaf" d="M160 220c60-140 180-140 240 0M250 140c36-36 72-36 108 0"/>
  <text class="txt" x="50%" y="54%" dominant-baseline="middle" text-anchor="middle">NORD HERB</text>
</svg>`);

// Global UI state
let LANG = localStorage.getItem("nordherb_lang") || "fi"; // "fi" or "en"
let HIDE_TOXIC = localStorage.getItem("nordherb_hide_toxic") === "1";
let HERBS = [];
let HERB_MAP = new Map();
let CURRENT_DETAIL = null;

const SAFETY_ALIASES = new Map(
  Object.entries({
    safe: "safe",
    turvallinen: "safe",
    turvallisesti: "safe",
    caution: "caution",
    cautionary: "caution",
    varovaisuus: "caution",
    varoitus: "caution",
    warning: "caution",
    toxic: "toxic",
    poisonous: "toxic",
    myrkyllinen: "toxic",
    danger: "toxic",
    deadly: "deadly",
    fatal: "deadly",
    hengenvaarallinen: "deadly",
  })
);

// DOM helpers
const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

// ----- Utilities -----
function get(obj, path, fallback) {
  try {
    const val = path.split(".").reduce((o, k) => o?.[k], obj);
    return val ?? fallback;
  } catch {
    return fallback;
  }
}

function textFrom(x, lang = "fi", fallback = "") {
  if (x == null) return fallback;
  if (typeof x === "string") return x;
  if (Array.isArray(x)) return x.join(", ");
  return x[lang] ?? x.fi ?? x.en ?? fallback;
}

function slugify(value) {
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeSafetyTag(raw) {
  if (!raw) return null;
  const key = String(raw).toLowerCase().trim();
  if (SAFETY_ALIASES.has(key)) return SAFETY_ALIASES.get(key);
  for (const [alias, mapped] of SAFETY_ALIASES.entries()) {
    if (alias !== key && key.includes(alias)) {
      return mapped;
    }
  }
  return null;
}

function normSafety(herb) {
  const s = herb.safety;
  let normalized = null;
  if (typeof s === "string") normalized = normalizeSafetyTag(s) || "unknown";
  else if (s && (s.fi || s.en)) normalized = normalizeSafetyTag(s.en || s.fi) || "unknown";

  if (!normalized && (herb.toxic === true || herb.toxic === "true")) {
    normalized = "toxic";
  }

  return normalized || "safe";
}

function safetyLabel(tag) {
  const labels = {
    safe: { fi: "Turvallinen", en: "Safe" },
    caution: { fi: "Varovaisuus", en: "Caution" },
    toxic: { fi: "Myrkyllinen", en: "Toxic" },
    deadly: { fi: "Erittäin myrkyllinen", en: "Deadly" },
  };
  return labels[tag];
}

function herbNameFI(h) {
  return textFrom(get(h, "name", ""), "fi", get(h, "fi", ""));
}

function herbNameEN(h) {
  return textFrom(get(h, "name", ""), "en", get(h, "en", ""));
}

function herbKey(herb) {
  if (herb.__key) return herb.__key;
  let key = null;
  if (herb.id) key = herb.id;
  else if (herb.scientific_name) key = slugify(herb.scientific_name);
  else {
    const fi = herbNameFI(herb);
    if (fi) key = slugify(fi);
    else {
      const en = herbNameEN(herb);
      if (en) key = slugify(en);
    }
  }

  if (!key) {
    key = `herb-${Math.random().toString(36).slice(2)}`;
  }

  Object.defineProperty(herb, "__key", {
    value: key,
    enumerable: false,
    configurable: true,
  });
  return key;
}

function partsText(herb, lang) {
  const partsRaw = herb.parts;
  if (Array.isArray(partsRaw)) return partsRaw.join(", ");
  if (typeof partsRaw === "object" && partsRaw) {
    return partsRaw[lang] || partsRaw.fi || partsRaw.en || "";
  }
  if (partsRaw != null) return String(partsRaw);
  return "";
}

function createDetail(title, content, icon) {
  const section = document.createElement("section");
  section.className = "detail";

  const heading = document.createElement("h3");
  if (icon) {
    const iconSpan = document.createElement("span");
    iconSpan.className = "detail__icon";
    iconSpan.setAttribute("aria-hidden", "true");
    iconSpan.textContent = icon;
    heading.appendChild(iconSpan);
  }
  heading.appendChild(document.createTextNode(title));

  const paragraph = document.createElement("p");
  if (content) {
    paragraph.textContent = content;
  } else {
    const placeholder = document.createElement("span");
    placeholder.className = "meta";
    placeholder.textContent = "—";
    paragraph.appendChild(placeholder);
  }

  section.appendChild(heading);
  section.appendChild(paragraph);
  return section;
}

// Image picking with graceful fallback
function buildImageEl(herb, options = {}) {
  const { lazy = true, className = "card__photo" } = options;
  const img = document.createElement("img");
  img.loading = lazy ? "lazy" : "eager";
  if (className) {
    img.className = className;
  }

  let src = null;
  const images = herb.images;
  if (images && images.length) {
    src = `./images/${images[0]}`;
  } else {
    const guess =
      herb.id ||
      (herb.scientific_name || "").toLowerCase().replace(/\s+/g, "_") ||
      "";
    if (guess) src = `./images/${guess}.jpg`;
  }

  if (!src) {
    img.src = FALLBACK_SVG;
    img.alt = "Illustrated herb placeholder";
    return img;
  }

  img.src = src;
  img.alt = herbNameFI(herb) || herbNameEN(herb) || herb.scientific_name || "";
  img.onerror = () => {
    img.src = FALLBACK_SVG;
  };
  return img;
}

// ----- Rendering -----
async function loadData() {
  const candidates = ["./data/herbs.json", "./data/herb.json", "./herbs.json", "./herb.json"];
  for (const url of candidates) {
    try {
      const r = await fetch(url);
      if (r.ok) {
        const j = await r.json();
        return Array.isArray(j) ? j : j.herbs || [];
      }
    } catch (err) {
      console.warn(`Could not load ${url}`, err);
    }
  }
  throw new Error("Could not find herbs JSON under ./data/");
}

function renderCard(h) {
  const wrap = document.createElement("article");
  const tag = normSafety(h);
  const key = herbKey(h);
  wrap.className = "card";
  wrap.dataset.safety = tag;
  wrap.dataset.herbId = key;
  wrap.tabIndex = 0;
  wrap.setAttribute("role", "button");

  const imageShell = document.createElement("div");
  imageShell.className = "card__image";
  imageShell.appendChild(buildImageEl(h));

  const isToxic = tag === "toxic" || tag === "deadly" || h.toxic === true || h.toxic === "true";
  if (isToxic) {
    const toxicBadge = document.createElement("span");
    toxicBadge.className = "card__toxic";
    toxicBadge.setAttribute("aria-hidden", "true");
    toxicBadge.textContent = "☠";
    imageShell.appendChild(toxicBadge);
  }
  wrap.appendChild(imageShell);

  const body = document.createElement("div");
  body.className = "card__body";

  const header = document.createElement("div");
  header.className = "card__header";

  const titles = document.createElement("div");
  titles.className = "card__titles";

  const title = document.createElement("h2");
  const fi = herbNameFI(h);
  const en = herbNameEN(h);
  title.textContent = LANG === "fi" ? fi || en || "—" : en || fi || "—";
  titles.appendChild(title);

  if (h.scientific_name) {
    const sciEl = document.createElement("div");
    sciEl.className = "sci";
    sciEl.textContent = h.scientific_name;
    titles.appendChild(sciEl);
  }

  header.appendChild(titles);
  const sTxt = safetyLabel(tag);
  if (sTxt) {
    const pill = document.createElement("div");
    pill.className = `safety ${tag}`;
    pill.textContent = LANG === "fi" ? sTxt.fi : sTxt.en;
    header.appendChild(pill);
  }
  body.appendChild(header);

  const details = document.createElement("div");
  details.className = "card__details";

  const foundText = textFrom(h.found, LANG, "");
  const partsInfo = partsText(h, LANG);
  const usesText = textFrom(h.uses, LANG, "");
  const otherText = textFrom(h.other, LANG, "");

  details.appendChild(
    createDetail(LANG === "fi" ? "Kasvupaikka" : "Found", foundText, "📍")
  );
  details.appendChild(
    createDetail(LANG === "fi" ? "Osat" : "Parts", partsInfo, "🌿")
  );
  details.appendChild(
    createDetail(LANG === "fi" ? "Käyttö" : "Uses", usesText, "🍽")
  );
  details.appendChild(
    createDetail(LANG === "fi" ? "Muut" : "Other", otherText, "💡")
  );

  body.appendChild(details);
  wrap.appendChild(body);

  const labelParts = [];
  if (LANG === "fi" && fi) labelParts.push(fi);
  else if (LANG === "en" && en) labelParts.push(en);
  if (h.scientific_name) labelParts.push(h.scientific_name);
  wrap.setAttribute("aria-label", `${labelParts.join(" — ") || "Herb"}.`);

  const openDetailHandler = () => {
    openDetailView(key);
  };

  wrap.addEventListener("click", openDetailHandler);
  wrap.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDetailHandler();
    }
  });

  return wrap;
}

function renderGrid(container, herbList = HERBS) {
  if (!container) return;
  container.innerHTML = "";
  HERB_MAP = new Map();
  herbList.forEach((herb) => {
    const key = herbKey(herb);
    HERB_MAP.set(key, herb);
    container.appendChild(renderCard(herb));
  });
}

function renderDetailCard(herb) {
  const detail = document.createElement("div");
  detail.className = "detail-card";

  const hero = document.createElement("div");
  hero.className = "detail-card__hero";

  const imageWrap = document.createElement("div");
  imageWrap.className = "detail-card__image";
  const heroImg = buildImageEl(herb, { lazy: false, className: "" });
  imageWrap.appendChild(heroImg);

  const tag = normSafety(herb);
  const isToxic = tag === "toxic" || tag === "deadly" || herb.toxic === true || herb.toxic === "true";
  if (isToxic) {
    const toxicBadge = document.createElement("span");
    toxicBadge.className = "card__toxic";
    toxicBadge.setAttribute("aria-hidden", "true");
    toxicBadge.textContent = "☠";
    imageWrap.appendChild(toxicBadge);
  }

  hero.appendChild(imageWrap);

  const infoWrap = document.createElement("div");
  infoWrap.className = "detail-card__info";

  const fi = herbNameFI(herb);
  const en = herbNameEN(herb);
  const title = document.createElement("h2");
  title.id = "detailTitle";
  title.textContent = LANG === "fi" ? fi || en || "—" : en || fi || "—";
  infoWrap.appendChild(title);

  if (herb.scientific_name) {
    const sci = document.createElement("div");
    sci.className = "detail-card__sci";
    sci.textContent = herb.scientific_name;
    infoWrap.appendChild(sci);
  }

  const meta = document.createElement("div");
  meta.className = "detail-card__meta";

  const label = safetyLabel(tag);
  if (label) {
    const pill = document.createElement("div");
    pill.className = `safety ${tag}`;
    pill.textContent = LANG === "fi" ? label.fi : label.en;
    meta.appendChild(pill);
  }

  if (isToxic) {
    const toxic = document.createElement("span");
    toxic.className = "detail-card__badge detail-card__badge--toxic";
    const icon = document.createElement("span");
    icon.className = "detail-card__badge-icon";
    icon.textContent = "☠";
    toxic.appendChild(icon);
    toxic.appendChild(
      document.createTextNode(LANG === "fi" ? "Myrkyllinen" : "Toxic")
    );
    meta.appendChild(toxic);
  }

  const seasonText = textFrom(herb.collecting_season, LANG, "");
  if (seasonText) {
    const season = document.createElement("span");
    season.className = "detail-card__badge";
    const icon = document.createElement("span");
    icon.className = "detail-card__badge-icon";
    icon.textContent = "🗓";
    season.appendChild(icon);
    season.appendChild(
      document.createTextNode(
        LANG === "fi" ? "Keruuaika: " + seasonText : "Season: " + seasonText
      )
    );
    meta.appendChild(season);
  }

  if (meta.children.length) {
    infoWrap.appendChild(meta);
  }

  const description = textFrom(herb.description, LANG, "");
  if (description) {
    const intro = document.createElement("p");
    intro.className = "detail-card__intro";
    intro.textContent = description;
    infoWrap.appendChild(intro);
  }

  const actions = document.createElement("div");
  actions.className = "detail-card__actions";

  const recipeBtn = document.createElement("button");
  recipeBtn.type = "button";
  recipeBtn.className = "recipe-button";
  recipeBtn.disabled = true;
  recipeBtn.textContent =
    LANG === "fi" ? "Reseptit tulossa" : "Recipes coming soon";
  recipeBtn.setAttribute(
    "aria-label",
    LANG === "fi"
      ? "Reseptitoiminto on tulossa myöhemmin"
      : "Recipe feature is coming soon"
  );
  actions.appendChild(recipeBtn);
  infoWrap.appendChild(actions);

  hero.appendChild(infoWrap);
  detail.appendChild(hero);

  const content = document.createElement("div");
  content.className = "detail-card__content";

  const grid = document.createElement("div");
  grid.className = "detail-card__grid";

  const sections = [
    {
      title: LANG === "fi" ? "Kasvupaikka" : "Found",
      content: textFrom(herb.found, LANG, ""),
      icon: "📍",
    },
    {
      title: LANG === "fi" ? "Keruuaika" : "Collecting season",
      content: seasonText,
      icon: "🗓",
    },
    {
      title: LANG === "fi" ? "Osat" : "Parts",
      content: partsText(herb, LANG),
      icon: "🌿",
    },
    {
      title: LANG === "fi" ? "Käyttö" : "Uses",
      content: textFrom(herb.uses, LANG, ""),
      icon: "🍽",
    },
    {
      title: LANG === "fi" ? "Muut tiedot" : "Other",
      content: textFrom(herb.other, LANG, ""),
      icon: "💡",
    },
  ];

  sections.forEach((section) => {
    grid.appendChild(createDetail(section.title, section.content, section.icon));
  });

  content.appendChild(grid);

  const note = document.createElement("p");
  note.className = "detail-card__note";
  note.innerHTML =
    LANG === "fi"
      ? "<strong>Vinkki:</strong> Sulje ikkuna palataksesi kaikkiin yrtteihin."
      : "<strong>Tip:</strong> Close this view to return to all herbs.";
  content.appendChild(note);

  detail.appendChild(content);

  return detail;
}

function openDetailView(id) {
  const overlay = $("#detailOverlay");
  const content = $("#detailContent");
  if (!overlay || !content) return;
  const herb = HERB_MAP.get(id);
  if (!herb) return;

  CURRENT_DETAIL = herb;
  content.innerHTML = "";
  content.appendChild(renderDetailCard(herb));

  overlay.hidden = false;
  document.body.classList.add("detail-open");

  const panel = overlay.querySelector(".detail-panel");
  if (panel) {
    panel.setAttribute("tabindex", "-1");
  }

  setTimeout(() => {
    $("#detailClose")?.focus();
  }, 50);
}

function closeDetailView() {
  const overlay = $("#detailOverlay");
  if (!overlay || overlay.hidden) return;
  overlay.hidden = true;
  document.body.classList.remove("detail-open");
  const content = $("#detailContent");
  if (content) content.innerHTML = "";
  CURRENT_DETAIL = null;
}

function updateLangButton() {
  // Näytä napissa SE kieli, johon vaihdetaan seuraavaksi
  const btn = document.getElementById("langBtn");
  if (!btn) return;
  const next = (LANG === "fi") ? "EN" : "FI";
  btn.textContent = next;
  // aria-pressed = true kun EN on aktiivinen (eli nykyinen kieli on EN)
  btn.setAttribute("aria-pressed", LANG === "en" ? "true" : "false");
}


function updateStatus(total, visible, query, toxicActive) {
  const statusEl = $("#statusMessage");
  if (!statusEl) return;

  const queryActive = query.length > 0;

  if (!total) {
    statusEl.textContent = "Herbs are still loading...";
    statusEl.hidden = false;
    return;
  }

  if (!visible) {
    let message = "No herbs match your filters.";
    const parts = [];
    if (queryActive) parts.push(`search "${query}"`);
    if (toxicActive) parts.push("toxic filter");
    if (parts.length) {
      message += ` Try adjusting the ${parts.join(" and ")}.`;
    }
    statusEl.textContent = message;
    statusEl.hidden = false;
    return;
  }

  if (queryActive || toxicActive) {
    const parts = [];
    if (queryActive) parts.push(`search "${query}"`);
    if (toxicActive) parts.push("toxic filter");
    statusEl.textContent = `${visible} of ${total} herbs shown (${parts.join(" + ")}).`;
    statusEl.hidden = false;
  } else {
    statusEl.hidden = true;
  }
}

function applySearchAndToxicFilter() {
  const searchInput = $("#searchBox");
  const queryRaw = (searchInput?.value || "").trim();
  const query = queryRaw.toLowerCase();
  const cards = $$("#herbGrid .card");
  let visibleCount = 0;

  cards.forEach((card) => {
    const text = card.textContent.toLowerCase();
    const isToxic = ["toxic", "deadly"].includes(card.dataset.safety);
    const matchesQuery = text.includes(query);
    const toxicAllowed = HIDE_TOXIC ? !isToxic : true;
    const shouldShow = matchesQuery && toxicAllowed;
    card.style.display = shouldShow ? "" : "none";
    if (shouldShow) visibleCount += 1;
  });

  updateStatus(cards.length, visibleCount, queryRaw, HIDE_TOXIC);
}

function updateSearchClearVisibility() {
  const input = $("#searchBox");
  const clearBtn = $("#searchClear");
  if (!clearBtn || !input) return;
  clearBtn.hidden = !input.value;
}

async function boot() {
  const searchInput = $("#searchBox");
  const clearButton = $("#searchClear");
  const langButton = $("#langBtn");
  const hideToxic = $("#hideToxic");

  syncLanguageButton();
  if (hideToxic) hideToxic.checked = HIDE_TOXIC;
  updateSearchClearVisibility();

  const grid = $("#herbGrid");
  HERBS = await loadData();
  renderGrid(grid, HERBS);

  const heroCount = $("#herbCount");
  if (heroCount) {
    heroCount.textContent = HERBS.length;
  }

  updateStatus(HERBS.length, HERBS.length, "", HIDE_TOXIC);

  searchInput?.addEventListener("input", () => {
    updateSearchClearVisibility();
    applySearchAndToxicFilter();
  });

  clearButton?.addEventListener("click", () => {
    if (searchInput) {
      searchInput.value = "";
      searchInput.focus();
    }
    updateSearchClearVisibility();
    applySearchAndToxicFilter();
  });

  hideToxic?.addEventListener("change", (e) => {
    HIDE_TOXIC = e.target.checked;
    localStorage.setItem("nordherb_hide_toxic", HIDE_TOXIC ? "1" : "0");
    applySearchAndToxicFilter();
  });

  langButton?.addEventListener("click", () => {
    LANG = LANG === "fi" ? "en" : "fi";
    localStorage.setItem("nordherb_lang", LANG);
    syncLanguageButton();
    renderGrid(grid);
    applySearchAndToxicFilter();
    if (CURRENT_DETAIL) {
      const detailKey = herbKey(CURRENT_DETAIL);
      openDetailView(detailKey);
    }
  });

  $("#detailClose")?.addEventListener("click", closeDetailView);
  $("#detailOverlay")?.addEventListener("click", (event) => {
    if (event.target?.dataset?.closeDetail !== undefined) {
      closeDetailView();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDetailView();
    }
  });

  applySearchAndToxicFilter();
}

boot().catch((err) => {
  console.error(err);
  $("#herbGrid").innerHTML = `<div class="meta">Could not load data. Check <code>data/herbs.json</code>.</div>`;
  const statusEl = $("#statusMessage");
  if (statusEl) {
    statusEl.textContent = "Could not load herb data.";
    statusEl.hidden = false;
    updateLangButton();

  }
});
