import { colors } from '@/src/constants/ColorsConstants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  listContainer: {
    flex: 1,
    paddingBottom: 48,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: '100%',
    padding: 20,
  },
})
