import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineClose } from "react-icons/md";
import Delete from '../../../assets/svg/home/delete.svg'
import { Link } from "react-router-dom";
import Nodata from '../../../assets/images/wishlist/Nodata.webp';
import { useCart } from '../../../contexts/user/CartContext'


const CartSidebar = ({ cartOpen, handleCart }) => {
    const { cart, updateCartItem, removeFromCart } = useCart()

    const subtotal = cart.reduce((acc, item) => {
        return acc + (item.Quantity * (item?.DiscountPrice || item?.Price));
    }, 0);
    const decreaseFromCart = (item) => {
        if (item.Quantity > 1) {
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
    const removeItemFromCart = (cartId, productId) => {
        removeFromCart(cartId, productId)
    }
    const isAnyItemOverStock = cart.some(item => item.Quantity > item.StockQty);
    return (
        <AnimatePresence>
            {cartOpen && (
                <>
                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
                        className="fixed top-0 right-0 w-full md:w-1/2 xl:w-1/3 h-full bg-[#003F38] shadow-lg z-50 p-5 flex flex-col text-white"
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
                        <div className="mt-4">
                            {/* Table Heading */}
                            <div className="flex justify-between items-center py-2 border-b border-white font-semibold text-sm pb-5">
                                <p className="w-1/2">Product</p>
                                <p className="w-1/4 text-center">Quantity</p>
                                <p className="w-1/4 text-right">Price</p>
                            </div>

                            <div
                                className="flex-grow overflow-y-auto scrollbar-hide py-3"
                                style={{ maxHeight: 'calc(100vh - 320px)' }}
                            >
                                {/* Cart Items */}
                                {cart.length > 0 ? (
                                    cart.map((item, index) => (
                                        <div className="border-b border-gray-300" key={index}>
                                            <div className="flex justify-between items-center py-5  ">
                                                {/* Product Image and Name */}
                                                <div className="flex items-center w-1/2 gap-3">
                                                    <div className="h-10 w-20 rounded-full bg-[#005C53] overflow-hidden">
                                                        <img src={item.PrimaryImageUrl} alt="product" className="h-full w-full object-contain" />
                                                    </div>
                                                    <div className="flex flex-col text-xs gap-1">
                                                        <p className="uppercase font-semibold">{item.ProductName}</p>
                                                    </div>

                                                </div>

                                                {/* Quantity */}
                                                <div className="w-1/4 flex items-center justify-center gap-3 text-sm">
                                                    <div
                                                        className="cursor-pointer px-2 py-1 border rounded"
                                                        onClick={() => decreaseFromCart(item)}
                                                    >
                                                        -
                                                    </div>
                                                    <div>{item.Quantity}</div>
                                                    <div
                                                        className="cursor-pointer px-2 py-1 border rounded"
                                                        onClick={() => increaseFromCart(item)}
                                                    >
                                                        +
                                                    </div>
                                                </div>

                                                {/* Price and Delete */}
                                                <div className="w-1/4 flex items-center justify-end gap-4 text-sm font-semibold">
                                                    <div
                                                        className=" h-8 w-8  rounded-lg flex items-center justify-center"
                                                    >
                                                        <div>{item?.DiscountPrice || item?.Price}</div>
                                                    </div>
                                                </div><br />

                                                <img src={Delete} alt="delete"
                                                    onClick={() => removeItemFromCart(item.CartId, item.ProductId)}
                                                    className="h-4 w-6  border-[#ffffff] cursor-pointer"
                                                />

                                            </div>
                                            <div>{item.Quantity > item.StockQty && (
                                                <span className="text-red-500 ml-2 text-sm ">Only {5} left in stock</span>
                                            )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="min-h-[250px] flex justify-center items-center">
                                        <div className="h-[200px] w-[200px]">
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
                                    <h1>Sub total</h1>
                                    <h1>AED <span>{subtotal}</span></h1>
                                </div>
                                <Link to="/cart"><button onClick={handleCart}
                                    disabled={isAnyItemOverStock}
                                    className={`w-full py-2 rounded-md ${isAnyItemOverStock
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-[#005C53] text-white'
                                        }`}>
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
