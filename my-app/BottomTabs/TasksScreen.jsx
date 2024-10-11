import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";

// Tasks Screen
const TasksScreen = ({ tasks, setTasks }) => {
  const [task, setTask] = useState("");
  const [editTaskIndex, setEditTaskIndex] = useState(-1);
  const [isEditingMode, setIsEditingMode] = useState(false);
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
      if (newTask.text.trim()) {
        setIsEditingMode(false);
        if (editTaskIndex !== -1) {
          if (newTask.text !== tasks[editTaskIndex].text) {
            const updatedTasks = [...tasks];
            updatedTasks[editTaskIndex] = {
              ...updatedTasks[editTaskIndex],
              text: task,
              updated: new Date(),
            };
            setTasks(updatedTasks);
            setEditTaskIndex(-1);
          }
        } else {
          setTasks([...tasks, newTask]);
        }
        setTask("");
        setDate(new Date());
        setShowDatePickerModal(false);
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditingMode(false);
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
    setIsEditingMode(true);
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

  const handleDeleteAllTasks = () => {
    setTasks([]);
  }

  const renderItem = ({ item, index }) => (
    <View
      style={[styles.task, editTaskIndex === index ? styles.editingTask : null]}
    >
      <Text style={styles.datetime}>
        CREATED: {item.created.toLocaleString()}
      </Text>
      {item.updated ? (
        <Text style={styles.datetime}>
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
          disabled={editTaskIndex === index}
        >
          <Icon
            name={item.completed ? "checkbox-outline" : "square-outline"}
            size={24}
            color={editTaskIndex === index ? "gray" : "black"}
          />
        </TouchableOpacity>
        {/*<TouchableOpacity
            onPress={() => handleSetDateTimeTask()}
            style={styles.iconButton}
          >
            <Icon name="calendar-outline" size={24} color="black" />
          </TouchableOpacity>*/}
        <TouchableOpacity
          onPress={() => handleEditTask(index)}
          style={styles.iconButton}
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
          disabled={editTaskIndex === index}
        >
          <Icon
            name="trash-outline"
            size={24}
            color={editTaskIndex === index ? "gray" : "black"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{tasks.length} Tasks</Text>
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
          {editTaskIndex !== -1 ? "Update" : "Add"}
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
          <Text style={styles.errorMessageText}>Add your first task!</Text>
          <Icon name="happy-outline" size={48} color="black" />
        </View>
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAllTasks} disabled={isEditingMode}>
        <Text style={styles.addButtonText}>Clear All Tasks</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TasksScreen;

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
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
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
