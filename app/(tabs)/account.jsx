import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function Account() {
  const [username, setUsername] = useState("Username");
  const [autoplayNext, setAutoplayNext] = useState(true);
  const [autoplayPreview, setAutoplayPreview] = useState(false);

  const saveChanges = () => {
    Alert.alert("Saved", "Your account settings have been updated.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="person-circle-outline" size={100} color="#00ff22ff" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your name"
          placeholderTextColor="#999"
        />
      </View>

      {/* Playback Settings */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Playback Settings</Text>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Autoplay Next Episode</Text>
          <Switch
            value={autoplayNext}
            onValueChange={setAutoplayNext}
            trackColor={{ false: "#444", true: "#E50914" }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Autoplay Previews</Text>
          <Switch
            value={autoplayPreview}
            onValueChange={setAutoplayPreview}
            trackColor={{ false: "#444", true: "#E50914" }}
            thumbColor="#fff"
          />
        </View>
      </View>


      <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 20,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  iconButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    marginTop: 12,
    width: "80%",
    borderBottomWidth: 1,
    borderBottomColor: "#E50914",
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 6,
  },
  settingsSection: {
    backgroundColor: "#111",
    borderRadius: 10,
    padding: 16,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  settingLabel: {
    color: "#fff",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#E50914",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
