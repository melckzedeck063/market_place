import React from 'react';

export default function DashboardCard({ title, available, icon }) {
  return (
    <div className="bg-white shadow-md border border-orange-300 hover:shadow-xl transition-shadow duration-300 rounded-xl p-5 flex items-center gap-4">
      {/* Icon Container */}
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-500 text-lg">
        {icon}
      </div>

      {/* Info Section */}
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">{title}</span>
        <span className="text-2xl font-semibold text-gray-800 mt-1">
          {available ?? 0}
        </span>
      </div>
    </div>
  );
}
