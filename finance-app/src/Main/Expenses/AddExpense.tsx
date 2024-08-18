import React, { useRef, useState } from 'react';
import { View, TextInput, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { styles } from './AddExpenseStyles';

//External libraries
import { SwipeModalPublicMethods } from '@birdwingo/react-native-swipe-modal';
//@ts-ignore
//@ts-ignore
import Toast from 'react-native-toast-message';
//Internal components
import { Button, ButtonVariants } from '@/src/components/Button';
import { ToastTypes } from '@/src/constants/ToastConstants';
import { NavigationExpensesScreens } from '@/src/navigation/NavigationConstants';
import { CustomText } from '@/src/components/CustomText';
import { ExpensesService } from '@/src/services/ExpensesService';
import { CategoriesListModal } from '@/src/modals/CategoriesListModal';


export const AddExpense = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const categoriesModalRef = useRef<SwipeModalPublicMethods>(null)

  const { addExpense } = ExpensesService()
  
  const [name, setName] = useState('')
  const [categoryUid, setCategoryUid] = useState()
  const [spent, setSpent] = useState('0')

  const handleSave = () => {
    if(!name || !spent || !categoryUid) {
      Toast.show({
        type: ToastTypes.Error,
        text1: 'Fill all the required fields'
      })
      return
    }
    const expense = {
      name,
      spent: +spent,
      categoryUid
    }
    addExpense(expense)

    Toast.show({
      type: ToastTypes.Success,
      text1: 'Expense added successfully'
    })
    navigation.navigate(NavigationExpensesScreens.ExpensesView)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.field}>
          <CustomText>Name</CustomText>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
          />  
        </View>   

        <View style={styles.field}>
          <CustomText>Import (€)</CustomText>
          {/* TODO: change for numeric input */}
          <TextInput
            style={styles.input}
            placeholder="Enter budget"
            value={spent}
            onChangeText={setSpent}
            keyboardType="numeric"
          />
        </View>    
        <View style={styles.field}>
          <CustomText>Category</CustomText>
          <Button title="Select category" onPress={() => categoriesModalRef.current?.show()} variant={ButtonVariants.Tertiary} />
        </View>    

        <Button style={styles.button} title="Save" onPress={handleSave} variant={ButtonVariants.Primary} />
      </View>  
      <CategoriesListModal modalRef={categoriesModalRef} />   
    </ScrollView>
  )
}



