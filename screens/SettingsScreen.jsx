import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";
import { Dimensions } from "react-native";
import Button from "../components/Button";
import * as SQLite from "expo-sqlite";

const TEST_onDeleteData = (navigation) => {
  const db = SQLite.openDatabase("AppDB.db");
  db.transaction((tx) => {
    tx.executeSql("DROP TABLE IF EXISTS categories");
    tx.executeSql("DROP TABLE IF EXISTS expenses");
    tx.executeSql("DROP TABLE IF EXISTS balance");
  });
  navigation.navigate("loadingScreen");
};

const resetBudget = (navigation) => {
  const db = SQLite.openDatabase("AppDB.db");
  db.transaction((tx) => {
    tx.executeSql("UPDATE categories SET spending = 0", []);
  });
  db.transaction((tx) => {
    tx.executeSql("UPDATE expenses SET validForCurrentCalculation = 0", []);
  });
  navigation.navigate("dashboardScreen");
};

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.background}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.functionBackground}>
        <View style={styles.functionButtons}>
          <Button
            color={Colors.primary}
            text="Reset Budget"
            margin={10}
            onClick={() => resetBudget(navigation)}
          />
          <Button
            color={Colors.accent}
            text="Reset App"
            margin={10}
            onClick={() => TEST_onDeleteData(navigation)}
          />
        </View>
        <Button color={Colors.primary} text="Exit" margin={10} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    alignItems: "center",
    flex: 1,
    backgroundColor: Colors.primary,
    paddingTop: Dimensions.get("screen").height * 0.075,
  },
  title: {
    color: Colors.lowContrast,
    fontSize: 28,
  },
  functionBackground: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height * 0.9,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
    borderRadius: 25,
    backgroundColor: Colors.background,
  },
  functionButtons: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height * 0.7,
    alignItems: "center",
  },
});

export default SettingsScreen;
