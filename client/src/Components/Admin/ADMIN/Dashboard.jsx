import React from 'react'
import Sidebar from './Sidebar'
import { Chart } from "react-google-charts";

export const data = [
    [
        "Day",
        "Number of User",
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
    ["Samsung", 300],
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
    colors: ["#0601FF"],
    curveType: 'function'
};

export const data4 = [
    ["Year", "Revenue", "Expenses", "Profit"],
    ["2020", 1000, 400, 200],
    ["2021", 1170, 460, 250],
    ["2022", 660, 1120, 300],
    ["2023", 1030, 540, 350],
];

export const options4 = {
    chart: {
        title: "Company Performance",
        subtitle: "Revenue, Expenses, and Profit: 2020-2023",
    },
    colors: ["#088691", "#FF6400", "#6B48D4"],
};

function Dashboard() {
    return (
        <div className='mt-14 flex flex-row'>
            <Sidebar />
            <div className='w-4/5 flex flex-col max-h-screen overflow-y-scroll'>
                <h2 className="text-3xl font-bold mx-auto mt-5">Dashboard</h2>
                <div className='flex flex-col sm:flex-row w-10/12 mx-auto my-8'>
                    <div className='w-40 h-40 flex mx-auto flex-col bg-orange-400 text-white rounded-full justify-center items-center font-semibold'><span className='text-3xl' >2M+</span><span className='mt-2'>User</span> </div>
                    <div className='w-40 h-40 flex flex-col mx-auto bg-gray-500 text-white rounded-full justify-center items-center font-semibold'><span className='text-3xl ' >289+</span><span className='mt-2 text-sm'>Delivery <br /> Partner</span> </div>
                    <div className='w-40 h-40 flex flex-col mx-auto bg-blue-500 text-white rounded-full justify-center items-center font-semibold'><span className='text-3xl ' >8.2M+</span><span className='mt-2'>Order <br />Delivered</span> </div>
                    <div className='w-40 h-40 flex flex-col mx-auto bg-violet-500 text-white rounded-full justify-center items-center font-semibold'><span className='text-3xl ' >₹47.8M+</span><span className='mt-2'>Total Revenue</span> </div>
                </div>
                <div className='flex justify-center w-3/4 mt-8 mx-auto'>
                    <Chart
                        chartType="Line"
                        width="100%"
                        height="300px"
                        data={data}
                        options={options}
                    />
                </div>
                <div className='flex justify-center w-3/4 mt-8 mx-auto'>
                    <Chart
                        chartType="Line"
                        width="100%"
                        height="300px"
                        data={data3}
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
