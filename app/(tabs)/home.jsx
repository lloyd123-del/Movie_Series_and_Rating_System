import AsyncStorage from '@react-native-async-storage/async-storage';
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

const { width } = Dimensions.get("window");

// ⚠️ CHANGE THIS TO YOUR BACKEND IP ADDRESS
const API_URL = 'http://10.0.2.2:3000/api';

const home = () => {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthAndFetchMovies();
  }, []);

  const checkAuthAndFetchMovies = async () => {
    try {
      // Check if user is logged in
      const userData = await AsyncStorage.getItem('user');
      
      console.log('=== HOME.JSX CHECK ===');
      console.log('User data:', userData);

      if (!userData) {
        console.log('No user data, redirecting to login');
        router.replace('/login');
        return;
      }

      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      console.log('User logged in:', parsedUser.username);

      // Fetch movies
      await fetchMovies();
    } catch (error) {
      console.error('Error in checkAuthAndFetchMovies:', error);
      router.replace('/login');
    }
  };

  const fetchMovies = async () => {
    try {
      console.log('Fetching movies from:', API_URL + '/movies');
      const response = await fetch(`${API_URL}/movies`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Movies fetched:', data.length);
      console.log('First movie:', data[0]);
      
      setMovies(data);
      
      if (data.length === 0) {
        Alert.alert(
          'No Movies Found',
          'Add movies to your database using Postman.\n\nCheck POSTMAN_GUIDE.md for instructions.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      Alert.alert(
        'Connection Error', 
        `Failed to load movies.\n\nError: ${error.message}\n\nMake sure:\n1. Backend is running\n2. API_URL is correct: ${API_URL}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReview = (movie) => {
    console.log('Navigating to review for movie:', movie.title);
    router.push({
      pathname: '/review',
      params: { 
        movieId: movie._id,
        movieTitle: movie.title,
      }
    });
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    router.replace('/login');
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E50914" />
        <Text style={styles.loadingText}>Loading movies...</Text>
      </View>
    );
  }

  if (!user) {
    return null;
  }

  if (movies.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No Movies Available</Text>
        <Text style={styles.emptyText}>
          Add movies to your database using Postman.{'\n\n'}
          Check POSTMAN_GUIDE.md for instructions.
        </Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const trendingMovies = movies.slice(0, Math.min(3, movies.length));
  const likedMovies = movies.slice(3, Math.min(6, movies.length));
  const recommendedMovies = movies.slice(6, Math.min(9, movies.length));
  const heroMovie = movies[0];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>WatchParty</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.headerLogout}>
          <Text style={styles.headerLogoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentBox}>
          {/* Hero Banner */}
          {heroMovie && heroMovie.posterUrl && (
            <View style={styles.heroContainer}>
              <TouchableOpacity onPress={() => handleReview(heroMovie)}>
                <Image
                  source={{ uri: heroMovie.posterUrl }}
                  style={styles.heroImage}
                  resizeMode="cover"
                  onError={(e) => console.log('Hero image error:', e.nativeEvent.error)}
                  onLoad={() => console.log('Hero image loaded')}
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

          {/* Trending Now */}
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
                    style={styles.posterContainer}
                  >
                    {movie.posterUrl ? (
                      <Image 
                        source={{ uri: movie.posterUrl }}
                        style={styles.poster}
                        resizeMode="cover"
                        onError={(e) => console.log(`Poster error for ${movie.title}:`, e.nativeEvent.error)}
                      />
                    ) : (
                      <View style={[styles.poster, styles.noPoster]}>
                        <Text style={styles.noPosterText}>No Image</Text>
                      </View>
                    )}
                    <Text style={styles.posterTitle} numberOfLines={2}>
                      {movie.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Movies you liked */}
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
                    style={styles.posterContainer}
                  >
                    {movie.posterUrl ? (
                      <Image 
                        source={{ uri: movie.posterUrl }}
                        style={styles.poster}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={[styles.poster, styles.noPoster]}>
                        <Text style={styles.noPosterText}>No Image</Text>
                      </View>
                    )}
                    <Text style={styles.posterTitle} numberOfLines={2}>
                      {movie.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Recommended */}
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
                    style={styles.posterContainer}
                  >
                    {movie.posterUrl ? (
                      <Image 
                        source={{ uri: movie.posterUrl }}
                        style={styles.poster}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={[styles.poster, styles.noPoster]}>
                        <Text style={styles.noPosterText}>No Image</Text>
                      </View>
                    )}
                    <Text style={styles.posterTitle} numberOfLines={2}>
                      {movie.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#1A1A1A',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerLogout: {
    backgroundColor: '#E50914',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  headerLogoutText: {
    color: '#fff',
    fontWeight: 'bold',
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
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: '#E50914',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  contentBox: {
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    marginTop: 20,
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
    backgroundColor: '#333',
  },
  heroOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.7)',
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
  posterContainer: {
    marginRight: 10,
  },
  poster: {
    width: width * 0.35,
    height: width * 0.5,
    borderRadius: 6,
    backgroundColor: '#333',
  },
  noPoster: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPosterText: {
    color: '#666',
    fontSize: 12,
  },
  posterTitle: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
    width: width * 0.35,
  },
});

export default home;
