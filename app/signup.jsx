import { Link } from 'expo-router'
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native'

const signup = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/topImagelogo.png')}
      style={styles.topLogo} />
      <Text style={styles.title1}>WatchParty</Text>
      
      <View style={styles.loginCard}>
        <View style={styles.TopImageContainer}>
          <Image source={require('../assets/images/videologo.png')}
            style={styles.logo}
            />
        </View>  
        <Text style={styles.title1}>Create Account</Text>
        <Text style={styles.title2}>Sign in get started</Text>

        <Text style={styles.title3}>Fullname</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Full name"
          placeholderTextColor="#A0A0A0"
        />

        <Text style={styles.title3}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          placeholderTextColor="#A0A0A0"
        />

        <Text style={styles.title3}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Password"
          placeholderTextColor="#A0A0A0"
          secureTextEntry
        />

        <Text style={styles.title3}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm your Password"
          placeholderTextColor="#A0A0A0"
          secureTextEntry
        />

 
          <Button title="Create Account" color="#E50914" />


        <View style={styles.divider} />

        <Text style={styles.title5}>Already have an Account?</Text>


          <Link href="/" asChild>
            <Button title="Sign In" color="#E50914" />
          </Link>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D', 
    justifyContent: 'center',   
    alignItems: 'center'        
  },

  topLogo: {
    width: 100,
    height: 100,
    justifyContent: "center", 
    alignItems: "center", 
    marginTop: 30,    
  },

  loginCard: {
    width: 321,
    height: 660,
    padding: 20,
    backgroundColor: '#1A1A1A', 
    borderRadius: 30,
    marginTop: 30
  },

  TopImageContainer: {
    // Blank
  },

  logo: {
    width: 39,
    height: 33,
    marginLeft: 125

  },

  title1: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    
  },

    title2: {
    color: '#A0A0A0',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center'
  },

  
    title3: {
    color: '#A0A0A0',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 5
  },

    title4: {
    color: '#A0A0A0',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50
  },

    title5: {
    color: '#A0A0A0',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15
  },


  input: {
    width: 277,
    height: 31,
    backgroundColor: '#D9D9D9',
    color: '#000000ff',
    borderRadius: 8,
    padding: 5,
    marginBottom: 30
  },
  

  divider: {
  height: 1,
  backgroundColor: '#FFFFFF', 
  width: '100%',
  marginVertical: 20
}

})
  

export default signup