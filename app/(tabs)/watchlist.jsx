import { useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([
    {
      id: 1,
      title: "Doctor Who",
      image: "https://cdn.europosters.eu/image/1300/28809.jpg",
    },
    {
      id: 2,
      title: "Supernatural",
      image: "https://wallpapers.com/images/hd/supernatural-art-vslqtiu6nfwmst0h.jpg",
    },
    {
      id: 3,
      title: "Beef",
      image: "https://pocculture.com/wp-content/uploads/2023/03/EN-US_Beef_S1_Main_Akiko_Vertical_27x40_RGB_PRE-min-e1678946648446.jpg",
    },
    {
      id: 4,
      title: "Ted",
      image: "https://images.justwatch.com/backdrop/316437956/s640/ted",
    },
    {
      id: 5,
      title: "Severance",
      image: "https://img.newsroom.cj.net/wp-content/uploads/2022/09/Severance-1.png",
    },
    {
      id: 6,
      title: "LOST",
      image: "https://i.pinimg.com/736x/29/26/44/292644dd16d8a032364cc9bf9f1e864d.jpg",
    },
    {
      id: 7,
      title: "House of Dragons",
      image: "https://i2-prod.dailyrecord.co.uk/article27775037.ece/ALTERNATES/s1200b/0_house-of-the-dragons.png",
    },
    {
      id: 8,
      title: "Sandman",
      image: "https://rumblevfx.com/wp-content/uploads/2022/07/the_sandman_netflx_poster_001a.jpg",
    },

  ]);

  const removeItem = (id) => {
    Alert.alert("Remove", "Remove this from your watchlist?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: () => setWatchlist((prev) => prev.filter((item) => item.id !== id)),
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.left}>
        <Image
          source={typeof item.image === "string" ? { uri: item.image } : item.image}
          style={styles.poster}
          resizeMode="cover"
        />
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
      </View>
      <TouchableOpacity onPress={() => removeItem(item.id)}>
        <Icon name="trash-2" size={22} color="#e50914" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>WatchList</Text>

        <FlatList
          data={watchlist}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
        />

        {watchlist.length === 0 && (
          <Text style={styles.emptyText}>Your watchlist is empty.</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  section: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000000ff",
    marginBottom: 10,
    borderRadius: 10,
    padding: 8,
    justifyContent: "space-between",
    elevation: 3,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  poster: {
    width: 150,
    height: 90,
    borderRadius: 8,
    backgroundColor: "#333",
  },
  title: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
    flexShrink: 1,
  },
  emptyText: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
  },
});
