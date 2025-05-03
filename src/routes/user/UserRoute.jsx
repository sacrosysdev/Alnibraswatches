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
const SignupPage = lazy(()=> import('../../pages/user/Signup/Signup'))
const LoginPage = lazy(()=> import('../../pages/user/Login/Login'))
const ResetPasswordPage = lazy(()=> import('../../pages/user/Resetpassword/Reset'))

//Profile
const ProfilePage = lazy(() => import('../../pages/user/Profile/Profile'))
const PersonalInfoPage =  lazy(()=> import('../../pages/user/Profile/PersonalInfo'))
const MyOrdersPage = lazy(()=> import('../../pages/user/Profile/MyOrders'))
const ManageAddressPage = lazy(()=> import('../../pages/user/Profile/ManageAddress'))
const PaymentMethodsPage = lazy(()=>import('../../pages/user/Profile/PaymentMethods'))
const HelpCenterPage = lazy(()=>import('../../pages/user/Profile/HelpCenter'))
const UserRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path='/register' element={<SignupPage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/reset-password' element={<ResetPasswordPage/>}></Route>
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-history" element={<OrderHistoryPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path='/profile' element={<ProfilePage/>}>
                <Route index element={<PersonalInfoPage/>}></Route>
                <Route path='my-orders' element={<MyOrdersPage/>}></Route>
                <Route path='manage-address' element={<ManageAddressPage/>}></Route>
                <Route path='payment-methods' element={<PaymentMethodsPage/>}></Route>
                <Route path='help-center' element={<HelpCenterPage/>}></Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default UserRoute;
