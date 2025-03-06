import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
    padding: 20,
    alignContent: 'center',
    justifyContent: 'center',
  },
  modal: {
    borderRadius: 20,
    paddingBottom: 20,
  },
  error: {
    color: 'red',
    marginLeft: 16,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
})
