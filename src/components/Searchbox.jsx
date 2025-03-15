import React from 'react'
import { FiSearch } from 'react-icons/fi'

const Searchbox = () => {
    return (
        <div className='w-full'>

            <form className="w-full relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 bg-white  rounded-sm focus:outline-none"
                />
            </form>

        </div>
    )
}

export default Searchbox