import React from 'react'

function CityCenterProfile() {
    return (
        <div>
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center space-x-6">
                    <img className="w-32 h-32 rounded-full" src={center.image} alt={`${center.name} logo`} />
                    <div>
                        <h2 className="text-2xl font-bold">{center.name}</h2>
                        <p className="text-gray-600">{center.location}</p>
                    </div>
                </div>
                <div className="mt-6">
                    <h3 className="text-xl font-semibold">Description</h3>
                    <p className="mt-2 text-gray-700">{center.description}</p>
                </div>
                <div className="mt-6">
                    <h3 className="text-xl font-semibold">Contact Information</h3>
                    <p className="mt-2 text-gray-700">Email: {center.contact.email}</p>
                    <p className="text-gray-700">Phone: {center.contact.phone}</p>
                </div>
            </div>
        </div>
    )
}

export default CityCenterProfile
