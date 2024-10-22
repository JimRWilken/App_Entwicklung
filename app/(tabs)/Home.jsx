import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getAllRezepte } from "../../lib/appwrite";
import { EmptyState, SearchInput } from "../../components";
import Rezeptevorschau from "../../components/Rezeptevorschau";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";

const categories = [
  { id: "1", name: "Frühstück" },
  { id: "2", name: "Mittagessen" },
  { id: "3", name: "Abendessen" },
  { id: "4", name: "Desserts" },
];

const Home = () => {
  const { data: posts, loading, refetch } = useAppwrite(getAllRezepte);
  const [refreshing, setRefreshing] = useState(false);
  const [showMore, setShowMore] = useState(false); // Zustand für "mehr anzeigen"

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const onPress = () => {
    router.push("/(tabs)/profile");
  };

  const { user } = useGlobalContext();
  const { username, avatar } = user;

  const visiblePosts = posts.slice(0, 5);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={!showMore ? visiblePosts : []} // Wenn nicht "Mehr anzeigen", zeige nur 5 Rezepte
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <Rezeptevorschau rezept={item} />}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <View style={styles.welcomeContainer}>
              <View>
                <Text style={styles.welcomeText}>Willkommen</Text>
                <Text style={styles.usernameText}>{username}</Text>
              </View>
              <TouchableOpacity onPress={onPress}>
                <Image
                  source={{ uri: avatar }}
                  style={styles.avatar}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
            <SearchInput />
            <View style={styles.contentSection}>
              {/* Kategorien */}
              <View style={styles.categoriesSection}>
                <Text style={styles.contentTitle}>Kategorien</Text>
                <FlatList
                  horizontal
                  data={categories}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.categoryCard}>
                      <Text style={styles.categoryText}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.id}
                />
              </View>
              {/* Beliebte Rezepte */}
              <View style={styles.recommendedSection}>
                <Text style={styles.contentTitle}>Beliebte Rezepte</Text>
                <FlatList
                  horizontal
                  data={visiblePosts}
                  keyExtractor={(item) => item.$id}
                  renderItem={({ item }) => <Rezeptevorschau rezept={item} />}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.horizontalList}
                />
              </View>

              {/* Button zum Umschalten auf die vertikale FlatList */}
              {posts.length > 5 && (
                <TouchableOpacity
                  style={styles.showMoreButton}
                  onPress={() => setShowMore(!showMore)}
                >
                  <Text style={styles.showMoreText}>
                    {showMore ? "Weniger anzeigen" : "Mehr anzeigen"}
                  </Text>
                </TouchableOpacity>
              )}

              {/* Vertikale FlatList, die bei Klick auf den Button angezeigt wird */}
              {showMore && (
                <FlatList
                  data={posts}
                  keyExtractor={(item) => item.$id}
                  renderItem={({ item }) => <Rezeptevorschau rezept={item} />}
                  contentContainerStyle={styles.verticalList}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  ListEmptyComponent={() => (
                    <EmptyState
                      title="Keine Inhalte gefunden"
                      subtitle="Es wurden noch keine Inhalte erstellt"
                    />
                  )}
                />
              )}
            </View>
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
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  contentContainer: {
    paddingTop: 30,
    paddingBottom: 20,
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
  usernameText: {
    fontFamily: "HelveticaNeue-Bold",
    fontSize: 24,
    color: "#52575D",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderColor: "#DFD8C8",
    borderWidth: 1,
  },
  contentSection: {
    marginTop: 16,
  },
  categoriesSection: {
    marginTop: 16,
    marginBottom: 16,
  },
  categoryCard: {
    backgroundColor: "#F0F0F0",
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  categoryText: {
    fontSize: 16,
    color: "#52575D",
  },
  recommendedSection: {
    marginTop: 16,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#52575D",
    marginBottom: 10,
  },
  showMoreButton: {
    marginTop: 20,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginHorizontal: 16,
  },
  showMoreText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007BFF",
  },
  verticalList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});

export default Home;
