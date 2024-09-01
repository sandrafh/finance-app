import { RefObject } from "react";
import { ScrollView, View } from "react-native";

import { styles } from './IconPickerModalStyles'

import SwipeModal, { SwipeModalPublicMethods } from '@birdwingo/react-native-swipe-modal';
//@ts-ignore
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from "../constants/ColorsConstants";
import { Button, ButtonVariants } from "../components/Button";


interface IconPickerModalProps {
  modalRef: RefObject<SwipeModalPublicMethods>
  selectedIcon: string
  onSelectIcon: (icon: string) => void
  color: string
  colorPickerModalRef?: RefObject<SwipeModalPublicMethods>
}

export const IconPickerModal = ({ modalRef, selectedIcon, onSelectIcon, color, colorPickerModalRef }: IconPickerModalProps) => {   
  const icons = [
    'home', 'shopping-cart', 'local-dining', 'commute', 'directions-car',
    'flight', 'local-movies', 'school', 'fitness-center', 'local-hospital',
    'pets', 'child-care', 'local-bar', 'local-mall', 'redeem', 'money', 'work',
    'restaurant', 'beach-access', 'music-note', 'brush', 'build',
    'local-gas-station', 'subscriptions', 'event', 'spa', 'casino',
    'emoji-events', 'cake', 'camera', 'computer', 'local-library',
    'local-offer', 'point-of-sale', 'shopping-bag', 'receipt', 'local-atm',
    'security', 'theater-comedy', 'weekend', 'liquor', 'fastfood', 'house',
    'cleaning-services', 'directions-bus', 'delivery-dining', 'policy',
    'savings', 'support-agent'
  ] 
  
  const onPressNext = () => {
    modalRef.current?.hide()
    colorPickerModalRef?.current?.show()
  }

  return (
    <SwipeModal 
      ref={modalRef} 
      showBar={true} 
      wrapInGestureHandlerRootView={true} 
      bg={colors.bgModal} 
      maxHeight={620} 
      style={styles.modal}
      closeOnEmptySpace={true}
      closeOnPressBack={true}
      closeSpaceVisibility={0.3}
      hideKeyboardOnShow={true}
    >  
      <View style={styles.container}>
        <ScrollView horizontal={true} style={styles.scrollContainer} contentContainerStyle={styles.scrollContainer}>
          <View style={styles.grid}>
            {icons.map(icon => (
              <Icon
                key={icon}
                name={icon}
                size={32}
                color={selectedIcon === icon ? color : colors.grey3}
                onPress={() => onSelectIcon(icon)}
                style={styles.icon}
              />
            ))}
          </View>
          
        </ScrollView>     
        <Button title='Next' onPress={onPressNext} variant={ButtonVariants.Primary} /> 
      </View>          
    </SwipeModal>
  )
}