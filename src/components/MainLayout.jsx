import { BellIcon, GroupIcon, HotelIcon, LayoutDashboardIcon, List, LogOutIcon, Share2Icon, User2, User2Icon, UserCircle, Users2Icon } from 'lucide-react'
import React, { useState } from 'react'


import { useNavigate } from 'react-router';

export default function MainLayout({children, page}) {

   const [isModalOpen, setIsModalOpen] = useState(false);

   const navigate = useNavigate()

   const handleLogout  = ( ) => {
      setTimeout(() => {
        navigate("/");
        
        setTimeout(() => {
          sessionStorage.removeItem('dmz-token')
        }, 500);
    }, 1000);
    }


  return (
    <div className='bg-white'>

<button data-drawer-target="cta-button-sidebar" data-drawer-toggle="cta-button-sidebar" aria-controls="cta-button-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-600 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-600 dark:hover:bg-gray-100 dark:focus:ring-gray-600">
   <span class="sr-only">Open sidebar</span>
   <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
   <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button>

<aside id="cta-button-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-white shadow-md">
    <div className="text-orange-500 text-2xl font-bold mt-6 mb-8">My Market</div>
      <ul class="space-y-2 font-medium">
         <li className='mb-2'>
            <a href="/dashboard" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-100 group">
               <LayoutDashboardIcon className='text-gray-600' />
               <span class="ms-3 text-gray-600">Dashboard</span>
            </a>
         </li>
         
         <li className='mb-2'>
            <a href="/shares" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-100 group" >
            <HotelIcon className='text-gray-600' />
               <span class="flex-1 ms-3 text-gray-600 whitespace-nowrap">Stores</span>
            </a>
         </li>
         <li className='mb-2'>
            <a href="/contributions" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-100 group">
            <List className='text-gray-600' />
               <span class="flex-1 ms-3 text-gray-600 whitespace-nowrap">Orders</span>
            </a>
         </li>
         {/* <li className='mb-2'>
            <a href="/loans" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-100 group">
            <img src={`${loan}`} alt="" className='h-6 w-6 imt-1' />
               <span class="flex-1 ms-3 text-gray-600 whitespace-nowrap">Loans</span>
            </a>
         </li> */}
         <li className='mb-3'>
            <a href="/users" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-100 group">
            <Users2Icon className='text-gray-600' />
               <span class="flex-1 ms-3 text-gray-600 whitespace-nowrap">Users</span>
            </a>
         </li>

         {/* <li className='mb-3'>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-100 group">
            <img src={`${paym}`} alt="" className='h-6 w-6 imt-1' />
               <span class="flex-1 ms-3 text-gray-600 whitespace-nowrap">Payments</span>
            </a>
         </li> */}
         <li className='mb-3'>
            <a href="/profile" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-100 group">
            <UserCircle className='text-gray-600' />
               <span class="flex-1 ms-3 text-gray-600 whitespace-nowrap">My Profile</span>
            </a>
         </li>
      </ul>
      

      <div className="mt-12 bottom-0">
      <button onClick={handleLogout} type="button" className="text-white w-full flex items-center justify-center  bg-red-400 hover:bg-red-400 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-400 dark:hover:bg-red-400">
      <LogOutIcon  className='mr-2' />
            Logout
        </button>
      </div>

   </div>
</aside>

 <div className="flex-1 ml-64">
    <div className="border-b h-16 mr-8 bg-white">
        <div className="flex flex-row items-center justify-between">
            <div className="font-bold text-2xl text-orange-500 ml-2">{page}</div>
            <div className="flex mt-4 space-x-4">
                <BellIcon  className='mt-2' />
                <div className="h-10 w-10 border p-2 rounded-full">
                    <div className="absolute bg-orange-500 opacity-30"></div>
                    <User2Icon  />
                </div>
            </div>
        </div>
    </div>
    <div className="bg-gray-100">
    {children}
    </div>
    </div>

    </div>
  )
}
