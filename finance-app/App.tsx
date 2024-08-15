import React from "react";

import 'react-native-get-random-values';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "./src/Login/Login";
import { Register } from "./src/Register/Register";
import { Main } from "./src/Main/Main";
import { LoadingScreen } from "./src/Login/LoadingScreen";
import { NavigationAppScreens } from "./src/Navigation/NavigationConstants";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={NavigationAppScreens.Login}
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          {/* <Stack.Screen
            name={NavigationAppScreens.LoadingScreen}
            component={LoadingScreen}
            options={{
              headerShown: false,
            }}
          />         */}
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
