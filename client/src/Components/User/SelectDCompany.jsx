import React, { useEffect, useState } from 'react'
import { Home, ChevronRight, PackageCheck } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function SelectDCompany() {
    const navigate = useNavigate();
    const [company, setCompany] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [companyId, setCompanyId] = useState();
    const { isAuthenticated } = useSelector(state => state.auth);

    const toggleModal = (id) => {
        if (!isOpen) {
            setCompanyId(id);
        }
        setIsOpen(!isOpen);
    };

    const placeorder = async () => {
        try {
            const sourceId = localStorage.getItem("sourceId");
            const destinationId = localStorage.getItem("destinationId");
            const items = JSON.parse(localStorage.getItem('items'));
            const { data } = await axios.post("/api/v1/orders/place-order", { items, sourceId, destinationId, companyId });
            toast.success(data.message);
            navigate("/user/dashboard");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const secondExample = {
        size: 20,
        edit: false,
        color: "black",
        activeColor: "orange",
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login")
        }
        async function getcompany() {
            try {
                const from = localStorage.getItem("from");
                const to = localStorage.getItem("to");
                const weight = localStorage.getItem("weight");
                const { data } = await axios.post("/api/v1/user/search/company-listing", { from, to, weight });
                setCompany(data.totalPriceByCompany);
            } catch (err) {
                toast.error(err.response.data.message);
            }
        }
        getcompany();
    }, [isAuthenticated])
    return (
        <div>
            <div className="mx-auto w-full min-h-screen bg-slate-100 py-2">
                <div className="mx-auto my-4 max-w-6xl md:my-6">
                    <nav className="mt-16 sm:flex hidden" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <span
                                    className="ml-1 inline-flex text-sm font-medium text-green-600  md:ml-2"
                                >
                                    <Home size={16} className="mr-2 text-green-600" />
                                    Riceiver's Information
                                </span>
                            </li>

                            <li >
                                <div className="flex items-center">
                                    <ChevronRight size={16} className="mr-2 text-green-600" />
                                    <span
                                        className="ml-1 text-sm font-medium text-green-600  md:ml-2"
                                    >
                                        Sender's Information
                                    </span>
                                </div>
                            </li>
                            <li >
                                <div className="flex items-center">
                                    <ChevronRight size={16} className="mr-2 text-green-600" />
                                    <span
                                        className="ml-1 text-sm font-medium text-green-600 md:ml-2"
                                    >
                                        Parcel Details
                                    </span>
                                </div>
                            </li>
                            <li >
                                <div className="flex items-center">
                                    <ChevronRight size={16} className="mr-2 text-gray-600" />
                                    <span
                                        className="ml-1 text-sm font-medium text-green-600  md:ml-2"
                                    >
                                        Select Delivery Company
                                    </span>
                                </div>
                            </li>
                            <li >
                                <div className="flex items-center">
                                    <ChevronRight size={16} className="mr-2 text-gray-600" />
                                    <span
                                        className="ml-1 text-sm font-medium text-gray-900  md:ml-2"
                                    >
                                        Confirmation
                                    </span>
                                </div>
                            </li>

                        </ol>
                    </nav>

                    <div className="overflow-hidden rounded-sm bg-white p-8 sm:shadow mt-8 sm:mt-3">
                        <div className="mb-4 flex items-center rounded-lg py-2">
                            <div className="mr-2 rounded-full bg-gray-100  p-2 text-black">
                                <PackageCheck size={20} />
                            </div>
                            <div className="flex flex-1">
                                <p className="text-xl font-medium">
                                    Choose Delivery Partner
                                </p>
                            </div>
                        </div>
                        <div >
                            <div className="mt-6 space-y-2 ">
                                <div className="w-full py-3 sm:grid sm:grid-cols-2 sm:px-3 gap-4 space-y-2">
                                    {company ? company.map((cmp, key) =>
                                        <div className='flex flex-row cursor-pointer bg-gray-100 p-2 sm:py-4 rounded-sm items-center justify-center sm:justify-start border-2 border-white hover:border-gray-300' onClick={() => toggleModal(cmp.companyId)} key={cmp.companyId}>
                                        <img
                                            className='w-20 h-16 sm:w-28 sm:h-20 mix-blend-multiply'
                                                src={cmp.companyLogo}
                                                alt={cmp.companyName} />
                                        <div className='px-4'>
                                                <h2 className='text-sm sm:text-md font-semibold'>{cmp.companyName}</h2>
                                                <ReactStars {...secondExample} value={cmp.avgRating} /> <span className='text-sm'>{(key + cmp.totalPrice) * 7} reviews</span>
                                                <p className='font-semibold text-md mt-2 sm:mt-4'>₹{cmp.totalPrice}/-</p>
                                            </div>
                                        </div>) : <div className='text-rose-500'>Sorry No company providing delivery services at this location.</div>}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <div className="relative bg-white rounded-lg p-8">
                            <div className="absolute top-1 right-1">
                                <button
                                    className="text-gray-700 hover:text-gray-900"
                                    onClick={() => toggleModal(companyId)}
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="text-lg font-semibold mb-4">Are you Sure for Confirm Order?</div>
                            <div className='w-full flex'>
                                <button className='bg-green-600 mx-2 text-white text-sm px-4 py-1 rounded-sm border-none' onClick={() => placeorder()}>
                                    Yes
                                </button>
                                <button className='bg-red-600 mx-2 text-white text-sm px-4 py-1 rounded-sm border-none' onClick={() => toggleModal(null)}>
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SelectDCompany
