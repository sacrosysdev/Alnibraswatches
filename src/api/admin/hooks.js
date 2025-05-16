import { useMutation, useQuery } from "@tanstack/react-query";
import { transformImageUrls } from "../../util/transformImageUrls";
import { BANNER_INITIAL_VALUE } from "../../constant/admin";
import {
  activeColor,
  activeProduct,
  activeSize,
  addAdvertisement,
  addBanner,
  addBrand,
  addCategory,
  addColor,
  addProduct,
  addSize,
  adminLogin,
  deleteBrand,
  deleteCategory,
  deleteImage,
  editBanner,
  editBrand,
  editBrandOrder,
  editCategory,
  editCategoryOrder,
  editColor,
  editOrderStatus,
  editProduct,
  editSizee,
  getAdvertisement,
  getBanner,
  getBrand,
  getCategory,
  getColors,
  getMetrics,
  getOrderes,
  getProducts,
  getRecentOrders,
  getSellingProducts,
  getSizes,
  getSummeryChart,
  getTopCustomers,
  uploadImage,
} from "./service";
import { useState } from "react";

//////////////////////   IMAGEG UPLOAD AND DELETE ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////
// IMAGE UPLOAD
export const useImageUpload = () =>
  useMutation({
    mutationKey: ["uploadImage"],
    mutationFn: uploadImage,
  });
// IMAGE DELETE
export const useImageDelete = () =>
  useMutation({
    mutationKey: ["deleteImage"],
    mutationFn: deleteImage,
  });
// ADMIN LOGIN
export const useAdminLogin = () =>
  useMutation({
    mutationKey: ["adminLogin"],
    mutationFn: adminLogin,
  });
//////////////////////   CATEGORY SECTION ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////
// GET ALL CATEGORY
export const useGetAllCategory = (options = {}) =>
  useQuery({
    queryKey: ["allCategory"],
    queryFn: getCategory,
    ...options, // spread options like select, enabled, etc.
  });

// ADD CATEGORY
export const usePostCategory = () =>
  useMutation({
    mutationKey: ["postCategory"],
    mutationFn: addCategory,
  });
// EDIT CATEGORY
export const usePutCategory = () =>
  useMutation({
    mutationKey: ["putCategory"],
    mutationFn: editCategory,
  });
// EDIT CATEGORY ORDER
export const usePutCategoryOrder = () =>
  useMutation({
    mutationKey: ["categoryOrder"],
    mutationFn: editCategoryOrder,
  });
// DELETE CATEGORY
export const useDeleteCategory = () =>
  useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: deleteCategory,
  });

//////////////////////   BRAND SECTION ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////
// GET BRAND
export const useGetBrand = (options = {}) =>
  useQuery({
    queryKey: ["getBrand"],
    queryFn: getBrand,
    ...options,
  });
// ADD BRAND
export const usePostBrand = () =>
  useMutation({
    mutationKey: ["addBrand"],
    mutationFn: addBrand,
  });
// EDIT BRAND
export const useEditBrand = () =>
  useMutation({
    mutationKey: ["editBrand"],
    mutationFn: editBrand,
  });

// CHANGE BRAND ORDER
export const useEditBrandOrder = () =>
  useMutation({
    mutationKey: ["brandOrder"],
    mutationFn: editBrandOrder,
  });
// DELETE BRAND
export const useDeleteBrand = () =>
  useMutation({
    mutationKey: ["deleteBrand"],
    mutationFn: deleteBrand,
  });
//////////////////////   COLOR SECTION ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////
// GET COLOR
export const useGetColor = (options = {}) =>
  useQuery({
    queryKey: ["getColor"],
    queryFn: getColors,
    ...options,
  });
// ADD COLOR
export const useAddColor = () =>
  useMutation({
    mutationKey: ["addColor"],
    mutationFn: addColor,
  });
// EDIT COLOR
export const useEditColor = () =>
  useMutation({
    mutationKey: ["editColor"],
    mutationFn: editColor,
  });
// ACTIVE COLOR
export const useActiveColor = () =>
  useMutation({
    mutationKey: ["activeColor"],
    mutationFn: activeColor,
  });
//////////////////////   SIZE SECTION ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////
// GET SIZE
export const useGetSizes = () =>
  useQuery({
    queryKey: ["getSizes"],
    queryFn: getSizes,
  });
// ADD SIZE
export const useAddSize = () =>
  useMutation({
    mutationKey: ["addSize"],
    mutationFn: addSize,
  });
// EDIT SIZE
export const useEditSize = () =>
  useMutation({
    mutationKey: ["editSize"],
    mutationFn: editSizee,
  });

// ACTIVE SIZE
export const useActiveSize = () =>
  useMutation({
    mutationKey: ["activeSize"],
    mutationFn: activeSize,
  });

