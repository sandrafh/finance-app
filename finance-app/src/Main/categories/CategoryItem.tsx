
import React from "react";
import { View } from "react-native";

//External libraries
//@ts-ignore
import Icon from 'react-native-vector-icons/MaterialIcons';

import { styles } from "./CategoryItemStyles";
import { CustomText, FontSize, FontWeight } from "@/src/components/CustomText";
import { Category } from "@/src/constants/Category";

interface CategoryItemProps {
  category: Category
  showBudget?: boolean
}

export const CategoryItem = ({ category, showBudget }: CategoryItemProps) => {
    const budgetText = category.totalSpent + "/" + category.budget + " €";
    return (
      <>
        <View style={styles.cardTitle}>
          <Icon key={category.icon} name={category.icon} size={24} color={category.color}/>
          <CustomText fontSize={FontSize.Medium} fontWeight={FontWeight.Normal}>
            {category.name}
          </CustomText>
        </View>
        
        {showBudget && <CustomText fontSize={FontSize.Small}>{budgetText}</CustomText>}
      </>        
    )
}