import { View } from 'react-native'
//External libraries
import DateTimePicker, { DateType } from 'react-native-ui-datepicker'
//Internal libraries
import { colors } from '@constants/ColorsConstants'
import { FontWeight } from '@constants/Texts'
import { getFontFamily } from '@utils/fontFamily'

interface DateTypeObject {
  date: DateType
}

interface CaledarProps {
  date: string
  setDate: (date: string) => void
}

export const Calendar = ({ date, setDate }: CaledarProps) => {
  const onChangeDate = (params: DateTypeObject) => {
    if (!params) return
    const date = new Date(params.date as string)
    setDate(date.toISOString())
  }

  return (
    <View>
      <DateTimePicker
        mode="single"
        date={date}
        onChange={(params) => onChangeDate(params)}
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
