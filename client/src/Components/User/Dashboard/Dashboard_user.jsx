import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import QR from '../../Layout/QR';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Loader from '../../Layout/Loader';
import { useSelector } from 'react-redux';


function loadRazorpayScript() {
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.async = true;
  document.head.appendChild(script);
}


function Dashboard_user() {
  const [data, setData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth)
  const [paybtndisable, setdisable] = useState(false);

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
      setLoading(true);
      const response = await axios.get(`/api/v1/orders/fetchOrder/${orderId}`);
      setLoading(false);
      setSelectedOrder(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
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
      toast.error(error.response.data.message);
    }
  };

  function formatDate(isoString) {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const handleDownloadPdf = () => {
    const input = document.getElementById('invoice');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('download.pdf');
      })
      .catch((err) => console.error('Error generating PDF:', err));
  };


  const checkout = async (amount) => {
    try {
      setdisable(true);

      loadRazorpayScript();
      const config = { headers: { "Content-Type": "application/json" } };
      const { data: { key } } = await axios.get("/api/v1/getkey");
      const { data: { order } } = await axios.post("/api/v1/orders/checkout", { amount }, config);

      var options = {
        "key": key,
        "amount": order.amount,
        "currency": "INR",
        "name": "Express Junction",
        "description": "A Courier Aggrigator Company",
        "image": '/logo.png',
        "order_id": order.id,
        "handler": async function (response) {
          try {
            toast.success("payment done");
          } catch (error) {
            toast.error(error.response.data.message);
          }
        },
        "prefill": {
          "name": user.name,
          "email": user.email,
          "mobile": user.mobile
        },
        "notes": {
          "address": "express junction"
        },
        "theme": {
          "color": "#000000"
        }
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        toast.error(response.error.message);
      });
      rzp1.open();

    } catch (error) {
      toast.error(error.response.data.message);
    }

  }

  return (
    <div className='mt-20 min-h-screen w-full'>
      {loading && <div className='absolute top-0 left-0 w-full h-full mt-14 flex justify-center items-center'> <Loader /></div>}
      <h2 className='font-semibold text-center text-xl text-pretty'>My Orders</h2>
      {data && data[0] && !loading && <table className="min-w-full divide-y divide-gray-200 mt-3">
        <thead className="bg-orange-500">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Weight</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Price</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ORDER Date</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Info</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Cancel</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Payment</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data && !loading && data.map(item => (
            <tr key={item?._id}>
              <td className="px-6 py-2 whitespace-nowrap">{item.totalWeight}</td>
              <td className="px-6 py-2 whitespace-nowrap">{item.price}</td>
              <td className="px-6 py-2 whitespace-nowrap">{item.status}</td>
              <td className="px-6 py-2 whitespace-nowrap">{formatDate(item.orderedAt)}</td>
              <td className="px-6 py-2 whitespace-nowrap">
                <button className="bg-gray-200 hover:bg-gray-400  py-1 px-4 rounded-sm text-sm" onClick={() => handleInfoClick(item._id)}>
                  Info
                </button>
              </td>
              <td className="px-6 py-2 whitespace-nowrap">
                <button
                  className="border-orange-500 border-[3px] border-double hover:bg-orange-500 hover:text-white py-1 px-4 rounded-sm text-sm disabled:bg-red-300"
                  onClick={() => handleCancelClick(item._id)}
                  disabled={item.status === "Cancelled" || item.status === "Reached"}
                >
                  Cancel
                </button>
              </td>
              <td className="px-6 py-2 whitespace-nowrap">
                {(item.status !== 'Not-Confirmed' && item.status !== 'Reached') && <button
                  className="border-orange-500 border-[3px] border-double hover:bg-orange-500 hover:text-white py-1 px-4 rounded-sm text-sm disabled:bg-red-300"
                  onClick={() => checkout(item.price)}
                  disabled={paybtndisable}
                >
                  Pay Now
                </button>}
                {
                  item.status === 'Not-Confirmed' && <span>Pending</span>
                }

              </td>
            </tr> 
          ))}
        </tbody>

      </table>}
      {(!data || !data[0]) && <div className='mt-5 text-rose-500 text-center text-2xl'>No Any Orders!!</div>}
      {/* Popup/Modal Component */}

      {selectedOrder && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-16 sm:align-middle sm:max-w-xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-10 sm:pb-4" id='invoice'>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-bold text-gray-900">Order Details</h3>
                    <div className="mt-2">
                      <p className="text-sm "><b>Order ID:</b> {selectedOrder?.O?._id}</p><br />
                      {selectedOrder?.SourceAddress ? <p className='text-sm'><b>From:</b> <br />

                        {selectedOrder?.SourceAddress?.landmark}, {selectedOrder?.SourceAddress?.city}, {selectedOrder?.SourceAddress?.state},<br />
                        {selectedOrder?.SourceAddress?.country}, {selectedOrder?.SourceAddress?.pincode}
                      </p> : <p className='text-sm'>From Address deleted</p>}<br />
                      <p className='text-sm '><b>To:</b> <br />
                        <b>{selectedOrder?.DestiAddress?.name}</b> <br />{selectedOrder?.DestiAddress?.landmark}, {selectedOrder?.DestiAddress?.city}, {selectedOrder?.DestiAddress?.state},<br />
                        {selectedOrder?.DestiAddress?.country}, {selectedOrder?.DestiAddress?.pincode}, Mo: <b>{selectedOrder?.DestiAddress?.phoneNo}</b> 
                      </p>
                      {selectedOrder?.O?.status !== 'Not-Confirmed' && selectedOrder?.O?.status !== 'Confirmed' && <p className="text-sm"><br />
                        <b>Last Reached:</b> {selectedOrder?.O?.status === "Reached" ? "Delivered" : (selectedOrder?.O?.status === "Cancelled" ? "Cancelled" : selectedOrder?.data?.[0]?.PostOffice?.[0]?.District)}
                      </p>}
                    </div>
                  </div>
                  <div className='w-64'><QR initialValue={JSON.stringify({ _id: selectedOrder.O._id })} /></div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">

                <button onClick={() => setSelectedOrder(null)} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-500 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Close
                </button>
                <button onClick={handleDownloadPdf} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-zinc-300 text-base font-medium hover:text-white hover:bg-zinc-400 focus:outline-none focus:ring-2 focus:ring-offset-2 text-black focus:ring-black sm:ml-3 sm:w-auto sm:text-sm">
                  Download Invoice
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