//////////////////////   BANNER SECTION ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////
// ADD BANNER
export const useAddBanner = () =>
  useMutation({
    mutationKey: ["addBanner"],
    mutationFn: addBanner,
  });
// GET BANNER
export const useGetBanner = () =>
  useQuery({
    queryKey: ["getBanners"],
    queryFn: getBanner,
    select: (data) => {
      if (data.length === 0) return BANNER_INITIAL_VALUE;
      const response = data[0];
      // Check if each branding data exists and isn't an empty string
      const desktop =
        response.WebBrandingData && response.WebBrandingData !== ""
          ? transformImageUrls(JSON.parse(response.WebBrandingData))
          : BANNER_INITIAL_VALUE.desktop;

      const tab =
        response.TabBrandingData && response.TabBrandingData !== ""
          ? transformImageUrls(JSON.parse(response.TabBrandingData))
          : BANNER_INITIAL_VALUE.tab;

      const mobile =
        response.MobileBrandingData && response.MobileBrandingData !== ""
          ? transformImageUrls(JSON.parse(response.MobileBrandingData))
          : BANNER_INITIAL_VALUE.mobile;
      return { desktop, tab, mobile };
    },
  });
// EDIT BANNER
export const useEditBanner = () =>
  useMutation({
    mutationKey: ["editBanner"],
    mutationFn: editBanner,
  });

//////////////////////   PRODUCT SECTION ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////
// GET PRODUCTS
export const useGetProducts = (paginationParams = {}) => {
  return useQuery({
    queryKey: ["getProducts", paginationParams],
    queryFn: () => getProducts(paginationParams),
    select: (data) => ({
      products: data.data.map((item) => ({
        ...item,
        images: JSON.parse(item.images),
      })),
      totalCount: data.filterTotalCount || data.data.length,
      totalPages: Math.ceil(data?.filterTotalCount / paginationParams.pageSize),
    }),
  });
};
// ADD PRODUCT
export const useAddProducts = () =>
  useMutation({
    mutationKey: ["addProduct"],
    mutationFn: addProduct,
  });
// EDIT PRODUCT
export const useEditProduct = () =>
  useMutation({
    mutationKey: ["editProduct"],
    mutationFn: editProduct,
  });
// ACTIVE PRODUCT
export const useActiveProduct = () =>
  useMutation({
    mutationKey: ["activeProduct"],
    mutationFn: (productId) => activeProduct({ productId }),
  });

//////////////////////   ORDER SECTION ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////

// GET ORDERES
export const useGetOrders = (paginationParams = {}) => {
  return useQuery({
    queryKey: ["getOrderes", paginationParams],
    queryFn: () => getOrderes(paginationParams),
    select: (data) => ({
      orders: data.data,
      totalCount: data.totalCount,
      totalPages: Math.ceil(data?.totalCount / paginationParams.pageSize),
    }),
  });
};

// EIDT ORDER STATUS
export const useEditOrderStatus = () =>
  useMutation({
    mutationKey: ["editOrderStatus"],
    mutationFn: (product) => editOrderStatus(product),
  });

//////////////////////   DASHBOARD SECTION ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////

export const useGetMetrics = (dateRange) =>
  useQuery({
    queryKey: ["getMetrics", dateRange],
    queryFn: () => getMetrics(dateRange),
    select: (data) => data.data.data,
  });

export const useGetSellingProducts = (dateRange) =>
  useQuery({
    queryKey: ["getSellingProducts", dateRange],
    queryFn: () => getSellingProducts(dateRange),
    select: (data) => data.data,
  });

export const useGetRecentOrders = (dateRange) =>
  useQuery({
    queryKey: ["getRecentOrders", dateRange],
    queryFn: () => getRecentOrders(dateRange),
    select: (data) => data.data.data,
  });

export const useGetTopCustomers = (dateRange) =>
  useQuery({
    queryKey: ["getTopCustomers", dateRange],
    queryFn: () => getTopCustomers(dateRange),
    select: (data) => data.data.data,
  });

export const useGetSummeryChart = (dateRange) =>
  useQuery({
    queryKey: ["getSummeryChart", dateRange],
    queryFn: () => getSummeryChart(dateRange),
    select: (data) => data.data?.data,
  });

//////////////////////   ADVERTISEMENT SECTION ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////

export const useAddAdvertisement = () =>
  useMutation({
    mutationKey: ["addAdvertisement"],
    mutationFn: (advertisementDetails) =>
      addAdvertisement(advertisementDetails),
  });

export const useGetAdvertisement = () =>
  useQuery({
    queryKey: ["getAdvertisement"],
    queryFn: () => getAdvertisement(),
    select: (data) => JSON.parse(data.data?.[0]?.AdsData),
  });
