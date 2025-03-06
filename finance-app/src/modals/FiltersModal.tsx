import React, { RefObject } from 'react'
import { View } from 'react-native'

import { styles } from './FilteresModalStyles'
//External libraries
import SwipeModal, { SwipeModalPublicMethods } from '@birdwingo/react-native-swipe-modal'
//Internal components
import { colors } from '@constants/ColorsConstants'
import { CustomButton, ButtonVariants } from '@components/CustomButton'
import { useCategories } from '@contexts/CategoriesContext'
import { FilterComponentEnum } from '@constants/Filters'
import { CustomText } from '@components/CustomText'

interface ColorPickerModalProps {
  modalRef: RefObject<SwipeModalPublicMethods>
  children?: React.ReactNode
}

export const FiltersModal = ({ modalRef, children }: ColorPickerModalProps) => {
  const { filterComponent, setFilterComponent, error } = useCategories()
  const showErrors = filterComponent !== FilterComponentEnum.Date && !!error

  const getTitle = () => {
    switch (filterComponent) {
      case FilterComponentEnum.Date:
        return 'Close'
      case FilterComponentEnum.CustomDates:
      case FilterComponentEnum.CalendarStartDate:
      case FilterComponentEnum.CalendarEndDate:
        return 'Apply'
      default:
        return 'Close'
    }
  }

  const onPress = () => {
    switch (filterComponent) {
      case FilterComponentEnum.Date:
      case FilterComponentEnum.CustomDates:
        modalRef.current?.hide()
        break
      case FilterComponentEnum.CalendarStartDate:
      case FilterComponentEnum.CalendarEndDate:
        setFilterComponent(FilterComponentEnum.CustomDates)
        break
      default:
        modalRef.current?.hide()
        break
    }
  }

  const getHeight = () => {
    switch (filterComponent) {
      case FilterComponentEnum.Date:
        return 410
      case FilterComponentEnum.CustomDates:
        return 320 + (showErrors ? 30 : 0)
      case FilterComponentEnum.CalendarStartDate:
      case FilterComponentEnum.CalendarEndDate:
        return 500 + (showErrors ? 30 : 0)
      default:
        return 420
    }
  }

  const isButtonDisabled = () => {
    if (filterComponent === FilterComponentEnum.CustomDates) {
      return !!error
    }
    return false
  }

  return (
    <SwipeModal
      ref={modalRef}
      showBar={true}
      wrapInGestureHandlerRootView={true}
      bg={colors.bgModal}
      maxHeight={getHeight()}
      style={styles.modal}
      closeOnEmptySpace={true}
      closeOnPressBack={true}
      closeSpaceVisibility={0.3}
      hideKeyboardOnShow={true}
    >
      <View style={styles.viewContainer}>
        {children}
        <View style={styles.buttonContainer}>
          {showErrors && <CustomText style={styles.error}>{error}</CustomText>}
          <CustomButton
            title={getTitle()}
            onPress={onPress}
            variant={ButtonVariants.Primary}
            disabled={isButtonDisabled()}
          />
        </View>
      </View>
    </SwipeModal>
  )
}
