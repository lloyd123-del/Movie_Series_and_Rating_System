import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const posters = [
  require("../../assets/images/DexterResurrection.jpeg"),
  require("../../assets/images/peacemaker.jpeg"),
  require("../../assets/images/better.jpeg"),
  require("../../assets/images/june.jpeg"),
  require("../../assets/images/superman.jpeg"),
  require("../../assets/images/gachi.jpeg"),
  require("../../assets/images/fantastic.jpeg"),
  require("../../assets/images/breaking.jpeg"),
  require("../../assets/images/better.jpeg"),
  require("../../assets/images/dexter1.jpeg"),
  require("../../assets/images/dexter2.jpeg"),
  require("../../assets/images/peacemaker.jpeg"),
  require("../../assets/images/june.jpeg"),
  require("../../assets/images/superman.jpeg"),
  require("../../assets/images/gachi.jpeg"),
];

const SearchBar = ({ onClose }) => {
  return (
    <SafeAreaView style={styles.overlay}>
      {/* ✅ Header with back + input */}
      <View style={styles.searchHeader}>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TextInput
          placeholder="What's your poison?"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <Ionicons name="search-outline" size={24} color="#fff" />
      </View>

      {/* ✅ Grid of posters */}
      <ScrollView contentContainerStyle={styles.grid}>
        {posters.map((img, index) => (
          <Image key={index} source={img} style={styles.gridPoster} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  // ✅ Fill the entire screen properly
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#0D0D0D",
    zIndex: 9999,
  },
  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginTop: 30, // extra space so it's not stuck at the very top
  },
  input: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    marginHorizontal: 10,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "#fff",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
    paddingBottom: 40, // avoids content being cut off at bottom
  },
  gridPoster: {
    width: (width - 40) / 3, // 3 columns
    height: (width - 40) / 2, // tall posters
    borderRadius: 8,
    marginBottom: 12,
  },
});
