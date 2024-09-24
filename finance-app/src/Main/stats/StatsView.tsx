import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import {
  View,
  ScrollView
} from "react-native"

import { styles } from "./StatsViewStyles"

//Internal components
import { getName } from "@/src/redux/slices/user"
import { SettingsService } from "@/src/services/SettingsService"
import { CategoryBudgetTypeEnum, getCategoryBudgetType, getTotalIncome, getVisualization } from "@/src/redux/slices/settings"
import { RootState } from "@/src/redux/store"
import { ProfileService } from "@/src/services/ProfileService"


export const StatsView = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  
  const { updateCategoryBudgetType, updateVisualization, updateTotalIncome } = SettingsService()
  const { setUserName } = ProfileService()

  const categoryBudgetType: CategoryBudgetTypeEnum = useSelector((state: RootState) => getCategoryBudgetType(state))
  const visualizationType = useSelector((state: RootState) => getVisualization(state))
  const totalIncome = useSelector((state: RootState) => getTotalIncome(state))
  const userName = useSelector((state: RootState) => getName(state))

  

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>              
      </ScrollView>
    </View>  
  )
}
