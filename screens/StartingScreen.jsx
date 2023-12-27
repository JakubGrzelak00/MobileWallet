import { View, StyleSheet, Dimensions, Image, Text } from "react-native";
import * as SQLite from "expo-sqlite";
import Colors from "../constants/Colors";
import Button from "../components/Button";

const start = (navigation) => {
  const db = SQLite.openDatabase("AppDB.db");

  db.transaction((tx) =>
    tx.executeSql(
      "CREATE TABLE expenses (expenseID int, value float, categoryID int, date string, iconID int, categoryName string, validForCurrentCalculation int)"
    )
  );
  db.transaction((tx) =>
    tx.executeSql(
      "CREATE TABLE categories (categoryID int, name string, budget float, spending float, iconID int)"
    )
  );
  db.transaction((tx) => tx.executeSql("CREATE TABLE balance (balance float)"));

  db.transaction((tx) =>
    tx.executeSql("INSERT INTO balance (balance) VALUES(?)", [0])
  );
  navigation.navigate("addCategoryScreen", {
    nextScreen: "dashboardScreen",
    previousScreen: "startingScreen",
  });
};

const StartingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
      </View>
      <View style={styles.functionBackground}>
        <View style={styles.messagesContainer}>
          <Text style={styles.message1}>Welcome!</Text>
          <Text style={styles.message2}>
            To begin, please{"\n"}add your first category
          </Text>
        </View>
        <Button
          color={Colors.accent}
          text={"Start"}
          margin={Dimensions.get("screen").height * 0.05}
          onClick={() => start(navigation)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  background: {
    height: Dimensions.get("screen").height * 0.2,
    width: Dimensions.get("screen").width,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  functionBackground: {
    height: Dimensions.get("screen").height * 0.8,
    width: Dimensions.get("screen").width,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    height: "70%",
    width: "80%",
    resizeMode: "stretch",
    marginTop: "10%",
  },
  message1: {
    fontSize: 32,
    color: Colors.primary,
    marginTop: "20%",
    marginBottom: "5%",
  },
  message2: {
    fontSize: 20,
    textAlign: "center",
    color: Colors.primary,
  },
  messagesContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartingScreen;
