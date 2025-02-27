import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'

import DownArrowIcon from '../assets/icons/down-arrow.svg'

import { colors } from '../constants/ColorsConstants'
import { CustomText } from './CustomText'
import { FontSize, FontWeight } from '../constants/Texts'

interface TextProps {
  children: any
  onClick: () => void
  label?: string
  disabled?: boolean
}

export const CustomDropDown = (props: TextProps) => {
  const { label, children, onClick, disabled = false } = props

  return (
    <View>
      {label && (
        <CustomText style={styles.label} fontSize={FontSize.Medium} fontWeight={FontWeight.Normal}>
          {label}
        </CustomText>
      )}
      <TouchableOpacity style={styles.dropDown} onPress={onClick} disabled={disabled}>
        {children}
        <DownArrowIcon width={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    color: colors.white,
    marginBottom: 8,
    marginLeft: 16,
  },
  dropDown: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: colors.bgInput,
    borderRadius: 25,

    padding: 10,
    paddingHorizontal: 16,
    height: 44,
  },
})
