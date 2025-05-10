import API from "../httpService";
import { CATEGORY_LIST,BRAND_LIST,PRODUCT_LIST,
        GET_BANNER,USER_SIGNUP,USER_SIGNIN,ADD_WISHLIST,
        GET_WISHLIST,DELETE_WISHLIST,ADDTO_CART,GET_CART,
        UPDATE_CART,DELETE_CART,DELETE_USER_CART,GET_ADDRESS,UPADTE_DEFAULT_ADDRESS,
        POST_ADDRESS,USER_LOGOUT,UPDATE_ADDRESS,PRODUCT_FILTER,
        ADD_REVIEW,GET_REVIEW } from "./endpoint";


export const fetchCategoryList = async () => {
  const response = await API.get(CATEGORY_LIST);
  const allCategories = response?.data?.data ?? [];
  const activeCategories = allCategories.filter(category => category.IsActive === true);
  return activeCategories;
};

export const fetchBrandList = async () => {
  const response = await API.get(BRAND_LIST);
  const allBrands = response?.data?.data ?? [];
  const activeBrands = allBrands.filter(brand => brand.IsActive === true);
  return activeBrands;
};

export const fetchBannerList = async () =>{
  const response = await API.get(GET_BANNER);
  return response?.data?.data ?? [];
}



//////////////////////   PRODUCT SECTION ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////

export const fetchProducts = async ({ pageParam = 1, brand, category }) => {
  const headers = {
    page: pageParam,
    pageSize: 10,
  };

  if (brand) headers['brandID'] = brand;
  if (category) headers['categoryID'] = category;

  const response = await API.get(PRODUCT_LIST, { headers });
  const allProducts = response?.data?.data ?? [];
  const activeProducts = allProducts.filter(product => product.isActive === true);
   return {
    data: activeProducts,
  };
};


export const fetchSingleProduct = async (productId) => {
  const response = await API.get(PRODUCT_LIST, {
    headers: {
      page: 1,
      pageSize: 10,
      productID: productId,
    },
  });

  return response?.data?.data?.[0] ?? {};
};

export const normalizeProductData = (item) => {

  // Check if item has variants
  const hasVariants = item.variants && item.variants.length > 0;
  const firstVariant = hasVariants ? item.variants[0] : null;

  // Parse images if needed
  let imagesArray = [];
  try {
    imagesArray = Array.isArray(item.images)
      ? item.images
      : typeof item.images === 'string'
        ? JSON.parse(item.images || '[]')
        : [];
  } catch (error) {
    console.error('Error parsing images:', error);
    imagesArray = [];
  }

  // Get primary image URL
  const image = hasVariants && firstVariant?.images?.length > 0
    ? firstVariant.images.find(img => img.isPrimary)?.imageUrl
    : imagesArray.find(img => img.isPrimary)?.imageUrl;

  // Calculate price - ensure we're getting a number value
  let price;
  if (hasVariants) {
    // For variants, use discount price if available, otherwise regular price
    price = firstVariant?.price?.discountPrice > 0 
      ? firstVariant.price.discountPrice 
      : firstVariant?.price?.price;
  } else {
    // For products without variants, use discount price if available, otherwise regular price
    price = item.discountPrice > 0 ? item.discountPrice : item.price;
  }

  // Get brand name
  const brand = hasVariants ? firstVariant?.brandName : item.brandName;
  
  // Get variant ID if available
  const variantId = hasVariants ? firstVariant?.variantId : -1;
  const stockQty = hasVariants ? firstVariant?.stock?.onhand:item.stockQty

  return {
    id: item.productId,
    image: image || null,
    title: item.productName,
    brand: brand || '',
    price: price || 0,  // Ensure price is never undefined
    variantId: variantId,
    stockQty:stockQty


  };
};

export const fetchProductsWithCategory = async (categoryId) => {
  const response = await API.get(PRODUCT_LIST, {
    headers: {
      page: 1,
      pageSize: 10,
      categoryID: categoryId,
    },
  });

  return response?.data?.data ?? [];
};

export const searchProducts = async (searchKey) => {
  if (!searchKey) return { data: [] };
  const headers = {
    page: 1,
    pageSize: 20,
    productName: searchKey,
  };
  const response = await API.get(PRODUCT_LIST, { headers });
  const allProducts = response?.data?.data ?? [];
  const activeProducts = allProducts.filter(product => product.isActive === true);
  return activeProducts
};

