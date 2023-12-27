import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartingScreen from "./screens/StartingScreen";
import CategoryManagmentScreen from "./screens/CategoryManagmentScreen";
import AddCategoryScreen from "./screens/AddCategoryScreen";
import DashboardScreen from "./screens/DashboardScreen";
import AddIncomeScreen from "./screens/AddIncomeScreen";
import EditCategoryScreen from "./screens/EditCategoryScreen";
import AddExpenseScreen from "./screens/AddExpenseScreen";
import * as SQLite from "expo-sqlite";
import { useState, useEffect } from "react";
import SettingsScreen from "./screens/SettingsScreen";
import { Text } from "react-native";
import LoadingScreen from "./screens/LoadingSceen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name="loadingScreen" component={LoadingScreen} />
        <Stack.Screen name="startingScreen" component={StartingScreen} />
        <Stack.Screen name="dashboardScreen" component={DashboardScreen} />
        <Stack.Screen
          name="categoryManagmentScreen"
          component={CategoryManagmentScreen}
        />
        <Stack.Screen name="addCategoryScreen" component={AddCategoryScreen} />
        <Stack.Screen name="addIncomeScreen" component={AddIncomeScreen} />
        <Stack.Screen name="editCategory" component={EditCategoryScreen} />
        <Stack.Screen name="addExpenseScreen" component={AddExpenseScreen} />
        <Stack.Screen name="settingsScreen" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
