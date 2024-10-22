import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppwrite from "../../lib/useAppwrite";
import { searchPosts } from "../../lib/appwrite";
import { EmptyState, SearchInput } from "../../components";
import Rezeptevorschau from "../../components/Rezeptevorschau";

const Search = () => {
  const { query: initialQuery } = useLocalSearchParams();
  const [query, setQuery] = useState(initialQuery || "");
  const {
    data: posts,
    refetch,
    isLoading,
  } = useAppwrite(() => searchPosts(query), { enabled: !!query });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return; // Abbruch, wenn die Abfrage leer ist
      setLoading(true);
      try {
        await refetch(); // Daten abrufen
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false); // Ladezustand zurücksetzen
      }
    };

    fetchData(); // Die Daten abrufen, wenn query nicht leer ist
  }, [query]); // Nur auf query hören

  useEffect(() => {
    console.log("Fetched posts:", posts);
  }, [posts]);

  if (loading || isLoading) {
    return (
      <SafeAreaView className="bg-primary h-full flex justify-center items-center">
        <ActivityIndicator size="large" color="#ffffff" />
      </SafeAreaView>
    );
  }

  const documents = posts?.documents || [];

  if (!Array.isArray(documents)) {
    return (
      <SafeAreaView className="bg-primary h-full flex justify-center items-center">
        <Text className="text-white">Keine Daten gefunden.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={documents}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          if (!item) return null;

          const { titel, Bilder, Zutaten, Beschreibung, user } = item;
          const username = user?.username || "Unbekannt";
          const avatar = user?.avatar || null;

          return (
            <Rezeptevorschau
              titel={titel || "Kein Titel verfügbar"}
              Bilder={Bilder || []}
              Zutaten={Zutaten || []}
              user={username}
              avatar={avatar}
              Beschreibung={Beschreibung || "Keine Beschreibung verfügbar"}
            />
          );
        }}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4">
            <Text className="font-pmedium text-gray-100 text-sm">
              Search Results
            </Text>
            <Text className="text-2xl font-psemibold text-white mt-1">
              {query}
            </Text>
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} setQuery={setQuery} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Keine Ergebnisse gefunden"
            subtitle="Keine Videos für diese Suchanfrage gefunden."
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
