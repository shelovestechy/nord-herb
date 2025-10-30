/* Herb App – minimal client
   - loads /data/herbs.json
   - FI/EN toggle
   - live search
   - filter: native_in_finland / store_bought
*/

const els = {
  cards: document.getElementById('cards'),
  search: document.getElementById('search'),
  langToggle: document.getElementById('langToggle'),
  resultCount: document.getElementById('resultCount'),
  filterNative: document.getElementById('filterNative'),
  filterStore: document.getElementById('filterStore'),
};

let raw = null;
let herbs = [];
let currentLang = 'fi';

const i18n = {
  fi: {
    filter_native: 'Vain Suomessa luonnonvaraiset',
    filter_store: 'Vain kauppayrtit',
    parts: 'Käyttöosat',
    uses: 'Mitä voi valmistaa',
    found: 'Missä löytyy',
    safety: 'Turvallisuus',
    other: 'Muu tieto',
    native_badge: 'Luonnonvarainen (FI)',
    store_badge: 'Kauppa',
    result_zero: 'Ei tuloksia',
    result_one: '1 yrtti',
    result_many: n => `${n} yrttiä`,
  },
  en: {
    filter_native: 'Only native in Finland',
    filter_store: 'Only store-bought',
    parts: 'Parts used',
    uses: 'What you can make',
    found: 'Where found',
    safety: 'Safety',
    other: 'Other info',
    native_badge: 'Native (FI)',
    store_badge: 'Store-bought',
    result_zero: 'No results',
    result_one: '1 herb',
    result_many: n => `${n} herbs`,
  }
};

// ---- boot
init();

async function init(){
  try{
    const res = await fetch('./data/herbs.json', {cache:'no-store'});
    raw = await res.json();
    currentLang = (raw.language_default || 'fi').toLowerCase().startsWith('en') ? 'en' : 'fi';
    herbs = Array.isArray(raw.herbs) ? raw.herbs : [];
    applyStaticTranslations();
    updateLangButton();
    wireEvents();
    render();
  }catch(e){
    console.error('Failed to load herbs.json', e);
    els.cards.innerHTML = errCard('Could not load data file: /data/herbs.json');
  }
}

function wireEvents(){
  els.search.addEventListener('input', render);
  els.filterNative.addEventListener('change', render);
  els.filterStore.addEventListener('change', render);
  els.langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'fi' ? 'en' : 'fi';
    updateLangButton();
    applyStaticTranslations();
    render(); // re-render with new language
  });
}

function applyStaticTranslations(){
  // translate filter labels
  document.querySelectorAll('[data-i18n="filter_native"]')
    .forEach(el => el.textContent = i18n[currentLang].filter_native);
  document.querySelectorAll('[data-i18n="filter_store"]')
    .forEach(el => el.textContent = i18n[currentLang].filter_store);

  // html lang for accessibility
  document.documentElement.lang = currentLang;
}

function updateLangButton(){
  els.langToggle.textContent = currentLang.toUpperCase();
  els.langToggle.setAttribute('aria-label', currentLang === 'fi' ? 'Vaihda kieleen EN' : 'Switch to FI');
}

function render(){
  const q = els.search.value.trim().toLowerCase();
  const onlyNative = els.filterNative.checked;
  const onlyStore = els.filterStore.checked;

  let out = herbs.filter(h => {
    if (onlyNative && !h.origin?.native_in_finland) return false;
    if (onlyStore && !h.origin?.store_bought) return false;

    if (!q) return true;

    const fields = [
      h.name?.fi, h.name?.en, h.scientific_name,
      h.parts_used?.[currentLang], h.uses_make?.[currentLang],
      h.found?.[currentLang], h.safety?.[currentLang], h.other?.[currentLang]
    ].filter(Boolean).map(v => String(v).toLowerCase());

    return fields.some(text => text.includes(q));
  });

  // sort by localized common name
  out.sort((a,b) => (a.name?.[currentLang] || '').localeCompare(b.name?.[currentLang] || ''));

  els.cards.innerHTML = out.map(cardHTML).join('') || emptyState();
  updateResultCount(out.length);
}

function cardHTML(h){
  const t = i18n[currentLang];
  const nm = esc(h.name?.[currentLang] || '');
  const sci = esc(h.scientific_name || '');

  const parts = esc(h.parts_used?.[currentLang] || '-');
  const uses  = esc(h.uses_make?.[currentLang] || '-');
  const found = esc(h.found?.[currentLang] || '-');
  const safety= esc(h.safety?.[currentLang] || '-');
  const other = esc(h.other?.[currentLang] || '-');

  const isNative = !!h.origin?.native_in_finland;
  const isStore  = !!h.origin?.store_bought;

  return `
  <article class="card">
    <header>
      <h3>${nm}</h3>
      <div class="sci">${sci}</div>
    </header>

    <div class="badges">
      ${isNative ? `<span class="badge badge--native">${esc(t.native_badge)}</span>` : ``}
      ${isStore  ? `<span class="badge badge--store">${esc(t.store_badge)}</span>` : ``}
    </div>

    <div class="section">
      <div class="label">${esc(t.found)}</div>
      <div>${found || '-'}</div>
    </div>

    <div class="section">
      <div class="label">${esc(t.parts)}</div>
      <div class="pair">
        <div>${parts}</div>
      </div>
    </div>

    <div class="section">
      <div class="label">${esc(t.uses)}</div>
      <div>${uses}</div>
    </div>

    <div class="section safety">
      <div class="label">${esc(t.safety)}</div>
      <div>${safety}</div>
    </div>

    <div class="section note">
      <div class="label">${esc(t.other)}</div>
      <div>${other}</div>
    </div>
  </article>
  `;
}

function emptyState(){
  return `<div class="muted" style="padding:20px">No items to show.</div>`;
}

function errCard(msg){
  return `<article class="card"><div class="label">Error</div><div>${esc(msg)}</div></article>`;
}

function updateResultCount(n){
  const t = i18n[currentLang];
  let s = t.result_zero;
  if (n === 1) s = t.result_one;
  else if (n > 1) s = t.result_many(n);
  els.resultCount.textContent = s;
}

function esc(str){
  return String(str)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'",'&#39;');
}
