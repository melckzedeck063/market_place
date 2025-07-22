import React from 'react';
import MainLayout from '../components/MainLayout';
import DashboardCard from '../components/DashboardCard';
import LoanDataTable from '../components/LoanDataTable';
import { useQuery } from '@apollo/client';
import { GET_DASHBOARD } from '../apollo/Queries';
import {
  ListCheckIcon,
  ListCollapseIcon,
  ListX,
  Hotel,
  HotelIcon,
  UsersRound,
} from 'lucide-react';
import Contributions from '../charts/Contributions';

export default function DashboardPage() {
  const { data, loading } = useQuery(GET_DASHBOARD);
  const dashboard = data?.dashboardStats?.data;

  return (
    <MainLayout page="Dashboard">
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          </div>
        ) : dashboard ? (
          <>
            {/* Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <DashboardCard
                available={dashboard.totalOrders}
                percent="O"
                title="All Orders"
                icon={<ListCollapseIcon className="text-xl font-bold text-orange-400" />}
              />
              <DashboardCard
                available={dashboard.totalPendingOrders}
                percent="O"
                title="Pending Orders"
                icon={<ListX className="text-xl font-bold text-orange-400" />}
              />
              <DashboardCard
                available={dashboard.totalAcceptedOrders}
                percent="O"
                title="Accepted Orders"
                icon={<ListCheckIcon className="text-xl font-bold text-orange-400" />}
              />
              <DashboardCard
                available={dashboard.totalActiveRestaurants}
                percent="O"
                title="All Stores"
                icon={<Hotel className="text-xl font-bold text-orange-400" />}
              />
              <DashboardCard
                available={dashboard.totalProducts}
                percent="O"
                title="Registered Products"
                icon={<HotelIcon className="text-xl font-bold text-orange-400" />}
              />
              <DashboardCard
                available={dashboard.totalCustomers}
                percent="O"
                title="Registered Customers"
                icon={<UsersRound className="text-xl font-bold text-orange-400" />}
              />
            </div>

            {/* Charts and Table Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
              {/* Chart */}
              <div className="bg-white rounded-xl shadow p-4 col-span-12 lg:col-span-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Orders Overview</h3>
                <Contributions
                  total={dashboard.totalOrders}
                  pending={dashboard.totalPendingOrders}
                  accepted={dashboard.totalAcceptedOrders}
                />
              </div>

              {/* Table */}
              <div className="bg-white rounded-xl shadow p-4 col-span-12 lg:col-span-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
                <LoanDataTable limit={5} />
              </div>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500 py-16 text-lg">No dashboard data available.</div>
        )}
      </div>
    </MainLayout>
  );
}
