import { useMutation, useQuery } from "@tanstack/react-query";
import API from "../httpService";
import {
  ADMIN_LOGIN,
  DELETE_BRAND,
  DELETE_CATEGORY,
  GET_BANNER,
  GET_BRAND,
  GET_CATEGORY,
  GET_COLOR,
  GET_SIZE,
  IMAGE_DELETE_ENDPOINT,
  IMAGE_UPLOAD_ENDPOINT,
  POST_BANNER,
  POST_BRAND,
  POST_CATEGORY,
  POST_COLOR,
  POST_SIZE,
  PUT_BANNER,
  PUT_BRAND,
  PUT_CATEGORY,
  PUT_COLOR,
  PUT_COLOR_ACITVE,
  PUT_SIZE,
  PUT_SIZE_ACTIVE,
} from "./endpoint";
import axios from "axios";
import { transformImageUrls } from "../../util/transformImageUrls";
import { BANNER_INITIAL_VALUE } from "../../constant/admin";

//////////////////////   IMAGEG UPLOAD AND DELETE ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////
// Image upload hook
export const useImageUpload = () =>
  useMutation({
    mutationKey: ["uploadImage"],
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("imageFiles", file);
      const response = await axios.post(IMAGE_UPLOAD_ENDPOINT, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          clientID: import.meta.env.VITE_CLIENT_ID,
          Token: import.meta.env.VITE_UPLOAD_TOKNE,
          imageClassification: "dtac",
        },
      });
      return response.data;
    },
  });
// Image DELETE hook
export const useImageDelete = () =>
  useMutation({
    mutationKey: ["deleteImage"],
    mutationFn: async (url) => {
      // Extract the filename from the URL
      const urlParts = url.split("/");
      const filename = urlParts[urlParts.length - 1];
      const thumbFilename = `thumb_${filename}`;
      // Create the request payload
      const payload = {
        fileNames: [filename, thumbFilename],
      };
      const response = await axios.delete(IMAGE_DELETE_ENDPOINT, {
        headers: {
          Token: import.meta.env.VITE_UPLOAD_TOKNE,
          clientID: import.meta.env.VITE_CLIENT_ID,
          imageClassification: "dtac",
          "Content-Type": "application/json",
        },
        data: payload,
      });

      return response.data;
    },
  });

// Admin login
export const useAdminLogin = () =>
  useMutation({
    mutationKey: ["adminLogin"],
    mutationFn: (credential) =>
      API.get(ADMIN_LOGIN, {
        headers: {
          email: credential.username,
          Password: credential.password,
        },
      }).then((res) => res.data),
  });
//////////////////////   CATEGORY SECTION ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////
// Get all category
export const useGetAllCategory = () =>
  useQuery({
    queryKey: ["allCategory"],
    queryFn: () => API.get(GET_CATEGORY).then((res) => res.data.data),
  });
// post category
export const usePostCategory = () =>
  useMutation({
    mutationKey: ["postCategory"],
    mutationFn: (category) =>
      API.post(POST_CATEGORY, {
        categoryName: category.name,
        categoryDescription: category.description,
        parentCategoryId: 0,
        imageUrl: category.imageUrl,
      }).then((res) => res.data),
  });
// put category
export const usePutCategory = () =>
  useMutation({
    mutationKey: ["putCategory"],
    mutationFn: ({ category, categoryId }) =>
      API.put(
        PUT_CATEGORY,
        [
          {
            categoryName: category.name,
            categoryDescription: category.description,
            parentCategoryId: category.parentId,
            imageUrl: category.imageUrl,
          },
        ],
        {
          headers: {
            categoryID: categoryId,
            bulkUpdate: false,
          },
        }
      ),
  });
// put category order
export const usePutCategoryOrder = () =>
  useMutation({
    mutationKey: ["categoryOrder"],
    mutationFn: (category) =>
      API.put(PUT_CATEGORY, category, {
        headers: {
          bulkUpdate: true,
        },
      }),
  });
// delete category
export const useDeleteCategory = () =>
  useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: async (categoryId) => {
      try {
        const response = await API.delete(DELETE_CATEGORY, {
          headers: {
            categoryID: categoryId,
          },
        });
        return response.data;
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to delete category";

        const enhancedError = new Error(errorMessage);
        enhancedError.originalError = error;
        throw enhancedError;
      }
    },
  });

//////////////////////   BRAND SECTION ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////
// get brand
export const useGetBrand = () =>
  useQuery({
    queryKey: ["getBrand"],
    queryFn: () => API.get(GET_BRAND).then((res) => res.data.data),
  });
