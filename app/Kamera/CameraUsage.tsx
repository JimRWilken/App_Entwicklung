import * as React from "react";
import { SafeAreaView, View } from "react-native";
import { Alert } from "react-native";

import {
  BarcodeScanningResult,
  CameraMode,
  CameraView,
  FlashMode,
} from "expo-camera";
import BottomRowTools from "@/components/Camera/BottomRowTools";
import MainRowActions from "@/components/Camera/MainRowActions";
import PictureView from "@/components/Camera/PictureView";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import CameraTools from "@/components/Camera/CameraTools";
import * as WebBrowser from "expo-web-browser";
import QRCodeButton from "@/components/Camera/QRCodeButton";
import VideoViewComponent from "@/components/Camera/VideoView";
import BarcodeButton from "@/components/Camera/BarcodeButton";


export default function HomeScreen() {
  const cameraRef = React.useRef<CameraView>(null);
  const [cameraMode, setCameraMode] = React.useState<CameraMode>("picture");
  const [cameraTorch, setCameraTorch] = React.useState<boolean>(false);
  const [cameraFlash, setCameraFlash] = React.useState<FlashMode>("off");
  const [cameraFacing, setCameraFacing] = React.useState<"front" | "back">(
    "back"
  );
  const [cameraZoom, setCameraZoom] = React.useState<number>(0);
  const [picture, setPicture] = React.useState<string>("");

  const [isBrowsing, setIsBrowsing] = React.useState<boolean>(false);
  const [isRecording, setIsRecording] = React.useState<boolean>(false);
  const [qrCodeDetected, setQrCodeDetected] = React.useState<string>("");
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const [alertShown, setAlertShown] = React.useState<boolean>(false);

  async function handleTakePicture() {
    const response = await cameraRef.current?.takePictureAsync({});
    setPicture(response!.uri);
  }

  async function toggleRecord() {
    if (isRecording) {
      cameraRef.current?.stopRecording();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      const response = await cameraRef.current?.recordAsync();
    }
  }

  async function handleOpenQRCode() {
    setIsBrowsing(true);
    const browserResult = await WebBrowser.openBrowserAsync(qrCodeDetected, {
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.FORM_SHEET,
    });
    if (browserResult.type === "cancel") {
      setIsBrowsing(false);
    }
  }

  const handleBarcodeScanned = async (result: BarcodeScanningResult) => {
    if (result.data) {
      // Überprüfen, ob die Daten nur aus Ziffern bestehen
      if (/^\d+$/.test(result.data)) {
        // Überprüfen, ob der Alert bereits angezeigt wurde
        if (!alertShown) {
          Alert.alert(
            "Barcode erkannt",
            `Die Barcode-Daten sind: ${result.data}`
          );
          setAlertShown(true); // Alert als angezeigt markieren
        }
      } else {
        // QR-Code oder andere Daten verarbeiten
        setQrCodeDetected(result.data);

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          setQrCodeDetected("");
          setAlertShown(false); // Reset des alertShown-States
        }, 1000);
      }
    }
  };

  const reloadCamera = () => {
    console.log("Kamera wurde neu geladen");
    // Hier können Sie den Zustand zurücksetzen oder die Kamera neu initialisieren
    // Sie können auch andere relevante Zustände zurücksetzen, wenn nötig
    setQrCodeDetected(""); // QR-Code-Daten zurücksetzen
    setAlertShown(false); // Alert zurücksetzen
  };


  if (isBrowsing) return <></>;
  if (picture) return <PictureView picture={picture} setPicture={setPicture} />;
  return (
    <Animated.View
      layout={LinearTransition}
      entering={FadeIn.duration(1000)}
      exiting={FadeOut.duration(1000)}
      style={{ flex: 1 }}
    >
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing={cameraFacing}
        mode={cameraMode}
        zoom={cameraZoom}
        enableTorch={cameraTorch}
        flash={cameraFlash}
        barcodeScannerSettings={{
          barcodeTypes: [
            "qr",
            "ean13", //Hier dann später anpassen für mdie Typen die ich brauch, rest kann raus fliegen
            "ean8",
            "upc_a",
            "upc_e",
            "code39",
            "code128",
          ],
        }} // Hier angepasst
        onBarcodeScanned={handleBarcodeScanned}
        onCameraReady={() => console.log("Kamera bereit")}
      >
        <SafeAreaView style={{ flex: 1, paddingTop: 40 }}>
          <View style={{ flex: 1, padding: 6 }}>
            {qrCodeDetected ? (
              <QRCodeButton handleOpenQRCode={handleOpenQRCode} />
            ) : null}

            <CameraTools
              cameraZoom={cameraZoom}
              cameraFlash={cameraFlash}
              cameraTorch={cameraTorch}
              setCameraZoom={setCameraZoom}
              setCameraFacing={setCameraFacing}
              setCameraTorch={setCameraTorch}
              setCameraFlash={setCameraFlash}
              reloadCamera={reloadCamera} // reloadCamera-Funktion übergeben
            />
            <MainRowActions
              isRecording={isRecording}
              handleTakePicture={
                cameraMode === "picture" ? handleTakePicture : toggleRecord
              }
              cameraMode={cameraMode}
            />
            <BottomRowTools
              cameraMode={cameraMode}
              setCameraMode={setCameraMode}
            />
          </View>
        </SafeAreaView>
      </CameraView>
    </Animated.View>
  );
}
