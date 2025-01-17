import React from 'react';
import { useSelector } from 'react-redux';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { useNavigation, useRoute } from '@react-navigation/native';

import { styles } from './CategoriesListStyles';
import { stylesApp } from "@/src/AppStyles"

//Internal components
import { getCategories } from '@/src/redux/slices/category';
import { CategoryItem } from './CategoryItem';
import { Category } from '@/src/constants/Category';
import { colors } from '@/src/constants/ColorsConstants';
import { CategoryBudgetTypeEnum } from '@/src/constants/Settings';
import { getCategoryBudgetType } from '@/src/redux/slices/settings';
import { RootState } from '@/src/redux/store';

interface CategoriesListProps {
  onSelect: (category: Category) => void
  showBudget?: boolean
  haveRightArrow?: boolean
  backgroundColor?: string
}

export const CategoriesList = ({ onSelect, showBudget = true, haveRightArrow = true, backgroundColor = colors.bg }: CategoriesListProps) => {
  const route = useRoute()
  
  const categories = useSelector((state: any) => getCategories(state))  
  const categoryBudgetType: CategoryBudgetTypeEnum = useSelector((state: RootState) => getCategoryBudgetType(state))
  const showPercentage = categoryBudgetType === CategoryBudgetTypeEnum.Percentage && route.name === 'Categories'

  return (
    <ScrollView contentContainerStyle={styles.container} style={{backgroundColor: backgroundColor}}>
      {categories.map(category => {
        return (
          <View key={category.uid}>
            <TouchableOpacity style={styles.card} onPress={() => onSelect(category)}>
              <CategoryItem category={category} showBudget={showBudget} haveRightArrow={haveRightArrow} showPercentage={showPercentage} />
            </TouchableOpacity>
            <View style={stylesApp.separator}></View>
            {(!!category?.categories) && (category?.categories as Category[]).map(subcategory => {
              return (
                <View key={subcategory.uid}>
                  <TouchableOpacity style={styles.subCategoryCard} onPress={() => onSelect(subcategory)}>
                    <CategoryItem category={subcategory} showBudget={showBudget} haveRightArrow={haveRightArrow} showPercentage={showPercentage} />
                  </TouchableOpacity>
                  <View style={stylesApp.separator}></View>
                </View>                
              )
            })}
          </View>          
        )        
      })}       
    </ScrollView>
  )
}
