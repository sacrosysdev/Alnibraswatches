import React from 'react'
import { IoMdSearch } from "react-icons/io";

const Searchbox = () => {
    return (
        <div className='w-full'>

            <form className="w-full relative">
                <IoMdSearch size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 " />
                <input
                    type="text"
                    placeholder="Search Here"
                    className="w-full pl-10 pr-4 py-1 bg-white  rounded-sm focus:outline-none"
                />
            </form>

        </div>
    )
}

export default Searchbox