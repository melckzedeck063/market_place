import React, { useEffect, useState } from "react";
import { DownloadIcon, PlusIcon, UploadIcon } from "lucide-react";
import MainLayout from "../components/MainLayout";

import { useQuery } from "@apollo/client";
import { GET_ALL_ORDERS, GET_RESTAURANTS } from "../apollo/Queries";
import OrdersTable from "../components/ContributionsWithdraw";

export default function ContributionPage() {


  const {data,error,loading} =  useQuery(GET_ALL_ORDERS,{
    variables : {
      page: 0,
      size: 10
    }
  })
  
  const orders = data?.allOrders?.content;
    
    console.log(orders);
  

  return (
    <MainLayout page="Orders">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto">
          {loading ? (
             <div className="flex justify-center items-center h-32">
               <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
             </div>
          ) : orders && Array.isArray(orders) ? (
            <>
              
          <div className="-mt-1 flex justify-between mb-4">
            <h2 className="font-bold text-xl">All Orders</h2>
            <div className="space-x-4">
              {/* <button className="bg-orange-500 text-white px-4 py-2 rounded-lg" onClick={() => setIsDepositModalOpen(true)}>
                <PlusIcon className="inline-block mr-2" /> New Restaurant
              </button> */}
              
            </div>
          </div>

          <div className="w-full mx-2">
                    <OrdersTable data={orders} />
          </div>
            </>
          ) : (
            <p className="text-center text-gray-500">No data available</p>
          )}

        </div>
      </section>

    

         </MainLayout>
  );
}
