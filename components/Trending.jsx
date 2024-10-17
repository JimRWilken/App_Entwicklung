import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native";


const Trending = ({ posts }) => {
return (
  <FlatList
  data = {posts}
  keyExtractor={(item) => item.$id}
  horizontal
  renderItem={({ item }) => (
    <Text className = 'text-3xl text-black'>
      {item.id}

    </Text>

  )}
  />
)
}

export default Trending;
