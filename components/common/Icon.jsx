import { StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constants/Colors";

const Icon = ({ path, onPress, active }) => {
  return (
    <View style={[styles.container, active && styles.active]}>
      <TouchableOpacity onPress={onPress}>
        <Ionicons name={path} size={50} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 75,
    height: 75,
    margin: 5,
    marginLeft: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    borderRadius: 15,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

export default Icon;
