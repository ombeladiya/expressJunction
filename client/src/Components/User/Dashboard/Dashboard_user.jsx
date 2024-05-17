import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Dashboard_user() {
  const [data, setData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/orders/fetchhh');
      setData(response.data.userOrders);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/orders/fetchOrder/${orderId}`);
      setSelectedOrder(response.data);
      console.log(response);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const handleInfoClick = (orderId) => {
    fetchOrderDetails(orderId);
  };

  const handleCancelClick = async (orderId) => {
    try {
      const confirmCancel = window.confirm('Are you sure you want to cancel this order?');
      if (confirmCancel) {
        const response = await axios.get(`http://localhost:5000/api/v1/orders/cancelOrder/${orderId}`);
        console.log(response);
        if (response?.data?.success === true) {
          toast.success(response?.data?.message);
        } else {
          toast.error(response?.data?.message);
        }
        fetchData();
      }
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  return (
    <div className='mt-20'>
      <h2>User Dashboard</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Info</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cancel</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data && data.map(item => (
            <tr key={item?._id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.totalWeight}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.orderedAt}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-sm" onClick={() => handleInfoClick(item._id)}>
                  Info
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md text-sm"
                  onClick={() => handleCancelClick(item._id)}
                  disabled={item.status === "Cancelled" || item.status === "Reached"}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup/Modal Component */}
      {selectedOrder && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Order Details</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500"><b>Order ID:</b> {selectedOrder?.O?._id}</p>
                      <p className='text-sm text-gray-500'><b>From:</b> <br />
                        {selectedOrder?.SourceAddress?.landmark}, {selectedOrder?.SourceAddress?.city}, {selectedOrder?.SourceAddress?.state},<br />
                        {selectedOrder?.SourceAddress?.country}, {selectedOrder?.SourceAddress?.pincode}
                      </p>
                      <p className='text-sm text-gray-500'><b>To:</b> <br />
                        {selectedOrder?.DestiAddress?.landmark}, {selectedOrder?.DestiAddress?.city}, {selectedOrder?.DestiAddress?.state},<br />
                        {selectedOrder?.DestiAddress?.country}, {selectedOrder?.DestiAddress?.pincode}
                      </p>
                      <p className="text-sm text-gray-500">
                        <b>Last Reached:</b> {selectedOrder?.O?.status === "Reached" ? "Reached" : selectedOrder?.O?.status === "Cancelled" ? "Cancelled" : selectedOrder?.data?.[0]?.PostOffice?.[0]?.District}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={() => setSelectedOrder(null)} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard_user;
