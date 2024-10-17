import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Bitte füllen Sie alle Felder aus.");
    }
    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      Alert.alert("Erfolgreiche Anmeldung!");
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
            title="Anmelden"
            handlePress={submit}
            containerStyles=" w-full mt-7 justify-center items-center px-24"
            isLoading={isSubmitting}
          ></CustomButton>

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-black-100 font-pregular">
              Sie haben kein Konto?
            </Text>

            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-blue-700"
            >
              Registrieren
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
