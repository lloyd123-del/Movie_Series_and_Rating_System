import { StyleSheet, View } from 'react-native'

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
//hello
export default index