import React from 'react'
import { InputField } from '../../../components/user/InputField';
import SelectField from '../../../components/user/SelectField';

const CheckOutForm = () => {
    const states = ["Kerala", "US"]
    return (
        <div className=' pt-10'>
            <div className='py-8 flex flex-col gap-1'>
                <h1 className='font-semibold text-lg'>Delivery Details</h1>
                <h2 className='text-base text-[#8C9296]'>We will delivery your order to the below address</h2>
            </div>
            <div className='border-t border-b border-[#E8E9EA] pt-5 pb-10 space-y-4'>
                <div className='grid grid-cols-1'>
                    <InputField
                        name="fullName"
                        placeholder="Full Name*"
                    />
                </div>
                <div className='grid grid-cols-1 xl:grid-cols-2 gap-3'>
                    <InputField
                        name="phone"
                        placeholder="Phone number*"
                    />
                    <InputField
                        name="pincode"
                        placeholder="Pincode*"
                    />
                </div>
                <div className='grid grid-cols-1 xl:grid-cols-2 gap-3'>
                    <InputField
                        name="houseNo"
                        placeholder="house number/ building name*"
                    />
                    <InputField
                        name="roadName"
                        placeholder="road name, area colony*"
                    />
                </div>
                <div className='grid grid-cols-1 xl:grid-cols-2 gap-3'>
                    <InputField
                        name="city"
                        placeholder="City*"
                    />
                    <SelectField
                        name="state"
                        type="text"
                        optionText="state*"
                        optionsData={states}
                    />
                </div>
                <div className='grid grid-cols-1'>
                    <InputField
                        name="landmark"
                        placeholder="Landmark"
                    />
                </div>
                <div>
                    <label className="flex items-start space-x-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none" />
                        <span className="text-[#008EEC]">Make this address as shipping address </span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default CheckOutForm