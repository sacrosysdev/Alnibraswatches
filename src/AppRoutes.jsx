import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from './layouts/user/Layout';
import  loader from './assets/svg/loader.svg'
import { WishlistProvider } from './contexts/user/WishListContext';
import ScrollToTop from './components/user/ScrollToTop';
import { CartProvider } from './contexts/user/CartContext';

const HomePage = lazy(()=> import('./pages/user/Home/Home'))
const TrendingPage  = lazy(()=> import('./pages/user/Trending/Trending'))
const ProductPage = lazy(()=> import('./pages/user/Product/Product'))
const CheckoutPage = lazy(()=> import('./pages/user/CheckOut/Checkout'))
const OrderHistoryPage = lazy(()=> import('./pages/user/OrderHistory/OrderHistory'))
const AboutUsPage = lazy(()=> import('./pages/user/AboutUs/AboutUs'))
const CartPage = lazy(()=> import('./pages/user/Cart/Cart'))
const WishlistPage = lazy(()=> import('./pages/user/Wishlist/Wishlist'))

const LoadingFallback =()=><div className='flex justify-center items-center h-screen'>
  <img src={loader} alt="loader" />
</div>

const AppRoutes = () => {
  return (
    <CartProvider>
    <WishlistProvider>
      <Router>
        <ScrollToTop/>
        <Layout>
          <Suspense fallback={<LoadingFallback/>}>
            <Routes>
              <Route path='/' element={<HomePage/>}></Route>
              <Route path='/trending' element={<TrendingPage/>}></Route>
              <Route path='/product' element={<ProductPage/>}></Route>
              <Route path='/checkout' element={<CheckoutPage/>}></Route>
              <Route path='/order-history' element={<OrderHistoryPage/>}></Route>
              <Route path='/aboutus' element={<AboutUsPage/>}></Route>
              <Route path='/cart' element={<CartPage/>}></Route>
              <Route path='/wishlist' element={<WishlistPage/>}></Route>
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </WishlistProvider>
    </CartProvider>
  )
}

export default AppRoutes