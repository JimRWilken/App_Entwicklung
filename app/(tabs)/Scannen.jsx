import React, { useState, useRef } from "react";
import {
  Image,
  StyleSheet,
  Alert,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useCameraPermissions, useMicrophonePermissions } from "expo-camera";
import { usePermissions } from "expo-media-library";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CustomButton } from "../../components";
import NummericField from "../../components/NummericField";
import { icons } from "../../constants";
import AnimatedHeaderScannen from "../../components/AnimatedHeaderScannen"; // Default-Import korrekt anwenden

const Scannen = () => {
  const [barcode, setBarcode] = useState(Array(13).fill(""));
  const [isManualInputVisible, setIsManualInputVisible] = useState(false);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    usePermissions();

  const openKamera = async () => {
    const allPermissionsGranted = await requestAllPermissions();
    if (allPermissionsGranted) {
      router.push("../Kamera/CameraUsage");
    } else {
      Alert.alert(
        "Um fortzufahren, gewähren Sie bitte Berechtigungen in den Einstellungen."
      );
    }
  };

  async function requestAllPermissions() {
    const cameraStatus = await requestCameraPermission();
    if (!cameraStatus.granted) {
      Alert.alert("Fehler", "Kamera-Berechtigung wird benötigt.");
      return false;
    }

    const mediaLibraryStatus = await requestMediaLibraryPermission();
    if (!mediaLibraryStatus.granted) {
      Alert.alert("Fehler", "Zugriff auf die Mediathek wird benötigt.");
      return false;
    }

    await AsyncStorage.setItem("hasOpened", "true");
    return true;
  }

  const handleBarcodeChange = (newBarcode) => {
    setBarcode(newBarcode);
  };

  const toggleManualInput = () => {
    setIsManualInputVisible((prevState) => !prevState);
  };

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

  return (
    <SafeAreaView style={styles.container}>
      {/* Animated Header */}
      <AnimatedHeaderScannen animatedValue={offset} />

      {/* ScrollView mit Scroll-Events */}
      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: false } // Nutze den useNativeDriver für flüssige Animationen
        )}
        scrollEventThrottle={16} // Für häufige Updates der Scroll-Position
      >
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionTitle}>So funktioniert's:</Text>
          <Text style={styles.instructionText}>
            Mit dieser App können Sie den Barcode eines Lebensmittels scannen,
            um detaillierte Informationen über die Inhaltsstoffe zu erhalten.
            Dadurch können Sie schnell und einfach überprüfen, ob die
            Inhaltsstoffe mit Ihren Unverträglichkeiten übereinstimmen und
            sicherstellen, dass das Produkt für Sie geeignet ist. Sie haben zwei
            verschiedene Möglichkeiten, um dies zu tun:
          </Text>

          <View style={styles.methodContainer}>
            <TouchableOpacity style={styles.methodBox} onPress={openKamera}>
              <View style={styles.methodContent}>
                <Image
                  source={icons.kamera}
                  style={[styles.methodIcon, { tintColor: "#FFFFFF" }]}
                />
                <Text style={styles.methodText}>Kamera verwenden</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.methodBox}
              onPress={toggleManualInput}
            >
              <View style={styles.methodContent}>
                <Image
                  source={icons.barcode}
                  style={[styles.methodIcon, { tintColor: "#FFFFFF" }]}
                />
                <Text style={styles.methodText}>Barcode manuell eingeben</Text>
              </View>
            </TouchableOpacity>
          </View>

          {isManualInputVisible && (
            <View style={styles.barcodeContainer}>
              <NummericField
                title="Barcode manuell eingeben: "
                placeholder=" "
                otherStyles={styles.numericField}
                value={barcode}
                handleChangeText={handleBarcodeChange}
              />
            </View>
          )}

          <Text style={styles.instructionText}>
            Nutzen Sie die Kamera für eine schnelle und einfache Überprüfung
            Ihrer Lebensmittel!
          </Text>
          <Image
            source={icons.barcodelesegerat}
            resizeMode="contain"
            style={styles.image}
          />
        </View>

        <CustomButton
          title="Artikel suchen..."
          handlePress={openKamera}
          containerStyles={styles.buttonContainer}
        />

        <Text style={styles.footerText}>
          Scanne den Barcode eines Produkts oder gib ihn manuell ein.
        </Text>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  instructionContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  instructionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  instructionText: {
    color: "#737373",
    marginBottom: 30,
    marginTop: 10,
  },
  methodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  methodContent: {
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  methodBox: {
    flex: 1,
    backgroundColor: "#2e8b57",
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 4,
    alignItems: "center",
    elevation: 3,
  },
  methodIcon: {
    width: 28,
    height: 28,
    marginBottom: 8,
  },
  methodText: {
    fontSize: 16,
    color: "#f8faf7",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 300,
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 15,
  },
  barcodeContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  numericField: {
    marginTop: 10,
  },
  footerText: {
    color: "#A0A0A0",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Scannen;
