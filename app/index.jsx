import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { useAuth } from "./context/AuthContext";

export default function Index() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  const scale = useRef(new Animated.Value(0)).current; 
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Play animation
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        tension: 50,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -330,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After animation, check authentication
      if (!isLoading) {
        if (isAuthenticated) {
          console.log('User is authenticated, going to home');
          router.replace("/(tabs)/home");
        } else {
          console.log('User not authenticated, going to login');
          router.replace("/login");
        }
      }
    });
  }, []);

  // Also check when loading state changes
  useEffect(() => {
    if (!isLoading) {
      // Small delay to let animation finish
      setTimeout(() => {
        if (isAuthenticated) {
          console.log('User is authenticated, going to home');
          router.replace("/(tabs)/home");
        } else {
          console.log('User not authenticated, going to login');
          router.replace("/login");
        }
      }, 1000);
    }
  }, [isLoading, isAuthenticated]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/images/WatchPartyLogo.png")}
        style={[
          styles.logo,
          {
            transform: [
              { scale: scale },
              { translateY: translateY }
            ],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
  },
});
