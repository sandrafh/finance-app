import { colors } from '@/src/Constants/ColorsConstants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,    
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
  label: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grey2,
    padding: 10,
    borderRadius: 5,
  },
  previewColor: {
    height: 124,
    width: 124,
    borderRadius: 100,
  },
  button: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    width: '100%'
  },
  image: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})