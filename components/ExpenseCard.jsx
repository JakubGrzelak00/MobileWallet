import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Icons from "../constants/Icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { parseToFloatFx2 } from "../scripts/noParse";
import Colors from "../constants/Colors";

const ExpenseCard = ({
  iconID,
  categoryName,
  date,
  value,
  onPress,
  expenseID,
  categoryID,
  validForCurrentCalculation,
}) => {
  return (
    <TouchableOpacity
      style={styles.expenseCardContainer}
      onLongPress={() =>
        onPress(expenseID, value, categoryID, validForCurrentCalculation)
      }
    >
      <View style={{ flexDirection: "row" }}>
        <Ionicons name={Icons[iconID].path} size={50} color={Colors.primary} />
        <View style={{ justifyContent: "space-between", marginLeft: 10 }}>
          <Text style={styles.categoryName}>{categoryName}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
      <Text style={styles.value}>{"-" + parseToFloatFx2(value)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  expenseCardContainer: {
    width: Dimensions.get("screen").width * 0.9,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  categoryName: { fontSize: 15, fontWeight: "600" },
  date: { fontSize: 15 },
  value: { fontSize: 18, fontWeight: "600" },
});

export default ExpenseCard;
