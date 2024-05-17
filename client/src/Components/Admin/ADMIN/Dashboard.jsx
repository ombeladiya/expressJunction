import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Chart } from "react-google-charts";
import axios from 'axios';


export const options = {
    chart: {
        title: "Day vs. Number of users",
        subtitle: "in millions",
    },
    colors: ["#FF6400"]
};

export const data2 = [
    ["Company", "Orders (in millions)"],
    ["Delhivary", 13],
    ["Fedex", 83],
    ["Amazon", 1.4],
    ["ekart", 2.3],
    ["Gillete", 46],
    ["Amazon", 300],
    ["boat", 38],
    ["Kashmiri", 5.5],
    ["Konkani", 5],
    ["Maithili", 20],
    ["huil", 33],
    ["Manipuri", 1.5],
    ["lenskart", 72],
    ["Nepali", 2.9],
    ["Oriya", 33],
    ["byzu", 29],
    ["Sanskrit", 0.01],
    ["Santhali", 6.5],
    ["Sindhi", 2.5],
    ["Aakash", 61],
    ["Zoho", 74],
    ["setpi", 52],
];

export const options2 = {
    title: "Company Wise Orders",
    legend: "none",
    pieSliceText: "label",
    slices: {
        4: { offset: 0.2 },
        12: { offset: 0.3 },
        14: { offset: 0.4 },
        15: { offset: 0.5 },
    },
};

export const data3 = [
    [
        "Day",
        "Number of Orders",
    ],

    [14, 37],
    [13, 30],
    [12, 25],
    [11, 11],
    [10, 11],
    [9, 11],
    [8, 10],
    [7, 10],
    [6, 7],
    [5, 6],
    [4, 4],
    [3, 4],
    [2, 4],
    [1, 2],
];

export const options3 = {
    chart: {
        title: "Day vs. Number of Orders",
        subtitle: "in millions",
    },
    colors: ["#0601FF"]
};

export const data4 = [
    ["Year", "Revenue", "Expenses", "Profit"],
    ["2024", 363600, 258000, 105600],
    ["2025", 0, 0, 0],
    ["2026", 0, 0, 0],
    ["2027", 0, 0, 0],
];

export const options4 = {
    chart: {
        title: "Company Performance",
        subtitle: "Revenue, Expenses, and Profit: 2024-2027",
    },
    colors: ["#088691", "#FF6400", "#6B48D4"],
};



function Dashboard() {
    const [noOfUsers, setNoOfUsers] = useState(0);
    const [noOfOrders, setNoOfOrders] = useState(0);
    const [citycenter, setcitycenter] = useState(0);
    const [revenue, setReveneu] = useState(0);
    const [dayvsuser, setDayVsUsers] = useState();
    const [dayVsOrders, setDayVsOrders] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('/api/v1/orders/admindata');
                setNoOfUsers(data.data.users);
                setNoOfOrders(data.data.orders);
                setcitycenter(data.data.citycenter);
                setReveneu(data.data.revenue);
                setDayVsUsers(data.data.dayvsuser);
                setDayVsOrders(data.data.dayvsorders);
            } catch (err) {
                toast.error("Error while fetching Admin data")
            }
        };
        fetchData();
    })
    return (
        <div className='mt-14 flex flex-row'>
            <Sidebar />
            <div className='w-4/5 flex flex-col max-h-screen overflow-y-scroll'>
                <h2 className="text-3xl font-bold mx-auto mt-5">Dashboard</h2>
                <div className='flex flex-col sm:flex-row w-10/12 mx-auto my-8'>
                    <div className='w-40 h-40 flex mx-auto flex-col bg-orange-400 text-white rounded-full justify-center items-center font-semibold'><span className='text-3xl' >{noOfUsers}</span><span className='mt-2'>Users</span> </div>
                    <div className='w-40 h-40 flex flex-col mx-auto bg-gray-500 text-white rounded-full justify-center items-center font-semibold'><span className='text-3xl ' >{citycenter}</span><span className='mt-2 text-sm'>Delivery <br /> Partner</span> </div>
                    <div className='w-40 h-40 flex flex-col mx-auto bg-blue-500 text-white rounded-full justify-center items-center font-semibold'><span className='text-3xl ' >{noOfOrders}</span><span className='mt-2'>Order <br />Delivered</span> </div>
                    <div className='w-40 h-40 flex flex-col mx-auto bg-violet-500 text-white rounded-full justify-center items-center font-semibold'><span className='text-3xl ' >{revenue}</span><span className='mt-2'>Total Revenue</span> </div>
                </div>
                <div className='flex justify-center w-3/4 mt-8 mx-auto'>
                    <Chart
                        chartType="Line"
                        width="100%"
                        height="300px"
                        data={dayvsuser}
                        options={options}
                    />
                </div>
                <div className='flex justify-center w-3/4 mt-8 mx-auto'>
                    <Chart
                        chartType="Line"
                        width="100%"
                        height="300px"
                        data={dayVsOrders}
                        options={options3}
                    />
                </div>
                <div className='flex justify-center w-3/4 mt-8 mx-auto'>
                    <Chart
                        chartType="Bar"
                        width="100%"
                        height="300px"
                        data={data4}
                        options={options4}
                    />
                </div>
                <div className='flex justify-center w-3/4 mt-8 mx-auto'>
                    <Chart
                        chartType="PieChart"
                        data={data2}
                        options={options2}
                        width={"100%"}
                        height={"400px"}
                    />
                </div>


            </div>
        </div>
    )
}

export default Dashboard
