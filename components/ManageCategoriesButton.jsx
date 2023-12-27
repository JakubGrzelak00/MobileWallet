import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import Colors from "../constants/Colors";

const ManageCategoriesButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height * 0.05,
    width: Dimensions.get("screen").width * 0.35,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.accent,
  },
  text: {
    fontSize: 13,
    color: Colors.lowContrast,
  },
});

export default ManageCategoriesButton;
