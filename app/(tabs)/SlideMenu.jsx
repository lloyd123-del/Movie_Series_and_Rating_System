




{ /*   

  // wala pa ni sulod kay wapata nahuman // 
// components/SideMenu.jsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const SideMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      
      <TouchableOpacity style={styles.overlay} onPress={onClose} />

    
      <View style={styles.sidePanel}>
        <Text style={styles.menuTitle}>Menu</Text>
        <TouchableOpacity onPress={onClose} style={styles.menuItem}>
          <Text style={styles.menuText}>Close Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sidePanel: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 250,
    height: "100%",
    backgroundColor: "#1a1a1a",
    padding: 20,
  },
  menuTitle: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 20,
  },
  menuItem: {
    marginVertical: 10,
  },
  menuText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default SideMenu; */ }
