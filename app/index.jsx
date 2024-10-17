import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { images } from "../constants";
import { CustomButton, Loader } from "../components";
import "react-native-url-polyfill/auto";
import { useGlobalContext } from "../context/GlobalProvider";

const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/Home" />;

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-secondary h-full">
        <Loader isLoading={loading} />
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="w-full justify-center items-center h-full px-4">
            {/* Logo */}
            <Image
              source={images.logo_bite_safe}
              resizeMode="contain"
              style={{ width: 150, height: 150 }}
            />

            {/* Einführungstext */}
            <View className="relative mt-14">
              <View className="bg-secondary-200 rounded-xl shadow mb-4 p-6">
                <Text className="text-3xl font-bold text-black-100 mb-4 text-center">
                  Willkommen bei BiteSafe!
                </Text>

                {/* Beschreibung */}
                <Text className="text-lg font-medium text-gray-700 leading-relaxed text-center mb-6">
                  Finde heraus, welche Lebensmittel für dich geeignet sind –
                  ganz einfach und schnell.
                </Text>
                <Text className="font-bold text-sm text-gray-700 mb-4">
                  1. Scanne den Barcode eines Produkts und erhalte sofortige
                  Ergebnisse zu den Inhaltsstoffen.
                </Text>
                <Text className="font-bold text-sm text-gray-700 mb-4">
                  2. Füge Produkte zu deinen Favoriten hinzu, um sie später
                  schnell wiederzufinden.</Text>
                  <Text className="font-bold text-sm text-gray-700">
                  3. Sichere dir ein unbeschwertes
                  Einkaufen – entscheide informiert mit BiteSafe!
                </Text>
              </View>

              {/* Button */}
              <CustomButton
                title="Entdecke die App"
                handlePress={() => router.push("/(auth)/sign-in")}
                containerStyles=" mt-14 justify-center items-center px-24"
                textStyle="text-white text-lg font-bold"
              />
            </View>
          </View>
        </ScrollView>

        <StatusBar backgroundColor="#161622" style="light" />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default Welcome;
