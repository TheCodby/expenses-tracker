import { StatusBar } from "expo-status-bar";
import AllExpensesScreen from "./screens/AllExpensesScreen";
import RecentExpenses from "./screens/RecentExpenses";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "./store/redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import {
  Provider as PaperProvider,
  BottomNavigation,
} from "react-native-paper";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "./utils/Colors";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabBar = createBottomTabNavigator();
let persistor = persistStore(store);

export default function App() {
  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
  });
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "RecentExpenses",
      title: "Recent Expenses",
      icon: "history",
    },
    {
      key: "AllExpenses",
      title: "All Expenses",
      icon: "clipboard-text-clock",
    },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    RecentExpenses: RecentExpenses,
    AllExpenses: AllExpensesScreen,
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <StatusBar style="dark" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider>
            <NavigationContainer>
              <TabBar.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarActiveBackgroundColor: Colors.secondary400,
                  tabBarActiveTintColor: "white",
                  tabBarItemStyle: {
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    paddingVertical: 3,
                  },
                }}
              >
                <TabBar.Screen
                  name="RecentExpenses"
                  component={RecentExpenses}
                  options={{
                    title: "Recent Expenses",
                    tabBarIcon: ({ size, color }) => (
                      <Ionicons name="time" size={size} color={color} />
                    ),
                  }}
                  tabBarStyle
                />
                <TabBar.Screen
                  name="AllExpensesScreen"
                  component={AllExpensesScreen}
                  options={{
                    title: "All Expenses",
                    tabBarIcon: ({ size, color }) => (
                      <Ionicons name="today-sharp" size={size} color={color} />
                    ),
                  }}
                />
              </TabBar.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </PersistGate>
      </Provider>
    </>
  );
}
