import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"; // Importiere das Icons-Paket

const AnimatedHeaderRezeptdetail = ({ animatedValue }) => {
  const headerHeight = animatedValue.interpolate({
    inputRange: [0, 150],
    outputRange: [50, 0], // Maximalhöhe (50) und Minimalhöhe (0) des Headers
    extrapolate: "clamp",
  });

  const headerOpacity = animatedValue.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0], // Vollständig ausblenden beim Scrollen
    extrapolate: "clamp",
  });

  const goBack = () => {
    router.back();
  };

  return (
    <Animated.View
      style={[styles.header, { height: headerHeight, opacity: headerOpacity }]}
    >
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={goBack} style={styles.button}>
          <MaterialIcons name="west" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Rezeptdetails</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#F7F7F7", // Hintergrund
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15, // Optional, für Padding an den Seiten
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%", // Nimmt die volle Breite des Headers ein
    justifyContent: "flex-start", // Positioniert den Inhalt nach links
  },
  headerText: {
    flex: 1, // Nimmt den verfügbaren Platz ein
    fontSize: 20, // Anpassung der Schriftgröße für einen schmaleren Header
    color: "#000", // Schwarzer Text für gute Lesbarkeit
    fontWeight: "bold",
    textAlign: "center", // Text zentriert, um den Button links zu haben
    marginRight: 35, // Etwas Abstand zwischen Button und Text
  },
  button: {
    padding: 0, // Optional, für zusätzlichen Abstand um das Icon
  },
});

export default AnimatedHeaderRezeptdetail; 
