import { colors } from '@/src/constants/ColorsConstants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 16,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    padding: 16,
    paddingHorizontal: 26,
  },
  dayContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.bg,
  },
  dateContainer: {
    backgroundColor: colors.bgCard,
    borderRadius: 25,
    marginHorizontal: 6,
  },
  date: {
    padding: 8,
    paddingHorizontal: 26,
  },
})
