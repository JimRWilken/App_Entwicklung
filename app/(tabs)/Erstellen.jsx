import { useState } from "react";
import { router } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { icons } from "../../constants";
import { createRezeptPost } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const Erstellen = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    titel: "",
    Zutaten: "",
    Bilder: null,
    Beschreibung: "",
  });

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: selectType === "image" ? ["image/png", "image/jpg"] : "*/*",
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          Bilder: result.assets[0],
        });
      }
    }
  };

  const submit = async () => {
    if (form.titel === "") {
      return Alert.alert("Füllen Sie bitte alle Felder aus.");
    }

    setUploading(true);
    try {
      await createRezeptPost({
        ...form,
        userId: user.$id,
      });
      Alert.alert("Erfolgreich", "Rezepte wurde erfolgreich hochgeladen.");
      router.push("/Home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        titel: "",
        Bilder: null,
        Beschreibung: "",
        Zutaten: "",
      });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">
          Rezept hochladen
        </Text>

        <FormField
          title="Video Title"
          value={form.titel}
          placeholder="Give your video a catchy title..."
          handleChangeText={(e) => setForm({ ...form, titel: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>

          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.Bilder ? (
              <Image
                source={{ uri: form.Bilder.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View className="w-full h-40 bg-blue-100 rounded-2xl border border-black-200 flex justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-12 h-12"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <CustomButton
          title="Erstellen"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Erstellen;
