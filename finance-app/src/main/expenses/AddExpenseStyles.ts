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
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    padding: 20,
    marginBottom: 30
  },
  label: {
    color: colors.white,
    marginBottom: 8,
    marginLeft: 16,
  }
})
