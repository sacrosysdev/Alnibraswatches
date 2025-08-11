import React from "react";

const MyOrdersSkeleton = () => {
  return (
    <div className="bg-white rounded-lg md:p-6">
      {/* Skeleton Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div>
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Skeleton Order Cards */}
      <div className="grid grid-cols-1 gap-6">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            {/* Skeleton Order Header */}
            <div className="p-4 md:p-6 flex flex-col md:flex-row justify-between border-b border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4 md:mb-0">
                <div>
                  <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="md:ml-6">
                  <div className="h-3 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-5 w-28 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="md:ml-6">
                  <div className="h-3 w-12 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div>
                  <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div>
                  <div className="h-3 w-12 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Skeleton Products */}
            <div className="bg-gray-50 p-4 md:p-6">
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-3"></div>
              <div className="space-y-4">
                {[1, 2].map((productIndex) => (
                  <div
                    key={productIndex}
                    className="bg-white rounded-md p-4 border border-gray-200"
                  >
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="h-24 w-24 mr-3 rounded-md bg-gray-200 animate-pulse"></div>
                      <div className="flex-1 mb-3 md:mb-0">
                        <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mb-2"></div>
                        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="flex flex-wrap gap-6 md:gap-8">
                        <div className="flex flex-col items-center">
                          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mb-1"></div>
                          <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="h-3 w-20 bg-gray-200 rounded animate-pulse mb-1"></div>
                          <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mb-1"></div>
                          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrdersSkeleton;
