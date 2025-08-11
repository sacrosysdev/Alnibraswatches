import React from "react";

const PersonalInfo = () => {
  const userDet = JSON.parse(localStorage.getItem("alNibrazuserDet")) || [];
  return (
    <div className="md:p-6">
      <h1 className=" text-lg md:text-2xl font-bold text-gray-800">
        Personal Information
      </h1>
      <div
        className="max-w-md  bg-white shadow-md
       rounded-xl  p-4 md:p-6 border border-gray-200 mt-2 md:mt-5"
      >
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-500">Name</label>
            <p className="text-gray-800 font-medium">
              {userDet[0]?.name || "N/A"}
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Mobile</label>
            <p className="text-gray-800 font-medium">
              {userDet[0]?.phone || "N/A"}
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <p className="text-gray-800 font-medium">
              {userDet[0]?.email || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
