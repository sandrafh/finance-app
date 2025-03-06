import { useState } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import CalendarIcon from '@assets/icons/calendar.svg'
import { colors } from '@constants/ColorsConstants'
import { FontSize, FontWeight } from '@constants/Texts'
import { CustomText } from './CustomText'

interface DateInputProps {
  onOpenCalendar: () => void
  date: Date
  setDate: (date: Date) => void
  label?: string
}

export const DateInput = ({ onOpenCalendar, date, setDate, label }: DateInputProps) => {
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
    <View>
      {label && (
        <CustomText style={styles.label} fontSize={FontSize.Medium} fontWeight={FontWeight.Normal}>
          {label}
        </CustomText>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="DD/MM/YYYY"
          value={inputValue}
          onChangeText={handleChange}
          maxLength={10}
        />
        <TouchableOpacity onPress={onOpenCalendar} style={styles.calendarIconContainer}>
          <CalendarIcon width={24} height={24} color={colors.grey1} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
    backgroundColor: colors.bgInput,
  },
  input: {
    flex: 1,
    color: colors.white,
    fontSize: FontSize.Medium,
    height: 44,
  },
  label: {
    color: colors.white,
    marginBottom: 8,
    marginLeft: 16,
  },
  calendarIconContainer: {
    marginLeft: 10,
  },
})
