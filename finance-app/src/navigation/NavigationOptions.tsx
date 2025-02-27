import React from 'react'
import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types'
import { Dispatch } from '@reduxjs/toolkit'

import BackArrowIcon from '../assets/icons/back-arrow.svg'
import TrashIcon from '../assets/icons/trash.svg'
import SettingsIcon from '../assets/icons/settings.svg'

//Internal components
import { colors } from '../constants/ColorsConstants'
import { NavigationAppScreens } from './NavigationConstants'
import { IconButton } from '../components/IconButton'
import { setCurrentCategory } from '../redux/slices/category'
import { Category } from '../constants/Category'
import { Expense } from '../constants/Expenses'

export const defaultHeaderOptions = {
  headerTitleAlign: 'center' as const,
  cardStyle: { flex: 1 },
  headerShadowVisible: false,
  animationEnabled: true,
  headerStyle: {
    backgroundColor: colors.bg,
  },
  headerTitleStyle: {
    color: colors.white,
  },
}

export const buildHeader = (title: string, headerLeft?: JSX.Element, headerRight?: JSX.Element) => {
  return {
    ...defaultHeaderOptions,
    headerStyle: {
      ...defaultHeaderOptions.headerStyle,
    },
    headerTitle: title,
    headerLeft: headerLeft ? () => headerLeft : undefined,
    headerRight: headerRight ? () => headerRight : undefined,
  }
}

const BackArrowHeader = ({ navigation, onPress }: any) => {
  return (
    <IconButton
      icon={<BackArrowIcon width={16} height={16} color={colors.white} />}
      onPress={onPress || (() => navigation.goBack())}
    />
  )
}

const RemoveItemHeader = ({ onPress }: any) => {
  return (
    <IconButton
      icon={<TrashIcon width={24} height={24} color={colors.danger} />}
      onPress={onPress}
      backgroundColor={colors.bgInput}
    />
  )
}

export const MenuHeaderButton = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  return (
    <IconButton
      icon={<SettingsIcon width={24} height={24} color={colors.grey1} />}
      onPress={() => {
        navigation.navigate(NavigationAppScreens.SettingsView)
      }}
      backgroundColor={colors.bgCard}
      style={{ marginRight: 10 }}
    />
  )
}

interface AutoHeaderProps {
  navigation: NavigationProp<any>
  route: RouteProp<any, any>
  onPressDeleteCategory: (category: Category) => void
  onPressDeleteExpense: (expense: Expense) => void
  currentCategory: Category | null
  dispatch: Dispatch
}

export const autoHeader = ({
  navigation,
  route,
  onPressDeleteCategory,
  onPressDeleteExpense,
  currentCategory,
  dispatch,
}: AutoHeaderProps) => {
  const getHeader = () => {
    switch (route.name) {
      case NavigationAppScreens.LoadingScreen:
      case NavigationAppScreens.Login:
      case NavigationAppScreens.Register:
      case NavigationAppScreens.Tabs:
        return {
          ...defaultHeaderOptions,
          headerShown: false,
        }
      case NavigationAppScreens.AddCategory:
        return buildHeader(
          route?.params?.isEdit ? 'Edit Category' : 'New Category',
          <BackArrowHeader navigation={navigation} onPress={() => navigation.navigate(NavigationAppScreens.Tabs)} />,
          route?.params?.isEdit ? (
            <RemoveItemHeader onPress={() => onPressDeleteCategory(route.params?.category)} />
          ) : (
            <MenuHeaderButton />
          )
        )
      case NavigationAppScreens.CategoryDetails:
        return buildHeader(
          currentCategory?.name || 'Category Details',
          <BackArrowHeader
            navigation={navigation}
            onPress={() => {
              dispatch(setCurrentCategory(null))
              navigation.navigate(NavigationAppScreens.Tabs)
            }}
          />,
          <MenuHeaderButton />
        )
      case NavigationAppScreens.AddExpense:
        return buildHeader(
          route?.params?.isEdit ? 'Edit Expense' : 'New Expense',
          <BackArrowHeader navigation={navigation} />,
          route?.params?.isEdit ? (
            <RemoveItemHeader onPress={() => onPressDeleteExpense(route.params?.expense)} />
          ) : (
            <MenuHeaderButton />
          )
        )
      case NavigationAppScreens.SettingsView:
        return buildHeader(
          'Settings',
          <BackArrowHeader navigation={navigation} onPress={() => navigation.navigate(NavigationAppScreens.Tabs)} />
        )
      default:
        console.warn(`Unhandled route: ${route.name}`)
        return defaultHeaderOptions
    }
  }

  return getHeader()
}
