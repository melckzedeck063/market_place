import React, { useState } from 'react'
import bgImage from '../assets/images/food.png';
import { useForm } from 'react-hook-form';
import { Lock, PhoneCallIcon } from 'lucide-react';
import { useNavigate, useNavigation } from 'react-router';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/actions/user_actions';
export default function LoginPage() {

  const dispatch = useDispatch();
    const [succeed, setSucceed]  =  useState(false);
    const [failed, setFailed] = useState(false);
    const [loginMessage, setLoginMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, },
      } = useForm();
      const navigate = useNavigate();
      const [loading, setLoading] = useState(false);
    
      const onSubmit = async (data) => {

        try {
            // Clear existing token
            sessionStorage.removeItem('food_recipe');
            const response = await dispatch(loginUser(data));
            setLoading(true);
            
            const newToken = response.payload;
            console.log(newToken);
            if (newToken?.data?.token) {
                setSucceed(true)
                setFailed(false)
                setTimeout(() => {
                  setLoginMessage(newToken.message)
                  setSucceed(false);
                  setLoading(false)
                  navigate('/dashboard');
                    
                },4000)

            } else {
                setFailed(true)
                setLoginMessage(newToken.message)
                setSucceed(false);
                setLoading(false)
                setTimeout(() => {
                    setSucceed(false);
                },4000)
            }
        } catch (error){
            console.log(error)
        }

        
    };
    
  return (
    <div>
         <section class="text-gray-600 body-font relative font-poppins">
  <div class="containe mx-auto flex sm:flex-nowrap flex-wrap">
    <div class="lg:w-1/2 md:w-1/2 min-h-screen rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
       <img src={`${bgImage}`} alt="" />
       <div className="w-full h-full absolute inset-0 bg-orange-600 opacity-10"></div>
    </div>
    <div class="lg:w-1/2 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 p-16">
    <div className="flexx justify-center items-center">
       <h2 class="text-orange-600 text-3xl mb-1 font-bold title-font text-center mt-48">
        Access Your 
         
        Account
        </h2>
      <p class="leading-relaxed mb-5 text-gray-600 text-center font-light mt-1 text-sm">Enter your credentials to start manage and track your savings securely</p>

      <div className="mt-6">
      {
                                    succeed ? <div className='p-2 w-1/2 text-sm rounded-md bg-green-400 mx-auto text-white ' >{loginMessage}</div> : <></>
                                }
                                {
                                    failed ? <div className='p-2 w-1/2 text-sm rounded-md mx-auto bg-red-400 text-white'>{loginMessage}</div> : <></>
                                }
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-9/12 m-auto mt-10">
          <div className="mb-2 flex items-center justify-center border rounded-2xl pb-2">
            <PhoneCallIcon className='text-gray-600 mt-3 ml-2' />
            <input
            placeholder='username'
              type="text"
              {...register("username", {
                required: "username number is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/,
                  message: "username should be a valid email format",
                },
              })}              
              className="w-full px-4 py-2 mt-2 rounded-lg focus:outline-none"
            />
          </div>
            {errors.username && <p className="text-red-500 text-sm mb-4">{errors.username.message}</p>}
          <div className="mb-1 mt-4 flex border rounded-2xl pb-2">
            <Lock   className='text-gray-600 mt-3 ml-2'  />
            <input
            placeholder='Password'
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
              className="w-full px-4 py-2 mt-2  rounded-lg focus:outline-none bg-transparent"
            />
          </div>
            {errors.password && <p className="text-red-500 text-sm mb-4">{errors.password.message}</p>}
          <div className="text-gray-500 text-right hover:underline mb-6">
            <a href="/forgot">forgot password?</a>
          </div>
          <button
  type="submit"
  className="w-full px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600 flex justify-center items-center"
  disabled={loading}
>
  {loading ? (
    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
  ) : (
    "Login"
  )}
</button>

        </form>

       </div>
    </div>
  </div>
</section>
    </div>
  )
}
