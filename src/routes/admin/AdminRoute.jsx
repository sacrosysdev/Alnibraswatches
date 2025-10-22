import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../../layouts/admin/Layout";
import DashboardHome from "../../pages/admin/DashboardHome";
import Orders from "../../pages/admin/Orders";
import Categories from "../../pages/admin/Categories";
import Brands from "../../pages/admin/Brands";
import AddProduct from "../../pages/admin/AddProduct";
import ProductList from "../../pages/admin/ProductList";
import Admin from "../../pages/admin/Admin";
import Settings from "../../pages/admin/Settings";
import ProtectedRoute from "../../components/admin/shared/ProtectedRoute";
import Colors from "../../pages/admin/Colors";
import Sizes from "../../pages/admin/Sizes";
import Banner from "../../pages/admin/Banner";
import BannerManagement from "../../pages/admin/Banner";
import Payment from "../../pages/admin/Payment";
import Dashboard from "../../pages/admin/DashboardHome";
import Advertisement from "../../pages/admin/Advertisement";

const AdminRoute = () => {
  const isAuthenticated = () => {
    const token = localStorage.getItem("isLoged");
    return !!token;
  };
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated()}
            redirectPath="/auth/login"
          >
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* <Route index element={<DashboardHome />} /> */}
        <Route index element={<Dashboard />} />
        <Route path="order" element={<Orders />} />
        <Route path="ad" element={<Advertisement />} />
        <Route path="banner" element={<BannerManagement />} />
        <Route path="categories" element={<Categories />} />
        <Route path="colors" element={<Colors />} />
        <Route path="brand" element={<Brands />} />
        <Route path="size" element={<Sizes />} />
        <Route path="addProduct" element={<AddProduct />} />
        <Route path="productList" element={<ProductList />} />
        <Route path="payment" element={<Payment />} />
        <Route path="admin" element={<Admin />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AdminRoute;
