import { useField } from 'formik';
import { ErrorMessage } from 'formik';

export const InputFieldAuth = ({ icon, ...props }) => {
  const [field, meta] = useField(props);



  return (
    <div className="">

      <div className={`flex items-center `}>
      
          <input
          
            {...field}
            {...props}
            
            className={`relative w-full py-3  font-medium font-gilroy text-base bg-transparent  border-b-2 border-[#E8E9EA] focus:outline-none text-[#000000] ${icon ? 'pl-6':''}`}
          />
          {icon && (
          <span className="absolute mr-2 text-[#005C53]">
            {icon}
          </span>
        )}

      </div>
      <div className="h-5">
        <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm" />
      </div>

    </div>
  );
};