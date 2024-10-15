import { colors } from '@/src/constants/ColorsConstants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    display: 'flex',
    padding: 20,
    flexDirection: 'column',
    gap: 20,
  },
  scrollContainer: {
    flexGrow: 1,         
  },
  chartContainer: {
  },
  switchContainer: {
    flex: 1
  }
})