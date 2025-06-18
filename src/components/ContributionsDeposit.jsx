import { EyeIcon } from 'lucide-react';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { BASE_URL } from '../store/urls';

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

export default function BusinessTable({ businesses }) {
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  const columns = [
    { name: 'Name', selector: row => row.name || "N/A", sortable: true },
    { name: 'Email', selector: row => row.email || "N/A" },
    { name: 'Phone', selector: row => row.phone || "N/A" },
    { name: 'Address', selector: row => row.address || "N/A" },
    { name: 'Status', selector: row => row.status || "N/A" },
    { name: 'Opening Time', selector: row => row.openTime || "N/A" },
    { name: 'Closing Time', selector: row => row.closingTime || "N/A" },
    {
      name: 'Action',
      cell: row => (
        <button
          onClick={() => setSelectedBusiness(row)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <EyeIcon />
        </button>
      ),
    },
  ];

  return (
    <>
      <DataTable
        // title="Business Info"
        columns={columns}
        data={businesses}
        pagination
        customStyles={customStyles}
      />

      {/* Modal for viewing details */}
      {selectedBusiness && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
            <h2 className="text-xl font-semibold mb-4">Restaurant Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <p><strong>Name:</strong> {selectedBusiness.name}</p>
              <p><strong>Email:</strong> {selectedBusiness.email}</p>
              <p><strong>Phone:</strong> {selectedBusiness.phone}</p>
              <p><strong>Address:</strong> {selectedBusiness.address}</p>
              <p><strong>Status:</strong> {selectedBusiness.status}</p>
              <p><strong>Opening Time:</strong> {selectedBusiness.openTime}</p>
              <p><strong>Closing Time:</strong> {selectedBusiness.closingTime}</p>
              <p className="md:col-span-2"><strong>Description:</strong> {selectedBusiness.description || "N/A"}</p>
              <p className="md:col-span-2"><strong>Opening Days:</strong> {Array.isArray(selectedBusiness.openingDays) ? selectedBusiness.openingDays.join(', ') : "N/A"}</p>
            </div>

            {/* Cover photo */}
            {selectedBusiness.coverPhoto && (
              <div className="mt-4">
                <p className="font-semibold mb-2">Cover Photo:</p>
                <img
                  src={selectedBusiness.coverPhoto ? `${BASE_URL}${selectedBusiness.coverPhoto}` : '/placeholder.jpg'}
                  alt="Cover"
                  className="w-full h-64 object-cover rounded"
                />

              </div>
            )}

            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
              onClick={() => setSelectedBusiness(null)}
            >
              &#x2715;
            </button>
          </div>
        </div>
      )}
    </>
  );
}
