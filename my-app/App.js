import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Button,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";

// Tasks Screen
const TasksScreen = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editTaskIndex, setEditTaskIndex] = useState(-1);
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleAddTask = () => {
    if (task) {
      const newTask = {
        created: date,
        updated: null,
        text: task,
        completed: false,
      };
      if (editTaskIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[editTaskIndex] = {
          ...updatedTasks[editTaskIndex],
          text: task,
          updated: new Date(),
        };
        setTasks(updatedTasks);
        setEditTaskIndex(-1);
      } else {
        setTasks([...tasks, newTask]);
      }
      setTask("");
      setDate(new Date());
      setShowDatePickerModal(false);
    }
  };

  const handleCancelEdit = () => {
    setTask("");
    setEditTaskIndex(-1);
  };

  const handleCompletedTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleSetDateTimeTask = () => {
    setShowDatePickerModal(true);
  };

  const handleEditTask = (index) => {
    setTask(tasks[index].text);
    setEditTaskIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const onDateChange = (event, selectedDate) => {
    if (event.type === "set") {
      const currentDate = selectedDate || date;
      setDate(currentDate);
    }
  };

  const renderItem = ({ item, index }) => (
    <View
      style={[styles.task, editTaskIndex === index ? styles.editingTask : null]}
    >
      <Text
        style={[
          styles.datetime,
          item.completed && {
            color: "lightgray",
            textDecorationLine: "line-through",
          },
        ]}
      >
        CREATED: {item.created.toLocaleString()}
      </Text>
      {item.updated ? (
        <Text
          style={[
            styles.datetime,
            item.completed && {
              color: "lightgray",
              textDecorationLine: "line-through",
            },
          ]}
        >
          UPDATED: {item.updated.toLocaleString()}
        </Text>
      ) : null}
      <Text
        style={[
          styles.itemList,
          item.completed && {
            color: "lightgray",
            textDecorationLine: "line-through",
          },
        ]}
      >
        {item.text}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleCompletedTask(index)}
          style={styles.iconButton}
        >
          <Icon name="checkbox-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSetDateTimeTask()}
          style={styles.iconButton}
        >
          <Icon name="calendar-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleEditTask(index)}
          style={[styles.iconButton, item.completed]}
          disabled={item.completed}
        >
          <Icon
            name="create-outline"
            size={24}
            color={item.completed ? "gray" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeleteTask(index)}
          style={styles.iconButton}
        >
          <Icon name="trash-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks</Text>
      <TextInput
        style={styles.input}
        placeholder="Write here..."
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      {editTaskIndex !== -1 && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancelEdit}
        >
          <Text style={styles.addButtonText}>Cancel</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>
          {editTaskIndex !== -1 ? "Update Task" : "Add Task"}
        </Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="fade"
        visible={showDatePickerModal}
        onRequestClose={() => setShowDatePickerModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Date and Time</Text>
            <DateTimePicker
              value={date}
              mode="datetime"
              is24Hour={true}
              display="default"
              onChange={onDateChange}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowDatePickerModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {tasks.length == 0 ? (
        <View style={styles.errorMessageBox}>
          <Text style={styles.errorMessageText}>There's nothing here...</Text>
          <Icon name="sad-outline" size={48} color="black" />
        </View>
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
    </View>
  );
};

// Notes Screen
const NotesScreen = () => {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [editNoteIndex, setEditNoteIndex] = useState(-1);
  const [date, setDate] = useState(new Date());

  const handleAddNote = () => {
    if (note) {
      const newNote = {
        created: date,
        updated: null,
        text: note,
      };
      if (editNoteIndex !== -1) {
        const updatedNotes = [...notes];
        updatedNotes[editNoteIndex] = {
          ...updatedNotes[editNoteIndex],
          text: note,
          updated: new Date(),
        };
        setNotes(updatedNotes);
        setEditNoteIndex(-1);
      } else {
        setNotes([...notes, newNote]);
      }
      setNote("");
      setDate(new Date());
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
          style={styles.iconButton}
        >
          <Icon name="trash-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes</Text>
      <TextInput
        style={styles.input}
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
          {editNoteIndex !== -1 ? "Update Note" : "Add Note"}
        </Text>
      </TouchableOpacity>
      {notes.length == 0 ? (
        <View style={styles.errorMessageBox}>
          <Text style={styles.errorMessageText}>There's nothing here...</Text>
          <Icon name="sad-outline" size={48} color="black" />
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

// Create bottom tab navigator
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerTitle: "TasksAndNotesKeeper",
        }}
      >
        <Tab.Screen
          name="Tasks"
          component={TasksScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="checkmark-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Notes"
          component={NotesScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="document-text-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    marginTop: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "right",
  },
  input: {
    borderWidth: 3,
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
    fontSize: 18,
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
    marginTop: 100,
    alignItems: "center",
  },
  errorMessageText: {
    marginBottom: 10,
    fontSize: 20,
    fontStyle: "italic",
  },
});

export default App;
