import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function Index() {
  const router = useRouter();


  const scale = useRef(new Animated.Value(0)).current; 
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {

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
    
      router.replace("/login"); 
    });
  }, []);

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
