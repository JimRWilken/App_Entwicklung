import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Platform,
  Button,
  Alert,
  View,
  Text,
  ScrollView,
} from "react-native";
import { useCameraPermissions, useMicrophonePermissions } from "expo-camera";
import { usePermissions } from "expo-media-library";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CustomButton } from "../../components";
import NummericField from "../../components/NummericField";
import { icons } from "../../constants";

const Scannen = () => {
  const [barcode, setBarcode] = useState(Array(13).fill("")); // Array für den Barcode

  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    usePermissions();

  const openKamera = async () => {
    const allPermissionsGranted = await requestAllPermissions();
    if (allPermissionsGranted) {
      // navigate to tabs
      router.replace("../Kamera/CameraUsage");
    } else {
      Alert.alert("To continue please provide permissions in settings");
    }
  };

  async function requestAllPermissions() {
    const cameraStatus = await requestCameraPermission();
    if (!cameraStatus.granted) {
      Alert.alert("Error", "Camera permission is required.");
      return false;
    }

    const mediaLibraryStatus = await requestMediaLibraryPermission();
    if (!mediaLibraryStatus.granted) {
      Alert.alert("Error", "Media Library permission is required.");
      return false;
    }

    // only set to true once user provides permissions
    // this prevents taking user to home screen without permissions
    await AsyncStorage.setItem("hasOpened", "true");
    return true;
  }

  const handleBarcodeChange = (newBarcode) => {
    setBarcode(newBarcode);
  };

  return (
    <View className="flex-1 bg-secondary">
      <ScrollView className="flex-1 px-4 mt-10">
        <Text className="text-2xl text-white font-semibold text-center ">
          Lebensmittel Scannen
        </Text>

        {/* Anleitung für Benutzer */}
        <View className="bg-white rounded-lg shadow-lg p-4 mt-5">
          <Text className="text-lg font-semibold mb-2">So funktioniert's:</Text>
          <Text className="text-gray-700 mb-4">
            Scannen Sie den Barcode eines Lebensmittels, um die Inhaltsstoffe zu
            überprüfen und sicherzustellen, dass sie verträglich sind. Sie haben
            zwei Möglichkeiten:
          </Text>
          <Text className="text-gray-600 mb-2">
            1. **Kamera verwenden:** Tippen Sie auf die Schaltfläche "Kamera
            öffnen", um die Kamera zu aktivieren und den Barcode zu scannen.
          </Text>
          <Text className="text-gray-600 mb-2">
            2. **Barcode manuell eingeben:** Geben Sie den Barcode in das
            Eingabefeld ein, wenn das Scannen nicht möglich ist.
          </Text>
          <Text className="text-gray-600">
            Nutzen Sie die Kamera für eine schnelle und einfache Überprüfung
            Ihrer Lebensmittel!
          </Text>
          {/* Platzhalter für Grafiken */}
          <Image
            source={icons.barcodelesegerat} // Fügen Sie hier die URL oder den Import Ihrer Grafik ein
            resizeMode="contain"
            className=" w-full h-15"
          />
        </View>

        {/* Schaltfläche zum Öffnen der Kamera */}
        <CustomButton
          title="Kamera öffnen"
          handlePress={openKamera}
          containerStyles="mt-7"
        />

        {/* Eingabefeld für den Barcode */}
        <View className="bg-blue-100 rounded-lg shadow-lg p-4 mt-5">
          <NummericField
            title="Barcode manuell eingeben: "
            placeholder=" "
            otherStyles="mt-1"
            value={barcode} // Aktuellen Barcode übergeben
            handleChangeText={handleBarcodeChange} // Funktion zum Aktualisieren des Barcodes
          />
        </View>

        {/* Hinweis für den Benutzer */}
        <Text className="text-gray-400 text-center mt-4">
          Scanne den Barcode eines Produkts oder gib ihn manuell ein.
        </Text>
      </ScrollView>
    </View>
  );
};

export default Scannen;
