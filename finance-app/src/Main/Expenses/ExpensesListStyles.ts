import { colors } from '@/src/constants/ColorsConstants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.lightBlue,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',    
    
    padding: 16,
    paddingHorizontal: 26,
    backgroundColor: colors.grey0,
  },
  separator: {
    borderWidth: 0.5,
    borderColor: colors.grey2
  },
  dayContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.lightBlue,
  },
  day: {
    padding: 8,
    paddingHorizontal: 26,
    backgroundColor: colors.grey1,
  }
})