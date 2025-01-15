import {colors} from '@/src/constants/ColorsConstants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    display: 'flex',
  },
  infoContainer: {
    backgroundColor: colors.bgCard,
    borderRadius: 25,
    margin: 12,
    display: 'flex',
    alignItems: 'center',
  },
  info: {
    padding: 8,  
  },
})
