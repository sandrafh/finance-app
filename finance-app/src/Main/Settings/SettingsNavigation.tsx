import React, { useEffect } from "react";

import BackArrowIcon from "../../../assets/icons/back-arrow.svg";

import { SettingsView } from "./SettingsView";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "@/src/Constants/ColorsConstants";
import { NavigationSettingsScreens } from "@/src/Navigation/NavigationConstants";
import { AddCategory } from "./AddCategory";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { Button, ButtonVariants } from "@/src/Components/Button";
import { IconButton } from "@/src/Components/IconButton";

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
      <Stack.Screen
        name={NavigationSettingsScreens.AddCategory}
        component={AddCategory}
        options={{
          title: '',
          headerLeft: () => {
            return (
              <IconButton 
                icon={<BackArrowIcon width={16} height={16} color={colors.white} />} 
                onPress={() => navigation.navigate(NavigationSettingsScreens.SettingsView)} 
              />
            )
          }
        }}
      />
    </Stack.Navigator>
  )
}
