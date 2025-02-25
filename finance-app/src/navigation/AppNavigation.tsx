import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

//external components
import 'react-native-get-random-values';
import Toast from "react-native-toast-message";

//internal components
import { Login } from "../login/Login";
import { Register } from "../register/Register";
import { Tabs } from "../main/TabsNavigation";
import { LoadingScreen } from "../login/LoadingScreen";
import { NavigationAppScreens, NavigationMainScreens } from "./NavigationConstants";
import { AddCategory } from "../main/categories/AddCategory";
import { AddExpense } from "../main/expenses/AddExpense";
import { Expense } from "../constants/Expenses";
import { CategoryDetails } from "../main/categories/CategoryDetails";
import { Category } from "../constants/Category";
import { SettingsView } from "../main/settings/SettingsView";
import { autoHeader } from "./NavigationOptions";
import { ToastTypes } from "../constants/ToastConstants";
import { CategoryService } from "../services/CategoryService";
import { ExpensesService } from "../services/ExpensesService";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentCategory } from "../redux/slices/category";

export type RootStackParamList = {
  [NavigationAppScreens.LoadingScreen]: undefined
  [NavigationAppScreens.Login]: undefined
  [NavigationAppScreens.Register]: undefined
  [NavigationAppScreens.Tabs]: undefined
  [NavigationAppScreens.AddExpense]: { isEdit: boolean, expense: Expense }
  [NavigationAppScreens.AddCategory]: { isEdit: boolean, category: Category }
  [NavigationAppScreens.CategoryDetails]: { category: Category }
  [NavigationAppScreens.SettingsView]: undefined
}
const Stack = createNativeStackNavigator<RootStackParamList>()


export const AppNavigation = () => {  
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const dispatch = useDispatch()
  
  const currentCategory = useSelector((state: any) => getCurrentCategory(state)) 

  const { deleteCategory } = CategoryService()
  const { deleteExpense } = ExpensesService()  

  const onPressDeleteCategory = (category: Category) => {
    deleteCategory(category)
    Toast.show({
      type: ToastTypes.Success,
      text1: 'Category deleted successfully'
    })
    navigation.navigate(NavigationMainScreens.Categories)
  }

  const onPressDeleteExpense = (expense: Expense) => {
    deleteExpense(expense.uid)
    Toast.show({
      type: ToastTypes.Success,
      text1: 'Expense deleted successfully'
    })
    navigation.navigate(NavigationMainScreens.Expenses)
  }

  return (
    <Stack.Navigator screenOptions={(props) => autoHeader({ ...props, onPressDeleteCategory, onPressDeleteExpense, currentCategory, dispatch })}>
      <Stack.Screen name={NavigationAppScreens.LoadingScreen} component={LoadingScreen} />   
      <Stack.Screen name={NavigationAppScreens.Login} component={Login} />           
      <Stack.Screen name={NavigationAppScreens.Register} component={Register} />
      <Stack.Screen name={NavigationAppScreens.Tabs} component={Tabs} />
      <Stack.Screen name={NavigationAppScreens.AddCategory} component={AddCategory} />
      <Stack.Screen name={NavigationAppScreens.CategoryDetails} component={CategoryDetails} />
      <Stack.Screen name={NavigationAppScreens.AddExpense} component={AddExpense} />
      <Stack.Screen name={NavigationAppScreens.SettingsView} component={SettingsView} />  
    </Stack.Navigator>
  );
}
