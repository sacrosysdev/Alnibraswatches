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
  landmark: Yup.string().required("Landmark is required"),
});
