import React from "react";

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import ListIcon from '../assets/icons/list.svg';
import CategoriesIcon from '../assets/icons/categories.svg';
import StatsIcon from '../assets/icons/stats.svg';

import {colors} from "../constants/ColorsConstants";
import {NavigationMainScreens} from "../navigation/NavigationConstants";
import {StatsView} from "./stats/StatsView";
import {FontSize} from "../constants/Texts";
import { MenuHeaderButton } from "../navigation/MenuHeaderButton";
import { ExpensesView } from "./expenses/ExpensesView";
import { CategoriesView } from "./categories/CategoriesView";

const Tab = createBottomTabNavigator();

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
                  height={30}
                  color={focused ? colors.white : colors.grey3}
                  style={{marginTop: 5}}
                />
              )
            case NavigationMainScreens.Categories:
              return (
                <CategoriesIcon 
                  width={30} 
                  height={30}
                  color={focused ? colors.white : colors.grey3}
                  style={{marginTop: 5}} 
                />
              )
            case NavigationMainScreens.Stats:
              return (
                <StatsIcon 
                  width={30} 
                  height={30}
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
        headerShadowVisible: false,
      })}
    >
      <Tab.Screen
        name={NavigationMainScreens.Expenses}
        component={ExpensesView}
        options={{
          headerTitle: "Expenses",
          headerStyle: {
            backgroundColor: colors.bg,
          },
          headerTitleStyle: {
            color: colors.white,
          },
          headerRight: () => {
            return (              
              <MenuHeaderButton />
            )
          }
        }}
      />
      <Tab.Screen
        name={NavigationMainScreens.Categories}
        component={CategoriesView}
        options={{
          headerTitle: "Categories",
          headerStyle: {
            backgroundColor: colors.bg,
          },
          headerTitleStyle: {
            color: colors.white,
          },
          headerRight: () => {
            return (              
              <MenuHeaderButton />
            )
          }
        }}
      />
      <Tab.Screen
        name={NavigationMainScreens.Stats}
        component={StatsView}
        options={{
          title: 'Stats',
          headerStyle: {
            backgroundColor: colors.bg,
          },
          headerTitleStyle: {
            color: colors.white,
          },
          headerRight: () => {
            return (              
              <MenuHeaderButton />
            )
          }
        }}
      />
    </Tab.Navigator>
  )
}
