import { colors } from '@/src/constants/ColorsConstants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,    
    backgroundColor: colors.lightBlue,
  },
  formContainer: {
    flex: 1,
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grey2,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    width: '100%'
  },
  dropDown: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderWidth: 1,
    borderColor: colors.grey2,
    borderRadius: 5,

    padding: 10,
    paddingLeft: 12,    
    height: 44
  }
})