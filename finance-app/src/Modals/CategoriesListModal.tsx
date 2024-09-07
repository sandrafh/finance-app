import { RefObject } from "react";
import { TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

import { styles } from './CategoriesListModalStyles'
//External components
import SwipeModal, { SwipeModalPublicMethods } from '@birdwingo/react-native-swipe-modal';
//Internal components
import { colors } from "../constants/ColorsConstants";
import { Category } from "../constants/Category";
import { getCategories, getSubCategories } from "../redux/slices/category";
import { CategoryItem } from "../main/categories/CategoryItem";

interface CategoriesListModalProps {
  modalRef: RefObject<SwipeModalPublicMethods>
  onSelectCategory: (category: Category) => void
}

export const CategoriesListModal = ({ modalRef, onSelectCategory }: CategoriesListModalProps) => {   
  const categories = useSelector((state: any) => getCategories(state)) 
  const subCategories = useSelector((state: any) => getSubCategories(state))
  const allCategories = [...categories, ...subCategories]

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
      maxHeight={400} 
      style={styles.modal}
      closeOnEmptySpace={true}
      closeOnPressBack={true}
      closeSpaceVisibility={0.3}
      hideKeyboardOnShow={true}
      scrollEnabled={true}
    >     
      <View style={styles.viewContainer}>
        {allCategories.map(category => {
          return (
            <View key={category.uid}>
              <TouchableOpacity style={styles.item} onPress={() => onClickCategory(category)}>
                <CategoryItem category={category} showBudget={false}/>
              </TouchableOpacity>
              <View style={styles.separator}></View>
            </View>          
          )        
        })}  
      </View>         
    </SwipeModal>
  )
}