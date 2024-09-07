import { Category } from '../constants/Category'


export const findCategory = (categories: any[], categoryUid: string) => {
  const category = categories.find((category: any) => category.uid === categoryUid) as Category
  if(!!category) return category
  else {
    let subCategory: Category = {} as Category
    categories.forEach((category: any) => {
      if(!!category.categories) {
        const subCat = category.categories.find((subCategory: any) => subCategory.uid === categoryUid)
        if(!!subCat) {
          subCategory = subCat
          return
        }
      }
    })
    return subCategory
  }
}