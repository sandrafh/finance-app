import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';

import { ExpensesNavigation } from "./Expenses/ExpensesNavigation";
import { colors } from "../Constants/ColorsConstants";
import { SettingsNavigation } from "./Settings/SettingsNavigation";
import { NavigationMainScreens } from "../Navigation/NavigationConstants";

export const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case NavigationMainScreens.Expenses:
              return (
                <FontAwesome5
                  name="money-check"
                  size={30}
                  color={focused ? colors.background1 : colors.background4}
                  style={{marginTop: 5}}
                />
              )
            case NavigationMainScreens.Settings:
              return (
                <AntDesign 
                  name="setting" 
                  size={30} 
                  color={focused ? colors.background1 : colors.background4}
                  style={{marginTop: 5}}
                />
              )
            default:
              break;
          }
        },
        tabBarActiveTintColor: colors.background1,
        tabBarInactiveTintColor: colors.background4,
        tabBarIndicatorStyle: {
          backgroundColor: colors.background1,
          height: 4,
          position: 'top'
        },
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 3, 
          boorderTopColor: colors.background1,   
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
        name={NavigationMainScreens.Settings}
        component={SettingsNavigation}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  )
}
