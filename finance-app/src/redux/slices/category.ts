import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { Category } from '@/src/constants/Category'

interface CategoryState {
  categories: Category[]
}

const initialState: CategoryState = {
  categories: [],
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload
    }
  },
})

export const {
  setCategories,
} = categorySlice.actions

export const getCategories = (state: RootState): Category[] => state.category.categories

export default categorySlice.reducer
