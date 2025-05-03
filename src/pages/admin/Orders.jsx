import React, { useMemo, useState } from "react";
import { StatusBadge } from "../../components/admin/orders/StatusBadge";
import PageNavigation from "../../components/admin/products/PageNavigation";
import DynamicTable from "../../components/admin/shared/DynamicTable";
import ImageCell from "../../components/admin/shared/ImageCell";
import PageHeader from "../../components/admin/shared/PageHeader";
import { useOrderData } from "../../hooks/admin/useOrderData";
import { formatDate } from "../../util/formateDate";
import OrderFilter from "../../components/admin/orders/OrderFilter";

const Orders = () => {
  const {
    orders,
    status: { isLoading, isError },
    pagination: { currentPage, pageSize, totalPages, handlePageChange },
    filters: {
      search: { query: searchQuery, setQuery: setSearchQuery },
      clearAll: clearFilters,
      dateRange,
      status,
      order,
    },
    operations: { refetch, handleOrderStatus },
  } = useOrderData({ initialPage: 1, pageSize: 10 });
  const [selectedProducts, setSelectedProducts] = useState([]);

  const ORDER_COLUMNS = useMemo(
    () => [
      {
        key: "orderId",
        header: "Order_id",
        className: "w-5",
        render: (order) => (
          <>
            <div className="text-sm font-medium text-gray-900">
              #{order.orderId}
            </div>
            <div className="text-xs text-gray-500">
              ID: {order.transactionId}
            </div>
          </>
        ),
      },
      {
        key: "primaryImageUrl",
        header: "Product",
        className: "w-20",

        render: (order) => (
          <div className="flex items-center">
            <ImageCell
              isActive={true}
              images={[{ ImageUrl: order.orderDetails[0].primaryImageUrl }]}
              name={order.orderDetails[0].productName}
            />
            <div className="ml-3">
              <div className="text-sm  text-gray-600 max-w-xs truncate">
                {order.orderDetails[0].productName}
              </div>
              <div className="text-xs text-gray-500">
                Qty: {order.orderDetails[0].quantity}
              </div>
            </div>
          </div>
        ),
      },
      {
        key: "productName",
        header: "Customer",
        render: (order) => (
          <>
            <div className="text-sm  text-gray-600">{order.userName}</div>
            <div className="text-xs text-gray-500">ID: {order.userId}</div>
          </>
        ),
      },
      {
        key: "date",
        className: "w-10",
        header: "Date",
        render: (order) => (
          <div className="text-sm text-gray-700">
            {formatDate(order.orderDate)}
          </div>
        ),
      },
      {
        key: "totalAmount",
        className: "w-10",
        header: "Amount",
        render: (order) => (
          <div className="text-sm font-medium text-gray-700">
            AED {order.orderDetails[0].totalAmount}
          </div>
        ),
      },
      {
        key: "status",
        className: "w-40",
        header: "Status",
        render: (order) => (
          <StatusBadge
            status={order.orderStatus}
            onChange={(newStatus) =>
              handleOrderStatus(order.orderId, newStatus)
            }
          />
        ),
      },
      {
        key: "payment",
        header: "Payment",
        render: (order) => (
          <>
            <div className="text-sm text-gray-700">{order.paymentMode}</div>
            <div className="text-xs text-gray-500">
              {order.paymentReference}
            </div>
          </>
        ),
      },
    ],
    [handleOrderStatus]
  );
  return (
    <div className="w-full h-full overflow-hidden gap-y-4 flex flex-col p-5">
      <div className="flex items-center gap-x-2 relative">
        <PageHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchPlaceholder="Search order by user email"
          viewToggle={null}
        />
        <OrderFilter
          filters={{
            orderId: order,
            dateRange: {
              preset: dateRange.preset,
              setPreset: dateRange.setPreset,
              fromDate: dateRange.from,
              toDate: dateRange.to,
              setFromDate: dateRange.setFrom,
              setToDate: dateRange.setTo,
            },
            status: {
              setValue: status.setValue,
              value: status.value,
            },
            clearAll: clearFilters,
          }}
        />

        {/* <ActiveFilter
          brand={brand}
          brands={brands}
          categories={categories}
          category={category}
          isActive={category.value || brand.value}
          clearFilters={clearFilters}
        /> */}
      </div>
      <DynamicTable
        isLoading={isLoading}
        isError={isError}
        columns={ORDER_COLUMNS}
        selectedItems={selectedProducts}
        setSelectedItems={setSelectedProducts}
        idField="orderId"
        data={orders?.orders || []}
        emptyMessage="No products found"
      />
      <PageNavigation
        currentPage={currentPage}
        data={orders}
        setCurrentPage={handlePageChange}
        totalPages={totalPages}
        pageSize={pageSize}
      />
    </div>
  );
};

export default Orders;
