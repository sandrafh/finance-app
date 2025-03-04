import React, { createContext, useContext, useRef, useState } from 'react'
import { Category } from '../constants/Category'
import { getCategories } from '../redux/slices/category'
import { useSelector } from 'react-redux'

export enum CategoryFilterEnum {
  Date = 'Date',
  CustomDate = 'CustomDate',
  Categories = 'Categories',
}

interface CategoriesContextProps {
  filtersModalRef: React.RefObject<any>
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
  filterComponent: CategoryFilterEnum
  setFilterComponent: (filterComponent: CategoryFilterEnum) => void
}

const CategoriesContext = createContext<CategoriesContextProps | undefined>(undefined)

export const CategoriesProvider = ({ children }: { children: React.ReactNode }) => {
  const filtersModalRef = useRef<any>(null)
  const categories = useSelector((state: any) => getCategories(state))

  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [searchText, setSearchText] = useState<string>('')
  const [filteredCategories, setFilteredCategories] = useState<Category[]>(categories)
  const [filterComponent, setFilterComponent] = useState<CategoryFilterEnum>(CategoryFilterEnum.Date)

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
