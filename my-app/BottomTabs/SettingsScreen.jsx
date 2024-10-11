import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// Settings Screen
const SettingsScreen = ({ clearData }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={clearData} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear Both All Tasks and Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={console.log()} style={styles.logoutButton}>
          <Text style={styles.clearButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsScreen;

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
  clearButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignSelf: "stretch",
  },
  clearButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginTop: 25,
    alignSelf: "stretch",
  }
});
