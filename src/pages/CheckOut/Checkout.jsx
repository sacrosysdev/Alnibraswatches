import React from 'react'
import Header from './Header'
import CheckOutForm from './CheckOutForm'
import PaymentSection from './PaymentSection'
import PlaceOrder from './PlaceOrder'
import { checkOutValidation } from '../../utils/YupValidationSchema';
import { Formik, Form } from 'formik'

const Checkout = () => {
  
  const initialValues= {
      fullName: "",
      phone: "",
      pincode: "",
      houseNo: "",
      roadName:"",
      city:"",
      state: "",
      landmark: "",
  };
  
  const onSubmit = async  (values, { setSubmitting }) => {
      try {
          console.log(values);
      } catch (error) {
          console.error(error);
      } finally {
          setSubmitting(false);
      }
  }
  return (
    <Formik initialValues={initialValues} validationSchema={checkOutValidation} onSubmit={onSubmit}>
      <Form>
    <div className='w-full py-20'>
        <div className='grid grid-cols-1 xl:grid-cols-3 gap-6 items-start mx-auto px-5 md:w-[80%]'>

            <div className='col-span-1 xl:col-span-2'>
                <Header/>
                <CheckOutForm/>
                <PaymentSection/>
            </div>
            <div className='col-span-1 border w-full rounded-2xl border-[#A5B2BA]'>
                <PlaceOrder/>
            </div>
        </div>
    </div>
    </Form>
    </Formik>
  )
}

export default Checkout