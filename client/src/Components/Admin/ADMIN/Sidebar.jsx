import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
    const path=location.pathname;
  return (
    <div className='w-1/5 min-h-screen bg-slate-100 '>
        <br/>
        <div className='w-full flex flex-col -mt-6' >
        <span className={`w-full h-10 ${path === '/admin/dashboard' ? 'bg-gray-200' : ''} font-semibold  px-4 flex items-center`}><Link to='/admin/dashboard'>Dashboard(Admin)</Link></span>
        <span className={`w-full h-10 ${path === '/admin/company' ? 'bg-gray-200' : ''} font-semibold  px-4 flex items-center`}><Link to='/admin/allcompany'>Manage Company</Link></span>
        <span className={`w-full h-10 ${path === '/admin/allusers' ? 'bg-gray-200' : ''} font-semibold  px-4 flex items-center`}><Link to='/admin/allusers'>Manage User</Link></span>
        <span className={`w-full h-10 ${path === '/admin/allorders' ? 'bg-gray-200' : ''} font-semibold  px-4 flex items-center`}><Link to='/admin/allorders'>Manage Orders</Link></span>
        <span className={`w-full h-10 ${path === '/admin/users' ? 'bg-gray-200' : ''} font-semibold px-4 flex items-center`}><Link to='/admin/users'>Manage Payment</Link></span>
        </div>
    </div>
  )
}

export default Sidebar
