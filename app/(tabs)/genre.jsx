import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

const { width } = Dimensions.get("window");

const posters = [
  require("../../assets/images/dexter.jpeg"),
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

const Genre = ({ onClose }) => {
  return (
    <SafeAreaView style={styles.overlay}>
      <View>
        <Text style={styles.GenreTitle}>Drama</Text>
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

export default Genre;



const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#0D0D0D",
    zIndex: 9999,
  },
  GenreTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffff',
    textAlign: 'left',
    marginLeft:'5%'
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

