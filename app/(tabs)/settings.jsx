import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
  const router = useRouter();

  const handleExit = () => {
    router.replace("/"); // back to login page
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 30 }}>This is the Settings Screen</Text>

      <TouchableOpacity
        onPress={handleExit}
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#E50914",
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 10,
        }}
      >
        <Ionicons name="exit-outline" size={24} color="#fff" style={{ marginRight: 8 }} />
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>Exit</Text>
      </TouchableOpacity>
    </View>
  );
}
