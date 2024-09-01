import { colors } from '@/src/constants/ColorsConstants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',    
    
    padding: 16,
    paddingHorizontal: 26,
    backgroundColor: colors.bg,
  },
  separator: {
    height: 1,
    backgroundColor: colors.separator,
  },
  dayContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.bg,
  },
  dateContainer:{
    backgroundColor: colors.bgCard,
    borderRadius: 25,
    marginHorizontal: 6
  },
  date: {
    padding: 8,
    paddingHorizontal: 26,
  }
})