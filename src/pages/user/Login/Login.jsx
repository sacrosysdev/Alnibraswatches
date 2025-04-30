import React from 'react'
import LoginForm from './LoginForm'
import Logo from '../../../assets/images/navbar/alnibraslogo.png'

const Login = () => {
  return (
<div className='bg-[#F6F6F6] xl:pt-10'>
    <div className='xl:w-2/3 mx-auto grid grid-cols-1 px-5 md:px-10 xl:px-0 xl:grid-cols-12 py-20  '>
        <section className='col-span-5 bg-[#005C53] hidden xl:flex flex-col gap-6 items-center py-20 text-white'>
            <div className='border border-white rounded-full'>
            <div className='bg-white h-36 w-36 rounded-full m-1 relative'>
                    <img src={Logo} alt="logo"  className='absolute inset-0 m-auto p-2'/>
                </div>
            </div>
            <div>
                <h1 className='font-semibold uppercase text-xl'>CONNECT WITH US</h1>
            </div>
            <div >
                <p className='w-3/4 text-center mx-auto'>Register with us to explore and avail special offers on our wide range of products. Let's stay connected and engaged.</p>
            </div>
        </section>
        {/* Login Form Component */}
        <section className='col-span-7 bg-white p-5 xl:py-20 xl:px-10 '>
            <LoginForm/>
        </section>
    </div>
</div>
  )
}

export default Login