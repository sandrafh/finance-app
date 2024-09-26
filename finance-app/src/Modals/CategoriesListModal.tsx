import { RefObject } from "react";
import { View } from "react-native";

import { styles } from './CategoriesListModalStyles'
//External components
import SwipeModal, { SwipeModalPublicMethods } from '@birdwingo/react-native-swipe-modal';
//Internal components
import { colors } from "../constants/ColorsConstants";
import { Category } from "../constants/Category";
import { CategoriesList } from "../main/categories/CategoriesList";

interface CategoriesListModalProps {
  modalRef: RefObject<SwipeModalPublicMethods>
  onSelectCategory: (category: Category) => void
}

export const CategoriesListModal = ({ modalRef, onSelectCategory }: CategoriesListModalProps) => {   
  const onClickCategory = (category: Category) => {
    onSelectCategory(category)
    modalRef.current?.hide()
  }

  return (
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
        <CategoriesList onSelect={onClickCategory} showBudget={false} haveRightArrow={false} backgroundColor={colors.bgModal} />
      </View>         
    </SwipeModal>
  )
}