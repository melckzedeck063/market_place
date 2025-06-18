import React, { useState } from 'react';
import { EyeIcon, X } from 'lucide-react';
import DataTable from 'react-data-table-component';
import {useMutation } from '@apollo/client';
import { UPDATE_ORDER } from '../apollo/Mutations';


const customStyles = {
  headCells: {
    style: {
      backgroundColor: '#FF7F3E',
      color: 'white',
      fontSize: '16px',
      fontWeight: 'bold',
      textAlign: 'start',
      padding: '6px',
    },
  },
  cells: {
    style: {
      padding: '8px',
    },
  },
};

const calculateTotal = (items) => {
  return items.reduce((total, item) => {
    const price = parseFloat(item.price || '0');
    return total + price * item.quantity;
  }, 0);
};

export default function OrdersTable({ data, limit }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [loadingUuid, setLoadingUuid] = useState(null); // <- local per-order loading

  const [updateOrder] = useMutation(UPDATE_ORDER);

  const displayedData = limit ? data.slice(0, limit) : data;

  const handleOrderUpdate = async (status) => {
    const uuid = selectedOrder.uuid;
    setLoadingUuid(uuid); // mark only this UUID as loading

    try {
      const res = await updateOrder({
        variables: { status, uuid },
      });

      const result = res.data.updateOrder;
      setMessage(result.error ? `❌ ${result.message}` : `✅ ${result.message}`);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoadingUuid(null);
      setModalOpen(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      sortable: true,
      width: '70px',
    },
    {
      name: 'Order No',
      selector: row => row.orderNo,
      sortable: true,
    },
    {
      name: 'Customer',
      selector: row => `${row.orderedBy?.firstName || ''} ${row.orderedBy?.lastName || ''}`,
      sortable: true,
    },
    {
      name: 'Phone',
      selector: row => row.orderedBy?.phone || '',
    },
    {
      name: 'Status',
      cell: row => {
        let colorClass = '';
    
        switch (row.status) {
          case 'PENDING':
            colorClass = 'text-orange-500';
            break;
          case 'CANCELLED':
            colorClass = 'text-red-500';
            break;
          case 'PROCESSED':
            colorClass = 'text-blue-500';
            break;
          case 'DELIVERED':
            colorClass = 'text-green-500';
            break;
          case 'ON_DELIVERY':
            colorClass = 'text-teal-500';
            break;
          default:
            colorClass = 'text-gray-600';
        }
    
        return <span className={`font-semibold ${colorClass}`}>{row.status}</span>;
      },
    },
    
    {
      name: 'Items',
      selector: row => row.orderItems.map(item => item.title).join(', '),
      wrap: true,
    },
    {
      name: 'Total (TZS)',
      selector: row => calculateTotal(row.orderItems),
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        <button
          onClick={() => {
            setSelectedOrder(row);
            setModalOpen(true);
          }}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <EyeIcon />
        </button>
      ),
    },
  ];

  return (
    <div className="relative">
      {message && (
        <div className={`mb-4 p-3 rounded text-sm text-white ${message.startsWith('✅') ? 'bg-green-500' : 'bg-red-500'}`}>
          {message}
        </div>
      )}

      <DataTable className='rounded-lg'
        columns={columns}
        data={displayedData}
        pagination
        customStyles={customStyles}
      />

      {/* Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[90%] max-w-2xl rounded-lg p-6 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <p className='mb-1.5'><strong>Order No:</strong> {selectedOrder.orderNo}</p>
            <p className='mb-1.5'>
  <strong>Status:</strong>{' '}
  <span className={
    `font-semibold ${
      selectedOrder.status === 'PENDING' ? 'text-orange-500' :
      selectedOrder.status === 'CANCELLED' ? 'text-red-500' :
      selectedOrder.status === 'PROCESSED' ? 'text-blue-500' :
      selectedOrder.status === 'DELIVERED' ? 'text-green-500' :
      selectedOrder.status === 'ON_DELIVERY' ? 'text-teal-500' :
      'text-gray-600'
    }`
  }>
    {selectedOrder.status}
  </span>
</p>

            <p className='mb-1.5'><strong>Customer:</strong> {selectedOrder.orderedBy?.firstName} {selectedOrder.orderedBy?.lastName}</p>
            <p className='mb-1.5'><strong>Phone:</strong> {selectedOrder.orderedBy?.phone}</p>
            <p className='mb-1.5'><strong>Latitude:</strong> {selectedOrder.latitude}</p>
            <p className='mb-1.5'><strong>Longitude:</strong> {selectedOrder.longitude}</p>
            <p className='text-orange-500'><strong>Total:</strong> TZS {calculateTotal(selectedOrder.orderItems)}</p>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Items</h3>
              <ul className="list-disc list-inside">
                {selectedOrder.orderItems.map((item, idx) => (
                  <li key={idx}>
                    {item.title} - {item.quantity} × {item.price} = {parseFloat(item.price) * item.quantity} TZS
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => handleOrderUpdate('CANCELLED')}
                disabled={loadingUuid === selectedOrder.uuid}
                className={`px-4 py-2 rounded-md ${loadingUuid === selectedOrder.uuid ? 'bg-red-200 cursor-not-allowed' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
              >
                {loadingUuid === selectedOrder.uuid ? 'Declining...' : 'Decline'}
              </button>
              <button
                onClick={() => handleOrderUpdate('PROCESSED')}
                disabled={loadingUuid === selectedOrder.uuid}
                className={`px-4 py-2 rounded-md ${loadingUuid === selectedOrder.uuid ? 'bg-green-300 cursor-not-allowed' : 'bg-green-500 text-green-100 hover:bg-green-200'}`}
              >
                {loadingUuid === selectedOrder.uuid ? 'Accepting...' : 'Accept'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
