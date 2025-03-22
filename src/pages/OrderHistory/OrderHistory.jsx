import React from 'react'
import Header from './Header'
import SearchBar from './SearchBar'
import OrderCard from './OrderCard'

const OrderHistory = () => {
  return (
    <div className='flex justify-center w-full px-5 xl:w-[80%] mx-auto py-20'>
        <div className='w-full'>
            <Header/>
            <div className='flex flex-col gap-4'>
                <SearchBar/>
                {Array.from({length:5}).map((_, index)=>(<div key={index}>
                    <OrderCard/>
                </div>))}
                
            </div>
        </div>
    </div>
  )
}

export default OrderHistory