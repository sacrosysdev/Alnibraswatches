import React from 'react'
import { FiSearch } from 'react-icons/fi'

const SearchBar = () => {
  return (
    <div className='xl:w-3/4 pt-8'>
    
                <form className="w-full relative flex gap-3">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#19242D]" />
                    <input
                        type="text"
                        placeholder="Search Your Order"
                        className="w-full pl-10 pr-4 py-3 font-gilroy bg-white border  border-[#E8E9EA] rounded-sm focus:outline-none"
                    />
                    <button type='submit' className='border rounded-lg  px-6 '>Search</button>
                </form>
    
            </div>
  )
}

export default SearchBar