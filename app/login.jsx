import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useAuth } from './context/AuthContext';

// ⚠️ YOUR BACKEND PORT
const API_URL = 'http://10.0.2.2:3000/api';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await login(data.user, data.token);
        Alert.alert('Success', 'Login successful!');
        router.replace('/(tabs)/home');
      } else {
        Alert.alert('Error', data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Could not connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Static Logo (NO animation) */}
      <Image
        source={require("../assets/images/WatchPartyLogo.png")}
        style={styles.topLogo}
      />

      <View style={styles.loginCard}>
        <View style={styles.TopImageContainer}>
          <Image
            source={require("../assets/images/videologo.png")}
            style={styles.logo}
          />
        </View>

        <Text style={styles.title1}>Welcome Back!</Text>
        <Text style={styles.title2}>Login to WatchParty!</Text>

        <Text style={styles.title3}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A0A0A0"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
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

        <View style={styles.divider} />

        <Text style={styles.title5}>Don't have an Account?</Text>

        <Link href={'/signup'} asChild>
          <Button 
            title="Create Account" 
            color="#E50914"
            disabled={isLoading}
          />
        </Link>
      </View>
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
    marginBottom: 20,
  },
  loginCard: {
    width: 321,
    maxHeight: 650,
    padding: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 20
  },
  TopImageContainer: {},
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
    marginBottom: 30,
    textAlign: 'center'
  },
  title3: {
    color: '#A0A0A0',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 5
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
    marginBottom: 20
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
