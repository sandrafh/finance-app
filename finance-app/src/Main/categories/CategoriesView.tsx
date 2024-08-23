import React, {  } from 'react';
import { View } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { styles } from './CategoriesViewStyles';

//Internal components
import { Button, ButtonVariants } from '@/src/components/Button';
import { NavigationAppScreens } from '@/src/navigation/NavigationConstants';
import { CategoriesList } from './CategoriesList';


export const CategoriesView = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const onAddCategory = () => () => {
    navigation.navigate(NavigationAppScreens.AddCategory)
  }

  return (
    <View style={styles.container}>
      <CategoriesList onSelect={() => { console.log("on select category") }}/> 
      <View style={styles.buttonContainer}>
        <Button title="Add Category" onPress={onAddCategory()} variant={ButtonVariants.Primary} />
      </View>    
    </View>
  )
}