import React, { RefObject } from 'react'
import { View } from 'react-native'

import { styles } from './ColorPickerModalStyles'

import ColorPicker, { HueSlider, Panel1 } from 'reanimated-color-picker'
import SwipeModal, { SwipeModalPublicMethods } from '@birdwingo/react-native-swipe-modal'
import { colors } from '../constants/ColorsConstants'
import { CustomButton, ButtonVariants } from '../components/CustomButton'

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
      bg={colors.bgModal}
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

        <CustomButton title="Accept" onPress={() => modalRef.current?.hide()} variant={ButtonVariants.Primary} />
      </View>
    </SwipeModal>
  )
}
