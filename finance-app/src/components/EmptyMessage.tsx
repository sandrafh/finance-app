import React from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';

import EmptyListIcon from '../assets/icons/empty-list.svg';

//Internal components
import { CustomText } from '@/src/components/CustomText';
import { colors } from '@/src/constants/ColorsConstants';
import { FontSize } from '@/src/constants/Texts';

interface EmptyMessageProps {
  text: string
}

export const EmptyMessage = ({ text }: EmptyMessageProps) => {
  return (
    <View style={styles.emptyListContainer}>
      <EmptyListIcon 
        width={50} 
        height={50}
        color={colors.white}
      />
      <CustomText fontSize={FontSize.Large}>{text}</CustomText>
    </View>
  )
}

const styles = StyleSheet.create({
  emptyListContainer: {
    flex: 1,
    display: 'flex',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  }
})

