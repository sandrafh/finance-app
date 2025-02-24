import React from 'react'
import { useDispatch } from 'react-redux';

import BackArrowIcon from "../assets/icons/back-arrow.svg";
import TrashIcon from "../assets/icons/trash.svg";
import SettingsIcon from '../assets/icons/settings.svg';

//Internal components
import { colors } from '../constants/ColorsConstants'
import { NavigationAppScreens } from './NavigationConstants'
import { IconButton } from '../components/IconButton'
import { getCurrentCategory, setCurrentCategory } from '../redux/slices/category';
import { store } from '../redux/store';

const useSelector = (fn:any) => fn(store?.getState())

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

export const buildHeader = (
  title: string,
  headerLeft?: JSX.Element,
  headerRight?: JSX.Element,
) => {
  return {
    ...defaultHeaderOptions,
    headerStyle: {
      ...defaultHeaderOptions.headerStyle,
    },
    headerTitle: title,
    headerLeft: headerLeft
      ? () => headerLeft
      : undefined,
    headerRight: headerRight
      ? () => headerRight
      : undefined
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

export const MenuHeaderButton = ({ navigation }: any) => {
  return (
    <IconButton 
      icon={<SettingsIcon width={24} height={24} color={colors.grey1} />} 
      onPress={() => {
        navigation.navigate(NavigationAppScreens.SettingsView)
      }} 
      backgroundColor={colors.bgCard}
      style={{marginRight: 10}}
    />
  )
}

export const autoHeader = ({ navigation, route, onPressDeleteCategory, onPressDeleteExpense }: any) => {
  const dispatch = useDispatch()

  const currentCategory = useSelector((state: any) => getCurrentCategory(state))  

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
          route?.params?.isEdit ? 
            <RemoveItemHeader navigation={navigation} onPress={() => onPressDeleteCategory(route.params?.category)} /> 
            : 
            <MenuHeaderButton navigation={navigation} />       
        )
      case NavigationAppScreens.CategoryDetails:
        return buildHeader(
          currentCategory?.name || 'Category Details',
          <BackArrowHeader navigation={navigation} onPress={() => {
            dispatch(setCurrentCategory(null))
            navigation.navigate(NavigationAppScreens.Tabs)
          }} />,
          <MenuHeaderButton navigation={navigation} />
        )
      case NavigationAppScreens.AddExpense:
        return buildHeader(
          route?.params?.isEdit ? 'Edit Expense' : 'New Expense',
          <BackArrowHeader navigation={navigation} />,
          route?.params?.isEdit ? 
            <RemoveItemHeader navigation={navigation} onPress={() => onPressDeleteExpense(route.params?.expense)} /> 
            : 
            <MenuHeaderButton navigation={navigation} />  
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
