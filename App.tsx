import { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { classifyImageAsync } from "@/ml/stub-classifier";
import { ResultCard } from "@/components/ResultCard";
import LanguageSelectScreen from "@/screens/LanguageSelectScreen";
import { InfoMenu } from "@/components/InfoMenu";
import { theme } from "@/theme";

export default function App() {
  const [imgUri, setImgUri] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [preds, setPreds] = useState([] as Awaited<ReturnType<typeof classifyImageAsync>>);
  const [error, setError] = useState<string | null>(null);
  const [lang, setLang] = useState<"fi" | "en" | null>(null);
  const [infoOpen, setInfoOpen] = useState(false);

  // Load saved language once on startup
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("lang");
      setLang((saved as "fi" | "en" | null) ?? null);
    })();
  }, []);

  // If language not chosen yet, show the first-launch picker
  if (!lang) {
    return <LanguageSelectScreen onSelect={(l) => setLang(l)} />;
  }

  async function pickImage() {
    setError(null);
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      setError(lang === "fi" ? "Tarvitaan lupa valokuviin." : "Permission to access photos is required.");
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8
    });
    if (!res.canceled) {
      const uri = res.assets[0].uri;
      setImgUri(uri);
      await runClassifier(uri);
    }
  }

  async function takePhoto() {
    setError(null);
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      setError(lang === "fi" ? "Tarvitaan lupa kameralle." : "Camera permission is required.");
      return;
    }
    const res = await ImagePicker.launchCameraAsync({ quality: 0.8 });
    if (!res.canceled) {
      const uri = res.assets[0].uri;
      setImgUri(uri);
      await runClassifier(uri);
    }
  }

  async function runClassifier(uri: string) {
    setBusy(true);
    try {
      const out = await classifyImageAsync(uri);
      setPreds(out);
    } catch (e: any) {
      setError(e?.message ?? (lang === "fi" ? "Luokittelu epäonnistui" : "Classification failed"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Header */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ color: theme.colors.text, fontSize: 22, fontWeight: "700", marginBottom: 8 }}>
            {lang === "fi" ? "Yrttitunnistin (MVP)" : "Herb Recognizer (MVP)"}
          </Text>
          <TouchableOpacity onPress={() => setInfoOpen(true)} style={{ padding: 8 }}>
            <Text style={{ color: theme.colors.subtext, fontWeight: "800" }}>ℹ️</Text>
          </TouchableOpacity>
        </View>

        {/* Subtitle */}
        <Text style={{ color: theme.colors.subtext, marginBottom: 12 }}>
          {lang === "fi"
            ? "Ota kuva kasvista ja saat todennäköisiä ehdotuksia. Älä koskaan syö kasvia pelkän kuvan perusteella."
            : "Snap a plant to get likely matches. Never eat a plant based on a single photo."}
        </Text>

        {/* Action buttons */}
        <View style={{ flexDirection: "row", gap: 12, marginBottom: 12 }}>
          <Button
            text={busy ? (lang === "fi" ? "Työstetään…" : "Working…") : (lang === "fi" ? "Ota kuva" : "Take Photo")}
            onPress={takePhoto}
            disabled={busy}
          />
          <Button
            text={lang === "fi" ? "Valitse galleriasta" : "Pick from Gallery"}
            onPress={pickImage}
            disabled={busy}
          />
        </View>

        {/* Selected image preview */}
        {imgUri ? (
          <Image
            source={{ uri: imgUri }}
            style={{ width: "100%", aspectRatio: 4 / 3, borderRadius: 16, borderWidth: 1, borderColor: "#1f2a44", marginBottom: 12 }}
            resizeMode="cover"
          />
        ) : null}

        {/* Errors */}
        {error ? <Text style={{ color: theme.colors.danger, marginBottom: 12 }}>⚠ {error}</Text> : null}

        {/* Predictions */}
        {preds.map((p, i) => (
          <ResultCard key={i} p={p} lang={lang as "fi" | "en"} />
        ))}

        {/* Safety blurb */}
        <View style={{ marginTop: 14 }}>
          <Text style={{ color: "#60a5fa", fontWeight: "600" }}>
            {lang === "fi" ? "Maastoturva" : "Field safety"}
          </Text>
          <Text style={{ color: "#cbd5e1", marginTop: 6 }}>
            {lang === "fi"
              ? "Älä koskaan syö kasvia yhden piirteen tai kuvan perusteella. Vahvista lehti, varsi, kukka, tuoksu, elinympäristö ja vuodenaika."
              : "Never ingest a plant from a single photo. Confirm leaf, stem, flower, scent, habitat, and season."}
          </Text>
        </View>
      </ScrollView>

      {/* Info / Settings modal (contains language switch) */}
      <InfoMenu
        visible={infoOpen}
        onClose={() => setInfoOpen(false)}
        lang={lang as "fi" | "en"}
        setLang={(l) => setLang(l)}
      />
    </SafeAreaView>
  );
}

function Button({ text, onPress, disabled }: { text: string; onPress: () => void; disabled?: boolean }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!!disabled}
      style={{
        backgroundColor: disabled ? "#1f2a44" : "#1e293b",
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#334155"
      }}
    >
      <Text style={{ color: "#e2e8f0", fontWeight: "600" }}>{text}</Text>
    </TouchableOpacity>
  );
}
