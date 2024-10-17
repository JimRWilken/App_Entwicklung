import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";

import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getAllRezepte, getCurrentUser } from "../../lib/appwrite";
import { EmptyState, SearchInput, Trending } from "../../components";
import { useEffect } from "react";
import Rezeptevorschau from "../../components/Rezeptevorschau";
import { useGlobalContext } from "../../context/GlobalProvider";


const Home = () => {
  const { data: posts } = useAppwrite(getAllRezepte); //Hook aufruf um alle Rezeptte aus der useappwrite zu erhalten
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => { //refresh funktion = daten nachladen aus DB
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const { user } = useGlobalContext(); // Nutze einen globalen Context oder API-Aufruf
  const { username, avatar } = user;


  return (
    <SafeAreaView className="bg-secondary h-full">
      <FlatList
        data={posts} //hier geben wir der flatlist das objekt 
        //data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Rezeptevorschau rezept = {item}>

          </Rezeptevorschau>
          )}
        ListHeaderComponent={() => (
          <View className="flex my-3 px-4 space-y-6">
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

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-black mb-3">
                Inhalte
              </Text>
               <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []} />
            </View>
          </View>
        )} //Inhalte sollen später sowas wie rezepte enthalten, die Nutzer erstellejn und teilen können, im idealfall auch dann passende zu den Kriterien des Profils mit den Unverträglichkeiten
        ListEmptyComponent={() => (
          <EmptyState
            title="Keine Inhalte gefunden"
            subtitle="Es wurden noch keine Inhalte erstellt"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
