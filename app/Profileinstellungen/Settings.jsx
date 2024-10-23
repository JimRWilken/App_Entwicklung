import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Importiere Ionicons für die Icons
import { MaterialIcons } from "@expo/vector-icons"; // Importiere MaterialIcons für das west-Icon
import { router, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import { signOut } from "../../lib/appwrite";

const SettingsScreen = () => {
  const router = useRouter(); // Initialisiere den Router
  const { user, setUser, setIsLogged } = useGlobalContext();

  const logout = async () => {
    try {
      await signOut();
      router.replace("/sign-in");
      setUser(null);
      setIsLogged(false);
    } catch (error) {
      console.error("Logout-Fehler:", error.message);
    }
  };

  const profileOptions = [
    {
      id: "1",
      title: "Mein Abonnement",
      icon: "star-outline",
      route: "Subscription",
    },
    {
      id: "2",
      title: "Benachrichtigungen",
      icon: "notifications-outline",
      route: "Notifications",
    },
    {
      id: "3",
      title: "Privatsphäre",
      icon: "lock-closed-outline",
      route: "Privacy",
    },
  ];

  const supportOptions = [
    {
      id: "4",
      title: "Hilfe & Support",
      icon: "help-circle-outline",
      route: "Help",
    },
    {
      id: "5",
      title: "Sicherheit",
      icon: "shield-checkmark-outline",
      route: "Security",
    },
    {
      id: "6",
      title: "Richtlinien",
      icon: "document-text-outline",
      route: "Policies",
    },
    {
      id: "7",
      title: "Datenschutz",
      icon: "shield-outline",
      route: "DataProtection",
    },
    {
      id: "8",
      title: "Impressum",
      icon: "information-circle-outline",
      route: "Imprint",
    },
  ];

  const goBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* Title Bar */}
        <View style={styles.titleBar}>
          <TouchableOpacity onPress={goBack}>
            <MaterialIcons name="west" size={30} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Einstellungen</Text>
          <TouchableOpacity onPress={logout} style={styles.button}>
            <MaterialIcons name="logout" size={30} color="#e34242" />
          </TouchableOpacity>
        </View>

        {/* Scrollable Content */}
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.contentContainer}>
            {/* Profil Überschrift */}
            <Text style={styles.sectionHeader}>Profil</Text>
            {profileOptions.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.option}
                onPress={() => router.push(item.route)} // Navigation zur entsprechenden Route
              >
                <Ionicons name={item.icon} size={24} color="#52575D" />
                <Text style={styles.optionText}>{item.title}</Text>
              </TouchableOpacity>
            ))}

            {/* Support & Extras Überschrift */}
            <Text style={styles.sectionHeader}>Support & Sicherheit</Text>
            {supportOptions.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.option}
                onPress={() => router.push(item.route)} // Navigation zur entsprechenden Route
              >
                <Ionicons name={item.icon} size={24} color="#52575D" />
                <Text style={styles.optionText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  titleBar: {
    flexDirection: "row", // Inhalte in einer Reihe
    alignItems: "center", // Zentriere die Items vertikal
    marginTop: 50, // Abstand nach oben
    paddingHorizontal: 10, // Horizontaler Abstand
  },
  title: {
    flex: 1, // Nimmt den verfügbaren Platz ein
    textAlign: "center", // Zentriert den Text
    fontSize: 24,
    color: "#000",
    fontFamily: "HelveticaNeue-Bold",
    marginRight: 0,
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
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  optionText: {
    marginLeft: 12,
    fontSize: 18,
    color: "#52575D",
    fontFamily: "HelveticaNeue",
  },
});

export default SettingsScreen;
