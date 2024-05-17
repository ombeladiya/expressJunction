import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Trash } from 'lucide-react';

function AllOrders() {
    const [orders, setOrders] = useState();
    const [orderchanged, setorderchabged] = useState();
    const columns = [
        {
            field: 'userId',
            headerName: 'UserID',
            width: 200,
            editable: false,
        },
        {
            field: 'companyId',
            headerName: 'CompanyID',
            width: 210,
            editable: false,
        },
        {
            field: 'status',
            headerName: 'status',
            width: 170,
            editable: false,
        },
        {
            field: 'totalWeight',
            headerName: 'totalWeight',
            width: 95,
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 100,
        },
        {
            field: 'orderedAt',
            headerName: 'OrderedAt',
            width: 200,
        },
        {
            field: 'Delete',
            headerName: 'Delete',
            width: 50,
            renderCell: (params) => (
                <div className='flex gap-3'>
                    <button className='text-red-600' onClick={() => handleDelete(params.row)}><Trash size={18} /></button>
                </div>
            ),
        },

    ];

    const handleDelete = async (row) => {
        const isconfirm = confirm("Are you sure to delete this order?");
        if (!isconfirm) {
            return;
        }
        try {
            await axios.delete(`/api/v1/orders/deleteorder/${row._id}`).then((res) => {
                setOrders(orders.filter((el) => el !== row));
                toast.success("User Deleted Successfully");
                setorderchabged(Math.random());
            }).catch(err => { toast.error(err) });
        } catch (err) {
            toast.error(err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('/api/v1/orders/fetchallorders');
                setOrders(data.AllOrders);
            } catch (err) {
                toast.error("Error while fetching orders")
            }
        };
        fetchData();
    }, [orderchanged]);

    const getRowId = (row) => row._id;

    return (
        <div className='mt-14 flex flex-row'>
            <Sidebar />
            <div className='w-full'>
                <h2 className="text-3xl font-bold ml-6 mt-5">All Orders</h2>
                <div className='flex justify-center w-11/12 mt-8 ml-8'>

                    {orders && orders[0] && <DataGrid
                        rows={orders}
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
                    {!orders && !orders[0] && <div className='text-red-500 text-xl'>No Order Found!!</div>}
                </div>
            </div>

        </div>

    )
}

export default AllOrders
