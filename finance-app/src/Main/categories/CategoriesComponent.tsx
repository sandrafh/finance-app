import React from 'react'

import { CategoriesProvider } from '@/src/contexts/CategoriesContext'
import { CategoriesView } from './CategoriesView'

export const CategoriesComponent = () => {
  return (
    <CategoriesProvider>
      <CategoriesView />
    </CategoriesProvider>
  )
}
