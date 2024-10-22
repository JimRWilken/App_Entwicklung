import { useState } from "react";
import { router, usePathname } from "expo-router";
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";

import { icons } from "../constants";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  const [isFocused, setIsFocused] = useState(false); // Zustand für Fokus

  const handleSearch = () => {
    if (query === "") {
      return Alert.alert("Fehlende Anfrage", "Bitte geben Sie etwas ein.");
    }

    // Überprüfen, ob der aktuelle Pfad "/search" ist
    if (pathname.startsWith("/search")) {
      const currentParams = router.getParams();
      // Überprüfen, ob die neue Abfrage von der aktuellen abweicht
      if (currentParams.query !== query) {
        router.setParams({ query });
      } else {
        // Optionale Rückkehr oder eine andere Aktion, wenn die Abfrage gleich bleibt
        Alert.alert(
          "Keine Änderung",
          "Sie haben bereits nach diesem Begriff gesucht."
        );
      }
    } else {
      router.push(`/search/${query}`);
    }
  };

  return (
    <View
      style={[
        styles.container,
        isFocused ? styles.focused : styles.unfocused, // Bedingtes Styling für Fokus
      ]}
    >
      <TextInput
        style={styles.input}
        value={query}
        placeholder="Nach Inhalten suchen..."
        placeholderTextColor="#AEB5BC"
        onChangeText={(text) => {
          if (text !== query) {
            setQuery(text); // Setzt den neuen Wert nur, wenn er sich geändert hat
          }
        }}
        onFocus={() => setIsFocused(true)} // Setzt den Zustand auf "fokussiert"
        onBlur={() => setIsFocused(false)} // Setzt den Zustand auf "nicht fokussiert"
      />

      <TouchableOpacity onPress={handleSearch}>
        <Image source={icons.search} style={styles.icon} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8E8E8",
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 2,
  },
  focused: {
    borderColor: "#4CAF50", // Farbe bei Fokussierung
  },
  unfocused: {
    borderColor: "#d1d5db", // Farbe im Normalzustand
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "HelveticaNeue",
    color: "#333",
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: "#52575D",
  },
});

export default SearchInput;
