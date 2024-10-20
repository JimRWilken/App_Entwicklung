import * as React from "react";
import { SymbolView } from "expo-symbols";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Asset, getAlbumsAsync, getAssetsAsync } from "expo-media-library";
import { Image } from "expo-image";
import { CameraMode } from "expo-camera";
import { Colors } from "@/constants/Colors";

interface MainRowActionsProps {
  handleTakePicture: () => void;
  cameraMode: CameraMode;
  isRecording: boolean;
}
export default function MainRowActions({
  cameraMode,
  handleTakePicture,
  isRecording,
}: MainRowActionsProps) {
  const [assets, setAssets] = React.useState<Asset[]>([]);

  React.useEffect(() => {
    getAlbums();
  }, []);

  async function getAlbums() {
    const fetchedAlbums = await getAlbumsAsync();

    // Recents album
    const albumAssets = await getAssetsAsync({
      album: fetchedAlbums.find((album) => album.title === "Recentsd"),
      mediaType: "photo",
      sortBy: "creationTime",
      first: 4,
    });
    setAssets(albumAssets.assets);
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleTakePicture}
          style={styles.buttonContainer}
        >
          <SymbolView
            name={
              cameraMode === "picture"
                ? "circle"
                : "circle.circle"
            }
            size={100}
            type="hierarchical"
            
            fallback={
              <TouchableOpacity
                onPress={handleTakePicture}
                style={{
                  width: 90,
                  height: 90,
                  borderWidth: 3,
                  borderColor: "white",
                  borderRadius: 45,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>{cameraMode === "picture" ? "📷" : "🎥"}</Text>
              </TouchableOpacity>
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    position: "absolute",
    bottom: 40,
  },
  buttonContainer: {
    justifyContent: "center", // Zentriert den Inhalt des Buttons vertikal
    alignItems: "center", // Zentriert den Inhalt des Buttons horizontal
  },
});
