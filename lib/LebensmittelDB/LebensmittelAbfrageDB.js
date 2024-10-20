import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import axios from "axios";

const LebensmittelAbfrageDB = () => {
  const [barcode, setBarcode] = useState("");
  const [productInfo, setProductInfo] = useState(null);
  const userId = "DEINE_USER_ID_HIER"; // Hier deine User-ID einfügen

  const fetchProductData = async () => {
    if (!barcode) {
      Alert.alert("Bitte Barcode eingeben");
      return;
    }

    const url = `http://opengtindb.org/?ean=${barcode}&cmd=query&queryid=${userId}`;

    try {
      const response = await axios.get(url);
      parseResponse(response.data);
    } catch (error) {
      Alert.alert("Fehler bei der Abfrage", error.message);
    }
  };

  const parseResponse = (data) => {
    const entries = data.split("---").filter((entry) => entry.trim());
    const productData = entries.map((entry) => {
      const fields = entry.split("\n").reduce((acc, line) => {
        const [key, value] = line.split("=");
        if (key && value) {
          acc[key.trim()] = value.trim();
        }
        return acc;
      }, {});
      return fields;
    });
    setProductInfo(productData);
  };

  return (
    <View>
      <TextInput
        placeholder="Barcode eingeben"
        value={barcode}
        onChangeText={setBarcode}
        keyboardType="numeric"
      />
      <Button title="Produkt abfragen" onPress={fetchProductData} />
      {productInfo && (
        <View>
          {productInfo.map((product, index) => (
            <Text key={index}>
              {product.name} - {product.detailname}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default LebensmittelAbfrageDB;
