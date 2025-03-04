export interface Category {
  uid: string
  name: string
  budget: number
  icon: string
  color: string
  expenses: CategoryExpenses[]
  totalSpent: number
  parentCategoryUid?: string
  categories?: Category[]
}

export interface CategoryExpenses {
  uid: string
  spent: number
  date: string
}
