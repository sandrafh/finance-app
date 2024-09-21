import React from 'react';
import { useSelector } from 'react-redux';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { styles } from './CategoriesListStyles';

//Internal components
import { getCategories } from '@/src/redux/slices/category';
import { CategoryItem } from './CategoryItem';
import { Category } from '@/src/constants/Category';
import { colors } from '@/src/constants/ColorsConstants';

interface CategoriesListProps {
  onSelect: (category: Category) => void
  showBudget?: boolean
  haveRightArrow?: boolean
  backgroundColor?: string
}

export const CategoriesList = ({ onSelect, showBudget = true, haveRightArrow = true, backgroundColor = colors.bg }: CategoriesListProps) => {
  const categories = useSelector((state: any) => getCategories(state))  

  return (
    <ScrollView contentContainerStyle={styles.container} style={{backgroundColor: backgroundColor}}>
      {categories.map(category => {
        return (
          <View key={category.uid}>
            <TouchableOpacity style={styles.card} onPress={() => onSelect(category)}>
              <CategoryItem category={category} showBudget={showBudget} haveRightArrow={haveRightArrow} />
            </TouchableOpacity>
            <View style={styles.separator}></View>
            {(!!category?.categories) && (category?.categories as Category[]).map(subcategory => {
              return (
                <>
                  <TouchableOpacity key={subcategory.uid} style={styles.subCategoryCard} onPress={() => onSelect(subcategory)}>
                    <CategoryItem category={subcategory} showBudget={showBudget} haveRightArrow={haveRightArrow} />
                  </TouchableOpacity>
                  <View style={styles.separator}></View>
                </>                
              )
            })}
          </View>          
        )        
      })}       
    </ScrollView>
  )
}