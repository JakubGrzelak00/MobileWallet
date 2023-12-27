import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const BalanceCard = ({ balance, navigation }) => {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.title}>Your Current Balance Is:</Text>
        <Text style={styles.value}>{"$" + balance}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("addIncomeScreen")}>
        <Ionicons name="pencil" size={40} color={Colors.lowContrast} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: Dimensions.get("screen").height * 0.2,
    width: Dimensions.get("screen").width * 0.9,
    padding: 25,
    flexDirection: "row",
    justifyContent: "space-between",

    backgroundColor: Colors.primary,

    borderRadius: 25,
  },
  title: {
    fontSize: 16,
    color: Colors.lowContrast,
  },
  value: {
    fontSize: 24,
    color: Colors.lowContrast,
    marginTop: 8,
  },
  image: {
    width: 40,
    height: 40,
  },
});

export default BalanceCard;