// add BRAND
export const usePostBrand = () =>
  useMutation({
    mutationKey: ["addBrand"],
    mutationFn: (newBrand) =>
      API.post(POST_BRAND, newBrand).then((res) => res.data),
  });
// edit BRAND
export const useEditBrand = () =>
  useMutation({
    mutationKey: ["editBrand"],
    mutationFn: ({ updatedBrand, brandId }) =>
      API.put(PUT_BRAND, updatedBrand, {
        headers: {
          brandID: brandId,
        },
      }).then((res) => res.data),
  });

// change BRAND order
export const useEditBrandOrder = () =>
  useMutation({
    mutationKey: ["brandOrder"],
    mutationFn: (brand) =>
      API.put(PUT_BRAND, brand, {
        headers: {
          bulkUpdate: true,
        },
      }),
  });
// delete brand
export const useDeleteBrand = () =>
  useMutation({
    mutationKey: ["deleteBrand"],
    mutationFn: async (brandId) => {
      try {
        const response = await API.delete(DELETE_BRAND, {
          headers: {
            brandID: brandId,
          },
        });
        return response.data;
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to delete brand";

        const enhancedError = new Error(errorMessage);
        enhancedError.originalError = error;
        throw enhancedError;
      }
    },
  });
//////////////////////   COLOR SECTION ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////
// get color
export const useGetColor = () =>
  useQuery({
    queryKey: ["getColor"],
    queryFn: () => API.get(GET_COLOR).then((res) => res.data.data),
  });
// add color
export const useAddColor = () =>
  useMutation({
    mutationKey: ["addColor"],
    mutationFn: (color) =>
      API.post(POST_COLOR, {
        colors: [{ colorName: color.ColorName, hexCode: color.HexCode }],
      }).then((res) => res.data),
  });
// edit color
export const useEditColor = () =>
  useMutation({
    mutationKey: ["editColor"],
    mutationFn: ({ updatedColor, colorId }) =>
      API.put(
        PUT_COLOR,
        {
          colorName: updatedColor.ColorName,
          hexCode: updatedColor.HexCode,
        },
        {
          headers: {
            ColorId: colorId,
            isActive: String(updatedColor.isActive),
          },
        }
      ).then((res) => res.data),
  });
// active color
export const useActiveColor = () =>
  useMutation({
    mutationKey: ["activeColor"],
    mutationFn: (active, colorId) =>
      API.put(
        PUT_COLOR_ACITVE,
        {},
        {
          headers: {
            ColorId: colorId,
            IsActive: active,
          },
        }
      ).then((res) => res.data),
  });
//////////////////////   SIZE SECTION ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////
// get size
export const useGetSizes = () =>
  useQuery({
    queryKey: ["getSizes"],
    queryFn: () => API.get(GET_SIZE).then((res) => res.data.data),
  });
// add size
export const useAddSize = () =>
  useMutation({
    mutationKey: ["addSize"],
    mutationFn: (size) =>
      API.post(
        POST_SIZE,
        {},
        {
          headers: {
            sizeLabel: size.sizeLable,
          },
        }
      ).then((res) => res.data),
  });
// edit size
export const useEditSize = () =>
  useMutation({
    mutationKey: ["editSize"],
    mutationFn: ({ updatedSize, sizeId }) =>
      API.put(
        PUT_SIZE,
        {},
        {
          headers: {
            SizeId: sizeId,
            sizeLabel: updatedSize.sizeLable,
            isActive: updatedSize.isActive,
          },
        }
      ).then((res) => res.data),
  });
// active size
export const useActiveSize = () =>
  useMutation({
    mutationKey: ["activeSize"],
    mutationFn: (active, sizeId) =>
      API.put(
        PUT_SIZE_ACTIVE,
        {},
        {
          headers: {
            SizeId: sizeId,
            IsActive: active,
          },
        }
      ).then((res) => res.data),
  });

//////////////////////   BANNER SECTION ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////
// add BANNER
export const useAddBanner = () =>
  useMutation({
    mutationKey: ["addBanner"],
    mutationFn: (bannerDetails) =>
      API.post(POST_BANNER, { ...bannerDetails, settings: "" }).then(
        (res) => res.data
      ),
  });
// get BANNER
export const useGetBanner = () =>
  useQuery({
    queryKey: ["getBanners"],
    queryFn: () => API.get(GET_BANNER).then((res) => res.data.data),
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
// put BANNER
export const useEditBanner = () =>
  useMutation({
    mutationKey: ["editBanner"],
    mutationFn: (updatedBanners) =>
      API.put(PUT_BANNER, updatedBanners).then((res) => res.data),
  });
