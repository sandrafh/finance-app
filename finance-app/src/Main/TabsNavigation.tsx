import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import ListIcon from '../assets/icons/list.svg';
import CategoriesIcon from '../assets/icons/categories.svg';
import SettingsIcon from '../assets/icons/settings.svg';

import { ExpensesNavigation } from "./expenses/ExpensesNavigation";
import { colors } from "../constants/ColorsConstants";
import { SettingsNavigation } from "./settings/SettingsNavigation";
import { NavigationMainScreens } from "../navigation/NavigationConstants";
import { CategoriesNavigation } from "./categories/CategoriesNavigation";
import { FontSize } from "../components/CustomText";

export const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case NavigationMainScreens.Expenses:
              return (
                <ListIcon
                  width={30}
                  color={focused ? colors.white : colors.grey3}
                  style={{marginTop: 5}}
                />
              )
            case NavigationMainScreens.Categories:
              return (
                <CategoriesIcon 
                  width={30} 
                  color={focused ? colors.white : colors.grey3}
                  style={{marginTop: 5}} 
                />
              )
            case NavigationMainScreens.Settings:
              return (
                <SettingsIcon 
                  width={30} 
                  color={focused ? colors.white : colors.grey3}
                  style={{marginTop: 5}}
                />
              )            
            default:
              break;
          }
        },
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.grey3,
        indicatorStyle: {
          backgroundColor: colors.white,
          height: 4,
          position: 'bottom'
        },
        tabBarStyle: {
          backgroundColor: colors.bg,   
          borderTopWidth: 0,
          
        },
        tabBarLabelStyle: {
          top: 8,
          fontSize: FontSize.Small,
        },
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
