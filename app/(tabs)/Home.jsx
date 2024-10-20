import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getAllRezepte } from "../../lib/appwrite";
import { EmptyState, SearchInput, Trending } from "../../components";
import Rezeptevorschau from "../../components/Rezeptevorschau";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  // Hook-Aufruf, um alle Rezepte aus der Datenbank zu erhalten
  const { data: posts, loading, refetch } = useAppwrite(getAllRezepte); // Hook verwendet getAllRezepte, um Rezepte abzurufen

  // Refresh-Zustand für das Pull-to-Refresh-Feature
  const [refreshing, setRefreshing] = useState(false);

  // Funktion, um Daten neu zu laden (bei Pull-to-Refresh)
  const onRefresh = async () => {
    setRefreshing(true); // Zeigt den Refresh-Indikator an
    await refetch(); // Daten neu laden
    setRefreshing(false); // Beendet den Refresh-Indikator
  };

  // Globale Daten vom Benutzer, z.B. username und avatar
  const { user } = useGlobalContext();
  const { username, avatar } = user;

  return (
    <View className="bg-secondary h-full">
      {/* FlatList zur Anzeige der Posts */}
      <FlatList
        className="mt-10"
        data={posts} // Daten für die FlatList sind die abgerufenen Rezepte
        keyExtractor={(item) => item.$id} // Verwende die ID als eindeutigen Schlüssel
        renderItem={({ item }) => (
          <Rezeptevorschau rezept={item} /> // Anzeige jedes Rezepts in der Liste
        )}
        ListHeaderComponent={() => (
          <View className="flex my-3 px-4 mt-8 space-y-6">
            {/* Willkommensnachricht mit Benutzerinformationen */}
            <View className="flex justify-between items-start flex-row mb-5">
              <View>
                <Text className="font-pmedium text-sm text-black-100">
                  Willkommen
                </Text>
                <Text className="text-2xl font-psemibold text-black-100">
                  {username}
                </Text>
              </View>

              <View className="mt-2">
                <Image
                  source={{ uri: avatar }}
                  className="w-10 h-10 rounded-full"
                  resizeMode="contain"
                />
              </View>
            </View>

            {/* Suchfeld */}
            <SearchInput />

            {/* Abschnitt für Inhalte */}
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-black mb-3">
                Inhalte
              </Text>
              {/* Beispiel-Trending-Komponente */}
              <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []} />
            </View>
          </View>
        )}
        // Falls keine Inhalte gefunden wurden, wird diese Komponente angezeigt
        ListEmptyComponent={() => (
          <EmptyState
            title="Keine Inhalte gefunden"
            subtitle="Es wurden noch keine Inhalte erstellt"
          />
        )}
        // RefreshControl für Pull-to-Refresh
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default Home;
