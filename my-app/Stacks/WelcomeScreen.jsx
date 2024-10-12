import React from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";

const WelcomeScreen = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate("Tabs");
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to TasksAndNotesKeeper!</Text>
        <Text style={styles.texts}>Tap everywhere to start</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: "center",
  },
  texts: {
    textTransform: "uppercase",
    fontSize: 10,
  },
});

export default WelcomeScreen;
