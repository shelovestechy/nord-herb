import { View, Text, Image } from "react-native";
import { HERB_DB } from "@/data/herb-db";
import type { Lang } from "@/types";

export function ResultCard({ p, lang }: { p: { herbId: string; confidence: number }, lang: Lang }) {
  const herb = HERB_DB[p.herbId];
  const L = (v?: any) => (v ? v[lang] : undefined);
  const img = herb?.images?.[0];

  return (
    <View style={{ backgroundColor: "#0b1220", borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: "#1f2a44" }}>
      {img ? <Image source={{ uri: img }} style={{ width: "100%", height: 160, borderRadius: 12, marginBottom: 8 }} /> : null}
      <Text style={{ color: "#e2e8f0", fontSize: 18, fontWeight: "600" }}>
        {L(herb.commonName)} <Text style={{ color: "#94a3b8" }}>({herb.latinName})</Text>
      </Text>
      <Text style={{ color: "#93c5fd", marginTop: 4 }}>
        {(lang === "fi" ? "Varmuus" : "Confidence") + `: ${(p.confidence * 100).toFixed(0)}%`}
      </Text>
      {herb.edibleParts?.[lang]?.length ? (
        <Text style={{ color: "#e5e7eb", marginTop: 6 }}>
          {(lang === "fi" ? "Syötävät osat" : "Edible parts") + ": " + L(herb.edibleParts).join(", ")}
        </Text>
      ) : null}
      <Text style={{ color: "#e5e7eb", marginTop: 6 }}>{L(herb.medicinalNotes)}</Text>
      {herb.lookalikes?.[lang]?.length ? (
        <Text style={{ color: "#fbbf24", marginTop: 6 }}>
          {(lang === "fi" ? "Samannäköiset" : "Lookalikes") + ": " + L(herb.lookalikes).join(", ")}
        </Text>
      ) : null}
      {herb.caution ? <Text style={{ color: "#f87171", marginTop: 6 }}>⚠ {L(herb.caution)}</Text> : null}
      {herb.uses?.[lang]?.length ? (
        <Text style={{ color: "#60a5fa", marginTop: 10, fontWeight: "600" }}>
          {(lang === "fi" ? "Käyttö" : "Uses") + ": " + L(herb.uses).join(", ")}
        </Text>
      ) : null}
      {herb.recipes?.length ? (
        <View style={{ marginTop: 8 }}>
          <Text style={{ color: "#a7f3d0", fontWeight: "600" }}>
            {lang === "fi" ? "Reseptit / Valmisteet" : "Recipes / Remedies"}
          </Text>
          {herb.recipes.map((r, i) => (
            <View key={i} style={{ marginTop: 6 }}>
              <Text style={{ color: "#e2e8f0", fontWeight: "600" }}>{L(r.title)}</Text>
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
