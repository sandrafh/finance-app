import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {ScrollView, TouchableOpacity, View} from 'react-native';

import {styles} from './ExpensesListStyles';
import {stylesApp} from "@/src/AppStyles"

//Internal components
import {ExpenseItem} from './ExpenseItem';
import {getExpenses} from '@/src/redux/slices/expenses';
import {Expense} from '@/src/constants/Expenses';
import {CustomText} from '@/src/components/CustomText';
import {FontSize} from '@/src/constants/Texts';

interface GroupedExpenses {
  date: string
  expenses: Expense[]
}

interface ExpensesListProps {
  onSelect: (expense: Expense) => void
  expensesList?: Expense[]
}

export const ExpensesList = ({ onSelect, expensesList }: ExpensesListProps) => {
  const allExpenses = useSelector((state: any) => getExpenses(state))  
  const expenses = expensesList?.length ? expensesList : allExpenses

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
    if(!expenses.length) return []
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
            <View style={styles.dateContainer}>
              <CustomText style={styles.date} fontSize={FontSize.Small}>{item?.date}</CustomText>
            </View>
            {item.expenses.map(expense => (
              <View key={expense.uid}>
                <TouchableOpacity key={expense.uid} style={styles.card} onPress={() => onSelect(expense)}>
                  <ExpenseItem expense={expense} showCategory={true} />
                </TouchableOpacity>
                {/* If last item of the day dont put separator */}
                {item.expenses[item.expenses.length - 1].uid !== expense.uid && 
                  <View style={stylesApp.separator}></View>
                }
              </View> 
            ))}   
          </View>                         
        )        
      })}       
    </ScrollView>
  )
}
