import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { View, ScrollView } from 'react-native'

import { styles } from './StatsViewStyles'

//Internal components
import { CategoriesList } from '../categories/CategoriesList'
import { NavigationAppScreens } from '@/src/navigation/NavigationConstants'
import { getCategories, setCurrentCategory } from '@/src/redux/slices/category'
import { StatsChart } from './StatsChart'
import { EmptyMessage } from '@/src/components/EmptyMessage'

export const StatsView = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const categories = useSelector((state: any) => getCategories(state))

  const onSelectCategory = (category: any) => {
    dispatch(setCurrentCategory(category))
    navigation.navigate(NavigationAppScreens.CategoryDetails)
  }

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <StatsChart />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {categories.length === 0 ? (
          <EmptyMessage text="No categories yet" />
        ) : (
          <CategoriesList onSelect={onSelectCategory} />
        )}
      </ScrollView>
    </View>
  )
}
