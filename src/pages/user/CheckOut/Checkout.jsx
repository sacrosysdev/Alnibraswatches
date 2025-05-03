import React, { useState } from "react";
import { Formik, Form } from "formik";
import { checkOutValidation } from "../../../constant/schema";
import { useGetSelectedAddress } from '../../../api/user/hooks';
import { useAddAddress } from "../../../api/user/hooks";
import { useLocation } from "react-router-dom";
// Components
import Header from "./Header";
import CheckOutForm from "./CheckOutForm";
import PaymentSection from "./PaymentSection";
import PlaceOrder from "./PlaceOrder";
import Address from "./Address";

const Checkout = () => {
  const [showModal, setShowModal] = useState(false);
  const addAddressMutation = useAddAddress();
  const handleAddAddressClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const location = useLocation()
  const {
    data: address,
    isLoading: loadingAddress,
    refetch: refetchAddress
  } = useGetSelectedAddress(location.state);
 
  
  const initialValues = {
    fullName: "",
    phone: "+971 ",
    pincode: "",
    addres: "", 
    street: "",
    state: "",
    landmark: "",
    addressType:"Home",
    makeDefault: false
  };

  // Handle form submission
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
     try {
      await addAddressMutation.mutateAsync(values);
      await refetchAddress();
      setShowModal(false);
      resetForm();
      
    } catch (error) {
      console.error("Error saving address:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Loading state with address form modal
  if (loadingAddress || !address) {
    return (
      <div className="w-full py-20">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start mx-auto px-5 md:w-[80%]">
          <div className="col-span-1 xl:col-span-2">
            <Header />
            <button
              className="bg-black text-white text-sm px-3 py-1 mt-5
                         rounded hover:bg-gray-800 transition cursor-pointer"
              onClick={handleAddAddressClick}
            >
              Add Address
            </button>
            <PaymentSection />
          </div>
          <div className="col-span-1 border w-full rounded-2xl border-[#A5B2BA]">
            <PlaceOrder />
          </div>
        </div>

        {/* Address Modal */}
        {showModal && (
          <AddressModal
            initialValues={initialValues}
            onSubmit={onSubmit}
            handleCloseModal={handleCloseModal}
          />
        )}
      </div>
    );
  }

  // Parse the address after loading
  let parsedDetails = {};
  try {
    parsedDetails = JSON.parse(address.AddressDetails);

  } catch (err) {
    // console.error("Error parsing address:", err);
    return <div>Invalid address format</div>;
  }

  // Main checkout view with selected address
  return (
    <div className="w-full py-20">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start mx-auto px-5 md:w-[80%]">
        <div className="col-span-1 xl:col-span-2">
          <Header />
          <div className="flex justify-between items-center mt-4 mb-4">
            <h2 className="text-lg font-semibold">Delivery Address</h2>
          
          </div>
          <Address
            label={parsedDetails.AddressLabel}
            phone={parsedDetails.PhoneNumber}
            address={parsedDetails.Address}
            district={parsedDetails.District}
            userName={parsedDetails.UserName}
            city={parsedDetails.City}
            landmark={parsedDetails.LandMark}
          />
          <PaymentSection />
        </div>
        <div className="col-span-1 border w-full rounded-2xl border-[#A5B2BA]">
          <PlaceOrder />
        </div>
      </div>

      {/* Address Modal - also available in the main view for changing address */}
      {showModal && (
        <AddressModal
          initialValues={initialValues}
          onSubmit={onSubmit}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

// Extracted AddressModal component to avoid duplication
const AddressModal = ({ initialValues, onSubmit, handleCloseModal }) => {
  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-xs bg-black/30"
      onClick={handleCloseModal}
    >
      <div
        className="bg-white p-6 rounded-xl w-full max-w-2xl relative overflow-y-auto max-h-[90vh] shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleCloseModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
          aria-label="Close modal"
        >
          &times;
        </button>
      
        <Formik
          initialValues={initialValues}
          validationSchema={checkOutValidation}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <CheckOutForm />
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 text-sm rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-black text-white text-sm rounded hover:bg-gray-800 disabled:bg-gray-400"
                >
                  {isSubmitting ? "Saving..." : "Save Address"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Checkout;