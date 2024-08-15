import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import Ionicons from "@expo/vector-icons/Ionicons";
import { ExpensesNavigation } from "./Expenses/ExpensesNavigation";

export const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Leaderboard") {
            iconName = "analytics-outline" as const;
          } else {
            iconName = "newspaper-outline" as const;
          }
          return (
            <Ionicons
              name={iconName}
              size={30}
              color={focused ? "purple" : "grey"}
            />
          );
        },
        tabBarActiveTintColor: "purple",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Expenses"
        component={ExpensesNavigation}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
