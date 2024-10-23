import { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Animated, // Für die Animation importieren
} from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker"; // Expo Image Picker importieren
import useAppwrite from "../../lib/useAppwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState } from "../../components";
import Rezeptevorschau from "../../components/Rezeptevorschau";
import {
  getUserRezepte,
  updateAvatar,
  getCurrentUser,
} from "../../lib/appwrite";
import { Ionicons } from "@expo/vector-icons"; // Importiere Ionicons für die Icons
import { MaterialIcons } from "@expo/vector-icons"; // Importiere MaterialIcons für das west-Icon
import AnimatedHeaderKrankheiten from "../../components/AnimatedHeaderKrankheiten"; // Default-Import korrekt anwenden
// Funktion zum Aktualisieren des Avatars importieren

const Krankheiten = () => {
  // Animated Value für die Scroll-Position
  const offset = useRef(new Animated.Value(0)).current;

  // Icon Größe und Position abhängig vom Scroll-Offset
  const iconSize = offset.interpolate({
    inputRange: [0, 150],
    outputRange: [30, 20], // Reduziert die Größe beim Scrollen
    extrapolate: "clamp",
  });

  const iconPosition = offset.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -50], // Bewegt das Icon nach oben beim Scrollen
    extrapolate: "clamp",
  });

  // Unverträglichkeiten-Daten
  const intolerances = [
    { id: "1", title: "Laktoseintoleranz" },
    { id: "2", title: "Fruktoseintoleranz" },
    { id: "3", title: "Histaminintoleranz" },
    { id: "4", title: "Glutenintoleranz" },
    // Weitere Unverträglichkeiten können hier hinzugefügt werden
  ];

  // Krankheiten-Daten
  const diseases = [
    { id: "1", title: "Zöliakie" },
    { id: "2", title: "Nussallergie" },
    { id: "3", title: "Erdnussallergie" },
    { id: "4", title: "Sojaallergie" },
    { id: "5", title: "Weizenallergie" },
    // Weitere Krankheiten können hier hinzugefügt werden
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Animated Header */}
      <AnimatedHeaderKrankheiten animatedValue={offset} />
      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        // Scroll-Events überwachen und die Animation updaten
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: false } // nativeDriver auf false setzen, wenn du das DOM nicht direkt manipulierst
        )}
        scrollEventThrottle={16} // wie oft das Scroll-Event gefeuert wird
      >
        <View style={styles.contentContainer}>
          {/* Überschrift für Unverträglichkeiten */}
          <Text style={styles.sectionHeader}>Unverträglichkeiten</Text>
          {intolerances.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.option}
              onPress={() => {
                // Navigation zur Detailseite, falls vorhanden
                // router.push(`Detail/${item.id}`);
              }}
            >
              <Text style={styles.optionText}>{item.title}</Text>
            </TouchableOpacity>
          ))}

          {/* Überschrift für Krankheiten */}
          <Text style={styles.sectionHeader}>Krankheiten</Text>
          {diseases.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.option}
              onPress={() => {
                // Navigation zur Detailseite, falls vorhanden
                // router.push(`Detail/${item.id}`);
              }}
            >
              <Text style={styles.optionText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#52575D",
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  option: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  optionText: {
    fontSize: 18,
    color: "#52575D",
    fontFamily: "HelveticaNeue",
  },
});

export default Krankheiten;