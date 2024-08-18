import { colors } from '@/src/constants/ColorsConstants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    backgroundColor: colors.lightBlue,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
    padding: 16,
    backgroundColor: colors.grey1,

    borderWidth: 1,
    borderColor: colors.grey2,
    borderRadius: 12,

    shadowColor: colors.grey4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 4,
  },
  cardTitle: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    width: '100%',
  },
})