import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { Expense } from '@/src/constants/Expenses'

interface ExpenseState {
  expenses: Expense[]
}

const initialState: ExpenseState = {
  expenses: [],
}

export const expensesSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    setExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.expenses = action.payload
    }
  },
})

export const {
  setExpenses,
} = expensesSlice.actions

export const getExpenses = (state: RootState): Expense[] => state.expenses.expenses

export default expensesSlice.reducer
