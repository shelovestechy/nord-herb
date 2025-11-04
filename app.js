// ---------- helpers ----------
const by = (sel) => document.querySelector(sel);
const all = (sel) => Array.from(document.querySelectorAll(sel));

function normSafety(s) {
  if (!s) return "unknown";
  if (typeof s === "string") return s.toLowerCase();
  // object like {fi: "Turvallinen", en:"Safe"} OR {fi:"Safe"}
  const pick = s.en || s.fi || Object.values(s)[0] || "";
  return String(pick).toLowerCase();
}

function safeText(s) {
  const map = {
    safe: { fi: "Turvallinen", en: "Safe" },
    caution: { fi: "Varovaisuus", en: "Caution" },
    toxic: { fi: "Myrkyllinen", en: "Toxic" },
    deadly: { fi: "Erittäin myrkyllinen", en: "Deadly" },
    unknown: { fi: "Tuntematon", en: "Unknown" }
  };
  return map[s] || map.unknown;
}

function textFrom(x, fallback="") {
  if (x == null) return fallback;
  if (typeof x === "string") return x;
  // if it's an array like ["A","B"] join nicely
  if (Array.isArray(x)) return x.join(", ");
  // if it's an object with fi/en
  return x.fi || x.en || fallback;
}

function firstDefined(...vals){ return vals.find(v => v != null); }

// Try to pick an image path for a herb
function imageFor(herb){
  // prefer explicit herb.images array (filenames)
  if (herb.images && herb.images.length) return `./images/${herb.images[0]}`;

  // otherwise guess by id or scientific_name
  const base = herb.id || (herb.scientific_name || "").toLowerCase().replace(/\s+/g,"_");
  if (base) return `./images/${base}.jpg`; // you can change to .png if needed

  return null; // no image
}

// ---------- render ----------
async function loadAndRender() {
  // Load data (accept both ./data/herbs.json or ./data/herb.json)
  let urlCandidates = ["./data/herbs.json", "./data/herb.json", "./herbs.json", "./herb.json"];
  let json = null, lastErr = null;

  for (const u of urlCandidates) {
    try {
      const r = await fetch(u);
      if (r.ok) { json = await r.json(); break; }
    } catch (e) { lastErr = e; }
  }
  if (!json) {
    by("#herbGrid").innerHTML = `<div class="meta">Could not load herbs.json. Make sure it exists under ./data/</div>`;
    console.error("Failed to load JSON", lastErr);
    return;
  }

  // Data shape: either {herbs:[...]} or [...] directly
  const herbs = Array.isArray(json) ? json : (json.herbs || []);
  const grid = by("#herbGrid");

  grid.innerHTML = herbs.map(h => {
    const nameFi = textFrom(firstDefined(h.name?.fi, h.nameFi, h.fi, h.name), "—");
    const nameEn = textFrom(firstDefined(h.name?.en, h.nameEn, h.en), "");
    const sci    = textFrom(firstDefined(h.scientific_name, h.scientificName), "");
    const uses   = textFrom(firstDefined(h.uses?.fi, h.usesFi, h.uses), "");
    const sTag   = normSafety(firstDefined(h.safety?.en, h.safety?.fi, h.safety));
    const sTxt   = safeText(sTag);
    const img    = imageFor(h);

    return `
      <article class="card" data-safety="${sTag}">
        ${img ? `<img src="${img}" alt="${nameFi || sci || nameEn}" loading="lazy">` : ""}
        <h2>${nameFi}${nameEn ? ` / ${nameEn}` : ""}</h2>
        ${sci ? `<div class="sci"><i>${sci}</i></div>` : ""}
        <div class="safety ${sTag}">${sTxt.fi} / ${sTxt.en}</div>
        ${uses ? `<p class="uses">${uses}</p>` : `<p class="meta">Käyttökuvaus puuttuu</p>`}
      </article>
    `;
  }).join("");

  // Wire search
  const search = by("#searchBox");
  search.addEventListener("input", () => {
    const q = search.value.trim().toLowerCase();
    all(".card").forEach(card => {
      card.style.display = card.textContent.toLowerCase().includes(q) ? "" : "none";
    });
  });

  // Wire safety filter
  all(".chip").forEach(btn => {
    btn.addEventListener("click", () => {
      all(".chip").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const want = btn.dataset.filter; // all | safe | caution | toxic | deadly
      all(".card").forEach(card => {
        const tag = card.getAttribute("data-safety") || "unknown";
        card.style.display = (want === "all" || tag === want) ? "" : "none";
      });
      // nudge search to re-apply if text already typed
      search.dispatchEvent(new Event("input"));
    });
  });
}

// boot
loadAndRender();
