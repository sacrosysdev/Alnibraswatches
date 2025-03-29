import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from './layouts/Layout';
import  loader from './assets/svg/loader.svg'

const HomePage = lazy(()=> import('./pages/Home/Home'))
const TrendingPage  = lazy(()=> import('./pages/Trending/Trending'))
const ProductPage = lazy(()=> import('./pages/Product/Product'))
const CheckoutPage = lazy(()=> import('./pages/CheckOut/Checkout'))
const OrderHistoryPage = lazy(()=> import('./pages/OrderHistory/OrderHistory'))
const AboutUsPage = lazy(()=> import('./pages/AboutUs/AboutUs'))

const LoadingFallback =()=><div className='flex justify-center items-center h-screen'>
  <img src={loader} alt="loader" />
</div>

const AppRoutes = () => {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<LoadingFallback/>}>
          <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/trending' element={<TrendingPage/>}></Route>
            <Route path='/product' element={<ProductPage/>}></Route>
            <Route path='/checkout' element={<CheckoutPage/>}></Route>
            <Route path='/order-history' element={<OrderHistoryPage/>}></Route>
            <Route path='/aboutus' element={<AboutUsPage/>}></Route>
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  )
}

export default AppRoutes