import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logout } from '../../features/UserSlice'

function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout2 = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/logout");
      dispatch(logout())
      toast.success(data.message);
      navigate('/login');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <div>
      <header className='w-full h-14 bg-white  flex justify-between shadow-md fixed top-0 z-50'>
        <div className='-my-3 sm:mx-6 mx-1'>
          <Link to='/'> <img src='/logo.png' className='w-36 h-20' alt="express junction" /></Link>
        </div>
        <div>
          <ul className='flex px-4 py-4'>
            <li className='mx-4 text-sm hover:text-zinc-700 hidden sm:block'><Link to='/'>About</Link></li>
            <li className='mx-4 text-sm hover:text-zinc-700 hidden sm:block'><Link to='/contact'>Contact</Link></li>

            {isAuthenticated && (user.role === 'user') && <li className='mx-4 text-sm hover:text-zinc-700 hidden sm:block'><Link to='/user/dashboard'>MyOrder</Link></li>}
            {isAuthenticated && (user.role === 'user') && <li className='mx-4 text-sm hover:text-zinc-700 hidden sm:block'><Link to='/addorder'>AddOrder</Link></li>}
            {isAuthenticated && user.role === 'admin' && <li className='mx-4 text-sm hover:text-zinc-700 hidden sm:block'><Link to='/admin/dashboard'>Dashboard</Link></li>}
            {isAuthenticated && user.role === 'city' && <li className='mx-4 text-sm hover:text-zinc-700 hidden sm:block'><Link to='/citycenter/scanner'>Add Parcel</Link></li>}
            {/* {isAuthenticated && user.role === 'city' && <li className='mx-4 text-sm hover:text-zinc-700 hidden sm:block'><Link to='/citycenter/orders'>All Orders</Link></li>} */}
            {isAuthenticated && user.role === 'city' && <li className='mx-4 text-sm hover:text-zinc-700 hidden sm:block'><Link to='/citycenter/dashboard'>Agents</Link></li>}
            {isAuthenticated && user.role === 'agent' && <li className='mx-4 text-sm hover:text-zinc-700 hidden sm:block'><Link to='/agent/dashboard'>Dashboard</Link></li>}
            {isAuthenticated && user.role === 'agent' && <li className='mx-4 text-sm hover:text-zinc-700 hidden sm:block'><Link to='/agent/scanner'>Scanner</Link></li>}
            {isAuthenticated && user.role === 'company' && <li className='mx-4 text-sm hover:text-zinc-700 hidden sm:block'><Link to='/company/dashboard'>Dashboard</Link></li>}
            {isAuthenticated && <li className='mx-4 text-sm hover:text-zinc-700 hidden sm:block'><Link to='/profile'>Profile</Link></li>}

            {!isAuthenticated && <li className='mx-2 sm:mx-4 -my-1 text-sm'><Link to='/login'> <button
              type="button"
              className="rounded-md border border-orange-600 px-4 py-1 text-sm font-semibold text-orange-600 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 hover:border-orange-700"
            >
              Login
            </button></Link></li>}
            {isAuthenticated && <li className='mx-2 sm:mx-4 -my-1 text-sm' onClick={() => logout2()}> <button
              type="button"
              className="rounded-md border border-orange-600 px-4 py-1 text-sm font-semibold text-orange-600 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 hover:border-orange-700"
            >
              LogOut
            </button></li>}
            {!isAuthenticated && <li className='mx-0 -my-1 text-sm sm:block hidden'><Link to='/signup'> <button
              type="button"
              className="rounded-md border border-orange-600 px-4 py-1 text-sm font-semibold text-orange-600 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700 hover:border-orange-700"
            >
              Signup
            </button></Link></li>}
            <li className='mx-1 text-sm hover:text-zinc-700 sm:hidden block'><Link to='/addorder'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            </Link></li>
          </ul>
        </div>
      </header>
    </div>
  )
}

export default Header
