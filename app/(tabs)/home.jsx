import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const home = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/WatchPartyLogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.text}>WatchParty</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0D0D0D",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 30,
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default home;
