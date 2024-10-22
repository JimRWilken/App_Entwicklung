import { View, Text } from "react-native";

const InfoBox = ({ title, subtitle, containerStyles, titleStyles }) => {
  return (
    <View
      className={`bg-gray-900 rounded-xl shadow-lg p-4 ${containerStyles}`} // Darker background color and rounded corners
    >
      <Text
        className={`text-white text-center font-bold text-lg ${titleStyles}`}
      >
        {title}
      </Text>
      <Text className="text-gray-300 text-center font-regular">{subtitle}</Text>
    </View>
  );
};

export default InfoBox;
