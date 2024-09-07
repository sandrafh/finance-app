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


export const AddCategory = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const colorModalRef = useRef<SwipeModalPublicMethods>(null)
  const iconModalRef = useRef<SwipeModalPublicMethods>(null)
  const categoriesModalRef = useRef<SwipeModalPublicMethods>(null)

  const { addCategory } = CategoryService()
  const parentCategory = useSelector((state: RootState) => getSelectedParentCategory(state))
  
  const [name, setName] = useState('')
  const [color, setColor] = useState(colors.primary)
  const [icon, setIcon] = useState('home')
  const [budget, setBudget] = useState('0')
  const [isChecked, setIsChecked] = useState(false)

  const handleSave = () => {
    if(!name || !color || !icon || !budget) {
      Toast.show({
        type: ToastTypes.Error,
        text1: 'Fill all the required fields'
      })
      return
    }
    const category: Partial<Category> = {
      name,
      color,
      icon,
      budget: +budget,
      totalSpent: 0,
      expenses: [],
      parentCategoryUid: isChecked ? parentCategory.uid : undefined
    }
    addCategory(category)

    Toast.show({
      type: ToastTypes.Success,
      text1: 'Category added successfully'
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        <TouchableOpacity style={styles.checkboxContainer} onPress={() => setIsChecked(!isChecked)}>
          <View style={[{backgroundColor: isChecked ? colors.primary : colors.bgInput}, styles.checkbox]}>
            {isChecked && (          
              <CheckIcon width={28} height={28} color={colors.white} />                      
            )}
          </View>  
          <CustomText >Is Subcategory</CustomText>
        </TouchableOpacity>

        {isChecked && (
          <CustomDropDown label="Parent Category" onClick={onClickSelectParentCategory}>
            {parentCategory && <CategoryItem category={parentCategory} showBudget={false} />}
          </CustomDropDown>
        )}        

        <Button style={styles.button} title="Save" onPress={handleSave} variant={ButtonVariants.Primary} />
      </View>     

      <ColorPickerModal modalRef={colorModalRef} onSelectColor={(color) => setColor(color.hex)} color={color} />  
      <IconPickerModal modalRef={iconModalRef} selectedIcon={icon} onSelectIcon={(icon) => setIcon(icon)} color={color} colorPickerModalRef={colorModalRef} />
      <CategoriesListModal modalRef={categoriesModalRef} onSelectCategory={(category) => onSelectCategory(category)}/> 
    </ScrollView>
  )
}



