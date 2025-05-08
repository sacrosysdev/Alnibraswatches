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
      <div className="py-8 flex flex-col gap-1">
        <h1 className="font-semibold text-lg">Delivery Details</h1>
        <h2 className="text-base text-[#8C9296]">
          We will deliver your order to the below address
        </h2>
      </div>
      <div className="border-t border-b border-[#E8E9EA] pt-5 pb-10 space-y-4">
        <div className="grid grid-cols-1">
          <InputField name="fullName" placeholder="Full Name*" />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
          <div>
            <InputField name="phone" placeholder="Phone number*" />
          </div>
          <div>
            <InputField name="pincode" placeholder="Pincode*" />
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-1 gap-3">
          <div>
            <TextAreaField
              name="addres" // Fixed the typo from 'addres' to 'address'
              placeholder="Address*"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
          <div>
            <InputField name="street" placeholder="Street" />
          </div>
          <div>
            <SelectField
              name="state"
              optionText="Emirate*"
              optionsData={states}
            />
          </div>
        </div>
        <div className="grid grid-cols-1">
          <InputField name="landmark" placeholder="Landmark (optional)" />
        </div>
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
  );
};

export default CheckOutForm;
