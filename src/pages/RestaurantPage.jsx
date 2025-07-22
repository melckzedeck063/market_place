import React, { useState } from "react";
import { PlusIcon, CheckCircle, XCircle } from "lucide-react";
import MainLayout from "../components/MainLayout";
import BusinessTable from "../components/ContributionsDeposit";
import AddRestaurantModal from "../components/NewRestaurant";
import { useQuery } from "@apollo/client";
import { GET_RESTAURANTS } from "../apollo/Queries";
import { motion } from "framer-motion";

export default function RestaurantPage() {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

  const { data, loading } = useQuery(GET_RESTAURANTS, {
    variables: {
      page: 0,
      size: 10,
    },
  });

  const restaurants = data?.allRestaurant?.content ?? [];

  // Count OPEN and CLOSED restaurants
  const statusSummary = {
    OPEN: 0,
    CLOSED: 0,
    TOTAL: restaurants.length,
  };

  restaurants.forEach((r) => {
    const status = r.status?.toUpperCase();
    if (status === "OPEN") statusSummary.OPEN++;
    else if (status === "CLOSED") statusSummary.CLOSED++;
  });

  // Animation variants for summary cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, type: "spring", stiffness: 50 },
    }),
  };

  const cards = [
    {
      title: "Open Stores",
      count: statusSummary.OPEN,
      icon: <CheckCircle className="w-8 h-8 text-green-600" />,
      bgColor: "bg-green-100",
      textColor: "text-green-700",
    },
    {
      title: "Closed Stores",
      count: statusSummary.CLOSED,
      icon: <XCircle className="w-8 h-8 text-red-600" />,
      bgColor: "bg-red-100",
      textColor: "text-red-700",
    },
    {
      title: "Total Stores",
      count: statusSummary.TOTAL,
      icon: <PlusIcon className="w-8 h-8 text-gray-600" />,
      bgColor: "bg-gray-100",
      textColor: "text-gray-700",
    },
  ];

  return (
    <MainLayout page="Contributions">
      <section className="text-gray-800 body-font min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-10">
          {/* Header */}
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className={`rounded-lg p-6 flex border border-orange-400  items-center space-x-4 shadow-md cursor-pointer hover:shadow-lg transition`}
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

          <div className="flex flex-col md:flex-row mt-6 justify-between items-center mb-3">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-700">
              Registered Stores
            </h2>
            <button
              onClick={() => setIsDepositModalOpen(true)}
              className="mt-4 md:mt-0 flex items-center bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg transition duration-200 shadow-md"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              New Store
            </button>
          </div>


          {/* Loader or Table */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          ) : restaurants && restaurants.length > 0 ? (
            <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
              <BusinessTable businesses={restaurants} />
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-10">No data available</p>
          )}
        </div>
      </section>

      {/* Modal */}
      <AddRestaurantModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
      />
    </MainLayout>
  );
}
