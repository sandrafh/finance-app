import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export enum CategoryBudgetTypeEnum {
  Percentage = "%",
  Amount = "€"
}

interface SettingsState {
  categoryBudgetType: CategoryBudgetTypeEnum
}

const initialState: SettingsState = {
  categoryBudgetType: CategoryBudgetTypeEnum.Amount
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setCategoryBudgetType: (state, action: PayloadAction<CategoryBudgetTypeEnum>) => {
      state.categoryBudgetType = action.payload
    }
  },
})

export const {
  setCategoryBudgetType
} = settingsSlice.actions

export const getCategoryBudgetType = (state: RootState): CategoryBudgetTypeEnum => state.settings.categoryBudgetType

export default settingsSlice.reducer
