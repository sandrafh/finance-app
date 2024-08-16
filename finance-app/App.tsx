import React, { useState } from "react";

import 'react-native-get-random-values';

import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { AppNavigation } from "./src/AppNavigation";
import { ColorPickerModal } from "./src/Modals/ColorPickerModal";


export default function App() {  
  return (
    <Provider store={store}>
      <NavigationContainer>        
        <AppNavigation />
      </NavigationContainer>
    </Provider>
  );
}
