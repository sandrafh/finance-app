import { Category } from '@constants/Category'
import { Expense } from '@constants/Expenses'
import { formatDateMonth } from './functions'

export const getMonthlySpentByCategoryInAmount = (category: Category, month: number): string => {
  const totalMonthSpent =
    category?.expenses
      ?.filter((expense) => new Date(expense.date).getMonth() === month)
      .reduce((acc, expense) => acc + expense.spent, 0) || 0

  //if number has decimals trunc to 2 decimals else return as string
  if (totalMonthSpent % 1 !== 0) {
    return (totalMonthSpent * -1).toFixed(2)
  }
  return (totalMonthSpent * -1).toString()
}

export const getYearlySpentByCategoryInAmount = (category: Category, year: number): string => {
  const totalYearSpent =
    category?.expenses
      ?.filter((expense) => new Date(expense.date).getFullYear() === year)
      .reduce((acc, expense) => acc + expense.spent, 0) || 0

  //if number has decimals trunc to 2 decimals else return as string
  if (totalYearSpent % 1 !== 0) {
    return (totalYearSpent * -1).toFixed(2)
  }
  return (totalYearSpent * -1).toString()
}

export const getMonthlySpent = (expenses: Expense[], month: string, currentCategories: Category[] | null): number => {
  const monthExpenses = expenses.filter((expense) => {
    if (currentCategories) {
      const sameCategory = currentCategories.some((category) => category.uid === expense.categoryUid)
      if (!sameCategory) return false
    }
    const expenseMonth = formatDateMonth(expense.date)
    return month === expenseMonth
  })
  const totalExpenses = monthExpenses.reduce((acc, expense) => acc + expense.spent, 0)
  return totalExpenses
}

export const getYearlySpent = (expenses: Expense[], year: number, currentCategories: Category[] | null): number => {
  const yearExpenses = expenses.filter((expense) => {
    if (currentCategories) {
      const sameCategory = currentCategories.some((category) => category.uid === expense.categoryUid)
      if (!sameCategory) return false
    }
    const expenseYear = new Date(expense.date).getFullYear()
    return year === expenseYear
  })
  const totalExpenses = yearExpenses.reduce((acc, expense) => acc + expense.spent, 0)
  return totalExpenses
}

export const getExpectedSpent = (categories: Category[]): number => {
  const totalExpectedSpent = categories.reduce((acc, category) => acc + category.budget, 0)
  return totalExpectedSpent
}
