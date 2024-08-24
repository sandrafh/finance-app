import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ScrollView, TouchableOpacity } from 'react-native';

import { styles } from './ExpensesListStyles';

//Internal components
import { ExpenseItem } from './ExpenseItem';
import { getExpenses } from '@/src/redux/slices/expenses';
import { Expense } from '@/src/constants/Expenses';

interface ExpensesListProps {
  onSelect: (expense: Expense) => void
}

export const ExpensesList = ({ onSelect }: ExpensesListProps) => {
  const expenses = useSelector((state: any) => getExpenses(state))  

  const orderedExpenses = useMemo(() => {
    const expensesCopy = [...expenses]
    expensesCopy.sort((a: Expense, b: Expense) => {
      return a.date < b.date ? 1 : -1
    })
    return expensesCopy
  }, [expenses])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {orderedExpenses.map(expense => {
        return (
          <TouchableOpacity key={expense.uid} style={styles.card} onPress={() => onSelect(expense)}>
            <ExpenseItem expense={expense} showCategory={true} />
          </TouchableOpacity>
        )        
      })}       
    </ScrollView>
  )
}