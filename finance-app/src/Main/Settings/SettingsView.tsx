import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import {
  View,
  StyleSheet} from "react-native"
//Internal components
import { colors } from "@/src/constants/ColorsConstants"
import { Button, ButtonVariants } from "@/src/components/Button"
import { setUserUid } from "@/src/redux/slices/user"
import { NavigationAppScreens } from "@/src/navigation/NavigationConstants"
import { OptionsType, Switch } from "@/src/components/Switch"
import { SettingsService } from "@/src/services/SettingsService"
import { CategoryBudgetTypeEnum, getCategoryBudgetType } from "@/src/redux/slices/settings"

const initCategoryBudgetOptions: OptionsType = {
  [CategoryBudgetTypeEnum.Percentage]: true,
  [CategoryBudgetTypeEnum.Amount]: false
}


export const SettingsView = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  
  const { updateCategoryBudget } = SettingsService()

  const [categoryBudgetOptions, setCategoryBudgetOptions] = useState(initCategoryBudgetOptions)

  const onPressLogout = () => {
    dispatch(setUserUid(""))
    navigation.replace(NavigationAppScreens.Login)
  }

  const toggleOption = (key: CategoryBudgetTypeEnum) => {
    const newOptions = {...categoryBudgetOptions}
    Object.keys(newOptions).forEach((k) => {
      newOptions[k] = false
    })
    newOptions[key] = true
    setCategoryBudgetOptions(newOptions)
    updateCategoryBudget(key)
  }

  return (
    <View style={styles.container}> 
      <Switch options={categoryBudgetOptions} title="Category budget in" onPressOption={(key: string) => toggleOption(key)}/>
      <Button title="Logout" variant={ButtonVariants.Primary} onPress={onPressLogout}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    backgroundColor: colors.bg,
    padding: 20
  },
  switch: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  switchContainer: {
    height: 44,
    display: "flex",
    flexDirection: "row",
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    backgroundColor: colors.grey3,
    borderRadius: 22
  },
  switchOption: {
    width: 72,
    height: 44,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,    
    overflow: "hidden"
  },
  selectedOption: {
    backgroundColor: colors.primary,
  }
})
