import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export enum CategoryBudgetTypeEnum {
  Percentage = "%",
  Amount = "€"
}

export enum VisualizationTypeEnum {
  Monthly = "Monthly",
  Yearly = "Yearly"
}

interface SettingsState {
  categoryBudgetType: CategoryBudgetTypeEnum,
  visualization: VisualizationTypeEnum
}

const initialState: SettingsState = {
  categoryBudgetType: CategoryBudgetTypeEnum.Amount,
  visualization: VisualizationTypeEnum.Monthly
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setCategoryBudgetType: (state, action: PayloadAction<CategoryBudgetTypeEnum>) => {
      state.categoryBudgetType = action.payload
    },
    setVisualization: (state, action: PayloadAction<VisualizationTypeEnum>) => {
      state.visualization = action.payload
    }
  },
})

export const {
  setCategoryBudgetType,
  setVisualization
} = settingsSlice.actions

export const getCategoryBudgetType = (state: RootState): CategoryBudgetTypeEnum => state.settings.categoryBudgetType
export const getVisualization = (state: RootState): VisualizationTypeEnum => state.settings.visualization

export default settingsSlice.reducer
