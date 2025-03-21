import React from 'react'
import Header from './Header'
import CheckOutForm from './CheckOutForm'
import PaymentSection from './PaymentSection'
import PlaceOrder from './PlaceOrder'

const Checkout = () => {
  return (
    <div className='w-full py-10'>
        <div className='grid grid-cols-3 gap-6 items-start mx-auto  w-[80%]'>
            <div className='col-span-2'>
                <Header/>
                <CheckOutForm/>
                <hr />
                <PaymentSection/>
            </div>
            <div className='col-span-1 border w-full rounded-2xl'>
                <PlaceOrder/>
            </div>
        </div>
    </div>
  )
}

export default Checkout