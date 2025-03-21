import * as Yup from 'yup';

export const checkOutValidation = Yup.object({
    fullName:Yup.string().required("Full Name is required"),
    phone:Yup.string().required("Phone number is Required"),
    pincode: Yup.string().required('Pincode is required'),
    houseNo: Yup.string().required('House Number is required'),
    roadName: Yup.string().required('Road Name is required'),
    state:Yup.string().required('City is required'),
    landmark:Yup.string().required('Landmark is required'),
});