import { colors } from '@/src/constants/ColorsConstants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    display: 'flex',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,         
  },
  chartOptions: {
    display: 'flex',
    gap: 16,
  },
  chartContainer: {
    display: 'flex',
  },
  switchContainer: {
    display: 'flex',
    alignItems: 'center',
  }
})