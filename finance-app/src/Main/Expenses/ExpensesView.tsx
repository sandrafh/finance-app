import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { styles } from "./ExpensesViewStyles";

//Internal components
import { Button, ButtonVariants } from "@/src/components/Button";
import { colors } from "@/src/constants/ColorsConstants";
import { getUserUid } from "@/src/redux/slices/user";
import { CustomText } from "@/src/components/CustomText";
import { getExpenses } from "@/src/redux/slices/expenses";
import { NavigationAppScreens } from "@/src/navigation/NavigationConstants";
import { ExpensesList } from "./ExpensesList";

export const ExpensesView = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const userUid = useSelector((state: any) => getUserUid(state))
  const expenses = useSelector((state: any) => getExpenses(state))

  useEffect(() => {
    
  }, [])

  const onAddExpense = () => { 
    navigation.navigate(NavigationAppScreens.AddExpense)
  }

  return (
    <View style={styles.container}>      
      <ExpensesList onSelect={() => { console.log("on select expense") }}/> 
      <View>
        <Button variant={ButtonVariants.Primary} title="Add Expense" onPress={onAddExpense} />
      </View>
    </View>
  )
}
