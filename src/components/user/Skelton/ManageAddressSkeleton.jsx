import React from "react";

const ManageAddressSkeleton = () => {
  return (
    <div>
      {/* Skeleton Header */}
      <div className="text-black font-bold text-xl mb-3 md:mb-8 md:pt-5">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Skeleton Address Cards */}
      {[1, 2, 3].map((index) => (
        <div key={index} className="mb-4 flex flex-col md:flex-row">
          {/* Skeleton Address Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 flex-1">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div className="flex items-center mb-2 md:mb-0">
                <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse mr-3"></div>
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            <div className="space-y-3">
              {/* Name */}
              <div className="flex items-center">
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse mr-2"></div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Phone */}
              <div className="flex items-center">
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse mr-2"></div>
                <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Address */}
              <div className="flex items-start">
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse mr-2 mt-0.5"></div>
                <div className="flex-1">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>

              {/* City and Landmark */}
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="flex items-center mb-2 md:mb-0">
                  <div className="h-4 w-4 bg-gray-200 rounded animate-pulse mr-2"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-4 bg-gray-200 rounded animate-pulse mr-2"></div>
                  <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <div className="mt-4 flex justify-end">
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Skeleton Radio Button */}
          <div className="flex items-center mt-2 md:mt-0 md:ml-4">
            <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="ml-2 h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      ))}

      {/* Skeleton Add Address Button */}
      <div className="mt-5">
        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default ManageAddressSkeleton;
