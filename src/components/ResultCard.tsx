import { View, Text, Image } from "react-native";
import { HERB_DB } from "@/data/herb-db";
import type { Lang } from "@/types";
import { theme } from "@/theme";

export function ResultCard({ p, lang }: { p: { herbId: string; confidence: number }, lang: Lang }) {
  const herb = HERB_DB[p.herbId];
  const L = (v?: any) => (v ? v[lang] : undefined);
  const img = herb?.images?.[0];

  const tox = herb.toxicity ?? "safe";
  const toxLabel =
    tox === "poison"
      ? (lang === "fi" ? "MYRKKY" : "POISONOUS")
      : tox === "caution"
      ? (lang === "fi" ? "VARO" : "CAUTION")
      : (lang === "fi" ? "TURVALLINEN" : "SAFE");

  const toxColor =
    tox === "poison" ? theme.colors.poisonBadge :
    tox === "caution" ? theme.colors.cautionBadge :
    theme.colors.accent;

  return (
    <View style={{ backgroundColor: "#0b1220", borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: "#1f2a44" }}>
      {/* Toxicity badge */}
      <View style={{ alignSelf: "flex-start", backgroundColor: toxColor, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4, marginBottom: 8 }}>
        <Text style={{ color: tox === "poison" ? "#0b1220" : "#0b1220", fontWeight: "800" }}>{toxLabel}</Text>
      </View>

      {img ? <Image source={{ uri: img }} style={{ width: "100%", height: 160, borderRadius: 12, marginBottom: 8 }} /> : null}

      <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: "600" }}>
        {L(herb.commonName)} <Text style={{ color: "#94a3b8" }}>({herb.latinName})</Text>
      </Text>
      <Text style={{ color: "#93c5fd", marginTop: 4 }}>
        {(lang === "fi" ? "Varmuus" : "Confidence") + `: ${(p.confidence * 100).toFixed(0)}%`}
      </Text>

      {herb.edibleParts?.[lang]?.length && tox !== "poison" ? (
        <Text style={{ color: "#e5e7eb", marginTop: 6 }}>
          {(lang === "fi" ? "Syötävät osat" : "Edible parts") + ": " + L(herb.edibleParts).join(", ")}
        </Text>
      ) : null}

      {/* Main description */}
      <Text style={{ color: "#e5e7eb", marginTop: 6 }}>{L(herb.medicinalNotes)}</Text>

      {/* Lookalikes */}
      {herb.lookalikes?.[lang]?.length ? (
        <Text style={{ color: "#fbbf24", marginTop: 6 }}>
          {(lang === "fi" ? "Samannäköiset" : "Lookalikes") + ": " + L(herb.lookalikes).join(", ")}
        </Text>
      ) : null}

      {/* Red toxic warning */}
      {tox === "poison" ? (
        <Text style={{ color: theme.colors.dangerText, marginTop: 8, fontWeight: "800" }}>
          {lang === "fi"
            ? "⚠ ÄLÄ KOSKE / ÄLÄ SYÖ. Pidä lapset ja lemmikit loitolla."
            : "⚠ DO NOT TOUCH / DO NOT EAT. Keep children and pets away."}
        </Text>
      ) : null}

      {/* Caution line (still shows for safe/caution if defined) */}
      {herb.caution ? <Text style={{ color: theme.colors.danger, marginTop: 6 }}>⚠ {L(herb.caution)}</Text> : null}

      {/* Uses only if not poisonous */}
      {tox !== "poison" && herb.uses?.[lang]?.length ? (
        <Text style={{ color: "#60a5fa", marginTop: 10, fontWeight: "600" }}>
          {(lang === "fi" ? "Käyttö" : "Uses") + ": " + L(herb.uses).join(", ")}
        </Text>
      ) : null}

      {/* Recipes only if not poisonous */}
      {tox !== "poison" && herb.recipes?.length ? (
        <View style={{ marginTop: 8 }}>
          <Text style={{ color: "#a7f3d0", fontWeight: "600" }}>
            {lang === "fi" ? "Reseptit / Valmisteet" : "Recipes / Remedies"}
          </Text>
          {herb.recipes.map((r, i) => (
            <View key={i} style={{ marginTop: 6 }}>
              <Text style={{ color: theme.colors.text, fontWeight: "600" }}>{L(r.title)}</Text>
              {L(r.steps).map((s: string, k: number) => (
                <Text key={k} style={{ color: "#cbd5e1" }}>• {s}</Text>
              ))}
            </View>
          ))}
        </View>
      ) : null}

      <Text style={{ color: "#94a3b8", marginTop: 8, fontStyle: "italic" }}>
        {herb.source === "wild"
          ? (lang === "fi" ? "Luonnosta kerättävä – noudata lakia ja varmista tunnistus." : "Wild foraging – follow laws and confirm ID.")
          : (lang === "fi" ? "Kauppayrtti – osta elintarvikelaatuisena." : "Store herb – buy food-grade.")}
      </Text>
    </View>
  );
}
