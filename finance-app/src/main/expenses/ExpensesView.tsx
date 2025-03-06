import React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { styles } from './ExpensesViewStyles'

//Internal components
import { CustomButton, ButtonVariants } from '@components/CustomButton'
import { NavigationAppScreens } from '@navigation/NavigationConstants'
import { ExpensesList } from './ExpensesList'
import { getCategories } from '@redux/slices/category'
import { getExpenses } from '@redux/slices/expenses'
import { EmptyMessage } from '@components/EmptyMessage'

export const ExpensesView = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const haveCategories = useSelector((state: any) => getCategories(state)).length > 0
  const expenses = useSelector((state: any) => getExpenses(state))

  const onAddExpense = () => {
    navigation.navigate(NavigationAppScreens.AddExpense)
  }

  return (
    <View style={styles.container}>
      {expenses.length === 0 ? (
        <EmptyMessage text="No expenses yet" />
      ) : (
        <ExpensesList
          onSelect={() => {
            console.log('on select expense')
          }}
        />
      )}
      {haveCategories && (
        <View style={styles.button}>
          <CustomButton variant={ButtonVariants.Primary} title="Add Expense" onPress={onAddExpense} />
        </View>
      )}
    </View>
  )
}
