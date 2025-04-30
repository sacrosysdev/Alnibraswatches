import React from "react";
import Header from "./Header";
import CheckOutForm from "./CheckOutForm";
import PaymentSection from "./PaymentSection";
import PlaceOrder from "./PlaceOrder";
import { Formik, Form } from "formik";
import { checkOutValidation } from "../../../constant/schema";
import Address from "./Address";
import { useGetSelectedAddress } from '../../../api/user/hooks'

const Checkout = () => {
  const { data: address, isLoading: loadingAddress } = useGetSelectedAddress();
  if (loadingAddress || !address) {
     return <div>Loading...</div>;
   }
   let parsedDetails = {};
   try {
     parsedDetails = JSON.parse(address.AddressDetails);
   } catch (err) {
     console.error("Error parsing address:", err);
     return <div>Invalid address format</div>;
   }
  const initialValues = {
    fullName: "",
    phone: "",
    pincode: "",
    houseNo: "",
    roadName: "",
    city: "",
    state: "",
    landmark: "",
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      console.log(values);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={checkOutValidation}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="w-full py-20">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start mx-auto px-5 md:w-[80%]">
            <div className="col-span-1 xl:col-span-2">
              <Header />
              <Address label={parsedDetails.AddressLabel} 
                        phone={parsedDetails.PhoneNumber} 
                        address={parsedDetails.Address}
                        district={parsedDetails.District}
                        userName={parsedDetails.UserName}
                        city={parsedDetails.City}/>
              {/* <CheckOutForm /> */}
              <PaymentSection /> 
            </div>
            <div className="col-span-1 border w-full rounded-2xl border-[#A5B2BA]">
              <PlaceOrder />
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default Checkout;
