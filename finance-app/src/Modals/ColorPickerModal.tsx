import { View } from "react-native";

import { styles } from './ColorPickerModalStyles'

import ColorPicker, { Panel1, HueSlider } from 'reanimated-color-picker';
import SwipeModal, { SwipeModalPublicMethods } from '@birdwingo/react-native-swipe-modal';
import { colors } from "../Constants/ColorsConstants";
import { Button, ButtonVariants } from "../Components/Button";
import { RefObject } from "react";

interface ColorPickerModalProps {
  modalRef: RefObject<SwipeModalPublicMethods>
  onSelectColor: ({ hex }: any) => void
  color: string
}

export const ColorPickerModal = ({ modalRef, onSelectColor, color }: ColorPickerModalProps) => {   
  return (
    <SwipeModal 
      ref={modalRef} 
      showBar={true} 
      wrapInGestureHandlerRootView={true} 
      bg={colors.lightBlue} 
      maxHeight={420} 
      style={styles.modal}
      closeOnEmptySpace={true}
      closeOnPressBack={true}
      closeSpaceVisibility={0.3}
      hideKeyboardOnShow={true}
    >     
      <View style={styles.viewContainer}>
        <ColorPicker style={styles.colorPicker} value={color} onComplete={onSelectColor}>
          <Panel1 />
          <HueSlider />
        </ColorPicker>

        <Button title='Accept' onPress={() => modalRef.current?.hide()} variant={ButtonVariants.Primary} />    
      </View>         
    </SwipeModal>
  )
}