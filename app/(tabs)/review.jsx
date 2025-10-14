import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const ShowDetails = () => {
  const [review, setReview] = useState("");

  return (
    <ScrollView style={styles.container}>

      <Image
        source={require("../../assets/images/DexterResurrection.jpeg")}
        style={styles.poster}
        resizeMode="cover"
      />

   
      <TouchableOpacity style={styles.watchlistButton}>
        <Text style={styles.watchlistText}>+ Add to Watchlist</Text>
      </TouchableOpacity>

   
      <Text style={styles.description}>
        Dexter Morgan awakens from a coma and sets out for New York City,
        determined to find Harrison and make things right.
      </Text>

     
      <View style={styles.infoSection}>
        <Text style={styles.infoText}>No. of episodes: <Text style={styles.bold}>10</Text></Text>
        <Text style={styles.infoText}>No. of seasons: <Text style={styles.bold}>1</Text></Text>
        <Text style={styles.infoText}>
          Program creator: <Text style={styles.link}>Clyde Phillips</Text>
        </Text>
      </View>

      
      <Text style={styles.reviewHeader}>Reviews:</Text>

     
      <View style={styles.reviewInputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Write a review..."
          placeholderTextColor="#aaa"
          value={review}
          onChangeText={setReview}
        />
        <View style={styles.reviewflex}>
            <View style={styles.starRow}>
            {[...Array(5)].map((_, i) => (
            <Ionicons key={i} name="star" size={25} color="#FFD700" />
            ))}
            </View>
            <TouchableOpacity style={styles.commentButton}>
            <Text style={styles.commentText}>Comment</Text>
            </TouchableOpacity>
        </View>
      </View>

   
      <View style={styles.reviewCard}>
        <View style={styles.reviewHeaderRow}>
          <Ionicons
            name="person-circle"
            size={28}
            color="#00FF7F"
            style={{ marginRight: 6 }}
          />
          <Text style={styles.reviewerName}>Mohammed Hoss</Text>
        </View>
        <View style={styles.starRow}>
          {[...Array(5)].map((_, i) => (
            <Ionicons key={i} name="star" size={16} color="#FFD700" />
          ))}
        </View>
        <Text style={styles.reviewTitle}>
          Dexter Returns Stronger Than Ever! A Must Watch Resurrection!
        </Text>
        <Text style={styles.reviewBody}>
          As a longtime fan of Dexter and Michael C. Hall, I'm genuinely
          impressed by Dexter: Resurrection. The show brilliantly revives the
          dark, gripping atmosphere that made the original series addictive,
          while introducing a fresh and compelling storyline. ...
        </Text>
      </View>
    </ScrollView>
  );
};

export default ShowDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    padding: 15,
  },
  poster: {
    width: 167,
    height: 247,
    borderRadius: 10,
    marginLeft: '30%'
  },
  watchlistButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 15,
    alignItems: "center",
    width: 140,
    marginLeft: '35%'
  },
  watchlistText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  description: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoText: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 6,
  },
  bold: {
    fontWeight: "bold",
  },
  link: {
    color: "#1E90FF",
    textDecorationLine: "underline",
  },
  reviewHeader: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reviewInputWrapper: {
    backgroundColor: "#1A1A1A",
    padding: 10,
    borderRadius: 12,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#2A2A2A",
    color: "#fff",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
  },
  starRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  commentButton: {
    backgroundColor: "red",
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
    width: 130,
    marginLeft: '29%'
  },
  reviewflex: {
    flexDirection: 'row'
  },
  commentText: {
    color: "#fff",
    fontWeight: "bold",
  },
  reviewCard: {
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    padding: 12,
    marginBottom: 100,
  },
  reviewHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  reviewerName: {
    color: "#00FF7F",
    fontWeight: "bold",
    fontSize: 14,
  },
  reviewTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
  },
  reviewBody: {
    color: "#ccc",
    fontSize: 13,
    lineHeight: 18,
  },
});
