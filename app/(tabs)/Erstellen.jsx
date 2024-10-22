import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AntDesign } from "@expo/vector-icons";
import { CustomButton, FormField } from "../../components";
import { createRezeptPost } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import * as DocumentPicker from "expo-document-picker";

const Erstellen = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    titel: "",
    Zutaten: [],
    ZutatenProdukt: "",
    ZutatenMenge: "",
    ZutatenEinheit: "g",
    Bilder: null,
    Beschreibung: "",
  });

  const handleAddZutat = () => {
    if (form.ZutatenProdukt && form.ZutatenMenge) {
      const newZutat = `${form.ZutatenProdukt} ${form.ZutatenMenge} ${form.ZutatenEinheit}`;
      setForm({
        ...form,
        Zutaten: [...form.Zutaten, newZutat],
        ZutatenProdukt: "",
        ZutatenMenge: "",
        ZutatenEinheit: "g",
      });
    } else {
      Alert.alert("Bitte füllen Sie beide Felder für die Zutat aus.");
    }
  };
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
    if (form.titel === "" || form.Zutaten.length === 0) {
      return Alert.alert("Füllen Sie bitte alle Felder aus.");
    }

    setUploading(true);
    try {
      await createRezeptPost({
        ...form,
        Zutaten: form.Zutaten.join(", "),
        userId: user.$id,
      });
      Alert.alert("Erfolgreich", "Rezept wurde erfolgreich hochgeladen.");
      // Hier könntest du eine Navigation zurück zur Home-Seite einfügen
    } catch (error) {
      Alert.alert("Fehler", error.message);
    } finally {
      setForm({
        titel: "",
        Zutaten: [],
        Bilder: null,
        Beschreibung: "",
      });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerText}>Erstelle ein Rezept</Text>

        <FormField
          title="Titel des Rezepts:"
          value={form.titel}
          placeholder="Geben Sie dem Rezept einen Namen..."
          handleChangeText={(e) => setForm({ ...form, titel: e })}
          otherStyles={styles.formField}
        />

        {/* Zutateneingabe: Produkt, Menge und Einheit */}
        <View style={styles.zutatContainer}>
          <TextInput
            value={form.ZutatenProdukt}
            placeholder="Produkt (z.B. Milch)"
            onChangeText={(text) => setForm({ ...form, ZutatenProdukt: text })}
            style={[styles.input, styles.productInput]}
          />
          <TextInput
            value={form.ZutatenMenge}
            placeholder="Menge"
            onChangeText={(text) => setForm({ ...form, ZutatenMenge: text })}
            style={styles.input}
          />
          <TouchableOpacity style={styles.pickerContainer}>
            <Picker
              selectedValue={form.ZutatenEinheit}
              style={styles.picker}
              itemStyle={styles.pickerItem} // Custom style for the picker items
              onValueChange={(itemValue) =>
                setForm({ ...form, ZutatenEinheit: itemValue })
              }
            >
              <Picker.Item label="g" value="g" />
              <Picker.Item label="kg" value="kg" />
              <Picker.Item label="ml" value="ml" />
              <Picker.Item label="l" value="l" />
              <Picker.Item label="Stk." value="Stk." />
            </Picker>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleAddZutat} style={styles.addButton}>
            <AntDesign name="pluscircle" size={24} color="#FFF" />
            <Text style={styles.buttonText}>Zutat hinzufügen</Text>
          </TouchableOpacity>
        </View>

        {/* Anzeige der hinzugefügten Zutaten */}
        <View style={styles.zutatenList}>
          <Text style={styles.Text}>Zutaten: </Text>
          {form.Zutaten.map((zutat, index) => (
            <Text key={index} style={styles.zutatText}>
              {zutat}
            </Text>
          ))}
        </View>
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

        <FormField
          title="Beschreibung:"
          value={form.Beschreibung}
          placeholder="Tragen Sie hier die Beschreibung ein..."
          handleChangeText={(e) => setForm({ ...form, Beschreibung: e })}
          otherStyles={styles.formField}
        />

        <CustomButton
          title="Erstellen"
          handlePress={submit}
          containerStyles={styles.submitButton}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  scrollContainer: {
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#52575D",
    marginBottom: 40,
  },
  formField: {
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  uploadText: {
    color: "#FFF",
    fontSize: 16,
  },
  zutatContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 80,
    marginBottom: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: "#CED4DA",
    borderRadius: 10,
    padding: 18,
    flex: 1,
    marginRight: 8,
    backgroundColor: "#F8F9FA",
  },
  productInput: {
    flex: 2, // Erhöhung der Flexibilität für das Produktfeld
    borderWidth: 2,
    borderColor: "#CED4DA",
    borderRadius: 10,
    backgroundColor: "#F8F9FA",
    padding: 18, // Padding für mehr Innenabstand
    marginRight: 8, // Abstand zum nächsten Element
  },

  pickerContainer: {
    flex: 1,
    borderWidth: 2, // Reduzierung auf 2 für einen subtileren Look
    borderColor: "#CED4DA",
    borderRadius: 10,
    backgroundColor: "#F8F9FA",
    overflow: "hidden", // Korrigiert von "scroll" auf "hidden"
  },

  picker: {
    height: 50,
    width: "100%", // Breite auf 100% setzen für volle Nutzung des Containers
    paddingVertical: 0,
    color: "#495057", // Textfarbe für die ausgewählten Elemente
    backgroundColor: "#F8F9FA", // Hintergrundfarbe für bessere Sichtbarkeit
  },

  pickerItem: {
    height: 50, // Adjust height for better visibility of selected item
    color: "#52575D", // Color for picker items
    width: 100,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#28A745",
    padding: 18,
    borderRadius: 10,
    flex: 1,
    marginRight: 9,
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    marginLeft: 8,
  },
  zutatenList: {
    marginBottom: 20,
  },
  zutatText: {
    color: "#495057",
    fontSize: 14,
    marginVertical: 4,
  },
  submitButton: {
    marginTop: 20,
  },
  Text: {
    fontSize: 20,
  },
});

export default Erstellen;
