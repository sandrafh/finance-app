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
    // Home and Family
    'home', 'child-care', 'pets', 'cleaning-services', 'weekend', 'cake', 'fitness-center',
  
    // Work and Office
    'work', 'computer', 'build', 'subscriptions', 'support-agent', 'security', 'attach-money', 'credit-card',
  
    // Shopping and Retail
    'shopping-cart', 'local-mall', 'local-offer', 'point-of-sale', 'redeem',
  
    // Transportation and Travel
    'commute', 'directions-car', 'flight', 'delivery-dining', 'local-gas-station',
  
    // Food and Dining
    'restaurant', 'fastfood', 'liquor', 'coffee',
  
    // Entertainment and Events
    'local-movies', 'music-note', 'camera', 'theater-comedy', 'event', 'emoji-events', 'auto-awesome', 'auto-stories',
  
    // Health and Education
    'local-hospital', 'school',
  
    // Finance and Services
    'local-atm', 'savings',
  
    // Miscellaneous
    'beach-access', 'brush', 'cloud', 'eco',
    
    //Others
    'emoji-objects', 'network-wifi-3-bar', 'opacity'
  ];
  
  
  
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
      maxHeight={560} 
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