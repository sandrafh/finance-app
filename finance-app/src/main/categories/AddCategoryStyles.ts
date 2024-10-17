import {colors} from '@/src/constants/ColorsConstants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    display: 'flex',
  },
  scrollContainer: {
    flexGrow: 1,    
    backgroundColor: colors.bg,
  },
  formContainer: {
    flex: 1,
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  },
  icon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    padding: 6,

    borderRadius: 25,
    backgroundColor: colors.bgInput,
    
    shadowColor: colors.grey5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.90,
    shadowRadius: 4.65,

    elevation: 8,
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    padding: 6,
    gap: 12
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    width: 36,
    height: 36,
    padding: 4,
    borderRadius: 8,    
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    padding: 20,
    marginBottom: 30
  }
})
