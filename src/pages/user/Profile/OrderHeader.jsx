import { ChevronDown, ChevronUp, Filter, Search } from "lucide-react";
import React, { useState } from "react";

const OrderHeader = ({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300
               rounded-lg focus:ring-2 focus:ring-[#005C53] focus:border-[#005C53] outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          {/* Filter Button */}
          <button
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="h-5 w-5" />
            Filter
            {isFilterOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex flex-wrap gap-3">
            <h3 className="text-sm font-medium text-gray-700 mr-2">Status:</h3>
            {["all", "ordered", "shipped", "delivered", "cancelled"].map(
              (status) => (
                <button
                  key={status}
                  className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                    filterStatus === status
                      ? "bg-[#005C53] text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                  }`}
                  onClick={() => setFilterStatus(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderHeader;
