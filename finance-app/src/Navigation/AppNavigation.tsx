import React from "react";

import 'react-native-get-random-values';

import BackArrowIcon from "../assets/icons/back-arrow.svg";

import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Login } from "../login/Login";
import { Register } from "../register/Register";
import { Tabs } from "../main/TabsNavigation";
import { LoadingScreen } from "../login/LoadingScreen";
import { NavigationAppScreens } from "./NavigationConstants";
import { AddCategory } from "../main/categories/AddCategory";
import { IconButton } from "../components/IconButton";
import { colors } from "../constants/ColorsConstants";
import { AddExpense } from "../main/expenses/AddExpense";
import { Expense } from "../constants/Expenses";


export type RootStackParamList = {
  [NavigationAppScreens.AddExpense]: { isEdit: boolean, expense: Expense }
}
const Stack = createNativeStackNavigator<RootStackParamList>()


export const AppNavigation = () => {  
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NavigationAppScreens.LoadingScreen}
        component={LoadingScreen}
        options={{
          headerShown: false,
        }}
      />   
      <Stack.Screen
        name={NavigationAppScreens.Login}
        component={Login}
        options={{
          headerShown: false,
        }}
      />           
      <Stack.Screen
        name={NavigationAppScreens.Register}
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationAppScreens.Tabs}
        component={Tabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationAppScreens.AddCategory}
        component={AddCategory}
        options={{
          title: 'New Category',
          headerStyle: {
            backgroundColor: colors.bg,
          },
          headerTitleStyle: {
            color: colors.white,
          },         
          headerLeft: () => {
            return (
              <IconButton 
                icon={<BackArrowIcon width={16} height={16} color={colors.white} />} 
                onPress={() => navigation.navigate(NavigationAppScreens.Tabs)} 
              />
            )
          }
        }}
      />
      <Stack.Screen
        name={NavigationAppScreens.AddExpense}
        component={AddExpense}
        options={(props) => ({
          title: props.route?.params?.isEdit ? 'Edit Expense' : 'New Expense',
          headerStyle: {
            backgroundColor: colors.bg,
          },
          headerTitleStyle: {
            color: colors.white,
          },         
          headerLeft: () => {
            return (
              <IconButton 
                icon={<BackArrowIcon width={16} height={16} color={colors.white} />} 
                onPress={() => navigation.navigate(NavigationAppScreens.Tabs)} 
              />
            )
          }
        })}
      />
    </Stack.Navigator>
  );
}
