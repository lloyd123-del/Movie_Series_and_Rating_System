import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [hasChecked, setHasChecked] = useState(false);
  
  const scale = useRef(new Animated.Value(0)).current; 
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    checkAuthAndRedirect();
  }, []);

  const checkAuthAndRedirect = async () => {
    try {
      // Play animation first
      await new Promise((resolve) => {
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
        ]).start(resolve);
      });

      // Check AsyncStorage directly
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      
      console.log('=== INDEX.JSX CHECK ===');
      console.log('Token exists:', !!token);
      console.log('User exists:', !!user);

      if (token && user) {
        console.log('User is logged in, going to home');
        router.replace("/(tabs)/home");
      } else {
        console.log('No user found, going to login');
        router.replace("/login");
      }
      
      setHasChecked(true);
    } catch (error) {
      console.error('Error checking auth:', error);
      router.replace("/login");
    }
  };

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
