import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineClose } from "react-icons/md";
import Product from '../../assets/images/home/productimage.png'

import Delete from '../../assets/svg/home/delete.svg'


const CartSideMobile = ({ cartOpen, handleCart }) => {
    useEffect(() => {
        if (cartOpen) {
          document.body.classList.add("overflow-hidden");
        } else {
          document.body.classList.remove("overflow-hidden");
        }
      
        return () => {
          document.body.classList.remove("overflow-hidden"); // Cleanup
        };
      }, [cartOpen]);
      console.log(cartOpen)
    const dummyCartItems = [
        { id: 1, name: "Product 1", price: "$10", quantity: 1 },
        { id: 2, name: "Product 2", price: "$20", quantity: 2 },
        { id: 3, name: "Product 3", price: "$20", quantity: 2 },
        { id: 4, name: "Product 3", price: "$20", quantity: 2 },
        { id: 5, name: "Product 1", price: "$10", quantity: 1 },
        { id: 6, name: "Product 2", price: "$20", quantity: 2 },
        { id: 7, name: "Product 3", price: "$20", quantity: 2 },
        { id: 8, name: "Product 3", price: "$20", quantity: 2 },
    ];

    return (
        <AnimatePresence>
        {cartOpen && (<div>


            {/* Sidebar */}
            <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0  w-full  min-h-screen bg-[#003F38] shadow-lg z-50 p-5 flex flex-col text-white"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center  pb-3 ">
                            <h2 className="text-xl font-bold">Order</h2>
                            <button onClick={handleCart} className="cursor-pointer text-xl font-bold"><MdOutlineClose /></button>
                        </div>
                        <div className="bg-[#005C53] cursor-pointer px-5 py-2 rounded-xl w-fit">
                            <h1>All</h1>
                        </div>

                        {/* Cart Items */}
                        <div className=" mt-4">
                            {/* Table Heading */}
                            <div className="flex justify-between items-center py-2 border-b border-white font-semibold text-sm pb-5 ">
                                <p className="w-1/2">Product</p>
                                <p className="w-1/4 text-center">Quantity</p>
                                <p className="w-1/4 text-right">Price</p>
                            </div>
                            <div className="flex-grow overflow-y-auto   scrollbar-hide py-3" style={{
                            maxHeight: 'calc(100vh - 320px)' // Adjust 320px based on your header/footer heights
                        }}>

                            {/* Cart Items */}
                            {dummyCartItems.length > 0 ? (
                                dummyCartItems.map((item) => (
                                        <div key={item.id}>
                                            <div  className="flex justify-between items-center py-5 ">
                                            <div className="flex items-center w-1/2 gap-3">
                                                <div className="h-10 w-10 rounded-full bg-[#005C53]">
                                                    <img src={Product} alt="productimage" className="h-full w-full  object-contain" />
                                                </div>
                                                <div className="flex flex-col text-xs gap-1">
                                                    <p className="uppercase">{item.name}</p>
                                                    <p>AED 13</p>
                                                    <QuantityManage/>
                                                </div>
                                            </div>
                                            <p className="w-1/4 text-center text-sx">{item.quantity}</p>
                                            <p className="w-1/4 text-right text-sm font-semibold">{item.price}</p>
                                        </div>
                                        <div className="flex w-full justify-between items-center gap-3 ">
                                            <div className="w-4/5 ">
                                                <input type="text" placeholder="Add a note" className=" text-sm text-gray-600 w-full p-2 bg-[#F0F0F0] border border-gray-500 rounded-lg focus:outline-none"/>
                                            </div>
                                            <div className=" w-1/5">
                                                <div className='border-2 border-[#DC2626] h-8 w-8 cursor-pointer rounded-lg flex items-center justify-center'>
                                                    <img src={Delete} alt="delete" className='' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    
                                ))
                            ) : (
                                <p className="text-center text-gray-500 mt-10">Your cart is empty</p>
                            )}
                        </div>
                                                        
                        </div>


                        {/* Checkout Button */}
                        <div className="mt-auto pt-3 border-t">
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between">
                                    <h1>Discount</h1>
                                    <h1>AED 00.00</h1>
                                </div>
                                <div className="flex justify-between">
                                    <h1>Sub total</h1>
                                    <h1>AED 12.00</h1>
                                </div>
                                <button className="w-full bg-[#005C53] cursor-pointer text-white py-2 rounded-md m">
                                Order Now
                            </button>
                            </div>
                            
                        </div>
                    </motion.div>
        </div>)}
        </AnimatePresence>
    )
}

export default CartSideMobile