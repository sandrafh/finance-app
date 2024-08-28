import { RefObject } from "react";
import { TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { styles } from './CategoriesListModalStyles'
//External components
import SwipeModal, { SwipeModalPublicMethods } from '@birdwingo/react-native-swipe-modal';
//Internal components
import { colors } from "../constants/ColorsConstants";
import { CategoriesList } from "../main/categories/CategoriesList";
import { Category } from "../constants/Category";
import { setSelectedCategory } from "../redux/slices/ui";
import { getCategories } from "../redux/slices/category";
import { CategoryItem } from "../main/categories/CategoryItem";

interface CategoriesListModalProps {
  modalRef: RefObject<SwipeModalPublicMethods>
}

export const CategoriesListModal = ({ modalRef }: CategoriesListModalProps) => {   
  const dispatch = useDispatch()

  const categories = useSelector((state: any) => getCategories(state)) 

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
      maxHeight={400} 
      style={styles.modal}
      closeOnEmptySpace={true}
      closeOnPressBack={true}
      closeSpaceVisibility={0.3}
      hideKeyboardOnShow={true}
      scrollEnabled={true}
    >     
      <View style={styles.viewContainer}>
        {categories.map(category => {
          return (
            <>
              <TouchableOpacity key={category.uid} style={styles.item} onPress={() => onSelectCategory(category)}>
                <CategoryItem category={category} showBudget={false}/>
              </TouchableOpacity>
              <View style={styles.separator}></View>
            </>          
          )        
        })}  
      </View>         
    </SwipeModal>
  )
}