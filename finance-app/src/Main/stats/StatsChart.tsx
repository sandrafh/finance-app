import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { View, Dimensions } from 'react-native'

import { styles } from './StatsChartStyles'

//External components
import { BarChart } from 'react-native-gifted-charts'

//Internal components
import { getCategoryBudgetType, getTotalIncome, getVisualization } from '@redux/slices/settings'
import { RootState } from '@redux/store'
import { getCategories, getCurrentCategory } from '@redux/slices/category'
import { colors } from '@constants/ColorsConstants'
import { getExpenses } from '@redux/slices/expenses'
import { getExpectedSpent, getMonthlySpent, getYearlySpent } from '@utils/stats'
import { formatDateMonth } from '@utils/functions'
import { OptionsType, Switch } from '@components/Switch'
import { CategoryBudgetTypeEnum, VisualizationTypeEnum } from '@constants/Settings'
import { FontSize } from '@constants/Texts'

interface DataStats {
  value: number
  label?: string
  spacing?: number
  labelWidth?: number
  labelTextStyle?: { color: string }
  frontColor: string
}

export const StatsChart = () => {
  const categoryBudgetType: CategoryBudgetTypeEnum = useSelector((state: RootState) => getCategoryBudgetType(state))
  const visualizationType = useSelector((state: RootState) => getVisualization(state))
  const totalIncome = useSelector((state: RootState) => getTotalIncome(state))
  const expenses = useSelector((state: RootState) => getExpenses(state))
  const categories = useSelector((state: RootState) => getCategories(state))
  const currentCategory = useSelector((state: RootState) => getCurrentCategory(state))

  const currentCategories = useMemo(() => {
    if (currentCategory) {
      if (currentCategory.categories?.length) {
        return currentCategory.categories.concat(currentCategory)
      }
      return [currentCategory]
    }
    return categories
  }, [currentCategory])

  const initVisualizationOptions: OptionsType = {
    [VisualizationTypeEnum.Monthly]: visualizationType === VisualizationTypeEnum.Monthly,
    [VisualizationTypeEnum.Yearly]: visualizationType === VisualizationTypeEnum.Yearly,
  }

  const [visualizationOptions, setVisualizationOptions] = useState(initVisualizationOptions)

  const getLastMonths = () => {
    const today = new Date()
    const numberOfMonths = Math.floor((Dimensions.get('window').width * 0.7) / 50) // 50 is what one month takes

    const lastMonths = []
    for (let i = 0; i < numberOfMonths; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1)
      const month = formatDateMonth(date.toString())
      lastMonths.push(month)
    }
    return lastMonths.reverse()
  }

  const getLastYears = () => {
    const today = new Date()
    const numberOfYears = Math.floor((Dimensions.get('window').width * 0.7) / 74) // 74 is what one year takes

    const lastYears = []
    for (let i = 0; i < numberOfYears; i++) {
      const date = new Date(today.getFullYear() - i, today.getMonth(), 1)
      const year = date.getFullYear()
      lastYears.push(year)
    }
    return lastYears.reverse()
  }

  const getPercentage = (spent: number, expected: number) => {
    if (expected === 0) return 0
    return (spent / expected) * 100
  }

  const getMontlyData = (): DataStats[] => {
    const lastMonths = getLastMonths()
    const data: DataStats[] = []
    lastMonths.map((month, index) => {
      const totalExpenses = getMonthlySpent(expenses, month, currentCategories)

      let spendedValue = totalExpenses * -1
      let expectedSpent = getExpectedSpent(currentCategories)
      if (categoryBudgetType === CategoryBudgetTypeEnum.Percentage) {
        expectedSpent = currentCategory ? 100 : getExpectedSpent(currentCategories)
        const monthAmount = (getExpectedSpent(currentCategories) * +totalIncome) / 100
        spendedValue = getPercentage(spendedValue, monthAmount)
      }

      const spentMoreThanExpected = spendedValue > expectedSpent

      const spended = {
        value: spendedValue || 0,
        label: month,
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: { color: colors.grey0 },
        frontColor: spentMoreThanExpected ? colors.error : colors.success,
      }
      data.push(spended)
      const expected = {
        value: expectedSpent || 0,
        frontColor: colors.grey2,
      }
      data.push(expected)
    })

    return data
  }

  const getYearlyData = (): DataStats[] => {
    const lastYears = getLastYears()
    const data: DataStats[] = []
    lastYears.map((year, index) => {
      const totalExpenses = getYearlySpent(expenses, year, currentCategories)

      let spendedValue = totalExpenses * -1
      let expectedSpent = getExpectedSpent(currentCategories) * 12
      if (categoryBudgetType === CategoryBudgetTypeEnum.Percentage) {
        expectedSpent = currentCategory ? 100 : getExpectedSpent(currentCategories)
        let totalYearlyIncome = +totalIncome
        if (visualizationType === VisualizationTypeEnum.Monthly) {
          totalYearlyIncome = +totalIncome * 12
        }
        const yearAmount = (getExpectedSpent(currentCategories) * totalYearlyIncome) / 100
        spendedValue = getPercentage(spendedValue, yearAmount)
      }

      const spentMoreThanExpected = spendedValue > expectedSpent

      const spended = {
        value: spendedValue || 0,
        label: year.toString(),
        spacing: 2,
        labelWidth: 48,
        labelTextStyle: { color: colors.grey0 },
        frontColor: spentMoreThanExpected ? colors.error : colors.success,
      }
      data.push(spended)
      const expected = {
        value: expectedSpent || 0,
        frontColor: colors.grey2,
      }
      data.push(expected)
    })

    return data
  }

  const getData = (): DataStats[] => {
    if (visualizationOptions[VisualizationTypeEnum.Monthly]) {
      return getMontlyData()
    }
    return getYearlyData()
  }

  const getMaxValue = () => {
    // if(categoryBudgetType === CategoryBudgetTypeEnum.Percentage) {
    if (visualizationOptions[VisualizationTypeEnum.Monthly]) {
      const data = getMontlyData()
      const max = data.reduce((acc, item) => (item.value > acc ? item.value : acc), 0)
      return max //max < 100 ? 100 : max if we want to always set 100 as max
    } else {
      const data = getYearlyData()
      const max = data.reduce((acc, item) => (item.value > acc ? item.value : acc), 0)
      return max //max < 100 ? 100 : max if we want to always set 100 as max
    }
    // }
    return 3000
  }

  const visualizationToggleOption = (key: VisualizationTypeEnum) => {
    const newOptions = { ...visualizationOptions }
    Object.keys(newOptions).forEach((k) => {
      newOptions[k] = false
    })
    newOptions[key] = true
    setVisualizationOptions(newOptions)
  }

  const getBarWidth = () => {
    if (visualizationOptions[VisualizationTypeEnum.Monthly]) {
      return 12
    }
    return 24
  }

  return (
    <View style={styles.chartOptions}>
      <View style={styles.switchContainer}>
        <Switch
          options={visualizationOptions}
          onPressOption={(key: any) => visualizationToggleOption(key)}
          fontSize={FontSize.Medium}
        />
      </View>
      <View style={styles.chartContainer}>
        <BarChart
          data={getData()}
          barWidth={getBarWidth()}
          spacing={24}
          barBorderRadius={8}
          // hideRules //for hide horizontal lines
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisTextStyle={{ color: colors.grey0 }}
          noOfSections={5}
          maxValue={getMaxValue()}
          width={Dimensions.get('window').width * 0.7}
          height={Dimensions.get('window').height * 0.2}
        />
      </View>
    </View>
  )
}
