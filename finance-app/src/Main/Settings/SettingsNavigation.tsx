import React, { useEffect } from "react";



import { SettingsView } from "./SettingsView";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "@/src/constants/ColorsConstants";
import { NavigationSettingsScreens } from "@/src/navigation/NavigationConstants";
import { AddCategory } from "../categories/AddCategory";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { Button, ButtonVariants } from "@/src/components/Button";
import { IconButton } from "@/src/components/IconButton";

const Stack = createNativeStackNavigator()

export const SettingsNavigation = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
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
