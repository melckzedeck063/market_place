import React, { useEffect, useState } from 'react';
import MainLayout from '../components/MainLayout';
import { useDispatch, useSelector } from 'react-redux';
import { myProfile } from '../store/actions/user_actions';
import { useQuery } from '@apollo/client';
import { GET_PROFILE } from '../apollo/Queries';

export default function ProfilePage() {


  const [selectedUser, setSelectedUser] = useState(null);
    const {data,error,loading} =  useQuery(GET_PROFILE,{
        variables : {
          page: 0,
          size: 10
        }
      })
      
        const profile = data?.profile;
        
       
        const handleInputChange = (e) => {
          const { name, value } = e.target;
          setSelectedUser(prev => ({ ...prev, [name]: value }));
        };

        const handleSave = () => {
          alert(`User updated: ${JSON.stringify(profile?.data, null, 2)}`);
        };


  return (
    <MainLayout page="Profile">
      <div className="p-6 w-11/12 mx-auto font-poppins">


      {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600"></div>
                    </div>
                ) : (
                    profile && profile?.data ? (
                                <>
                                  <div className="flex items-center justify-center ">
          <div className="bg-white p-6 rounded-lg w-8/12">
            <h2 className="text-xl text-orange-500 font-bold mb-4">My Profile</h2>

            <label className="block mb-2">
              First Name:
              <input
                name="firstName"
                value={profile?.data?.firstName}
                onChange={handleInputChange}
                className="w-full border p-2 rounded mt-1"
              />
            </label>

            <label className="block mb-2">
              Last Name:
              <input
                name="lastName"
                value={profile?.data?.lastName}
                onChange={handleInputChange}
                className="w-full border p-2 rounded mt-1"
              />
            </label>

            <label className="block mb-2">
              Phone:
              <input
                name="phone"
                value={profile?.data?.phone}
                onChange={handleInputChange}
                className="w-full border p-2 rounded mt-1"
              />
            </label>

            <label className="block mb-2">
              Username:
              <input
                name="username"
                value={profile?.data?.username}
                onChange={handleInputChange}
                className="w-full border p-2 rounded mt-1"
              />
            </label>

            <label className="block mb-4">
              User Type:
              <input type='text'
                name="userType"
                readOnly
                value={profile?.data?.userType}
                onChange={handleInputChange}
                className="w-full border p-2 rounded mt-1"
              />
               
            </label>

            <div className="flex justify-end gap-2">
              
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-teal-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
                                </>
                            )
                            :
                            <></>
                        )
                    }

        
      </div>
    </MainLayout>
  );
}
