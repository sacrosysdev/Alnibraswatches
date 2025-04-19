import API from "../httpService";
import { CATEGORY_LIST } from "./endpoint";
import { BRAND_LIST } from "./endpoint";

export const fetchCategoryList = async () => {
  const response = await API.get(CATEGORY_LIST);
  return response?.data?.data ?? [];
};
export const fetchBrandList = async () =>{
    const response = await API.get(BRAND_LIST);
    return response?.data?.data ?? [];
}