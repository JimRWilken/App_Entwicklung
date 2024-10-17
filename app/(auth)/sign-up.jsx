import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import { createUser } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Bitte füllen Sie alle Felder aus.");
    }

    setSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);
      router.replace("/Home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-secondary h-full">
      <ScrollView>
        <View className="w-full justify-center  items-center px-4">
          <Image
            source={images.logo_bite_safe}
            resizeMode="contain"
            style={{ width: 150, height: 150 }}
          ></Image>

          <FormField
            title="Benutzername" //Einstellungen für das Log in Feld für den Username
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          ></FormField>

          <FormField
            title="E-Mail:" //Einstellungen für das Log in Feld für die Email
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-2"
            keyboardType="email-adress"
          ></FormField>

          <FormField
            title="Passwort:" //Einstellungen für das Log in Feld für das Passwort
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          ></FormField>

          <CustomButton
            title="Registrieren"
            handlePress={submit}
            containerStyles=" w-full mt-7 justify-center items-center px-24"
            isLoading={isSubmitting}
          ></CustomButton>

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-black-100 font-pregular">
              Sie haben bereits ein Konto?
            </Text>

            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-blue-700"
            >
              Anmelden
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
