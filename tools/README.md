# 🧰 Tools – Herb App

This folder holds small helper tools I use to build and maintain the Herb App data before it goes into the mobile app. Think of this as my workbench: lightweight, offline, and focused on keeping the herb library clean and consistent.


## 🌿 Current Tool

### `herb-editor-lite/`
An offline HTML editor for the herb database.
- Add / edit herbs in FI & EN
- Mark safety levels (to be expanded: Safe, Caution, Toxic, Deadly)
- Attach recipes and images
- Export/import JSON

How to open:
1. Open `tools/herb-editor-lite/index.html` in your browser.
2. Edit entries.
3. Export JSON and move it to `/data/`.


## Thoughts and thoughts:

### Data quality & consistency ###
- **Sentence Consistency Checker**  
  Flags mismatched phrasing (e.g., standardize “Koristekasvi – ei hyötykäyttöön” across cards).
- **Translation Sync Helper**  
  Shows side-by-side FI/EN with warnings for missing or uneven content.
- **JSON Schema Validator**  
  Validates required fields, parts formatting, allowed values for safety/category, etc.

### Safety & taxonomy ###
- **Toxicity Levels Manager**  
  Centralizes the new scale (Safe / Caution / Toxic / Deadly) with definitions + tooltips.
- **Parts & Preparation Normalizer**  
  Enforces a fixed list for parts (leaf, root, flower…) and preparation terms (infusion, decoction…).

### Content & asset handling ###
- **Recipe Manager (linked)**  
  Create recipes once; link to multiple herbs. Exportable JSON for the app.
- **Image Import & Optimizer**  
  Drops images into a folder, compresses, renames, and writes metadata (attribution, license).
- **CSV/TSV Importer**  
  Converts spreadsheets into the JSON structure (useful when batch-adding herbs).

### Geography & future features ###
- **Region/Map Data Builder**  
  Adds “Found in Finland / Nordics” fields and prepares data for future map view.
- **Internationalization Prep**  
  Extracts all user-facing strings and prepares for Nordic/global expansion later.

### Design/system ###
- **Icon & Color Token Exporter** (from Figma)  
  Exports safety icons and color tokens so the app + editor stay visually consistent.


Planned base:
'''
tools/
│
├── herb-editor-lite/
│ ├── index.html
│ ├── script.js
│ ├── style.css
│ └── README.md
│
├── recipe-manager/ # (planned)
├── json-schema-validator/ # (planned)
├── sentence-consistency-checker/ # (planned)
├── image-optimizer/ # (planned)
└── csv-importer/ # (planned)
'''

🗺️ Next steps for tools
- Define final toxicity levels + short definitions
- Draft a JSON schema (required fields, enums, types)
- Build a tiny “consistency checker” (FI/EN alignment + phrasing rules)
- Decide image folder + attribution format (`/images/<herb-id>/source.md`)
- Plan recipe JSON structure (reusable & linkable)
