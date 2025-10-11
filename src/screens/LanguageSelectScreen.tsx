import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Lang } from "@/types";
import { theme } from "@/theme";

export default function LanguageSelectScreen({ onSelect }: { onSelect: (l: Lang) => void }) {
  async function choose(l: Lang) {
    await AsyncStorage.setItem("lang", l);
    onSelect(l);
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.bg, alignItems: "center", justifyContent: "center", padding: 24 }}>
      <Text style={{ color: theme.colors.text, fontSize: 22, fontWeight: "700", marginBottom: 18 }}>
        Yrttitunnistin / Herb Recognizer
      </Text>
      <Text style={{ color: theme.colors.subtext, marginBottom: 24 }}>
        Choose your language / Valitse kieli
      </Text>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <LangButton label="🇫🇮 Suomi" onPress={() => choose("fi")} />
        <LangButton label="🇬🇧 English" onPress={() => choose("en")} />
      </View>
    </View>
  );
}

function LangButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#1e293b",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#334155",
        marginHorizontal: 6
      }}
    >
      <Text style={{ color: "#e2e8f0", fontWeight: "600" }}>{label}</Text>
    </TouchableOpacity>
  );
}
