import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

// Settings Screen
const SettingsScreen = ({ clearData }) => {
  const navigation = useNavigation();

  const handleNavigate = (screen) => {
    if (screen === "DangerZoneSettings") {
      navigation.navigate(screen, { clearData });
    } else {
      navigation.navigate(screen);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.labelContainer}
          onPress={() => handleNavigate("TutorialSettings")}
        >
          <View style={styles.leftSection}>
            <Icon name="clipboard-outline" size={24} color="black" />
            <Text style={styles.labelText}>How to Use?</Text>
          </View>
          <Icon name="chevron-forward-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.labelContainer}
          onPress={() => handleNavigate("AccountSettings")}
        >
          <View style={styles.leftSection}>
            <Icon name="person-circle-outline" size={24} color="black" />
            <Text style={styles.labelText}>Account</Text>
          </View>
          <Icon name="chevron-forward-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.lastLabelContainer}
          onPress={() => handleNavigate("DangerZoneSettings")}
        >
          <View style={styles.leftSection}>
            <Icon name="warning-outline" size={24} color="black" />
            <Text style={styles.labelText}>Danger Zone</Text>
          </View>
          <Icon name="chevron-forward-outline" size={24} color="black" />
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
    marginBottom: 48,
    textAlign: "left",
  },
  wrapper: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  labelContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 15,
  },
  lastLabelContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  labelText: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 10,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
});
