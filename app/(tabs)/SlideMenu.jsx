import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function SlideMenu({ onClose }) {
  const menuPosition = useRef(new Animated.Value(-width)).current;

  const genres = [
    "Drama",
    "Comedies",
    "Action",
    "Anime",
    "Black Stories",
    "Children & Family",
    "Crime",
    "Documentaries",
  ];

  useEffect(() => {
    Animated.timing(menuPosition, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleClose = () => {
    Animated.timing(menuPosition, {
      toValue: -width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onClose && onClose());
  };
  const router = useRouter();

  const Handlegenre = () => {
    router.replace("/genre");
  }

  return (
    <>
      {/* Overlay */}
      <TouchableOpacity
        style={styles.overlay}
        onPress={handleClose}
        activeOpacity={1}
      />

      {/* Slide-in Menu */}
      <Animated.View
        style={[styles.panel, { transform: [{ translateX: menuPosition }] }]}
      >
        <SafeAreaView style={styles.panelContent}>
          {/* Header with Back */}
          <View style={styles.panelHeader}>
            <TouchableOpacity onPress={handleClose} style={{ padding: 4 }}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Genres</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Genre List */}
          <View style={styles.menuList}>
            {genres.map((genre, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={Handlegenre}
              >
                <Text style={styles.menuText}>{genre}</Text>
                <Ionicons name="chevron-forward" size={20} color="#fff" />
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999,
  },
  panel: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: width * 0.8,
    backgroundColor: "#0D0D0D",
    zIndex: 1000,
    elevation: 5,
    left: 0,
    marginTop: 20,
  },
  panelContent: { flex: 1 },
  panelHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#111",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E50914",
  },
  menuList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  menuText: {
    fontSize: 16,
    color: "#fff",
  },
});
