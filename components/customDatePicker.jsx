import { Dimensions, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import BasicText from "./common/BasicText";

const CustomDatePicker = ({ selectedDate, onDateChange }) => {
  const handleDateChange = (event, date) => {
    if (date) {
      onDateChange(date);
    }
  };

  return (
    <View>
      <BasicText text="Date" />
      <DateTimePicker
        style={{ height: 120, width: Dimensions.get("screen").width * 0.88 }}
        value={selectedDate || new Date()}
        mode="date"
        display="spinner"
        onChange={handleDateChange}
      />
    </View>
  );
};
export default CustomDatePicker;
