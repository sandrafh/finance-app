import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
//Internal components
import { Button, ButtonVariants } from "@/src/components/Button";
import { colors } from "@/src/constants/ColorsConstants";
import { getUserUid } from "@/src/redux/slices/user";
import { CustomText } from "@/src/components/CustomText";
import { getExpenses } from "@/src/redux/slices/expenses";
import { NavigationAppScreens } from "@/src/navigation/NavigationConstants";

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
    <View style={{ flex: 1, backgroundColor: colors.lightBlue }}>      
      {/* <StatusBar backgroundColor="purple" /> */}
      <View style={styles.cardComponent}>
        <View style={styles.card}>
          <CustomText>Expenses</CustomText>
        </View>
      </View>  
      <View style={styles.buttonContainer}>
        <Button variant={ButtonVariants.Primary} title="Add Expense" onPress={onAddExpense} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 20,
  },
  cardComponent: {
    width: "auto",
    display: "flex",
    margin: 15
  },
  card: {
    height: 200,
    display: "flex",
    borderRadius: 8,
    backgroundColor: colors.accentOrange,
    padding: 12,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 6,
  }
})
