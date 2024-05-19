import axios from 'axios';
import QRScanner from 'qr-scanner';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function QrScanner() {
    const videoRef = useRef(null);
    const [result, setResult] = useState('');
    const [scanner, setScanner] = useState(null);
    const [formData, setFormData] = useState('');
    const { user, isAuthenticated } = useSelector(state => state.auth);
    const [Error, setError] = useState('');

    useEffect(() => {
        const qrScanner = new QRScanner(videoRef.current, (result) => {
            result = JSON.parse(result);
            setFormData(result._id);
            setResult(result);
        });
        setScanner(qrScanner);
        qrScanner.start();

        return () => {
            qrScanner.stop();
        };

    }, [isAuthenticated, user]);

    const handleStart = () => {
        if (scanner) {
            scanner.start();
        }
    };

    const handleStop = () => {
        if (scanner) {
            scanner.stop();
        }
    };

    const makeAttendance = async () => {
        try {
            const { data } = await axios.post(`/api/v1/auth/company/cityCenter/addparcel/${formData}/${user.cityId}`);
            if (data.success) {
                toast.success(data.message);
                setResult('');
                setError('');
            } else {
                toast.error(data.message);
                setError(data.message);
                setResult('');
            }
        } catch (error) {
            setError(error.response.data.message);
            setResult('');
        }
    }
    return (
        <>
            <div className='w-full flex flex-col mt-14 min-h-screen'>
                <h2 className='mx-auto text-xl font-semibold mt-5'>Add Parcel</h2>
                <div className='w-11/12 mx-auto mt-3 sm:w-1/3 aspect-[3/4]'>
                    <video ref={videoRef} autoPlay playsInline className='w-full' />
                </div>
                <div className='flex justify-center space-x-4 -mt-[40vh]'>
                    <button onClick={handleStart} className='bg-[#60cadc] p-2 px-6 rounded-md text-sm'>Start</button>
                    <button onClick={handleStop} className='bg-[#f86b6b] p-2 px-6 rounded-md text-sm'>Stop</button>
                    {result && <button onClick={makeAttendance} className='bg-[#8877f5] p-2 px-6 rounded-md text-sm'>Recieve</button>}
                </div>
                {result && <div className='flex space-x-3 justify-center mt-3'>
                    <span className='text-center mt-1 font-semibold'>OrderID: {result._id}</span>
                </div>}
                {Error && <div className='w-full flex text-red-500 justify-center mt-3 font-semibold'>{Error}</div>}
            </div>

        </>
    )
}

export default QrScanner
