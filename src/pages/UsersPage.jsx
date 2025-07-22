import React, { useState } from "react";
import { PlusIcon, Users2Icon, ShieldCheckIcon, ClipboardListIcon, UserIcon } from "lucide-react";
import { motion } from "framer-motion";
import MainLayout from "../components/MainLayout";
import DashboardCard from "../components/DashboardCard";
import UsersTable from "../components/UsersTable";
import AddRestaurantModal from "../components/NewRestaurant";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../apollo/Queries";

export default function UsersPage() {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

  const { data, loading } = useQuery(GET_ALL_USERS, {
    variables: { page: 0, size: 10 },
  });

  const users = data?.allUsers?.content ?? [];

  // Compute role summary with SUPER_ADMIN + ADMIN combined as "Admins"
  const roleSummary = {
    ADMINS: 0, // combined SUPER_ADMIN + ADMIN
    MANAGER: 0,
    USER: 0,
    TOTAL: users.length,
  };

  users.forEach((user) => {
    const role = user.userType?.toUpperCase();
    if (role === "SUPER_ADMIN" || role === "ADMIN") {
      roleSummary.ADMINS++;
    } else if (role === "MANAGER") {
      roleSummary.MANAGER++;
    } else if (role === "USER") {
      roleSummary.USER++;
    }
  });

  // Animation variants for container and children
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <MainLayout page="Users">
      <section className="text-gray-700 body-font">
        <div className="container px-5 py-8 mx-auto">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600"></div>
            </div>
          ) : users.length > 0 ? (
            <>
              {/* Dashboard Cards with animation */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  <DashboardCard
                    title="Total Users"
                    available={roleSummary.TOTAL}
                    total={roleSummary.TOTAL}
                    percent="100%"
                    icon={<Users2Icon className="w-8 h-8 text-blue-600" />}
                    bgColor="bg-blue-100"
                    textColor="text-blue-600"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <DashboardCard
                    title="Admins"
                    available={roleSummary.ADMINS}
                    total={roleSummary.TOTAL}
                    percent={
                      roleSummary.TOTAL
                        ? `${((roleSummary.ADMINS / roleSummary.TOTAL) * 100).toFixed(1)}%`
                        : "0%"
                    }
                    icon={<ShieldCheckIcon className="w-8 h-8 text-red-600" />}
                    bgColor="bg-red-100"
                    textColor="text-red-600"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <DashboardCard
                    title="Managers"
                    available={roleSummary.MANAGER}
                    total={roleSummary.TOTAL}
                    percent={
                      roleSummary.TOTAL
                        ? `${((roleSummary.MANAGER / roleSummary.TOTAL) * 100).toFixed(1)}%`
                        : "0%"
                    }
                    icon={<ClipboardListIcon className="w-8 h-8 text-green-600" />}
                    bgColor="bg-green-100"
                    textColor="text-green-600"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <DashboardCard
                    title="Regular Users"
                    available={roleSummary.USER}
                    total={roleSummary.TOTAL}
                    percent={
                      roleSummary.TOTAL
                        ? `${((roleSummary.USER / roleSummary.TOTAL) * 100).toFixed(1)}%`
                        : "0%"
                    }
                    icon={<UserIcon className="w-8 h-8 text-purple-600" />}
                    bgColor="bg-purple-100"
                    textColor="text-purple-600"
                  />
                </motion.div>
              </motion.div>

              {/* Header & Add User Button */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-2xl text-gray-800">Registered Users</h2>
                {/* Add User button can go here */}
              </div>

              {/* Users Table with fade-in animation */}
              <motion.div
                className="bg-white shadow-md rounded-lg p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <UsersTable users={users} />
              </motion.div>
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
