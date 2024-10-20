import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, FONTS } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons"; // Korrekte Importpfadangabe
import { router, useRouter } from "expo-router";

const Profile = () => {
  const router = useRouter();
  return (
    <View className="bg-secondary flex-1">
      <ScrollView className="flex-1 px-4 mt-10">
        <View className="mx-3 flex-row justify-center">
          <TouchableOpacity
            onPress={() => router.replace("/Home")} // Router replace verwenden
            className="absolute left-0"
          >
            <MaterialIcons
              name="keyboard-arrow-left"
              size={24}
              color={Colors.dark}
            />
          </TouchableOpacity>

          <Text className="font-light text-dark">Profil verwalten</Text>
        </View>
        <ScrollView>
          
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default Profile;
