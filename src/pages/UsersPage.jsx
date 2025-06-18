import React, { useEffect, useState } from "react";
import { DownloadIcon, PlusIcon, UploadIcon } from "lucide-react";
import MainLayout from "../components/MainLayout";
import DashboardCard from "../components/DashboardCard";
import SharesDataTable from "../components/SharesDataTable";
import DepositContribution from "../components/DepositContribution";
import WithdrawContribution from "../components/WithdrawContribution";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "../store/actions/user_actions";
import ContributionsDeposit from "../components/ContributionsDeposit";
import ContributionsWithdraw from "../components/ContributionsWithdraw";
import { useQuery } from "@apollo/client";

import AddRestaurantModal from "../components/NewRestaurant";
import { GET_ALL_USERS } from "../apollo/Queries";
import UsersTable from "../components/UsersTable";

export default function UsersPage() {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("savings");
  const [amount, setAmount] = useState("");
  const [paymentSource, setPaymentSource] = useState("bank");
  const [withdrawTo, setWithdrawTo] = useState("agent");
  const [withdrawAccount, setWithdrawAccount] = useState("");
  const [reload, setReload] = useState(0);



  const {data,error,loading} =  useQuery(GET_ALL_USERS,{
    variables : {
      page: 0,
      size: 10
    }
  })
  
    const users = data?.allUsers?.content;
    
    // console.log("========= rests  =====",users);
  

  return (
    <MainLayout page="Users">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto">
          {loading ? (
             <div className="flex justify-center items-center h-32">
               <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600"></div>
             </div>
          ) : users && Array.isArray(users) ? (
            <>
              <div className="flex flex-row justify-between mb-6">
              {/* {rows?.data?.contributions.map((item, index) => (
                <DashboardCard key={index} available={item.value} percent="100%" title={item.product} total={item.value} />
              ))} */}
            </div>

          <div className="mt-8 flex justify-between mb-4">
            <h2 className="font-bold text-xl">Registered Users</h2>
            <div className="space-x-4">
              {/* <button className="bg-orange-500 text-white px-4 py-2 rounded-lg" onClick={() => setIsDepositModalOpen(true)}>
                <PlusIcon className="inline-block mr-2" /> New User
              </button> */}
             
            </div>
          </div>

          <div className="w-full mx-2">
          <UsersTable users={users} />
          </div>
            </>
          ) : (
            <p className="text-center text-gray-500">No data available</p>
          )}

        </div>
      </section>

      <AddRestaurantModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
/>


         </MainLayout>
  );
}
