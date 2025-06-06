import * as Yup from "yup";

export const LoginValidation = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export const checkOutValidation = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  phone: Yup.string().required("Phone number is Required"),
  // pincode: Yup.string().required("Pincode is required"),
  addres: Yup.string().required("Address is required"),
  street: Yup.string().required("Street is required"),
  state: Yup.string().required("state is required"),
 
});

export const PRODUCT_VALIDATION = (enableVariants) =>
  Yup.object().shape({
    productName: Yup.string()
      .required("Product Name is required")
      .min(2, "Product name must be atleast 2 character")
      .max(100, "Product name must be less than 100 characters"),
    description: Yup.string()
      .required("Description is required")
      .test(
        "rich-text-validation",
        "Description must be at least 10 characters",
        (value) => {
          if (!value) return false;

          // Strip HTML tags
          const plainText = value.replace(/<[^>]+>/g, "").trim();

          return plainText.length >= 10;
        }
      ),

    categoryId: Yup.number().required("Category is required"),
    brandID: Yup.number().required("Brand is required"),

    ...(!enableVariants
      ? {
          price: Yup.number()
            .required("Price is required")
            .min(0, "Price must be greater than or equal to 0"),
        }
      : {}),
  });
