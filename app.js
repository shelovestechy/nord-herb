let DATA = null;
let CURRENT_LANG = 'fi';

const grid = document.getElementById('grid');
const searchInput = document.getElementById('search');
const langSelect = document.getElementById('lang');
const filterNative = document.getElementById('filter-native');
const filterStore = document.getElementById('filter-store');
const exportBtn = document.getElementById('export-json');
const importInput = document.getElementById('import-json');

async function loadData() {
  const res = await fetch('./data/herbs.json');
  DATA = await res.json();
  CURRENT_LANG = DATA.language_default || 'fi';
  langSelect.value = CURRENT_LANG;
  render();
}

function t(obj) {
  if (!obj) return '';
  return obj[CURRENT_LANG] ?? obj['fi'] ?? obj['en'] ?? '';
}

function matchesFilters(herb, q) {
  const hay = [
    t(herb.name),
    herb.scientific_name,
    t(herb.summary),
    ...(herb.uses || []).map(t),
    ...(herb.tags || [])
  ].join(' ').toLowerCase();

  const okQuery = q ? hay.includes(q) : true;
  const okNative = !filterNative.checked || (herb.origin?.native_in_finland === true);
  const okStore  = !filterStore.checked  || (herb.origin?.store_bought === true);
  return okQuery && okNative && okStore;
}

function render() {
  if (!DATA) return;
  const q = (searchInput.value || '').trim().toLowerCase();
  const herbs = (DATA.herbs || []).filter(h => matchesFilters(h, q));
  grid.innerHTML = herbs.map(h => cardHTML(h)).join('') || `<p style="opacity:.8">Ei tuloksia / No results.</p>`;
}

function cardHTML(h) {
  const img = (h.images && h.images[0]) || '';
  const native = h.origin?.native_in_finland ? `<span class="badge">🇫🇮 Native</span>` : ``;
  const store  = h.origin?.store_bought ? `<span class="badge">🛒 Store</span>` : ``;

  const uses = (h.uses || []).slice(0, 3).map(t).filter(Boolean);
  return `
    <article class="card">
      ${img ? `<img src="${img}" alt="${t(h.name)}" loading="lazy" />` : ``}
      <div class="body">
        <strong>${t(h.name)}</strong>
        <small><em>${h.scientific_name || ''}</em></small>
        <p>${t(h.summary)}</p>
        <div class="badges">${native}${store}</div>
        ${uses.length ? `<small>• ${uses.join(' • ')}</small>` : ``}
      </div>
    </article>
  `;
}

// Handlers
searchInput.addEventListener('input', render);
langSelect.addEventListener('change', () => { CURRENT_LANG = langSelect.value; render(); });
filterNative.addEventListener('change', render);
filterStore.addEventListener('change', render);

// Import/Export (works on phone)
exportBtn.addEventListener('click', () => {
  if (!DATA) return;
  const blob = new Blob([JSON.stringify(DATA, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement('a'), { href: url, download: 'herbs.json' });
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
});

importInput.addEventListener('change', async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    const text = await file.text();
    const json = JSON.parse(text);
    if (!json || !Array.isArray(json.herbs)) throw new Error('Invalid data: "herbs" array missing.');
    DATA = json;
    CURRENT_LANG = DATA.language_default || 'fi';
    langSelect.value = CURRENT_LANG;
    render();
  } catch (err) {
    alert('JSON import failed: ' + err.message);
  } finally {
    importInput.value = '';
  }
});

loadData();
