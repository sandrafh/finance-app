import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, ScrollView, Text, Modal } from 'react-native';



import { ColorPickerModal } from '@/src/Modals/ColorPickerModal';
import { SwipeModalPublicMethods } from '@birdwingo/react-native-swipe-modal';
import { IconPickerModal } from '@/src/Modals/IconPickerModal';
import { colors } from '@/src/Constants/ColorsConstants';
import { Button, ButtonVariants } from '@/src/Components/Button';


interface IconPickerProps {
  selectedIcon: any
  setSelectedIcon: (icon: any) => void
}


export const AddCategory = () => {
  const colorModalRef = useRef<SwipeModalPublicMethods>(null);
  const iconModalRef = useRef<SwipeModalPublicMethods>(null);
  
  const [name, setName] = useState('');
  const [color, setColor] = useState(colors.primary);
  const [selectedIcon, setSelectedIcon] = useState('home');
  const [budget, setBudget] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSave = () => {
    const formData = {
      name,
      color,
      selectedIcon,
      budget,
    };
    console.log(formData); // Replace this with your save logic
    alert('Form saved successfully!');
  }

  const onSelectColor = (color: any) => {
    console.log("newcolor: ", color)
    setColor(color.hex)
  }

  const onSelectIcon = (icon: string) => {
    console.log("newicon: ", icon)
    setSelectedIcon(icon)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Color</Text>
        <Button title='Choose a color' onPress={() => colorModalRef.current?.show()} variant={ButtonVariants.Tertiary} />           

        <Text style={styles.label}>Icon</Text>
        <Button title='Choose an icon' onPress={() => iconModalRef.current?.show()} variant={ButtonVariants.Tertiary} /> 
       

        <Text style={styles.label}>Monthly Budget</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter budget"
          value={budget}
          onChangeText={setBudget}
          keyboardType="numeric"
        />

        <Button title="Save" onPress={handleSave} variant={ButtonVariants.Primary} />
      </View>     

      <ColorPickerModal modalRef={colorModalRef} onSelectColor={onSelectColor} color={color} />  
      <IconPickerModal modalRef={iconModalRef} selectedIcon={selectedIcon} onSelectIcon={onSelectIcon} color={color} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1    
  },
  formContainer: {
    flex: 1,
    padding: 20
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

