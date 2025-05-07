function CheckoutShimmer() {
  return (
    <div className="w-full py-20 px-5 md:w-[80%] mx-auto">
      <div className="animate-pulse">
        {/* Header shimmer */}
        <div className="h-8 bg-gray-200 rounded-md w-1/4 mb-6"></div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
          <div className="col-span-1 xl:col-span-2">
            {/* Address section shimmer */}
            <div className="mb-6">
              <div className="h-6 bg-gray-200 rounded-md w-1/3 mb-4"></div>
              <div className="h-32 bg-gray-200 rounded-lg w-full"></div>
            </div>

            {/* Payment section shimmer */}
            <div className="mt-8">
              <div className="h-6 bg-gray-200 rounded-md w-1/3 mb-4"></div>
              <div className="h-64 bg-gray-200 rounded-lg w-full"></div>
            </div>
          </div>

          {/* Order summary shimmer */}
          <div className="col-span-1 border rounded-2xl border-gray-200 p-5">
            <div className="h-6 bg-gray-200 rounded-md w-2/3 mb-6"></div>
            <div className="flex justify-between mb-4">
              <div className="h-5 bg-gray-200 rounded-md w-1/3"></div>
              <div className="h-5 bg-gray-200 rounded-md w-1/5"></div>
            </div>
            <div className="h-px bg-gray-200 w-full my-4"></div>
            <div className="flex justify-between mb-4">
              <div className="h-6 bg-gray-200 rounded-md w-1/3"></div>
              <div className="h-6 bg-gray-200 rounded-md w-1/4"></div>
            </div>
            <div className="h-px bg-gray-200 w-full my-4"></div>
            <div className="h-12 bg-gray-200 rounded-lg w-full mt-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutShimmer;
