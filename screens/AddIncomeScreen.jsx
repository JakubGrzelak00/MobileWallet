import { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import * as SQLite from "expo-sqlite";
import ValueInput from "../components/ValueInput";
import Colors from "../constants/Colors";
import Title from "../components/common/Title";
import BasicButton from "../components/common/BasicButton";

const AddIncomeScreen = ({ navigation }) => {
  const [amount, setAmount] = useState(0);

  const onSave = (navigation) => {
    if (amount < 1) {
      Alert.alert("Missing Data", "Please enter the amount", {
        text: "Ok",
      });
      return;
    }

    const db = SQLite.openDatabase("AppDB.db");
    db.transaction((tx) => tx.executeSql("DELETE FROM balance"));
    db.transaction((tx) =>
      tx.executeSql("INSERT INTO balance (balance) VALUES(?)", [amount])
    );
    navigation.navigate("dashboardScreen");
  };

  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={Keyboard.dismiss}
    >
      <View style={styles.container}>
        <View style={styles.background}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.functionBackground}
        >
          <View style={styles.inputs}>
            <Title text="Add Income" />
            <ValueInput
              placeholder="Amount"
              updateState={setAmount}
              text="Amount"
            />
          </View>
          <View style={styles.buttonGroup}>
            <BasicButton
              color={Colors.secondary}
              text="Cancel"
              onClick={() => navigation.goBack()}
            />
            <BasicButton
              color={Colors.primary}
              text="Save"
              onClick={() => onSave(navigation)}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  logo: {
    height: "43.75%",
    width: "80%",
    resizeMode: "stretch",
    marginTop: "10%",
  },
  background: {
    height: Dimensions.get("screen").height * 0.32,
    width: Dimensions.get("screen").width,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  functionBackground: {
    height: Dimensions.get("screen").height * 0.68,
    width: Dimensions.get("screen").width,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputs: {
    alignItems: "center",
    justifyContent: "space-between",
    height: Dimensions.get("screen").height * 0.22,
  },
  buttonGroup: {
    flexDirection: "row",
  },
});

export default AddIncomeScreen;
