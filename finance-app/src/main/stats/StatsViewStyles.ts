import { colors } from '@/src/constants/ColorsConstants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    display: 'flex',
  },
  chartContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  scrollContainer: {
    flexGrow: 1,
  },
})
