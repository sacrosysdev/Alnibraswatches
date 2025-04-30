import React from 'react'

const Address = ({label,phone,address,district,userName,city}) => {

    return (
        <div className="border border-gray-200 rounded-md p-4 max-w-md bg-white shadow-sm">
            <div className="flex justify-between items-center mb-2">
                <div className="inline-block bg-teal-100 text-teal-900 text-sm font-semibold px-3 py-1 rounded">
                    {label}
                </div>
                <button className="text-sm text-blue-600 hover:underline font-medium cursor-pointer">
                    Manage Address
                </button>
            </div>

            <div className="font-semibold text-base">
                {userName} <span className="text-black font-normal">+971 {phone}</span>
            </div>
            <div className="text-gray-500 text-sm">
                {address} – <span className="font-semibold">{district}</span><br/>
                <span className="font-bold text-[#505050]">{city}</span>
            </div>
        </div>


    )
}
export default Address