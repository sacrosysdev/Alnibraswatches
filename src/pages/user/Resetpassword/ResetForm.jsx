import React from 'react'
import { Formik, Form } from 'formik'
import { InputFieldAuth } from '../../../components/user/InputFieldAuth';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { FaUserLarge } from "react-icons/fa6";

const ResetForm = () => {
    const validationSchema = Yup.object({

    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    });

    const initialValues = {
        email: "",


    };

    const onSubmit = async (values, { setSubmitting, resetForm }) => {   
        mutate(values); 
        setSubmitting(false); 
        resetForm();
      };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form>
                    <div className='py-5 xl:py-8 flex justify-between items-center'>
                        <h1 className='font-semibold text-xl'>Reset Password</h1>
                        <Link to="/login"><p className='text-[#005C53] text-base font-medium'>Login</p></Link>
                    </div>
    
    
                    <div className=' space-y-4'>
    
                        <div className='grid grid-cols-1'>
                            <InputFieldAuth
                                name="email"
                                placeholder="Enter your Email"
                                type = "email"
                                icon={<FaUserLarge />}
                            />
                        </div>
                        <div className='bg-[#005C53] text-white flex mx-auto w-fit mt-10 rounded-full'>
                            <button className='uppercase cursor-pointer py-3 px-10 tracking-wider'>SUBMIT</button>
                        </div>
                    </div>
                </Form>
            </Formik>
  )
}

export default ResetForm