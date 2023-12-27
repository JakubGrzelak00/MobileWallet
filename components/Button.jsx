import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import Colors from "../constants/Colors";
const Button = ({ color, text, margin, onClick }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{ ...style.button, ...{ backgroundColor: color, margin: margin } }}
    >
      <Text style={style.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("screen").width * 0.8,
    height: Dimensions.get("screen").height * 0.06,
    borderRadius: 25,
  },
  text: {
    fontSize: 15,
    color: Colors.lowContrast,
  },
});

export default Button;
