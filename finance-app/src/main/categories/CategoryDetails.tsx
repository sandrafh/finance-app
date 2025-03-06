import React, { useMemo } from 'react'
import { View } from 'react-native'

import { styles } from './CategoryDetailsStyles'

//Internal components
import { useSelector } from 'react-redux'
import { getCurrentCategory } from '@redux/slices/category'
import { getExpenses } from '@redux/slices/expenses'
import { Category } from '@constants/Category'
import { ExpensesList } from '../expenses/ExpensesList'
import { StatsChart } from '../stats/StatsChart'
import { CategoryBudgetTypeEnum } from '@constants/Settings'
import { getCategoryBudgetType } from '@redux/slices/settings'
import { RootState } from '@redux/store'
import { InfoText } from '@components/InfoText'

export const CategoryDetails = () => {
  const currentCategory = useSelector((state: any) => getCurrentCategory(state)) as Category
  const expenses = useSelector((state: any) => getExpenses(state))
  const categoryBudgetType: CategoryBudgetTypeEnum = useSelector((state: RootState) => getCategoryBudgetType(state))

  const categoryExpensesList = useMemo(() => {
    return expenses.filter(
      (expense: any) =>
        expense.categoryUid === currentCategory.uid ||
        currentCategory.categories?.some((category: any) => category.uid === expense.categoryUid)
    )
  }, [expenses, currentCategory])

  return (
    <View style={styles.container}>
      <InfoText
        text={`This category has ${currentCategory.budget.toString()}${categoryBudgetType} of the total budget`}
      />
      <StatsChart />
      <ExpensesList expensesList={categoryExpensesList} onSelect={() => {}} />
    </View>
  )
}
