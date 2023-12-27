import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Animated } from "react-native";
import Colors from "../constants/Colors";
import { parseToFloatFx2 } from "../scripts/noParse";

const BudgetMeter = ({ amount, budget }) => {
  const [animation] = useState(new Animated.Value(0));
  const _width = (amount * 100) / budget;

  useEffect(() => {
    if (_width === NaN || _width === Infinity) {
      return;
    }

    Animated.timing(animation, {
      toValue: _width,
      duration: 1000, // Długość animacji w milisekundach
      useNativeDriver: false, // Ustawienie na true dla animacji na wątku natywnym
    }).start();
  }, [_width, animation]);

  return (
    <View style={styles.container}>
      <Text>You have spent {parseToFloatFx2(_width)}% of your budget.</Text>
      <View style={styles.fullMeter}>
        <Animated.View
          style={[
            styles.meter,
            {
              width: animation.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        ></Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height * 0.05,
    width: Dimensions.get("screen").width * 0.9,
    marginTop: 20,
  },
  fullMeter: {
    height: Dimensions.get("screen").height * 0.04,
    width: Dimensions.get("screen").width * 0.9,
    backgroundColor: Colors.lowContrast,
    borderRadius: 25,
  },
  meter: {
    height: Dimensions.get("screen").height * 0.04,
    maxWidth: "100%",
    backgroundColor: Colors.accent,
    borderRadius: 25,
  },
});

export default BudgetMeter;
