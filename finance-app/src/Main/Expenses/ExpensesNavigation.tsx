import React, { useEffect } from "react";

import { ExpensesView } from "./ExpensesView";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "@/src/constants/ColorsConstants";
import { NavigationExpensesScreens } from "@/src/navigation/NavigationConstants";

const Stack = createNativeStackNavigator();

export const ExpensesNavigation = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.bg,
        },
        headerTitleStyle: {
          color: colors.white,
        },
      }}
    >
      <Stack.Screen
        name={NavigationExpensesScreens.ExpensesView}
        component={ExpensesView}
        options={{
          headerTitle: "Expenses",
        }}
      />
    </Stack.Navigator>
  )
}
