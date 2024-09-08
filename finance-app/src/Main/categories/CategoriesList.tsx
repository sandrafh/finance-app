import React from 'react';
import { useSelector } from 'react-redux';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { styles } from './CategoriesListStyles';

//Internal components
import { getCategories } from '@/src/redux/slices/category';
import { CategoryItem } from './CategoryItem';
import { Category } from '@/src/constants/Category';

interface CategoriesListProps {
  onSelect: (category: Category) => void
  showBudget?: boolean
}

export const CategoriesList = ({ onSelect, showBudget = true }: CategoriesListProps) => {
  const categories = useSelector((state: any) => getCategories(state))  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {categories.map(category => {
        return (
          <View key={category.uid}>
            <TouchableOpacity style={styles.card} onPress={() => onSelect(category)}>
              <CategoryItem category={category} showBudget={showBudget}/>
            </TouchableOpacity>
            <View style={styles.separator}></View>
            {(!!category?.categories) && (category?.categories as Category[]).map(subcategory => {
              return (
                <>
                  <TouchableOpacity style={styles.subCategoryCard} key={subcategory.uid} onPress={() => onSelect(subcategory)}>
                    <CategoryItem category={subcategory} showBudget={showBudget}/>
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