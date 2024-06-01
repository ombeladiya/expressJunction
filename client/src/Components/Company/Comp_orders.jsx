import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FilePenLine } from 'lucide-react';
import Sidebar_company from './Sidebar_company';
import { Modal, Button, MenuItem, Select } from '@mui/material';

const Comp_orders = () => {
    const [orders, setOrders] = useState();
    const [orderChanged, setOrderChanged] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [newStatus, setNewStatus] = useState('Confirmed'); // Default to "Confirmed"

    const columns = [
        { field: '_id', headerName: 'OrderId', width: 250, editable: false },
        { field: 'status', headerName: 'Status', width: 170, editable: false },
        { field: 'totalWeight', headerName: 'Total Weight', width: 95 },
        { field: 'price', headerName: 'Price', width: 100 },
        { field: 'orderedAt', headerName: 'Ordered At', width: 200 },
        {
            field: 'UpdateStatus', headerName: 'Update Status', width: 150,
            renderCell: (params) => (
                <Button
                    onClick={() => handleOpenModal(params.row)}
                >
                    <FilePenLine size={18} />
                </Button>
            ),
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('/api/v1/orders/fetchcompanyorders');
                setOrders(data.allCompanyOrders);
            } catch (err) {
                toast.error(err.response.data.message);
            }
        };
        fetchData();
    }, [orderChanged]);

    const getRowId = (row) => row._id;

    const handleOpenModal = (order) => {
        setSelectedOrder(order);
        setNewStatus('Confirmed'); // Set default value to "Confirmed"
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedOrder(null);
        setNewStatus('');
    };

    const handleUpdateStatus = async () => {
        try {
            await axios.post(`/api/v1/orders/change-status/${selectedOrder._id}`, { status: newStatus });
            toast.success("Order status updated successfully");
            setOrderChanged(!orderChanged);
            handleCloseModal();
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    return (
        <div className='mt-14 flex flex-row'>
            <Sidebar_company />
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
                    {(!orders || !orders[0]) && <div className='text-red-500 text-xl'>No Order Found!!</div>}
                </div>
            </div>

            {/* Modal for updating order status */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="update-order-status"
                aria-describedby="modal-to-update-order-status"
                className="flex items-center justify-center"
            >
                <div className="bg-white rounded-lg shadow-lg p-6 w-2/5">
                    <h2 className="text-xl font-bold mb-4">Update Order Status</h2>
                    <Select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        displayEmpty
                        className="w-full mb-4 border-black"
                        size="small"
                        variant="outlined"
                        sx={{ border: 1 }}
                        
                    >
                        <MenuItem value="Confirmed" selected>Confirmed</MenuItem>
                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                        <MenuItem value="Reached">Reached</MenuItem>
                    </Select>
                    <div className="flex justify-end">
                        <button
                            className="bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded mr-2"
                            variant="outlined"
                            onClick={handleUpdateStatus}
                        >
                            Update
                        </button>
                        <button
                            className="bg-zinc-300 px-4 py-2 rounded hover:bg-zinc-400"
                            variant="outlined"
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Comp_orders;
