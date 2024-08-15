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

import { ListItem } from "../../Components/ListItem/ListItem";
import { StatusBar } from "expo-status-bar";
import { Button, ButtonVariants } from "@/src/Components/Button";

export const ExpensesView = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const [expenses, setExpenses] = useState<[]>([])

  const onPress = async (id: number) => {
    // Delete on Press
  }

  const renderItem = (listData: ListRenderItemInfo<any>) => {
    return <ListItem {...listData} onPress={onPress} />;
  }

  const onAddExpense = () => {
    
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>      
      {/* <StatusBar backgroundColor="purple" /> */}
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
})
