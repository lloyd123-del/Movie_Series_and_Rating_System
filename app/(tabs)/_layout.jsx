import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from "expo-router";
import { Slot } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";


import SearchBar from "./searchbar";
import SlideMenu from "./SlideMenu";

const { width } = Dimensions.get("window");

const menuItems = [
  { id: 1, title: "Watchlist", icon: "clipboard-outline" },
  { id: 2, title: "Liked", icon: "thumbs-up-outline" },
  { id: 3, title: "Account", icon: "person-outline" },
];


export default function Layout() {
  const router = useRouter();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const panelPosition = useRef(new Animated.Value(width)).current;

  const HandleHome = () => {
    setIsPanelOpen(true); 
    router.replace("/(tabs)/home");
  };

  useEffect(() => {
    if (isPanelOpen) {
      Animated.timing(panelPosition, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(panelPosition, {
        toValue: width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isPanelOpen]);

  // ONLY CHANGE: Fixed logout function
  const handleLogout = async () => {
    try {
      // Close panel first
      setIsPanelOpen(false);
      
      // Wait for animation
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Clear storage
      await AsyncStorage.clear();
      
      // Go to login
      router.replace("/login");
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleMenuPress = (title) => {
    setIsPanelOpen(false); 

    if (title === "Watchlist") {
      router.push("/(tabs)/watchlist"); 
    } else if (title === "Liked") {
      router.push("/(tabs)/like");
    } else if (title === "Account") {
      router.push("/(tabs)/account");
    } 
  };

  return (
    <>

      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#0D0D0D" },
          headerTintColor: "#fff",
          headerTitle: () => (
            
            <Text onPress={HandleHome} style={{fontSize:30, fontWeight: 'bold', color:"#E50914", textAlign: 'center', marginLeft: '25%' }}>
              WatchParty
            </Text>
          ),
          headerShadowVisible: false,

          headerLeft: () => (
     
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => setIsMenuOpen(true)}
            >
              <Ionicons name="menu-outline" size={28} color="#fff" />
            </TouchableOpacity>
          ),

          headerRight: () => (
            <View style={styles.headerRight}>
    
              <TouchableOpacity
                onPress={() => setIsSearchOpen(true)}
                style={styles.iconButton}
              >
                <Ionicons name="search-outline" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsPanelOpen(true)}
                style={styles.iconButton}
              >
                <Ionicons name="person-circle-outline" size={28} color="#fff" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

     
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
 
        {isPanelOpen && (
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setIsPanelOpen(false)}
            activeOpacity={1}
          />
        )}

     
        <Animated.View
          style={[styles.panel, { transform: [{ translateX: panelPosition }] }]}
        >
          <SafeAreaView style={styles.panelContent}>
            
            <View style={styles.panelHeader}>
              <TouchableOpacity
                onPress={() => setIsPanelOpen(false)}
                style={{ padding: 4 }}
              >
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={HandleHome}
                style={{ paddingHorizontal: 10 }}
              >
                <Text style={styles.headerTitle}>WatchParty</Text>
              </TouchableOpacity>
              <View style={{ width: 24 }} />
            </View>

            <View style={styles.profileSection}>
              <Ionicons name="person-circle" size={80} color="limegreen" />
              <Text style={styles.username}>Username</Text>
            </View>

        
            <View style={styles.menuList}>
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.menuItem}
                  onPress={() => handleMenuPress(item.title)}
                >

                  <View style={styles.menuLeft}>
                    <Ionicons name={item.icon} size={22} color="#fff" />
                    <Text style={styles.menuText}>{item.title}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#fff" />
                </TouchableOpacity>
              ))}
            </View>

 
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Text style={styles.logoutText}>Log out</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Animated.View>
      </View>

  
      {isMenuOpen && <SlideMenu onClose={() => setIsMenuOpen(false)} />}

     
      {isSearchOpen && <SearchBar onClose={() => setIsSearchOpen(false)} />}
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999,
  },
  panel: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: width * 0.8,
    backgroundColor: "#0D0D0D",
    zIndex: 1000,
    elevation: 5,
    right: 0,
    marginTop: 25,
  },
  panelContent: { flex: 1 },
  panelHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#111",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E50914",
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 20,
  },
  username: { fontSize: 16, fontWeight: "600", color: "#fff", marginTop: 8 },
  menuList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuText: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 12,
  },
  footer: {
    padding: 20,
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#E50914",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: "center",
    width: "100%",
  },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  // ✅ Header Right Icons
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  iconButton: {
    marginLeft: 15,
  },
});