import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// Danger Zone Settings Screen
const TutorialSettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How to Use?</Text>
      <View style={styles.wrapper}>
        <Text style={styles.warning}>Lorem ipsum dolor sit amet.</Text>
      </View>
    </View>
  );
};

export default TutorialSettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 72,
    textAlign: "left",
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  warning: {
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
  dangerButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  dangerButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    alignSelf: "stretch",
    marginBottom: 5,
  },
  lastDangerButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    alignSelf: "stretch",
    marginTop: 75,
    marginBottom: 5,
  },
});
