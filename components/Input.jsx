import { Dimensions, StyleSheet, TextInput, View } from "react-native";
import Colors from "../constants/Colors";
import BasicText from "./common/BasicText";

const Input = ({ updateState, placeholder, text, value }) => {
  return (
    <View>
      <BasicText text={text} />
      <View style={styles.container}>
        <TextInput
          value={value}
          style={styles.input}
          placeholder={placeholder}
          onChangeText={updateState}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height * 0.08,
    width: Dimensions.get("screen").width * 0.88,
    backgroundColor: Colors.lowContrast,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
  },
  input: {
    color: Colors.primary,
    height: "80%",
    width: "90%",
    fontSize: 24,
  },
});
export default Input;
