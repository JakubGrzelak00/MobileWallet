import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import * as SQLite from "expo-sqlite";
import Colors from "../constants/Colors";
import Title from "../components/common/Title";
import Input from "../components/Input";
import { useState } from "react";
import ValueInput from "../components/ValueInput";
import IconsList from "../components/IconsList";
import BasicButton from "../components/common/BasicButton";

const AddCategoryScreen = ({ navigation, route }) => {
  const [categoryName, setCategoryName] = useState("");
  const [amount, setAmount] = useState("");
  const [icon, setIcon] = useState();

  const handleIconPress = (icon) => {
    setIcon(icon);
  };

  const onSave = async (navigation, nextScreen) => {
    if (categoryName.length < 1) {
      Alert.alert("Missing Data", "Please enter the category name", {
        text: "Ok",
      });
      return;
    }
    if (amount < 1) {
      Alert.alert("Missing Data", "Please enter the budget limit", {
        text: "Ok",
      });
      return;
    }
    if (icon === undefined) {
      Alert.alert("Missing Data", "Please select the desired icon", {
        text: "Ok",
      });
      return;
    }
    const db = SQLite.openDatabase("AppDB.db");
    db.transaction((tx) =>
      tx.executeSql(
        "INSERT INTO categories (categoryID, name, budget, spending, iconID) VALUES(?, ?, ?, ?, ?)",
        [Date.now(), categoryName, amount, 0, icon]
      )
    );
    setCategoryName("");
    setAmount("");
    setIcon();
    navigation.navigate(nextScreen);
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
        <View style={styles.functionBackground}>
          <View style={styles.inputs}>
            <Title text="Add Category" />
            <Input
              placeholder="Name"
              updateState={setCategoryName}
              text="Name"
              value={categoryName}
            />
            <ValueInput
              placeholder="Budget"
              updateState={setAmount}
              text="Budget"
              value={"" + amount}
            />
            <IconsList updateIcon={handleIconPress} selectedIcon={icon} />
          </View>
          <View style={styles.buttonGroup}>
            <BasicButton
              color={Colors.secondary}
              text="Cancel"
              onClick={() => navigation.navigate(route.params.previousScreen)}
            />
            <BasicButton
              color={Colors.primary}
              text="Save"
              onClick={() => onSave(navigation, route.params.nextScreen)}
            />
          </View>
        </View>
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
    height: Dimensions.get("screen").height * 0.5,
  },
  buttonGroup: {
    flexDirection: "row",
  },
});

export default AddCategoryScreen;
