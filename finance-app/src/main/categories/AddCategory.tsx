import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { styles } from './AddCategoryStyles'

import CheckIcon from '@assets/icons/check.svg'
//External libraries
import { SwipeModalPublicMethods } from '@birdwingo/react-native-swipe-modal'
//@ts-ignore
import Icon from 'react-native-vector-icons/MaterialIcons'
//@ts-ignore
import Toast from 'react-native-toast-message'
//Internal components
import { ColorPickerModal } from '@modals/ColorPickerModal'
import { IconPickerModal } from '@modals/IconPickerModal'
import { colors } from '@constants/ColorsConstants'
import { CustomButton, ButtonVariants } from '@components/CustomButton'
import { ToastTypes } from '@constants/ToastConstants'
import { NavigationMainScreens } from '@navigation/NavigationConstants'
import { CustomText } from '@components/CustomText'
import { CategoryService } from '@services/CategoryService'
import { Category } from '@constants/Category'
import { CustomInput } from '@components/CustomInput'
import { RootState } from '@redux/store'
import { CustomDropDown } from '@components/CustomDropDown'
import { CategoryItem } from './CategoryItem'
import { useCategoriesListModal } from '@contexts/CategoriesListModalContext'
import { getSelectedParentCategory, setSelectedParentCategory } from '@redux/slices/ui'
import { getCategoryBudgetType, getVisualization } from '@redux/slices/settings'
import { CategoryBudgetTypeEnum, VisualizationTypeEnum } from '@constants/Settings'

export const AddCategory = ({ route }: any) => {
  const dispatch = useDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const colorModalRef = useRef<SwipeModalPublicMethods>(null)
  const iconModalRef = useRef<SwipeModalPublicMethods>(null)

  const isEdit = route.params?.isEdit
  const category: Category = route.params?.category
  const showSubcategoryCheckbox = (isEdit && category.parentCategoryUid) || !isEdit ? true : false

  const { addCategory, updateCategory } = CategoryService()
  const { openCategoriesListModal, closeCategoriesListModal } = useCategoriesListModal()
  const parentCategory = useSelector((state: RootState) => getSelectedParentCategory(state))
  const categoryBudgetType = useSelector((state: RootState) => getCategoryBudgetType(state))
  const visualizationType = useSelector((state: RootState) => getVisualization(state))

  const [name, setName] = useState(category?.name || '')
  const [color, setColor] = useState(category?.color || colors.primary)
  const [icon, setIcon] = useState(category?.icon || 'home')
  const [budget, setBudget] = useState(category?.budget.toString() || '0')
  const [isChecked, setIsChecked] = useState(category?.parentCategoryUid ? true : false)

  const handleSave = () => {
    if (!name || !color || !icon || !budget) {
      Toast.show({
        type: ToastTypes.Error,
        text1: 'Fill all the required fields',
      })
      return
    }
    const newCategory: Partial<Category> = {
      uid: isEdit ? category.uid : undefined,
      name,
      color,
      icon,
      budget: +budget,
      totalSpent: category?.totalSpent || 0,
      expenses: category?.expenses || [],
      parentCategoryUid: isChecked ? parentCategory.uid : undefined,
      categories: category?.categories || [],
    }
    let toastText = 'Category added successfully'
    if (isEdit) {
      toastText = 'Category updated successfully'
      updateCategory(newCategory)
    } else addCategory(newCategory)

    Toast.show({
      type: ToastTypes.Success,
      text1: toastText,
    })
    navigation.navigate(NavigationMainScreens.Categories)
  }

  const showIconModal = () => {
    iconModalRef.current?.show()
  }

  const onClickSelectParentCategory = () => {
    openCategoriesListModal(onSelectCategory)
  }

  const onSelectCategory = (category: Category) => {
    dispatch(setSelectedParentCategory(category))
    closeCategoriesListModal()
  }

  const onChangeBudget = (value: string) => {
    if (categoryBudgetType === CategoryBudgetTypeEnum.Percentage) {
      if (+value > 100) {
        setBudget('100')
        return
      }
    }
    if (+value < 0) {
      setBudget('0')
      return
    }
    setBudget(value)
  }

  const getLabelBudget = (): string => {
    let text = ''
    if (visualizationType === VisualizationTypeEnum.Monthly) text = 'Monthly Budget'
    else text = 'Yearly Budget'
    if (categoryBudgetType === CategoryBudgetTypeEnum.Percentage) text += ' (%)'
    else text += ' (€)'

    return text
  }

  const onFocus = () => {
    if (budget === '0') {
      setBudget('')
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <TouchableOpacity style={styles.icon} onPress={showIconModal}>
            <Icon key={icon} name={icon} size={124} color={color} />
          </TouchableOpacity>
          <CustomInput label="Name" placeholder="Enter name" value={name} onChangeText={setName} />
          <CustomInput
            label={getLabelBudget()}
            value={budget}
            onChangeText={onChangeBudget}
            keyboardType="numeric"
            onFocus={onFocus}
          />
          {showSubcategoryCheckbox && (
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setIsChecked(!isChecked)}
              disabled={isEdit}
            >
              <View style={[{ backgroundColor: isChecked ? colors.primary : colors.bgInput }, styles.checkbox]}>
                {isChecked && <CheckIcon width={28} height={28} color={colors.white} />}
              </View>
              <CustomText>Is Subcategory</CustomText>
            </TouchableOpacity>
          )}

          {isChecked && (
            <CustomDropDown label="Parent Category" onClick={onClickSelectParentCategory} disabled={isEdit}>
              {parentCategory && <CategoryItem category={parentCategory} showBudget={false} />}
            </CustomDropDown>
          )}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <CustomButton title="Save" onPress={handleSave} variant={ButtonVariants.Primary} />
      </View>

      <ColorPickerModal modalRef={colorModalRef} onSelectColor={(color) => setColor(color.hex)} color={color} />
      <IconPickerModal
        modalRef={iconModalRef}
        selectedIcon={icon}
        onSelectIcon={(icon) => setIcon(icon)}
        color={color}
        colorPickerModalRef={colorModalRef}
      />
    </View>
  )
}
