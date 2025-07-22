import React, { useState } from 'react';
import bgImage from '../assets/images/food.png';
import { useForm } from 'react-hook-form';
import { Lock, PhoneCallIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/actions/user_actions';
import { toast, ToastContainer } from 'react-toastify';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Processing login request ...");
    setLoading(true);
    try {
      sessionStorage.removeItem('food_recipe');
      
      const response = await dispatch(loginUser(data));
      const newToken = response.payload;

      if (newToken?.data?.token) {
        toast.update(toastId, {
              render: response?.payload?.message ?? "Successfully logged in",
              type: "success",
              isLoading: false,
              autoClose: 3000,
            });
        setTimeout(() => {
          navigate('/dashboard');
        }, 2500);
      } else {
        toast.update(toastId, {
              render: response?.payload?.message ?? "Login failed",
              type: "error",
              isLoading: false,
              autoClose: 3000,
            });
      }
    } catch (error) {
      console.error(error);
      toast.update(toastId, {
              render: error?.message ?? "Something went wrong",
              type: "error",
              isLoading: false,
              autoClose: 3000,
            });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-poppins">
      <ToastContainer />
      <section className="flex flex-wrap">
        {/* Left Image Section */}
        <div className="w-full md:w-1/2 min-h-screen relative hidden md:flex">
          <img src={bgImage} alt="Login Visual" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-orange-600 opacity-20"></div>
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-orange-600 text-center mb-2">Access Your Account</h2>
            <p className="text-center text-gray-600 text-sm mb-6">
              Enter your credentials to manage and track your restaurant securely.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Username Field */}
              <div className="flex items-center border rounded-lg px-3 py-4 bg-white shadow-sm">
                <PhoneCallIcon className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Username"
                  {...register('username', {
                    required: 'Username is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/,
                      message: 'Enter a valid email format',
                    },
                  })}
                  className="w-full outline-none bg-transparent"
                />
              </div>
              {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}

              {/* Password Field */}
              <div className="flex items-center border rounded-lg px-3 py-4 bg-white shadow-sm">
                <Lock className="text-gray-500 mr-2" />
                <input
                  type="password"
                  placeholder="Password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' },
                  })}
                  className="w-full outline-none bg-transparent"
                />
              </div>
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

              <div className="text-right text-sm mb-4 text-gray-500 hover:underline">
                {/* <a href="/forgot">Forgot password?</a> */}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 text-lg font-bold hover:bg-orange-600 text-white py-2 rounded-lg flex items-center justify-center"
              >
                {loading ? (
                  <div className="">Signing In</div>
                ) : (
                  'Sign In Now'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
