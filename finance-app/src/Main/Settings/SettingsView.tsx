import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import {
  View,
  ScrollView
} from "react-native"

import { styles } from "./SettingsViewStyles"

//Internal components
import { Button, ButtonVariants } from "@/src/components/Button"
import { setUserUid } from "@/src/redux/slices/user"
import { NavigationAppScreens } from "@/src/navigation/NavigationConstants"
import { OptionsType, Switch } from "@/src/components/Switch"
import { SettingsService } from "@/src/services/SettingsService"
import { CategoryBudgetTypeEnum, VisualizationTypeEnum } from "@/src/redux/slices/settings"
import { FontSize } from "@/src/components/CustomText"

const initCategoryBudgetOptions: OptionsType = {
  [CategoryBudgetTypeEnum.Percentage]: true,
  [CategoryBudgetTypeEnum.Amount]: false
}

const initVisualizationOptions: OptionsType = {
  [VisualizationTypeEnum.Monthly]: true,
  [VisualizationTypeEnum.Yearly]: false
}


export const SettingsView = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  
  const { updateCategoryBudgetType, updateVisualization } = SettingsService()

  const [categoryBudgetOptions, setCategoryBudgetOptions] = useState(initCategoryBudgetOptions)
  const [visualizationOptions, setVisualizationOptions] = useState(initVisualizationOptions)

  const onPressLogout = () => {
    dispatch(setUserUid(""))
    navigation.replace(NavigationAppScreens.Login)
  }

  const categoryBudgetToggleOption = (key: CategoryBudgetTypeEnum) => {
    const newOptions = {...categoryBudgetOptions}
    Object.keys(newOptions).forEach((k) => {
      newOptions[k] = false
    })
    newOptions[key] = true
    setCategoryBudgetOptions(newOptions)
    updateCategoryBudgetType(key)
  }

  const visualizationToggleOption = (key: VisualizationTypeEnum) => {
    const newOptions = {...visualizationOptions}
    Object.keys(newOptions).forEach((k) => {
      newOptions[k] = false
    })
    newOptions[key] = true
    setVisualizationOptions(newOptions)
    updateVisualization(key)
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.options}>
          <Switch options={categoryBudgetOptions} title="Category budget in" onPressOption={(key: any) => categoryBudgetToggleOption(key)}/>
          <Switch 
            options={visualizationOptions} 
            title="Visualization" 
            onPressOption={(key: any) => visualizationToggleOption(key)} 
            fontSize={FontSize.Medium} 
          />              
        </View>                 
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Logout" variant={ButtonVariants.Primary} onPress={onPressLogout}/>
      </View>
    </View>  
  )
}
