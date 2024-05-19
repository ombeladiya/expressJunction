import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Sidebar_company = () => {
    const path=location.pathname;
  return (
    
       <div className='w-1/5 min-h-screen bg-slate-100 '>
        <br/>
        <div className='w-full flex flex-col -mt-6' >
        <span className={`w-full h-10 ${path === '/Company/dashboard' ? 'bg-gray-200' : ''} font-semibold  px-4 flex items-center`}><Link to='/company/dashboard'>Dashboard(Company)</Link></span>
        <span className={`w-full h-10 ${path === '/Company/centers' ? 'bg-gray-200' : ''} font-semibold  px-4 flex items-center`}><Link to='/company/City-Centers'>City Centers</Link></span>
        <span className={`w-full h-10 ${path === '/Company/orders' ? 'bg-gray-200' : ''} font-semibold  px-4 flex items-center`}><Link to='/company/orders'>Manage Orders</Link></span>
        
        </div>
    </div>
    
  )
}

export default Sidebar_company
