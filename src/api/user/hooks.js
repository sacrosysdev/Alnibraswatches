import { useQuery } from '@tanstack/react-query';
import { fetchCategoryList,fetchBrandList, 
         fetchProducts,fetchSingleProduct,fetchProductsWithCategory } from './service';
import { useInfiniteQuery } from '@tanstack/react-query';

//Category Listing
export const useCategoryList = () => {
  return useQuery({
    queryKey: ['categoryList'],
    queryFn: fetchCategoryList,
    staleTime: 1000 * 60 * 2,  // 2 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  });
};

//Brand listing
export const useBrandList = () =>{
  return useQuery({
    queryKey: ['brandList'],
    queryFn: fetchBrandList,
    staleTime: 1000 * 60 * 2,   // 2 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  });
}

//product listing
export const useProductList = () => {
  return useInfiniteQuery({
    queryKey: ['productList'],
    queryFn: ({ pageParam = 1 }) => fetchProducts({ pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const hasMore = lastPage.data.length === 10; 
      return hasMore ? allPages.length + 1 : undefined;
    },
    staleTime: 1000 * 60 * 2,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};

//display single product with product id
export const useSingleProduct = (productId) => {
  return useQuery({
    queryKey: ['singleProduct', productId],
    queryFn: () => fetchSingleProduct(productId),
    enabled: !!productId, // only run if productId is truthy
  });
};


export const useProductListWithCategory = (categoryId, options = {}) => {
  return useQuery({
    queryKey: ['relatedProducts', categoryId],
    queryFn: () => fetchProductsWithCategory(categoryId),
    enabled: !!categoryId,
    ...options,
  });
};
