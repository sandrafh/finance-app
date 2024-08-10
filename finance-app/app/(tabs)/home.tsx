import { StyleSheet } from 'react-native'

import { ThemedView } from '@/components/ThemedView'
import { ThemedButton } from '@/components/ThemedButton';

import { firebase } from '@react-native-firebase/database';
import database from '@react-native-firebase/database';


const HomeScreen = () => {

  const onPressAddExpense = () => {
    console.log("add expense click")
    firebase
      .app().database()
      .ref('/users/sandra')
      .set({
        name: 'sandra',
        age: 26,
      })
      .then(() => console.log('Data set.'));
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.card}>
      <ThemedButton
        onPress={onPressAddExpense}
        title="Add expense"
      />
      </ThemedView>

    </ThemedView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 20
  },
  card: {
    width: '80%',
    height: 200,
    display: 'flex',
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 12
  },
})
