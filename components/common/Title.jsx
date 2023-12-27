import { Text, StyleSheet } from "react-native";

const Title = ({ text }) => {
  return <Text style={styles.title}>{text}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: "10%",
  },
});
export default Title;
