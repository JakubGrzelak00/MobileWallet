import { Text, View } from "react-native";
import Colors from "../constants/Colors";
import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";

const LoadingScreen = ({ navigation }) => {
  const [categories, setCategories] = useState();

  useEffect(() => {
    navigation.addListener("focus", () => {
      const db = SQLite.openDatabase("AppDB.db");
      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM categories", [], (_, { rows }) =>
          setCategories(rows._array)
        );
      });
    });
  }, [navigation]);

  if (categories === undefined) {
    navigation.navigate("startingScreen");
  } else {
    navigation.navigate("dashboardScreen");
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.background,
      }}
    >
      <Text>Loading</Text>
    </View>
  );
};

export default LoadingScreen;
