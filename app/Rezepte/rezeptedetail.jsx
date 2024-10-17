import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native";

const RezeptDetail = () => {
  const route = useRoute(); // Holt die übergebenen Parameter
  const { titel, Zutaten, Beschreibung, Bilder, username, avatar } =
    route.params; // Rezeptdaten

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="flex-1 bg-primary">
        {/* Rezeptbild */}
        <View className="rounded-xl shadow mt-2 mb-3 mx-3">
          <Image
            source={{ uri: Bilder }}
            className="w-full h-72 rounded-xl shadow-lg"
            resizeMode="cover"
            style={{ borderWidth: 1, borderColor: "#ddd" }}
          />
        </View>

        {/* Titel und Benutzerinfo */}
        <View className="bg-white rounded-xl shadow p-3 mb-3 mx-3">
          <Text className="text-3xl font-bold text-gray-800 mb-3">{titel}</Text>
          <View className="flex-row items-center">
            <Image
              source={{ uri: avatar }}
              className="w-12 h-12 rounded-full mr-4"
              resizeMode="cover"
            />
            <Text className="text-sm text-gray-500">Rezept von {username}</Text>
          </View>
        </View>

        {/* Zutatenliste */}
        <View className="bg-white rounded-xl shadow p-3 mb-3 mx-3">
          <Text className="text-2xl font-semibold text-gray-800 mb-3">
            Zutaten
          </Text>
          <Text className="text-sm text-gray-600">{Zutaten}</Text>
        </View>

        {/* Beschreibung */}
        <View className="bg-white rounded-xl shadow p-3 mb-3 mx-3">
          <Text className="text-2xl font-semibold text-gray-800 mb-3">
            Beschreibung
          </Text>
          <Text className="text-base text-gray-700 leading-relaxed">
            {Beschreibung}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RezeptDetail;
