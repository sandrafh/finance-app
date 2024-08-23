import React from 'react';
import { useSelector } from 'react-redux';
import { ScrollView, TouchableOpacity } from 'react-native';

import { styles } from './CategoriesListStyles';

//Internal components
import { getCategories } from '@/src/redux/slices/category';
import { CategoryItem } from './CategoryItem';
import { Category } from '@/src/constants/Category';

interface CategoriesListProps {
  onSelect: (category: Category) => void
}

export const CategoriesList = ({ onSelect }: CategoriesListProps) => {
  const categories = useSelector((state: any) => getCategories(state))  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {categories.map(category => {
        return (
          <TouchableOpacity key={category.uid} style={styles.card} onPress={() => onSelect(category)}>
            <CategoryItem category={category} showBudget={true}/>
          </TouchableOpacity>
        )        
      })}       
    </ScrollView>
  )
}