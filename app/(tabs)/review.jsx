import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from '../context/AuthContext';

// ⚠️ CHANGE THIS TO YOUR BACKEND IP ADDRESS
const API_URL = 'http://10.0.2.2:3000/api';

const ShowDetails = () => {
  const { user } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();
  const movieId = params.movieId;

  const [movie, setMovie] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [editingReviewId, setEditingReviewId] = useState(null);

  useEffect(() => {
    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/movies/${movieId}`);
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error('Error fetching movie:', error);
      Alert.alert('Error', 'Failed to load movie details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStarPress = (starRating) => {
    setRating(starRating);
  };

  const handleSubmitReview = async () => {
    if (!review.trim()) {
      Alert.alert('Error', 'Please write a review');
      return;
    }

    if (rating === 0) {
      Alert.alert('Error', 'Please select a star rating');
      return;
    }

    try {
      if (editingReviewId) {
        // UPDATE existing review
        const response = await fetch(
          `${API_URL}/movies/${movieId}/reviews/${editingReviewId}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: user._id,
              rating,
              comment: review,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          Alert.alert('Success', 'Review updated successfully');
          setMovie(data.movie);
          setReview("");
          setRating(0);
          setEditingReviewId(null);
        } else {
          Alert.alert('Error', data.message);
        }
      } else {
        // CREATE new review
        const response = await fetch(`${API_URL}/movies/${movieId}/reviews`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user._id,
            rating,
            comment: review,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          Alert.alert('Success', 'Review added successfully');
          setMovie(data.movie);
          setReview("");
          setRating(0);
        } else {
          Alert.alert('Error', data.message);
        }
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      Alert.alert('Error', 'Failed to submit review');
    }
  };

  const handleEditReview = (reviewToEdit) => {
    setReview(reviewToEdit.comment);
    setRating(reviewToEdit.rating);
    setEditingReviewId(reviewToEdit._id);
  };

  const handleDeleteReview = async (reviewId) => {
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(
                `${API_URL}/movies/${movieId}/reviews/${reviewId}`,
                {
                  method: 'DELETE',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ userId: user._id }),
                }
              );

              const data = await response.json();

              if (response.ok) {
                Alert.alert('Success', 'Review deleted successfully');
                setMovie(data.movie);
              } else {
                Alert.alert('Error', data.message);
              }
            } catch (error) {
              console.error('Error deleting review:', error);
              Alert.alert('Error', 'Failed to delete review');
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Movie not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: movie.posterUrl || 'https://m.media-amazon.com/images/M/MV5BYTViYTE3ZGQtNDBlMC00ZTAyLTkyODMtZGRiZDg0MjA2YThkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' }}
        style={styles.poster}
        resizeMode="cover"
      />

      <TouchableOpacity style={styles.watchlistButton}>
        <Text style={styles.watchlistText}>+ Add to Watchlist</Text>
      </TouchableOpacity>

      <Text style={styles.movieTitle}>{movie.title}</Text>

      <Text style={styles.description}>
        {movie.description || "No description available."}
      </Text>

      <View style={styles.infoSection}>
        <Text style={styles.infoText}>
          Release Year: <Text style={styles.bold}>{movie.releaseYear}</Text>
        </Text>
        <Text style={styles.infoText}>
          Genre: <Text style={styles.bold}>{movie.genre.join(", ")}</Text>
        </Text>
        {movie.director && (
          <Text style={styles.infoText}>
            Director: <Text style={styles.link}>{movie.director}</Text>
          </Text>
        )}
        {movie.duration && (
          <Text style={styles.infoText}>
            Duration: <Text style={styles.bold}>{movie.duration}</Text>
          </Text>
        )}
        <Text style={styles.infoText}>
          Average Rating: <Text style={styles.bold}>{movie.averageRating.toFixed(1)}/5</Text>
        </Text>
      </View>

      <Text style={styles.reviewHeader}>
        {editingReviewId ? 'Edit Your Review:' : 'Write a Review:'}
      </Text>

      <View style={styles.reviewInputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Write a review..."
          placeholderTextColor="#aaa"
          value={review}
          onChangeText={setReview}
          multiline
        />
        <View style={styles.reviewflex}>
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
                <Ionicons
                  name={star <= rating ? "star" : "star-outline"}
                  size={25}
                  color="#FFD700"
                />
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity 
            style={styles.commentButton}
            onPress={handleSubmitReview}
          >
            <Text style={styles.commentText}>
              {editingReviewId ? 'Update' : 'Comment'}
            </Text>
          </TouchableOpacity>
        </View>
        {editingReviewId && (
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => {
              setEditingReviewId(null);
              setReview("");
              setRating(0);
            }}
          >
            <Text style={styles.cancelText}>Cancel Edit</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.reviewHeader}>Reviews ({movie.reviews.length}):</Text>

      {movie.reviews.length === 0 ? (
        <Text style={styles.noReviewsText}>
          No reviews yet. Be the first to review!
        </Text>
      ) : (
        movie.reviews.map((userReview) => {
          const isUserReview = userReview.user._id === user._id;
          return (
            <View key={userReview._id} style={styles.reviewCard}>
              <View style={styles.reviewHeaderRow}>
                <Ionicons
                  name="person-circle"
                  size={28}
                  color={isUserReview ? "#E50914" : "#00FF7F"}
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.reviewerName}>
                  {userReview.user.username}
                  {isUserReview && <Text style={styles.youBadge}> (You)</Text>}
                </Text>
                {isUserReview && (
                  <View style={styles.reviewActions}>
                    <TouchableOpacity
                      onPress={() => handleEditReview(userReview)}
                      style={styles.actionIcon}
                    >
                      <Ionicons name="pencil" size={20} color="#E50914" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDeleteReview(userReview._id)}
                      style={styles.actionIcon}
                    >
                      <Ionicons name="trash" size={20} color="#E50914" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <View style={styles.starRow}>
                {[...Array(5)].map((_, i) => (
                  <Ionicons
                    key={i}
                    name={i < userReview.rating ? "star" : "star-outline"}
                    size={16}
                    color="#FFD700"
                  />
                ))}
              </View>
              <Text style={styles.reviewBody}>{userReview.comment}</Text>
              <Text style={styles.reviewDate}>
                {new Date(userReview.createdAt).toLocaleDateString()}
              </Text>
            </View>
          );
        })
      )}
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
  loadingContainer: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
  },
  poster: {
    width: 167,
    height: 247,
    borderRadius: 10,
    marginLeft: "30%",
  },
  watchlistButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 15,
    alignItems: "center",
    width: 140,
    marginLeft: "35%",
  },
  watchlistText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  movieTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
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
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  reviewInputWrapper: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#1A1A1A",
    color: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 10,
    minHeight: 60,
  },
  reviewflex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  starRow: {
    flexDirection: "row",
  },
  commentButton: {
    backgroundColor: "#E50914",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  commentText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#555",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: 'center',
  },
  cancelText: {
    color: "#fff",
    fontWeight: "bold",
  },
  noReviewsText: {
    color: "#aaa",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 20,
    fontStyle: "italic",
  },
  reviewCard: {
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  reviewHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewerName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  youBadge: {
    color: "#E50914",
    fontSize: 14,
  },
  reviewActions: {
    flexDirection: "row",
  },
  actionIcon: {
    marginLeft: 15,
  },
  reviewBody: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  reviewDate: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 8,
  },
});
