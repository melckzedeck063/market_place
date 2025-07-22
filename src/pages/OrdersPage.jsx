import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_ORDERS } from "../apollo/Queries";
import { DownloadIcon, PlusIcon } from "lucide-react";
import MainLayout from "../components/MainLayout";
import OrdersTable from "../components/ContributionsWithdraw";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Truck,
  XCircle,
  Clock,
} from "lucide-react";

export default function OrdersPage() {
  const { data, loading } = useQuery(GET_ALL_ORDERS, {
    variables: { page: 0, size: 10 },
  });

  const orders = data?.allOrders?.content ?? [];

  // Calculate order status counts
  const statusSummary = {
    PROCESSED: 0,
    DELIVERED: 0,
    CANCELLED: 0,
    PENDING: 0,
    TOTAL: orders.length,
  };

  orders.forEach((order) => {
    const status = order.status?.toUpperCase();
    if (statusSummary.hasOwnProperty(status)) {
      statusSummary[status]++;
    }
  });

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, type: "spring", stiffness: 50 },
    }),
  };

  // Cards config
  const cards = [
    {
      title: "Completed",
      count: statusSummary.PROCESSED,
      icon: <CheckCircle className="w-8 h-8 text-green-600" />,
      bgColor: "bg-green-100",
      textColor: "text-green-700",
    },
    {
      title: "Delivered",
      count: statusSummary.DELIVERED,
      icon: <Truck className="w-8 h-8 text-blue-600" />,
      bgColor: "bg-blue-100",
      textColor: "text-blue-700",
    },
    {
      title: "Cancelled",
      count: statusSummary.CANCELLED,
      icon: <XCircle className="w-8 h-8 text-red-600" />,
      bgColor: "bg-red-100",
      textColor: "text-red-700",
    },
    {
      title: "Pending",
      count: statusSummary.PENDING,
      icon: <Clock className="w-8 h-8 text-yellow-600" />,
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-700",
    },
    {
      title: "Total Orders",
      count: statusSummary.TOTAL,
      icon: <DownloadIcon className="w-8 h-8 text-gray-600" />,
      bgColor: "bg-gray-100",
      textColor: "text-gray-700",
    },
  ];

  return (
    <MainLayout page="Orders">
      <section className="text-gray-800 body-font w-full">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
            </div>
          ) : (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
                {cards.map((card, i) => (
                  <motion.div
                    key={card.title}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    className={`rounded-lg p-6 flex items-center border border-orange-400 space-x-4 shadow-md cursor-pointer hover:shadow-lg transition`}
                  >
                    <div
                      className={`p-3 rounded-full ${card.bgColor} flex items-center justify-center`}
                    >
                      {card.icon}
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{card.count}</p>
                      <p className={`uppercase text-xs font-medium ${card.textColor}`}>
                        {card.title}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                  All Orders
                </h2>
                <div className="flex gap-2">
                  {/* Future button example */}
                  {/* <button className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
                    <PlusIcon className="w-4 h-4 mr-2" /> New Order
                  </button> */}
                </div>
              </div>

              {/* Orders Table */}
              <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg p-4">
                <OrdersTable data={orders} />
              </div>
            </>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
