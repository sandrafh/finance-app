import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { CategoryBudgetTypeEnum, VisualizationTypeEnum } from '@/src/constants/Settings'

interface SettingsState {
  categoryBudgetType: CategoryBudgetTypeEnum
  visualization: VisualizationTypeEnum
  totalIncome: string
}

const initialState: SettingsState = {
  categoryBudgetType: CategoryBudgetTypeEnum.Amount,
  visualization: VisualizationTypeEnum.Monthly,
  totalIncome: '0',
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
    },
    setTotalIncome: (state, action: PayloadAction<string>) => {
      state.totalIncome = action.payload
    },
  },
})

export const { setCategoryBudgetType, setVisualization, setTotalIncome } = settingsSlice.actions

export const getCategoryBudgetType = (state: RootState): CategoryBudgetTypeEnum => state.settings.categoryBudgetType
export const getVisualization = (state: RootState): VisualizationTypeEnum => state.settings.visualization
export const getTotalIncome = (state: RootState): string => state.settings.totalIncome

export default settingsSlice.reducer
