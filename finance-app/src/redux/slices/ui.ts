import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { Category } from '@/src/constants/Category'

interface UiState {
  addExpense: {
    selectedCategory: Category
  }
}

const initialState: UiState = {
  addExpense: {
    selectedCategory: {} as Category
  }
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<Category>) => {
      state.addExpense.selectedCategory = action.payload
    }
  },
})

export const {
  setSelectedCategory,
} = uiSlice.actions

export const getSelectedCategory = (state: RootState): Category => state.ui.addExpense.selectedCategory

export default uiSlice.reducer
