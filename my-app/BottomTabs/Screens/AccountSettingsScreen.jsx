import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

// Account Settings Screen
const AccountSettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>
      <View style={styles.wrapper}>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "",
              "Are you sure you want to logout?",
              [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: console.log("Logout pressed") },
              ],
              { cancelable: true }
            )}
          style={styles.logoutButton}
        >
          <Text style={styles.clearButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountSettingsScreen;

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
    alignSelf: "stretch",
    marginBottom: 5,
  },
});
