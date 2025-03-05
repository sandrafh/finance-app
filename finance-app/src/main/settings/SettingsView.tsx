import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScrollView, View } from 'react-native'

import { styles } from './SettingsViewStyles'
import { stylesApp } from '@/src/AppStyles'

//Internal components
import { CustomButton, ButtonVariants } from '@/src/components/CustomButton'
import { getName, setUserUid } from '@/src/redux/slices/user'
import { NavigationAppScreens } from '@/src/navigation/NavigationConstants'
import { OptionsType, Switch } from '@/src/components/Switch'
import { SettingsService } from '@/src/services/SettingsService'
import { getCategoryBudgetType, getTotalIncome, getVisualization } from '@/src/redux/slices/settings'
import { CustomInput } from '@/src/components/CustomInput'
import { RootState } from '@/src/redux/store'
import { ProfileService } from '@/src/services/ProfileService'
import { CategoryBudgetTypeEnum, VisualizationTypeEnum } from '@/src/constants/Settings'
import { FontSize } from '@/src/constants/Texts'

export const SettingsView = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const { updateCategoryBudgetType, updateVisualization, updateTotalIncome } = SettingsService()
  const { setUserName } = ProfileService()

  const categoryBudgetType: CategoryBudgetTypeEnum = useSelector((state: RootState) => getCategoryBudgetType(state))
  const visualizationType = useSelector((state: RootState) => getVisualization(state))
  const totalIncome = useSelector((state: RootState) => getTotalIncome(state))
  const userName = useSelector((state: RootState) => getName(state))

  const initCategoryBudgetOptions: OptionsType = {
    [CategoryBudgetTypeEnum.Percentage]: categoryBudgetType === CategoryBudgetTypeEnum.Percentage,
    [CategoryBudgetTypeEnum.Amount]: categoryBudgetType === CategoryBudgetTypeEnum.Amount,
  }

  const initVisualizationOptions: OptionsType = {
    [VisualizationTypeEnum.Monthly]: visualizationType === VisualizationTypeEnum.Monthly,
    [VisualizationTypeEnum.Yearly]: visualizationType === VisualizationTypeEnum.Yearly,
  }

  const [categoryBudgetOptions, setCategoryBudgetOptions] = useState(initCategoryBudgetOptions)
  const [visualizationOptions, setVisualizationOptions] = useState(initVisualizationOptions)

  const onPressLogout = () => {
    dispatch(setUserUid(''))
    navigation.replace(NavigationAppScreens.Login)
  }

  const getLabelIncomeInput = () => {
    if (visualizationType === VisualizationTypeEnum.Yearly) {
      return 'Yearly Income (€)'
    }
    return 'Monthly Income (€)'
  }

  const categoryBudgetToggleOption = (key: CategoryBudgetTypeEnum) => {
    const newOptions = { ...categoryBudgetOptions }
    Object.keys(newOptions).forEach((k) => {
      newOptions[k] = false
    })
    newOptions[key] = true
    setCategoryBudgetOptions(newOptions)
    updateCategoryBudgetType(key)
  }

  const visualizationToggleOption = (key: VisualizationTypeEnum) => {
    const newOptions = { ...visualizationOptions }
    Object.keys(newOptions).forEach((k) => {
      newOptions[k] = false
    })
    newOptions[key] = true
    setVisualizationOptions(newOptions)
    updateVisualization(key)
  }

  const onSetTotalIncome = (value: string) => {
    updateTotalIncome(value)
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.options}>
          <CustomInput label="Name" value={userName} onChangeText={setUserName} />
          <View style={stylesApp.separator}></View>
          <Switch
            options={categoryBudgetOptions}
            label="Category budget in"
            onPressOption={(key: any) => categoryBudgetToggleOption(key)}
          />
          <Switch
            options={visualizationOptions}
            label="Visualization"
            onPressOption={(key: any) => visualizationToggleOption(key)}
            fontSize={FontSize.Medium}
          />
          {categoryBudgetOptions[CategoryBudgetTypeEnum.Percentage] && (
            <CustomInput
              label={getLabelIncomeInput()}
              placeholder="Enter your yearly income"
              keyboardType="numeric"
              value={totalIncome}
              onChangeText={onSetTotalIncome}
            />
          )}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton title="Logout" variant={ButtonVariants.Primary} onPress={onPressLogout} />
      </View>
    </View>
  )
}
