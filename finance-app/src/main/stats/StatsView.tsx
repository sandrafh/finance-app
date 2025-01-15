import React from "react"
import { useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import {
  View,
  ScrollView
} from "react-native"

import { styles } from "./StatsViewStyles"

//Internal components
import { CategoriesList } from "../categories/CategoriesList"
import { NavigationAppScreens } from "@/src/navigation/NavigationConstants"
import { setCurrentCategory } from "@/src/redux/slices/category"
import { StatsChart } from "./StatsChart"

export const StatsView = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const onSelectCategory = (category: any) => {
    dispatch(setCurrentCategory(category))
    navigation.navigate(NavigationAppScreens.CategoryDetails)
  }

  return (
    <View style={styles.container}>
      <StatsChart />     
      <ScrollView contentContainerStyle={styles.scrollContainer}>    
        <CategoriesList onSelect={onSelectCategory}/>          
      </ScrollView>
    </View>  
  )
}
