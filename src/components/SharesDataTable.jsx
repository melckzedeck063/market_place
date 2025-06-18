import { ActivityIcon, MoreHorizontalIcon } from 'lucide-react';
import React from 'react'

import DataTable from 'react-data-table-component';

const customStyles = {
  headCells: {
    style: {
      backgroundColor: '#35A29F', // Custom Header Color
      color: 'white',
      fontSize: '16px',
      fontWeight: 'bold',
      textAlign: 'center',
      padding: '6px',
    },
  },
  cells: {
    style: {
      padding: '8px',
    },
  },
};

const handleEdit = (row) => {
  alert(`Editing Transaction ID: ${row.transactionId}`);
  // Implement edit functionality here (e.g., open a modal or navigate to an edit page)
};

const columns = [
  {
    name: 'No',
    selector: row => row.id,
    sortable: true,
  },
  {
    name: 'Amount',
    selector: row => row.amount_paid,
    sortable : true
  },
  {
    name: 'Type',
    selector: row => row.transaction_type,
  },
  {
    name: 'Description',
    selector: row => row.description,
  
  },
  {
    name: 'Paid Date',
    selector: row => row.paid_at,
    sortable : true
  },
  
];


export default function SharesDataTable({ limit, trans }) {
  const displayedData = limit ? trans.slice(0, limit) : trans;

  // console.log( "transss =====" +  JSON.stringify(trans))

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
