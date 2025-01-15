import React from "react";
import {createNativeStackNavigator,} from "@react-navigation/native-stack";
import {useNavigation,} from "@react-navigation/native";
import {NativeStackNavigationProp} from "react-native-screens/lib/typescript/native-stack/types";

import {colors} from "@/src/constants/ColorsConstants";
import {NavigationCategoriesScreens} from "@/src/navigation/NavigationConstants";
import {CategoriesView} from "./CategoriesView";
import { MenuHeaderButton } from "@/src/navigation/MenuHeaderButton";


const Stack = createNativeStackNavigator()

export const CategoriesNavigation = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  
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
        name={NavigationCategoriesScreens.CategoriesView}
        component={CategoriesView}
        options={{
          headerTitle: "Categories",
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
