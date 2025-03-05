import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import CalendarIcon from '@/src/assets/icons/calendar.svg'
import { colors } from '../constants/ColorsConstants'
import { FontSize } from '../constants/Texts'

interface DateInputProps {
  onOpenCalendar: () => void
  date: Date | null
  setDate: (date: Date | null) => void
}

export const DateInput = ({ onOpenCalendar, date, setDate }: DateInputProps) => {
  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear().toString()
    return `${day}/${month}/${year}`
  }

  const [inputValue, setInputValue] = useState(date ? formatDate(date) : '')

  const parseDate = (text: string): Date | null => {
    const cleaned = text.replace(/\D/g, '') // Remove non-numeric characters
    if (cleaned.length !== 8) return null

    const day = parseInt(cleaned.substring(0, 2), 10)
    const month = parseInt(cleaned.substring(2, 4), 10) - 1
    const year = parseInt(cleaned.substring(4, 8), 10)

    const newDate = new Date(year, month, day)
    return isNaN(newDate.getTime()) ? null : newDate
  }

  const formatInput = (text: string) => {
    const cleaned = text.replace(/\D/g, '')
    let formatted = ''

    if (cleaned.length > 0) formatted = cleaned.substring(0, 2)
    if (cleaned.length > 2) formatted += '/' + cleaned.substring(2, 4)
    if (cleaned.length > 4) formatted += '/' + cleaned.substring(4, 8)

    return formatted
  }

  const handleChange = (text: string) => {
    const formatted = formatInput(text)
    setInputValue(formatted)

    const newDate = parseDate(formatted)
    if (newDate) {
      setDate(newDate)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        keyboardType="numeric"
        placeholder="DD/MM/YYYY"
        value={inputValue}
        onChangeText={handleChange}
        maxLength={10}
      />
      <TouchableOpacity onPress={onOpenCalendar} style={{ marginLeft: 10 }}>
        <CalendarIcon width={24} height={24} color={colors.grey1} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: colors.bgInput,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  textInput: {
    flex: 1,
    color: colors.white,
    fontSize: FontSize.Medium,
  },
})
