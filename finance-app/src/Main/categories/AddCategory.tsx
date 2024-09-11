import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { styles } from './AddCategoryStyles';

import CheckIcon from '../../assets/icons/check.svg'
//External libraries
import { SwipeModalPublicMethods } from '@birdwingo/react-native-swipe-modal';
//@ts-ignore
import Icon from 'react-native-vector-icons/MaterialIcons';
//@ts-ignore
import Toast from 'react-native-toast-message';
//Internal components
import { ColorPickerModal } from '@/src/modals/ColorPickerModal';
import { IconPickerModal } from '@/src/modals/IconPickerModal';
import { colors } from '@/src/constants/ColorsConstants';
import { Button, ButtonVariants } from '@/src/components/Button';
import { ToastTypes } from '@/src/constants/ToastConstants';
import { NavigationCategoriesScreens } from '@/src/navigation/NavigationConstants';
import { CustomText } from '@/src/components/CustomText';
import { CategoryService } from '@/src/services/CategoryService';
import { Category } from '@/src/constants/Category';
import { CustomInput } from '@/src/components/CustomInput';
import { RootState } from '@/src/redux/store';
import { CustomDropDown } from '@/src/components/CustomDropDown';
import { CategoryItem } from './CategoryItem';
import { CategoriesListModal } from '@/src/modals/CategoriesListModal';
import { getSelectedParentCategory, setSelectedParentCategory } from '@/src/redux/slices/ui';
import category from '@/src/redux/slices/category';


export const AddCategory = ({ route }: any) => {
  const dispatch = useDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const colorModalRef = useRef<SwipeModalPublicMethods>(null)
  const iconModalRef = useRef<SwipeModalPublicMethods>(null)
  const categoriesModalRef = useRef<SwipeModalPublicMethods>(null)

  const isEdit = route.params?.isEdit
  const category: Category = route.params?.category
  const showSubcategoryCheckbox = ((isEdit && category.parentCategoryUid) || !isEdit) ? true : false

  const { addCategory, updateCategory, deleteCategory } = CategoryService()
  const parentCategory = useSelector((state: RootState) => getSelectedParentCategory(state))
  
  const [name, setName] = useState(category?.name || '')
  const [color, setColor] = useState(category?.color || colors.primary)
  const [icon, setIcon] = useState(category?.icon || 'home')
  const [budget, setBudget] = useState(category?.budget.toString() || '0')
  const [isChecked, setIsChecked] = useState(category?.parentCategoryUid ? true : false)

  const handleSave = () => {
    if(!name || !color || !icon || !budget) {
      Toast.show({
        type: ToastTypes.Error,
        text1: 'Fill all the required fields'
      })
      return
    }
    /*uid: string
  name: string
  budget: number
  icon: string
  color: string
  expenses: CategoryExpenses[]
  totalSpent: number
  parentCategoryUid?: string
  categories?: Category[]
  */
    const newCategory: Partial<Category> = {
      uid: isEdit ? category.uid : undefined,
      name,
      color,
      icon,
      budget: +budget,
      totalSpent: category?.totalSpent || 0,
      expenses: category?.expenses || [],
      parentCategoryUid: isChecked ? parentCategory.uid : undefined,
      categories: category?.categories || []
    }
    let toastText = 'Category added successfully'
    if(isEdit) {
      toastText = 'Category updated successfully'
      updateCategory(newCategory)
    }
    else addCategory(newCategory)

    Toast.show({
      type: ToastTypes.Success,
      text1: toastText
    })
    navigation.navigate(NavigationCategoriesScreens.CategoriesView)
  }

  const showIconModal = () => {
    iconModalRef.current?.show()
  }

  const onClickSelectParentCategory = () => {
    categoriesModalRef.current?.show()
  }

  const onSelectCategory = (category: Category) => {
    dispatch(setSelectedParentCategory(category))
  }

  const handleDelete = () => {
    deleteCategory(category)
    Toast.show({
      type: ToastTypes.Success,
      text1: 'Category deleted successfully'
    })
    navigation.navigate(NavigationCategoriesScreens.CategoriesView)
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <TouchableOpacity style={styles.icon} onPress={showIconModal}>
            <Icon
              key={icon}
              name={icon}
              size={124}
              color={color}
            />
          </TouchableOpacity>  
          <CustomInput
            label="Name"
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
          />   
          <CustomInput
            label="Monthly Budget (€)"
            placeholder="Enter budget"
            value={budget}
            onChangeText={setBudget}
            inputMode="numeric"
          />  
          {showSubcategoryCheckbox && (
            <TouchableOpacity style={styles.checkboxContainer} onPress={() => setIsChecked(!isChecked)} disabled={isEdit}>
              <View style={[{backgroundColor: isChecked ? colors.primary : colors.bgInput}, styles.checkbox]}>
                {isChecked && (          
                  <CheckIcon width={28} height={28} color={colors.white} />                      
                )}
              </View>  
              <CustomText >Is Subcategory</CustomText>
            </TouchableOpacity>
          )}          

          {isChecked && (
            <CustomDropDown label="Parent Category" onClick={onClickSelectParentCategory} disabled={isEdit}>
              {parentCategory && <CategoryItem category={parentCategory} showBudget={false} />}
            </CustomDropDown>
          )}   
        </View>  
      </ScrollView>

        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={handleSave} variant={ButtonVariants.Primary} />
          {isEdit && <Button title="Delete" onPress={handleDelete} variant={ButtonVariants.Danger} />}
        </View>

        <ColorPickerModal modalRef={colorModalRef} onSelectColor={(color) => setColor(color.hex)} color={color} />  
        <IconPickerModal modalRef={iconModalRef} selectedIcon={icon} onSelectIcon={(icon) => setIcon(icon)} color={color} colorPickerModalRef={colorModalRef} />
        <CategoriesListModal modalRef={categoriesModalRef} onSelectCategory={(category) => onSelectCategory(category)}/> 
    </View>
    
  )
}



