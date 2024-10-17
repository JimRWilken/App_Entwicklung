import { Alert } from "react-native";
import { useEffect, useState } from "react";

const useAppwrite = (fn) => { //Datenbank abfrage als Hook
  // (fn) übergabe der jeweiligen Inhalte die ich aus der DB haben möchte, wie Posts, Rezepte etc.
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fn();
      setData(res);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, loading, refetch };
};

export default useAppwrite;