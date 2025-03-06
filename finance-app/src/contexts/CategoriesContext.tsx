import { createContext, useContext, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

//External libs
import { SwipeModalPublicMethods } from '@birdwingo/react-native-swipe-modal'
//Internal components
import { Category } from '@constants/Category'
import { getCategories } from '@redux/slices/category'
import { FilterComponentEnum, FilterDatesEnum } from '@constants/Filters'

interface CategoriesContextProps {
  filtersModalRef: React.RefObject<SwipeModalPublicMethods>
  startDate: Date
  setStartDate: (date: Date) => void
  endDate: Date
  setEndDate: (date: Date) => void
  selectedCategories: Category[]
  setSelectedCategories: (categories: Category[]) => void
  searchText: string
  setSearchText: (text: string) => void
  filteredCategories: Category[]
  setFilteredCategories: (categories: Category[]) => void
  filterComponent: FilterComponentEnum
  setFilterComponent: (filterComponent: FilterComponentEnum) => void
  setFilterDates: (filterDates: FilterDatesEnum) => void
  filterDatesValue: FilterDatesEnum
  closeFiltersModal: () => void
  error: string
  setError: (error: string) => void
}

const CategoriesContext = createContext<CategoriesContextProps | undefined>(undefined)

export const CategoriesProvider = ({ children }: { children: React.ReactNode }) => {
  const filtersModalRef = useRef<SwipeModalPublicMethods>(null)
  const categories = useSelector((state: any) => getCategories(state))

  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [searchText, setSearchText] = useState<string>('')
  const [filteredCategories, setFilteredCategories] = useState<Category[]>(categories)
  const [filterComponent, setFilterComponent] = useState<FilterComponentEnum>(FilterComponentEnum.Date)
  const [filterDatesValue, setFilterDatesValue] = useState<FilterDatesEnum>(FilterDatesEnum.CurrentMonth)
  const [error, setError] = useState<string>('')

  useMemo(() => {
    if (endDate.getDate() < startDate.getDate()) {
      setError('End date must be greater than start date')
    } else {
      setError('')
    }
  }, [startDate, endDate])

  const closeFiltersModal = () => {
    filtersModalRef.current?.hide()
  }

  const setFilterDates = (filterDates: FilterDatesEnum) => {
    const currentDate = new Date()
    let newStartDate = new Date()
    let newEndDate = new Date()

    switch (filterDates) {
      case FilterDatesEnum.CurrentMonth:
        newStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
        newEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
        setFilterDatesValue(FilterDatesEnum.CurrentMonth)
        break
      case FilterDatesEnum.LastMonth:
        newStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
        newEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0)
        setFilterDatesValue(FilterDatesEnum.LastMonth)
        break
      case FilterDatesEnum.CurrentYear:
        newStartDate = new Date(currentDate.getFullYear(), 0, 1)
        newEndDate = new Date(currentDate.getFullYear(), 11, 31)
        setFilterDatesValue(FilterDatesEnum.CurrentYear)
        break
      case FilterDatesEnum.LastYear:
        newStartDate = new Date(currentDate.getFullYear() - 1, 0, 1)
        newEndDate = new Date(currentDate.getFullYear() - 1, 11, 31)
        setFilterDatesValue(FilterDatesEnum.LastYear)
        break
      case FilterDatesEnum.CustomDates:
        setFilterDatesValue(FilterDatesEnum.CustomDates)
        setFilterComponent(FilterComponentEnum.CustomDates)
        break
    }

    setStartDate(newStartDate)
    setEndDate(newEndDate)
  }

  return (
    <CategoriesContext.Provider
      value={{
        filtersModalRef,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        selectedCategories,
        setSelectedCategories,
        searchText,
        setSearchText,
        filteredCategories,
        setFilteredCategories,
        filterComponent,
        setFilterComponent,
        setFilterDates,
        filterDatesValue,
        closeFiltersModal,
        error,
        setError,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  )
}

export const useCategories = () => {
  const context = useContext(CategoriesContext)
  if (!context) throw new Error('useCategories must be used within a CategoriesProvider')
  return context
}
