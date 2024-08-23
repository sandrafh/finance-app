import { RefObject } from "react";
import { View } from "react-native";

import { styles } from './CategoriesListModalStyles'
//External components
import SwipeModal, { SwipeModalPublicMethods } from '@birdwingo/react-native-swipe-modal';
//Internal components
import { colors } from "../constants/ColorsConstants";
import { CategoriesList } from "../main/categories/CategoriesList";
import { useDispatch } from "react-redux";
import { Category } from "../constants/Category";
import { setSelectedCategory } from "../redux/slices/ui";

interface CategoriesListModalProps {
  modalRef: RefObject<SwipeModalPublicMethods>
}

export const CategoriesListModal = ({ modalRef }: CategoriesListModalProps) => {   
  const dispatch = useDispatch()

  const onSelectCategory = (category: Category) => {
    dispatch(setSelectedCategory(category))
    modalRef.current?.hide()
  }

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
        <CategoriesList onSelect={onSelectCategory}/>  
      </View>         
    </SwipeModal>
  )
}