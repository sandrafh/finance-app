
import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

import RightArrowIcon from "@/src/assets/icons/right-arrow.svg";

//External libraries
//@ts-ignore
import Icon from 'react-native-vector-icons/MaterialIcons';

import { styles } from "./CategoryItemStyles";
import { CustomText, FontSize, FontWeight } from "@/src/components/CustomText";
import { Category } from "@/src/constants/Category";
import { colors } from "@/src/constants/ColorsConstants";
import { RootState } from "@/src/redux/store";
import { CategoryBudgetTypeEnum, getCategoryBudgetType, getTotalIncome, getVisualization, VisualizationTypeEnum } from "@/src/redux/slices/settings";

interface CategoryItemProps {
  category: Category
  showBudget?: boolean
  haveRightArrow?: boolean
}

export const CategoryItem = ({ category, showBudget, haveRightArrow = false }: CategoryItemProps) => {
  const categoryBudgetType: CategoryBudgetTypeEnum = useSelector((state: RootState) => getCategoryBudgetType(state))
  const visualizationType = useSelector((state: RootState) => getVisualization(state))
  const totalIncome = useSelector((state: RootState) => getTotalIncome(state))

  const getPercentageSpent = () => {
    const categoryInAmount = category.budget * (+totalIncome) / 100
    if(visualizationType === VisualizationTypeEnum.Monthly) {
      const currentMonth = new Date().getMonth()
      const totalMonthSpent = category?.expenses?.filter(expense => new Date(expense.date).getMonth() === currentMonth)
                                                .reduce((acc, expense) => acc + expense.spent, 0) || 0     
      return (totalMonthSpent * -1 / categoryInAmount * 100).toPrecision(3)
    }
    else {
      const currentYear = new Date().getFullYear()
      const totalYearSpent = category?.expenses?.filter(expense => new Date(expense.date).getFullYear() === currentYear)
                                              .reduce((acc, expense) => acc + expense.spent, 0) || 0
      return (totalYearSpent * -1 / categoryInAmount * 100).toPrecision(3)
    }
  }

  const getBudgetText = () => {
    const totalSpent = (category.totalSpent < 0) ? category.totalSpent*-1 : category.totalSpent
    if(categoryBudgetType === CategoryBudgetTypeEnum.Percentage) {
      return getPercentageSpent() + " %";
    } else {
      return totalSpent + "/" + category.budget + " €";
    }
  }

  return (
    <>
      <View style={styles.cardTitle}>
        <Icon key={category.icon} name={category.icon} size={24} color={category.color}/>
        <CustomText fontSize={FontSize.Medium} fontWeight={FontWeight.Normal}>
          {category.name}
        </CustomText>
      </View>
      <View style={styles.end}>
        {showBudget && <CustomText fontSize={FontSize.Small}>{getBudgetText()}</CustomText>}
        {haveRightArrow && <RightArrowIcon width={16} height={16} fill={colors.white} />}
      </View>
    </>        
  )
}