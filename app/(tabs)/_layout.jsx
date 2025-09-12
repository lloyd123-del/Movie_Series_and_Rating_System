import { Stack } from "expo-router";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function Layout() {
  const router = useRouter();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const panelPosition = useRef(new Animated.Value(width)).current;

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

  const handleLogout = () => {
    router.replace("/"); // back to login
  };

  const menuItems = [
    { id: 1, title: "Account Management", icon: "person-outline" },
    { id: 2, title: "Notifications", icon: "notifications-outline" },
    { id: 3, title: "Privacy & Security", icon: "lock-closed-outline" },
    { id: 4, title: "Terms & Condition", icon: "newspaper-outline" },
    { id: 5, title: "Help & Support", icon: "help-circle-outline" },
    { id: 6, title: "About", icon: "information-circle-outline" },
  ];

  return (
    <>
      {/* ✅ Header & Screens */}
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#0D0D0D" },
          headerTintColor: "#fff",
          headerTitle: "WatchParty",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 30,
            color: "#E50914",
          },
          headerShadowVisible: false,

          // ✅ Hamburger menu on left
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => setIsPanelOpen(true)}
              style={{ marginLeft: 15 }}
            >
              <Ionicons name="menu-outline" size={28} color="#fff" />
            </TouchableOpacity>
          ),

          // ✅ Search + User icons on right
          headerRight: () => (
            <View style={styles.headerRight}>
              <TouchableOpacity
                onPress={() => console.log("Search pressed")}
                style={styles.iconButton}
              >
                <Ionicons name="search-outline" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => console.log("User pressed")}
                style={styles.iconButton}
              >
                <Ionicons name="person-circle-outline" size={28} color="#fff" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      {/* Side Panel Overlay */}
      {isPanelOpen && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setIsPanelOpen(false)}
          activeOpacity={1}
        />
      )}

      {/* Slide-in Panel */}
      <Animated.View
        style={[styles.panel, { transform: [{ translateX: panelPosition }] }]}
      >
        <SafeAreaView style={styles.panelContent}>
          {/* Panel Header */}
          <View style={styles.panelHeader}>
            <Text style={styles.panelTitle}>Settings</Text>
            <TouchableOpacity
              onPress={() => setIsPanelOpen(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#E50914" />
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          <ScrollView style={styles.menuItems}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => console.log(`${item.title} pressed`)}
              >
                <Ionicons
                  name={item.icon}
                  size={22}
                  color="#E50914"
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={22} color="#fff" />
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
            <Text style={styles.versionText}>All rights reserved</Text>
          </View>
        </SafeAreaView>
      </Animated.View>
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
    right: 0,
    bottom: 0,
    width: width * 0.8,
    backgroundColor: "#0D0D0D",
    zIndex: 1000,
    elevation: 5,
  },
  panelContent: { flex: 1 },
  panelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  panelTitle: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  closeButton: { padding: 4 },
  menuItems: { flex: 1, paddingVertical: 16 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  menuIcon: { marginRight: 16, width: 24 },
  menuText: { fontSize: 16, color: "#fff" },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#333",
    alignItems: "center",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E50914",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    marginBottom: 12,
  },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "600", marginLeft: 8 },
  versionText: { fontSize: 12, color: "#999" },

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





{/* 
  import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "grey",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "WatchParty",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
  <Tabs.Screen
        name="list"
        options={{
          title: "List",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />     
   </Tabs>
  ); 
}  */ }