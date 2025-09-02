import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const index = () => {
  return (
    <View style={styles.container}>
      <View style={styles.CreateContainer}>
        <Text style={styles.CreateText}>Create Account</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },

 CreateText: {
  color: "white",
 }

  
})

export default index