import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/UserSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : '';
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'];
    const colorIndex = firstLetter.charCodeAt(0) % colors.length;
    const bgColor = colors[colorIndex];

    const handleLogout = async () => {
        try {
            const { data } = await axios.get("/api/v1/auth/logout");
            dispatch(logout())
            toast.success(data.message);
            navigate('/login');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleDeleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your account?")) {
            console.log("deleted")
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-200">
            <div className="relative w-96 h-96 perspective-900 cursor-pointer">
                <div className="absolute w-full h-full transition-transform duration-700 ease-in-out transform">
                    <div className="backface-hidden bg-white shadow-lg rounded-lg p-5">
                        <div className="relative">
                            <div className="flex justify-center mt-[-3rem]">
                                <div className={`w-16 h-16 flex border-[4px] border-white items-center justify-center rounded-full text-white font-bold text-4xl ${bgColor}`}>
                                    {firstLetter}
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-2">
                            <h3 className="font-bold capitalize">{user?.name}</h3>
                            <p className="text-gray-600 mt-3">{user?.email}</p>
                            <span className="text-green-800 text-sm uppercase">{user?.mobile}</span><br />
                            {user?.pincode && <span className="text-green-800 text-sm"><span className='font-semibold'>Pincode :</span>{user.pincode}</span>}
                        </div>

                        <div className="flex justify-center space-x-3 mt-6">
                            <button className="border-blue-500 border-[0.8px] hover:border-b-4 px-4 py-1 rounded-md" onClick={handleLogout}>Logout</button>
                            <button className="border-red-500 border-[0.8px] hover:border-b-4 px-4 py-1 rounded-md" onClick={handleDeleteAccount}>Delete Account</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;