export const filterProducts = async (payload) =>{
   const response = await API.post(PRODUCT_FILTER, payload);
   const allProducts = response?.data?.data ?? [];
   const activeProducts = allProducts.filter(product => product.isActive === true);
   return activeProducts

}

//////////////////////   USER AUTHENTICATION ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////

export const userSignUp = async (payload) => {
  const response = await API.post(USER_SIGNUP, payload); 
  return response?.data?.data ?? [];
};

export const userSignIn = async (payload) =>{
  const response = await API.post(USER_SIGNIN, payload); 
  return response?.data?.data ?? [];
}
export const userLogout = async () =>{
  const response = await API.post(USER_LOGOUT,); 
  return response?.data?.data ?? [];
}

//////////////////////   WISHLIST ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////

export const addWishlistItem = async (payload) => {
  const headers = {
    VariantId: payload.variantId,
    ProductId: payload.id,
  };
  const response = await API.post(ADD_WISHLIST, {},{headers}); 
  return response?.data?.data ?? [];
};

export const getWishlist = async () => {
  const response = await API.get(GET_WISHLIST);
  return response?.data?.data ?? [];
};

export const removeWishlistItem = async (payload) => {
  const headers = {
    ProductId: payload.id,
    varientID: payload.variantId,
  };

  const response = await API.delete(DELETE_WISHLIST,{headers});
  return response?.data?.data ?? [];
};

//////////////////////   CART   ////////////////////////////

export const addToCart = async (payload) => {
  const response = await API.post(ADDTO_CART,payload); 
  return response?.data?.data ?? [];
};

export const getCart = async () => {
  const response = await API.get(GET_CART);
  return response?.data?.data ?? [];
};

export const updateCart = async (payload) => {
  const headers = {
    CartId:payload.CartId
  };
  const response = await API.put(UPDATE_CART,payload,{headers});
  return response?.data?.data ?? [];
};

export const deleteCart = async (cartId) => {
  const headers = {
    CartId:cartId
  };
  const response = await API.delete(DELETE_CART,{headers});
  return response?.data?.data ?? [];
};

export const deleteUserCart = async (cartId) => {
  const response = await API.delete(DELETE_USER_CART,);
  return response?.data?.data ?? [];
};

//////////////////////   USER ADDRESS ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////

export const getAddress = async () => {
  const response = await API.get(GET_ADDRESS);
  return response?.data?.data ?? [];
};

export const getSelectedAddress = async (status) => {
  const response = await API.get(GET_ADDRESS);
  const addresses = response?.data?.data ?? [];
  if (status == null) {
    const defaultAddress = addresses.find(addr => addr.IsDefault === true);
    return defaultAddress || addresses[addresses.length - 1];
  } else {
    return addresses[addresses.length - 1];
  }

};

export const updateDefaultAddress = async (address) => {
 const headers = {
    AddressId:address.AddressId,
    IsDefault:address.IsDefault
  };
  const response = await API.put(UPADTE_DEFAULT_ADDRESS, {},{ headers });
  return response?.data?.data ?? [];
};

export const addAddress = async (values) => {
  const payload = {
    userName: values.fullName,
    phoneNumber: values.phone,
    pincode: values.pincode,
    address: values.addres,
    district: values.street,
    city: values.state,
    AddressLabel:values.addressType,
    landmark: values.landmark || '',
   
  };
   const response = await API.post(POST_ADDRESS, payload);
   return response?.data?.data ?? [];
};

export const updateAddress = async (values) => {
  const headers = {
    AddressId: values.addressId,
  };
  const payload = {
    addressId: values.addressId, 
    userName: values.fullName,
    phoneNumber: values.phone,
    pincode: values.pincode,
    address: values.addres,
    district: values.street,
    city: values.state,
    AddressLabel: values.addressType,
    landmark: values.landmark || '',
    isDefault: values.makeDefault || false
  };
  
  const response = await API.put(UPDATE_ADDRESS, payload,{headers});
  return response?.data?.data ?? [];
};

//////////////////////   USER REVIEW ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////

export const addReview = async (payload) =>{

  const response = await API.post(ADD_REVIEW, payload);
  return response?.data?.data ?? [];

}

export const getReview = async (proId) =>{
  const headers = {
    ProductId:proId
  };
  const response = await API.get(GET_REVIEW,{headers});
  return response?.data?.data ?? [];

}



