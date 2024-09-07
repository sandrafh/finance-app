import React, {  } from 'react';
import { View } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { styles } from './CategoriesViewStyles';

//Internal components
import { Button, ButtonVariants } from '@/src/components/Button';
import { NavigationAppScreens } from '@/src/navigation/NavigationConstants';
import { CategoriesList } from './CategoriesList';
import { useDispatch } from 'react-redux';
import { setSelectedCategory } from '@/src/redux/slices/category';


export const CategoriesView = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const onAddCategory = () => () => {
    navigation.navigate(NavigationAppScreens.AddCategory)
  }

  const onSelectCategory = (category: any) => {
    dispatch(setSelectedCategory(category))
    navigation.navigate(NavigationAppScreens.AddCategory)
  }

  return (
    <View style={styles.container}>
      <CategoriesList onSelect={onSelectCategory}/> 
      <View style={styles.buttonContainer}>
        <Button title="Add Category" onPress={onAddCategory()} variant={ButtonVariants.Primary} />
      </View>    
    </View>
  )
}