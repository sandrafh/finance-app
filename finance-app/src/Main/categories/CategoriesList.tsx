import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, ScrollView } from 'react-native';

import { styles } from './CategoriesListStyles';

//External libraries
//@ts-ignore
import Icon from 'react-native-vector-icons/MaterialIcons';

//Internal components
import { CustomText, FontSize, FontWeight } from '@/src/components/CustomText';
import { getCategories } from '@/src/redux/slices/category';
import { CategoryService } from '@/src/services/CategoryService';


export const CategoriesList = () => {
  const { subscribeToCategories } = CategoryService()

  const categories = useSelector((state: any) => getCategories(state))  
  
  useEffect(() => {
    subscribeToCategories()
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {categories.map(category => {
        const budgetText = category.spent + "/" + category.budget + " €"
        return (
          <View key={category.uid} style={styles.card}>
            <View style={styles.cardTitle}>
              <Icon
                key={category.icon}
                name={category.icon}
                size={24}
                color={category.color}
              />
              <CustomText fontSize={FontSize.Medium} fontWeight={FontWeight.Bold}>{category.name}</CustomText>
            </View>
            
            <CustomText fontSize={FontSize.Small}>{budgetText}</CustomText>
          </View>
        )        
      })}       
    </ScrollView>
  )
}