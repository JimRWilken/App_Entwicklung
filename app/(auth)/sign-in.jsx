import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Alert, Image, StyleSheet } from "react-native";

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
      Alert.alert("Fehler", "Bitte füllen Sie alle Felder aus.");
      return; // Beende die Funktion, wenn das Formular ungültig ist
    }
    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      router.replace("/Home");
    } catch (error) {
      Alert.alert("Fehler", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.innerContainer}>
          <Image
            source={images.logo_bite_safe}
            resizeMode="contain"
            style={styles.logo}
          />

          <FormField
            title="E-Mail:"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-2"
            placeholder="E-Mail eingeben"
            keyboardType="email-address"
          />

          <FormField
            title="Passwort:"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles=" "
            placeholder="Passwort eingeben"
          />

          <CustomButton
            title="Anmelden"
            handlePress={submit}
            containerStyles={styles.buttonContainer}
            isLoading={isSubmitting}
          />

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Sie haben kein Konto?</Text>
            <Link href="/sign-up" style={styles.registerLink}>
              Registrieren
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7", // Hintergrundfarbe
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  innerContainer: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  fieldMargin: {
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0a0a",
    borderRadius: 10,
    width: 350,
  },
  registerContainer: {
    justifyContent: "center",
    paddingTop: 20,
    flexDirection: "row",
  },
  registerText: {
    fontSize: 16,
    color: "#333",
  },
  registerLink: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "bold",
    marginLeft: 5,
  },
  header: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  welcomeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  welcomeText: {
    fontFamily: "HelveticaNeue",
    fontSize: 14,
    color: "#52575D",
  },
});

export default SignIn;
