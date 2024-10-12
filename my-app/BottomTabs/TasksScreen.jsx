import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Alert,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";

const screenWidth = Dimensions.get("window").width;
const itemWidth = screenWidth / 2 - 45;

// Tasks Screen
const TasksScreen = ({ tasks, setTasks }) => {
  const [task, setTask] = useState("");
  const [editTaskIndex, setEditTaskIndex] = useState(-1);
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleAddTask = () => {
    setShowDatePickerModal(false);
    if (task) {
      const newTask = {
        created: new Date(),
        updated: null,
        text: task,
        completed: false,
        dueDate: date,
      };
      if (newTask.text.trim()) {
        if (editTaskIndex !== -1) {
          if (newTask.text !== tasks[editTaskIndex].text) {
            const updatedTasks = [...tasks];
            updatedTasks[editTaskIndex] = {
              ...updatedTasks[editTaskIndex],
              text: task,
              updated: new Date(),
              dueDate: date,
            };
            setTasks(updatedTasks);
            setEditTaskIndex(-1);
          } else {
            const updatedTasks = [...tasks];
            updatedTasks[editTaskIndex] = {
              ...updatedTasks[editTaskIndex],
              updated: new Date(),
              dueDate: newTask.dueDate,
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
    setTask("");
    setEditTaskIndex(-1);
  };

  const handleCancelDateTimeEdit = () => {
    setShowDatePickerModal(false);
    if (task) {
      if (task.trim()) {
        if (editTaskIndex !== -1) {
          if (task !== tasks[editTaskIndex].text) {
            const updatedTasks = [...tasks];
            updatedTasks[editTaskIndex] = {
              ...updatedTasks[editTaskIndex],
              text: task,
              updated: new Date(),
            };
            setTasks(updatedTasks);
            setEditTaskIndex(-1);
          }
        }
        setTask("");
        setDate(new Date());
        setShowDatePickerModal(false);
        setEditTaskIndex(-1);
      }
    }
  };

  const handleCompletedTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleSetDateTimeTask = () => {
    if (task.trim()) {
      setShowDatePickerModal(true);
    }
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

  const handleDeleteAllTasks = () => {
    setTasks([]);
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => handleCompletedTask(index)}
        disabled={editTaskIndex === index}
      >
        <View
          style={[
            styles.task,
            editTaskIndex === index ? styles.editingTask : null,
          ]}
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
          <Text
            style={[
              styles.itemList,
              item.completed && {
                color: "lightgray",
                textDecorationLine: "line-through",
              },
            ]}
          >
            {item.dueDate.toLocaleString()}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => handleEditTask(index)}
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
              onLongPress={() =>
                Alert.alert(
                  "",
                  "Are you sure you want to delete all tasks?\nThis action cannot be undone",
                  [
                    { text: "Cancel", style: "cancel" },
                    { text: "OK", onPress: handleDeleteAllTasks },
                  ],
                  { cancelable: true }
                )
              }
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
      </TouchableOpacity>
    );
  };

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
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleSetDateTimeTask}
      >
        <Text style={styles.addButtonText}>Set Due Date</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="fade"
        visible={showDatePickerModal}
        onRequestClose={() => handleAddTask()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <DateTimePicker
              value={date}
              mode="datetime"
              is24Hour={true}
              display="default"
              onChange={onDateChange}
              themeVariant="light"
            />
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => handleAddTask()}
              >
                <Text style={styles.closeButtonText}>
                  {editTaskIndex !== -1 ? "Update" : "Add"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.lastCloseButton}
                onPress={() => handleCancelDateTimeEdit()}
              >
                <Text style={styles.closeButtonText}>
                  {editTaskIndex !== -1 ? "Don't set Due Date" : "Cancel"}
                </Text>
              </TouchableOpacity>
            </View>
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
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      )}
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
  row: {
    flexDirection: "row",
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
    width: itemWidth,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000080",
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
    marginRight: 25,
  },
  lastCloseButton: {
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
