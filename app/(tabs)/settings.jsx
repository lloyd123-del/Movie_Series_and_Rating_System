import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const Settings = () => {
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
    router.replace('/'); // back to login
  };

  const menuItems = [
    { id: 1, title: 'Account Management', icon: 'person-outline' },
    { id: 2, title: 'Notifications', icon: 'notifications-outline' },
    { id: 3, title: 'Privacy & Security', icon: 'lock-closed-outline' },
    { id: 4, title: 'Terms & Condition', icon: 'newspaper-outline' },
    { id: 5, title: 'Help & Support', icon: 'help-circle-outline' },
    { id: 6, title: 'About', icon: 'information-circle-outline' },
  ];

  return (
    <View style={styles.container}>
      <Image 
        source={require("../../assets/images/WatchPartyLogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.text}>WatchPary</Text>

    {/* Button to open panel */}
    <TouchableOpacity 
      onPress={() => setIsPanelOpen(true)}
      style={styles.menuButton}
    >
      <Ionicons name="menu-outline" size={30} color="#E50914" />
    </TouchableOpacity>

      {/* Side Panel */}
      {isPanelOpen && (
        <TouchableOpacity 
          style={styles.overlay}
          onPress={() => setIsPanelOpen(false)}
          activeOpacity={1}
        />
      )}
      
      <Animated.View 
        style={[
          styles.panel,
          { transform: [{ translateX: panelPosition }] }
        ]}
      >
        <SafeAreaView style={styles.panelContent}>
          <View style={styles.panelHeader}>
            <Text style={styles.panelTitle}>Settings</Text>
            <TouchableOpacity 
              onPress={() => setIsPanelOpen(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#00204A" />
            </TouchableOpacity>
          </View>

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
                  color="#00204A" 
                  style={styles.menuIcon} 
                />
                <Text style={styles.menuText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={22} color="#fff" />
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
            <Text style={styles.versionText}>All rights received</Text>
          </View>
        </SafeAreaView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1A1A1A' },
  logo: { width: 200, height: 200, marginBottom: 20 },
  text: { fontSize: 30, color: '#FFFFFF', textAlign: 'center', fontWeight: 'bold', },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999 },
  panel: { position: 'absolute', top: 0, right: 0, bottom: 0, width: width * 0.8, backgroundColor: '#fff', zIndex: 1000, elevation: 5 },
  panelContent: { flex: 1 },
  panelHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  panelTitle: { fontSize: 20, fontWeight: 'bold', color: '#00204A' },
  closeButton: { padding: 4 },
  menuItems: { flex: 1, paddingVertical: 16 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 20 },
  menuIcon: { marginRight: 16, width: 24 },
  menuText: { fontSize: 16, color: '#00204A' },
  footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#f0f0f0', alignItems: 'center' },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#E50914', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, width: '100%', marginBottom: 12 },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: '600', marginLeft: 8 },
  versionText: { fontSize: 12, color: '#666' },
  menuButton: {
  position: "absolute",
  top: 40,   // adjust for SafeArea
  right: 20, // push to the right side
  zIndex: 1001,
},

});

export default Settings;
