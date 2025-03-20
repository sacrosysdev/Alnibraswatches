import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import ProductListing from './ProductListing'
import AppDownload from '../Home/AppDownload'

const Trending = () => {
  return (
    <div className='px-16 py-5 bg-[#F1F1F1]'>
        <div className='grid grid-cols-4 gap-5'>
            <div className='col-span-1'>
                <Sidebar/>
            </div>
            <div className='col-span-3'>
                <div>
                    <Header/>
                    <ProductListing/>
                    
                </div>
            </div>
        </div>
        <div className='py-10'>
        <AppDownload/>
        </div>
    </div>
  )
}

export default Trending