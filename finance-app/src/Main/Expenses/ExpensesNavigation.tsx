import React, { useEffect } from "react";

import { ExpensesView } from "./ExpensesView";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import { requestPermissions } from "expo-sample-pedometer";

const Stack = createNativeStackNavigator();

export const ExpensesNavigation = () => {
  useEffect(() => {
    // requestPermissions();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "purple",
        },
        headerTitleStyle: {
          color: "white",
        },
      }}
    >
      <Stack.Screen
        name="ExpensesView"
        component={ExpensesView}
        options={{
          headerTitle: "Expenses",
        }}
      />
    </Stack.Navigator>
  );
};
