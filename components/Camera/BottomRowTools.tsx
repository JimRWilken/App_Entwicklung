import * as React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import IconButton from "../Camera/IconButton";
import { Link } from "expo-router";
import { ThemedText } from "../ThemedText";
import { CameraMode } from "expo-camera";

interface BottomRowToolsProps {
  cameraMode: CameraMode;
  setCameraMode: React.Dispatch<React.SetStateAction<CameraMode>>;
}
export default function BottomRowTools({
  cameraMode,
  setCameraMode,
}: BottomRowToolsProps) {
  return (
    <View style={[styles.bottomContainer, styles.directionRowItemsCenter]}>
      <Link href={"/Scannen"} asChild>
        <IconButton androidName="arrow-back" iosName="arrow.backward" />
      </Link>
      <View style={styles.directionRowItemsCenter}>
        <TouchableOpacity
          onPress={() => setCameraMode("picture")}
        ></TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  directionRowItemsCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bottomContainer: {
    width: "100%",
    justifyContent: "space-between",
    position: "absolute",
    alignSelf: "center",
    top: 1,
  },
});
