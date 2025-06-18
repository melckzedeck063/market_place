import { MoreHorizontalIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { GET_ALL_ORDERS } from '../apollo/Queries';

const customStyles = {
  headCells: {
    style: {
      backgroundColor: '#FF7F3E',
      color: 'white',
      fontSize: '16px',
      fontWeight: 'bold',
      textAlign: 'center',
      padding: '6px',
    },
  },
  cells: {
    style: {
      padding: '6px',
    },
  },
};

const handleEdit = (row) => {
  alert(`Editing Loan No: ${row.loanNo}`);
};

const columns = [
  { name: 'No', selector: row => row.orderNo, sortable: true },
  {
    name: 'Total Cost',
    selector: row => {
      const total = row.orderItems?.reduce((acc, item) => {
        const price = parseFloat(item.price || 0);
        const quantity = parseInt(item.quantity || 0);
        return acc + (price * quantity);
      }, 0);
      return total ? total.toLocaleString() : "N/A";
    }
  }  ,
  { name: 'Requested', selector: row => row.created_at ? row.created_at.substring(0, 10) : "N/A" },
  { name: 'Customer', selector: row => row.orderedBy.firstName + " " + row.orderedBy.lastName || "N/A" },
  { name: 'Telephone', selector: row => row.orderedBy.phone || "N/A" },
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
  // {
  //   name: 'Action',
  //   cell: row => (
  //     <button onClick={() => handleEdit(row)} className="p-2 rounded-md hover:bg-gray-100">
  //       <MoreHorizontalIcon />
  //     </button>
  //   ),
  // },
];

export default function LoanDataTable({ limit }) {
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(true);
  const loans = useSelector((state) => state.loans);


  const  {data, error, loading} = useQuery(GET_ALL_ORDERS, {
    variables : {
      page: 0,
      size: 5
    }
  });
  

  const orders = data?.allOrders?.content;


  const displayedData = limit ? (Array.isArray(orders) ? orders.slice(0, limit) : []) : orders;

if (loading) return <div>Loading...</div>;
if (!displayedData || displayedData.length === 0) return <div>No data available.</div>;

return (
  <div>
    <DataTable
      columns={columns}
      data={displayedData}
      pagination
      customStyles={customStyles}
    />
  </div>
);

}
