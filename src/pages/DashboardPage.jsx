import React, { useEffect, useState } from 'react'
import MainLayout from '../components/MainLayout'
import DashboardCard from '../components/DashboardCard'
import LoanDataTable from '../components/LoanDataTable'
import { useDispatch, useSelector } from 'react-redux'
import { getDashboard } from '../store/actions/user_actions'
import Transactions from '../charts/Transactions'
import Contributions from '../charts/Contributions'
import { useQuery } from '@apollo/client'
import { GET_DASHBOARD } from '../apollo/Queries'
import { Cross, Hotel, HotelIcon, ListCheckIcon, ListCollapseIcon, ListFilter, ListMinusIcon, ListX, UsersRound } from 'lucide-react'
import { ListGroup } from 'flowbite-react'

export default function DashboardPage() {
  const dispatch = useDispatch();
  const [reload, setReload] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Loading state


  const {data,error,loading} =  useQuery(GET_DASHBOARD)

  const dashboard = data?.dashboardStats?.data;
  

  return (
    <div className='h-full'>
      <MainLayout page="Dashboard">
        <div className="h-full">
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-4 mx-auto">
              {loading ? (
                <div className="flex justify-center items-center h-32">
                   <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
              </div>
              ) : 
              dashboard && dashboard ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <DashboardCard
                    available={dashboard.totalOrders}
                    percent="O"
                    title="All Orders"
                    icon={<ListCollapseIcon className='text-xl font-bold text-orange-400'/> }
                    // total={rows.data.shares.limit}
                  />

                  <DashboardCard
                    available={dashboard.totalPendingOrders}
                    percent="O"
                    title="Pending Orders"
                    icon={<ListX className='text-xl font-bold text-orange-400'/> }
                    // total={rows.data.shares.limit}
                  />

                  <DashboardCard
                    available={dashboard.totalAcceptedOrders}
                    percent="O"
                    title="Accepted Orders"
                    icon={<ListCheckIcon className='text-xl font-bold text-orange-400'/> }
                    // total={rows.data.shares.limit}
                  />


                  <DashboardCard
                    available={dashboard.totalActiveRestaurants}
                    percent="O"
                    title="All Stores"
                    icon={<Hotel className='text-xl font-bold text-orange-400'/> }
                    // total={rows.data.shares.limit}
                  />

                  <DashboardCard
                    available={dashboard.totalProducts}
                    percent="O"
                    title="Registered Products"
                    icon={<HotelIcon className='text-xl font-bold text-orange-400'/> }
                    // total={rows.data.shares.limit}
                  />

                  <DashboardCard
                    available={dashboard.totalCustomers}
                    percent="O"
                    title="Registered Customer"
                    icon={<UsersRound className='text-xl font-bold text-orange-400'/> }
                    // total={rows.data.shares.limit}
                  />
 


                    
                  </div>
                  
                  <div className="grid sm:flex md:flex gap-3 mt-8">
                  
                    <div className="bg-white rounded-lg p-4 w-6/12">
                      <div className="text-lg font-bold mb-4">Orders</div>
                      <Contributions total={dashboard.totalOrders} pending={dashboard.totalPendingOrders} accepted={dashboard.totalAcceptedOrders} />
                    </div>
              <div className="">
                <div className="font-bold text-xl mt-1 mb-2">Recent Orders</div>
                <LoanDataTable limit={5} />
              </div>
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-500">No data available</div>
              )}

            </div>
          </section>
        </div>
      </MainLayout>
    </div>
  );
}
