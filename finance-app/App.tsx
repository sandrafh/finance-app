import React from "react";

import 'react-native-get-random-values';

import { NavigationContainer } from "@react-navigation/native";
import Toast from 'react-native-toast-message';

import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { AppNavigation } from "./src/navigation/AppNavigation";
import { toastConfig } from "./src/components/ToastConfig";


export default function App() {    
  return (
    <Provider store={store}>
      <NavigationContainer>             
        <AppNavigation />
      </NavigationContainer>
      <Toast config={toastConfig} /> 
    </Provider>
  );
}
