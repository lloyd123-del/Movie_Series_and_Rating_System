import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const home = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.contentBox}>
        {/* ✅ Hero Banner */}
        <View style={styles.heroContainer}>
          <Image
            source={require("../../assets/images/dexter.jpeg")}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.watchlistButton}>
            <Text style={styles.watchlistText}>+ Add to Watchlist</Text>
          </TouchableOpacity>
        </View>

        {/* ✅ Trending Now */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Now</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {[
              require("../../assets/images/dexter1.jpeg"),
              require("../../assets/images/gachi.jpeg"),
              require("../../assets/images/peacemaker.jpeg"),
            ].map((img, index) => (
              <Image key={index} source={img} style={styles.poster} />
            ))}
          </ScrollView>
        </View>

        {/* ✅ Movies you liked */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Movies you liked</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {[
              require("../../assets/images/june.jpeg"),
              require("../../assets/images/superman.jpeg"),
              require("../../assets/images/fantastic.jpeg"),
            ].map((img, index) => (
              <Image key={index} source={img} style={styles.poster} />
            ))}
          </ScrollView>
        </View>

        {/* ✅ Recommended for you */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended for you</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {[
              require("../../assets/images/breaking.jpeg"),
              require("../../assets/images/better.jpeg"),
              require("../../assets/images/dexter2.jpeg"),
            ].map((img, index) => (
              <Image key={index} source={img} style={styles.poster} />
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
  },
  contentBox: {
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  heroContainer: {
    position: "relative",
    alignItems: "center",
    marginBottom: 20,
  },
  heroImage: {
    width: width - 40,
    height: 200,
    borderRadius: 8,
  },
  watchlistButton: {
    position: "absolute",
    bottom: 15,
    left: 20,
    backgroundColor: "#E50914",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  watchlistText: {
    color: "#fff",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left", // ✅ Left aligned
  },
  scrollContent: {
    paddingHorizontal: 5,
  },
  poster: {
    width: width * 0.35, // ✅ responsive size (fits phone & pc)
    height: width * 0.5,
    borderRadius: 6,
    marginRight: 10,
  },
});

export default home;
