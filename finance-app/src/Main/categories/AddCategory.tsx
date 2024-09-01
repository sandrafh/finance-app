import React, { useRef, useState } from 'react';
import { View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { styles } from './AddCategoryStyles';

import ColorIcon from '../../assets/icons/color-picker.svg'
import EditIcon from '../../assets/icons/edit.svg'
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
import { TouchableHighlight } from 'react-native-gesture-handler';


export const AddCategory = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const colorModalRef = useRef<SwipeModalPublicMethods>(null)
  const iconModalRef = useRef<SwipeModalPublicMethods>(null)

  const { addCategory } = CategoryService()
  
  const [name, setName] = useState('')
  const [color, setColor] = useState(colors.primary)
  const [icon, setIcon] = useState('home')
  const [budget, setBudget] = useState('0')

  const handleSave = () => {
    if(!name || !color || !icon) {
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
      expenses: []
    }
    addCategory(category)

    Toast.show({
      type: ToastTypes.Success,
      text1: 'Category added successfully'
    })
    navigation.navigate(NavigationCategoriesScreens.CategoriesView)
  }

  const onSelectColor = (color: any) => {
    setColor(color.hex)
  }

  const onSelectIcon = (icon: string) => {
    setIcon(icon)
  }

  const showIconModal = () => {
    iconModalRef.current?.show()
  }

  const showColorModal = () => {
    colorModalRef.current?.show()
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
        <Button style={styles.button} title="Save" onPress={handleSave} variant={ButtonVariants.Primary} />
      </View>     

      <ColorPickerModal modalRef={colorModalRef} onSelectColor={onSelectColor} color={color} />  
      <IconPickerModal modalRef={iconModalRef} selectedIcon={icon} onSelectIcon={onSelectIcon} color={color} colorPickerModalRef={colorModalRef} />
    </ScrollView>
  )
}



