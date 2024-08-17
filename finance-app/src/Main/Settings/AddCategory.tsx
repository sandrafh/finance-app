import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';

import ColorPicker, { Preview } from 'reanimated-color-picker';
import { SwipeModalPublicMethods } from '@birdwingo/react-native-swipe-modal';
//@ts-ignore
import Icon from 'react-native-vector-icons/MaterialIcons';

import { ColorPickerModal } from '@/src/Modals/ColorPickerModal';
import { IconPickerModal } from '@/src/Modals/IconPickerModal';
import { colors } from '@/src/Constants/ColorsConstants';
import { Button, ButtonVariants } from '@/src/Components/Button';


export const AddCategory = () => {
  const colorModalRef = useRef<SwipeModalPublicMethods>(null)
  const iconModalRef = useRef<SwipeModalPublicMethods>(null)
  
  const [name, setName] = useState('')
  const [color, setColor] = useState(colors.primary)
  const [icon, setIcon] = useState('home')
  const [budget, setBudget] = useState('')

  const handleSave = () => {
    if(!name || !color || !icon || !budget) {
      alert('Please fill all fields')
      return;
    }
    const formData = {
      name,
      color,
      icon,
      budget,
    }
    console.log(formData)
    alert('Form saved successfully!')
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
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
          />
        </View>        

        <TouchableOpacity style={styles.field} onPress={showColorModal} >
          <Text style={styles.label}>Color</Text>
          <ColorPicker  value={color} onComplete={onSelectColor}>
            <Preview hideText={true} style={styles.previewColor} />
          </ColorPicker>
        </TouchableOpacity>                

        <TouchableOpacity style={styles.field} onPress={showIconModal} >
          <Text style={styles.label}>Icon</Text>
          <Icon
            key={icon}
            name={icon}
            size={44}
            color={color}
          />
        </TouchableOpacity>       

        <View style={styles.field}>
          <Text style={styles.label}>Monthly Budget (€)</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,    
  },
  formContainer: {
    flex: 1,
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  label: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grey2,
    padding: 10,
    borderRadius: 5,
  },
  previewColor: {
    height: 44,
    width: 44,
    borderRadius: 50,
  },
  button: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    width: '100%'
  }
})

