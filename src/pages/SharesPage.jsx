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
import { GET_RESTAURANTS } from "../apollo/Queries";
import BusinessTable from "../components/ContributionsDeposit";
import AddRestaurantModal from "../components/NewRestaurant";

export default function SharesPage() {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("savings");
  const [amount, setAmount] = useState("");
  const [paymentSource, setPaymentSource] = useState("bank");
  const [withdrawTo, setWithdrawTo] = useState("agent");
  const [withdrawAccount, setWithdrawAccount] = useState("");
  const [reload, setReload] = useState(0);



  const {data,error,loading} =  useQuery(GET_RESTAURANTS,{
    variables : {
      page: 0,
      size: 10
    }
  })
  
    const restaurants = data?.allRestaurant?.content;
    
    // console.log("========= rests  =====",restaurants);
  

  return (
    <MainLayout page="Contributions">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto">

          <div className="mt-8 flex justify-between mb-4">
            <h2 className="font-bold text-xl">Registered Stores</h2>
            <div className="space-x-4">
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg" onClick={() => setIsDepositModalOpen(true)}>
                <PlusIcon className="inline-block mr-2" /> New Store
              </button>
             
            </div>
          </div>

          {loading ? (
             <div className="flex justify-center items-center h-32">
               <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600"></div>
             </div>
          ) : restaurants && Array.isArray(restaurants) ? (
            <>
              <div className="flex flex-row justify-between mb-6">
              {/* {rows?.data?.contributions.map((item, index) => (
                <DashboardCard key={index} available={item.value} percent="100%" title={item.product} total={item.value} />
              ))} */}
            </div>

      
          <div className="w-full mx-2">
          <BusinessTable businesses={restaurants} />
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
