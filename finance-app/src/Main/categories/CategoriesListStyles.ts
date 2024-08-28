import { colors } from '@/src/constants/ColorsConstants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    height: 1,
    backgroundColor: colors.separator
  },
})