import React from "react";
import { View, ScrollView, Text, TouchableHighlight, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// Danger Zone Settings Screen
const TutorialSettingsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>How to Use?</Text>
      <TouchableHighlight style={styles.button} onPress={() => null}>
        <Icon name="checkmark-done-outline" color={"black"} size={24} />
      </TouchableHighlight>
      <View style={styles.wrapper}>
        <Text style={styles.header}>Add:</Text>
        <Text>1. Set the task name</Text>
        <Text style={styles.info}>
          You can't set only white-spaces as task name.
        </Text>
        <Text style={styles.list}>2. Set the due date</Text>
        <Text style={styles.info}>
          You can't set a date before actual date.
        </Text>
        <Text style={[styles.header, { marginTop: 20 }]}>Edit:</Text>
        <Text>1. Edit (if you want) the task name</Text>
        <Text style={styles.list}>2. Edit (if you want) the due date</Text>
        <Text style={[styles.header, { marginTop: 20 }]}>Delete:</Text>
        <Text>1. Press the icon to delete the task</Text>
        <Text style={styles.info}>
          You can long press the icon to delete all the tasks.
        </Text>
      </View>
      <TouchableHighlight style={styles.button} onPress={() => null}>
        <Icon name="document-text-outline" color={"black"} size={24} />
      </TouchableHighlight>
      <View style={styles.wrapper}>
        <Text style={styles.header}>Add:</Text>
        <Text>1. Write the note text</Text>
        <Text style={styles.info}>
          You can't write only white-spaces as note text.
        </Text>
        <Text style={[styles.header, { marginTop: 20 }]}>Edit:</Text>
        <Text>1. Edit (if you want) the note text</Text>
        <Text style={[styles.header, { marginTop: 20 }]}>Delete:</Text>
        <Text>1. Press the icon to delete the note</Text>
        <Text style={styles.info}>
          You can long press the icon to delete all the notes.
        </Text>
      </View>
    </ScrollView>
  );
};

export default TutorialSettingsScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    padding: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 48,
    textAlign: "left",
  },
  button: {
    backgroundColor: "#DDDDDD",
    padding: 7.5,
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 30,
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
    alignSelf: "flex-start",
    fontStyle: "italic",
  },
  list: {
    marginTop: 20,
  },
  info: {
    fontSize: 10,
    color: "#636363",
  },
});
