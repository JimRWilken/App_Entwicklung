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
      <SafeAreaView className="bg-primary h-full">
        <Loader isLoading={loading} />
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="w-full justify-center items-center h-full px-4">
            <Image
              source={images.logo_bite_safe}
              resizeMode="contain"
              style={{ width: 150, height: 150 }}
            />
            <View className="relative mt-72">
              {/*<Text className = 'text-3xl text-white font-bold text-center text-secondary-200'> Entdecke die App </Text>*/}

              <CustomButton
                title="Entdecke die App"
                handlePress={() => router.push("/(auth)/sign-in")}
                containerStyles=" mt-30 justify-center items-center px-24"
              />
            </View>
          </View>
        </ScrollView>

        <StatusBar backgroundColor="#161622" style="light"></StatusBar>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Welcome;
