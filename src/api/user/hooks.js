import { useQuery } from '@tanstack/react-query';
import { fetchCategoryList,fetchBrandList, 
         fetchProducts,fetchSingleProduct,fetchProductsWithCategory,fetchBannerList,
         searchProducts,userSignUp,userSignIn,addWishlistItem,getWishlist,
         removeWishlistItem,addToCart,getCart,updateCart, 
         deleteCart,getAddress,getSelectedAddress} from './service';
import { useInfiniteQuery,useMutation } from '@tanstack/react-query';

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
export const useProductList = (filters) => {
  return useInfiniteQuery({
    queryKey: ['productList', filters],
    queryFn: ({ pageParam = 1 }) => {
      return fetchProducts({ pageParam, brand: filters.brand, category: filters.category });
    },
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

// product listing with category

export const useProductListWithCategory = (categoryId, options = {}) => {
  return useQuery({
    queryKey: ['relatedProducts', categoryId],
    queryFn: () => fetchProductsWithCategory(categoryId),
    enabled: !!categoryId,
    ...options,
  });
};

//Banner listing
export const useBannerList = () => {
  return useQuery({
    queryKey: ['bannerList'],
    queryFn: fetchBannerList,
    staleTime: 1000 * 60 * 2,  // 2 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  });
};

//serach
export const useSearchProduct = (searchText) => {
  return useQuery({
    queryKey: ['searchProduct', searchText], 
    queryFn: () => searchProducts(searchText), 
    enabled: !!searchText, 
    staleTime: 1000 * 60 * 2,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};

//sign up
export const useSignup = () =>
  useMutation({
    mutationKey: ["userSignup"],
    mutationFn: (payload) => userSignUp(payload),
});

//login
export const useSignIn = () =>
  useMutation({
    mutationKey: ["userSignin"],
    mutationFn: (payload) => userSignIn(payload),
});

export const useAddWishlist = () => 
  useMutation({
    mutationKey: ["addWishlist"],
    mutationFn: (payload) => addWishlistItem(payload),
  });

export const useGetWishlist = () =>
    useQuery({
      queryKey: ["getWishlist"],
      queryFn: getWishlist,
});

export const useRemoveWishlist = () => 
    useMutation({
      mutationKey: ["removeWishlist"],
      mutationFn: (payload) => removeWishlistItem(payload),
});
export const useAddToCart = () => {
  return useMutation({
    mutationKey: ["addCart"],
    mutationFn: (payload) => addToCart(payload),
  });
}
export const useGetCart = () => {
  return useQuery({
    queryKey: ["getCart"],
    queryFn: getCart,
  });
};
export const useUpdateCartItem = () => {
  return useMutation({
    mutationKey: ["updateCart"],
    mutationFn: (payload) => updateCart(payload),
  });
};
export const useDeleteCartItem = () => {
  return useMutation({
    mutationKey: ["deleteCart"],
    mutationFn: (payload) => deleteCart(payload),
  });
};
export const useGetUserAddress = () =>
  useQuery({
    queryKey: ["getAddress"],
    queryFn: getAddress,
});

export const useGetSelectedAddress = () =>
  useQuery({
    queryKey: ["getAddress"],
    queryFn: getSelectedAddress,
});
  





