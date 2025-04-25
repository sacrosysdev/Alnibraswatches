import React from 'react';

const ProductInfo = ({ description }) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = description;
  const listItems = Array.from(tempDiv.querySelectorAll("li"));

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold">Product details</h1>

      <div className="grid grid-cols-3 gap-x-10 text-sm">
        <div className="flex flex-col gap-2 col-span-2">
          {listItems.map((li, index) => {
            const parts = li.textContent.split(",");

            return (
              <div key={index} className="flex flex-col gap-1">
                {parts.map((part, idx) => {
                  const [label, value] = part.split(":").map((s) => s.trim());

                  return value ? (
                    <div key={idx}>
                      <span className="text-[#A5B2BA] text-base">{label}:</span>{" "}
                      <span className="text-[#010F17] text-base font-medium">&nbsp;&nbsp;{value}</span>
                    </div>
                  ) : (
                    <span key={idx} className="text-[#010F17] text-base">{part}</span>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Right column if needed */}
        <div className="col-span-1"></div>
      </div>
    </div>
  );
};

export default ProductInfo;
