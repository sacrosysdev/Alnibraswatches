import React from 'react'
import { FaAngleDown } from "react-icons/fa6";
import { useField } from 'formik';
import { ErrorMessage } from 'formik';

const SelectField = ({ optionText, optionsData, ...props }) => {
    const [field, meta] = useField(props);
 
    return (
        <div className="">
            
            <div className="relative flex items-center ">
                
                <select
                    {...field}
                    {...props}
                    className={'w-full py-3 px-5 font-medium font-gilroy appearance-none  text-sm bg-[#F9F9F9] rounded-sm border border-[#E8E9EA] focus:outline-none text-[#A3A7AB]'}
                >
                    {optionText && <option value="" disabled>
                        {optionText}
                    </option>}
                    {optionsData && optionsData.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <span className="absolute right-3 text-[#00000099] pointer-events-none ">
                    <FaAngleDown />
                </span>
            </div>
            <div className="h-5">
        <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm" />
      </div>

        </div>
    )
}

export default SelectField