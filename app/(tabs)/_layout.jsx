import { View, Text, Image } from "react-native";
import { Tabs, Redirect } from "expo-router";
import { icons } from "../../constants";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Loader } from "../../components";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View
      className="items-center justify-center gap-1.5"
      style={{ marginTop: 18 }}
    >
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-5 h-5"
      />
      <Text
        className="text-l"
        style={{
          color: color, // Textfarbe auf Iconfarbe setzen
          fontWeight: focused ? "bold" : "normal", // fett bei Fokussierung
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
          tabBarActiveTintColor: "#b3aa94", // Aktive Farbe
          tabBarInactiveTintColor: "#fafafa", // Inaktive Farbe
          tabBarShowLabel: true, // Beschriftungen anzeigen
          tabBarStyle: {
            backgroundColor: "#254520",
            borderTopWidth: 0,
            height: 75,
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
