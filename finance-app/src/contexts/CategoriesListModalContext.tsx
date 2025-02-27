import React, { createContext, useContext, useRef, useState } from 'react'
import SwipeModal, { SwipeModalPublicMethods } from '@birdwingo/react-native-swipe-modal'
import { View } from 'react-native'

import { styles } from './CategoriesListModalStyles'
import { colors } from '../constants/ColorsConstants'
import { CategoriesList } from '../main/categories/CategoriesList'
import { Category } from '../constants/Category'

interface CategoriesListModalContextProps {
  openCategoriesListModal: (onSelectCategory: (category: Category) => void) => void
  closeCategoriesListModal: () => void
}

const CategoriesListModalContext = createContext<CategoriesListModalContextProps | undefined>(undefined)

export const CategoriesListModalProvider = ({ children }: { children: React.ReactNode }) => {
  const modalRef = useRef<SwipeModalPublicMethods>(null)
  const [onSelectCategory, setOnSelectCategory] = useState<(category: Category) => void>(() => () => {})

  const openCategoriesListModal = (onSelect: (category: Category) => void) => {
    setOnSelectCategory(() => onSelect) // Store function dynamically
    modalRef.current?.show()
  }

  const closeCategoriesListModal = () => {
    modalRef.current?.hide()
  }

  return (
    <CategoriesListModalContext.Provider value={{ openCategoriesListModal, closeCategoriesListModal }}>
      {children}
      <SwipeModal
        ref={modalRef}
        showBar={true}
        wrapInGestureHandlerRootView={true}
        bg={colors.bgModal}
        maxHeight={350}
        style={styles.modal}
        closeOnEmptySpace={true}
        closeOnPressBack={true}
        closeSpaceVisibility={0.3}
        hideKeyboardOnShow={true}
        scrollEnabled={true}
      >
        <View style={styles.viewContainer}>
          <CategoriesList
            onSelect={onSelectCategory}
            showBudget={false}
            haveRightArrow={false}
            backgroundColor={colors.bgModal}
          />
        </View>
      </SwipeModal>
    </CategoriesListModalContext.Provider>
  )
}

export const useCategoriesListModal = () => {
  const context = useContext(CategoriesListModalContext)
  if (!context) throw new Error('useCategoriesListModal must be used within a CategoriesListModalProvider')
  return context
}
