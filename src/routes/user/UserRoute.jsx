import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import UserLayout from "../../layouts/user/Layout";
const HomePage = lazy(() => import("../../pages/user/Home/Home"));
const TrendingPage = lazy(() => import("../../pages/user/Trending/Trending"));
const ProductPage = lazy(() => import("../../pages/user/Product/Product"));
const CheckoutPage = lazy(() => import("../../pages/user/CheckOut/Checkout"));
const OrderHistoryPage = lazy(() =>
  import("../../pages/user/OrderHistory/OrderHistory")
);
const AboutUsPage = lazy(() => import("../../pages/user/AboutUs/AboutUs"));
const CartPage = lazy(() => import("../../pages/user/Cart/Cart"));
const WishlistPage = lazy(() => import("../../pages/user/Wishlist/Wishlist"));
const UserRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-history" element={<OrderHistoryPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Route>
    </Routes>
  );
};

export default UserRoute;
