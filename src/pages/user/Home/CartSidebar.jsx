import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineClose } from "react-icons/md";
import Delete from '../../../assets/svg/home/delete.svg'
import { Link } from "react-router-dom";
import Nodata from '../../../assets/images/wishlist/Nodata.webp';
import {useCart} from '../../../contexts/user/CartContext'

const dummyCartItems = [
    // { id: 1, name: "Product 1", price: "$10", quantity: 1 },
    // { id: 2, name: "Product 2", price: "$20", quantity: 2 },
    // { id: 3, name: "Product 3", price: "$20", quantity: 2 },
    // { id: 4, name: "Product 3", price: "$20", quantity: 2 },
    // { id: 5, name: "Product 1", price: "$10", quantity: 1 },
    // { id: 6, name: "Product 2", price: "$20", quantity: 2 },
    // { id: 7, name: "Product 3", price: "$20", quantity: 2 },
    // { id: 8, name: "Product 3", price: "$20", quantity: 2 },
];

const CartSidebar = ({ cartOpen, handleCart }) => {
    const { cart, addToCart, decreaseFromCart, removeItemFromCart } = useCart()

    const subtotal = cart.reduce((acc, item) => {
        return acc + (item.quantity * item.price);
      }, 0);

    // useEffect(() => {
    //     if (cartOpen) {
    //       document.body.classList.add("overflow-hidden");
    //     } else {
    //       document.body.classList.remove("overflow-hidden");
    //     }

    //     return () => {
    //       document.body.classList.remove("overflow-hidden"); // Cleanup
    //     };
    //   }, [cartOpen]);
    return (
        <AnimatePresence>
            {cartOpen && (
                <>
                    {/* Background Overlay */}
                    {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-full h-full bg-black/50 z-40"
            onClick={handleCart} // Close cart when clicking outside
          /> */}

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
                        className="fixed top-0 right-0 w-full md:w-1/2 xl:w-1/4 h-full bg-[#003F38] shadow-lg z-50 p-5 flex flex-col text-white"
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
                            <div className="flex-grow overflow-y-auto  scrollbar-hide py-3" style={{
                                maxHeight: 'calc(100vh - 320px)' // Adjust 320px based on your header/footer heights
                            }}>

                                {/* Cart Items */}
                                {cart.length > 0 ? (
                                    cart.map((item) => (
                                        <div key={item.id}>
                                            <div className="flex justify-between items-center py-5 ">
                                                <div className="flex items-center w-1/2 gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-[#005C53]">
                                                        <img src={item.image} alt="productimage" className="h-full w-full  object-contain" />
                                                    </div>
                                                    <div className="flex flex-col text-xs gap-1">
                                                        <p className="uppercase">{item.name}</p>
                                                        <p>{item.price}</p>
                                                        <div className='flex  justify-between items-center gap-3 w-16 py-1 mx-auto px-2 border  border-white rounded-lg'>
                                                            <div className='cursor-pointer' onClick={()=>{decreaseFromCart(item.id)}}>-</div>
                                                            <div>{item.quantity}</div>
                                                            <div className='cursor-pointer' onClick={()=>{addToCart({ ...item })}}>+</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="w-1/4 text-center text-sx">{item.quantity}</p>
                                                <p className="w-1/4 text-right text-sm font-semibold">{item.price*item.quantity}</p>
                                            </div>
                                            <div className="flex w-full justify-between items-center gap-3 ">
                                                <div className="w-4/5 ">
                                                    <input type="text" placeholder="Add a note" className=" text-sm text-gray-600 w-full p-2 bg-[#F0F0F0] border border-gray-500 rounded-lg focus:outline-none" />
                                                </div>
                                                <div className=" w-1/5">
                                                    <div onClick={()=>{removeItemFromCart(item.id)}} className='border-2 border-[#DC2626] h-8 w-8 cursor-pointer rounded-lg flex items-center justify-center'>
                                                        <img src={Delete} alt="delete" className='' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    ))
                                ) : (
                                    <div className="min-h-[250px] flex justify-center items-center  ">
                                        <div className='h-[200px] w-[200px]'>
                                            <img src={Nodata} alt="NoDataFound" />
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>


                        {/* Checkout Button */}
                        {cart.length > 0 ? (<div className="mt-auto pt-3 border-t">
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between">
                                    <h1>Discount</h1>
                                    <h1>AED 00.00</h1>
                                </div>
                                <div className="flex justify-between">
                                    <h1>Sub total</h1>
                                    <h1>AED <span>{subtotal}</span></h1>
                                </div>
                                <Link to="/cart"><button onClick={handleCart} className="w-full bg-[#005C53] cursor-pointer text-white py-2 rounded-md ">
                                    Order Now
                                </button></Link>
                            </div>

                        </div>) : (
                            <div>
                                <Link to="/trending">
                                    <div className="flex  justify-center">
                                        <button onClick={handleCart} className="w-fit px-5  bg-[#005C53] cursor-pointer text-white py-2 rounded-md ">
                                            Explore
                                        </button>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartSidebar;
