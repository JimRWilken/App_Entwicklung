import { Alert } from "react-native";
import { useEffect, useState } from "react";

const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fn(); // fn() muss die Daten korrekt zurückgeben
      setData(res); // Daten im State speichern
    } catch (error) {
      Alert.alert("Error", error.message); // Fehlerbehandlung
    } finally {
      setLoading(false); // Ladevorgang beenden
    }
  };

  useEffect(() => {
    fetchData(); // Daten beim ersten Rendern laden
  }, [fn]); // Füge fn als Abhängigkeit hinzu

  const refetch = async () => {
    await fetchData(); // Daten neu laden bei einem Refresh
  };

  return { data, loading, refetch };
};

export default useAppwrite;
