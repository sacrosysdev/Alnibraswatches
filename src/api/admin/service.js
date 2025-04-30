import axios from "axios";
import {
  ADMIN_LOGIN,
  DELETE_BRAND,
  DELETE_CATEGORY,
  EDIT_PRODUCT,
  GET_BANNER,
  GET_BRAND,
  GET_CATEGORY,
  GET_COLOR,
  GET_PRODUCTS,
  GET_SIZE,
  IMAGE_DELETE_ENDPOINT,
  IMAGE_UPLOAD_ENDPOINT,
  POST_BANNER,
  POST_BRAND,
  POST_CATEGORY,
  POST_COLOR,
  POST_PRODUCT,
  POST_SIZE,
  PUT_BANNER,
  PUT_BRAND,
  PUT_CATEGORY,
  PUT_COLOR,
  PUT_COLOR_ACITVE,
  PUT_SIZE,
  PUT_SIZE_ACTIVE,
} from "./endpoint";
import API from "../httpService";

//////////////////////   IMAGEG UPLOAD AND DELETE ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////

export const uploadImage = async (file) => {
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
};

export const deleteImage = async (url) => {
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
};

//////////////////////   ADMIN AUTH ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////

export const adminLogin = (credential) =>
  API.post(ADMIN_LOGIN, {
    email: credential.username,
    Password: credential.password,
  }).then((res) => res.data);

//////////////////////   CATEGORY SECTION ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////

export const getCategory = () =>
  API.get(GET_CATEGORY).then((res) => res.data.data);

export const addCategory = (category) =>
  API.post(POST_CATEGORY, {
    categoryName: category.name,
    categoryDescription: category.description,
    parentCategoryId: 0,
    imageUrl: category.imageUrl,
  }).then((res) => res.data);

export const editCategory = ({ category, categoryId }) =>
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
  );

export const editCategoryOrder = (category) =>
  API.put(PUT_CATEGORY, category, {
    headers: {
      bulkUpdate: true,
    },
  });

export const deleteCategory = async (categoryId) => {
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
};

//////////////////////   BRAND SECTION ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////

export const getBrand = () => API.get(GET_BRAND).then((res) => res.data.data);

export const addBrand = (newBrand) =>
  API.post(POST_BRAND, newBrand).then((res) => res.data);

export const editBrand = ({ updatedBrand, brandId }) =>
  API.put(PUT_BRAND, updatedBrand, {
    headers: {
      brandID: brandId,
    },
  }).then((res) => res.data);

export const editBrandOrder = (brand) =>
  API.put(PUT_BRAND, brand, {
    headers: {
      bulkUpdate: true,
    },
  });

export const deleteBrand = async (brandId) => {
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
};

//////////////////////   COLOR SECTION ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////

export const getColors = () => API.get(GET_COLOR).then((res) => res.data.data);

export const addColor = (color) =>
  API.post(POST_COLOR, {
    colors: [{ colorName: color.ColorName, hexCode: color.HexCode }],
  }).then((res) => res.data);

export const editColor = ({ updatedColor, colorId }) =>
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
  ).then((res) => res.data);

export const activeColor = (active, colorId) =>
  API.put(
    PUT_COLOR_ACITVE,
    {},
    {
      headers: {
        ColorId: colorId,
        IsActive: active,
      },
    }
  ).then((res) => res.data);

//////////////////////   SIZE SECTION ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////

export const getSizes = () => API.get(GET_SIZE).then((res) => res.data.data);

export const addSize = (size) =>
  API.post(
    POST_SIZE,
    {},
    {
      headers: {
        sizeLabel: size.sizeLable,
      },
    }
  ).then((res) => res.data);

export const editSizee = ({ updatedSize, sizeId }) =>
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
  ).then((res) => res.data);

export const activeSize = (active, sizeId) =>
  API.put(
    PUT_SIZE_ACTIVE,
    {},
    {
      headers: {
        SizeId: sizeId,
        IsActive: active,
      },
    }
  ).then((res) => res.data);

//////////////////////   BANNER SECTION ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////

export const addBanner = (bannerDetails) =>
  API.post(POST_BANNER, { ...bannerDetails, settings: "" }).then(
    (res) => res.data
  );

export const getBanner = () => API.get(GET_BANNER).then((res) => res.data.data);

export const editBanner = (updatedBanners) =>
  API.put(PUT_BANNER, updatedBanners).then((res) => res.data);

//////////////////////   PRODUCT SECTION ⚠️⚠️⚠️⚠️⚠️⚠️   ////////////////////////////

export const getProducts = ({ page = 1, pageSize = 10 }) =>
  API.get(GET_PRODUCTS, {
    headers: { page: page, pageSize: pageSize },
  }).then((res) => res.data.data);

export const addProduct = (productDetails) =>
  API.post(POST_PRODUCT, productDetails).then((res) => res.data);

export const editProduct = ({ updatedProduct, productId }) =>
  API.put(EDIT_PRODUCT, updatedProduct, {
    headers: {
      productID: productId,
    },
  });
