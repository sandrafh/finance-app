import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { Category } from '@/src/constants/Category'

interface UiState {
  addExpense: {
    selectedCategory: Category
  },
  addCategory: {
    selectedParentCategory: Category
  }
}

const initialState: UiState = {
  addExpense: {
    selectedCategory: {} as Category
  },
  addCategory: {
    selectedParentCategory: {} as Category
  }
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<Category>) => {
      state.addExpense.selectedCategory = action.payload
    },
    setSelectedParentCategory: (state, action: PayloadAction<Category>) => {
      state.addCategory.selectedParentCategory = action.payload
    }
  },
})

export const {
  setSelectedCategory,
  setSelectedParentCategory
} = uiSlice.actions

export const getSelectedCategory = (state: RootState): Category => state.ui.addExpense.selectedCategory
export const getSelectedParentCategory = (state: RootState): Category => state.ui.addCategory.selectedParentCategory

export default uiSlice.reducer
