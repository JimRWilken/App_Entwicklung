import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { router } from "expo-router";
import { icons } from "../constants";
import StarRating from "./StarRating";

const Rezeptevorschau = ({
  rezept: {
    titel,
    Zutaten,
    Beschreibung,
    Bilder,
    user: { username, avatar },
    Starrating,
  },
}) => {
  const [userRating, setUserRating] = useState(Starrating);

  const handlePress = () => {
    router.push({
      pathname: "/Rezepte/rezeptedetail",
      params: {
        titel,
        Zutaten,
        Beschreibung,
        Bilder,
        username,
        avatar,
      },
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.cardContainer}>
      <View style={styles.cardContent}>
        {/* Avatar und Bild */}
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: avatar }}
            style={styles.avatarImage}
            resizeMode="cover"
          />
        </View>

        {/* Titel und Username */}
        <View style={styles.textContainer}>
          <Text style={styles.titleText} numberOfLines={1}>
            {titel}
          </Text>
          <Text style={styles.usernameText} numberOfLines={1}>
            von {username}
          </Text>



        </View>

        {/* Menü Icon */}
        <View style={styles.menuIconContainer}>
          <Image
            source={icons.menu}
            style={styles.menuIcon}
            resizeMode="contain"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: "#FFF",
    borderRadius: 15,
    marginVertical: 3,
    marginHorizontal: 16,
    padding: 4,
  },
  cardContent: {
    backgroundColor: "#fff",
    padding: 4,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#DFD8C8",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  titleText: {
    fontFamily: "HelveticaNeue-Bold",
    fontSize: 18,
    color: "#52575D",
  },
  usernameText: {
    fontFamily: "HelveticaNeue",
    fontSize: 14,
    color: "#A9A9A9",
    marginTop: 4,
  },
  starRating: {
    marginTop: 8,
  },
  menuIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
});

export default Rezeptevorschau;
