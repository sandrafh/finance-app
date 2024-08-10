import { Image, StyleSheet, Platform, Button } from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedButton } from '@/components/ThemedButton';


const HomeScreen = () => {
  const buttonBackground = useThemeColor({}, 'buttonBackground');

  const onPressAddExpense = () => {
    console.log("add expense click")
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
