import { View, Text, Image, StyleSheet, Dimensions, Alert } from "react-native";
import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import Colors from "../constants/Colors";
import Title from "../components/common/Title";
import BasicButton from "../components/common/BasicButton";
import Category from "../components/common/Category";
import ManageCategoriesButton from "../components/ManageCategoriesButton";

const CategoryManagmentScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState();

  const onEdit = (navigation) => {
    if (activeCategory === undefined) {
      Alert.alert("Missina Data", "Please select a category to edit", ["Ok"]);
      return;
    }
    let categoryToEdit;
    categories.forEach((category) => {
      if (category.categoryID === activeCategory) {
        categoryToEdit = category;
      }
    });
    navigation.navigate("editCategory", {
      categoryToEdit: categoryToEdit,
      noOfCategories: categories.length,
    });
  };

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
  if (categories.length === 0) {
    return <Text>Loading</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
      </View>
      <View style={styles.functionBackground}>
        <View style={styles.inputs}>
          <Title text="Manage Categories" />
          <View style={styles.categories}>
            {categories.map((category) => (
              <Category
                key={category.categoryID}
                data={category}
                onPress={() => setActiveCategory(category.categoryID)}
                active={activeCategory}
              />
            ))}
            <ManageCategoriesButton
              title="Add More"
              onPress={() =>
                navigation.navigate("addCategoryScreen", {
                  nextScreen: "categoryManagmentScreen",
                  previousScreen: "categoryManagmentScreen",
                })
              }
            />
          </View>
        </View>
        <View style={styles.buttonGroup}>
          <BasicButton
            color={Colors.accent}
            text="Edit"
            onClick={() => onEdit(navigation)}
          />
          <BasicButton
            color={Colors.primary}
            text="Done"
            onClick={() => navigation.navigate("dashboardScreen")}
          />
        </View>
      </View>
    </View>
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
    height: Dimensions.get("screen").height * 0.22,
  },
  buttonGroup: {
    flexDirection: "row",
  },
  categories: {
    flexDirection: "row",
    width: Dimensions.get("screen").width * 0.95,
    marginTop: 15,
    flexWrap: "wrap",
  },
});

export default CategoryManagmentScreen;
