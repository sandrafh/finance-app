import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../slices/user'
import categorySlice from '../slices/category'

export const store = configureStore({
  reducer: {
    user: userSlice,
    category: categorySlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
