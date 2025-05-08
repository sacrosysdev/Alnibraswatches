import React from "react";

const PersonalInfo = () => {
  const userDet = JSON.parse(localStorage.getItem("alNibrazuserDet"));
  return (
    <div>
      <div className="bg-yellow-400 mt-10 p-2 ">PersonalInfo</div>
      <div className="max-w-md  bg-white shadow-md rounded-xl p-6 border border-gray-200 mt-5">
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-500">Name</label>
            <p className="text-gray-800 font-medium">{userDet[0].name}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Mobile</label>
            <p className="text-gray-800 font-medium">{userDet[0].phone}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <p className="text-gray-800 font-medium">{userDet[0].email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
