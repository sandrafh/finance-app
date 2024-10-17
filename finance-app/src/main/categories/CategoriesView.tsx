import React from 'react';
import {View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

import {styles} from './CategoriesViewStyles';

//Internal components
import {Button, ButtonVariants} from '@/src/components/Button';
import {NavigationAppScreens} from '@/src/navigation/NavigationConstants';
import {CategoriesList} from './CategoriesList';
import {useDispatch, useSelector} from 'react-redux';
import {getCategories} from '@/src/redux/slices/category';
import {setSelectedParentCategory} from '@/src/redux/slices/ui';
import {Category} from '@/src/constants/Category';


export const CategoriesView = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const categories = useSelector((state: any) => getCategories(state))

  const onAddCategory = () => () => {
    navigation.navigate(NavigationAppScreens.AddCategory)
  }

  const onSelectCategory = (category: any) => {
    if(category.parentCategoryUid) {
      const parentCategory = categories.find((c: any) => c.uid === category.parentCategoryUid)
      dispatch(setSelectedParentCategory(parentCategory as Category))
    }
    navigation.navigate(NavigationAppScreens.AddCategory, { isEdit: true, category })
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
