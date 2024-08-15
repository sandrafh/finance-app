import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
} from "react-native";

import { CTAButton } from "../../Components/CTAButton/CTAButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ListItem } from "../../Components/ListItem/ListItem";
import { StatusBar } from "expo-status-bar";

export const ExpensesView = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [expenses, setExpenses] = useState<[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const [limit, setLimit] = useState(5);

  useEffect(() => {
    // Load all the workouts on the user's profile
  }, [limit]);

  const goToWorkout = () => {
    navigation.push("ActiveWorkout");
  };

  const onPress = async (id: number) => {
    // Delete on Press
  };

  const renderItem = (listData: ListRenderItemInfo<any>) => {
    return <ListItem {...listData} onPress={onPress} />;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor="purple" />
      <FlatList
        data={expenses}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      />
      <View style={styles.buttonContainer}>
        <CTAButton variant="primary" title="START WALK" onPress={goToWorkout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
});
