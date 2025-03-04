import React, { RefObject } from 'react'
import { View } from 'react-native'

import { styles } from './FilteresModalStyles'

import SwipeModal, { SwipeModalPublicMethods } from '@birdwingo/react-native-swipe-modal'
import { colors } from '@/src/constants/ColorsConstants'
import { Button, ButtonVariants } from '@/src/components/Button'

interface ColorPickerModalProps {
  modalRef: RefObject<SwipeModalPublicMethods>
  children?: React.ReactNode
}

export const FiltersModal = ({ modalRef, children }: ColorPickerModalProps) => {
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
        {children}
        <Button title="Close" onPress={() => modalRef.current?.hide()} variant={ButtonVariants.Primary} />
      </View>
    </SwipeModal>
  )
}
