export type Lang = "fi" | "en";
export type L<T = string> = { fi: T; en: T };
export type HerbSource = "wild" | "store";
export type Toxicity = "safe" | "caution" | "poison"; // <- NEW

export type Recipe = {
  title: L;
  steps: L<string[]>;
};

export type Herb = {
  id: string;
  source: HerbSource;
  commonName: L;
  latinName: string;
  edibleParts?: L<string[]>;
  medicinalNotes: L;
  lookalikes?: L<string[]>;
  caution?: L;
  uses?: L<string[]>;
  recipes?: Recipe[];
  images?: string[];
  toxicity?: Toxicity; // <- NEW (default “safe” if omitted)
};
export type HerbDB = Record<string, Herb>;
