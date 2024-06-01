import React, { useEffect, useState } from "react";
import { Home, ChevronRight, CircleUserRound, ArrowLeft } from 'lucide-react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export function AddSender() {
    const [name, setName] = useState();
    const [email, setMail] = useState();
    const [mobile, setMobile] = useState();
    const [area, setArea] = useState();
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [country, setcountry] = useState('');
    const [isvalid, setIsvalid] = useState(true);
    const navigate = useNavigate();
    const [visible, setvisible] = useState(true);
    const [address, setAddress] = useState();
    const { isAuthenticated } = useSelector(state => state.auth);
    const [selectedAddressId, setSelectedAddressId] = useState(0);

    const getadata = async (e) => {
        setPincode(e.target.value);
        if (e.target.value.length == 6) {
            try {
                const { data } = await axios.get(`https://api.postalpincode.in/pincode/${e.target.value}`);
                if (data[0].Status == "Error") throw new Error(data[0].Message);
                if (data && data.length > 0 && data[0].PostOffice && data[0].PostOffice.length > 0) {
                    setCity(data[0].PostOffice[0].Block);
                    setState(data[0].PostOffice[0].State);
                    setDistrict(data[0].PostOffice[0].District);
                    setcountry(data[0].PostOffice[0].Country);
                    setIsvalid(true);
                }
            } catch (err) {
                setIsvalid(false);
                setCity('')
                setState('');
                setDistrict('');
            }
        } else {
            setIsvalid(false);
        }
    }

    const shownewadd = () => {
        setvisible(false);
    }

    const setaddress = async (e) => {
        try {
            e.preventDefault();
            const { data } = await axios.post("/api/v1/address/add-address", { name, email, city, country, district, phoneNo: mobile, pincode, landmark: area, state });
            localStorage.setItem("sourceId", data.id);
            localStorage.setItem('from', pincode);
            navigate("/addparcel");
        } catch (error) {
            toast.error("Error while Adding Address");
        }
    }

    const handleChange = (key) => {
        setSelectedAddressId(key);
    };
    const addoldaddress = (e) => {
        e.preventDefault();
        localStorage.setItem('from', address[selectedAddressId].pincode);
        localStorage.setItem("sourceId", address[selectedAddressId]._id);
        navigate("/addparcel");
    }

    const Deleteaddress = async (e, id) => {
        try {
            e.preventDefault();
            await axios.delete(`/api/v1/address/delete/${id}`);
            getaddress();
        } catch (error) {
            toast.error("Error while deleting Address");
        }
    }

    async function getaddress() {
        try {
            const { data } = await axios.get("/api/v1/address/get-address");
            if (data.address.length == 0) {
                setvisible(false);
            }
            setAddress(data.address);
        } catch (err) {
            setvisible(false);
        }
    }

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login")
        }
        getaddress();
    }, [isAuthenticated]);

    return (
        <div className="mx-auto w-full min-h-screen bg-slate-100 py-2">
            <div className="mx-auto my-4 max-w-6xl md:my-6">
                <nav className="mt-16 sm:flex hidden" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <span
                                className="ml-1 inline-flex text-sm font-medium text-green-600 md:ml-2"
                            >
                                <Home size={16} className="mr-2 text-gray-900" />
                                Receiver's Information
                            </span>
                        </li>

                        <li >
                            <div className="flex items-center">
                                <ChevronRight size={16} className="mr-2 text-green-600" />
                                <span
                                    className="ml-1 text-sm font-medium text-green-600  md:ml-2"
                                >
                                    Sender's Information
                                </span>
                            </div>
                        </li>
                        <li >
                            <div className="flex items-center">
                                <ChevronRight size={16} className="mr-2 text-green-600" />
                                <span
                                    className="ml-1 text-sm font-medium text-gray-900 md:ml-2"
                                >
                                    Parcel Details
                                </span>
                            </div>
                        </li>
                        <li >
                            <div className="flex items-center">
                                <ChevronRight size={16} className="mr-2 text-gray-600" />
                                <span
                                    className="ml-1 text-sm font-medium text-gray-900  md:ml-2"
                                >
                                    Select Delivery Company
                                </span>
                            </div>
                        </li>
                        <li >
                            <div className="flex items-center">
                                <ChevronRight size={16} className="mr-2 text-gray-600" />
                                <span
                                    className="ml-1 text-sm font-medium text-gray-900  md:ml-2"
                                >
                                    Confirmation
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <div className="overflow-hidden rounded-sm bg-white p-8 sm:shadow mt-8 sm:mt-3">
                    <div className="mb-4 flex items-center rounded-lg py-2">
                        <div className="mr-2 rounded-full bg-gray-100  p-2 text-black">
                            <CircleUserRound size={20} />
                        </div>
                        <div className="flex flex-1">
                            <p className="text-xl font-medium">
                                Add Sender's Information
                            </p>
                        </div>
                    </div>
                    <div className={`${visible ? 'block' : 'hidden'}`}>

                        <div className="mt-6 space-y-2 relative">
                            {address && address.map((add, key) => <div key={key} className="w-full py-3 flex flex-row px-3 border-[1px] rounded-sm border-gray-500">
                                <input type="radio" name="address" value={add._id} checked={selectedAddressId == key} onChange={() => handleChange(key)} />
                                <div className="px-3 capitalize">{add.name} , Mo.{add.phoneNo}, {add.landmark},{add.city}, {add.district}, {add.state}, {add.country} - {add.pincode} </div>
                                <div className="absolute right-6"><button className="text-xs border-red-500 border-[1px] px-2 py-1 rounded-sm" onClick={(e) => Deleteaddress(e, add._id)}>Delete</button></div>
                            </div>)}
                        </div>
                        <div className="sm:flex justify-end">
                            <button
                                type="button"
                                onClick={shownewadd}
                                className="w-full sm:mx-5 sm:w-56 h-10 rounded-md bg-transparent px-3 mt-5 text-sm font-semibold text-black shadow-sm border-[1.5px] border-orange-500 hover:bg-orange-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Add New Address
                            </button>
                            <button
                                type="button"
                                onClick={() => addoldaddress()}
                                className="w-full sm:w-56 h-10 rounded-md bg-orange-600 px-3 mt-5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Next Step
                            </button>
                        </div>
                    </div>
                    <div className={`font-semibold cursor-pointer ${visible ? 'hidden' : 'flex'}`} onClick={() => setvisible(!visible)}> <ArrowLeft size={18} /><span className="px-2 -mt-1">Back</span></div>
                    <form className={`mt-6 gap-6 space-y-2 ${visible ? 'hidden sm:hidden' : 'sm:grid'} sm:grid-cols-2 md:grid-cols-3 sm:space-y-0`} onSubmit={setaddress}>

                        <div className="w-full">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="firstName"
                            >
                                Name
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="text"
                                placeholder="Enter your name"
                                id="Name"
                                onChange={(e) => setName(e.target.value)}
                                required />
                        </div>
                        <div className="w-full">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="Mobile"
                            >
                                Mobile Number
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="tel"
                                placeholder="Enter your Mobile"
                                id="mobile"
                                pattern='[1-9]{1}[0-9]{9}'
                                title="Mobile number should be 10 digits"
                                onChange={(e) => setMobile(e.target.value)}
                                required />
                        </div>
                        <div className="col-span-1 grid">
                            <div className="w-full">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="email"
                                >
                                    Email Address
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="email"
                                    placeholder="Enter your email"
                                    id="email"
                                    onChange={(e) => setMail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-span-1 grid">
                            <div className="w-full">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="email"
                                >
                                    Apartment/Area/Flat No.
                                </label>
                                <input
                                    className="h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    placeholder="Enter your area"
                                    onChange={(e) => setArea(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-span-1 grid">
                            <div className="w-full">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="email"
                                >
                                    Pincode
                                </label>
                                <input
                                    className={`h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${isvalid ? '' : 'focus:ring-red-500'}`}
                                    type="number"
                                    placeholder="Enter your pincode"
                                    id="pincode"
                                    pattern="[0-9]{6}"
                                    title="Please enter a valid pincode"
                                    value={pincode}
                                    onChange={(e) => getadata(e)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-span-1 grid">
                            <div className="w-full">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="email"
                                >
                                    City
                                </label>
                                <input
                                    className="h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    placeholder="Enter your city"
                                    id="city"
                                    value={city}
                                    readOnly
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-span-1 grid">
                            <div className="w-full">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="email"
                                >
                                    District
                                </label>
                                <input
                                    className="h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    placeholder="Enter your District"
                                    id="district"
                                    value={district}
                                    readOnly
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-span-1 grid">
                            <div className="w-full">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="email"
                                >
                                    State
                                </label>
                                <input
                                    className="h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    placeholder="Enter your city"
                                    id="state"
                                    value={state}
                                    readOnly
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-span-1 grid">
                            <div className="w-full">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="country"
                                >
                                    Country
                                </label>
                                <input
                                    className="h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    placeholder="Enter your Country"
                                    value={country}
                                    readOnly
                                    required
                                />
                            </div>
                        </div>

                        <div className="col-span-3 flex justify-end">
                            <input
                                type="submit"
                                className="w-full sm:w-56 h-10 rounded-md bg-orange-600 px-3 mt-5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                value="Next Step"
                            />                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddSender
