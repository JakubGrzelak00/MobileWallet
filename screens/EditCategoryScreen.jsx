import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import * as SQLite from "expo-sqlite";
import Colors from "../constants/Colors";
import Input from "../components/Input";
import { useState } from "react";
import ValueInput from "../components/ValueInput";
import IconsList from "../components/IconsList";
import BasicButton from "../components/common/BasicButton";
import Ionicons from "@expo/vector-icons/Ionicons";

const EditCategoryScreen = ({ navigation, route }) => {
  const [categoryName, setCategoryName] = useState(
    route.params.categoryToEdit.name
  );
  const [amount, setAmount] = useState(route.params.categoryToEdit.budget);
  const [icon, setIcon] = useState(route.params.categoryToEdit.iconID);

  const handleIconPress = (icon) => {
    setIcon(icon);
  };

  const onSave = (navigation, categoryID) => {
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
        "UPDATE categories SET name = ?, budget = ?, iconID = ? WHERE categoryID = ?",
        [categoryName, amount, icon, categoryID]
      )
    );
    db.transaction((tx) =>
      tx.executeSql(
        "UPDATE expenses SET iconID = ?, categoryName = ? WHERE categoryID = ?",
        [icon, categoryName, categoryID]
      )
    );

    setCategoryName("");
    setAmount(0);
    setIcon();
    navigation.navigate("categoryManagmentScreen");
  };

  const onDelete = (navigation, categoryID) => {
    if (route.params.noOfCategories === 1) {
      Alert.alert(
        "Message",
        "You cannot delete the last category, please add more or modify this one",
        { text: "Ok" }
      );
      return;
    }
    Alert.alert(
      "Confirmation",
      "Please confirm if you want to delete this category and all records assigned to it",
      [
        { text: "Cancel" },
        {
          text: "Confirm",
          style: "destructive",
          onPress: () => {
            const db = SQLite.openDatabase("AppDB.db");
            db.transaction((tx) => {
              tx.executeSql(
                "DELETE FROM categories WHERE categoryID = ?",
                [categoryID],
                (_, result) => {
                  console.log("DELETE result:", result);
                  setCategoryName("");
                  setAmount(0);
                  setIcon();
                  navigation.navigate("categoryManagmentScreen");
                }
              );
            });
          },
        },
      ]
    );
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
            <View style={styles.titleIconContainer}>
              <Text style={styles.title}>Edit Category</Text>
              <TouchableOpacity
                onPress={() =>
                  onDelete(navigation, route.params.categoryToEdit.categoryID)
                }
              >
                <Ionicons name="trash" size={50} color={Colors.primary} />
              </TouchableOpacity>
            </View>
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
              onClick={() => navigation.goBack()}
            />
            <BasicButton
              color={Colors.primary}
              text="Save"
              onClick={() =>
                onSave(navigation, route.params.categoryToEdit.categoryID)
              }
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
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: Dimensions.get("screen").width * 0.18,
  },
  titleIconContainer: {
    width: Dimensions.get("screen").width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 20,
  },
});

export default EditCategoryScreen;
