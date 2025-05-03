import React from 'react'
const NoDataFound = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-gray-600">
            {/* <img
                src="/no-products.svg" 
                alt="No products"
                className="w-40 h-40 mb-6 opacity-80"
            /> */}
            <h2 className="text-xl font-semibold mb-2">No Products Found</h2>
            <p className="text-sm text-gray-500 text-center max-w-sm">
                We couldn’t find any products that match your filters. Try adjusting your filters or search terms.
            </p>
        </div>

    )
}
export default NoDataFound