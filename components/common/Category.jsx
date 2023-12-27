import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/Colors";

const Category = ({ data, onPress, active }) => {
  const getColor = (active, data) => {
    if (active === data.categoryID) {
      return Colors.accent;
    }
    return Colors.lowContrast;
  };
  const getTextColor = (active, data) => {
    if (active === data.categoryID) {
      return Colors.lowContrast;
    }
    return Colors.primary;
  };
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        ...{ backgroundColor: getColor(active, data) },
      }}
      onPress={onPress}
    >
      <Text
        style={{ ...styles.text, ...{ color: getTextColor(active, data) } }}
      >
        {data.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height * 0.05,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 13,
  },
});

export default Category;
