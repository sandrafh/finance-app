import React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'

import RightArrowIcon from '@assets/icons/right-arrow.svg'

//External libraries
//@ts-ignore
import Icon from 'react-native-vector-icons/MaterialIcons'

import { styles } from './CategoryItemStyles'
import { CustomText } from '@components/CustomText'
import { Category } from '@constants/Category'
import { colors } from '@constants/ColorsConstants'
import { RootState } from '@redux/store'
import { getCategoryBudgetType, getTotalIncome, getVisualization } from '@redux/slices/settings'
import { getMonthlySpentByCategoryInAmount, getYearlySpentByCategoryInAmount } from '@utils/stats'
import { CategoryBudgetTypeEnum, VisualizationTypeEnum } from '@constants/Settings'
import { FontSize, FontWeight } from '@constants/Texts'

interface CategoryItemProps {
  category: Category
  showBudget?: boolean
  haveRightArrow?: boolean
  showPercentage?: boolean
}

export const CategoryItem = ({
  category,
  showBudget,
  haveRightArrow = false,
  showPercentage = false,
}: CategoryItemProps) => {
  const categoryBudgetType: CategoryBudgetTypeEnum = useSelector((state: RootState) => getCategoryBudgetType(state))
  const visualizationType = useSelector((state: RootState) => getVisualization(state))
  const totalIncome = useSelector((state: RootState) => getTotalIncome(state))

  const getPercentageSpentInAmount = () => {
    const categoryInAmount = (category.budget * +totalIncome) / 100
    if (visualizationType === VisualizationTypeEnum.Monthly) {
      const currentMonth = new Date().getMonth()
      return getMonthlySpentByCategoryInAmount(category, currentMonth) + '/' + categoryInAmount
    } else {
      const currentYear = new Date().getFullYear()
      return getYearlySpentByCategoryInAmount(category, currentYear) + '/' + categoryInAmount
    }
  }

  const getBudgetText = () => {
    const totalSpent = category.totalSpent < 0 ? category.totalSpent * -1 : category.totalSpent
    if (categoryBudgetType === CategoryBudgetTypeEnum.Percentage) {
      return getPercentageSpentInAmount() + ' €'
    } else {
      return totalSpent + '/' + category.budget + ' €'
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardTitle}>
        <Icon key={category.icon} name={category.icon} size={24} color={category.color} />
        <CustomText fontSize={FontSize.Medium} fontWeight={FontWeight.Normal}>
          {category.name}
        </CustomText>
        {showPercentage && (
          <CustomText fontSize={FontSize.Small} style={styles.percentageBudget}>
            {category.budget.toString()}%
          </CustomText>
        )}
      </View>
      <View style={styles.end}>
        {showBudget && <CustomText fontSize={FontSize.Small}>{getBudgetText()}</CustomText>}
        {haveRightArrow && <RightArrowIcon width={16} height={16} fill={colors.white} />}
      </View>
    </View>
  )
}
