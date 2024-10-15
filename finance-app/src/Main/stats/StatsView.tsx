import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import {
  View,
  ScrollView,
  Dimensions
} from "react-native"

import { styles } from "./StatsViewStyles"

//External components
import { BarChart } from 'react-native-gifted-charts';

//Internal components
import { getCategoryBudgetType, getTotalIncome, getVisualization } from "@/src/redux/slices/settings"
import { RootState } from "@/src/redux/store"
import { CategoriesList } from "../categories/CategoriesList"
import { NavigationAppScreens } from "@/src/navigation/NavigationConstants"
import { getCategories, setCurrentCategory } from "@/src/redux/slices/category"
import { colors } from "@/src/constants/ColorsConstants"
import { getExpenses } from "@/src/redux/slices/expenses"
import { getExpectedSpent, getMonthlySpent } from "@/src/utils/stats"
import { formatDateMonth } from "@/src/utils/functions"
import { OptionsType, Switch } from "@/src/components/Switch"
import { CategoryBudgetTypeEnum, VisualizationTypeEnum } from "@/src/constants/Settings"
import { FontSize } from "@/src/constants/Texts"

interface DataStats {
  value: number
  label?: string
  spacing?: number
  labelWidth?: number
  labelTextStyle?: { color: string }
  frontColor: string
}

export const StatsView = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const categoryBudgetType: CategoryBudgetTypeEnum = useSelector((state: RootState) => getCategoryBudgetType(state))
  const visualizationType = useSelector((state: RootState) => getVisualization(state))
  const totalIncome = useSelector((state: RootState) => getTotalIncome(state))
  const expenses = useSelector((state: RootState) => getExpenses(state))
  const categories = useSelector((state: RootState) => getCategories(state))

  const initVisualizationOptions: OptionsType = {
    [VisualizationTypeEnum.Monthly]: visualizationType === VisualizationTypeEnum.Monthly,
    [VisualizationTypeEnum.Yearly]: visualizationType === VisualizationTypeEnum.Yearly
  }

  const [visualizationOptions, setVisualizationOptions] = useState(initVisualizationOptions)

  const onSelectCategory = (category: any) => {
    dispatch(setCurrentCategory(category))
    navigation.navigate(NavigationAppScreens.CategoryDetails)
  }

  const getLastMonths = () => {
    const today = new Date()
    const numberOfMonths = Math.floor(Dimensions.get('window').width * 0.7 / 50) // 50 is what one month takes
  
    const lastMonths = []    
    for (let i = 0; i < numberOfMonths; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const month = formatDateMonth(date.toString())
      lastMonths.push(month);
    }
    return lastMonths.reverse()
  }  

  const getPercentage = (spent: number, expected: number) => {
    return (spent / expected) * 100
  }

  const getMontlyData = (): DataStats[] => {
    const lastMonths = getLastMonths()
    let data: DataStats[] = []
    lastMonths.map((month, index) => {
      const totalExpenses = getMonthlySpent(expenses, month)
     
      let spendedValue = totalExpenses*-1
      if(categoryBudgetType === CategoryBudgetTypeEnum.Percentage) {
        const monthAmount = getExpectedSpent(categories) * (+totalIncome) / 100
        spendedValue = getPercentage(spendedValue, monthAmount)
      }

      const spentMoreThanExpected = spendedValue > getExpectedSpent(categories)

      const spended = {
        value: spendedValue,
        label: month,
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: {color: colors.grey0},
        frontColor: spentMoreThanExpected ? colors.error : colors.success,
      }
      data.push(spended)
      const expected = {
        value: getExpectedSpent(categories),
        frontColor: colors.grey2,
      }      
      data.push(expected)
    })

    return data
  }

  const getMaxValue = () => {
    if(categoryBudgetType === CategoryBudgetTypeEnum.Percentage) {
      const data = getMontlyData()
      const max = data.reduce((acc, item) => item.value > acc ? item.value : acc, 0)
      return max < 100 ? 100 : max
    }
    return 3000
  }

  const visualizationToggleOption = (key: VisualizationTypeEnum) => {
    const newOptions = {...visualizationOptions}
    Object.keys(newOptions).forEach((k) => {
      newOptions[k] = false
    })
    newOptions[key] = true
    setVisualizationOptions(newOptions)
  }

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Switch 
          options={visualizationOptions} 
          label="hola" 
          onPressOption={(key: any) => visualizationToggleOption(key)}
          fontSize={FontSize.Medium}
        /> 
      </View>
      <View style={styles.chartContainer}>
        <BarChart
          data={getMontlyData()}
          barWidth={12}
          spacing={24}
          roundedTop
          roundedBottom
          // hideRules //for hide horizontal lines
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisTextStyle={{color: colors.grey0}}
          noOfSections={5}
          maxValue={getMaxValue()}
          width={Dimensions.get('window').width*0.7}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>    
        <CategoriesList onSelect={onSelectCategory}/>          
      </ScrollView>
    </View>  
  )
}
