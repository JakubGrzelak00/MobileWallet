import { Dimensions, ScrollView, StyleSheet } from "react-native";
import Category from "./common/Category";
import ManageCategoriesButton from "./ManageCategoriesButton";

const CategoriesList = ({
  activeCategory,
  onCategorySelection,
  categories,
  navigation,
  areFunctionButtonsActive = true,
}) => {
  return (
    <ScrollView
      style={styles.container}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {areFunctionButtonsActive && (
        <Category
          data={{ name: "All", categoryID: 1 }}
          active={activeCategory}
          onPress={() => onCategorySelection(1)}
        />
      )}

      {categories.map((category) => (
        <Category
          key={category.categoryID}
          data={category}
          active={activeCategory}
          onPress={() => onCategorySelection(category.categoryID)}
        />
      ))}
      {areFunctionButtonsActive && (
        <ManageCategoriesButton
          onPress={() => navigation.navigate("categoryManagmentScreen")}
          title="Manage Categories"
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: Dimensions.get("screen").height * 0.07,
    width: Dimensions.get("screen").width,
    paddingHorizontal: Dimensions.get("screen").width * 0.05,
    margin: "5%",
  },
});

export default CategoriesList;
