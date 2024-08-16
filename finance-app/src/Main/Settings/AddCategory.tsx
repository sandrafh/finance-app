import React, { useRef, useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Text, Modal } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';

import { SlideModal } from '@/src/Modals/SlideModal';
import { ColorPickerModal } from '@/src/Modals/ColorPickerModal';
import { SwipeModalPublicMethods } from '@birdwingo/react-native-swipe-modal';


interface IconPickerProps {
  selectedIcon: any
  setSelectedIcon: (icon: any) => void
}

const IconPicker = ({ selectedIcon, setSelectedIcon }: IconPickerProps) => {
  const icons = ['home', 'star', 'settings', 'favorite', 'shopping-cart']; // Add more icons as needed

  return (
    <ScrollView horizontal={true} style={styles.iconContainer}>
      {icons.map(icon => (
        <Icon
          key={icon}
          name={icon}
          size={40}
          color={selectedIcon === icon ? 'blue' : 'black'}
          onPress={() => setSelectedIcon(icon)}
          style={styles.icon}
        />
      ))}
    </ScrollView>
  );
};


export const AddCategory = () => {
  const modalRef = useRef<SwipeModalPublicMethods>(null);
  
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');
  const [selectedIcon, setSelectedIcon] = useState('home');
  const [budget, setBudget] = useState('');

  const handleSave = () => {
    const formData = {
      name,
      color,
      selectedIcon,
      budget,
    };
    console.log(formData); // Replace this with your save logic
    alert('Form saved successfully!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Color:</Text>
      <Button title='Choose color' onPress={() => modalRef.current?.show()} />
      <ColorPickerModal modalRef={modalRef} />      

      <Text style={styles.label}>Icon:</Text>
      <IconPicker selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} />

      <Text style={styles.label}>Monthly Budget:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter budget"
        value={budget}
        onChangeText={setBudget}
        keyboardType="numeric"
      />

      <Button title="Save" onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
  colorPicker: {
    flex: 1,
    margin: 12,
  },
  iconContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  icon: {
    marginHorizontal: 10,
  },
});

