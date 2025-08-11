import React, { useState, useEffect } from "react";
import { useGetOrders } from "../../../api/admin/hooks";
import {
  Search,
  Calendar,
  CreditCard,
  Package,
  Filter,
  ChevronDown,
  ChevronUp,
  Download,
} from "lucide-react";
import OrderHeader from "./OrderHeader";
import MyOrdersSkeleton from "../../../components/user/Skelton/MyOrdersSkeleton";

const MyOrders = () => {
  const { data, isLoading, error } = useGetOrders();
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "orderDate",
    direction: "desc",
  });
  const [filterStatus, setFilterStatus] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const statusColors = {
    ordered: "bg-blue-100 text-blue-800",
    shipped: "bg-yellow-100 text-yellow-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  if (isLoading) return <MyOrdersSkeleton />;
  if (error)
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">Error loading orders: {error.message}</p>
      </div>
    );

  // Handle search functionality
  const filteredOrders = data.orders.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(order.orderAmount).includes(searchTerm);

    const matchesFilter =
      filterStatus === "all" || order.orderStatus === filterStatus;

    return matchesSearch && matchesFilter;
  });

  // Sort functionality
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortConfig.key === "orderDate") {
      const dateA = new Date(a[sortConfig.key]);
      const dateB = new Date(b[sortConfig.key]);
      return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
    } else {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    }
  });

  return (
    <div className="bg-white rounded-lg    md:p-6">
      {/* Order Header */}
      <OrderHeader
        filterStatus={filterStatus}
        searchTerm={searchTerm}
        setFilterStatus={setFilterStatus}
        setSearchTerm={setSearchTerm}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
      />

      {/* Orders Cards Layout */}
      <div className="grid grid-cols-1 gap-6">
        {sortedOrders.length > 0 ? (
          sortedOrders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white rounded-lg shadow-sm border
               border-gray-200 overflow-hidden transition-shadow"
            >
              {/* Order Header Card */}
              <div
                className="p-4 md:p-6 flex flex-col md:flex-row justify-between border-b
               border-gray-100"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4 md:mb-0">
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase">
                      Order ID
                    </span>
                    <h3 className="text-lg font-bold text-gray-900">
                      #{order.orderId}
                    </h3>
                  </div>

                  <div className="md:ml-6">
                    <span className="text-xs font-medium text-gray-500 uppercase">
                      Customer
                    </span>
                    <p className="text-gray-800 font-medium">
                      {order.userName}
                    </p>
                  </div>

                  <div className="md:ml-6">
                    <span className="text-xs font-medium text-gray-500 uppercase">
                      Date
                    </span>
                    <div className="flex items-center text-gray-700">
                      <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                      {formatDate(order.orderDate)}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </span>
                    <div className="flex items-center font-bold text-gray-900">
                      <CreditCard className="mr-2 h-4 w-4 text-gray-500" />
                      <span className="text-gray-500 mr-1">AED</span>
                      {order.orderAmount}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase">
                      Status
                    </span>
                    <div className="mt-1">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                          statusColors[order.orderStatus] ||
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.orderStatus.charAt(0).toUpperCase() +
                          order.orderStatus.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Products */}
              <div className="bg-gray-50 p-4 md:p-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Products
                </h4>
                <div className="space-y-4">
                  {order.orderDetails &&
                    order.orderDetails.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-md p-4 border border-gray-200 hover:border-gray-300 transition-colors"
                      >
                        <div className="flex flex-col md:flex-row justify-between">
                          {item?.primaryImageUrl ? (
                            <div className="h-24 w-24 mr-3 rounded-md flex items-center justify-center text-xs text-gray-400 bg-gray-100">
                              <img
                                src={item?.primaryImageUrl}
                                alt=""
                                className="w-full h-full object-contain"
                              />
                            </div>
                          ) : (
                            <div className="h-24 w-24 mr-3 rounded-md flex items-center justify-center text-xs text-gray-400 bg-gray-100">
                              No image
                            </div>
                          )}

                          <div className="flex-1 mb-3 md:mb-0">
                            <h5 className="font-medium text-gray-900 mb-1">
                              {item.productName}
                            </h5>
                            <p className="text-xs text-gray-500">
                              Product ID: {item.productId}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-6 md:gap-8">
                            <div className="flex flex-col items-center">
                              <span className="text-xs text-gray-500 mb-1">
                                Quantity
                              </span>
                              <span className="font-medium text-gray-900">
                                {item.quantity}
                              </span>
                            </div>

                            <div className="flex flex-col items-center">
                              <span className="text-xs text-gray-500 mb-1">
                                Unit Price
                              </span>
                              <span className="font-medium text-gray-900">
                                <span className="text-gray-500 mr-1">AED</span>
                                {item.price ||
                                  (
                                    order.orderAmount /
                                    order.orderDetails.reduce(
                                      (sum, detail) => sum + detail.quantity,
                                      0
                                    )
                                  ).toFixed(2)}
                              </span>
                            </div>

                            <div className="flex flex-col items-center">
                              <span className="text-xs text-gray-500 mb-1">
                                Subtotal
                              </span>
                              <span className="font-medium text-gray-900">
                                <span className="text-gray-500 mr-1">AED</span>
                                {item.price
                                  ? (item.price * item.quantity).toFixed(2)
                                  : (
                                      order.orderAmount *
                                      (item.quantity /
                                        order.orderDetails.reduce(
                                          (sum, detail) =>
                                            sum + detail.quantity,
                                          0
                                        ))
                                    ).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-gray-500">
            {searchTerm || filterStatus !== "all"
              ? "No orders match your search criteria"
              : "No orders found"}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
