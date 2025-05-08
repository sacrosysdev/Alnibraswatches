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

//////////////////////   CART SECTION ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////

export const useAddToCart = () => {
  return useMutation({
    mutationKey: ["addCart"],
    mutationFn: (payload) => addToCart(payload),
  });
};

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
  });

export const useGetSelectedAddress = (status) =>
  useQuery({
    queryKey: ["getAddress"],
    queryFn: () => getSelectedAddress(status),
    select: (data) => JSON.parse(data.AddressDetails),
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

export const useGetReviews = (productId) =>
  useQuery({
    queryKey: ["getReview", productId],
    queryFn: () => getReview(productId),
    enabled: !!productId,
  });

//////////////////////   PAYMENT ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////
export const useGetPaymentIntent = () => {
  return useMutation({
    mutationKey: ["getPaymentIntent"],
    mutationFn: (amount) => {
      return API.post(GET_PAYMENT_INTENT, {
        amount: convertToSubCurrency(amount),
        currency: "usd",
        orderID: "123",
        customerName: "string",
      });
    },
  });
};

//////////////////////   PRODUCT SECTION ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////
export const usePostOrder = () =>
  useMutation({
    mutationKey: ["postOrder"],
    mutationFn: ({ orderDetails }) => API.post(POST_ORDER, orderDetails),
  });
