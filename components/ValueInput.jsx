import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../constants/Colors";
import BasicText from "./common/BasicText";

const ValueInput = ({ updateState, placeholder, text, value }) => {
  return (
    <View>
      <BasicText text={text} />
      <View style={styles.container}>
        <Text style={styles.dolarSign}>$</Text>
        <TextInput
          value={value}
          style={styles.input}
          keyboardType="decimal-pad"
          placeholder={placeholder}
          onChangeText={updateState}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height * 0.09,
    width: Dimensions.get("screen").width * 0.88,
    backgroundColor: Colors.lowContrast,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 6,
  },
  input: {
    color: Colors.primary,
    height: "80%",
    width: "85%",
    fontSize: 30,
  },
  dolarSign: {
    color: Colors.primary,
    fontSize: 45,
    marginLeft: 5,
    marginRight: 5,
  },
});

export default ValueInput;
