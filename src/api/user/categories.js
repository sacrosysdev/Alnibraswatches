// api/products.js
import http from "./httpService"
import { CATEGORY_LIST } from "./endpoint"
export const getCategories = async () => {
  try {
    const { data } = await http.get(CATEGORY_LIST)
    return data
  } catch (error) {
    
    throw error
  }
}
