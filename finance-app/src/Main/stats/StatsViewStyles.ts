import { colors } from '@/src/constants/ColorsConstants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    display: 'flex',
    padding: 20
  },
  scrollContainer: {
    flexGrow: 1,         
  },
  chart: {
    color: colors.white,
    backgroundColor: colors.separator,
    paddingRight: 0,
    paddingLeft: 20,
    borderRadius: 10,
  },
  chartContainer: {
    marginHorizontal: -20,
  }
})