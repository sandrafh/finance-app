import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../slices/user'
import categorySlice from '../slices/category'
import expensesSlice from '../slices/expenses'

export const store = configureStore({
  reducer: {
    user: userSlice,
    category: categorySlice,
    expenses: expensesSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
