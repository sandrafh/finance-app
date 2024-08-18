import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { ExpensesNavigation } from "./expenses/ExpensesNavigation";
import { colors } from "../constants/ColorsConstants";
import { SettingsNavigation } from "./settings/SettingsNavigation";
import { NavigationMainScreens } from "../navigation/NavigationConstants";
import { CategoriesNavigation } from "./categories/CategoriesNavigation";

export const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case NavigationMainScreens.Expenses:
              return (
                <FontAwesome5
                  name="money-check"
                  size={30}
                  color={focused ? colors.primary : colors.grey2}
                  style={{marginTop: 5}}
                />
              )
            case NavigationMainScreens.Settings:
              return (
                <AntDesign 
                  name="setting" 
                  size={30} 
                  color={focused ? colors.primary : colors.grey2}
                  style={{marginTop: 5}}
                />
              )
            case NavigationMainScreens.Categories:
              return (
                <MaterialIcons 
                  name="category" 
                  size={30} 
                  color={focused ? colors.primary : colors.grey2}
                  style={{marginTop: 5}} 
                />
              )
            default:
              break;
          }
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.grey2,
        tabBarIndicatorStyle: {
          backgroundColor: colors.primary,
          height: 4,
          position: 'top'
        },
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 3, 
          boorderTopColor: colors.primary,   
          marginBottom: 5,     
        },
        tabBarLabelStyle: {
          top: 8
        }
      })}
    >
      <Tab.Screen
        name={NavigationMainScreens.Expenses}
        component={ExpensesNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={NavigationMainScreens.Categories}
        component={CategoriesNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={NavigationMainScreens.Settings}
        component={SettingsNavigation}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  )
}
