import React, { useState, useEffect } from 'react';
import Sidebar_company from './Sidebar_company';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

const Center = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const [users, setUsers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEemail] = useState('');
    const [password, setPassword] = useState('');
    const [pincode, setPincode] = useState('');
    const [isUopen, setUopen] = useState(false);
    const [role, setRole] = useState('admin');
    const [userid, setUserid] = useState('');
    const [userChanged, setUserChanged] = useState(0);
    const [compID, setCompID] = useState(null);

    const columns = [
        { field: '_id', headerName: 'ID', width: 250 },
        {
            field: 'email',
            headerName: 'Email',
            width: 280,
            editable: false,
        },
        {
            field: 'pincode',
            headerName: 'Pincode',
            width: 120,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <div className='flex gap-3'>
                    <button className='text-red-600' onClick={() => handleDelete(params.row)}>
                        <Trash size={18} />
                    </button>
                </div>
            ),
        },
    ];

    const createUser = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/v1/auth/company/cityCenter/register', { email, password, pincode });
            setIsOpen(false);

            setUserChanged(userChanged + 1);
            toast.success(data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    const changeRole = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`/api/v1/auth/change-role/${userid}`, { role });
            setUopen(false);
            setUserChanged(userChanged + 1);
            toast.success(data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    const handleDelete = async (row) => {
        const isConfirm = confirm("Are you sure to delete this City Center?");
        if (!isConfirm) {
            return;
        }
        try {
            await axios.delete(`/api/v1/orders/deleteCenter/${row._id}`);
            setUsers(users.filter((el) => el._id !== row._id));
            toast.success("City-Center Deleted Successfully");
            setUserChanged(userChanged + 1);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    const fetchData = async () => {
        if (!compID) return;
        try {
            const { data } = await axios.get(`/api/v1/orders/getCenter/${compID}`);
            setUsers(data.centers);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    const initializeCompID = () => {
        if (user?.CompanyId) {
            setCompID(user.CompanyId);
        }
    };

    useEffect(() => {
        initializeCompID();
    }, [user]);

    useEffect(() => {
        if (compID) {
            fetchData();
        }
    }, [userChanged, compID]);

    const getRowId = (row) => row._id;

    return (
        <div className='mt-14 flex flex-row'>
            <Sidebar_company />
            <div className='w-full'>
                <h2 className="text-3xl font-bold ml-6 mt-5">All City Centers</h2>
                <div className='flex justify-center w-11/12 mt-8 ml-8'>
                    {users.length > 0 ? (
                        <DataGrid
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
                            disableRowSelectionOnClick
                        />
                    ) : (
                        <div className='text-red-500 text-xl'>No User Found!!</div>
                    )}
                </div>
                <div className='flex justify-end w-10/12 mt-8 ml-8'>
                    <button
                        className="border-red-500 justify-end border-[0.8px] hover:border-b-4 px-4 py-1 rounded-md block text-sm text-center"
                        onClick={() => setIsOpen(true)}
                    >
                        Add New City Center
                    </button>
                </div>
                {isOpen && (
                    <div className='w-screen bg-white h-screen absolute flex top-0 left-0 justify-center items-center'>
                        <div className="overflow-y-auto overflow-x-hidden justify-center items-center w-1/2 md:inset-0 h-[calc(100%-1rem)] max-h-full">
                            <div className="relative p-4 mt-12 w-full max-w-2xl max-h-full">
                                <div className="relative bg-white z-40 rounded-lg shadow">
                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                        <h3 className="text-xl font-semibold text-gray-900 ">
                                            ADD CITY CENTER
                                        </h3>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            type="button"
                                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                            data-modal-hide="default-modal"
                                        >
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    <div className="p-3 space-y-3">
                                        <form onSubmit={createUser}>
                                            <div className="mx-auto my-4 max-w-6xl md:my-6">
                                                <div className="overflow-hidden p-8 mt-8 sm:mt-3">
                                                    <div className="mt-6 gap-6 space-y-2 sm:grid sm:grid-cols-2 md:grid-cols-2 sm:space-y-0">
                                                        <div className="w-full">
                                                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
                                                                Email
                                                            </label>
                                                            <input
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1"
                                                                type="email"
                                                                placeholder="Enter E-mail"
                                                                id="email"
                                                                value={email}
                                                                onChange={(e) => setEemail(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="w-full">
                                                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="pincode">
                                                                Pincode
                                                            </label>
                                                            <input
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1"
                                                                type="text"
                                                                placeholder="Enter Pincode"
                                                                id="pincode"
                                                                pattern='[1-9]{1}[0-9]{5}'
                                                                title="Pincode should be 6 digits"
                                                                value={pincode}
                                                                onChange={(e) => setPincode(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="col-span-1 grid">
                                                            <div className="w-full">
                                                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
                                                                    Password
                                                                </label>
                                                                <input
                                                                    className="h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1"
                                                                    type="password"
                                                                    placeholder="Enter Password"
                                                                    id="password"
                                                                    value={password}
                                                                    onChange={(e) => setPassword(e.target.value)}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-end mt-6">
                                                        <button
                                                            type="submit"
                                                            className="inline-flex items-center px-4 py-2 bg-orange-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-orange-400 active:bg-orange-900 focus:outline-none focus:border-orange-900 focus:ring focus:ring-orange-300 disabled:opacity-25 transition"
                                                        >
                                                            Create city center
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {isUopen && (
                    <div className='w-screen bg-white h-screen absolute flex top-0 left-0 justify-center items-center'>
                        <div className="overflow-y-auto overflow-x-hidden justify-center items-center w-1/2 md:inset-0 h-[calc(100%-1rem)] max-h-full">
                            <div className="relative p-4 mt-12 w-full max-w-2xl max-h-full">
                                <div className="relative bg-white z-40 rounded-lg shadow">
                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                        <h3 className="text-xl font-semibold text-gray-900 ">
                                            CHANGE ROLE
                                        </h3>
                                        <button
                                            onClick={() => setUopen(false)}
                                            type="button"
                                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                            data-modal-hide="default-modal"
                                        >
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    <div className="p-3 space-y-3">
                                        <form onSubmit={changeRole}>
                                            <div className="mx-auto my-4 max-w-6xl md:my-6">
                                                <div className="overflow-hidden p-8 mt-8 sm:mt-3">
                                                    <div className="mt-6 gap-6 space-y-2 sm:grid sm:grid-cols-2 md:grid-cols-2 sm:space-y-0">
                                                        <div className="w-full">
                                                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="role">
                                                                Role
                                                            </label>
                                                            <select
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1"
                                                                id="role"
                                                                value={role}
                                                                onChange={(e) => setRole(e.target.value)}
                                                                required
                                                            >
                                                                <option value="admin">Admin</option>
                                                                <option value="user">User</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-end mt-6">
                                                        <button
                                                            type="submit"
                                                            className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring focus:ring-blue-300 disabled:opacity-25 transition"
                                                        >
                                                            Change Role
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Center;
