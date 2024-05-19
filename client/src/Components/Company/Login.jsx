import React, { useEffect, useState } from 'react'
import img1 from '../../assets/loginimage.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginRequest, loginSuccess } from '../../features/UserSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../Layout/Loader';

export function Login() {
    const [mobile, setMobile] = useState();
    const [password, setPassword] = useState();
    const dispatch = useDispatch();
    const { loading, isAuthenticated } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const login = async (e) => {
        e.preventDefault();
        try {
            dispatch(loginRequest());
            const { data } = await axios.post("/api/v1/auth/company/login", { mobile, password });
            dispatch(loginSuccess(data.existingCompany))
            toast.success(data.message);
        } catch (error) {
            dispatch(loginFailure(error.response.data.message));
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
            {loading ? <div className='min-h-screen mt-10 flex justify-center items-center' ><Loader /></div> :
                <section className='min-h-screen mt-12'>
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="relative h-full min-h-screen md:flex hidden items-end px-4  pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8">
                            <div className="absolute inset-0">
                                <img
                                    className="h-full w-full  object-cover"
                                    src={img1}
                                    alt="Ship smarter with our courier aggregator system. Log in or sign up now."
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                            <div className="relative">
                                <div className="w-full max-w-xl xl:mx-auto xl:w-full xl:max-w-xl xl:pr-24">
                                    <h3 className="text-4xl font-bold text-white">
                                        Ship smarter with our courier aggregator system. Log in or sign up now.
                                    </h3>
                                    <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                                        <li className="flex items-center space-x-3">
                                            <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                                                <svg
                                                    className="h-3.5 w-3.5 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <span className="text-lg font-medium text-white"> real-time monitoring </span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                                                <svg
                                                    className="h-3.5 w-3.5 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <span className="text-lg font-medium text-white"> diverse shipping choices</span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                                                <svg
                                                    className="h-3.5 w-3.5 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <span className="text-lg font-medium text-white">premium service</span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                                                <svg
                                                    className="h-3.5 w-3.5 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <span className="text-lg font-medium text-white">Expedited shipping </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center px-0 py-4 mt-20 sm:mt-1 sm:px-6 sm:py-16 lg:px-3 lg:py-18">
                            <div className="lg:mx-auto lg:w-full lg:max-w-sm xl:max-w-md">
                                <h2 className="text-2xl font-bold leading-tight text-black sm:text-3xl">Sign in Delivery Partner</h2>

                                <form className="mt-8" onSubmit={login}>
                                    <div className="space-y-5">
                                        <div>
                                            <label htmlFor="email" className="text-base font-medium text-gray-900">
                                                {' '}
                                                Email{' '}
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                    type="email"
                                                    placeholder="Email"
                                                    pattern="[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                                                    title="Please enter a valid email address."
                                                    onChange={(e) => setMobile(e.target.value)}
                                                    required
                                                ></input>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="" className="text-base font-medium text-gray-900">
                                                    {' '}
                                                    Password{' '}
                                                </label>
                                                <a
                                                    href="#"
                                                    title=""
                                                    className="text-sm font-semibold text-black hover:underline"
                                                >
                                                    {' '}
                                                    Forgot password?{' '}
                                                </a>
                                            </div>
                                            <div className="mt-2">
                                                <input
                                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                    type="password"
                                                    placeholder="Password"
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
                                                value="log in"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>}
        </>
    )
}

export default Login;