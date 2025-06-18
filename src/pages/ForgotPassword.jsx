import React from 'react'
import bgImage from '../assets/images/login.png';
import { useForm } from 'react-hook-form';
import { Lock, PhoneCallIcon } from 'lucide-react';
export default function ForgotPassword() {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const onSubmit = (data) => {
        console.log("Login Data:", data);
      };
  return (
    <div>
         <section class="text-gray-600 body-font relative font-poppins">
  <div class="containe mx-auto flex sm:flex-nowrap flex-wrap">
    <div class="lg:w-1/2 md:w-1/2 min-h-screen rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
       <img src={`${bgImage}`} alt="" />
       <div className="w-full h-full absolute inset-0 bg-teal-600 opacity-50"></div>
    </div>
    <div class="lg:w-1/2 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 p-16">
    <div className="flexx justify-center items-center">
       <h2 class="text-gray-900 text-3xl mb-1 font-bold title-font text-center mt-48">
        Access Your 
        <span className="text-teal-600"> SACCOSS </span>
         
        Account
        </h2>
      <p class="leading-relaxed mb-5 text-gray-600 text-center font-light mt-1 text-sm">Enter your phone number for OTP verification</p>

      <form onSubmit={handleSubmit(onSubmit)} className="w-9/12 m-auto mt-16">
          <div className="mb-1 flex items-center justify-center border rounded-2xl pb-2">
            <PhoneCallIcon className='text-gray-600 mt-3 ml-2' />
            <input
            placeholder='Phone number'
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Invalid phone number",
                },
              })}
              className="w-full px-4 py-2 mt-2 rounded-lg focus:outline-none"
            />
          </div>
            {errors.phone && <p className="text-red-500 text-sm mb-4">{errors.phone.message}</p>}
          
          <button
            type="submit"
            className="w-full px-4 py-4 mt-6 text-white bg-teal-600 rounded-lg hover:bg-teal-700"
          >
            Submit
          </button>
        </form>

       </div>
    </div>
  </div>
</section>
    </div>
  )
}
