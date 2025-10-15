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

export default function Liked() {
  const [likedList, setLikedList] = useState([
    {
      id: 1,
      title: "Breaking Bad",
      image: "https://wallpapers.com/images/hd/breaking-bad-black-white-poster-gz04d5vpfd2qxusa.jpg",
    },
    {
      id: 2,
      title: "Dexter",
      image: "https://m.media-amazon.com/images/I/91mjqj3gwCL._UF894,1000_QL80_.jpg",
    },
    {
      id: 3,
      title: "Brooklyn 99",
      image: "https://www.nbcstore.com/cdn/shop/files/brooklyn-99-mobile-min.jpg?v=1689006286",
    },
  ]);

  const removeItem = (id) => {
    Alert.alert("Remove", "Remove this from your liked list?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: () => setLikedList((prev) => prev.filter((item) => item.id !== id)),
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
        <Text style={styles.sectionTitle}>Liked</Text>

        <FlatList
          data={likedList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
        />

        {likedList.length === 0 && (
          <Text style={styles.emptyText}>You haven’t liked any shows yet.</Text>
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
