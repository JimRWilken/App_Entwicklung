import { View, Text, Image, Animated } from "react-native";
import { Tabs, Redirect } from "expo-router";
import { icons } from "../../constants";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Loader } from "../../components";
import { useEffect, useRef } from "react";

const TabIcon = ({ icon, color, name, focused }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

    const { user } = useGlobalContext();
    const { username, avatar } = user;

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: focused ? 1.2 : 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", marginTop: 15 }}
    >
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        {name === "Profil" && avatar ? (
          <Image
            source={{ uri: user?.avatar }} // Avatar-URL hier verwenden
            style={{ width: 25, height: 25, borderRadius: 15 }} // Avatar-Stil
          />
        ) : (
          <Image
            source={icon}
            resizeMode="contain"
            tintColor={color}
            style={{ width: 22, height: 22 }} // Größe der Icons angepasst
          />
        )}
      </Animated.View>
      <Text
        style={{
          color: color,
          fontWeight: focused ? "bold" : "normal", // Fett bei Fokussierung
          fontSize: focused ? 11 : 9, // Schriftgröße ändern
          marginTop: 5, // Abstand zwischen Icon und Text
        }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && !isLogged) return <Redirect href="/sign-in" />;

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#fafafa", // Aktive Farbe
          tabBarInactiveTintColor: "#fafafa", // Inaktive Farbe
          tabBarShowLabel: false, // Beschriftungen anzeigen
          tabBarStyle: {
            backgroundColor: "#254520",
            borderTopWidth: 0,
            height: 75,
            elevation: 10, // Schatten für die Tabbar hinzufügen
          },
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            title: "Startseite",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Startseite"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Krankheiten"
          options={{
            title: "Krankheiten",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.magen}
                color={color}
                name="Krankheiten"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Scannen"
          options={{
            title: "Scannen",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.barcode}
                color={color}
                name="Scannen"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Erstellen"
          options={{
            title: "Erstellen",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="Erstellen"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profil",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profil"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
      <Loader isLoading={loading} />
      <StatusBar backgroundColor="#4CAF50" style="dark" />
    </>
  );
};

export default TabLayout;
