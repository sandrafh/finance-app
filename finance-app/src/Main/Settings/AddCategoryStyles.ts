import { colors } from '@/src/constants/ColorsConstants';
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
  icon: {
    display: 'flex',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.grey2,
    borderRadius: 12,
    
    shadowColor: colors.grey5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.40,
    shadowRadius: 4.65,

    elevation: 8,
  },
  image: {
    display: 'flex',
    flexDirection: 'row',
    gap: 24,
    alignItems: 'center',
  },
  editButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    alignItems: 'center',
  },
})