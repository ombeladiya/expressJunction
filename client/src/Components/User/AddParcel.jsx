import React, { useState } from "react";
import { Home, ChevronRight, Package } from 'lucide-react'
import { useNavigate } from "react-router-dom";

function AddParcel() {
    const [elements, setElements] = useState([]);
    const navigate = useNavigate();
    const [uniqueIds, setUniqueIds] = useState([]);
    const addparceldetails = () => {
        const weights = [];
        uniqueIds && uniqueIds.forEach(uniqueId => {
            const weight = document.getElementById(`weight_${uniqueId}`).value;
            weights.push(weight);
        });
        weights.push(document.getElementById("weight1").value)
        let totalWeight = 0;
        weights.forEach(w => {
            totalWeight += parseFloat(w); // Convert weight to float before summing
        });

        const items = weights.map((w, index) => ({
            weight: weights[index]
        }));
        localStorage.setItem('weight', totalWeight);
        localStorage.setItem('items', JSON.stringify(items));
        navigate('/choose-delivery-company');
    };

    const addElement = () => {
        const uniqueId = Math.random().toString(36).substring(7);
        setUniqueIds(prevUniqueIds => [...prevUniqueIds, uniqueId]);
        const newElement = <div className="w-full py-3 sm:grid sm:grid-cols-2 px-3 gap-4"> <div className="w-full grid-cols-1">
            <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="firstName"
            >
                Description (optional)
            </label>
            <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Parcel Description"
                id={`description_${uniqueId}`}
                required />
        </div>
            <div className="w-full grid-cols-1">
                <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="firstName"
                >
                    Weight
                </label>
                <input
                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="number"
                    placeholder="Enter Parcel Weight"
                    id={`weight_${uniqueId}`}
                    required />
            </div></div>;
        setElements(prevElements => [...prevElements, newElement]);
    };
    return (
        <div>
            <div className="mx-auto w-full min-h-screen bg-slate-100 py-2">
                <div className="mx-auto my-4 max-w-6xl md:my-6">
                    <nav className="mt-16 sm:flex hidden" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <span
                                    className="ml-1 inline-flex text-sm font-medium text-green-600 md:ml-2"
                                >
                                    <Home size={16} className="mr-2 text-green-600" />
                                    Riceiver's Information
                                </span>
                            </li>

                            <li >
                                <div className="flex items-center">
                                    <ChevronRight size={16} className="mr-2 text-green-600" />
                                    <span
                                        className="ml-1 text-sm font-medium text-green-600 md:ml-2"
                                    >
                                        Sender's Information
                                    </span>
                                </div>
                            </li>
                            <li >
                                <div className="flex items-center">
                                    <ChevronRight size={16} className="mr-2 text-green-600" />
                                    <span
                                        className="ml-1 text-sm font-medium text-green-600 md:ml-2"
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
                                <Package size={20} />
                            </div>
                            <div className="flex flex-1">
                                <p className="text-xl font-medium">
                                    Add Parcel's Deatils
                                </p>
                            </div>
                        </div>
                        <div >

                            <div className="mt-6 space-y-2 ">
                                <div className="w-full py-3 sm:grid sm:grid-cols-2 px-3 gap-4">
                                    <div className="w-full grid-cols-1">
                                        <label
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="firstName"
                                        >
                                            Description (optional)
                                        </label>
                                        <input
                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Parcel Description"
                                            id="Name"
                                            required />
                                    </div>
                                    <div className="w-full grid-cols-1">
                                        <label
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="firstName"
                                        >
                                            Weight
                                        </label>
                                        <input
                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="number"
                                            placeholder="Enter Parcel Weight"
                                            id="weight1"
                                            required />
                                    </div>

                                </div>
                                {elements && elements.map(element => element)}
                            </div>

                            <div className="sm:flex justify-end">
                                <button
                                    type="button"
                                    onClick={addElement}
                                    className="w-full sm:mx-5 sm:w-56 h-10 rounded-md bg-transparent px-3 mt-5 text-sm font-semibold text-black shadow-sm border-[1.5px] border-orange-500 hover:bg-orange-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                >
                                    Add Another Parcel
                                </button>
                                <button
                                    onClick={() => addparceldetails()}
                                    type="button"
                                    className="w-full sm:w-56 h-10 rounded-md bg-orange-600 px-3 mt-5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                >
                                    Next Step
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddParcel
