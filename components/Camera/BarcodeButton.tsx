import { TouchableOpacity } from "react-native";
import IconButton from "./IconButton";
import { ThemedText } from "../ThemedText";


interface BarcodeButton {
  handleBarcodeScanned: () => void;
}
export default function BarcodeButton({ handleBarcodeScanned }: BarcodeButton) {
  return (
    <TouchableOpacity
      onPress={handleBarcodeScanned}
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
      <IconButton iosName="barcode.viewfinder" androidName="barcode-sharp" />
      <ThemedText
        type="defaultSemiBold"
        style={{
          color: "white", // Schriftgröße anpassen icons auch anpassen
        }}
      >
        Barcode erkannt
      </ThemedText>
    </TouchableOpacity>
  );
}
