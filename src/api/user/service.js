import API from "../httpService";
import { CATEGORY_LIST,BRAND_LIST,PRODUCT_LIST } from "./endpoint";


export const fetchCategoryList = async () => {
  const response = await API.get(CATEGORY_LIST);
  return response?.data?.data ?? [];
};

export const fetchBrandList = async () =>{
  const response = await API.get(BRAND_LIST);
   return response?.data?.data ?? [];
}

export const fetchProducts = async ({ pageParam = 1 }) => {
  const response = await API.get(PRODUCT_LIST, {
    headers: {
      page: pageParam,
      pageSize: 10,
    },
  });

  // Important: API should return array (or { data: [] })
  return {
    data: response?.data?.data ?? [],
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
  const hasVariants = item.variants && item.variants.length > 0;
  const firstVariant = hasVariants ? item.variants[0] : null;

  const imagesArray = Array.isArray(item.images)
    ? item.images
    : typeof item.images === 'string'
      ? JSON.parse(item.images || '[]')
      : [];

  const image = hasVariants
    ? firstVariant?.images?.find(img => img.isPrimary)?.imageUrl
    : imagesArray.find(img => img.isPrimary)?.imageUrl;

  const price = hasVariants
    ? firstVariant?.price?.discountPrice ?? firstVariant?.price?.price
    : item.discountPrice ?? item.price;

  const brand = hasVariants
    ? firstVariant?.brandName
    : item.brandName;

  return {
    id: item.productId,
    image: image || null,
    title: item.productName,
    brand: brand || '',
    price: price || '',
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