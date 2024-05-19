import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { toast } from 'react-toastify';

function AllCompany() {
    const [users, setUsers] = useState();
    const [isOpen, setisOpen] = useState(false);
    const [mobile, setMobile] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [logo, setLogo] = useState();
    const [price, setPrice] = useState();
    const [IFSC, setIFSC] = useState();
    const [accountNo, setaccountNo] = useState();
    const [address, setAddress] = useState();
    const [regNo, setregNo] = useState();
    const [userchanged, setuserchanged] = useState();

    const columns = [
        { field: '_id', headerName: 'ID', width: 200 },
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
            editable: false,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
            editable: false,
        },
        {
            field: 'mobile',
            headerName: 'Mobile',
            width: 100,
            editable: false,
        },
        {
            field: 'accountNo',
            headerName: 'accountNo',
            width: 130,
        },
        {
            field: 'IFSC',
            headerName: 'IFSC',
            width: 120,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 75,
            renderCell: (params) => (
                <div className='flex gap-3'>
                    <button className='text-red-600 flex' onClick={() => handleDelete(params.row)}><Trash className='mr-1' size={18} />Delete</button>
                </div>
            ),
        },
    ];

    const createuser = async (e) => {
        try {
            e.preventDefault();
            const { data } = await axios.post('/api/v1/auth/company/register', { email, password, name, mobile, logo, price, address, IFSC, accountNo, regNo });
            setisOpen(!isOpen);
            setuserchanged(Math.random());
            toast.success(data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const handleDelete = async (row) => {
        const isconfirm = confirm("Are you sure to delete this company?");
        if (!isconfirm) {
            return;
        }
        try {
            await axios.delete(`/api/v1/auth/company/delete/${row._id}`).then((res) => {
                setUsers(users.filter((el) => el !== row));
                toast.success("Company Deleted Successfully");
                setuserchanged(Math.random());
            }).catch(err => { toast.error(err) });
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('/api/v1/user/search/fetch-comapny');
                setUsers(data.companies);
            } catch (err) {
                toast.error("Error while fetching users")
            }
        };
        fetchData();
    }, [userchanged]);


    const getRowId = (row) => row._id;

    return (
        <div className='mt-14 flex flex-row'>
            <Sidebar />
            <div className='w-full'>
                <h2 className="text-3xl font-bold ml-6 mt-5">All Companies</h2>
                <div className='flex justify-center w-11/12 mt-8 ml-8'>

                    {users && <DataGrid
                        rows={users}
                        columns={columns}
                        getRowId={getRowId}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            },
                        }}
                        rowHeight={35}
                        components={{
                            header: {
                                cell: ({ column }) => (
                                    <div style={{ fontWeight: 'bold', fontSize: '0.8rem', lineHeight: 'normal', padding: '8px' }}>
                                        {column.headerName}
                                    </div>
                                ),
                            },
                        }}
                        disableRowSelectionOnClick
                    />}
                    {!users && <div className='text-red-500 text-xl'>No Company Found!!</div>}
                </div>
                <div className='flex justify-end w-10/12 mt-8 ml-8'>
                    <button className="border-red-500 justify-end border-[0.8px] hover:border-b-4 px-4 py-1 rounded-md block text-sm text-center"
                        onClick={() => setisOpen(!isOpen)}
                    >Add New Company</button>
                </div>
                {isOpen && <div className='w-screen bg-white h-screen absolute flex top-0 left-0 justify-center items-center'>
                    <div className="overflow-y-hidden   overflow-x-hidden justify-center items-center w-3/4 md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div className="relative p-4 mt-12 w-full max-w-5xl max-h-full">
                            <div className="relative bg-white z-40 rounded-lg shadow">
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 ">
                                        REGISTER COMPANY
                                    </h3>
                                    <button onClick={() => setisOpen(!isOpen)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-6 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>

                                <div className="p-3 space-y-3">
                                    <form onSubmit={createuser}>
                                        <div className="mx-auto my-4 max-w-5xl md:my-0">
                                            <div className="overflow-hidden p-8 mt-8 sm:mt-3">
                                                <div className="mt-6 gap-6 space-y-2 sm:grid sm:grid-cols-3 md:grid-cols-3 sm:space-y-0">
                                                    <div className="w-full">
                                                        <label
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            htmlFor="firstName"
                                                        >
                                                            Company Name
                                                        </label>
                                                        <input
                                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            type="text"
                                                            placeholder="Enter Company's Name"
                                                            id="Name"
                                                            value={name}
                                                            onChange={e => setName(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="w-full">
                                                        <label
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            htmlFor="Mobile"
                                                        >
                                                            Mobile Number
                                                        </label>
                                                        <input
                                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            type="tel"
                                                            placeholder="Enter Company's Mobile"
                                                            id="mobile"
                                                            pattern='[1-9]{1}[0-9]{9}'
                                                            title="Mobile number should be 10 digits"
                                                            value={mobile}
                                                            onChange={e => setMobile(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-span-1 grid">
                                                        <div className="w-full">
                                                            <label
                                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                                htmlFor="email"
                                                            >
                                                                Email Address
                                                            </label>
                                                            <input
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                type="email"
                                                                placeholder="Enter Company's Email"
                                                                value={email}
                                                                onChange={e => setEmail(e.target.value)}
                                                                id="email"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-1 grid">
                                                        <div className="w-full">
                                                            <label
                                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                                htmlFor="password"
                                                            >
                                                                Password
                                                            </label>
                                                            <input
                                                                className="h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                type="text"
                                                                placeholder="Enter Company's Password"
                                                                minLength={8}
                                                                title="Password should be at least 8 characters long"
                                                                value={password}
                                                                onChange={e => setPassword(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-1 grid">
                                                        <div className="w-full">
                                                            <label
                                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                                htmlFor="password"
                                                            >
                                                                Account No.
                                                            </label>
                                                            <input
                                                                className="h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                type="number"
                                                                placeholder="Enter Bank Account Number"
                                                                value={accountNo}
                                                                onChange={e => setaccountNo(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-1 grid">
                                                        <div className="w-full">
                                                            <label
                                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                                htmlFor="password"
                                                            >
                                                                IFSC Code
                                                            </label>
                                                            <input
                                                                className="h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                type="text"
                                                                placeholder="Enter Bank's IFSC Code"
                                                                value={IFSC}
                                                                onChange={e => setIFSC(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-1 grid">
                                                        <div className="w-full">
                                                            <label
                                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                                htmlFor="password"
                                                            >
                                                                Price per Gram
                                                            </label>
                                                            <input
                                                                className="h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                type="number"
                                                                placeholder="Enter Price"
                                                                value={price}
                                                                onChange={e => setPrice(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-1 grid">
                                                        <div className="w-full">
                                                            <label
                                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                                htmlFor="password"
                                                            >
                                                                Register No.
                                                            </label>
                                                            <input
                                                                className="h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                type="number"
                                                                placeholder="Enter Register Number"
                                                                value={regNo}
                                                                onChange={e => setregNo(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-1 grid">
                                                        <div className="w-full">
                                                            <label
                                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                                htmlFor="password"
                                                            >
                                                                Address
                                                            </label>
                                                            <input
                                                                className="h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                type="text"
                                                                placeholder="Enter Company Address"
                                                                value={address}
                                                                onChange={e => setAddress(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-1 grid">
                                                        <div className="w-full">
                                                            <label
                                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                                htmlFor="password"
                                                            >
                                                                Logo Url
                                                            </label>
                                                            <input
                                                                className="h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                type="url"
                                                                placeholder="Enter Company logo url"
                                                                value={logo}
                                                                onChange={e => setLogo(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                            <button type="submit" className="text-white bg-orange-500  font-medium rounded-md text-sm px-5 py-2.5 text-center hover:opacity-75">Register</button>
                                            <button type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => setisOpen(!isOpen)}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}

            </div>
        </div>
    )
}

export default AllCompany
