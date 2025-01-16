import React from "react";

import 'react-native-get-random-values';

import BackArrowIcon from "../assets/icons/back-arrow.svg";
import TrashIcon from "../assets/icons/trash.svg";

import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Login } from "../login/Login";
import { Register } from "../register/Register";
import { Tabs } from "../main/TabsNavigation";
import { LoadingScreen } from "../login/LoadingScreen";
import { NavigationAppScreens } from "./NavigationConstants";
import { AddCategory } from "../main/categories/AddCategory";
import { IconButton } from "../components/IconButton";
import { colors } from "../constants/ColorsConstants";
import { AddExpense } from "../main/expenses/AddExpense";
import { Expense } from "../constants/Expenses";
import { CategoryDetails } from "../main/categories/CategoryDetails";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentCategory, setCurrentCategory } from "../redux/slices/category";
import { Category } from "../constants/Category";
import { CategoryService } from "../services/CategoryService";
import Toast from "react-native-toast-message";
import { ToastTypes } from "../constants/ToastConstants";
import { ExpensesService } from "../services/ExpensesService";
import { SettingsView } from "../main/settings/SettingsView";


export type RootStackParamList = {
  [NavigationAppScreens.AddExpense]: { isEdit: boolean, expense: Expense }
  [NavigationAppScreens.AddCategory]: { isEdit: boolean, category: Category }
}
const Stack = createNativeStackNavigator<RootStackParamList>()


export const AppNavigation = () => {  
  const dispatch = useDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const { deleteCategory } = CategoryService()
  const { deleteExpense } = ExpensesService()

  const currentCategory = useSelector((state: any) => getCurrentCategory(state))

  const onPressDeleteCategory = (category: Category) => {
    deleteCategory(category)
    Toast.show({
      type: ToastTypes.Success,
      text1: 'Category deleted successfully'
    })
    navigation.navigate(NavigationAppScreens.CategoriesView)
  }

  const onPressDeleteExpense = (expense: Expense) => {
    deleteExpense(expense.uid)
    Toast.show({
      type: ToastTypes.Success,
      text1: 'Expense deleted successfully'
    })
    navigation.navigate(NavigationAppScreens.ExpensesView)
  }

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
        name={NavigationAppScreens.Tabs}
        component={Tabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NavigationAppScreens.AddCategory}
        component={AddCategory}
        options={(props) => ({
          title: props.route?.params?.isEdit ? 'Edit Category' : 'New Category',
          headerStyle: {
            backgroundColor: colors.bg,
          },
          headerTitleStyle: {
            color: colors.white,
          },         
          headerLeft: () => {
            return (
              <IconButton 
                icon={<BackArrowIcon width={16} height={16} color={colors.white} />} 
                onPress={() => navigation.navigate(NavigationAppScreens.Tabs)} 
              />
            )
          },
          headerRight: () => {
            if(props.route?.params?.isEdit) {
              return (
                <IconButton 
                  icon={<TrashIcon width={24} height={24} color={colors.danger} />} 
                  onPress={() => onPressDeleteCategory(props.route.params?.category)} 
                  backgroundColor={colors.bgInput}
                />
              )
            }
          }
        })}
      />
      <Stack.Screen
        name={NavigationAppScreens.CategoryDetails}
        component={CategoryDetails}
        options={{
          title: currentCategory?.name,
          headerStyle: {
            backgroundColor: colors.bg,
          },
          headerTitleStyle: {
            color: colors.white,
          },         
          headerLeft: () => {
            return (
              <IconButton 
                icon={<BackArrowIcon width={16} height={16} color={colors.white} />} 
                onPress={() => {
                  dispatch(setCurrentCategory(null))
                  navigation.navigate(NavigationAppScreens.Tabs)
                }} 
              />
            )
          }
        }}
      />
      <Stack.Screen
        name={NavigationAppScreens.AddExpense}
        component={AddExpense}
        options={(props) => ({
          title: props.route?.params?.isEdit ? 'Edit Expense' : 'New Expense',
          headerStyle: {
            backgroundColor: colors.bg,
          },
          headerTitleStyle: {
            color: colors.white,
          },         
          headerLeft: () => {
            return (
              <IconButton 
                icon={<BackArrowIcon width={16} height={16} color={colors.white} />} 
                onPress={() => navigation.goBack()} 
              />
            )
          },
          headerRight: () => {
            if(props.route?.params?.isEdit) {
              return (
                <IconButton 
                  icon={<TrashIcon width={24} height={24} color={colors.danger} />} 
                  onPress={() => onPressDeleteExpense(props.route.params?.expense)} 
                  backgroundColor={colors.bgInput}
                />
              )
            }
          }
        })}
      />
      <Stack.Screen
        name={NavigationAppScreens.SettingsView}
        component={SettingsView}
        options={{
          headerTitle: "Settings",
        }}
      />  
    </Stack.Navigator>
  );
}
