import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

// Danger Zone Settings Screen
const DangerZoneSettingsScreen = ({ route }) => {
  const { clearData } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danger Zone</Text>
      <View style={styles.wrapper}>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "",
              "Are you sure you want to delete both tasks and notes?\nThis action cannot be undone.",
              [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: clearData },
              ],
              { cancelable: true }
            )
          }
          style={styles.dangerButton}
        >
          <Text style={styles.dangerButtonText}>
            Clear Both Tasks and Notes
          </Text>
        </TouchableOpacity>
        <Text style={styles.warning}>This action cannot be undone.</Text>
        <Text style={styles.warning}>
          If you proceed, all your tasks and notes will be lost and you won't
          able to restore it.
        </Text>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "",
              "Are you sure you want to delete your account?\nYour data will be lost.\nThis action cannot be undone.",
              [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: console.log("Delete account pressed") },
              ],
              { cancelable: true }
            )
          }
          style={styles.lastDangerButton}
        >
          <Text style={styles.dangerButtonText}>Delete Account</Text>
        </TouchableOpacity>
        <Text style={styles.warning}>This action cannot be undone.</Text>
        <Text style={styles.warning}>
          If you delete your account, all your data will be lost and you won't
          able to restore it.
        </Text>
      </View>
    </View>
  );
};

export default DangerZoneSettingsScreen;

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
