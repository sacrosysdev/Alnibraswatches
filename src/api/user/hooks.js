import { useQuery } from '@tanstack/react-query';
import { fetchCategoryList,fetchBrandList } from './service';

export const useCategoryList = () => {
  return useQuery({
    queryKey: ['categoryList'],
    queryFn: fetchCategoryList,
    staleTime: 1000 * 60 * 2,  // 2 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  });
};
export const useBrandList = () =>{
  return useQuery({
    queryKey: ['brandList'],
    queryFn: fetchBrandList,
    staleTime: 1000 * 60 * 2,  // 2 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  });
}