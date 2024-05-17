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
      const response = await axios.get('/api/v1/orders/fetchhh');
      setData(response.data.userOrders);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await axios.get(`/api/v1/orders/fetchOrder/${orderId}`);
      setSelectedOrder(response.data);
    } catch (error) {
      toast.error('Error fetching order details');
    }
  };

  const handleInfoClick = (orderId) => {
    fetchOrderDetails(orderId);
  };

  const handleCancelClick = async (orderId) => {
    try {
      const confirmCancel = window.confirm('Are you sure you want to cancel this order?');
      if (confirmCancel) {
        const response = await axios.get(`/api/v1/orders/cancelOrder/${orderId}`);
        if (response?.data?.success === true) {
          toast.success(response?.data?.message);
        } else {
          toast.error(response?.data?.message);
        }
        fetchData();
      }
    } catch (error) {
      toast.error('Error while canceling order');
    }
  };

  function formatDate(isoString) {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  return (
    <div className='mt-20 min-h-screen'>
      <h2 className='font-semibold text-center text-xl text-pretty'>My Orders</h2>
      {data && <table className="min-w-full divide-y divide-gray-200 mt-3">
        <thead className="bg-orange-500">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Weight</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Price</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ORDER Date</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Info</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Cancel</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data && data.map(item => (
            <tr key={item?._id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.totalWeight}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">{formatDate(item.orderedAt)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="bg-gray-200 hover:bg-gray-400  py-2 px-4 rounded-sm text-sm" onClick={() => handleInfoClick(item._id)}>
                  Info
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-sm text-sm disabled:bg-red-300"
                  onClick={() => handleCancelClick(item._id)}
                  disabled={item.status === "Cancelled" || item.status === "Reached"}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>}
      {!data && <div className='mt-5 text-rose-500 text-center text-2xl'>No Any Orders!!</div>}
      {/* Popup/Modal Component */}
      {selectedOrder && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-16 sm:align-middle sm:max-w-xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-10 sm:pb-4">
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
                <button onClick={() => setSelectedOrder(null)} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-500 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm">
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
