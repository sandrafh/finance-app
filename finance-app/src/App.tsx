import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
//External libraries
import Toast from 'react-native-toast-message';
//Internal components
import { AppNavigation } from "./navigation/AppNavigation";
import { toastConfig } from "./components/ToastConfig";
import { CategoryService } from "./services/CategoryService";
import { useSelector } from "react-redux";
import { getUserUid } from "./redux/slices/user";
import { ExpensesService } from "./services/ExpensesService";
import { SettingsService } from "./services/SettingsService";
import { ProfileService } from "./services/ProfileService";


export default function App() {    
  const { subscribeToCategories } = CategoryService()
  const { subscribeToExpenses } = ExpensesService()
  const { subscribeToSettings } = SettingsService()
  const { subscribeToProfile } = ProfileService()

  const userUid = useSelector((state: any) => getUserUid(state))

  useEffect(() => {
    if(userUid) {
      subscribeToChanges()
    }
  }, [userUid])

  const subscribeToChanges = () => {
    subscribeToCategories()
    subscribeToExpenses()
    subscribeToSettings()
    subscribeToProfile()
  }

  return (
    <>
      <NavigationContainer>             
        <AppNavigation />
      </NavigationContainer>
      <Toast config={toastConfig} /> 
    </>
  )
}
