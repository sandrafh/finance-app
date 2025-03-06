import { View } from 'react-native'
//External libraries
import DateTimePicker from 'react-native-ui-datepicker'
//Internal libraries
import { colors } from '@constants/ColorsConstants'
import { FontWeight } from '@constants/Texts'
import { getFontFamily } from '@utils/fontFamily'

interface CaledarProps {
  date: string
  setDate: (date: string) => void
}

export const Calendar = ({ date, setDate }: CaledarProps) => {
  const setTimeToZero = (date: Date) => {
    const newDate = new Date(date)
    newDate.setUTCHours(0, 0, 0, 0)
    return newDate
  }

  return (
    <View>
      <DateTimePicker
        mode="single"
        date={date}
        onChange={(params) => setDate(setTimeToZero(params.date as Date).toISOString())}
        locale="es-ES"
        firstDayOfWeek={1}
        calendarTextStyle={{ fontFamily: getFontFamily(FontWeight.Normal), color: colors.white }}
        headerTextStyle={{ fontFamily: getFontFamily(FontWeight.Normal), color: colors.white }}
        headerButtonColor={colors.white}
        selectedItemColor={colors.primary}
        monthContainerStyle={{ backgroundColor: colors.bgCard, borderColor: 'transparent' }}
        yearContainerStyle={{ backgroundColor: colors.bgCard, borderColor: 'transparent' }}
        weekDaysTextStyle={{ fontFamily: getFontFamily(FontWeight.Normal), color: colors.white }}
      />
    </View>
  )
}
