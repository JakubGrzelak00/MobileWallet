import { Text, StyleSheet } from "react-native";

const BasicText = ({ text, margin }) => {
  return (
    <Text style={{ ...styles.title, ...{ marginLeft: margin } }}>{text}</Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: "600",
  },
});
export default BasicText;
