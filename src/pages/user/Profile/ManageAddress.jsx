// ManageAddress.jsx
import React, { useState, useEffect } from "react";
import Address from "../CheckOut/Address";
import {
  useGetUserAddress,
  useUpdateDefaultAddress,
  useAddAddress,
  useUpdateAddress,
} from "../../../api/user/hooks";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import CheckOutForm from "../CheckOut/CheckOutForm";
import { checkOutValidation } from "../../../constant/schema";
import { toast } from "react-toastify";
import ManageAddressSkeleton from "../../../components/user/Skelton/ManageAddressSkeleton";

const ManageAddress = () => {
  const { data, isLoading: loadingAddress } = useGetUserAddress();
  const [showModal, setShowModal] = useState(false);
  const addresses = Array.isArray(data) ? data : [];
  const [defaultAddressId, setDefaultAddressId] = useState(null);
  const { mutate: updateDefault, isPending: updatingDefault } =
    useUpdateDefaultAddress();
  const navigate = useNavigate();
  const addAddressMutation = useAddAddress();
  const updateAddressMutation = useUpdateAddress(); // Use the update address hook
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);

  useEffect(() => {
    if (addresses && addresses.length > 0) {
      const initialDefault = addresses.find((addr) => addr.IsDefault);
      if (initialDefault) {
        setDefaultAddressId(initialDefault.AddressId);
      } else if (addresses.length > 0) {
        setDefaultAddressId(addresses[addresses.length - 1].AddressId);
      }
    }
  }, [addresses]);

  const selectedDefaultId =
    defaultAddressId ||
    (addresses.length > 0 ? addresses[addresses.length - 1].AddressId : null);

  const handleDefaultChange = (addressId) => {
    setDefaultAddressId(addressId);
    updateDefault(
      { AddressId: addressId, IsDefault: true },
      {
        onSuccess: () => {
          navigate("/checkout");
          toast.success("Default address updated successfully");
        },
        onError: (error) => {
          toast.error("Failed to update default address");
          console.error("Update failed:", error);
        },
      }
    );
  };

  if (loadingAddress) {
    return <ManageAddressSkeleton />;
  }

  if (!addresses || addresses.length === 0) {
    return <div>No addresses found. Please add an address.</div>;
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentAddress(null);
  };

  const handleAddAddressClick = () => {
    setIsEditing(false);
    setCurrentAddress(null);
    setShowModal(true);
  };

  const initialValues = {
    fullName: "",
    phone: "+971 ",
    pincode: "",
    addres: "",
    street: "",
    state: "",
    landmark: "",
    addressType: "Home",
    makeDefault: false,
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (isEditing && currentAddress) {
        const editData = {
          ...values,
          addressId: currentAddress.AddressId,
        };
        // Update existing address
        await updateAddressMutation.mutateAsync(editData);
        toast.success("Address updated successfully");
      } else {
        // Add new address - use the existing add address API
        await addAddressMutation.mutateAsync(values);
        navigate("/checkout", { state: { status: true } });
      }

      setShowModal(false);
      resetForm();
    } catch (error) {
      toast.error(
        isEditing ? "Failed to update address" : "Failed to add address"
      );
      console.error(
        isEditing ? "Error updating address:" : "Error saving address:",
        error
      );
    } finally {
      setSubmitting(false);
    }
  };

  // When a user clicks Edit, collect form values but don't show modal here
  const collectEditValues = (addressId) => {
    const addressToEdit = addresses.find(
      (addr) => addr.AddressId === addressId
    );
    if (addressToEdit) {
      try {
        const parsedDetails = JSON.parse(addressToEdit.AddressDetails);
        // Set the form values from the existing address
        return {
          fullName: parsedDetails.UserName || "",
          phone: parsedDetails.PhoneNumber || "+971 ",
          pincode: parsedDetails.PinCode || "",
          addres: parsedDetails.Address || "",
          street: parsedDetails.District || parsedDetails.Street || "",
          state: parsedDetails.City || "",
          landmark: parsedDetails.LandMark || "",
          addressType: parsedDetails.AddressLabel || "Home",
          makeDefault: addressToEdit.IsDefault || false,
        };
      } catch (error) {
        console.error("Error parsing address details:", error);
        toast.error("Could not edit this address. Invalid format.");
      }
    }
    return initialValues;
  };

  // Separate the editing action from collecting values to avoid re-render loops
  const handleEditClick = (addressId) => {
    const addressToEdit = addresses.find(
      (addr) => addr.AddressId === addressId
    );
    if (addressToEdit) {
      setIsEditing(true);
      setCurrentAddress(addressToEdit);
      setShowModal(true);
    }
  };

  return (
    <div>
      <div className="text-black font-bold text-xl mb-3 md:mb-8 md:pt-5">
        Manage Address
      </div>
      {addresses.map((item) => {
        let parsedDetails = {};
        try {
          parsedDetails = JSON.parse(item.AddressDetails);
        } catch (error) {
          console.error("Invalid AddressDetails JSON:", error);
          return null;
        }
        return (
          <div key={item.AddressId} className="mb-4 flex flex-col md:flex-row">
            <Address
              label={parsedDetails.AddressLabel}
              phone={parsedDetails.PhoneNumber}
              address={parsedDetails.Address}
              district={parsedDetails.District}
              userName={parsedDetails.UserName}
              landmark={parsedDetails.LandMark}
              city={parsedDetails.City}
              onEditClick={() => handleEditClick(item.AddressId)}
              isDefault={selectedDefaultId === item.AddressId}
            />
            <div className="flex items-center mt-2 md:mt-0 md:ml-4">
              <input
                type="radio"
                name="defaultAddress"
                checked={selectedDefaultId === item.AddressId}
                onChange={() => handleDefaultChange(item.AddressId)}
                className="accent-teal-600"
              />
              <label className="ml-2 text-sm font-medium text-gray-700">
                {selectedDefaultId === item.AddressId
                  ? "Default"
                  : "Change as Default"}
              </label>
            </div>
          </div>
        );
      })}
      <button
        className="bg-black text-white text-sm px-4 py-2 mt-5
                         rounded hover:bg-gray-800 transition cursor-pointer"
        onClick={handleAddAddressClick}
      >
        Add Address
      </button>
      {showModal && (
        <AddressModal
          initialValues={
            isEditing && currentAddress
              ? collectEditValues(currentAddress.AddressId)
              : initialValues
          }
          onSubmit={onSubmit}
          handleCloseModal={handleCloseModal}
          isEditing={isEditing}
          addressId={
            isEditing && currentAddress ? currentAddress.AddressId : null
          }
        />
      )}
    </div>
  );
};
// Extracted AddressModal component to avoid duplication
const AddressModal = ({
  initialValues,
  onSubmit,
  handleCloseModal,
  isEditing,
  addressId,
}) => {
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
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl cursor-pointer"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Edit Address" : "Add New Address"}
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={checkOutValidation}
          onSubmit={(values, formikBag) => {
            // If editing, include the address ID in the values
            if (isEditing && addressId) {
              // We pass the addressId to onSubmit via the formikBag
              onSubmit({ ...values, addressId }, formikBag);
            } else {
              onSubmit(values, formikBag);
            }
          }}
          enableReinitialize={true}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <CheckOutForm />

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 text-sm rounded hover:bg-gray-400 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-black text-white text-sm rounded hover:bg-gray-800 disabled:bg-gray-400"
                >
                  {isSubmitting
                    ? "Saving..."
                    : isEditing
                    ? "Update Address"
                    : "Save Address"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ManageAddress;
