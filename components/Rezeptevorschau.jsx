import { useState } from "react";
import { ResizeMode } from "expo-av";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";
import { icons } from "../constants";

const Rezeptevorschau = ({
  rezept: {
    titel,
    Zutaten,
    Beschreibung,
    Bilder,
    user: { username, avatar },
  },
}) => {
  const handlePress = () => {
    router.push({
      pathname: "/Rezepte/rezeptedetail",
      params: {
        titel,
        Zutaten,
        Beschreibung,
        Bilder,
        username,
        avatar,
      },
    });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex flex-col items-center px-4 mb-5"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <View className="gap-2 bg-white p-1.5 w-full shadow-md rounded-xl min-h-[60px] flex flex-row justify-center items-center">
        {/* Avatar Bild mit abgerundeten Ecken */}
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[50px] h-[50px] rounded-full border border-gray-300 flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-full"
              resizeMode="cover"
            />
          </View>

          {/* Titel und Username */}
          <View className="flex justify-center flex-1 ml-4 gap-y-1">
            <Text
              className="font-semibold text-base text-gray-900"
              numberOfLines={1}
            >
              {titel}
            </Text>
            <Text className="text-xs text-gray-500" numberOfLines={1}>
              {username}
            </Text>
          </View>
        </View>

        {/* Menü Icon */}
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Rezeptevorschau;
