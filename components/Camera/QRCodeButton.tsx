import { TouchableOpacity } from "react-native";
import IconButton from "./IconButton";
import { ThemedText } from "../ThemedText";

interface QRCodeButton {
  handleOpenQRCode: () => void;
}
export default function QRCodeButton({ handleOpenQRCode }: QRCodeButton) {
  return (
    <TouchableOpacity
      onPress={handleOpenQRCode}
      style={{
        width: 250,
        alignItems: "center",
        top: "25%",
        alignSelf: "center",
        padding: 70,
        borderWidth: 5,
        borderRadius: 5,
        borderStyle: "dashed",
        borderColor: "white",
      }}
    >
      <IconButton
        iosName="qrcode"
        androidName="qr-code"
      />
      <ThemedText
        type="defaultSemiBold"
        style={{
          color: "white", // Schriftgröße anpassen
        }}
      >
        QR Code erkannt
      </ThemedText>
    </TouchableOpacity>
  );
}
