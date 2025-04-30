import React, { useState } from 'react';
import { IoMdSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io"; // Import the Close icon
import { useSearchProduct } from '../../api/user/hooks';
import { useNavigate } from 'react-router-dom';

const Searchbox = () => {
    const [searchText, setSearchText] = useState('');
    const { data: results = [], isLoading } = useSearchProduct(searchText);
    const navigate = useNavigate();

    const goToProductDetail = (id) => {
        navigate(`/product/${id}`);
        setSearchText('');
    };

    const clearSearch = () => {
        setSearchText('');
    };

    return (
        <div className='w-full relative'>
            <form className="w-full relative" onSubmit={(e) => e.preventDefault()}>
                <IoMdSearch size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                
                <input
                    type="text"
                    placeholder="Search Here"
                    className="w-full pl-10 pr-10 py-1 bg-white rounded-sm focus:outline-none"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />

                {searchText && (
                    <IoMdClose
                        size={20}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                        onClick={clearSearch}
                    />
                )}
            </form>

            {searchText && (
                <div className="absolute w-full bg-white border mt-1 rounded shadow z-10 max-h-60 overflow-auto">
                    {isLoading ? (
                        <div className="p-4 text-center">Loading...</div>
                    ) : results && results.length > 0 ? (
                        results.map((product, index) => (
                            <div
                                key={index}
                                className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                                onClick={() => goToProductDetail(product.productId)}
                            >
                                {product.productName}
                            </div>
                        ))
                    ) : (
                        <div className="p-4 text-center text-gray-500">No products found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Searchbox;
