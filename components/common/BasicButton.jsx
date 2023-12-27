import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";

const BasicButton = ({ color, onClick, text }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.button, ...{ backgroundColor: color } }}
      onPress={onClick}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("screen").width * 0.41,
    height: Dimensions.get("screen").height * 0.05,
    marginHorizontal: Dimensions.get("screen").width * 0.025,
    marginBottom: Dimensions.get("screen").height * 0.05,
    borderRadius: 25,
  },
  text: {
    fontSize: 15,
    color: Colors.lowContrast,
  },
});

export default BasicButton;
