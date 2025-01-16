import { Category } from "../constants/Category"
import { Expense } from "../constants/Expenses"
import { formatDateMonth } from "./functions"

export const getMonthlySpentByCategoryInPercentage = (category: Category, categoryInAmount: number, month: number): string => {
    const totalMonthSpent = category?.expenses?.filter(expense => new Date(expense.date).getMonth() === month)
                                              .reduce((acc, expense) => acc + expense.spent, 0) || 0     
    return (totalMonthSpent * -1 / categoryInAmount * 100).toPrecision(3)
}

export const getYearlySpentByCategoryInPercentage = (category: Category, categoryInAmount: number, year: number): string => {
    const totalYearSpent = category?.expenses?.filter(expense => new Date(expense.date).getFullYear() === year)
                                              .reduce((acc, expense) => acc + expense.spent, 0) || 0
    return (totalYearSpent * -1 / categoryInAmount * 100).toPrecision(3)
}

export const getMonthlySpent = (expenses: Expense[], month: string, currentCategories: Category[] | null): number => {
  const monthExpenses = expenses.filter((expense) => {
    if(currentCategories) {
      const sameCategory = currentCategories.some(category => category.uid === expense.categoryUid)
      if(!sameCategory) return false
    }
    const expenseMonth = formatDateMonth(expense.date)
    return month === expenseMonth
  })
  const totalExpenses = monthExpenses.reduce((acc, expense) => acc + expense.spent, 0)
  return totalExpenses
}

export const getYearlySpent = (expenses: Expense[], year: number, currentCategories: Category[] | null): number => {
  const yearExpenses = expenses.filter((expense) => {
    if(currentCategories) {
      const sameCategory = currentCategories.some(category => category.uid === expense.categoryUid)
      if(!sameCategory) return false
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