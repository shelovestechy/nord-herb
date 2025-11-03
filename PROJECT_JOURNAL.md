🌿 Developer Notes & Reflections

This file works as my living notebook for the Herb App project — a place for ideas, design thoughts, and quiet realizations along the way.
Every section here is meant to evolve, just like the app itself.

🧪 Toxic Button Rework

The current toxic button in the Herb Editor Lite feels too black-and-white. Herbs are either marked toxic or not toxic, which doesn’t represent real herbalism well.

Many plants are conditionally toxic — they become safe when prepared right, or harmful in large doses.

Examples:
Elderberries: edible when cooked, mildly toxic raw.
Rhubarb: edible stalks, poisonous leaves.
Yarrow: generally safe, but can trigger allergies.

To fix this, I’ll replace the single toggle with nuanced safety categories:

🟢 Safe – suitable for general use.
🟡 Caution – mildly toxic, or unsuitable in specific conditions.
🟠 Toxic – avoid internal use, external use possible only with guidance.
🔴 Deadly – highly poisonous, strictly educational entry.

Each level will have a color, symbol, and tooltip.
This should make the app feel less judgmental and more informative — reflecting how real herbalism balances benefit and risk.

🪶 Sentence & Tone Consistency

Some herb cards use slightly different ways to say the same thing.
For example:

“Koristekasvi – ei hyötykäyttöön.”
“Koristeellinen, ei sovellu sisäiseen käyttöön.”

Both are correct, but inconsistency breaks rhythm.

I’ll write a micro style guide to keep the text uniform:

Keep both languages concise and factual.
Prefer calm, descriptive phrasing.
Avoid unnecessary adjectives or “marketing” tone.
Use the same pattern for warnings, e.g. “Ei sisäiseen käyttöön.”
This helps the whole library read like it was written by one careful voice.


🌱 General Vision

The Herb App isn’t meant to be mystical or sensational.
It’s a practical, nature-rooted, educational tool that respects both modern knowledge and old wisdom.
The app should feel like a digital field companion: reliable, grounded, but still beautiful.

Core values I want to keep:

Clarity: Every sentence teaches something real.
Safety first: Clear preparation and dosage info.
Respect for tradition: Include Finnish folk insights when relevant.
Accessibility: Simple UI, readable fonts, bilingual clarity, and offline use.


🧭 Future Development Ideas

- Link herbs directly to recipes (“used in this tea → open recipe card”).
- Add color-coded toxicity indicators on every card.
- Create a “Found in Finland” map view.
- Let users save favorites or build personal mixes.
- Add a photo-recognition feature for plant identification.
- Eventually allow users to keep their own notes inside the app — a mini field journal.

🧩 Personal Learning Reflections

This project has taught me more than just coding.
It’s taught me about structure, patience, and creative discipline.
Each herb entry feels like planting a seed — small on its own, but part of a growing forest of knowledge.

Balancing the technical and creative sides has been the real challenge.
Learning HTML, CSS, JavaScript, JSON, and React Native while shaping the tone of a whole library is slow but rewarding.

💬 Notes to Self

Keep writing thoughts here — even half-finished ones.
Recheck tone and formatting after every new batch of herbs.
Create a bilingual phrasing template file.
Plan toxicity icons and colors in Figma.
Add “language check” before exporting the JSON.
Once the data structure feels stable, start prototyping the mobile app UI.

🎨 Design Language & Future Tone Direction

The visual tone should reflect nordic calm — clean, natural, slightly academic but warm.

Core design elements:

Backgrounds in muted earthy or forest tones (deep green, beige, soft grey).
Accent colors from nature: sage, clay, berry, and gold.
Serif fonts for Finnish botanical feel (Georgia or similar).
Rounded edges, minimal shadows, soft gradients — like old herbarium paper meeting modern design.

UI philosophy:
Simple, tactile, and human.
Every color or icon should help the user understand, not distract.

🌍 Expanding the Voice

After the first fully working version is done, I’d like to expand the tone and scope beyond Finland.

Initially, the content focuses on herbs commonly found in Finland and nearby areas.
But the long-term plan is to adapt the text and categories to work across the Nordics, and maybe later even internationally.

That means:

Translating scientific names and adjusting examples for other climates.
Writing neutral but regionally flexible safety and usage notes.
Possibly adding a “Region filter” later (Nordic, European, Global).

I want the Herb App to grow like the plants it describes — starting from local soil, then branching outward naturally.
