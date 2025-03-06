import { StyleSheet } from 'react-native'
import { colors } from '@constants/ColorsConstants'

export const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
    paddingTop: 20,
  },
  mainContent: {
    flex: 6,
    gap: 12,
  },
  titleContainer: {
    flex: 1.2,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: '300',
    color: colors.white,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    marginBottom: 20,
  },
})
