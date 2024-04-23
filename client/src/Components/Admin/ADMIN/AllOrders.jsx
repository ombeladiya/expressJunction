import React from 'react'
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';

function AllOrders() {

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'UserID',
            headerName: 'UserID',
            width: 150,
            editable: false,
        },
        {
            field: 'CompanyID',
            headerName: 'CompanyID',
            width: 150,
            editable: false,
        },
        {
            field: 'status',
            headerName: 'status',
            width: 110,
            editable: false,
        },
        {
            field: 'OrderedAt',
            headerName: 'OrderedAt',
            width: 160,
        },
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
        { id: 10, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
        { id: 10, lastName: 'Frances', firstName: 'Rossini', age: 36 }
    ];

    return (
        <div className='mt-14 flex flex-row'>
            <Sidebar />
            <div className='w-4/5'>
                <h2 className="text-3xl font-bold ml-6 mt-5">All Orders</h2>
                <div className='flex justify-center w-10/12 mt-8 ml-8'>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            },
                        }}
                        rowHeight={25}
                        disableRowSelectionOnClick
                    />
                </div>
            </div>

        </div>

    )
}

export default AllOrders
