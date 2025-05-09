import { useField } from 'formik';
import { ErrorMessage } from 'formik';

export const InputField = ({ ...props }) => {
  const [field, meta] = useField(props);



  return (
    <div className="">

      <div className={`flex items-center     `}>
        
          <input
            {...field}
            {...props}
            
            className={`w-full py-3 px-5 font-medium font-gilroy  text-sm bg-[#F9F9F9] rounded-sm border border-[#E8E9EA] focus:outline-none text-[#A3A7AB]`}
          />

      </div>
      <div className="h-5">
        <ErrorMessage name={field.name} component="div" className="text-red-500 text-xs mt-1" />
      </div>

    </div>
  );
};