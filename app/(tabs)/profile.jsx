import { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Animated, // Für die Animation importieren
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker"; // Expo Image Picker importieren
import useAppwrite from "../../lib/useAppwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState } from "../../components";
import Rezeptevorschau from "../../components/Rezeptevorschau";
import {
  getUserRezepte,
  updateAvatar,
  getCurrentUser,
} from "../../lib/appwrite";
import AnimatedHeaderProfil from "../../components/AnimatedHeaderProfil"; // Default-Import korrekt anwenden
// Funktion zum Aktualisieren des Avatars importieren

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts, loading, refetch } = useAppwrite(getUserRezepte);

  const [refreshing, setRefreshing] = useState(false);

  // Animated Value für die Scroll-Position
  const offset = useRef(new Animated.Value(0)).current;

  // Icon Größe und Position abhängig vom Scroll-Offset
  const iconSize = offset.interpolate({
    inputRange: [0, 150],
    outputRange: [30, 20], // Reduziert die Größe beim Scrollen
    extrapolate: "clamp",
  });

  const iconPosition = offset.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -50], // Bewegt das Icon nach oben beim Scrollen
    extrapolate: "clamp",
  });

  // Funktion zum Öffnen des Image Pickers und Aktualisieren des Avatars
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Extrahiere den URI des Bildes
      const avatarUri = result.assets[0].uri;

      console.log("Selected Image URI:", avatarUri);
      const currentuser = await getCurrentUser();
      if (!currentuser) throw new Error("Kein Benutzer angemeldet.");

      // Hier kannst du die Funktion aufrufen, um das Avatar zu aktualisieren
      await updateAvatar({ avatarUri, currentuser });
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Animated Header */}
      <AnimatedHeaderProfil animatedValue={offset} />

      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <Rezeptevorschau rezept={item} />}
        ListHeaderComponent={() => (
          <View style={{ paddingTop: 50 }}>
            <View style={{ alignSelf: "center" }}>
              <View style={styles.profileImage}>
                <Image
                  source={{ uri: user?.avatar }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>

              <TouchableOpacity style={styles.add} onPress={pickImage}>
                <MaterialIcons
                  name="edit"
                  size={30}
                  color="#808080"
                  style={{ marginTop: 6, marginLeft: 2 }}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.usernameText}>{user?.username}</Text>
              <Text style={[styles.text, { color: "#808080", fontSize: 18 }]}>
                {user?.email}
              </Text>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statsBox}>
                <Text style={[styles.text, { fontSize: 24 }]}>
                  {posts.length || 0}
                </Text>
                <Text style={[styles.text, styles.subText]}>Rezepte</Text>
              </View>
            </View>

            <Text style={[styles.subText, styles.recent]}>
              Erstelle Rezepte:
            </Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Keine Inhalte gefunden"
            subtitle="Es wurden noch keine Inhalte erstellt"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        // Scroll-Events überwachen und die Animation updaten
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
    marginRight: 10,
  },
  button: {
    marginLeft: 310,
  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "#52575D",
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: "hidden",
    borderWidth: 2,
    paddingTop: 0,
    borderColor: "#808080",
  },
  add: {
    backgroundColor: "#f8faf7",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#254520",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  subText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#52575D",
    marginBottom: 10,
  },
  usernameText: {
    fontFamily: "HelveticaNeue-Bold",
    fontSize: 24,
    color: "#52575D",
    marginBottom: 10,
  },
  recent: {
    marginLeft: 20,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 18,
  },
});

export default Profile;
