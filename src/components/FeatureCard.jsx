import React from 'react';

export default function FeatureCard({ index, name, icon, role }) {
  const isFirst = index === 0;

  return (
    <div>
      <div
        className={`flex  border px-2 py-6 h-40 mb-6 rounded-lg shadow-sm ${
          isFirst ? 'bg-teal-600 text-white' : 'bg-white'
        }`}
      >
        <span
          className={`w-12 h-10 border-2 rounded-md p-1 ${
            isFirst ? 'border-white' : 'border-teal-600'
          }`}
        >
          <img
            src={icon}
            alt="icon"
            className="w-full h-full object-contain"
          />
        </span>
        <div className="flex-grow ml-4 mt-6">
          <h2 className={`title-font text-lg font-bold ${isFirst ? 'text-white' : 'text-gray-900'}`}>
            {name}
          </h2>
          <p className={isFirst ? 'text-gray-200 mt-2' : 'text-gray-500 mt-2'}>{role}</p>
        </div>
      </div>
    </div>
  );
}

