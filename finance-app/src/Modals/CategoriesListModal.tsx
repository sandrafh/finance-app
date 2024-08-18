import { RefObject } from "react";
import { View } from "react-native";

import { styles } from './CategoriesListModalStyles'
//External components
import SwipeModal, { SwipeModalPublicMethods } from '@birdwingo/react-native-swipe-modal';
//Internal components
import { colors } from "../constants/ColorsConstants";
import { CategoriesList } from "../main/categories/CategoriesList";

interface CategoriesListModalProps {
  modalRef: RefObject<SwipeModalPublicMethods>
}

export const CategoriesListModal = ({ modalRef }: CategoriesListModalProps) => {   
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
        <CategoriesList />  
      </View>         
    </SwipeModal>
  )
}