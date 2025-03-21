import React from 'react'
import { FaAngleDown } from "react-icons/fa6";
import { useField } from 'formik';
import { ErrorMessage } from 'formik';

const SelectField = ({ optionText, optionsData, ...props }) => {
    const [field, meta] = useField(props);
 
    return (
        <div className="">
            
            <div className="relative flex items-center border border-[#BBBBBB] rounded-xl ">
                
                <select
                    {...field}
                    {...props}
                    className={`w-full p-3 bg-transparent focus:outline-none appearance-none pr-10 'text-[#333333]`}
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