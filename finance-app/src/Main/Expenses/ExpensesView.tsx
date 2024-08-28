import React from "react";
import {
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { styles } from "./ExpensesViewStyles";

//Internal components
import { Button, ButtonVariants } from "@/src/components/Button";
import { NavigationAppScreens } from "@/src/navigation/NavigationConstants";
import { ExpensesList } from "./ExpensesList";

export const ExpensesView = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const onAddExpense = () => { 
    navigation.navigate(NavigationAppScreens.AddExpense)
  }

  return (
    <View style={styles.container}>      
      <ExpensesList onSelect={() => { console.log("on select expense") }}/> 
      <View style={styles.button}>
        <Button variant={ButtonVariants.Primary} title="Add Expense" onPress={onAddExpense} />
      </View>
    </View>
  )
}
