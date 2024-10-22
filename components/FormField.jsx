import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";

// Definiere die Styles außerhalb der Komponente
const styles = {
  container: {
    width: "100%",
    height: 64, // Höhe des Eingabefeldes
    paddingHorizontal: 16, // Padding an den Seiten
    backgroundColor: "#f0f4f8", // Hintergrundfarbe des Eingabefeldes
    borderRadius: 16, // Abrundung der Ecken
    flexDirection: "row", // Anordnung der Elemente in einer Zeile
    alignItems: "center", // Vertikale Zentrierung der Elemente
    borderWidth: 2, // Randbreite
    width: 350,
  },
  title: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600", // Schriftgewicht für den Titel
  },
  input: {
    flex: 1, // Flexibel für die Breite
    fontSize: 16,
    color: "#000", // Textfarbe
    fontWeight: "600", // Schriftgewicht für den TextInput
  },
  placeholder: {
    color: "#808080", // Farbe des Platzhalters
  },
  focused: {
    borderColor: "#4CAF50", // Farbe bei Fokussierung
  },
  unfocused: {
    borderColor: "#d1d5db", // Farbe im Normalzustand
  },
};

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // Zustand für Fokussierung

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text style={styles.title}>{title}</Text>

      <View
        style={[
          styles.container,
          isFocused ? styles.focused : styles.unfocused, // Anwenden der Fokus-Styles
        ]}
      >
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={styles.placeholder.color}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Passwort:" && !showPassword}
          onFocus={() => setIsFocused(true)} // Setzt isFocused auf true
          onBlur={() => setIsFocused(false)} // Setzt isFocused auf false
          {...props}
        />

        {title === "Passwort:" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eyeHide2 : icons.eye2}
              style={{ width: 24, height: 24 }} // Icons Größe
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
