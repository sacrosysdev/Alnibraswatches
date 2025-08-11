import React from "react";
import { Field, useFormikContext } from "formik";
import { InputField } from "../../../components/user/InputField";
import { TextAreaField } from "../../../components/user/TextArea";
import SelectField from "../../../components/user/SelectField";
import { FaHome, FaBriefcase } from "react-icons/fa";

const CheckOutForm = () => {
  const { errors, touched, setFieldValue, values } = useFormikContext();
  const states = [
    "Dubai",
    "Abu Dhabi",
    "Sharjah",
    "Ajman",
    "Ras Al Khaimah",
    "Umm Al Quwain",
    "Fujairah",
  ];

  return (
    <div className="pt-1">
      <div className="py-3 flex flex-col gap-1">
        <h1 className="font-semibold text-lg">Delivery Details</h1>
        <h2 className="text-base text-[#8C9296]">
          We will deliver your order to the below address
        </h2>
      </div>
      <div className="border-t border-b border-[#E8E9EA] pt-5 pb-10 space-y-4">
        <div className="grid grid-cols-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <InputField name="fullName" placeholder="Enter your full name" />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <InputField
              name="phone"
              placeholder="+971 XXXXXXXXX"
              onKeyPress={(e) => {
                // Allow only numbers, backspace, delete, and + symbol
                const char = String.fromCharCode(e.which);
                if (!/[\d+]/.test(char) && e.which !== 8 && e.which !== 46) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                // Ensure it starts with +971 and format properly
                let value = e.target.value;
                // Remove any non-digit characters except + and space
                value = value.replace(/[^\d+\s]/g, "");

                setFieldValue("phone", value);
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pincode *
            </label>
            <InputField
              name="pincode"
              placeholder="Enter pincode (numbers only)"
              onKeyPress={(e) => {
                // Allow only numbers, backspace, delete
                const char = String.fromCharCode(e.which);
                if (!/[\d]/.test(char) && e.which !== 8 && e.which !== 46) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                // Remove any non-digit characters
                let value = e.target.value.replace(/\D/g, "");
                // Limit to 10 digits
                if (value.length > 10) {
                  value = value.substring(0, 10);
                }
                setFieldValue("pincode", value);
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-1 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address *
            </label>
            <TextAreaField
              name="addres"
              placeholder="Enter your complete address"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street *
            </label>
            <InputField name="street" placeholder="Enter street name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Emirate *
            </label>
            <SelectField
              name="state"
              optionText="Select Emirate"
              optionsData={states}
            />
          </div>
        </div>
        <div className="grid grid-cols-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Landmark (Optional)
          </label>
          <InputField name="landmark" placeholder="Enter nearby landmark" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address Type *
          </label>
          <div className="flex gap-4">
            <label
              className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition ${
                values.addressType === "Home"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              <Field
                type="radio"
                name="addressType"
                value="Home"
                className="hidden"
              />
              <FaHome
                className={`text-sm ${
                  values.addressType === "Home"
                    ? "text-blue-600"
                    : "text-gray-400"
                }`}
              />
              <span
                className={`${
                  values.addressType === "Home" ? "text-blue-600" : ""
                }`}
              >
                Home
              </span>
            </label>

            <label
              className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition ${
                values.addressType === "Work"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300"
              }`}
            >
              <Field
                type="radio"
                name="addressType"
                value="Work"
                className="hidden"
              />
              <FaBriefcase
                className={`text-sm ${
                  values.addressType === "Work"
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              />
              <span
                className={`${
                  values.addressType === "Work" ? "text-green-600" : ""
                }`}
              >
                Work
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutForm;
