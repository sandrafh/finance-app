import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  modal: {
    borderRadius: 20,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 16,
    padding: 24,
  },
  scrollContainer: {},
  grid: {
    height: '100%',
    width: 350,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  icon: {
    width: '15%',
    marginBottom: 16,
    alignItems: 'center',
  },
})
