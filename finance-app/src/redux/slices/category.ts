import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { Category } from '@/src/constants/Category'

interface CategoryState {
  categories: Category[],
  currentCategory: Category | null
}

const initialState: CategoryState = {
  categories: [],
  currentCategory: null
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload
    },
    setCurrentCategory: (state, action: PayloadAction<Category|null>) => {
      state.currentCategory = action.payload
    }
  },
})

export const {
  setCategories,
  setCurrentCategory
} = categorySlice.actions

export const getCategories = (state: RootState): Category[] => state.category.categories
export const getCurrentCategory = (state: RootState): Category | null => state.category.currentCategory
export const getSubCategories = (state: RootState): Category[] => {
  let subCategories: Category[] = []
  state.category.categories.forEach(category => {
    if(!!category.categories) subCategories = subCategories.concat(category.categories)
  })
  return subCategories
}

export default categorySlice.reducer
