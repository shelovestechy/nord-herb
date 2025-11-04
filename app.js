// ===== Config =====
const FALLBACK_SVG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360">
  <defs><style>
    .a{fill:#1c1c1c;}.b{fill:#3a3a3a;}.t{fill:#c7f5cc;font:700 28px system-ui;}
  </style></defs>
  <rect class="a" width="640" height="360"/>
  <rect class="b" x="18" y="18" width="604" height="324" rx="18"/>
  <text class="t" x="50%" y="54%" dominant-baseline="middle" text-anchor="middle">No image</text>
</svg>`);

// Global UI state
let LANG = localStorage.getItem("nordherb_lang") || "fi"; // "fi" or "en"
let HIDE_TOXIC = localStorage.getItem("nordherb_hide_toxic") === "1";

// DOM helpers
const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

// ----- Utilities -----
function get(obj, path, fallback) {
  try {
    const val = path.split(".").reduce((o,k)=>o?.[k], obj);
    return val ?? fallback;
  } catch { return fallback; }
}
function textFrom(x, lang="fi", fallback="") {
  if (x == null) return fallback;
  if (typeof x === "string") return x;
  if (Array.isArray(x)) return x.join(", ");
  return x[lang] ?? x.fi ?? x.en ?? fallback;
}
function normSafety(herb) {
  // Accept: herb.safety (string or {fi/en}) OR herb.toxic boolean
  const s = herb.safety;
  if (typeof s === "string") return s.toLowerCase();
  if (s && (s.fi || s.en)) return String(s.en || s.fi).toLowerCase();

  // if there's only a boolean toxic switch
  if (herb.toxic === true) return "toxic";
  return "safe"; // default
}
function safetyLabel(tag) {
  const labels = {
    safe:   { fi: "Turvallinen",  en: "Safe" },
    caution:{ fi: "Varovaisuus",  en: "Caution" },
    toxic:  { fi: "Myrkyllinen",  en: "Toxic" },
    deadly: { fi: "Erittäin myrkyllinen", en: "Deadly" }
  };
  return labels[tag] || { fi:"Tuntematon", en:"Unknown" };
}
function herbNameFI(h){ return textFrom(get(h,"name",""),"fi", get(h,"fi","")); }
function herbNameEN(h){ return textFrom(get(h,"name",""),"en", get(h,"en","")); }

// Image picking with graceful fallback
function buildImageEl(herb) {
  const img = document.createElement("img");
  img.loading = "lazy";

  // Choose source
  let src = null;
  const images = herb.images; // array of filenames (preferred)
  if (images && images.length) {
    src = `./images/${images[0]}`;
  } else {
    const guess =
      (herb.id) ||
      (herb.scientific_name || "").toLowerCase().replace(/\s+/g,"_") ||
      "";
    if (guess) src = `./images/${guess}.jpg`;
  }

  if (!src) {
    img.src = FALLBACK_SVG;
    return img;
  }

  img.src = src;
  img.alt = herbNameFI(herb) || herbNameEN(herb) || (herb.scientific_name || "");
  img.onerror = () => { img.src = FALLBACK_SVG; }; // kill “broken image” icon
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
        return Array.isArray(j) ? j : (j.herbs || []);
      }
    } catch {}
  }
  throw new Error("Could not find herbs JSON under ./data/");
}

function renderCard(h) {
  const wrap = document.createElement("article");
  const tag = normSafety(h);
  wrap.className = "card";
  wrap.dataset.safety = tag;

  // Title line
  const title = document.createElement("h2");
  const fi = herbNameFI(h);
  const en = herbNameEN(h);
  title.textContent = LANG === "fi" ? (fi || en || "—") : (en || fi || "—");

  // Scientific name
  const sciEl = document.createElement("div");
  sciEl.className = "sci";
  sciEl.textContent = h.scientific_name || "";

  // Safety pill
  const pill = document.createElement("div");
  pill.className = `safety ${tag}`;
  const sTxt = safetyLabel(tag);
  pill.textContent = LANG === "fi" ? sTxt.fi : sTxt.en;

  // Blocks (Found, Parts, Uses, Other)
  const found = document.createElement("div");
  found.className = "block";
  found.innerHTML = `
    <h3>${LANG==="fi" ? "Kasvupaikka" : "Found"}</h3>
    <p>${textFrom(h.found, LANG, "") || "<span class='meta'>—</span>"}</p>
  `;

  const parts = document.createElement("div");
  parts.className = "block";
  const partsText = (() => {
    const v = h.parts;
    if (!v) return "";
    if (Array.isArray(v)) return v.join(", ");
    if (typeof v === "object") return v[LANG] || v.fi || v.en || "";
    return String(v);
  })();
  parts.innerHTML = `
    <h3>${LANG==="fi" ? "Osat" : "Parts"}</h3>
    <p>${partsText || "<span class='meta'>—</span>"}</p>
  `;

  const uses = document.createElement("div");
  uses.className = "block";
  uses.innerHTML = `
    <h3>${LANG==="fi" ? "Käyttö" : "Uses"}</h3>
    <p>${textFrom(h.uses, LANG, "") || "<span class='meta'>—</span>"}</p>
  `;

  const other = document.createElement("div");
  other.className = "block";
  other.innerHTML = `
    <h3>${LANG==="fi" ? "Muut" : "Other"}</h3>
    <p>${textFrom(h.other, LANG, "") || "<span class='meta'>—</span>"}</p>
  `;

  // Compose
  const img = buildImageEl(h);
  wrap.appendChild(img);
  wrap.appendChild(title);
  if (h.scientific_name) wrap.appendChild(sciEl);
  wrap.appendChild(pill);
  wrap.appendChild(found);
  wrap.appendChild(parts);
  wrap.appendChild(uses);
  wrap.appendChild(other);

  return wrap;
}

function applySearchAndToxicFilter() {
  const q = ($("#searchBox").value || "").toLowerCase();
  $$(".card").forEach(card => {
    const txt = card.textContent.toLowerCase();
    const isToxic = ["toxic","deadly"].includes(card.dataset.safety);
    const toxicOK = HIDE_TOXIC ? !isToxic : true;
    card.style.display = (txt.includes(q) && toxicOK) ? "" : "none";
  });
}

async function boot() {
  // Restore UI state
  $("#langBtn").setAttribute("aria-pressed", LANG === "en" ? "true" : "false");
  $("#langBtn").textContent = LANG.toUpperCase();
  $("#hideToxic").checked = HIDE_TOXIC;

  // Load & render
  const herbs = await loadData();
  const grid = $("#herbGrid");
  grid.innerHTML = "";
  herbs.forEach(h => grid.appendChild(renderCard(h)));

  // Wire search
  $("#searchBox").addEventListener("input", applySearchAndToxicFilter);

  // Wire hide toxic
  $("#hideToxic").addEventListener("change", (e) => {
    HIDE_TOXIC = e.target.checked;
    localStorage.setItem("nordherb_hide_toxic", HIDE_TOXIC ? "1" : "0");
    applySearchAndToxicFilter();
  });

  // Wire language toggle
  $("#langBtn").addEventListener("click", () => {
    LANG = (LANG === "fi" ? "en" : "fi");
    localStorage.setItem("nordherb_lang", LANG);
    $("#langBtn").textContent = LANG.toUpperCase();
    $("#langBtn").setAttribute("aria-pressed", LANG === "en" ? "true" : "false");
    // re-render all cards in new language (cheapest: rebuild)
    grid.innerHTML = "";
    herbs.forEach(h => grid.appendChild(renderCard(h)));
    applySearchAndToxicFilter();
  });

  applySearchAndToxicFilter();
}

boot().catch(err => {
  console.error(err);
  $("#herbGrid").innerHTML = `<div class="meta block">Could not load data. Check <code>data/herbs.json</code>.</div>`;
});
