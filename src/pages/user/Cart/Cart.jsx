import React from 'react'
import ProductCard from './ProductCard'
import SummaryBox from './SummaryBox'
import Ratings from '../Product/Ratings'
// import RecentSearch from '../Product/RecentSearch'
import Nodata from '../../../assets/images/wishlist/Nodata.webp'
import { Link } from 'react-router-dom'
import { useCart } from '../../../contexts/user/CartContext'

const Cart = () => {
     const { cart, updateCartItem, removeFromCart } = useCart()
        const subtotal = cart.reduce((acc, item) => {
            return acc + (item.Quantity * (item?.DiscountPrice || item?.Price));
        }, 0);
        const decreaseFromCart = () => {
            if(item.Quantity>1){
                const updatedItem = {
                    ...item,
                    Quantity: item.Quantity - 1
                };
                updateCartItem(updatedItem)
            }
          
        }
        const increaseFromCart = (item) => {
            const updatedItem = {
                ...item,
                Quantity: item.Quantity + 1
            };
            updateCartItem(updatedItem)
        }
        const removeItemFromCart = (cartId) => {
            removeFromCart(cartId)
        }
   
    const isEmpty = cart.length === 0 
    return (
        <div className='p-5 xl:p-16'>
            <div>
                <div className='grid grid-cols-1 xl:grid-cols-2'>
                    <div className=''>
                        <h1 className='font-semibold font-playfair text-3xl py-2'>Shopping Cart</h1>
                        <div className='xl:h-[500px] xl:overflow-y-auto scrollbar-hide py-2'>

                        {!isEmpty ? (<div>
                            {cart.map((item, index) =>
                                <div key={item.ProductId} className={`${index !== cart.length - 1 ? 'border-b border-[#A3A3A3]' : ''}`}>
                                <ProductCard 
                                id={item.ProductId} 
                                image={item.PrimaryImageUrl} 
                                title={item.ProductName} 
                                brand={item.BrandName} 
                                price={item?.DiscountPrice || item?.Price} 
                                quantity={item.Quantity}
                                increaseFromCart={() => increaseFromCart(item)}
                                decreaseFromCart={() => decreaseFromCart(item)}
                                removeItemFromCart={() => removeItemFromCart(item.CartId)}/>
                            </div>)}
                        </div>) : (
                            <div className="h-full flex flex-col gap-3 justify-center items-center  ">
                                <div className='max-h-[200px] max-w-[200px]'>
                                    <img src={Nodata} alt="NoDataFound" />
                                </div>
                                <div>
                                    <h1 className='font-bold font-gilroy text-2xl'>Your Cart is Empty</h1>
                                </div>
                                <Link to='/trending'>
                                    <button className='px-6 py-3 bg-[#00211E] font-bold text-base cursor-pointer text-white w-fit rounded-lg'>
                                        Explore
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>                                               
                    </div>
                    <div className='w-full xl:w-2/3 mx-auto'>
                        <SummaryBox />
                    </div>
                </div>
                <hr className='text-[#E5E5E5]' />
                <div className='py-5'>
                    <Ratings />
                </div>
                {/* <div className='py-5'>
                    <RecentSearch />
                </div> */}
            </div>
        </div>
    )
}

export default Cart