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
            
            className={`w-full p-3  bg-[#F9F9F9] rounded-md border border-[#E8E9EA] focus:outline-none text-[#333333]`}
          />

      </div>
      <div className="h-5">
        <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm" />
      </div>

    </div>
  );
};