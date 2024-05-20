import React, { useEffect, useState } from 'react'


import axios from 'axios';
import { toast } from 'react-toastify';
import Sidebar_company from './Sidebar_company';



const Company_dashboard = () => {
    const [noOfUsers, setNoOfUsers] = useState(0);
    const [noOfOrders, setNoOfOrders] = useState(0);
    const [citycenter, setcitycenter] = useState(0);
    const [revenue, setReveneu] = useState(0);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('/api/v1/orders/dashboardData');
                setNoOfUsers(data.data?.cityCenterCount);
                setNoOfOrders(data.data?.totalOrders);
                setcitycenter(data.data.reachedOrdersCount);
                setReveneu(data.data.totalRevenue);
                // setDayVsUsers(data.data.dayvsuser);
                // setDayVsOrders(data.data.dayvsorders);
            } catch (err) {
                console.log(err)
                toast.error("Error while fetching Admin data")
            }
        };
        fetchData();
    })
  return (
    <div className='mt-14 flex flex-row'>
    <Sidebar_company />
    <div className='w-4/5 flex flex-col max-h-screen overflow-y-scroll'>
        <h2 className="text-3xl font-bold mx-auto mt-5">Dashboard</h2>
        <div className='flex flex-col sm:flex-row w-10/12 mx-auto my-8'>
            <div className='w-40 h-40 flex mx-auto flex-col bg-orange-400 text-white rounded-full justify-center items-center font-semibold'><span className='text-3xl' >{noOfUsers}</span><span className='mt-2'>City Centers</span> </div>
            <div className='w-40 h-40 flex flex-col mx-auto bg-blue-500 text-white rounded-full justify-center items-center font-semibold'><span className='text-3xl ' >{noOfOrders}</span><span className='mt-2'>Total Orders <br /></span> </div>
            <div className='w-40 h-40 flex flex-col mx-auto bg-gray-500 text-white rounded-full justify-center items-center font-semibold'><span className='text-3xl ' >{citycenter}</span><span className='mt-2 text-sm'>Orders Delivered <br /> </span> </div>
            <div className='w-40 h-40 flex flex-col mx-auto bg-violet-500 text-white rounded-full justify-center items-center font-semibold'><span className='text-3xl ' >{revenue}</span><span className='mt-2'>Total Revenue</span> </div>
        </div>
       
    </div>
    </div>
  )
}

export default Company_dashboard
