import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get("window");

// ⚠️ CHANGE THIS TO YOUR BACKEND IP ADDRESS
const API_URL = 'http://10.0.2.2:3000/api';

const home = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // IMPORTANT: Check authentication FIRST
  useEffect(() => {
    console.log('Auth Loading:', authLoading);
    console.log('Is Authenticated:', isAuthenticated);
    console.log('User:', user);

    if (!authLoading && !isAuthenticated) {
      console.log('Not authenticated, redirecting to login...');
      router.replace('/login');
    }
  }, [isAuthenticated, authLoading]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchMovies();
    }
  }, [isAuthenticated]);

  const fetchMovies = async () => {
    try {
      const response = await fetch(`${API_URL}/movies`);
      const data = await response.json();
      console.log('Fetched movies:', data.length);
      setMovies(data);
      
      if (data.length === 0) {
        Alert.alert(
          'No Movies Found',
          'Please add movies to the database using Postman. Check POSTMAN_GUIDE.md for instructions.'
        );
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      Alert.alert('Error', 'Failed to load movies. Make sure backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReview = (movie) => {
    router.push({
      pathname: '/review',
      params: { 
        movieId: movie._id,
        movieTitle: movie.title,
      }
    });
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E50914" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Show loading while fetching movies
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E50914" />
        <Text style={styles.loadingText}>Loading movies...</Text>
      </View>
    );
  }

  // Show message if no movies in database
  if (movies.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No Movies Available</Text>
        <Text style={styles.emptyText}>
          Add movies to your database using Postman.{'\n'}
          Check POSTMAN_GUIDE.md for instructions.
        </Text>
      </View>
    );
  }

  // Separate movies into categories
  const trendingMovies = movies.slice(0, Math.min(3, movies.length));
  const likedMovies = movies.slice(3, Math.min(6, movies.length));
  const recommendedMovies = movies.slice(6, Math.min(9, movies.length));
  const heroMovie = movies[0];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.contentBox}>
        {/* ✅ Hero Banner */}
        {heroMovie && (
          <View style={styles.heroContainer}>
            <TouchableOpacity onPress={() => handleReview(heroMovie)}>
              <Image
                source={{ uri: heroMovie.posterUrl }}
                style={styles.heroImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <View style={styles.heroOverlay}>
              <Text style={styles.heroTitle}>{heroMovie.title}</Text>
              <TouchableOpacity style={styles.watchlistButton}>
                <Text style={styles.watchlistText}>+ Add to Watchlist</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* ✅ Trending Now Section */}
        {trendingMovies.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trending Now</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {trendingMovies.map((movie) => (
                <TouchableOpacity 
                  key={movie._id} 
                  onPress={() => handleReview(movie)}
                >
                  <Image 
                    source={{ uri: movie.posterUrl }}
                    style={styles.poster} 
                  />
                  <Text style={styles.posterTitle} numberOfLines={1}>
                    {movie.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* ✅ Movies you liked Section */}
        {likedMovies.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Movies you liked</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {likedMovies.map((movie) => (
                <TouchableOpacity 
                  key={movie._id} 
                  onPress={() => handleReview(movie)}
                >
                  <Image 
                    source={{ uri: movie.posterUrl }}
                    style={styles.poster} 
                  />
                  <Text style={styles.posterTitle} numberOfLines={1}>
                    {movie.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* ✅ Recommended for you Section */}
        {recommendedMovies.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recommended for you</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {recommendedMovies.map((movie) => (
                <TouchableOpacity 
                  key={movie._id} 
                  onPress={() => handleReview(movie)}
                >
                  <Image 
                    source={{ uri: movie.posterUrl }}
                    style={styles.poster} 
                  />
                  <Text style={styles.posterTitle} numberOfLines={1}>
                    {movie.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 10,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emptyText: {
    color: '#A0A0A0',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
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
  heroOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  watchlistButton: {
    backgroundColor: "#E50914",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  watchlistText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
  },
  scrollContent: {
    paddingHorizontal: 5,
  },
  poster: {
    width: width * 0.35,
    height: width * 0.5,
    borderRadius: 6,
    marginRight: 10,
    backgroundColor: '#333',
  },
  posterTitle: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
    width: width * 0.35,
  },
});

export default home;
