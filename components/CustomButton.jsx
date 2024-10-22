import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

// Definiere die Styles außerhalb der Komponente
const styles = {
  button: {
    backgroundColor: "#0a0a0a", // Hintergrundfarbe
    width: "100%", // Breite des Buttons
    borderRadius: 16, // Abrundung der Ecken
    minHeight: 60, // Minimale Höhe
    flexDirection: "row", // Anordnung der Elemente in einer Zeile
    justifyContent: "center", // Horizontale Zentrierung
    alignItems: "center", // Vertikale Zentrierung
  },
  text: {
    color: "#fff", // Textfarbe
    fontSize: 18, // Schriftgröße
    fontWeight: "600", // Schriftgewicht
    textAlign: "center", // Textzentrierung
  },
};

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[styles.button, containerStyles]} // Kombinieren von Button-Stilen mit zusätzlichen Container-Styles
      disabled={isLoading}
    >
      <Text style={[styles.text, textStyles]}>{title}</Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          style={{ marginLeft: 8 }} // Abstand zwischen Text und Loader
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
