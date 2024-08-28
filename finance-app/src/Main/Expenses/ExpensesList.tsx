import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { styles } from './ExpensesListStyles';

//Internal components
import { ExpenseItem } from './ExpenseItem';
import { getExpenses } from '@/src/redux/slices/expenses';
import { Expense } from '@/src/constants/Expenses';
import { CustomText, FontSize } from '@/src/components/CustomText';

interface GroupedExpenses {
  date: string
  expenses: Expense[]
}

interface ExpensesListProps {
  onSelect: (expense: Expense) => void
}

export const ExpensesList = ({ onSelect }: ExpensesListProps) => {
  const expenses = useSelector((state: any) => getExpenses(state))  

  const [groupedExpenses, setGroupedExpenses] = useState<GroupedExpenses[]>([])

  const formatDate = (isoDateString: string): string => {
    const date = new Date(isoDateString)
    return new Intl.DateTimeFormat('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date)
  }

  const groupExpensesByDate = (expenses: Expense[]): GroupedExpenses[] => {
    const grouped = expenses.reduce((acc, expense) => {
      const formattedDate = formatDate(expense.date)
      
      if (!acc[formattedDate]) {
        acc[formattedDate] = []
      }
      acc[formattedDate].push(expense)
      return acc;
    }, {} as Record<string, Expense[]>)
  
    const groupedExpenses = Object.keys(grouped).map((date) => ({
      date,
      expenses: grouped[date],
    }))
  
    return groupedExpenses.sort((a, b) => {
      const dateA = new Date(a.expenses[0].date).getTime()
      const dateB = new Date(b.expenses[0].date).getTime()
      return dateB - dateA
    })
  }

  useEffect(() => {
    setGroupedExpenses(groupExpensesByDate(expenses))
  }, [expenses])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {groupedExpenses.map(item => {
        return (
          <View key={item.date} style={styles.dayContainer}>
            <CustomText style={styles.day} fontSize={FontSize.Small}>{item.date}</CustomText>
            <View style={styles.separator}></View>
            {item.expenses.map(expense => (
              <View key={expense.uid}>
                <TouchableOpacity key={expense.uid} style={styles.card} onPress={() => onSelect(expense)}>
                  <ExpenseItem expense={expense} showCategory={true} />
                </TouchableOpacity>
                <View style={styles.separator}></View>
              </View> 
            ))}   
          </View>                         
        )        
      })}       
    </ScrollView>
  )
}