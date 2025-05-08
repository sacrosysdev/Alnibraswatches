export const PaymentElementShimmer = () => {
  return (
    <div className="mt-4 space-y-4 animate-pulse">
      <div>
        <div className="h-5 w-32 bg-gray-200 rounded-md"></div>
        <div className="mt-2 p-4 border border-gray-200 rounded-md">
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded-md w-full"></div>
            <div className="h-10 bg-gray-200 rounded-md w-full"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-10 bg-gray-200 rounded-md"></div>
              <div className="h-10 bg-gray-200 rounded-md"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded-md w-2/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Payment method shimmer component
export const PaymentMethodShimmer = () => {
  return (
    <div className="mt-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex items-center py-3 gap-3 border-t border-[#E8E9EA] animate-pulse"
        >
          <div className="w-4 h-4 bg-gray-200 rounded-full ml-2"></div>
          <div className="flex gap-2 items-center">
            <div className="w-5 h-5 bg-gray-200 rounded-md"></div>
            <div className="h-5 w-32 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
