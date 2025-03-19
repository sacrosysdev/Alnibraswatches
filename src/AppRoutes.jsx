import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from './layouts/Layout';

const HomePage = lazy(()=> import('./pages/Home/Home'))
const TrendingPage  = lazy(()=> import('./pages/Trending/Trending'))

const LoadingFallback =()=><div className='flex justify-center items-center'>Loading...</div>

const AppRoutes = () => {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<LoadingFallback/>}>
          <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/trending' element={<TrendingPage/>}></Route>
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  )
}

export default AppRoutes