import React from 'react'
import { useCart } from '../../../contexts/user/CartContext'
import { useNavigate } from 'react-router-dom'

const SummaryBox = () => {
   const { cart } = useCart()
   const navigate = useNavigate()
   const userId = localStorage.getItem("alNibrazUserId");
   const subtotal = cart.reduce((acc, item) => {
               return acc + (item.Quantity * (item?.DiscountPrice || item?.Price));
    }, 0);
    const goToCheckout = () =>{
        if (userId) {
            navigate('/checkout')
        }else{
            localStorage.setItem("redirectAfterLogin", "/checkout");
            navigate('/login')
        }
    }
    return (
        <div className='py-10'>
            <div className='p-5  md:p-10 border border-[#EBEBEB] rounded-xl flex flex-col gap-10'>
                <h1 className='font-bold text-xl'>Order Summary</h1>
                <div>
                    {/* <div>
                        <label className="text-sm text-gray-600 mb-1 block">Discount code / Promo code</label>
                        <input type="text" placeholder='Code' 
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm"
                        />
                    </div> */}
                    <div className='flex flex-col gap-5 pt-5'>
                        <div className="flex justify-between">
                            <span className="font-medium">Subtotal</span>
                            <span className="font-medium">AED <span>{subtotal}</span></span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Estimated VAT</span>
                            <span>AED {subtotal*(5/100)}</span>
                        </div>
                        {/* <div className="flex justify-between text-gray-600 ">
                            <span>Estimated shipping & Handling</span>
                            <span className='line-through'>AED 20</span>
                        </div> */}
                        <div className="flex justify-between font-semibold  pt-3">
                            <span>Total</span>
                            <span>AED <span>{subtotal + (subtotal*(5/100))}</span></span>
                        </div>
                    </div>
                </div>
                <div className='w-full  '>
                    <button className='bg-[#00211E] font-bold py-2 w-full rounded-lg
                     text-white cursor-pointer' onClick={goToCheckout}>Checkout</button>
                </div>
            </div>
        </div>
    )
}

export default SummaryBox