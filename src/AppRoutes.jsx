import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./layouts/user/Layout";
import loader from "./assets/svg/loader.svg";
import { WishlistProvider } from "./contexts/user/WishListContext";
import ScrollToTop from "./components/user/ScrollToTop";
import { CartProvider } from "./contexts/user/CartContext";
import { AuthProvider } from "./contexts/user/AuthContext";
import UserRoute from "./routes/user/UserRoute";
import AdminRoute from "./routes/admin/AdminRoute";
import AuthRoute from "./routes/auth/AuthRoute";

const LoadingFallback = () => (
  <div className="flex justify-center items-center h-screen">
    <img src={loader} alt="loader" />
  </div>
);

const AppRoutes = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <ScrollToTop />
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/*" element={<UserRoute />} />
                <Route path="/dashboard/*" element={<AdminRoute />} />
                <Route path="/auth/*" element={<AuthRoute />} />
              </Routes>
            </Suspense>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default AppRoutes;
