import { useQuery } from "@tanstack/react-query";
import {
  fetchCategoryList,
  fetchBrandList,
  fetchProducts,
  fetchSingleProduct,
  fetchProductsWithCategory,
  fetchBannerList,
  searchProducts,
  userSignUp,
  userSignIn,
  addWishlistItem,
  getWishlist,
  removeWishlistItem,
  addToCart,
  getCart,
  updateCart,
  deleteCart,
  deleteUserCart,
  getAddress,
  getSelectedAddress,
  updateDefaultAddress,
  addAddress,
  updateAddress,
  userLogout,
  filterProducts,
  addReview,
  getReview,
  buyNow,
} from "./service";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import API from "../httpService";
import { GET_PAYMENT_INTENT, POST_ORDER } from "./endpoint";
import convertToSubCurrency from "../../util/convertToSubCurrency";

//Category Listing
export const useCategoryList = () => {
  return useQuery({
    queryKey: ["categoryList"],
    queryFn: fetchCategoryList,
    staleTime: 1000 * 60 * 2, // 2 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  });
};

//Brand listing
export const useBrandList = () => {
  return useQuery({
    queryKey: ["brandList"],
    queryFn: fetchBrandList,
    staleTime: 1000 * 60 * 2, // 2 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  });
};
//////////////////////   PRODUCT SECTION ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////

export const useProductList = (filters) => {
  return useInfiniteQuery({
    queryKey: ["productList", filters],
    queryFn: ({ pageParam = 1 }) => {
      return fetchProducts({
        pageParam,
        brand: filters.brand,
        category: filters.category,
      });
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
    queryKey: ["singleProduct", productId],
    queryFn: () => fetchSingleProduct(productId),
    enabled: !!productId, // only run if productId is truthy
  });
};

// product listing with category

export const useProductListWithCategory = (categoryId, options = {}) => {
  return useQuery({
    queryKey: ["relatedProducts", categoryId],
    queryFn: () => fetchProductsWithCategory(categoryId),
    enabled: !!categoryId,
    ...options,
  });
};

//Banner listing
export const useBannerList = () => {
  return useQuery({
    queryKey: ["bannerList"],
    queryFn: fetchBannerList,
    staleTime: 1000 * 60 * 2, // 2 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  });
};

//serach
export const useSearchProduct = (searchText) => {
  return useQuery({
    queryKey: ["searchProduct", searchText],
    queryFn: () => searchProducts(searchText),
    enabled: !!searchText,
    staleTime: 1000 * 60 * 2,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};

export const useFilterProducts = () => {
  return useMutation({
    mutationFn: (payload) => filterProducts(payload),
  });
};

//////////////////////   USER AUTHENTICATION ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////

export const useSignup = () =>
  useMutation({
    mutationKey: ["userSignup"],
    mutationFn: (payload) => userSignUp(payload),
  });

export const useSignIn = () =>
  useMutation({
    mutationKey: ["userSignin"],
    mutationFn: (payload) => userSignIn(payload),
  });

export const useLogout = () =>
  useMutation({
    mutationKey: ["userLogout"],
    mutationFn: () => userLogout(),
  });

//////////////////////   WISHLIST ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////

export const useAddWishlist = () =>
  useMutation({
    mutationKey: ["addWishlist"],
    mutationFn: (payload) => addWishlistItem(payload),
  });

export const useGetWishlist = (options = {}) =>
  useQuery({
    queryKey: ["getWishlist"],
    queryFn: getWishlist,
    ...options, // Spread any additional options like enabled
  });

export const useRemoveWishlist = () =>
  useMutation({
    mutationKey: ["removeWishlist"],
    mutationFn: (payload) => removeWishlistItem(payload),
  });

//////////////////////   CART SECTION ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////

export const useAddToCart = () => {
  return useMutation({
    mutationKey: ["addCart"],
    mutationFn: (payload) => addToCart(payload),
  });
};

export const useGetCart = (options = {}) => {
  return useQuery({
    queryKey: ["getCart"],
    queryFn: getCart,
    retry: false,
    ...options, // Spread any additional options like enabled
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
export const useDeleteUserCartItem = () => {
  return useMutation({
    mutationKey: ["deleteUserCart"],
    mutationFn: () => deleteUserCart(),
  });
};

//////////////////////   USER ADDRESS ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////

export const useGetUserAddress = () =>
  useQuery({
    queryKey: ["getAddress"],
    queryFn: getAddress,
    select: (data) => data || [], // Ensure we never return undefined
    // retry: false, // Don't retry on error
    // retryOnMount: false, // Don't retry when component mounts
    // refetchOnWindowFocus: false, // Don't refetch when window gains focus
    // refetchOnReconnect: false, // Don't refetch when reconnecting
  });

// Hook specifically for route protection
export const useCheckAuth = () =>
  useQuery({
    queryKey: ["checkAuth"],
    queryFn: getAddress,
    select: (data) => data || [], // Ensure we never return undefined
    retry: false, // Don't retry on error
    retryOnMount: false, // Don't retry when component mounts
    refetchOnWindowFocus: false, // Don't refetch when window gains focus
    refetchOnReconnect: false, // Don't refetch when reconnecting
  });

export const useGetSelectedAddress = (status) =>
  useQuery({
    queryKey: ["getSelectedAddress", status],
    queryFn: () => getSelectedAddress(status),
    select: (data) => {
      try {
        // If data is null or undefined, return null
        if (!data) return null;
        const addresses = data.map((item) => {
          // If data doesn't have AddressDetails, return null
          if (!item.AddressDetails) return null;

          const address = JSON.parse(item.AddressDetails);
          return {
            ...address,
            addressId: item.AddressId,
            IsDefault: item.IsDefault,
          };
        });
        return addresses;
      } catch (error) {
        console.error("Error parsing address details:", error);
        return null;
      }
    },
    // Ensure we never return undefined
    placeholderData: null,
  });

export const useUpdateDefaultAddress = () => {
  return useMutation({
    mutationFn: updateDefaultAddress,
  });
};

export const useAddAddress = () => {
  return useMutation({
    mutationFn: (payload) => addAddress(payload),
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values) => updateAddress(values),
    onSuccess: () => {
      // Invalidate and refetch the user addresses query to update the UI
      queryClient.invalidateQueries(["userAddresses"]);
    },
  });
};

//////////////////////   REVIEW ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////

export const useAddReview = () => {
  return useMutation({
    mutationFn: (payload) => addReview(payload),
  });
};

export const useGetReviews = (productId, options = {}) =>
  useQuery({
    queryKey: ["getReview", productId],
    queryFn: () => getReview(productId),
    enabled: !!productId,
    ...options, // Spread any additional options like enabled
  });

//////////////////////   PAYMENT ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////
export const useGetPaymentIntent = () => {
  return useMutation({
    mutationKey: ["getPaymentIntent"],
    mutationFn: (header) => {
      let config = {};
      if (header) {
        config = { headers: { paymode: "COD" } };
      }

      return API.post(GET_PAYMENT_INTENT, {}, config);
    },
  });
};

//////////////////////   PRODUCT SECTION ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////
export const usePostOrder = () =>
  useMutation({
    mutationKey: ["postOrder"],
    mutationFn: ({ orderDetails }) => API.post(POST_ORDER, orderDetails),
  });

export const useBuyNow = () => {
  return useMutation({
    mutationKey: ["buyNow"],
    mutationFn: (payload) => buyNow(payload),
  });
};
