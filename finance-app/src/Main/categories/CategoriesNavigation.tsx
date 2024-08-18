import React from "react";
import { createNativeStackNavigator,  } from "@react-navigation/native-stack";
import { useNavigation,  } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

import { colors } from "@/src/constants/ColorsConstants";
import { NavigationCategoriesScreens } from "@/src/navigation/NavigationConstants";
import { CategoriesList } from "./CategoriesList";


const Stack = createNativeStackNavigator()

export const CategoriesNavigation = () => {
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
        name={NavigationCategoriesScreens.CategoriesList}
        component={CategoriesList}
        options={{
          headerTitle: "Categories",
        }}
      />      
    </Stack.Navigator>
  )
}
