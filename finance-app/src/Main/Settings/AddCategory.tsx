import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, TextInput, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { styles } from './AddCategoryStyles';

import ColorPicker, { Preview } from 'reanimated-color-picker';
import { SwipeModalPublicMethods } from '@birdwingo/react-native-swipe-modal';
//@ts-ignore
import Icon from 'react-native-vector-icons/MaterialIcons';
import db from "@react-native-firebase/database"
//@ts-ignore
import { v4 } from 'uuid';
import Toast from 'react-native-toast-message';

import { ColorPickerModal } from '@/src/Modals/ColorPickerModal';
import { IconPickerModal } from '@/src/Modals/IconPickerModal';
import { colors } from '@/src/Constants/ColorsConstants';
import { Button, ButtonVariants } from '@/src/Components/Button';
import { getUserUid } from '@/src/redux/slices/user';
import { ToastTypes } from '@/src/Constants/ToastConstants';
import { NavigationSettingsScreens } from '@/src/Navigation/NavigationConstants';


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
            <TouchableOpacity style={styles.field} onPress={showIconModal} >
              {/* <Text style={styles.label}>Icon</Text> */}
              <Icon
                key={icon}
                name={icon}
                size={124}
                color={color}
              />
            </TouchableOpacity> 

            <Button title="Select color" onPress={showColorModal} variant={ButtonVariants.Tertiary} />
            {/* <TouchableOpacity style={styles.field} onPress={showColorModal} >
              <Text style={styles.label}>Color</Text>
              <ColorPicker  value={color} onComplete={onSelectColor}>
                <Preview hideText={true} style={styles.previewColor} />
              </ColorPicker>
            </TouchableOpacity>     */}
          </View>                   

          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
          />
        </View>               

        <View style={styles.field}>
          <Text style={styles.label}>Monthly Budget (€)*</Text>
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



