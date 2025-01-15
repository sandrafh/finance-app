import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

//Internal imports
import {ExpensesView} from "./ExpensesView";
import {colors} from "@/src/constants/ColorsConstants";
import {NavigationExpensesScreens} from "@/src/navigation/NavigationConstants";
import { MenuHeaderButton } from "@/src/navigation/MenuHeaderButton";

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
          headerRight: () => {
            return (              
              <MenuHeaderButton />
            )
          }
        }}
      />
    </Stack.Navigator>
  )
}
