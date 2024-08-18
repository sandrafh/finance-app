import React from "react";

import 'react-native-get-random-values';

import BackArrowIcon from "./assets/icons/back-arrow.svg";

import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Login } from "./Login/Login";
import { Register } from "./Register/Register";
import { Main } from "./Main/Main";
import { LoadingScreen } from "./Login/LoadingScreen";
import { NavigationAppScreens } from "./Navigation/NavigationConstants";
import { AddCategory } from "./Main/Settings/AddCategory";
import { IconButton } from "./Components/IconButton";
import { colors } from "./Constants/ColorsConstants";


export const AppNavigation = () => {
  const Stack = createNativeStackNavigator();
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
        name={NavigationAppScreens.Main}
        component={Main}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationAppScreens.AddCategory}
        component={AddCategory}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitleStyle: {
            color: colors.white,
          },         
          headerLeft: () => {
            return (
              <IconButton 
                icon={<BackArrowIcon width={16} height={16} color={colors.white} />} 
                onPress={() => navigation.navigate(NavigationAppScreens.Main)} 
              />
            )
          }
        }}
      />
    </Stack.Navigator>
  );
}
