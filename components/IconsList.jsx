import Icon from "./common/Icon";
import Icons from "../constants/Icons";
import { ScrollView, StyleSheet, Pressable, View } from "react-native";
import BasicText from "../components/common/BasicText";

const IconsList = ({ updateIcon, selectedIcon }) => {
  return (
    <View style={{ marginLeft: "3%" }}>
      <BasicText text="Set Icon" margin={"3%"} />
      <ScrollView
        style={styles.container}
        horizontal={true}
        alignItems="center"
        showsHorizontalScrollIndicator={false}
      >
        {Icons.map((icon) => (
          <Pressable key={icon.id}>
            <Icon
              path={icon.path}
              onPress={() => updateIcon(icon.id)}
              active={icon.id === selectedIcon ? true : false}
            />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 85,
  },
});

export default IconsList;
