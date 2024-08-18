import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { styles } from './CategoriesListStyles';

//External libraries
//@ts-ignore
import Icon from 'react-native-vector-icons/MaterialIcons';
import db from "@react-native-firebase/database"

//Internal components
import { getUserUid } from '@/src/redux/slices/user';
import { CustomText, FontSize, FontWeight } from '@/src/components/CustomText';
import { Category } from '@/src/constants/Category';
import { Button, ButtonVariants } from '@/src/components/Button';
import { NavigationAppScreens } from '@/src/navigation/NavigationConstants';
import { getCategories } from '@/src/redux/slices/category';
import { CategoryService } from '@/src/services/CategoryService';


export const CategoriesList = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const { subscribeToCategories } = CategoryService()

  const categories = useSelector((state: any) => getCategories(state))  
  
  useEffect(() => {
    subscribeToCategories()
  }, [])

  const onAddCategory = () => () => {
    navigation.navigate(NavigationAppScreens.AddCategory)
  }

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
      <View style={styles.buttonContainer}>
        <Button title="Add Category" onPress={onAddCategory()} variant={ButtonVariants.Primary} />
      </View>    
    </ScrollView>
  )
}