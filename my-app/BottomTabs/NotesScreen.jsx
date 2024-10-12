import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// Notes Screen
const NotesScreen = ({ notes, setNotes }) => {
  const [note, setNote] = useState("");
  const [editNoteIndex, setEditNoteIndex] = useState(-1);
  const [date, setDate] = useState(new Date());

  const handleAddNote = () => {
    if (note) {
      const newNote = {
        created: date,
        updated: null,
        text: note,
      };
      if (newNote.text.trim()) {
        if (editNoteIndex !== -1) {
          if (newNote.text !== notes[editNoteIndex].text) {
            const updatedNotes = [...notes];
            updatedNotes[editNoteIndex] = {
              ...updatedNotes[editNoteIndex],
              text: note,
              updated: new Date(),
            };
            setNotes(updatedNotes);
            setEditNoteIndex(-1);
          }
        } else {
          setNotes([...notes, newNote]);
        }
        setNote("");
        setDate(new Date());
      }
    }
  };

  const handleCancelEdit = () => {
    setNote("");
    setEditNoteIndex(-1);
  };

  const handleEditNote = (index) => {
    setNote(notes[index].text);
    setEditNoteIndex(index);
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const handleDeleteAllNotes = () => {
    setNotes([]);
  };

  const renderItem = ({ item, index }) => (
    <View
      style={[styles.task, editNoteIndex === index ? styles.editingTask : null]}
    >
      <Text style={styles.datetime}>
        CREATED: {item.created.toLocaleString()}
      </Text>
      {item.updated ? (
        <Text style={styles.datetime}>
          UPDATED: {item.updated.toLocaleString()}
        </Text>
      ) : null}
      <Text style={styles.itemList}>{item.text}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleEditNote(index)}
          style={styles.iconButton}
        >
          <Icon name="create-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeleteNote(index)}
          onLongPress={() =>
            Alert.alert(
              "",
              "Are you sure you want to delete all notes?\nThis action cannot be undone",
              [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: handleDeleteAllNotes },
              ],
              { cancelable: true }
            )
          }
          style={styles.iconButton}
          disabled={editNoteIndex === index}
        >
          <Icon
            name="trash-outline"
            size={24}
            color={editNoteIndex === index ? "gray" : "black"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{notes.length} Notes</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Write here..."
        value={note}
        onChangeText={(text) => setNote(text)}
      />
      {editNoteIndex !== -1 && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancelEdit}
        >
          <Text style={styles.addButtonText}>Cancel</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
        <Text style={styles.addButtonText}>
          {editNoteIndex !== -1 ? "Update" : "Add"}
        </Text>
      </TouchableOpacity>
      {notes.length == 0 ? (
        <View style={styles.errorMessageBox}>
          <Text style={styles.errorMessageText}>Add your first note!</Text>
          <Icon name="happy-outline" size={48} color="black" />
        </View>
      ) : (
        <FlatList
          data={notes}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
    </View>
  );
};

export default NotesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "right",
  },
  input: {
    height: "20%",
    borderWidth: 1.5,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18,
  },
  addButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginBottom: 50,
  },
  cancelButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  task: {
    marginBottom: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
  },
  editingTask: {
    borderColor: "#0f0f0f",
    borderWidth: 2,
  },
  itemList: {
    fontSize: 20,
    marginTop: 5,
    color: "black",
  },
  datetime: {
    fontStyle: "italic",
    marginBottom: 2.5,
    fontSize: 12,
    color: "grey",
  },
  taskButtons: {
    flexDirection: "row",
  },
  buttonContainer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconButton: {
    flex: 1,
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  errorMessageBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessageText: {
    marginBottom: 15,
    fontSize: 20,
    fontStyle: "italic",
  },
});
