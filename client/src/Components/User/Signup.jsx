import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img1 from '../../assets/signupimg.jpg';
import axios from "axios";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { registerFailure, registerRequest, registerSuccess } from "../../features/UserSlice"
import Loader from '../Layout/Loader';

export function Signup() {
  const [email, setEmail] = useState('');
  const [mobile, setmobile] = useState('');
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector(state => state.auth);


  const register = async (e) => {
    e.preventDefault();
    try {
      dispatch(registerRequest());
      const { data } = await axios.post("http://localhost:5000/api/v1/auth/register", { email, mobile, password, name });
      dispatch(registerSuccess(data.user))
      toast.success(data.message);
    } catch (error) {
      dispatch(registerFailure(error.response.data.message));
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  return (
    <>
      {loading ? (<div className='min-h-screen mt-10 flex justify-center items-center' ><Loader /></div>) :
        (<section className='min-h-screen mt-10'>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex items-center justify-center mt-10 sm:mt-1 px-2 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-10">
              <div className="lg:mx-auto lg:w-full lg:max-w-sm xl:max-w-md">
                <h2 className="text-2xl font-bold leading-tight text-black sm:text-3xl">Sign up</h2>
                <p className="mt-2 text-base text-gray-600">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="font-medium text-black transition-all duration-200 hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
                <form className="mt-8" onSubmit={register}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="text-base font-medium text-gray-900">
                        {' '}
                        Full Name{' '}
                      </label>
                      <div className="mt-1.5">
                        <input
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="text"
                          placeholder="Full Name"
                          id="name"
                          onChange={(e) => setName(e.target.value)}
                          required
                        ></input>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="text-base font-medium text-gray-900">
                        {' '}
                        Email address{' '}
                      </label>
                      <div className="mt-1.5">
                        <input
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="email"
                          placeholder="Email"
                          id="email"
                          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
                          title="Please enter a valid email address."
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        ></input>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="text-base font-medium text-gray-900">
                        {' '}
                        Mobile Number{' '}
                      </label>
                      <div className="mt-1.5">
                        <input
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="tel"
                          pattern='[1-9]{1}[0-9]{9}'
                          placeholder="Mobile"
                          id="mobile"
                          title="Mobile number should be 10 digits"
                          onChange={(e) => setmobile(e.target.value)}
                          required
                        ></input>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-base font-medium text-gray-900">
                          {' '}
                          Password{' '}
                        </label>
                      </div>
                      <div className="mt-1.5">
                        <input
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="password"
                          placeholder="Password"
                          id="password"
                          minLength={8}
                          title="Password should be at least 8 characters long"
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        ></input>
                      </div>
                    </div>
                    <div>
                      <input
                        type="submit"
                        className="inline-flex w-full items-center justify-center rounded-md bg-orange-600 px-3.5 py-2 sm:py-1 font-semibold leading-7 text-white hover:bg-orange-500 cursor-pointer"
                        value="Create Account"
                      />

                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="h-full w-full hidden md:block">
              <img
                className="mx-auto h-full w-full object-cover"
                src={img1}
                alt="yuiygugyu"
              />
            </div>
          </div>
        </section>)
      }
    </>)
}

export default Signup