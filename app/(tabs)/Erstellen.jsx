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
    <View className="bg-secondary flex-1">
      <ScrollView className=" flex-1 px-4 mt-10">
        <Text className="text-xl text-black-100 font-psemibold">
          Erstelle Sie ein Rezept, dass andere sehen können
        </Text>

        <FormField
          title="Titel des Rezepts:"
          value={form.titel}
          placeholder="Geben Sie dem Rezept einen Namen..."
          handleChangeText={(e) => setForm({ ...form, titel: e })}
          otherStyles="mt-10"
        />
        <FormField
          title="Zutaten:"
          value={form.Zutaten}
          placeholder="Tragen Sie hier ihre Zutaten ein..."
          handleChangeText={(e) => setForm({ ...form, Zutaten: e })}
          otherStyles="mt-2"
        />
        <FormField
          title="Beschreibung:"
          value={form.Beschreibung}
          placeholder="Tragen Sie hier ihre Zutaten ein..."
          handleChangeText={(e) => setForm({ ...form, Beschreibung: e })}
          otherStyles="mt-2"
        />

        <View className="mt-7 space-y-2">
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.Bilder ? (
              <Image
                source={{ uri: form.Bilder.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View className="w-50 h-50 bg-blue-100 rounded-2xl border border-secondary-200 flex justify-center items-center">
                <View className="w-full h-20 border rounded-2xl border-dashed border-secondary-100 flex justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-16 h-16"
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
    </View>
  );
};

export default Erstellen;
