import {colors} from '@/src/constants/ColorsConstants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    display: 'flex',
    padding: 20
  },
  scrollContainer: {
    flexGrow: 1,    
    backgroundColor: colors.bg,    
  },
  options: {
    display: "flex",
    gap: 16,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginBottom: 30
  }
})
