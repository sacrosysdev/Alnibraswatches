import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { InputFieldAuth } from '../../../components/user/InputFieldAuth';
import { Link, useNavigate } from 'react-router-dom';
// import useSignupUser from '../../../api/hooks/mutations/useSignupUser'
import { signupValidation } from '../../../components/user/validations';
import { useSignup } from '../../../api/user/hooks';


const SignupForm = () => {
    const navigate = useNavigate()
    const { mutate, isLoading, isError } = useSignup();
    const handleSubmit = (values) => {
        const { repeatPassword, agree, ...payload } = values; 
        mutate(payload, {
          onSuccess: (data) => {
            console.log("Signup Success", data);
            navigate("/login");
          },
          onError: (error) => {
            console.error("Signup Error", error);
          },
        });
      };


    const initialValues = {
        fullName: "",
        email: "",
        phoneNumber: "",
        passwordHash: "",
        repeatPassword: "",
        agree: false,

    };

    return (
        <Formik initialValues={initialValues} validationSchema={signupValidation} onSubmit={handleSubmit}>
            <Form>
                <div className='py-5 xl:py-8 flex justify-between gap-1'>
                    <h1 className='font-semibold text-xl'>Register</h1>
                    <Link to="/login"><p className='text-[#005C53] text-base font-medium'>Already a member?</p></Link>
                </div>


                <div className=' space-y-4'>
                    <div className='grid grid-cols-1'>
                        <InputFieldAuth
                            name="fullName"
                            placeholder="Name"
                        />
                    </div>
                    <div className='grid grid-cols-1'>
                        <InputFieldAuth
                            name="email"
                            placeholder="Email ID"
                            type="email"
                        />
                    </div>
                    <div className='grid grid-cols-1'>
                        <InputFieldAuth
                            name="phoneNumber"
                            placeholder="Contact Number"
                        />
                    </div>
                    <div className='grid grid-cols-1'>
                        <InputFieldAuth
                            name="passwordHash"
                            placeholder="Password"
                        />
                    </div>
                    <div className='grid grid-cols-1'>
                        <InputFieldAuth
                            name="repeatPassword"
                            placeholder="Repeat Password"
                        />
                    </div>
                    <div className="flex items-start space-x-2 mt-2 ">
                        <Field type="checkbox" name="agree" className="w-6 h-6" />
                        <label htmlFor="agree" className="text-sm text-gray-700">
                            By clicking the 'Sign Up' button, you confirm that you accept our Terms of use and Privacy Policy.
                        </label>

                    </div>
                    <div className="h-5">
                        <ErrorMessage name="agree" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className='bg-[#005C53] cursor-pointer text-white flex mx-auto w-fit mt-10 rounded-full'>
                        <button type='submit' className='uppercase py-3 px-10 tracking-wider '>Sign up</button>
                    </div>
                </div>
            </Form>
        </Formik>
    )
}

export default SignupForm