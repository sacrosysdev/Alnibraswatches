import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../../layouts/admin/Layout";
import DashboardHome from "../../pages/admin/DashboardHome";
import Orders from "../../pages/admin/Orders";
import Customers from "../../pages/admin/Customers";
import Coupons from "../../pages/admin/Coupons";
import Categories from "../../pages/admin/Categories";
import Transactions from "../../pages/admin/Transactions";
import Brands from "../../pages/admin/Brands";
import Ratings from "../../pages/admin/Ratings";
import AddProduct from "../../pages/admin/AddProduct";
import ProductList from "../../pages/admin/ProductList";
import Admin from "../../pages/admin/Admin";
import Settings from "../../pages/admin/Settings";

const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="order" element={<Orders />} />
        <Route path="customers" element={<Customers />} />
        <Route path="coupon" element={<Coupons />} />
        <Route path="categories" element={<Categories />} />
        <Route path="transaction" element={<Transactions />} />
        <Route path="brand" element={<Brands />} />
        <Route path="ratings" element={<Ratings />} />
        <Route path="addProduct" element={<AddProduct />} />
        <Route path="productList" element={<ProductList />} />
        <Route path="admin" element={<Admin />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AdminRoute;
