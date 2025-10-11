export type Lang = "fi" | "en";
export type L<T = string> = { fi: T; en: T };
export type HerbSource = "wild" | "store";

export type Recipe = {
  title: L;
  steps: L<string[]>;
};

export type Herb = {
  id: string;                 // e.g. "stinging_nettle"
  source: HerbSource;         // "wild" | "store"
  commonName: L;              // { fi, en }
  latinName: string;
  edibleParts?: L<string[]>;
  medicinalNotes: L;
  lookalikes?: L<string[]>;
  caution?: L;
  uses?: L<string[]>;
  recipes?: Recipe[];
  images?: string[];          // optional URLs
};

// If you want strong typing on the DB map:
export type HerbDB = Record<string, Herb>;
