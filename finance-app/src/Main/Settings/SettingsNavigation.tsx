import React, { useEffect } from "react";

import { SettingsView } from "./SettingsView";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "@/src/Constants/ColorsConstants";
import { NavigationSettingsScreens } from "@/src/Navigation/NavigationConstants";

const Stack = createNativeStackNavigator()

export const SettingsNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background1,
        },
        headerTitleStyle: {
          color: colors.white,
        },
      }}
    >
      <Stack.Screen
        name={NavigationSettingsScreens.SettingsView}
        component={SettingsView}
        options={{
          headerTitle: "Settings",
        }}
      />
    </Stack.Navigator>
  )
}
