import React from 'react'
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';

function AllUsers() {

    const columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        {
            field: 'Name',
            headerName: 'Name',
            width: 200,
            editable: false,
        },
        {
            field: 'Email',
            headerName: 'Email',
            width: 200,
            editable: false,
        },
        {
            field: 'Mobile',
            headerName: 'Mobile',
            type: 'number',
            width: 150,
            editable: false,
        },
        {
            field: 'Role',
            headerName: 'Role',
            width: 120,
        },
    ];

    const rows = [
        { id: "dghsghjt33gh64tygsds", Name: 'Om Beladiya', Email: 'ombeladia@gmail.com', Mobile: 7990845663, Role: "Admin" },
        { id: "3rr5dghsghjt33gh64ty45", Name: 'Pari Patel', Email: 'paripatel@gmail.com', Mobile: 7989888884, Role: "Admin" },
        { id: "b7hdghsghjt33gh64tyyh", Name: 'Darhsan Bhensdadia', Email: 'darshan@gmail.com', Mobile: 9590845663, Role: "Admin" },
    ];
    return (
        <div className='mt-14 flex flex-row'>
            <Sidebar />
            <div className='w-4/5'>
                <h2 className="text-3xl font-bold ml-6 mt-5">All Users</h2>
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
                        components={{
                            header: {
                                // Adjust header styling
                                cell: ({ column }) => (
                                    <div style={{ fontWeight: 'bold', fontSize: '0.8rem', lineHeight: 'normal', padding: '8px' }}>
                                        {column.headerName}
                                    </div>
                                ),
                            },
                        }}
                        disableRowSelectionOnClick
                    />
                </div>
            </div>

        </div>

    )
}

export default AllUsers
