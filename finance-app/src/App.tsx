import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import Toast from 'react-native-toast-message';
import { AppNavigation } from "./navigation/AppNavigation";
import { toastConfig } from "./components/ToastConfig";


export default function App() {    
  return (
    <>
      <NavigationContainer>             
        <AppNavigation />
      </NavigationContainer>
      <Toast config={toastConfig} /> 
    </>
  )
}
