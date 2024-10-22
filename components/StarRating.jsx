// components/StarRating.js
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const StarRating = ({ rating, setRating }) => {
  return (
    <View className="flex-row">
      {Array.from({ length: 5 }).map((_, index) => (
        <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
          <FontAwesome
            name={index < rating ? "star" : "star-o"}
            size={24}
            color="#FFD700"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default StarRating;
