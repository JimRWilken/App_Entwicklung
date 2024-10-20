import { useState, useRef } from "react";
import { View, Text, TextInput } from "react-native";

const NummericField = ({ title, placeholder, otherStyles }) => {
  const [value, setValue] = useState(Array(13).fill(""));
  const inputRefs = useRef([]);

  const handleChangeText = (text, index) => {
    if (text === "") {
      const newValue = [...value];
      newValue[index] = "";
      setValue(newValue);

      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    } else if (/^[0-9]$/.test(text)) {
      const newValue = [...value];
      newValue[index] = text;
      setValue(newValue);

      if (index < value.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      alert("Bitte nur Zahlen eingeben");
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && value[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const renderInputFields = () => {
    return value.map((num, index) => (
      <TextInput
        key={index}
        ref={(ref) => (inputRefs.current[index] = ref)}
        className="w-4 h-10 text-center text-2xl border border-gray-300 rounded-lg mx-1 bg-white shadow-md transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 hover:shadow-lg"
        value={num}
        keyboardType="numeric"
        maxLength={1}
        onChangeText={(text) => handleChangeText(text, index)}
        onKeyPress={(e) => handleKeyPress(e, index)}
      />
    ));
  };



  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-lg text-black font-semibold">{title}</Text>
      <View className="flex-row justify-center">{renderInputFields()}</View>
      <View className="flex-row justify-center mt-4">
        {}
      </View>
    </View>
  );
};

export default NummericField;
