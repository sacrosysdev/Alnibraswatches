import React from 'react'
import ProductCard from '../../components/ProductCard'
import { useWishlist } from '../../contexts/WishListContext'
import NoData from '../../assets/images/wishlist/NoData.webp'
import { Link } from 'react-router-dom'

const Wishlist = () => {
const {wishlist} = useWishlist()
const isEmpty = wishlist.length > 0 ? false : true;
console.log(wishlist)
console.log(isEmpty)
  return (
    <div className='bg-[#F1F1F1]'>
        {isEmpty ? (
            <div className='h-screen flex flex-col gap-5 justify-center items-center'>
                <div className='h-[300px] w-[300px]'>
                    <img src={NoData} alt="NoData" />
                </div>
                <div>
                    <h1 className='font-bold font-gilroy text-2xl'>Your WishList is Empty</h1>
                </div>
                <Link to='/trending'>
                    <button className='px-6 py-3 bg-[#00211E] font-bold text-base cursor-pointer text-white w-fit rounded-lg'>
                        Explore
                    </button>
                </Link>
            </div>
        ):(
            <div className='grid grid-cols-4 gap-5 xl:gap-10 p-5 xl:p-16'>
                {wishlist.map((item)=>(<div key={item.id}>
            <ProductCard id={item.id} image = {item.image} title = {item.title} brand={item.brand} price ={item.price}/>
          </div>))}
            </div>
        )}
    </div>
  )
}

export default Wishlist