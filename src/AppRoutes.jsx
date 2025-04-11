import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from './layouts/Layout';
import  loader from './assets/svg/loader.svg'
import { WishlistProvider } from './contexts/WishListContext';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from './contexts/CartContext';

const HomePage = lazy(()=> import('./pages/Home/Home'))
const TrendingPage  = lazy(()=> import('./pages/Trending/Trending'))
const ProductPage = lazy(()=> import('./pages/Product/Product'))
const CheckoutPage = lazy(()=> import('./pages/CheckOut/Checkout'))
const OrderHistoryPage = lazy(()=> import('./pages/OrderHistory/OrderHistory'))
const AboutUsPage = lazy(()=> import('./pages/AboutUs/AboutUs'))
const CartPage = lazy(()=> import('./pages/Cart/Cart'))
const WishlistPage = lazy(()=> import('./pages/Wishlist/Wishlist'))

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