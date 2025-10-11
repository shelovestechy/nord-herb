import { Modal, View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Lang } from "@/types";
import { theme } from "@/theme";

export function InfoMenu({
  visible, onClose, lang, setLang,
}: { visible: boolean; onClose: () => void; lang: Lang; setLang: (l: Lang) => void }) {

  async function changeLang(l: Lang) {
    await AsyncStorage.setItem("lang", l);
    setLang(l);
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "flex-end" }}>
        <View style={{ backgroundColor: theme.colors.card, padding: 18, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
          <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: "700", marginBottom: 10 }}>
            {lang === "fi" ? "Tietoa & Asetukset" : "Info & Settings"}
          </Text>

          {/* Language */}
          <Text style={{ color: theme.colors.subtext, marginBottom: 8 }}>
            {lang === "fi" ? "Kieli" : "Language"}
          </Text>
          <View style={{ flexDirection: "row", marginBottom: 16 }}>
            <Chip label="FI" active={lang === "fi"} onPress={() => changeLang("fi")} />
            <View style={{ width: 8 }} />
            <Chip label="EN" active={lang === "en"} onPress={() => changeLang("en")} />
          </View>

          {/* Guide text */}
          <Text style={{ color: theme.colors.subtext, marginBottom: 8 }}>
            {lang === "fi" ? "Opas & turvallisuus" : "Guide & safety"}
          </Text>
          <Text style={{ color: theme.colors.text, marginBottom: 16 }}>
            {lang === "fi"
              ? "Varmista tunnistus usealla tuntomerkillä. Noudata jokamiehenoikeuksia."
              : "Confirm identification with multiple features. Follow local foraging laws."}
          </Text>

          <TouchableOpacity
            onPress={onClose}
            style={{ alignSelf: "flex-end", backgroundColor: theme.colors.button, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: "#334155" }}
          >
            <Text style={{ color: theme.colors.text, fontWeight: "600" }}>
              {lang === "fi" ? "Sulje" : "Close"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function Chip({ label, active, onPress }:{ label: string; active?: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: active ? theme.colors.accent : "#1e293b",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "#334155"
      }}
    >
      <Text style={{ color: active ? "#0b1220" : "#e2e8f0", fontWeight: "700" }}>{label}</Text>
    </TouchableOpacity>
  );
}
