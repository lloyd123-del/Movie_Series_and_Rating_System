import { Link, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { useAuth } from '../context/AuthContext';

// ⚠️ CHANGE THIS TO YOUR BACKEND IP ADDRESS
const API_URL = 'http://10.0.2.2:3000/api';
// For Android Emulator use: 'http://10.0.2.2:3001/api'
// For iOS Simulator use: 'http://localhost:3001/api'

const index = () => {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  
  const opacity = useRef(new Animated.Value(0)).current;
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)/home");
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await login(data.user, data.token);
        router.replace("/(tabs)/home");
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        'Connection Error', 
        'Could not connect to server. Please check your internet connection and make sure the backend is running.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/WatchPartyLogo.png')}
        style={styles.topLogo} 
      />
      <Text style={styles.title1}>WatchParty</Text>
      
      <Animated.View style={[styles.loginCard, {opacity}]}>
        <View style={styles.TopImageContainer}>
          <Image 
            source={require('../assets/images/videologo.png')}
            style={styles.logo}
          />
        </View>  
        <Text style={styles.title1}>Welcome Back!</Text>
        <Text style={styles.title2}>Sign in to your account</Text>

        <Text style={styles.title3}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A0A0A0"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!isLoading}
        />

        <Text style={styles.title3}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#A0A0A0"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!isLoading}
        />

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#E50914" />
            <Text style={styles.loadingText}>Logging in...</Text>
          </View>
        ) : (
          <Button 
            title="Login" 
            color="#E50914" 
            onPress={handleLogin}
          />
        )}

        <Text style={styles.title4}>Forgot your Password?</Text>
        <View style={styles.divider} />

        <Text style={styles.title5}>Don't have an Account?</Text>

        <Link href={'/signup'} asChild>
          <Button 
            title="Create Account" 
            color="#E50914"
            disabled={isLoading}
          />
        </Link>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D', 
    justifyContent: 'center',   
    alignItems: 'center'        
  },
  topLogo: {
    width: 120,
    height: 120,
    justifyContent: "center", 
    alignItems: "center",     
  },
  loginCard: {
    width: 321,
    height: 605,
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
    textAlign: 'center'
  },
  title2: {
    color: '#A0A0A0',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 60,
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
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 10,
    fontSize: 14,
  }
});

export default index;
