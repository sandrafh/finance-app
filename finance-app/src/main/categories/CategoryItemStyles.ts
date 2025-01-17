import { colors } from '@/src/constants/ColorsConstants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  cardTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  end: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  percentageBudget: {
    backgroundColor: colors.bgCard,
    padding: 6,
    borderRadius: 12,
    overflow: 'hidden',
  }
})
