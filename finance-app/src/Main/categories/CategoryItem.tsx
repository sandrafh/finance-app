
import React from "react";
import { View } from "react-native";

import RightArrowIcon from "@/src/assets/icons/right-arrow.svg";

//External libraries
//@ts-ignore
import Icon from 'react-native-vector-icons/MaterialIcons';

import { styles } from "./CategoryItemStyles";
import { CustomText, FontSize, FontWeight } from "@/src/components/CustomText";
import { Category } from "@/src/constants/Category";
import { colors } from "@/src/constants/ColorsConstants";

interface CategoryItemProps {
  category: Category
  showBudget?: boolean
  haveRightArrow?: boolean
}

export const CategoryItem = ({ category, showBudget, haveRightArrow = false }: CategoryItemProps) => {
    const budgetText = category.totalSpent + "/" + category.budget + " €";
    return (
      <>
        <View style={styles.cardTitle}>
          <Icon key={category.icon} name={category.icon} size={24} color={category.color}/>
          <CustomText fontSize={FontSize.Medium} fontWeight={FontWeight.Normal}>
            {category.name}
          </CustomText>
        </View>
        <View style={styles.end}>
          {showBudget && <CustomText fontSize={FontSize.Small}>{budgetText}</CustomText>}
          {haveRightArrow && <RightArrowIcon width={16} height={16} fill={colors.white} />}
        </View>
      </>        
    )
}