import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Text,
  Alert,
} from "react-native";
import * as SQLite from "expo-sqlite";
import Colors from "../constants/Colors";
import Title from "../components/common/Title";
import { useState, useEffect } from "react";
import ValueInput from "../components/ValueInput";
import BasicButton from "../components/common/BasicButton";
import CustomDatePicker from "../components/customDatePicker";
import CategoriesList from "../components/CategoriesList";
import { parseToFloatFx2 } from "../scripts/noParse";

const AddExpenseScreen = ({ navigation, route }) => {
  const [activeCategory, setActiveCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [iconID, setIconID] = useState();
  const [categoryName, setCategoryName] = useState();
  const [balance, setBalance] = useState();

  const selectActiveCategory = (selectedCategory) => {
    setActiveCategory(selectedCategory);
    categories.forEach((category) => {
      if (category.categoryID == selectedCategory) {
        setIconID(category.iconID);
      }
    });
    categories.forEach((category) => {
      if (category.categoryID == selectedCategory) {
        setCategoryName(category.name);
      }
    });
  };

  const onSave = (navigation) => {
    if (activeCategory.length < 1) {
      Alert.alert("Missing Data", "Please select the category ", {
        text: "Ok",
      });
      return;
    }
    if (amount < 0.01) {
      Alert.alert("Missing Data", "Please enter the amount", {
        text: "Ok",
      });
      return;
    }
    const db = SQLite.openDatabase("AppDB.db");
    db.transaction((tx) =>
      tx.executeSql(
        "INSERT INTO expenses (expenseID, value, categoryID, date, iconID, categoryName, validForCurrentCalculation) VALUES(?, ?, ?, ?, ?, ?, ?)",
        [
          Date.now(),
          amount,
          activeCategory,
          date.toISOString().slice(0, 10),
          iconID,
          categoryName,
          1,
        ]
      )
    );

    route.params.updateBalance(
      parseToFloatFx2(balance) - parseToFloatFx2(amount)
    );
    route.params.updateSpendings(amount, activeCategory);

    setActiveCategory("");
    setAmount("");
    setDate();
    setIconID();
    setCategoryName();
    navigation.navigate("dashboardScreen");
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      const db = SQLite.openDatabase("AppDB.db");
      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM categories", [], (_, { rows }) =>
          setCategories(rows._array)
        );
      });

      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM balance", [], (_, { rows }) =>
          setBalance(rows._array[0].balance)
        );
      });
    });
  }, [navigation]);

  if (categories.length === 0) {
    return <Text>Loading</Text>;
  }

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
            <Title text="Add Expense" />
            <ValueInput
              placeholder="Amount"
              updateState={setAmount}
              text="Amount"
              value={"" + amount}
            />
            <CustomDatePicker selectedDate={date} onDateChange={setDate} />
            <CategoriesList
              activeCategory={activeCategory}
              onCategorySelection={selectActiveCategory}
              categories={categories}
              navigation={navigation}
              areFunctionButtonsActive={false}
            />
          </View>
          <View style={styles.buttonGroup}>
            <BasicButton
              color={Colors.secondary}
              text="Cancel"
              onClick={() => navigation.navigate("dashboardScreen")}
            />
            <BasicButton
              color={Colors.primary}
              text="Save"
              onClick={() => onSave(navigation)}
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

export default AddExpenseScreen;
