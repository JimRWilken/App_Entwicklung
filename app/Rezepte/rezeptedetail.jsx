import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView, StatusBar } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";

const RezeptDetail = () => {
  const route = useRoute(); // Holt die übergebenen Parameter
  const { titel, Zutaten, Beschreibung, Bilder, username, avatar } =
    route.params; // Rezeptdaten
  
  const goBack = () => {
    router.back();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.titleBar}>
          <TouchableOpacity onPress={goBack}>
            <MaterialIcons name="west" size={30} color="#52575D" />
          </TouchableOpacity>
          <Text style={styles.title}>Rezeptdetails</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* Rezeptbild */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: Bilder }}
              style={styles.rezeptImage}
              resizeMode="cover"
            />
          </View>

          {/* Titel und Benutzerinfo */}
          <View style={styles.infoContainer}>
            <Text style={styles.rezeptTitle}>{titel}</Text>
            <View style={styles.userContainer}>
              <Image
                source={{ uri: avatar }}
                style={styles.userAvatar}
                resizeMode="cover"
              />
              <Text style={styles.userName}>Rezept von {username}</Text>
            </View>
          </View>

          {/* Zutatenliste */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Zutaten</Text>
            <Text style={styles.sectionText}>{Zutaten}</Text>
          </View>

          {/* Beschreibung */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Beschreibung</Text>
            <Text style={styles.sectionText}>{Beschreibung}</Text>
          </View>

          {/* Buttons für zusätzliche Funktionen */}
          <View style={styles.buttonContainer}>
            {/* Button zum Hinzufügen des Rezepts zu den Favoriten */}
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Zu Favoriten hinzufügen</Text>
            </TouchableOpacity>

            {/* Button zum Teilen des Rezepts */}
            <TouchableOpacity style={[styles.button, styles.shareButton]}>
              <Text style={styles.buttonText}>Rezept teilen</Text>
            </TouchableOpacity>

            {/* Button zum Bearbeiten des Rezepts (noch einzufügen) */}
            <TouchableOpacity style={[styles.button, styles.editButton]}>
              <Text style={styles.buttonText}>Rezept bearbeiten</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

// Stylesheet für die visuelle Verbesserung
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  titleBar: {
    flexDirection: "row", // Inhalte in einer Reihe
    marginTop: 20, // Abstand nach oben
    marginLeft: 10, // Abstand vom rechten Rand
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  imageContainer: {
    margin: 16,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  rezeptImage: {
    width: "100%",
    height: 250,
    borderRadius: 16,
  },
  infoContainer: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  rezeptTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontSize: 14,
    color: "#777",
  },
  sectionContainer: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
  buttonContainer: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  button: {
    backgroundColor: "#FF6347", // Tomatenrot für Hauptaktionen
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  shareButton: {
    backgroundColor: "#4682B4", // Stahlblau für Teilen
  },
  editButton: {
    backgroundColor: "#32CD32", // Limegrün für Bearbeiten
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
  },
  title: {
    flex: 1, // Nimmt den verfügbaren Platz ein
    textAlign: "center", // Zentriert den Text
    fontSize: 24,
    color: "#52575D",
    fontFamily: "HelveticaNeue-Bold",
    marginRight: 40,
  },
});

export default RezeptDetail;
