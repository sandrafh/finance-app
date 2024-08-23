export interface Category {
  uid: string
  name: string
  budget: number
  icon: string
  color: string
  expenses: CategoryExpenses[]
  totalSpent: number
}

export interface CategoryExpenses {
  uid: string
  spent: number
}