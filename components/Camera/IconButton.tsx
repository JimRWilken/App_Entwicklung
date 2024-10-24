import { ComponentProps } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { SFSymbol, SymbolView } from "expo-symbols";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { Link } from "expo-router";

const CONTAINER_PADDING = 6;
const CONTAINER_WIDTH = 42;
const ICON_SIZE = 35;

interface IconButtonProps {
  iosName: SFSymbol;
  androidName: ComponentProps<typeof Ionicons>["name"];
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  width?: number;
  height?: number;
}
export default function IconButton({
  onPress,
  androidName,
  iosName,
  containerStyle,
  height,
  width,
}: IconButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={[
        {
          backgroundColor: "#00000050",
          padding: CONTAINER_PADDING,
          borderRadius: (CONTAINER_WIDTH + CONTAINER_PADDING * 2) / 4,
          width: CONTAINER_WIDTH,
          alignItems: 'center'
        },
        containerStyle,
      ]}
    >
      <SymbolView
        name={iosName}
        size={ICON_SIZE}
        // type="hierarchical"
        style={
          width && height //this won't scale :(
            ? {
                width,
                height,
              }
            : {}
        }
        tintColor={"white"}
        fallback={
          <Ionicons
            size={ICON_SIZE}
            name={androidName}
            style={{}}
            color={"white"}
          />
        }
      />
    </TouchableOpacity>
  );
}
