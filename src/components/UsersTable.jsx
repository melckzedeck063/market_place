import { EyeIcon } from 'lucide-react';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import {UPDATE_USER} from '../apollo/Mutations'
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';

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
      padding: '8px',
    },
  },
};

export default function UsersTable({ limit, users }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updateUser] = useMutation(UPDATE_USER);

  const handleView = (user) => {
    setSelectedUser({ ...user }); // clone to allow editing
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser(prev => ({ ...prev, [name]: value }));
  };


const handleSave = async () => {
  const toastId = toast.loading("Updating user...");

  try {
    const { data } = await updateUser({
      variables: {
        uuid: selectedUser.uuid,
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        phone: selectedUser.phone,
        username: selectedUser.username,
        userRole: selectedUser.userType, // Assuming userType is used for userRole
      },
    });
    

    const res = data?.updateUser;

    if (res?.error === false) {
      toast.update(toastId, {
        render: res.message || "User updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setShowModal(false);
    } else {
      toast.update(toastId, {
        render: res?.message || "Failed to update user",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  } catch (err) {
    console.error(err);
    toast.update(toastId, {
      render: "An unexpected error occurred.",
      type: "error",
      isLoading: false,
      autoClose: 3000,
    });
  }
};



  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      sortable: false,
      width: '60px',
    },
    {
      name: 'First Name',
      selector: row => row.firstName,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: row => row.lastName,
      sortable: true,
    },
    {
      name: 'Phone',
      selector: row => row.phone,
    },
    {
      name: 'Username',
      selector: row => row.username,
    },
    {
      name: 'User Type',
      selector: row => row.userType,
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        <button
          onClick={() => handleView(row)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <EyeIcon />
        </button>
      ),
    },
  ];

  const displayedData = limit ? users.slice(0, limit) : users;

  return (
    <div>
      <DataTable
        columns={columns}
        data={displayedData}
        pagination
        customStyles={customStyles}
      />

      {/* Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-6/12">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>

            <label className="block mb-2">
              First Name:
              <input
                name="firstName"
                value={selectedUser.firstName}
                onChange={handleInputChange}
                className="w-full border p-2 rounded mt-1"
              />
            </label>

            <label className="block mb-2">
              Last Name:
              <input
                name="lastName"
                value={selectedUser.lastName}
                onChange={handleInputChange}
                className="w-full border p-2 rounded mt-1"
              />
            </label>

            <label className="block mb-2">
              Phone:
              <input
                name="phone"
                value={selectedUser.phone}
                onChange={handleInputChange}
                className="w-full border p-2 rounded mt-1"
              />
            </label>

            <label className="block mb-2">
              Username:
              <input
                name="username"
                value={selectedUser.username}
                onChange={handleInputChange}
                className="w-full border p-2 rounded mt-1"
              />
            </label>

            <label className="block mb-4">
              User Type:
              <select
                name="userType"
                value={selectedUser.userType}
                onChange={handleInputChange}
                className="w-full border p-2 rounded mt-1"
              >
                <option value="">{selectedUser.userType}</option>
                <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                <option value="MANAGER">SELLER</option>
                <option value="DELIVERER">DELIVERER</option>
              </select>
            </label>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-teal-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
