import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, TextInput, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { styles } from './AddCategoryStyles';

import ColorIcon from '../../assets/icons/color-picker.svg'
import EditIcon from '../../assets/icons/edit.svg'

import ColorPicker, { Preview } from 'reanimated-color-picker';
import { SwipeModalPublicMethods } from '@birdwingo/react-native-swipe-modal';
//@ts-ignore
import Icon from 'react-native-vector-icons/MaterialIcons';
import db from "@react-native-firebase/database"
//@ts-ignore
import { v4 } from 'uuid';
import Toast from 'react-native-toast-message';

import { ColorPickerModal } from '@/src/modals/ColorPickerModal';
import { IconPickerModal } from '@/src/modals/IconPickerModal';
import { colors } from '@/src/constants/ColorsConstants';
import { Button, ButtonVariants } from '@/src/components/Button';
import { getUserUid } from '@/src/redux/slices/user';
import { ToastTypes } from '@/src/constants/ToastConstants';
import { NavigationSettingsScreens } from '@/src/navigation/NavigationConstants';
import { CustomText } from '@/src/components/CustomText';


export const AddCategory = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const colorModalRef = useRef<SwipeModalPublicMethods>(null)
  const iconModalRef = useRef<SwipeModalPublicMethods>(null)

  const userUid = useSelector((state: any) => getUserUid(state))
  
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
    const formData = {
      name,
      color,
      icon,
      budget,
    }

    db().ref(`users/${userUid}/categories/${v4()}`).set({ name: name, budget: budget, icon: icon, color: color, expensesUids: [] })

    console.log(formData)
    Toast.show({
      type: ToastTypes.Success,
      text1: 'Category added successfully'
    })
    navigation.navigate(NavigationSettingsScreens.SettingsView)
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
        <View style={styles.field}>
          <View style={styles.image}>
            <View style={styles.icon}>
              <Icon
                key={icon}
                name={icon}
                size={124}
                color={color}
              />
            </View>  
            <View style={styles.editButtons}>
              <Button 
                icon={<EditIcon width={24} height={24} color={colors.grey5} />} 
                onPress={showIconModal} 
                variant={ButtonVariants.Tertiary} 
              />
              <Button 
                icon={<ColorIcon width={24} height={24} color={colors.grey5} />} 
                onPress={showColorModal} 
                variant={ButtonVariants.Tertiary} 
              />
            </View>            
          </View>
        </View> 

        <View style={styles.field}>
          <CustomText style={styles.label}>Name</CustomText>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
          />  
        </View>   

        <View style={styles.field}>
          <CustomText style={styles.label}>Monthly Budget (€)*</CustomText>
          <TextInput
            style={styles.input}
            placeholder="Enter budget"
            value={budget}
            onChangeText={setBudget}
            keyboardType="numeric"
          />
        </View>        

        <Button style={styles.button} title="Save" onPress={handleSave} variant={ButtonVariants.Primary} />
      </View>     

      <ColorPickerModal modalRef={colorModalRef} onSelectColor={onSelectColor} color={color} />  
      <IconPickerModal modalRef={iconModalRef} selectedIcon={icon} onSelectIcon={onSelectIcon} color={color} />
    </ScrollView>
  )
}



