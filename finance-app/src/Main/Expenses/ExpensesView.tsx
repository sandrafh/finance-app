import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import db from "@react-native-firebase/database"

import { ListItem } from "../../Components/ListItem/ListItem";
import { StatusBar } from "expo-status-bar";
import { Button, ButtonVariants } from "@/src/Components/Button";
import { colors } from "@/src/Constants/ColorsConstants";
import { useSelector } from "react-redux";
import { getUserUid } from "@/src/redux/slices/user";
import { v4 } from 'uuid';

export const ExpensesView = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const userUid = useSelector((state: any) => getUserUid(state))

  const [expenses, setExpenses] = useState<any[]>([])

  useEffect(() => {
    // try {
    //   db().ref(`users/${userUid}/expenses`).on("value", (snapshot) => {
    //     const expensesData = snapshot.val()
    //     if(expensesData) {
    //       const expensesArray = Object.keys(expensesData).map((key) => {
    //         return {
    //           id: key,
    //           ...expensesData[key]
    //         }
    //       })
    //       setExpenses(expensesArray)
    //     }
    //   })
    // } catch(error) {
    //   console.error("Error on get expenses: ", error)
    // }
  }, [])

  const onPress = async (id: number) => {
    // Delete on Press
  }

  const renderItem = (listData: ListRenderItemInfo<any>) => {
    return <ListItem {...listData} onPress={onPress} />;
  }

  const onAddExpense = () => {
    try {
      db().ref(`users/${userUid}/expenses/${v4()}`).set({ name: "Expense1", import: 10, category: "compra", date: Date.now() })
      db().ref(`users/${userUid}/expenses/${v4()}`).set({ name: "Expense2", import: 20, category: "compra", date: Date.now() })
      db().ref(`users/${userUid}/expenses/${v4()}`).set({ name: "Expense3", import: 25, category: "gatos", date: Date.now() })
      db().ref(`users/${userUid}/expenses/${v4()}`).set({ name: "Expense4", import: 100, category: "viajes", date: Date.now() })
      db().ref(`users/${userUid}/expenses/${v4()}`).set({ name: "Expense5", import: 150, category: "viajes", date: Date.now() })
    } catch(error) {
      console.error("Error on add expense: ", error)
    }   
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>      
      {/* <StatusBar backgroundColor="purple" /> */}
      <View style={styles.cardComponent}>
        <View style={styles.card}>
          <Text>Expenses</Text>
        </View>
      </View>      
      <FlatList
        data={expenses}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      />
      <View style={styles.buttonContainer}>
        <Button variant={ButtonVariants.Primary} title="Add Expense" onPress={onAddExpense} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 20,
  },
  cardComponent: {
    width: "auto",
    display: "flex",
    margin: 15
  },
  card: {
    height: 200,
    display: "flex",
    borderRadius: 8,
    backgroundColor: colors.background2,
    padding: 12,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 6,
  }
})
