import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { images } from "../constants";
import { CustomButton, Loader } from "../components";
import "react-native-url-polyfill/auto";
import { useGlobalContext } from "../context/GlobalProvider";
import { StyleSheet } from "react-native";

const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/Home" />;

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <Loader isLoading={loading} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.innerContainer}>
            {/* Logo */}
            <Image
              source={images.logo_bite_safe}
              resizeMode="contain"
              style={styles.logo}
            />

            {/* Einführungstext */}
            <View style={styles.card}>
              <Text style={styles.title}>Willkommen bei BiteSafe!</Text>

              {/* Beschreibung */}
              <Text style={styles.description}>
                Finde heraus, welche Lebensmittel für dich geeignet sind – ganz
                einfach und schnell.
              </Text>
              <Text style={styles.step}>
                1. Scanne den Barcode eines Produkts und erhalte sofortige
                Ergebnisse zu den Inhaltsstoffen.
              </Text>
              <Text style={styles.step}>
                2. Füge Produkte zu deinen Favoriten hinzu, um sie später
                schnell wiederzufinden.
              </Text>
              <Text style={styles.step}>
                3. Sichere dir ein unbeschwertes Einkaufen – entscheide
                informiert mit BiteSafe!
              </Text>
            </View>

            {/* Button */}
            <CustomButton
              title="Entdecke die App"
              handlePress={() => router.push("/(auth)/sign-in")}
              containerStyles={styles.buttonContainer}
              textStyle={styles.buttonText}
            />
          </View>
        </ScrollView>

        <StatusBar backgroundColor="#161622" style="light" />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 10,
  },
  card: {
    backgroundColor: "#DFD8C8",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    padding: 20,
    marginTop: 20,
    width: "100%",
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 15,
  },
  step: {
    fontWeight: "500",
    color: "#555",
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0a0a",
    borderRadius: 10,
    width: 350,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
    header: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  welcomeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  welcomeText: {
    fontFamily: "HelveticaNeue",
    fontSize: 14,
    color: "#52575D",
  },
});

export default Welcome;
