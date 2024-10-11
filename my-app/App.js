import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import WelcomeScreen from "./Stacks/WelcomeScreen";
import TasksScreen from "./BottomTabs/TasksScreen";
import NotesScreen from "./BottomTabs/NotesScreen";
import SettingsScreen from "./BottomTabs/SettingsScreen";

// Create bottom tab navigator
const Tab = createBottomTabNavigator();

// Create stack navigator
const Stack = createStackNavigator();

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);

  const clearData = () => {
    setTasks([]);
    setNotes([]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitle: "TasksAndNotesKeeper",
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tabs"
          options={{ headerShown: false }}
        >
          {() => (
            <TabNavigator
              tasks={tasks}
              setTasks={setTasks}
              notes={notes}
              setNotes={setNotes}
              clearData={clearData}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const TabNavigator = ({ tasks, setTasks, notes, setNotes, clearData }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Tasks"
        options={{
          headerTitle: "TasksAndNotesKeeper",
          tabBarIcon: ({ color, size }) => (
            <Icon name="checkmark-outline" color={color} size={size} />
          ),
        }}
      >
        {(props) => (
          <TasksScreen {...props} tasks={tasks} setTasks={setTasks} />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Notes"
        options={{
          headerTitle: "TasksAndNotesKeeper",
          tabBarIcon: ({ color, size }) => (
            <Icon name="document-text-outline" color={color} size={size} />
          ),
        }}
      >
        {(props) => (
          <NotesScreen {...props} notes={notes} setNotes={setNotes} />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Settings"
        options={{
          headerTitle: "TasksAndNotesKeeper",
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings-outline" color={color} size={size} />
          ),
        }}
      >
        {(props) => (
          <SettingsScreen
            {...props}
            clearData={clearData}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default App;
